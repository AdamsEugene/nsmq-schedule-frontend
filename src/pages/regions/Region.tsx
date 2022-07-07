import { Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { items } from "./data";
import { SchoolCard } from "./SchoolCard";
import * as Com from "./Region.styles";
import { Schedule } from "../schedule";
import { Button } from "antd";
import { Fixtures } from "../fixtures/Fixtures";
import { schoolData } from "../../static/schoolData";
import { Modal } from "../../components/modal/Modal";
import { categorizeSchoolsByRegion } from "../../functions/func";

const { Header, Content, Footer, Sider } = Layout;

const Pages = (type: string, region: string) => {
  return {
    seeded: <SchoolCard schools={schoolData} />,
    regions: <SchoolCard schools={schoolData} type={type} region={region} />,
    fixtures: <Fixtures schools={schoolData} />,
    schedule: <Schedule />,
  };
};

export const Region: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [view, setView] = useState("seeded");
  const [visible, setVisible] = useState(false);

  const key = view.split(" ");

  // console.log(key);

  useEffect(() => {
    setView("seeded Seeded Schools");
  }, []);

  return (
    <Layout hasSider>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
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
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header
          className="site-layout-background"
          style={{ padding: 0, position: "sticky", top: 0, zIndex: 999 }}
        />
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div className="site-layout-background" style={{ padding: 24 }}>
            <Com.RegionName>
              <Com.Title>{key.slice(1).join(" ")}</Com.Title>
              {key[key.length - 1] === "CONTESTS" && (
                <Button onClick={() => setVisible(true)} type="primary">
                  Generate Contexts
                </Button>
              )}
            </Com.RegionName>
            {Pages(key[key.length - 1], key[1])[key[0]]}
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
