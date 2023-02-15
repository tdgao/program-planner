import { Typography } from "@mui/joy";
import styled, { css } from "styled-components";
import { CourseInfo } from "./CourseInfo/CourseInfo";
import { ScrollBarStyles } from "./CourseList/CourseList";
import { ProgramDetails } from "./ProgramDetails/ProgramDetails";
import { ProgramSchedule } from "./ProgramSchedule/ProgramSchedule";

const breakpoint = "1300px";

export const PageDiv = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 24px;
  padding: 12px 24px;
  box-sizing: border-box;
  max-height: 100vh;
  overflow: hidden;

  font-family: Arial, Helvetica, sans-serif;
  @media (max-width: ${breakpoint}) {
    padding: 12px 8px;
  }
`;

const layoutStyles = css`
  padding: 0 12px;
  box-sizing: border-box;
`;

const PanelsDiv = styled.div`
  display: flex;
  max-height: calc(100vh - 24px);
  @media (max-width: ${breakpoint}) {
    width: calc(100vw - 460px);
  }
`;
const PanelDiv = styled.div`
  ${layoutStyles}
  ${ScrollBarStyles}
  width: 480px;
  overflow-y: scroll;
`;

const ProgramScheduleDiv = styled.div`
  ${layoutStyles}
  display: grid;
  height: max-content;
  height: 100%;
`;
export const ProgramPlanner = () => {
  return (
    <PageDiv>
      <PanelsDiv>
        <PanelDiv>
          <ProgramDetails />
        </PanelDiv>
        <PanelDiv>
          <CourseInfo />
        </PanelDiv>
      </PanelsDiv>
      <ProgramScheduleDiv>
        <ProgramSchedule />
      </ProgramScheduleDiv>
    </PageDiv>
  );
};
