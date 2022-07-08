import { Button, PageHeader, Tag } from "antd";
import React from "react";

export const PageHead: React.FC<{}> = (props) => (
  <PageHeader
    title="Title"
    className="site-page-header"
    subTitle="This is a subtitle"
    tags={<Tag color="blue">Running</Tag>}
    extra={[
      <Button key="3">Operation</Button>,
      <Button key="2">Operation</Button>,
      <Button key="1" type="primary">
        Primary
      </Button>,
    ]}
    avatar={{
      src: "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4",
    }}
  ></PageHeader>
);
