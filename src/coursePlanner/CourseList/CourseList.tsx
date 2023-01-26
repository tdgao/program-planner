import { Input, Typography } from "@mui/joy";
import { useAtom } from "jotai";
import styled from "styled-components";
import { LayoutDiv, SectionDiv } from "../AddCourse/AddCourses";
import { Course } from "../Course";
import { addedCoursesAtom, programCoursesAtom } from "../ProgramPlannerAtoms";
import { courseType } from "../ProgramSchedule/ProgramSchedule";

const CoursesDiv = styled.div`
  display: flex;
  column-gap: 32px;
  min-width: 280px;
`;
const CourseListDiv = styled.div`
  display: grid;
`;

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
