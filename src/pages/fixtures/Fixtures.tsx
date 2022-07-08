import React, { useEffect, useState } from "react";
import { IRegion, ISchoolData } from "../../types/@types";
import { Fixture } from "../../components/fixture";
import { Container } from "./Fixtures.styles";

export const Fixtures: React.FC<IRegion> = (props) => {
  const [schools, setSchools] = useState<ISchoolData[][]>([]);
  useEffect(() => {
    if (props.region) {
      fetch(`http://localhost:3004/fixtures/`)
        .then((res) => res.json())
        .then((data) => {
          setSchools(
            data.filter((d) => d[props.region || ""])[0][props.region || ""]
          );
        });
    }
  }, [props.region]);

  return (
    <Container>
      <Fixture schools={schools} />
    </Container>
  );
};
