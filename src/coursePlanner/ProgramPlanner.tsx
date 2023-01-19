import styled from "styled-components";
import { AddCourses } from "./AddCourse/AddCourses";
import { CourseInfo } from "./CourseInfo/CourseInfo";
import { CourseList } from "./CourseList/CourseList";
import { ProgramSchedule } from "./ProgramSchedule/ProgramSchedule";

export const PageDiv = styled.div`
  display: flex;
  column-gap: 48px;

  font-family: Arial, Helvetica, sans-serif;
`;

const LayoutDiv = styled.div`
  display: grid;
  row-gap: 24px;
  height: max-content;
`;

export const ProgramPlanner = () => {
  return (
    <PageDiv>
      <LayoutDiv>
        <AddCourses />
        <CourseInfo />
        <CourseList />
      </LayoutDiv>
      <div>
        <ProgramSchedule />
      </div>
    </PageDiv>
  );
};
