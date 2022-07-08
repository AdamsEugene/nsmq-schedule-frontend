import { Avatar as AV } from "antd";

export const Avatar: React.FC<{ children: JSX.Element; w: number }> = (
  props
) => (
  <AV
    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: props.w }}
    // icon={<AntDesignOutlined />}
  >
    {props.children}
  </AV>
);
