import styled from "styled-components";
import { AddCourses } from "./AddCourse/AddCourses";
import { CourseInfo } from "./CourseInfo/CourseInfo";
import { CourseList } from "./CourseList/CourseList";

export const PageDiv = styled.div`
  display: grid;
  row-gap: 24px;
`;

export const ProgramPlanner = () => {
  return (
    <PageDiv>
      <AddCourses />
      <CourseInfo />
      <CourseList />
    </PageDiv>
  );
};
