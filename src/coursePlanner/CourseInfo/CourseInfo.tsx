import Typography from "@mui/joy/Typography";
import { atom, useAtom } from "jotai";
import styled from "styled-components";
import { coursesAtom } from "../ProgramPlannerAtoms";
import { CourseInfoContent } from "./CourseInfoContent";

const LayoutDiv = styled.div`
  width: 100%;
  display: grid;
  row-gap: 12px;
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
      {!!courseInfo ? (
        <CourseInfoContent {...courseContentProps} />
      ) : (
        <>
          <Typography level="mainHeading">Course</Typography>
          <Typography level="body1">
            Click on any course to show details
          </Typography>
        </>
      )}
    </LayoutDiv>
  );
};
