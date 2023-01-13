import styled from "styled-components";

const LayoutDiv = styled.div`
  display: grid;
`;

export const AddCourses = () => {
  return (
    <LayoutDiv>
      <div>Include all from a degree</div>
      <select id="programs">
        <option value="SENG">SENG</option>
        <option value="MATH">MATH</option>
      </select>
      <div>Include all from a degree</div>
      <input
        type="text"
        placeholder={`Search courses, e.g. "SENG 275" or "Math 211"`}
      />
    </LayoutDiv>
  );
};
