import { Autocomplete, FormControl, FormLabel, Link } from "@mui/joy";
import { Typography } from "@mui/joy";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import styled from "styled-components";
import { SelectProgramCourses } from "./SelectProgramCourses";
import programsJsonObj from "../../assets/programs.json";
import { Launch, School } from "@mui/icons-material";
import { programsObjType } from "../ProgramPlannerAtoms";
import { AddCoursesInput } from "../AddCourse/AddCoursesInput";
import { ScrollBarStyles } from "../CourseList/CourseList";
const programsJson: programsObjType = programsJsonObj;

const LayoutDiv = styled.div`
  display: grid;
  row-gap: 4px;
`;

const ScrollDiv = styled.div`
  display: grid;
  row-gap: 20px;
  overflow-y: scroll;
  max-height: calc(100vh - 90px);
  padding-top: 8px;

  ${ScrollBarStyles}
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

  return (
    <LayoutDiv>
      <Typography level="mainHeading">Program details</Typography>
      <ScrollDiv>
        <ProgramDiv>
          <FormControl>
            <FormLabel>
              <Typography fontWeight={500} endDecorator={<School />}>
                Your program
              </Typography>
            </FormLabel>
            <Autocomplete
              variant="outlined"
              size="sm"
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
            sx={{ width: "max-content" }}
          >
            See program in UVic
          </Link>
        </ProgramDiv>
        <AddCoursesInput />
        <SelectProgramCourses />
      </ScrollDiv>
    </LayoutDiv>
  );
};
