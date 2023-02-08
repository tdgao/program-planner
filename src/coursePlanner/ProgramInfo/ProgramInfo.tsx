import { Autocomplete, FormControl, FormLabel } from "@mui/joy";
import { Typography } from "@mui/joy";
import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import programsJson from "../../assets/programs.json";
import styled from "styled-components";

const programs = Object.values(programsJson).map(
  (program) => program.programId
);
export const currentProgramAtom = atomWithStorage(
  "currentProgramAtom",
  programs[254]
);

export const ProgramInfo = () => {
  const [currentProgram, setCurrentProgram] = useAtom(currentProgramAtom);

  return (
    <FormControl>
      <FormLabel>
        <Typography fontWeight={500}>Set your program</Typography>
      </FormLabel>
      <Autocomplete
        variant="soft"
        color="primary"
        options={programs}
        value={currentProgram}
        onChange={(e, newValue) => {
          newValue && setCurrentProgram(newValue);
        }}
      />
    </FormControl>
  );
};
