import { Divider, Timeline } from "antd";
import React from "react";
import { ISchool } from "../../types/@types";
import { Fixture } from "../../components/fixture";
import { Container } from "./Fixtures.styles";

export const Fixtures: React.FC<ISchool> = (props) => {
  return (
    <Container>
      <Timeline mode="left">
        <Timeline.Item label="2015-09-01 09:12:11">
          <Fixture schools={props.schools} />
        </Timeline.Item>
        <Divider style={{ marginBottom: "32px" }} orientation="left" plain>
          Left Text
        </Divider>
        <Timeline.Item label="2015-09-01 09:12:11">
          <Fixture schools={props.schools} />
        </Timeline.Item>
      </Timeline>
    </Container>
  );
};
