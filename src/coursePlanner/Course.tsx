import {
  styled as styled2,
  Theme,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/joy";
import { atom, useAtom } from "jotai";
import { atomFamily } from "jotai/utils";
import styled, { css } from "styled-components";
import { courseInfoAtom } from "./CourseInfo/CourseInfo";
import courseOfferedJson from "../assets/courseOffered.json";
import { ErrorOutline } from "@mui/icons-material";

const LayoutDiv = styled.div`
  display: flex;
  align-items: center;
  column-gap: 4px;
`;

const CourseDiv = styled.div<{ active: boolean; theme: Theme }>`
  display: flex;
  align-items: center;
  width: max-content;
  cursor: pointer;

  ${({ active, theme }) =>
    active &&
    css`
      border-radius: 4px;
      padding: 0 2px;
      background-color: ${theme.vars.palette.info[200]};
    `}
  transition: padding 200ms;
`;
const CourseTextStyles = {
  "&:hover": {
    textDecoration: "underline",
  },
};
const warningIcon = (
  <Tooltip
    title="This course may not be offered"
    variant="solid"
    placement="top"
  >
    <ErrorOutline color="warning" />
  </Tooltip>
);

type yearsOfferedType = {
  FALL: number[];
  SPRING: number[];
  SUMMER: number[];
};
const courseOffered: Record<string, yearsOfferedType> = courseOfferedJson;

export type termOfferedType = "YES" | "MAYBE" | "NO";

export type courseDataType = {
  courseId: string;
  scheduleSlot?: string; // year-{1}-{term}, i.e. year-1-spring
  offered?: {
    fall: termOfferedType;
    spring: termOfferedType;
    summer: termOfferedType;
  };
  forceOffered?: {
    fall: termOfferedType | null;
    spring: termOfferedType | null;
    summer: termOfferedType | null;
  };
  offeredYears?: yearsOfferedType;
};
export const courseDataFamily = atomFamily(
  (params: courseDataType) => {
    const { courseId, scheduleSlot = "auto" } = params;
    const offeredYears = courseOffered[courseId];

    return atom<Required<courseDataType>>({
      courseId: courseId,
      scheduleSlot: scheduleSlot,
      offeredYears: offeredYears,
      offered: {
        fall: isTermOffered(offeredYears.FALL),
        spring: isTermOffered(offeredYears.SPRING),
        summer: isTermOffered(offeredYears.SUMMER),
      },
      forceOffered: {
        fall: null,
        spring: null,
        summer: null,
      },
    });
  },
  (a: courseDataType, b: courseDataType) => a.courseId === b.courseId
);

export const activeCourseAtom = atom("");

interface CourseProps {
  term?: "fall" | "spring" | "summer";
  inSchedule?: boolean;
  children: string;
}
export const Course = (props: CourseProps) => {
  const { children: courseId, term, inSchedule } = props;
  const theme = useTheme();
  const [, setCourseInfo] = useAtom(courseInfoAtom);
  const [courseData] = useAtom(courseDataFamily({ courseId: courseId }));
  const forcedSchedule = courseData.scheduleSlot !== "auto";
  const [activeCourse, setActiveCourse] = useAtom(activeCourseAtom);
  const active = activeCourse === courseId;

  const offeringWarning =
    inSchedule && term && courseData.offered?.[term] === "MAYBE";

  const showCourseInfo = () => {
    if (courseId) {
      setCourseInfo(activeCourse && active ? "" : courseId);
      setActiveCourse(activeCourse && active ? "" : courseId);
    }
  };

  return (
    <LayoutDiv>
      <CourseDiv onClick={showCourseInfo} active={active} theme={theme}>
        <Typography
          level="body1"
          textColor={forcedSchedule ? "primary.500" : "neutral.800"}
          sx={CourseTextStyles}
        >
          {courseId}
        </Typography>
      </CourseDiv>
      {offeringWarning && warningIcon}
    </LayoutDiv>
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
export function isTermOffered(yearsOffered: number[]): termOfferedType {
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
