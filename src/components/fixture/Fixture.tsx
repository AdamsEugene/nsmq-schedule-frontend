import { Button, Timeline } from "antd";
import { ISchool, ISchoolData } from "../../types/@types";
import { Cards } from "../../pages/regions/Card";
import * as Com from "./Fixture.styles";
import { Fragment } from "react";
import { chunks } from "./chunks";

export const Fixture: React.FC<ISchool> = (props) => {
  const schools: ISchoolData[][] = chunks(props.schools, 3);

  return (
    <Fragment>
      <Timeline mode="left">
        {schools.map((school, index) => (
          <Fragment key={index + Date.now()}>
            <Timeline.Item label="2015-09-01 09:12:11">
              <Com.Container>
                <Com.InnerContainer>
                  {school.map((s, i) => (
                    <Fragment key={s?.nameOfSchool + s?.district}>
                      {i > 0 ? (
                        <Button size="large" type="primary" shape="circle">
                          VS
                        </Button>
                      ) : null}
                      <Cards type="fixtures" {...s} />
                    </Fragment>
                  ))}
                </Com.InnerContainer>
              </Com.Container>
            </Timeline.Item>
          </Fragment>
        ))}
      </Timeline>
    </Fragment>
  );
};
