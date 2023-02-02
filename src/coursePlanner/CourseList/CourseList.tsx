import { Close } from "@mui/icons-material";
import { Input, Typography } from "@mui/joy";
import { atom, useAtom } from "jotai";
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
  overflow: auto;
  ${ScrollBarStyles}
`;
const CourseListDiv = styled.div`
  overflow: visible;
`;

const searchAtom = atom("");

export const CourseList = () => {
  const [programCourses] = useAtom(programCoursesAtom);
  const [addedCourses] = useAtom(addedCoursesAtom);
  const [search, setSearch] = useAtom(searchAtom);

  return (
    <LayoutDiv>
      <Typography level="mainHeading">Scheduled Courses</Typography>

      <SectionDiv>
        <Typography level="subHeading">Search scheduled courses </Typography>
        <Input
          placeholder={`e.g. "SENG 275" or "Math 211"`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          endDecorator={
            search && (
              <Close
                sx={{ cursor: "pointer", color: "grey" }}
                onClick={() => setSearch("")}
              />
            )
          }
        />
      </SectionDiv>

      <CoursesDiv>
        <CourseListDiv>
          <Typography level="body1" fontWeight="500" textColor="neutral.700">
            From Program
          </Typography>
          {programCourses
            .filter(
              (item) => (search ? item === search.toUpperCase().trim() : true) // TODO - nice to have: better search
            )
            .map(
              (course: courseType) =>
                course && <Course key={course}>{course}</Course>
            )}
        </CourseListDiv>

        <CourseListDiv>
          <Typography level="body1" fontWeight="500" textColor="neutral.700">
            Added Courses
          </Typography>
          {addedCourses
            .filter((item) =>
              search ? item === search.toUpperCase().trim() : true
            )
            .map(
              (course: courseType) =>
                course && <Course key={course}>{course}</Course>
            )}
        </CourseListDiv>
      </CoursesDiv>
    </LayoutDiv>
  );
};
