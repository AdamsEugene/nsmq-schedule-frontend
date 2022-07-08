export interface ISchoolData {
  nameOfSchool: string;
  region: string;
  district?: string;
  zone: string;
  logo: string;
  category: string;
  seeded?: boolean;
}

export interface ISchool {
  schools: ISchoolData[];
}

export interface ISchoolMulti {
  schools: ISchoolData[][];
}

export interface IShow {
  show: boolean;
}

export interface IObject {
  [key: string]: ISchoolData[];
}

export interface IData {
  keys: string[];
  regions: IObject;
  categoriesInRegion: object;
}

export interface ICardType {
  type: "general" | "fixtures";
}

export interface IRegion {
  region?: string;
  type?: string;
}

export interface IModal {
  visible: boolean;
  setVisible: (b: boolean) => void;
}

export interface IFixtures {
  fixtures: ISchoolData[][];
}

export interface IAlert {
  type?: "warning" | "success" | "error";
}
