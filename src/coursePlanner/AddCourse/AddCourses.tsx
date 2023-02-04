import { Typography, Autocomplete } from "@mui/joy";
import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import styled from "styled-components";
import programsJson from "../../assets/programs.json";
import { AddCoursesInput } from "./AddCoursesInput";

export const LayoutDiv = styled.div`
  display: grid;
  row-gap: 16px;
`;
export const SectionDiv = styled.div`
  display: grid;
  row-gap: 8px;
`;

const programs = Object.values(programsJson).map(
  (program) => program.programId
);
export const currentProgramAtom = atomWithStorage(
  "currentProgramAtom",
  programs[254]
);

export const AddCourses = () => {
  const [currentProgram, setCurrentProgram] = useAtom(currentProgramAtom);

  return (
    <LayoutDiv>
      <Typography level="mainHeading">Set Your Courses</Typography>

      <SectionDiv>
        <Typography level="subHeading">Include all from a program</Typography>
        <Autocomplete
          options={programs}
          value={currentProgram}
          onChange={(e, newValue) => {
            newValue && setCurrentProgram(newValue);
          }}
        />
      </SectionDiv>
      <SectionDiv>
        <AddCoursesInput />
      </SectionDiv>
    </LayoutDiv>
  );
};
