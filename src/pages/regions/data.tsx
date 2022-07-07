import {
  GlobalOutlined,
  AlipayCircleOutlined,
  ScheduleOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const regions = ["Greater Accra", "Northern", "Western", "Ashanti"].sort();

export const items: MenuItem[] = [
  getItem("SEEDED SCHOOL", "seeded Seeded Schools", <AlipayCircleOutlined />),
  getItem(
    "REGIONS",
    "regions",
    <GlobalOutlined />,
    regions.map((region) => getItem(region, `regions ${region} region schools`))
  ),
  getItem(
    "REGIONAL CONTESTS",
    "REGIONAL",
    <GlobalOutlined />,
    regions.map((region) =>
      getItem(region, `regions ${region} region preliminary stage CONTESTS`)
    )
  ),
  getItem("Quarter Finals", "Quarter", <GlobalOutlined />),
  getItem("Semi Finals", "Semi", <GlobalOutlined />),
  getItem("Finals", "Finals", <GlobalOutlined />),
  getItem(
    "Fixtures",
    "fixtures",
    <TrophyOutlined />,
    regions.map((region) => getItem(region, `fixtures ${region} CONTESTS`))
  ),
  getItem("Schedule", "schedule", <ScheduleOutlined />, [
    getItem("Tom", "Tom"),
    getItem("Bill", "Bill"),
    getItem("Alex", "Alex"),
  ]),
];
