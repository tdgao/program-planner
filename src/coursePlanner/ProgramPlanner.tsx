import { Typography } from "@mui/joy";
import styled, { css } from "styled-components";
import { ProgramDisplay } from "./AddCourse/ProgramDisplay";
import { CourseInfo } from "./CourseInfo/CourseInfo";
import { InfoTabs } from "./InfoTabs/InfoTabs";
import { ProgramDetails } from "./ProgramDetails/ProgramDetails";
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
const ProgramScheduleDiv = styled.div`
  ${layoutStyles}
`;
export const ProgramPlanner = () => {
  return (
    <PageDiv>
      <AddCoursesDiv>
        <InfoTabs
          courseInfoSlot={<CourseInfo />}
          programInfoSlot={<ProgramDetails />}
        />
      </AddCoursesDiv>
      <ProgramScheduleDiv>
        <ProgramSchedule />
      </ProgramScheduleDiv>
    </PageDiv>
  );
};
