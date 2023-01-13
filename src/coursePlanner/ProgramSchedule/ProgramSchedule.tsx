import styled from "styled-components";

const LayoutDiv = styled.div`
  display: grid;
`;

export interface ProgramScheduleProps {
  courses: string[];
}

export const ProgramSchedule = (props: ProgramScheduleProps) => {
  const { courses } = props;
  return (
    <LayoutDiv>
      <div>
        Year 1<label htmlFor="max-courses">Max courses in this term</label>
        <input type="number" name="max-courses" />
      </div>
      <div>
        {courses.map((course) => (
          <div>{course}</div>
        ))}
      </div>
    </LayoutDiv>
  );
};
