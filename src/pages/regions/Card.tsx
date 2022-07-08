// import { Card } from "antd";
import React from "react";
import { Avatar } from "../../components/Avatar";
import { ICardType, ISchoolData } from "../../types/@types";
import * as Com from "../../components/Avatar.styles";

// const { Meta } = Card;

export const Cards: React.FC<ISchoolData & ICardType> = (props) => {
  const cardStyles =
    props.type === "general"
      ? { width: "190px", height: "190px" }
      : { width: "240px", height: "240px" };

  const imageStyle =
    props.type === "general" ? { height: 170 } : { height: 230 };

  let name: string | string[] = props.nameOfSchool.trim().split(" ");

  if (name.length >= 3) {
    name = name[0][0] + " " + name[1][0] + " " + name[2][0];
  } else if (name.length === 2) {
    name = name[0][0] + " " + name[1][0];
  } else {
    name = name[0][0];
  }

  return (
    <Com.Wrapper w={cardStyles.width}>
      <Avatar w={imageStyle.height}>
        <Com.Container w={cardStyles.width}>{name}</Com.Container>
      </Avatar>
      <Com.Text w={cardStyles.width}>{props.nameOfSchool}</Com.Text>
    </Com.Wrapper>
  );
};
