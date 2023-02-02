import { styled as styled2, Theme, Typography, useTheme } from "@mui/joy";
import { atom, useAtom } from "jotai";
import { atomFamily } from "jotai/utils";
import styled, { css } from "styled-components";
import { courseInfoAtom } from "./CourseInfo/CourseInfo";
import courseOfferedJson from "../assets/courseOffered.json";

const CourseDiv = styled.div<{ active: boolean; theme: Theme }>`
  display: flex;
  align-items: center;
  width: max-content;
  cursor: pointer;

  ${({ active, theme }) =>
    active &&
    css`
      border-radius: 4px;
      background-color: ${theme.vars.palette.info[200]};
    `}
`;
const CourseTextStyles = {
  "&:hover": {
    textDecoration: "underline",
  },
};

type yearsOfferedType = {
  FALL: number[];
  SPRING: number[];
  SUMMER: number[];
};
const courseOffered: Record<string, yearsOfferedType> = courseOfferedJson;

type termOfferedType = "YES" | "MAYBE" | "NO";

export type courseDataType = {
  courseId: string;
  scheduleSlot?: string; // year-{1}-{term}, i.e. year-1-spring
  offered?: {
    fall: termOfferedType;
    spring: termOfferedType;
    summer: termOfferedType;
  };
  offeredYears?: yearsOfferedType;
};
export const courseDataFamily = atomFamily(
  (params: courseDataType) => {
    const { courseId, scheduleSlot = "auto" } = params;
    const offeredYears = courseOffered[courseId];

    return atom({
      scheduleSlot: scheduleSlot,
      offeredYears: offeredYears,
      offered: {
        fall: isTermOffered(offeredYears.FALL),
        spring: isTermOffered(offeredYears.SPRING),
        summer: isTermOffered(offeredYears.SUMMER),
      },
    });
  },
  (a: courseDataType, b: courseDataType) => a.courseId === b.courseId
);

export const activeCourseAtom = atom("");

interface CourseProps {
  children: string;
}
export const Course = (props: CourseProps) => {
  const theme = useTheme();
  const { children: courseId } = props;
  const [, setCourseInfo] = useAtom(courseInfoAtom);
  const [forceSchedule] = useAtom(courseDataFamily({ courseId: courseId }));
  const forcedSchedule = forceSchedule.scheduleSlot !== "auto";
  const [activeCourse, setActiveCourse] = useAtom(activeCourseAtom);
  const active = activeCourse === courseId;

  const showCourseInfo = () => {
    if (courseId) {
      setCourseInfo(courseId);
      setActiveCourse(courseId);
    }
  };

  return (
    <CourseDiv onClick={showCourseInfo} active={active} theme={theme}>
      <Typography
        level="body1"
        textColor={forcedSchedule ? "primary.500" : "neutral.800"}
        sx={CourseTextStyles}
        // fontWeight={active ? "500" : "400"}
      >
        {courseId}
      </Typography>
    </CourseDiv>
  );
};

/**
 * Tries to predict if a course will be offered in a specific term.
 * "YES" is where it has been offered for the past 4 years.
 * "NO" is where it has never been offered.
 * "MAYBE" is where it has been offered on and off.
 * @param yearsOffered
 * @returns termOfferedType
 */
function isTermOffered(yearsOffered: number[]): termOfferedType {
  if (yearsOffered.length === 0) return "NO";

  const current_year = 2020; // TODO: replace this with a global year one day
  const numValidatingYears = 4;
  const years = Array.from(
    Array(numValidatingYears),
    (_, i) => current_year - i
  ); // 2020, 2019, 2018...

  const allYearsOffered = years.every((year) => yearsOffered.includes(year));
  if (!allYearsOffered) return "MAYBE";

  return "YES";
}
