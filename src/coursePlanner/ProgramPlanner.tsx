import styled from "styled-components";
import { AddCourses } from "./AddCourse/AddCourses";
import { CourseInfo } from "./CourseInfo/CourseInfo";
import { CourseList } from "./CourseList/CourseList";
import { ProgramSchedule } from "./ProgramSchedule/ProgramSchedule";

export const PageDiv = styled.div`
  display: grid;
  grid-template-columns: 370px auto;
  column-gap: 32px;
`;

const LayoutDiv = styled.div`
  display: grid;
  row-gap: 24px;
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
