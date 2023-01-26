import Typography from "@mui/joy/Typography";
import { atom, useAtom } from "jotai";
import styled from "styled-components";
import { coursesAtom } from "../ProgramPlannerAtoms";
import { CourseInfoContent } from "./CourseInfoContent";

const LayoutDiv = styled.div`
  width: 100%;
  display: grid;
  row-gap: 24px;
`;

export const courseInfoAtom = atom("");

export const CourseInfo = () => {
  const [courseId] = useAtom(courseInfoAtom);
  const [courses] = useAtom(coursesAtom);
  const courseInfo = courses[courseId];

  const courseContentProps = {
    courseId: courseId,
    courseInfo: courseInfo,
  };

  return (
    <LayoutDiv>
      <Typography level="mainHeading">Course Details</Typography>

      {!!courseInfo ? (
        <CourseInfoContent {...courseContentProps} />
      ) : (
        <Typography level="body1">
          Click on any course to show details
        </Typography>
      )}
    </LayoutDiv>
  );
};
