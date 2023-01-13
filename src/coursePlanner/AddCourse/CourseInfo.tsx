import styled from "styled-components";

const LayoutDiv = styled.div`
  display: grid;
`;

export interface CourseInfoProps {
  name: string;
  description: string;
}

export const CourseInfo = (props: CourseInfoProps) => {
  return (
    <LayoutDiv>
      <div>SENG 275</div>
      <pre>
        {`Some description placeholder
[SENG] 
[Has Special Requirements]

Pre reqs


Override Completed Date
[set year and term]
`}
      </pre>
    </LayoutDiv>
  );
};
