import { Typography } from "@mui/joy";
import { atom, useAtom } from "jotai";
import { atomFamily } from "jotai/utils";
import styled, { css } from "styled-components";
import { courseInfoAtom } from "./CourseInfo/CourseInfo";

const CourseDiv = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  width: max-content;
  cursor: pointer;

  ${({ active }) =>
    active &&
    css`
      border-radius: 4px;
      padding: 0 4px;
      margin: 0 -4px;
      background-color: #ddf1ff;
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

export type forceScheduleType = {
  courseId: string;
  scheduleSlot: string; // year-{1}-{term}, i.e. year-1-spring
};
export const forceScheduleFamily = atomFamily(
  (param: forceScheduleType) =>
    atom({
      scheduleSlot: param.scheduleSlot,
    }),
  (a: forceScheduleType, b: forceScheduleType) => a.courseId === b.courseId
);

export const activeCourseAtom = atom("false");

export const Course = (props: CourseProps) => {
  const { children: courseId } = props;
  const [, setCourseInfo] = useAtom(courseInfoAtom);
  const [forceSchedule] = useAtom(
    forceScheduleFamily({ courseId: courseId, scheduleSlot: "auto" })
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
    <CourseDiv onClick={showCourseInfo} active={active}>
      <Typography
        level="body1"
        textColor={forcedSchedule ? "primary.500" : "neutral.800"}
        sx={CourseTextStyles}
        fontWeight={active ? "500" : "400"}
      >
        {courseId}
      </Typography>
    </CourseDiv>
  );
};
