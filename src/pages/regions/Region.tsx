import { Layout, Menu } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { items } from "./data";
import { SchoolCard } from "./SchoolCard";
import * as Com from "./Region.styles";
import { Schedule } from "../schedule";
import { Button } from "antd";
import { Fixtures } from "../fixtures/Fixtures";
import { schoolData } from "../../static/schoolData";
import { Modal } from "../../components/modal/Modal";
import {
  categorizeSchoolsByRegion,
  removeSeededSchools,
  seededSchools,
} from "../../functions/func";
import { useReactToPrint } from "react-to-print";

const { Content, Footer, Sider } = Layout;

const Pages = (type: string, region: string) => {
  return {
    seeded: <SchoolCard schools={seededSchools(schoolData || [])} />,
    regions: (
      <SchoolCard
        schools={
          type === "schools"
            ? schoolData
            : removeSeededSchools(schoolData || [])
        }
        type={type}
        region={region}
      />
    ),
    fixtures: <Fixtures type={type} region={region} />,
    schedule: <Schedule />,
  };
};

export const Region: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [view, setView] = useState("seeded");
  const [visible, setVisible] = useState(false);
  const [len, setLen] = useState(false);

  const key = view.split(" ");

  console.log(key);

  useEffect(() => {
    setView("seeded Seeded Schools");
  }, []);

  const componentRef = useRef<null | HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const ComponentToPrint = React.forwardRef<HTMLDivElement>((props, ref) => {
    return <div ref={ref}>{Pages(key[key.length - 1], key[1])[key[0]]}</div>;
  });

  useEffect(() => {
    if (key[1])
      if (key[1][key[0]]) {
        fetch(`http://localhost:3004/fixtures/`)
          .then((res) => res.json())
          .then((data) => {
            setLen(
              data.filter((d) => d[key[1][key[0]] || ""])[0][
                key[1][key[0]] || ""
              ].length > 0
            );
          });
      }
  }, [key]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["seeded"]}
          onClick={(e) => setView(e.key)}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <div className="site-layout-background" style={{ padding: 24 }}>
            <Com.RegionName>
              <Com.Title>{key.slice(1).join(" ")}</Com.Title>
              {key[key.length - 1] === "CONTESTS" ? (
                <Button onClick={() => setVisible(true)} type="primary">
                  Generate Contests
                </Button>
              ) : key[key.length - 1] === "FIXTURES" ? (
                len ? (
                  <Button onClick={handlePrint} type="primary">
                    Print
                  </Button>
                ) : null
              ) : null}
            </Com.RegionName>
            <ComponentToPrint ref={componentRef} />
            <Modal
              visible={visible}
              setVisible={setVisible}
              schools={categorizeSchoolsByRegion(schoolData)[key[1]]}
              type={key[key.length - 1]}
              region={key[1]}
            />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Adams ©2022 Created by Eugene Adams
        </Footer>
      </Layout>
    </Layout>
  );
};
