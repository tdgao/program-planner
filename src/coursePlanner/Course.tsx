import { styled as styled2, Theme, Typography, useTheme } from "@mui/joy";
import { atom, useAtom } from "jotai";
import { atomFamily } from "jotai/utils";
import styled, { css } from "styled-components";
import { courseInfoAtom } from "./CourseInfo/CourseInfo";

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

interface CourseProps {
  children: string;
}

export type courseDataType = {
  courseId: string;
  scheduleSlot: string; // year-{1}-{term}, i.e. year-1-spring
  unhandledCases?: string[];
};
export const courseDataFamily = atomFamily(
  (param: courseDataType) =>
    atom({
      scheduleSlot: param.scheduleSlot,
      unhandledCases: param.unhandledCases,
    }),
  (a: courseDataType, b: courseDataType) => a.courseId === b.courseId
);

export const activeCourseAtom = atom("");

export const Course = (props: CourseProps) => {
  const theme = useTheme();
  const { children: courseId } = props;
  const [, setCourseInfo] = useAtom(courseInfoAtom);
  const [forceSchedule] = useAtom(
    courseDataFamily({ courseId: courseId, scheduleSlot: "auto" })
  );
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
