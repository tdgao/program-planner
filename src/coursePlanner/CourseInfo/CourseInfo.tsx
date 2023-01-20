import { atom, useAtom } from "jotai";
import styled from "styled-components";
import { coursesAtom } from "../ProgramPlannerAtoms";

const LayoutDiv = styled.div`
  display: grid;
`;

export const courseInfoAtom = atom("");

export const CourseInfo = () => {
  const [course, setCourse] = useAtom(courseInfoAtom);
  const [courses] = useAtom(coursesAtom);

  const courseExists = !!courses[course];

  return (
    <LayoutDiv>
      <div>Show course info</div>
      <input
        type="text"
        placeholder={`Search courses, e.g. "SENG 275" or "Math 211"`}
        value={course}
        onChange={(e) => {
          setCourse(e.target.value.toUpperCase().replace(/\s/g, ""));
        }}
      />
      {courseExists ? (
        <>
          <div>{course}</div>
          <pre>{JSON.stringify(courses[course], null, 2)}</pre>
        </>
      ) : (
        <>course does not exist</>
      )}
    </LayoutDiv>
  );
};
