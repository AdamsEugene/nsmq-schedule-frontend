import { IObject, ISchoolData } from "../types/@types";
import { unique } from "./unique";

export const seededSchools = (schools: ISchoolData[]) =>
  schools.filter((s) => s.seeded);

export const removeSeededSchools = (schools: ISchoolData[]) => {
  return schools.filter((s) => !s.seeded);
};

export const categorizeSchoolsByRegion = (school: ISchoolData[]): IObject => {
  return school?.reduce((pre: any, cur: ISchoolData) => {
    (pre[cur.region] = pre[cur.region] || []).push(cur);
    return pre;
  }, {});
};

export const groupSchoolByRegionCategory = (groups: IObject) => {
  const keys = Object.keys(groups);
  let groupings: object = {};
  const newGroupings = keys.flatMap((group: any) => {
    return groups[group]?.reduce((pre: any, cur: ISchoolData) => {
      (pre[cur.category] = pre[cur.category] || []).push(cur);
      return pre;
    }, {});
  });

  keys.forEach((key, index) => {
    groupings[key] = newGroupings[index];
  });

  return {
    keys,
    regions: groups,
    categoriesInRegion: groupings,
  };
};

export const groupSchoolsByCategory = (school: ISchoolData[]): IObject => {
  return school?.reduce((pre: any, cur: ISchoolData) => {
    (pre[cur.category] = pre[cur.category] || []).push(cur);
    return pre;
  }, {});
};

export const pickFirstRandomSchool = (
  schools: IObject,
  selected: ISchoolData[]
) => {
  console.log({ schools, selected });

  const selectedNames = unique(selected.map((s) => s.nameOfSchool));

  const excellent = schools["1"]?.filter(
    (s) => !selectedNames.includes(s.nameOfSchool)
  );
  const veryGood = schools["2"]?.filter(
    (s) => !selectedNames.includes(s.nameOfSchool)
  );
  const good = schools["3"]?.filter(
    (s) => !selectedNames.includes(s.nameOfSchool)
  );

  let firstChoice = excellent;
  if (!firstChoice?.length) {
    firstChoice = veryGood;
    if (!firstChoice?.length) firstChoice = good;
  }

  const totalSchools = firstChoice?.length;
  const ranNumber = Math.floor(Math.random() * totalSchools);

  return { school: [firstChoice[ranNumber]] };
};

// pick other schools
export const pickOtherSchools = (
  prev: ISchoolData[],
  schools: ISchoolData[]
) => {
  const districts = unique(prev.map((p) => p.district));
  const zones = prev.map((p) => p.zone);
  const categories = prev.map((p) => p.category);
  const names = prev.map((p) => p.nameOfSchool);

  // remove already selected schools from schools list
  let remainingSchools = schools.filter(
    (school) => !names.includes(school.nameOfSchool)
  );
  // console.log(names, zones, categories, districts);

  // console.log({ name: remainingSchools });

  // console.log(districts);

  // remove schools from the same zone
  let zoneSchools = remainingSchools.filter(
    (remainingSchool) => !zones.includes(remainingSchool.zone)
  );

  if (zoneSchools.length) remainingSchools = zoneSchools;
  // console.log({ zone: remainingSchools });

  // remove schools from the same region
  if (districts.length) {
    let districtSchools = remainingSchools.filter(
      (remainingSchool) => !districts.includes(remainingSchool.district)
    );

    if (districtSchools.length) remainingSchools = districtSchools;
    // console.log({ dis: remainingSchools });
  }

  if (remainingSchools.length) {
    // remove schools of the same category
    let catSchools = remainingSchools.filter(
      (remainingSchool) => !categories.includes(remainingSchool.category)
    );

    // check if there are schools from different category before proceeding
    if (catSchools.length) remainingSchools = catSchools;
    // console.log({ cat: remainingSchools });
  } else {
    // no two zone
    // remove schools of the same category
    if (remainingSchools.length) {
      let catSchools = remainingSchools.filter(
        (remainingSchool) => !categories.includes(remainingSchool.category)
      );

      // check if there are schools from different category before proceeding
      if (catSchools.length) remainingSchools = catSchools;
      // console.log({ cat: remainingSchools });
    }
  }

  // get the length of all the schools
  const totalSchools = remainingSchools.length;
  const ranNumber = Math.floor(Math.random() * totalSchools);

  // console.log(remainingSchools, ranNumber);

  const school = shuffle([...prev, remainingSchools[ranNumber]]);
  return { school };
};

