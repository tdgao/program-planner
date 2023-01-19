import { useAtom } from "jotai";
import styled from "styled-components";
import { MaxCoursesInput } from "./MaxCoursesInput";
import {
  unscheduledCoursesAtom,
  useProgramSchedule,
} from "./useProgramSchedule";

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
// TODO unHVC this
export const ProgramScheduleView = (props: ProgramScheduleProps) => {
  const { schedule } = props;
  const [unscheduledCourses] = useAtom(unscheduledCoursesAtom);

  return (
    <LayoutDiv>
      <div>
        <strong>Unscheduled Courses</strong>
        <br />
        {unscheduledCourses.map((course, i) => (
          <div key={i}>{course}</div>
        ))}
      </div>

      {schedule &&
        schedule.map((year: yearType, i) => (
          <YearDiv key={i} data-year={i + 1}>
            <strong>Year {i + 1}</strong>

            <MaxCoursesInput id={i + "fall"} />
            <MaxCoursesInput id={i + "spring"} />
            <MaxCoursesInput id={i + "summer"} />

            <pre>{JSON.stringify(year, null, 2)}</pre>
          </YearDiv>
        ))}
    </LayoutDiv>
  );
};

export const ProgramSchedule = () => {
  return <ProgramScheduleView {...useProgramSchedule()} />;
};
