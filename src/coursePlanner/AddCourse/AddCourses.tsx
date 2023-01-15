import { atom, useAtom } from "jotai";
import styled from "styled-components";
import {
  addCourseAtom,
  addedCoursesAtom,
  coursesAtom,
  currentProgramAtom,
  programCoursesAtom,
  removeCourseAtom,
} from "../ProgramPlannerAtoms";

const LayoutDiv = styled.div`
  display: grid;
  row-gap: 12px;
`;

const inputAtom = atom("");

export const AddCourses = () => {
  const [, setInput] = useAtom(inputAtom);

  const [, setCurrentProgram] = useAtom(currentProgramAtom);

  const [courseInput] = useAtom(inputAtom);
  const [, addCourse] = useAtom(addCourseAtom);
  const [courses] = useAtom(coursesAtom);

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
      <div style={{ display: "grid" }}>
        <div>Add single course</div>
        <input
          type="text"
          placeholder={`Search courses, e.g. "SENG 275" or "Math 211"`}
          onChange={(e) =>
            setInput(e.target.value.toUpperCase().replace(/\s/g, ""))
          }
        />
        <button
          onClick={() => {
            courses[courseInput]
              ? addCourse(courseInput)
              : console.log("Could not find course");
          }}
        >
          Add course
        </button>
      </div>
    </LayoutDiv>
  );
};
