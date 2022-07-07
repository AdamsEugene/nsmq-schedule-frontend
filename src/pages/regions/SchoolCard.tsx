import { Col, Divider, Row } from "antd";
import React, { Fragment } from "react";
import { Cards } from "./Card";
import { IRegion, ISchool } from "../../types/@types";
import {
  categorizeSchoolsByRegion,
  groupSchoolsByCategory,
} from "../../functions/func";
import * as Com from "./Region.styles";

export const SchoolCard: React.FC<ISchool & IRegion> = (props) => {
  let schools = props.region
    ? categorizeSchoolsByRegion(props.schools)
    : groupSchoolsByCategory(props.schools);

  if (props.type) schools = groupSchoolsByCategory(schools[props.region || ""]);

  const categories = Object.keys(schools || {});

  return (
    <Com.CenterWrapper>
      {categories.map((category) => (
        <Fragment key={category}>
          <Divider orientation="left">{category} Schools</Divider>
          <Row gutter={[16, { xs: 4, sm: 8, md: 16, lg: 24 }]}>
            {schools[category].map((school) => (
              <Col key={school.nameOfSchool} className="gutter-row">
                <Cards {...school} type="general" />
              </Col>
            ))}
          </Row>
        </Fragment>
      ))}
    </Com.CenterWrapper>
  );
};
