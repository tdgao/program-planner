import { useAtom } from "jotai";
import styled from "styled-components";
import { courseInfoAtom } from "./CourseInfo/CourseInfo";
import { courseType } from "./ProgramSchedule/ProgramSchedule";

const CourseDiv = styled.div`
  display: grid;
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

  /**
   * onClick - opens coure info
   */

  return <CourseDiv onClick={showCourseInfo}>{courseId}</CourseDiv>;
};
