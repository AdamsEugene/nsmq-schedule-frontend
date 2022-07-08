import {
  GlobalOutlined,
  PlayCircleOutlined,
  ScheduleOutlined,
  TrophyOutlined,
  Loading3QuartersOutlined,
  RadiusUpleftOutlined,
  CheckSquareOutlined,
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
  getItem("SEEDED SCHOOL", "seeded Seeded Schools", <PlayCircleOutlined />),
  getItem(
    "REGIONS",
    "regions",
    <GlobalOutlined />,
    regions.map((region) => getItem(region, `regions ${region} region schools`))
  ),
  getItem(
    "REGIONAL CONTESTS",
    "REGIONAL",
    <ScheduleOutlined />,
    regions.map((region) =>
      getItem(region, `regions ${region} region preliminary stage CONTESTS`)
    )
  ),
  getItem("Quarter Finals", "Quarter", <Loading3QuartersOutlined />),
  getItem("Semi Finals", "Semi", <RadiusUpleftOutlined />),
  getItem("Finals", "Finals", <TrophyOutlined />),
  getItem(
    "Fixtures",
    "fixtures",
    <CheckSquareOutlined />,

    regions.map((region) => getItem(region, `fixtures ${region} FIXTURES`))
  ),
];
