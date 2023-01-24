import { Typography } from "@mui/joy";
import { useAtom } from "jotai";
import styled from "styled-components";
import { courseInfoAtom } from "./CourseInfo/CourseInfo";
import { courseType } from "./ProgramSchedule/ProgramSchedule";

const CourseDiv = styled.div`
  display: grid;
  width: max-content;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

interface CourseProps {
  children?: string;
}

export const Course = (props: CourseProps) => {
  const { children: courseId } = props;
  const [, setCourseInfo] = useAtom(courseInfoAtom);

  const showCourseInfo = () => {
    courseId && setCourseInfo(courseId);
  };

  return (
    <CourseDiv onClick={showCourseInfo}>
      <Typography level="body1">{courseId}</Typography>
    </CourseDiv>
  );
};
