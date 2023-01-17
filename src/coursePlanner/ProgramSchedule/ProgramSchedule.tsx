import { atom, useAtom } from "jotai";
import styled from "styled-components";
import { useProgramSchedule } from "./useProgramSchedule";

const LayoutDiv = styled.div`
  display: grid;
  row-gap: 32px;
`;

const YearDiv = styled.div`
  display: grid;
  row-gap: 12px;
`;

export type courseType = string | null;
export type termType = {
  courses: courseType[];
  maxCourses: number;
};
export type yearType = {
  fall: termType;
  spring: termType;
  summer: termType;
};
export interface ProgramScheduleProps {
  schedule: yearType[] | null;
}
export const ProgramScheduleView = (props: ProgramScheduleProps) => {
  const { schedule } = props;
  return (
    <LayoutDiv>
      <>
        {schedule &&
          schedule.map((year: any, yearNum: any) => (
            <YearDiv key={yearNum}>
              <strong>Year {yearNum + 1}</strong>
              <pre>{JSON.stringify(year, null, 2)}</pre>
            </YearDiv>
          ))}
      </>
    </LayoutDiv>
  );
};

export const ProgramSchedule = () => {
  return <ProgramScheduleView {...useProgramSchedule()} />;
};
