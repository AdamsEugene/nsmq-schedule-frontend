import styled from "styled-components";

export const Container = styled.div<{ w: string }>`
  font-size: 50px;
  width: ${({ w }) => w};
  text-transform: uppercase;
`;

export const Wrapper = styled.div<{ w: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: ${({ w }) => w};
  height: 350px;
`;

export const Text = styled.h1<{ w: string }>`
  word-break: break-word;
  text-align: center;
  font-size: 20px;
  text-transform: uppercase;
`;
