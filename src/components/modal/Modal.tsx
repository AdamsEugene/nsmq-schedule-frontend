import { Button, Modal as MD } from "antd";
import React, { useState } from "react";
import {
  generateAllAtATime,
  generateBatch,
  groupSchoolsByCategory,
  pickFirstRandomSchool,
  pickOtherSchools,
} from "../../functions/func";
import { unique } from "../../functions/unique";
import { IModal, IRegion, ISchool, ISchoolData } from "../../types/@types";
import { Fixture } from "../fixture";

import * as Com from "./Modal.styles";

export const Modal: React.FC<IModal & ISchool & IRegion> = (props) => {
  const [fixtures, setFixtures] = useState<ISchoolData[]>([]);
  const [allFixtures, setAllFixtures] = useState<ISchoolData[]>([]);
  const [steps, setSteps] = useState<number>(1);

  const schools = groupSchoolsByCategory(props.schools || []);

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
      const others = pickOtherSchools(fixtures, props.schools).school;
      setFixtures(others);
      setAllFixtures((p) => [...p, ...others]);
    }
  };

  const genOneByOneNoSteps = () => {
    setAllFixtures((p) => [
      ...p,
      ...unique(generateBatch(props.schools, unique(allFixtures))),
    ]);
  };

  const genAll = () => {
    setAllFixtures((p) => [
      ...p,
      ...unique(generateAllAtATime(props.schools, unique(allFixtures))),
    ]);
  };

  // console.log(unique(allFixtures));

  return (
    <Com.Container>
      <MD
        title="Contests"
        centered
        visible={props.visible}
        onCancel={() => props.setVisible(false)}
        width={"90%"}
        bodyStyle={{ height: 700, overflowY: "auto" }}
        footer={[
          <Button key="back" onClick={() => {}}>
            Cancel
          </Button>,
          <Button
            key="butch"
            disabled={unique(allFixtures).length === props.schools?.length}
            onClick={genAll}
          >
            Generate in butch
          </Button>,
          <Button
            key="One by one"
            disabled={unique(allFixtures).length === props.schools?.length}
            onClick={genOneByOneNoSteps}
          >
            Generate One by one
          </Button>,
          <Button
            key="with steps"
            disabled={unique(allFixtures).length === props.schools?.length}
            onClick={genWithSteps}
          >
            Generate one by one with steps
          </Button>,
          <Button key="submit" type="primary" loading={true} onClick={() => {}}>
            Next
          </Button>,
        ]}
      >
        <Com.Content>
          {allFixtures.length && <Fixture schools={unique(allFixtures)} />}
        </Com.Content>
      </MD>
    </Com.Container>
  );
};
