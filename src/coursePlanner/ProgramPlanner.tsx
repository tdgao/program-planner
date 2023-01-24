import styled from "styled-components";
import { AddCourses } from "./AddCourse/AddCourses";
import { CourseInfo } from "./CourseInfo/CourseInfo";
import { CourseList } from "./CourseList/CourseList";
import { ProgramSchedule } from "./ProgramSchedule/ProgramSchedule";

export const PageDiv = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 48px;
  padding: 24px;

  font-family: Arial, Helvetica, sans-serif;
`;

const LayoutDiv = styled.div`
  display: grid;
  width: 400px;
  row-gap: 24px;
  height: max-content;
`;

export const ProgramPlanner = () => {
  return (
    <PageDiv>
      <LayoutDiv>
        <AddCourses />
        <CourseInfo />
      </LayoutDiv>
      <div>
        <CourseList />
      </div>
      <div>
        <ProgramSchedule />
      </div>
    </PageDiv>
  );
};
