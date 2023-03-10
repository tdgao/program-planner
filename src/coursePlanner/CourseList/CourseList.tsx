import { CloseRounded } from "@mui/icons-material";
import { FormControl, FormLabel, Input, Typography } from "@mui/joy";
import { atom, useAtom } from "jotai";
import styled, { css } from "styled-components";
import { Course } from "../Course";
import {
  addedCoursesAtom,
  currentProgramCoursesAtom,
} from "../ProgramPlannerAtoms";
import { courseType } from "../ProgramSchedule/ProgramSchedule";

const LayoutDiv = styled.div`
  display: grid;
  row-gap: 16px;
`;
export const SectionDiv = styled.div`
  display: grid;
  row-gap: 8px;
`;

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
    background: transparent;
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
  const [programCourses] = useAtom(currentProgramCoursesAtom);

  const sortedProgramCourses = programCourses.sort((a, b) =>
    a.localeCompare(b)
  );
  const [addedCourses] = useAtom(addedCoursesAtom);
  const [search, setSearch] = useAtom(searchAtom);

  const searchFilter = (item: string) =>
    search ? item.match(search.toUpperCase().replaceAll(" ", "")) : true;

  return (
    <LayoutDiv>
      <Typography level="mainHeading">Scheduled Courses</Typography>

      <SectionDiv>
        <FormControl>
          <FormLabel>
            <Typography fontWeight={500}>Search scheduled courses</Typography>
          </FormLabel>
          <Input
            placeholder={`e.g. "SENG 275" or "Math 211"`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            endDecorator={
              search && (
                <CloseRounded
                  sx={{ cursor: "pointer", color: "grey" }}
                  onClick={() => setSearch("")}
                />
              )
            }
          />
        </FormControl>
      </SectionDiv>

      <CoursesDiv>
        <CourseListDiv>
          <Typography level="body1" fontWeight="500" textColor="neutral.700">
            Program courses
          </Typography>
          {/* TODO - remove the component margin */}
          {sortedProgramCourses
            .filter(searchFilter)
            .map(
              (course: courseType) =>
                course && <Course key={course}>{course}</Course>
            )}
        </CourseListDiv>

        <CourseListDiv>
          <Typography level="body1" fontWeight="500" textColor="neutral.700">
            Added courses
          </Typography>
          {addedCourses
            .filter(searchFilter)
            .map(
              (course: courseType) =>
                course && <Course key={course}>{course}</Course>
            )}
        </CourseListDiv>
      </CoursesDiv>
    </LayoutDiv>
  );
};
