import { atom, useAtom } from "jotai";
import styled from "styled-components";
import {
  addCourseAtom,
  addedCoursesAtom,
  currentProgramAtom,
  programCoursesAtom,
  removeCourseAtom,
} from "../ProgramPlannerAtoms";

const LayoutDiv = styled.div`
  display: grid;
  row-gap: 12px;
`;

const CourseInput = styled.input`
  width: 350px;
`;

const inputAtom = atom("");

export const AddCourses = () => {
  const [input, setInput] = useAtom(inputAtom);

  const [addedCourses] = useAtom(addedCoursesAtom);
  const [, addCourse] = useAtom(addCourseAtom);

  const [currentProgram, setCurrentProgram] = useAtom(currentProgramAtom);
  const programCourses = useAtom(programCoursesAtom);

  console.log(currentProgram, programCourses);

  return (
    <LayoutDiv>
      <div>
        <div>Include all from a degree</div>
        <select
          id="programs"
          onChange={(e) => {
            setCurrentProgram(e.target.value);
          }}
        >
          <option value="Software Engineering (Bachelor of Software Engineering)">
            Software Engineering (Bachelor of Software Engineering)
          </option>
          <option value="Biology (Bachelor of Science - Major)">
            Biology (Bachelor of Science - Major)
          </option>
        </select>
      </div>
      <div>
        <div>Add single course</div>
        <CourseInput
          type="text"
          placeholder={`Search courses, e.g. "SENG 275" or "Math 211"`}
          onChange={(e) => setInput(e.target.value)}
        />
        <br />
        <button
          onClick={() => {
            addCourse(input);
          }}
        >
          Add course
        </button>
      </div>
    </LayoutDiv>
  );
};
