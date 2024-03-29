import { Chip, Link, Typography } from "@mui/joy";
import { useAtom } from "jotai";
import styled from "styled-components";
import { Course } from "../Course";
import { ScrollBarStyles } from "../CourseList/CourseList";
import { MaxCoursesInput } from "./MaxCoursesInput";
import { ImportExport } from "./ImportExport";

import { UnscheduledAlert } from "./UnscheduledAlert";
import {
  unscheduledCoursesAtom,
  useProgramSchedule,
} from "./useProgramSchedule";

const LayoutDiv = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;

const HeadingDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
`;
const YearDiv = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  width: 380px;
  min-height: 225px;
`;
const YearInnerDiv = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 12px;
  border: 1px solid #c7c7c7;
  border-radius: 8px;
  padding: 8px 12px;
`;
const TermDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100px;
`;
const ScheduleDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 800px;
  align-items: flex-start;
  row-gap: 16px;
  column-gap: 24px;

  // for filling up the rest of space
  position: absolute;
`;
const ScheduleDivWrapper = styled.div`
  // for filling up the rest of space
  flex: 1;
  position: relative;
  overflow-y: scroll;
  ${ScrollBarStyles}
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
      <Typography level="body1" fontFamily="monospace">
        <HeadingDiv>
          <ImportExport />
          <Link href="https://github.com/tdgao/program-planner" target="_blank">
            GitHub
          </Link>
        </HeadingDiv>
      </Typography>

      {unscheduledCourses.length > 0 && (
        <UnscheduledAlert unscheduledCourses={unscheduledCourses} />
      )}

      <ScheduleDivWrapper>
        <ScheduleDiv>
          {schedule &&
            schedule.map((year: yearType, i: number) => {
              if (noCoursesInYear(year) && i > 3) return null;

              return (
                <YearDiv key={i} data-year={i + 1}>
                  <Typography level="h5" sx={{ ml: "4px" }}>
                    Year {i + 1}
                  </Typography>

                  <YearInnerDiv>
                    {/* TODO refactor this to use one component/mapping */}
                    <TermDiv>
                      <Typography fontWeight="500">Fall</Typography>
                      <MaxCoursesInput id={`year-${i}-fall`} />
                      {year.fall.courses.map(
                        (course, i) =>
                          course && (
                            <Course key={i} term="fall" inSchedule>
                              {course}
                            </Course>
                          )
                      )}
                    </TermDiv>
                    <TermDiv>
                      <Typography fontWeight="500">Spring</Typography>
                      <MaxCoursesInput id={`year-${i}-spring`} />
                      {year.spring.courses.map(
                        (course, i) =>
                          course && (
                            <Course key={i} term="spring" inSchedule>
                              {course}
                            </Course>
                          )
                      )}
                    </TermDiv>
                    <TermDiv>
                      <Typography fontWeight="500">Summer</Typography>
                      <MaxCoursesInput id={`year-${i}-summer`} />
                      {year.summer.courses.map(
                        (course, i) =>
                          course && (
                            <Course key={i} term="summer" inSchedule>
                              {course}
                            </Course>
                          )
                      )}
                    </TermDiv>
                  </YearInnerDiv>
                </YearDiv>
              );
            })}
        </ScheduleDiv>
      </ScheduleDivWrapper>
    </LayoutDiv>
  );
};

function noCoursesInYear(year: yearType) {
  return (
    year.fall.courses.every((item) => item === null) &&
    year.spring.courses.every((item) => item === null) &&
    year.summer.courses.every((item) => item === null)
  );
}
