import { Input, Typography } from "@mui/joy";
import { useAtom } from "jotai";
import styled, { css } from "styled-components";
import { LayoutDiv, SectionDiv } from "../AddCourse/AddCourses";
import { Course } from "../Course";
import { addedCoursesAtom, programCoursesAtom } from "../ProgramPlannerAtoms";
import { courseType } from "../ProgramSchedule/ProgramSchedule";

export const ScrollBarStyles = css`
  & {
    scrollbar-width: thin;
    scrollbar-color: #ebebef white;
  }

  /* Works on Chrome, Edge, and Safari */
  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: white;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ebebef;
    border-radius: 20px;
    border: 3px solid white;
  }
`;

const CoursesDiv = styled.div`
  display: flex;
  column-gap: 32px;
  min-width: 280px;
  height: 100%;
  max-height: calc(100vh - 190px);
  overflow-y: scroll;
  ${ScrollBarStyles}
`;
const CourseListDiv = styled.div``;

export const CourseList = () => {
  const [programCourses] = useAtom(programCoursesAtom);
  const [addedCourses] = useAtom(addedCoursesAtom);

  return (
    <LayoutDiv>
      <Typography level="mainHeading">Scheduled Courses</Typography>

      <SectionDiv>
        <Typography level="subHeading">Search scheduled courses </Typography>
        <Input placeholder={`e.g. "SENG 275" or "Math 211"`} />
      </SectionDiv>

      <CoursesDiv>
        <CourseListDiv>
          <Typography level="body1" fontWeight="500" textColor="neutral.700">
            From Program
          </Typography>
          {programCourses.map(
            (course: courseType) =>
              course && <Course key={course}>{course}</Course>
          )}
        </CourseListDiv>

        <CourseListDiv>
          <Typography level="body1" fontWeight="500" textColor="neutral.700">
            Added Courses
          </Typography>
          {addedCourses.map(
            (course: courseType) =>
              course && <Course key={course}>{course}</Course>
          )}
        </CourseListDiv>
      </CoursesDiv>
    </LayoutDiv>
  );
};
