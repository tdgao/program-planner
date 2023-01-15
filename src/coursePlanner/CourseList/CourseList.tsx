import { useAtom } from "jotai";
import styled from "styled-components";
import { addedCoursesAtom, programCoursesAtom } from "../ProgramPlannerAtoms";

const LayoutDiv = styled.div`
  display: flex;
  column-gap: 48px;
`;

export const CourseList = () => {
  const [programCourses] = useAtom(programCoursesAtom);
  const [addedCourses] = useAtom(addedCoursesAtom);

  return (
    <LayoutDiv>
      <div>
        <strong>From Program</strong>
        {programCourses.map((course: any) => (
          <div>{course}</div>
        ))}
      </div>

      <div>
        <strong>Added Courses</strong>
        {addedCourses.map((course: any) => (
          <div>{course}</div>
        ))}
      </div>
    </LayoutDiv>
  );
};
