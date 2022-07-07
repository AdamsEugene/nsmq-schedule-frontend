import { ISchoolData } from "../types/@types";
import adisadel from "../asset/logos/adisadel.college.jpg";
import augustines from "../asset/logos/augustines.college.png";
import national from "../asset/logos/ghana.national.college.jpg";
import koforidua from "../asset/logos/ghana.shs.koforidua.png";
import KASHS from "../asset/logos/KASHS_Crestt.jpg";
import KNUST from "../asset/logos/knust_shs.webp";
import Kumasi from "../asset/logos/Kumasi-aca.webp";
import oda from "../asset/logos/oda.shs.jpg";
import Opoku from "../asset/logos/Opoku_Ware_School_crest.png";
import pope from "../asset/logos/pope.john.png";
import prempeh from "../asset/logos/prempeh.college.crest.jpg";
import louis from "../asset/logos/st.louis.shs.jpg";
import Swedru from "../asset/logos/swedru.shs.jpg";
import Peter from "../asset/logos/St._Peter's_Boys_Senior_High_School_logo.png";
import Sonrise from "../asset/logos/Sonrise.SHS.jpg";
import Ola from "../asset/logos/Ola.SHS.Ho.jpg";
import Sogakope from "../asset/logos/Sogakope.png";
import Chemu from "../asset/logos/st.louis.shs.jpg";
import PRESEC from "../asset/logos/Presbyterian_boys_secondary_logo_2.png";
import Accra from "../asset/logos/Accra_Academy_logo.jpg";
import Tamale from "../asset/logos/st.louis.shs.jpg";
import Bolgatanga from "../asset/logos/bolgatanga-senior-high.png";
import Konongo from "../asset/logos/bolgatanga-senior-high.png";

export const schoolData: ISchoolData[] = [
  {
    nameOfSchool: "St. Louis SHS",
    region: "Ashanti",
    district: "Oforikrom Municipal",
    zone: "A",
    logo: louis,
    category: "Excellent",
  },
  {
    nameOfSchool: "Konongo-Odumase SHS",
    region: "Ashanti",
    district: "Asante Akim Central",
    zone: "A",
    logo: Konongo,
    category: "Good",
  },
  {
    nameOfSchool: "Kumasi Academy",
    region: "Ashanti",
    district: "Asokore Mampong",
    zone: "A",
    logo: Kumasi,
    category: "Very Good",
  },
  {
    nameOfSchool: "KNUST SHS",
    region: "Ashanti",
    district: "Asokore Mampong",
    zone: "B",
    logo: KNUST,
    category: "Very Good",
  },
  {
    nameOfSchool: "Prempeh College",
    region: "Ashanti",
    district: "Kwadaso Municipal",
    zone: "B",
    logo: prempeh,
    category: "Excellent",
  },
  {
    nameOfSchool: "Kumasi Anglican SHS",
    region: "Ashanti",
    district: "Kumasi Metropolitan",
    zone: "C",
    logo: KASHS,
    category: "Very Good",
  },
  {
    nameOfSchool: "Opoku Ware School",
    region: "Ashanti",
    district: "Adansi North",
    zone: "C",
    logo: Opoku,
    category: "Excellent",
  },
  // Central
  {
    nameOfSchool: "St. Peter’s SHS",
    region: "Greater",
    district: "Kwahu East Municipal",
    zone: "A",
    logo: louis,
    category: "Excellent",
  },
  {
    nameOfSchool: "Augustine's College",
    region: "Ashanti",
    district: "Cape Coast Metro",
    zone: "A",
    logo: augustines,
    category: "Excellent",
  },
  {
    nameOfSchool: "Swedru SHS",
    region: "Western",
    district: "Agona East",
    zone: "B",
    logo: Swedru,
    category: "Good",
  },
  {
    nameOfSchool: "Ghana National College",
    region: "Western",
    district: "Cape Coast Metro",
    zone: "B",
    logo: national,
    category: "Very Good",
  },
  {
    nameOfSchool: "Wesley Girl's High School",
    region: "Western",
    district: "Cape Coast Metro",
    zone: "C",
    logo: louis,
    category: "Excellent",
  },
  {
    nameOfSchool: "Adisadel College",
    region: "Greater",
    district: "Cape Coast Metro",
    zone: "C",
    logo: adisadel,
    category: "Good",
  },
  // Western
  {
    nameOfSchool: "Peter's SHS",
    region: "Western",
    district: "Kwahu East Municipal",
    zone: "A",
    logo: Peter,
    category: "Excellent",
  },
  {
    nameOfSchool: "Pope John Min. Sem. SHS",
    region: "Greater",
    district: "New Juabeng Municipal",
    zone: "B",
    logo: pope,
    category: "Excellent",
  },
  {
    nameOfSchool: "Ghana SHS, Koforidua",
    region: "Western",
    district: "New Juaben Municipal",
    zone: "C",
    logo: koforidua,
    category: "Excellent",
  },
  {
    nameOfSchool: "Oda SHS",
    region: "Northern",
    district: "Birim Central Municipal",
    zone: "C",
    logo: oda,
    category: "Very Good",
  },
  // Northern
  {
    nameOfSchool: "Sonrise SHS",
    region: "Northern",
    district: "Ho Municipal",
    zone: "A",
    logo: Sonrise,
    category: "Very Good",
  },
  {
    nameOfSchool: "Keta SHTS",
    region: "Ashanti",
    district: "Keta Municipal",
    zone: "B",
    logo: KASHS,
    category: "Good",
  },
  {
    nameOfSchool: "Ola SHS, Ho",
    region: "Northern",
    district: "Ho Municipal",
    zone: "C",
    logo: Ola,
    category: "Excellent",
  },
  {
    nameOfSchool: "Sogakope SHS",
    region: "Northern",
    district: "South Tongu",
    zone: "C",
    logo: Sogakope,
    category: "Very Good",
  },
  // Greater
  {
    nameOfSchool: "Chemu SHS",
    region: "Greater",
    district: "Tema Metro",
    zone: "A",
    logo: Chemu,
    category: "Very Good",
  },
  {
    nameOfSchool: "PRESEC - Legon",
    region: "Greater",
    district: "Accra Metropolitan",
    zone: "B",
    logo: PRESEC,
    category: "Good",
  },
  {
    nameOfSchool: "Accra Academy",
    region: "Greater",
    district: "Accra Metropolitan",
    zone: "C",
    logo: Accra,
    category: "Excellent",
  },
  // Tamale
  {
    nameOfSchool: "Tamale SHS",
    region: "Northern",
    district: "Sagnarigu Municipal",
    zone: "A",
    logo: Tamale,
    category: "Excellent",
  },
  {
    nameOfSchool: "Bolgatanga SHS",
    region: "Northern",
    district: "Talensi Municipal",
    zone: "B",
    logo: Bolgatanga,
    category: "Good",
  },
];
