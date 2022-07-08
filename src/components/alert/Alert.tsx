import { Alert as AL } from "antd";
import { IAlert } from "../../types/@types";

import { Container } from "./Alert.styles";

export const Alert: React.FC<IAlert> = (props) => {
  return (
    <Container>
      {props.type === "success" ? (
        <AL
          message="Success Tips"
          description="This is a warning notice about copywriting."
          type="success"
          showIcon
          closable
        />
      ) : props.type === "error" ? (
        <AL
          message="error"
          description="This is a error notice about copywriting."
          type="error"
          showIcon
          closable
        />
      ) : null}
    </Container>
  );
};
