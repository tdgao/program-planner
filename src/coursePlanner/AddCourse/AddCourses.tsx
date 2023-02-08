import { Typography } from "@mui/joy";
import styled from "styled-components";
import { AddCoursesInput } from "./AddCoursesInput";
import { ProgramDisplay } from "./ProgramDisplay";

export const LayoutDiv = styled.div`
  display: grid;
  row-gap: 16px;
`;
export const SectionDiv = styled.div`
  display: grid;
  row-gap: 8px;
`;

export const AddCourses = () => {
  return (
    <LayoutDiv>
      <Typography level="mainHeading">Program Planner</Typography>
      <ProgramDisplay />
      <AddCoursesInput />
    </LayoutDiv>
  );
};
