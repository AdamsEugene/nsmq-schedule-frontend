// import {
//   EditOutlined,
//   EllipsisOutlined,
//   SettingOutlined,
// } from "@ant-design/icons";
import { Card } from "antd";
import React from "react";
import { ICardType, ISchoolData } from "../../types/@types";

const { Meta } = Card;

export const Cards: React.FC<ISchoolData & ICardType> = (props) => {
  const cardStyles =
    props.type === "general"
      ? { width: "190px", height: "220px" }
      : { width: "60%", height: "300px" };

  const imageStyle =
    props.type === "general" ? { height: 170 } : { height: 230 };

  return (
    <Card
      style={cardStyles}
      cover={<img alt="example" src={props.logo} {...imageStyle} />}
      // actions={[
      //   <SettingOutlined key="setting" />,
      //   <EditOutlined key="edit" />,
      //   <EllipsisOutlined key="ellipsis" />,
      // ]}
    >
      <Meta title={props.nameOfSchool} />
    </Card>
  );
};
