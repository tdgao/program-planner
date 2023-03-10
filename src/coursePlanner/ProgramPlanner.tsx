import styled, { css } from "styled-components";
import { CourseInfo } from "./CourseInfo/CourseInfo";
import { ProgramPlannerModal } from "./Modal";
import { ProgramDetails } from "./ProgramDetails/ProgramDetails";
import { ProgramSchedule } from "./ProgramSchedule/ProgramSchedule";

const maxBreakpoint = "1450px";

export const PageDiv = styled.div`
  display: flex;
  justify-content: center;
  column-gap: 12px;
  padding: 12px;
  box-sizing: border-box;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;

  font-family: Arial, Helvetica, sans-serif;
  @media (max-width: ${maxBreakpoint}) {
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
  @media (max-width: ${maxBreakpoint}) {
    width: calc(100vw - 460px);
  }
`;
const PanelDiv = styled.div`
  ${layoutStyles}
  width: 480px;
`;

const LineDiv = styled.div`
  height: calc(100vh - 100px);
  width: 1px;
  margin: auto 0;
  background-color: #ececec;
`;

const ProgramScheduleDiv = styled.div`
  ${layoutStyles}
  display: grid;
  height: max-content;
  height: 100%;
  width: 820px;
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
      <LineDiv />
      <ProgramScheduleDiv>
        <ProgramSchedule />
      </ProgramScheduleDiv>
      <ProgramPlannerModal />
    </PageDiv>
  );
};
