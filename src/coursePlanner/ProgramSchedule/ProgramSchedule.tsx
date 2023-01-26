import { Info } from "@mui/icons-material";
import { Alert, Typography } from "@mui/joy";
import { useAtom } from "jotai";
import styled, { css } from "styled-components";
import { Course } from "../Course";
import { MaxCoursesInput } from "./MaxCoursesInput";
import { UnscheduledAlert } from "./UnscheduledAlert";
import {
  unscheduledCoursesAtom,
  useProgramSchedule,
} from "./useProgramSchedule";

const LayoutDiv = styled.div`
  display: grid;
  row-gap: 16px;
  width: 360px;
`;
const YearDiv = styled.div`
  display: grid;
  row-gap: 0px;
`;
const YearInnerDiv = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 12px;
  border: 1px solid #c7c7c7;
  border-radius: 8px;
  padding: 8px 12px;
  margin: 0 -4px;
`;
const TermDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100px;
`;

export type courseType = string | null;
type scheduleTermType = {
  courses: courseType[];
  maxCourses: number;
};
export type yearType = {
  fall: scheduleTermType;
  spring: scheduleTermType;
  summer: scheduleTermType;
};

export const ProgramSchedule = () => {
  const { schedule } = useProgramSchedule();
  const [unscheduledCourses] = useAtom(unscheduledCoursesAtom);

  return (
    <LayoutDiv>
      <Typography level="mainHeading">Program Schedule</Typography>

      {unscheduledCourses && (
        <UnscheduledAlert unscheduledCourses={unscheduledCourses} />
      )}

      {schedule &&
        schedule.map((year: yearType, i: number) => (
          <YearDiv key={i} data-year={i + 1}>
            <Typography level="h5">Year {i + 1}</Typography>

            <YearInnerDiv>
              {/* TODO refactor this to use one component/mapping */}
              <TermDiv>
                <Typography fontWeight="500">Fall</Typography>
                <MaxCoursesInput id={`year-${i}-fall`} />
                {year.fall.courses.map(
                  (course, i) => course && <Course key={i}>{course}</Course>
                )}
              </TermDiv>
              <TermDiv>
                <Typography fontWeight="500">Spring</Typography>
                <MaxCoursesInput id={`year-${i}-spring`} />
                {year.spring.courses.map(
                  (course, i) => course && <Course key={i}>{course}</Course>
                )}
              </TermDiv>
              <TermDiv>
                <Typography fontWeight="500">Summer</Typography>
                <MaxCoursesInput id={`year-${i}-summer`} />
                {year.summer.courses.map(
                  (course, i) => course && <Course key={i}>{course}</Course>
                )}
              </TermDiv>
            </YearInnerDiv>
          </YearDiv>
        ))}
    </LayoutDiv>
  );
};
