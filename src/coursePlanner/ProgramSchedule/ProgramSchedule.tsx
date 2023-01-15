import styled from "styled-components";

const LayoutDiv = styled.div`
  display: grid;
`;

export const ProgramSchedule = () => {
  return (
    <LayoutDiv>
      <div>
        Year 1<label htmlFor="max-courses">Max courses in this term</label>
        <input type="number" name="max-courses" />
      </div>
      <div></div>
    </LayoutDiv>
  );
};
