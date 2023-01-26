import { Select, Typography, Option, Input, Button } from "@mui/joy";
import { atom, useAtom } from "jotai";
import { useRef } from "react";
import styled from "styled-components";
import {
  addCourseAtom,
  coursesAtom,
  currentProgramAtom,
} from "../ProgramPlannerAtoms";

export const LayoutDiv = styled.div`
  display: grid;
  row-gap: 16px;
`;
export const SectionDiv = styled.div`
  display: grid;
  row-gap: 8px;
`;

const inputAtom = atom("");

export const AddCourses = () => {
  const [, setInput] = useAtom(inputAtom);
  const [currentProgram, setCurrentProgram] = useAtom(currentProgramAtom);
  const [, addCourse] = useAtom(addCourseAtom);
  const [courseInput] = useAtom(inputAtom);
  const [courses] = useAtom(coursesAtom);

  const programSelect = useRef(null);

  return (
    <LayoutDiv>
      <Typography level="mainHeading">Add Courses</Typography>

      <SectionDiv>
        <Typography level="subHeading">Include all from a degree</Typography>
        <Select
          action={programSelect}
          value={currentProgram}
          defaultValue="Software Engineering (Bachelor of Software Engineering)"
          onChange={(e, newValue) => {
            newValue && setCurrentProgram(newValue);
          }}
        >
          <Option value="Software Engineering (Bachelor of Software Engineering)">
            Software Engineering
          </Option>
          <Option value="Biology (Bachelor of Science - Major)">Biology</Option>
        </Select>
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
