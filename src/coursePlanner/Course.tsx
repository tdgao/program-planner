import { Typography } from "@mui/joy";
import { atom, useAtom } from "jotai";
import { atomFamily } from "jotai/utils";
import styled from "styled-components";
import { courseInfoAtom } from "./CourseInfo/CourseInfo";

const CourseDiv = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
  cursor: pointer;
`;
const CourseTextStyles = {
  "&:hover": {
    textDecoration: "underline",
  },
};

interface CourseProps {
  children: string;
}

type paramType = {
  courseId: string;
  scheduleSlot: string; // year-{1}-{term}, i.e. year-1-spring
};
export const forceScheduleFamily = atomFamily(
  (param: paramType) =>
    atom({
      scheduleSlot: param.scheduleSlot,
    }),
  (a: paramType, b: paramType) => a.courseId === b.courseId
);

export const Course = (props: CourseProps) => {
  const { children: courseId } = props;
  const [, setCourseInfo] = useAtom(courseInfoAtom);
  const [forceSchedule] = useAtom(
    forceScheduleFamily({ courseId: courseId, scheduleSlot: "auto" })
  );
  const forcedSchedule = forceSchedule.scheduleSlot !== "auto";

  const showCourseInfo = () => {
    courseId && setCourseInfo(courseId);
  };

  return (
    <CourseDiv onClick={showCourseInfo}>
      <Typography
        level="body1"
        textColor={forcedSchedule ? "primary.500" : "neutral.800"}
        sx={CourseTextStyles}
      >
        {courseId}
      </Typography>
    </CourseDiv>
  );
};
