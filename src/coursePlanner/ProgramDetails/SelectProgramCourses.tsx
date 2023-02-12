import { useAtom, useAtomValue } from "jotai";
import programsJsonObj from "../../assets/programs.json";
import {
  defaultProgramCoursesAtom,
  programsObjType,
} from "../ProgramPlannerAtoms";
import { currentProgramAtom } from "./ProgramDetails";
import parse, { domToReact } from "html-react-parser";
import { Alert, Checkbox, Link, Sheet, Typography } from "@mui/joy";
import { HtmlPrereqsDiv } from "../CourseInfo/CourseInfoContent";
import styled from "styled-components";
import { ErrorOutline } from "@mui/icons-material";
import { atomFamily, atomWithStorage } from "jotai/utils";

const programsJson: programsObjType = programsJsonObj;

type paramsType = {
  program: string;
  coursesToSchedule: string[];
};
export const programCoursesFamily = atomFamily(
  (params: paramsType) => {
    const { program, coursesToSchedule } = params;
    return atomWithStorage(program, coursesToSchedule);
  },
  (a: paramsType, b: paramsType) => a.program === b.program
);

export const SelectProgramCourses = () => {
  const [currentProgram] = useAtom(currentProgramAtom);
  const defaultProgramCourses = useAtomValue(defaultProgramCoursesAtom);
  const [programCourses, setProgramCourses] = useAtom(
    programCoursesFamily({
      program: currentProgram,
      coursesToSchedule: defaultProgramCourses,
    })
  );

  const html = programsJson[currentProgram].htmlRequirements;
  const htmlParseOptions = {
    replace: (domNode: any) => {
      if (domNode?.children?.[0]?.name === "a") {
        const aTagNode = domNode.children[0];
        const href =
          "https://www.uvic.ca/calendar/undergrad/index.php" +
          aTagNode.attribs.href;

        const courseId = aTagNode.children[0].data;
        return (
          <Sheet
            sx={{
              display: "flex",
              alignItems: "center",
              columnGap: "4px",
              width: "max-content",
            }}
          >
            <Checkbox
              overlay
              checked={programCourses.includes(courseId)}
              onChange={() => {
                setProgramCourses(toggleArrayItem(programCourses, courseId));
              }}
            />
            <Link href={href} target="_blank" rel="noopener">
              {courseId}
            </Link>
          </Sheet>
        );
      }
    },
  };

  const htmlPrereqs = parse(html || "", htmlParseOptions);
  return (
    <div>
      <Alert startDecorator={<ErrorOutline />} color="warning">
        <div>
          <Typography level="body2">
            This app does not correctly select the required courses in your
            program.
          </Typography>
        </div>
      </Alert>
      <Typography fontWeight={500}>Select your courses</Typography>
      <HtmlPrereqsDiv>{htmlPrereqs}</HtmlPrereqsDiv>
    </div>
  );
};

function toggleArrayItem(array: any[], value: any) {
  let i = array.indexOf(value);
  if (i === -1) array.push(value);
  else array.splice(i, 1);

  return [...array]; // make copy for rerender
}
