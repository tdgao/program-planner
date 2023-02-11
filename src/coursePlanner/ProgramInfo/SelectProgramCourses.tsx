import { useAtom } from "jotai";
import programsJsonObj from "../../assets/programs.json";
import {
  defaultProgramCoursesAtom,
  programsObjType,
} from "../ProgramPlannerAtoms";
import { currentProgramAtom } from "./ProgramInfo";
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
  const [defaultProgramCourses] = useAtom(defaultProgramCoursesAtom);
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

  // Currenting at figuring out how to add manual select + auto select (selects all with "complete all of") program cources integrated in program requirements

  const htmlPrereqs = parse(html || "", htmlParseOptions);
  return (
    <>
      <Typography fontWeight={500}>Select your courses</Typography>
      <Alert startDecorator={<ErrorOutline />} color="warning">
        <Typography level="body2">
          <strong>Note:</strong> this app does not correctly select all the
          required courses in your program.
        </Typography>{" "}
      </Alert>
      <HtmlPrereqsDiv>{htmlPrereqs}</HtmlPrereqsDiv>
    </>
  );
};

function toggleArrayItem(array: any[], value: any) {
  let i = array.indexOf(value);
  if (i === -1) array.push(value);
  else array.splice(i, 1);

  return [...array]; // make copy for rerender
}
