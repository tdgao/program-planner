import styled from "styled-components";
import { AddCourses } from "./AddCourse/AddCourses";

export const PageDiv = styled.div`
  display: grid;
  grid-template-columns: 500px auto;
`;

export const ProgramPlanner = () => {
  return (
    <PageDiv>
      <AddCourses />
    </PageDiv>
  );
};