// generate batch (how many to generate)
export const generateBatch = (
  schools: ISchoolData[],
  selected: ISchoolData[],
  howMany: number = 3
) => {
  // const selectedNames = selected.map((s) => s.nameOfSchool);

  const firstChoice = pickFirstRandomSchool(
    groupSchoolsByCategory(schools),
    selected
  ).school;

  // let allSchools: ISchoolData[] = firstChoice;

  // while (unique(allSchools).length < howMany) {
  //   const firstChoice = pickFirstRandomSchool(
  //     groupSchoolsByCategory(schools),
  //     selected
  //   ).school;

  //   const f = unique(allSchools || firstChoice);

  //   allSchools = [
  //     ...unique(allSchools),
  //     ...unique(pickOtherSchools(f, schools).school),
  //   ];

  //   if (unique(allSchools).length >= howMany) break;
  // }

  // allSchools = allSchools.filter(
  //   (s) => !selectedNames.includes(s.nameOfSchool)
  // );

  // if (unique(allSchools).length !== howMany)
  //   generateBatch(schools, unique(allSchools));

  const { school, schools: newSchool } = pickOtherTwoSchools(
    firstChoice,
    schools
  );

  // console.log(school);

  return { school, newSchool };
};

// generate all at a time
export const generateAllAtATime = (
  schools: ISchoolData[],
  selected: ISchoolData[]
) => {
  // const firstChoice = pickFirstRandomSchool(
  //   groupSchoolsByCategory(schools),
  //   selected
  // ).school;

  let allSchools: ISchoolData[] = [];
  let allS: ISchoolData[][] = [];

  // while (unique(allSchools).length < schools.length) {
  //   const firstChoice = pickFirstRandomSchool(
  //     groupSchoolsByCategory(schools),
  //     selected
  //   ).school;

  //   allSchools = [
  //     ...unique(allSchools),
  //     ...unique(pickOtherSchools(firstChoice, schools).school),
  //   ];
  //   if (unique(allSchools).length >= schools.length) break;
  // }

  // if (unique(allSchools).length !== schools.length)
  //   generateAllAtATime(schools, unique(allSchools));
  const limit = schools.length / 3;

  while (unique(allS).length < limit) {
    const firstChoice = pickFirstRandomSchool(
      groupSchoolsByCategory(schools),
      selected
    ).school;

    const { school, schools: newSchool } = pickOtherTwoSchools(
      firstChoice,
      schools
    );
    allS = [...allS, school];
    // console.log(allS, "aaa");
    schools = newSchool;
    allSchools = [...allSchools, ...school];
  }

  return allSchools;
};

// shuffle
export const shuffle = (array: ISchoolData[]) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

// pick other schools
export const pickOtherTwoSchools = (
  prev: ISchoolData[],
  schools: ISchoolData[]
) => {
  const districts = unique(prev.map((p) => p.district));
  const zones = prev.map((p) => p.zone);
  const categories = prev.map((p) => p.category);
  const names = prev.map((p) => p.nameOfSchool);

  // remove already selected schools from schools list
  let remainingSchools = schools.filter(
    (school) => !names.includes(school.nameOfSchool)
  );

  // console.log("called");

  // remove schools from the same zone
  let zoneSchools = remainingSchools.filter(
    (remainingSchool) => !zones.includes(remainingSchool.zone)
  );

  if (zoneSchools.length) remainingSchools = zoneSchools;
  // console.log({ zone: remainingSchools });

  // remove schools from the same region
  if (districts.length) {
    let districtSchools = remainingSchools.filter(
      (remainingSchool) => !districts.includes(remainingSchool.district)
    );

    if (districtSchools.length) remainingSchools = districtSchools;
    // console.log({ dis: remainingSchools });
  }

  if (remainingSchools.length) {
    // remove schools of the same category
    let catSchools = remainingSchools.filter(
      (remainingSchool) => !categories.includes(remainingSchool.category)
    );

    // check if there are schools from different category before proceeding
    if (catSchools.length) remainingSchools = catSchools;
    // console.log({ cat: remainingSchools });
  } else {
    // no two zone
    // remove schools of the same category
    if (remainingSchools.length) {
      let catSchools = remainingSchools.filter(
        (remainingSchool) => !categories.includes(remainingSchool.category)
      );

      // check if there are schools from different category before proceeding
      if (catSchools.length) remainingSchools = catSchools;
      // console.log({ cat: remainingSchools });
    }
  }

  // get the length of all the schools
  const totalSchools = remainingSchools.length;
  const ranNumber = Math.floor(Math.random() * totalSchools);

  // console.log(remainingSchools, ranNumber);

  let school = [...prev, remainingSchools[ranNumber]];

  if (school.length < 3) school = pickOtherTwoSchools(school, schools).school;
  const SN = school.map((s) => s.nameOfSchool);
  schools = schools.filter((s) => !SN.includes(s.nameOfSchool));
  // console.log(school.length);
  return { school, schools };
};
