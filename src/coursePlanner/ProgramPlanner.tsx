import { Typography } from "@mui/joy";
import styled, { css } from "styled-components";
import { CourseInfo } from "./CourseInfo/CourseInfo";
import { InfoTabs, TabContentDiv } from "./InfoTabs/InfoTabs";
import { ProgramDetails } from "./ProgramDetails/ProgramDetails";
import { ProgramSchedule } from "./ProgramSchedule/ProgramSchedule";

export const PageDiv = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr;
  column-gap: 24px;
  padding: 12px 24px;
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

const ProgramScheduleDiv = styled.div`
  ${layoutStyles}
`;
export const ProgramPlanner = () => {
  return (
    <PageDiv>
      {/* <InfoTabsDiv>
        <InfoTabs
          courseInfoSlot={<CourseInfo />}
          programInfoSlot={<ProgramDetails />}
        />
      </InfoTabsDiv> */}
      <TabContentDiv>
        <ProgramDetails />
      </TabContentDiv>
      <TabContentDiv>
        <CourseInfo />
      </TabContentDiv>
      <ProgramScheduleDiv>
        <ProgramSchedule />
      </ProgramScheduleDiv>
    </PageDiv>
  );
};
