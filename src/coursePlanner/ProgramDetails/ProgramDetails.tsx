import { Autocomplete, FormControl, FormLabel, Link } from "@mui/joy";
import { Typography } from "@mui/joy";
import { atom, useAtom, useAtomValue } from "jotai";
import { atomWithStorage } from "jotai/utils";
import styled from "styled-components";
import { SelectProgramCourses } from "./SelectProgramCourses";
import programsJsonObj from "../../assets/programs.json";
import { Launch, School } from "@mui/icons-material";
import { addedCoursesAtom, programsObjType } from "../ProgramPlannerAtoms";
import { Course } from "../Course";
import { AddCoursesInput } from "../AddCourse/AddCoursesInput";
const programsJson: programsObjType = programsJsonObj;

const LayoutDiv = styled.div`
  display: grid;
  row-gap: 20px;
`;
const ProgramDiv = styled.div`
  display: grid;
  row-gap: 8px;
`;

const programs = Object.values(programsJson).map(
  (program) => program.programId
);
export const currentProgramAtom = atomWithStorage(
  "currentProgramAtom",
  programs[0]
);

export const ProgramDetails = () => {
  const [currentProgram, setCurrentProgram] = useAtom(currentProgramAtom);
  const addedCourses = useAtomValue(addedCoursesAtom);

  return (
    <LayoutDiv>
      <ProgramDiv>
        <FormControl>
          <FormLabel>
            <Typography fontWeight={500}>Your program</Typography>
          </FormLabel>
          <Autocomplete
            variant="plain"
            color="primary"
            startDecorator={<School color="primary" />}
            sx={{ fontWeight: 500 }}
            options={programs}
            value={currentProgram}
            title={currentProgram}
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
          color="neutral"
          sx={{ width: "max-content" }}
        >
          See program in UVic
        </Link>
      </ProgramDiv>

      <div>
        <AddCoursesInput />
        <Typography level="body1" fontWeight="500" textColor="neutral.700">
          Added courses
        </Typography>
        {addedCourses.map(
          (course: string) => course && <Course key={course}>{course}</Course>
        )}
      </div>

      <SelectProgramCourses />
    </LayoutDiv>
  );
};
