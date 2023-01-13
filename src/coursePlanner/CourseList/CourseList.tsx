import styled from "styled-components";

const LayoutDiv = styled.div`
  display: grid;
`;

export interface CourseListProps {
  courses: string[];
}

export const CourseList = (props: CourseListProps) => {
  return (
    <LayoutDiv>
      <div>
        From Degree
        <div>courses</div>
      </div>

      <div>
        Added Courses
        <div>courses</div>
      </div>
    </LayoutDiv>
  );
};
