import { Typography, Input, Button, Autocomplete } from "@mui/joy";
import { atom, useAtom } from "jotai";
import { useRef } from "react";
import styled from "styled-components";
import { addCourseAtom, coursesAtom } from "../ProgramPlannerAtoms";
import programs from "../../assets/programs.json";

export const LayoutDiv = styled.div`
  display: grid;
  row-gap: 16px;
`;
export const SectionDiv = styled.div`
  display: grid;
  row-gap: 8px;
`;

const inputAtom = atom("");
const options = Object.values(programs);
export const currentProgramAtom = atom(options[0]);

export const AddCourses = () => {
  const [, setInput] = useAtom(inputAtom);
  const [currentProgram, setCurrentProgram] = useAtom(currentProgramAtom);
  const [, addCourse] = useAtom(addCourseAtom);
  const [courseInput] = useAtom(inputAtom);
  const [courses] = useAtom(coursesAtom);

  return (
    <LayoutDiv>
      <Typography level="mainHeading">Add Courses</Typography>

      <SectionDiv>
        <Typography level="subHeading">Include all from a degree</Typography>
        <Autocomplete
          // @ts-ignore
          options={options}
          // @ts-ignore
          getOptionLabel={(option) => option.programId}
          value={currentProgram}
          // defaultValue={options[0]}
          onChange={(e, newValue) => {
            newValue && setCurrentProgram(newValue);
          }}
        ></Autocomplete>
      </SectionDiv>

      <SectionDiv>
        <Typography level="subHeading">Add single course</Typography>

        <Input
          placeholder={`Search courses, e.g. "SENG 275" or "Math 211"`}
          onChange={(e) =>
            setInput(e.target.value.toUpperCase().replace(/\s/g, ""))
          }
        />
        <Button
          size="sm"
          variant="solid"
          color="neutral"
          style={{ width: "max-content" }}
          onClick={() => {
            courses[courseInput]
              ? addCourse(courseInput)
              : console.log("Could not find course");
            // TODO add add-course feedback (success and fail)
          }}
        >
          Add course
        </Button>
      </SectionDiv>
    </LayoutDiv>
  );
};
