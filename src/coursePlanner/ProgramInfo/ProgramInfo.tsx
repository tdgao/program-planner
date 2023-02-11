import { Autocomplete, FormControl, FormLabel, Link } from "@mui/joy";
import { Typography } from "@mui/joy";
import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import styled from "styled-components";
import { SelectProgramCourses } from "./SelectProgramCourses";
import programsJsonObj from "../../assets/programs.json";
import { Launch } from "@mui/icons-material";
import { programsObjType } from "../ProgramPlannerAtoms";
const programsJson: programsObjType = programsJsonObj;

const LayoutDiv = styled.div`
  display: grid;
  row-gap: 12px;
`;

const programs = Object.values(programsJson).map(
  (program) => program.programId
);
export const currentProgramAtom = atomWithStorage(
  "currentProgramAtom",
  programs[0]
);

export const ProgramInfo = () => {
  const [currentProgram, setCurrentProgram] = useAtom(currentProgramAtom);

  return (
    <LayoutDiv>
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

      <Link
        href={programsJson[currentProgram].url}
        target="_blank"
        rel="noopener"
        endDecorator={<Launch fontSize="small" />}
        sx={{ width: "max-content" }}
      >
        See program in UVic
      </Link>

      <SelectProgramCourses />
    </LayoutDiv>
  );
};
