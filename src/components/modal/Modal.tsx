import { Button, Modal as MD } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import {
  generateAllAtATime,
  generateBatch,
  groupSchoolsByCategory,
  pickFirstRandomSchool,
  pickOtherSchools,
  removeSeededSchools,
} from "../../functions/func";
import { postData } from "../../functions/postData";
import { unique } from "../../functions/unique";
import { IModal, IRegion, ISchool, ISchoolData } from "../../types/@types";
import { Alert } from "../alert/Alert";
import { Fixture } from "../fixture";
import { chunks } from "../fixture/chunks";

import * as Com from "./Modal.styles";

export const Modal: React.FC<IModal & ISchool & IRegion> = (props) => {
  const [fixtures, setFixtures] = useState<ISchoolData[]>([]);
  const [allFixtures, setAllFixtures] = useState<ISchoolData[]>([]);
  const [knownSchools, setKnownSchools] = useState<ISchoolData[]>([]);
  const [steps, setSteps] = useState<number>(1);
  const [alert, setAlert] = useState<
    "warning" | "success" | "error" | undefined
  >();

  const dep = props.region + "" + props.type;

  let allSchools = props.schools || [];

  if (props.type === "CONTESTS") {
    allSchools = removeSeededSchools(props.schools || []) || [];
  }

  useEffect(() => {
    setAllFixtures([]);
    setKnownSchools([]);
    setAlert(undefined);
  }, [dep]);

  const schools = groupSchoolsByCategory(allSchools || []);

  const genWithSteps = () => {
    setSteps((prev) => (prev >= 3 ? 1 : prev + 1));
    if (steps === 1) {
      const firstSchool = pickFirstRandomSchool(
        schools,
        unique(allFixtures)
      ).school;

      setFixtures(firstSchool);
      setAllFixtures((p) => [...p, ...firstSchool]);
    } else {
      const others = pickOtherSchools(unique(fixtures), allSchools).school;
      setFixtures(others);
      setAllFixtures((p) => [...p, ...others]);
    }
  };

  const genOneByOneNoSteps = () => {
    const schools = knownSchools.length ? knownSchools : allSchools;
    const { school, newSchool } = generateBatch(schools, unique(allFixtures));

    setKnownSchools(newSchool);
    setAllFixtures((p) => unique([...p, ...school]));
  };
  // console.log(unique(allFixtures).length);

  const genAll = () => {
    setAllFixtures((p) => [
      ...p,
      ...unique(generateAllAtATime(allSchools, unique(allFixtures))),
    ]);
  };

  // console.log(props.schools?.length);
  const saveOutput = () => {
    if (props.region && allFixtures.length)
      postData(" http://localhost:3004/fixtures", {
        [props.region]: chunks(allFixtures, 3),
      })
        .then((res) => setAlert("success"))
        .catch((e) => setAlert("error"));
    else setAlert("error");
  };

  // const onPrint = () => {};

  // console.log(unique(allFixtures));
  const title = `${props.region} Region Contests`;

  const componentRef = useRef<null | HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const ComponentToPrint = React.forwardRef<HTMLDivElement>((props, ref) => {
    return (
      <Com.Content ref={ref}>
        {unique(allFixtures).length ? (
          <Fixture schools={chunks(unique(allFixtures), 3)} />
        ) : null}
        <Alert type={alert} />
      </Com.Content>
    );
  });

  return (
    <Com.Container>
      <MD
        title={title}
        centered
        visible={props.visible}
        onCancel={() => props.setVisible(false)}
        width={"90%"}
        bodyStyle={{ height: 730, overflowY: "auto" }}
        footer={[
          <Button key="back" onClick={() => props.setVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="butch"
            disabled={unique(allFixtures).length === allSchools?.length}
            onClick={genAll}
          >
            batch
          </Button>,
          <Button
            key="One by one"
            disabled={unique(allFixtures).length === allSchools?.length}
            onClick={genOneByOneNoSteps}
          >
            One by one
          </Button>,
          <Button
            key="with steps"
            disabled={unique(allFixtures).length === allSchools?.length}
            onClick={genWithSteps}
          >
            one by one with steps
          </Button>,
          <Button key="print" type="link" loading={false} onClick={handlePrint}>
            Print
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={false}
            onClick={saveOutput}
          >
            Save
          </Button>,
        ]}
      >
        <ComponentToPrint ref={componentRef} />
      </MD>
    </Com.Container>
  );
};
