import {
  Typography,
  Button,
  Autocomplete,
  FormControl,
  FormLabel,
  Chip,
} from "@mui/joy";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  addCourseAtom,
  addedCoursesAtom,
  courseObjType,
  removeCourseAtom,
} from "../ProgramPlannerAtoms";
import coursesJson from "../../assets/courses.json";
import styled from "styled-components";
import { Course } from "../Course";
import { Close } from "@mui/icons-material";

const LayoutDiv = styled.div`
  display: grid;
  row-gap: 8px;
`;
const CoursesDiv = styled.div`
  display: inline-flex;
  flex-direction: column;
  width: max-content;
`;
const CourseDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const courseOptionsAtom = atom<courseObjType[]>([]);
const courses = Object.values(coursesJson);
const coursePrefixes: string[] = [
  ...new Set(courses.map((course) => toPrefix(course.courseId))),
]; // ENGR, MATH, etc... creating a set makes unique items

let courseOptionsMap: Record<string, courseObjType[]> = {};
coursePrefixes.forEach((prefix) => {
  courseOptionsMap[prefix] = courses.filter(
    (course) => prefix === toPrefix(course.courseId)
  );
});

const handleSetOptions = (
  input: string,
  setCourseOptions: (options: courseObjType[]) => void
) => {
  const inputPrefix = toPrefix(input.toUpperCase());
  if (coursePrefixes.includes(inputPrefix))
    setCourseOptions(courseOptionsMap[inputPrefix]);
  else if (inputPrefix === "") setCourseOptions([]);
};

export const AddCoursesInput = () => {
  const addCourse = useSetAtom(addCourseAtom);
  const removeCourse = useSetAtom(removeCourseAtom);
  const addedCourses = useAtomValue(addedCoursesAtom);
  const [courseOptions, setCourseOptions] = useAtom(courseOptionsAtom);

  const value = null;

  return (
    <FormControl>
      <FormLabel>
        <Typography fontWeight={500}>Add courses</Typography>
      </FormLabel>
      <LayoutDiv>
        <Autocomplete
          placeholder="Search and add courses..."
          noOptionsText="Search courses, e.g MATH101"
          size="sm"
          value={value}
          options={courseOptions}
          getOptionLabel={(option) => option.courseId}
          onInputChange={(e, inputVal) => {
            handleSetOptions(inputVal, setCourseOptions);
          }}
          onChange={(e, course) => {
            course && addCourse(course.courseId);
          }}
        />
        <CoursesDiv>
          {addedCourses.map(
            (course: string) =>
              course && (
                <CourseDiv key={course}>
                  <Course>{course}</Course>
                  <Chip
                    onClick={() => removeCourse(course)}
                    color="neutral"
                    size="sm"
                    variant="plain"
                  >
                    <Close sx={{ position: "relative", top: "2px" }} />
                  </Chip>
                </CourseDiv>
              )
          )}
        </CoursesDiv>
      </LayoutDiv>
    </FormControl>
  );
};

function toPrefix(courseId: string) {
  return courseId.replace(/\d+/g, "");
}
