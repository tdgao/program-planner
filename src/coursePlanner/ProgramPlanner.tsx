import { tabClasses } from "@mui/joy/Tab";
import styled, { css } from "styled-components";
import { AddCourses } from "./AddCourse/AddCourses";
import { CourseInfo } from "./CourseInfo/CourseInfo";
import { CourseList } from "./CourseList/CourseList";
import { InfoTabs } from "./InfoTabs/InfoTabs";
import { ProgramInfo } from "./ProgramInfo/ProgramInfo";
import { ProgramSchedule } from "./ProgramSchedule/ProgramSchedule";

export const PageDiv = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 48px;
  padding: 24px;
  max-height: 100vh;
  box-sizing: border-box;
  overflow: hidden;

  font-family: Arial, Helvetica, sans-serif;
`;

const layoutStyles = css`
  display: grid;
  height: max-content;
  padding: 0 12px;
`;

const AddCoursesDiv = styled.div`
  ${layoutStyles}
  width: 500px;
  row-gap: 24px;
`;
const CourseListDiv = styled.div`
  ${layoutStyles}
`;
const ProgramScheduleDiv = styled.div`
  ${layoutStyles}
`;

export const ProgramPlanner = () => {
  return (
    <PageDiv>
      <AddCoursesDiv>
        <AddCourses />
        <InfoTabs
          courseInfoSlot={<CourseInfo />}
          programInfoSlot={<ProgramInfo />}
        />
      </AddCoursesDiv>
      <CourseListDiv>
        <CourseList />
      </CourseListDiv>
      <ProgramScheduleDiv>
        <ProgramSchedule />
      </ProgramScheduleDiv>
    </PageDiv>
  );
};
