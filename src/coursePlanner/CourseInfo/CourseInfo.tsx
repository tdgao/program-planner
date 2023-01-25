import { Button, Option, Link, Select } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import { atom, useAtom } from "jotai";
import styled from "styled-components";
import {
  addForceScheduleAtom,
  coursesAtom,
  forceScheduleAtom,
} from "../ProgramPlannerAtoms";
import Launch from "@mui/icons-material/Launch";
import { Close } from "@mui/icons-material";
import React from "react";

const LayoutDiv = styled.div`
  width: 100%;
  display: grid;
  row-gap: 24px;
`;
const SectionDiv = styled.div`
  display: grid;
  row-gap: 4px;
`;
const LinkDiv = styled(Link)`
  width: max-content;
`;

const PrereqsDiv = styled.div`
  display: grid;
  row-gap: 8px;
`;
const PrereqsPre = styled.pre`
  margin: 0;
  white-space: pre-wrap; /* Since CSS 2.1 */
  word-wrap: break-word; /* Internet Explorer 5.5+ */
`;
const headerStyles = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export const courseInfoAtom = atom("");

export const CourseInfo = () => {
  const [courseId, setCourse] = useAtom(courseInfoAtom);
  const [courses] = useAtom(coursesAtom);
  const courseInfo = courses[courseId];

  const props: CourseContentProps = {
    courseId: courseId,
    courseInfo: courseInfo,
    onCloseClick: () => setCourse(""),
  };

  return (
    <LayoutDiv>
      <Typography level="mainHeading">Course Details</Typography>

      {!!courseInfo ? (
        <CourseContent {...props} />
      ) : (
        <Typography level="body1">
          Click on any course to show details
        </Typography>
      )}
    </LayoutDiv>
  );
};

const PlaceInDiv = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
`;

const SetDiv = styled.div`
  cursor: pointer;
  text-decoration: underline;
  color: gray;
`;

interface CourseContentProps {
  courseInfo: any;
  courseId: string;
  onCloseClick: () => void;
}
const CourseContent = (props: CourseContentProps) => {
  const { courseInfo, courseId, onCloseClick } = props;
  // parse course info
  const title = courseInfo.full_title;
  const url = courseInfo.url;
  const prereqs = JSON.stringify(courseInfo.requirements[0], null, 2);

  const [, setForceSchedule] = useAtom(addForceScheduleAtom);
  const [forceSchedule] = useAtom(forceScheduleAtom);
  const handleForceSchedule = (courseId: string, scheduleSlot: string) => {
    // if scheduleSlot is auto
    if (scheduleSlot === "auto") {
    }

    // parse schedule slot
    const year = parseInt(scheduleSlot.split("-")[1]);
    const term = scheduleSlot.split("-")[2] as "fall" | "spring" | "summer";
    setForceSchedule({
      [courseId]: {
        year: year,
        term: term,
      },
    });
    console.log(forceSchedule);
  };

  const buttonSlot = (
    <Button
      onClick={onCloseClick}
      endDecorator={<Close />}
      size="sm"
      variant="plain"
      color="neutral"
      sx={{ color: "neutral.400" }}
    >
      Close
    </Button>
  );

  return (
    <>
      <SectionDiv>
        <Typography
          level="body1"
          textColor="neutral.700"
          fontWeight="500"
          sx={headerStyles}
        >
          {title}
          {buttonSlot}
        </Typography>
        <LinkDiv
          href={url}
          target="_blank"
          rel="noopener"
          endDecorator={<Launch fontSize="small" />}
        >
          See course in UVic
        </LinkDiv>
      </SectionDiv>
      <PlaceInDiv>
        <Typography textColor="neutral.700">Place in schedule:</Typography>
        <Select
          defaultValue="auto" // TODO get from atom + courseId
          size="sm"
          variant="plain"
          onChange={(e, val) => val && handleForceSchedule(courseId, val)}
        >
          <div style={{ maxHeight: "250px", overflow: "auto" }}>
            <Option value="auto" color="success">
              Auto
            </Option>
            {[1, 2, 3, 4, 5, 6, 7].map((year) => (
              <React.Fragment key={year}>
                <Option value={`year-${year}-fall`}>Year {year} - Fall</Option>
                <Option value={`year-${year}-spring`}>
                  Year {year} - Spring
                </Option>
                <Option value={`year-${year}-summer`}>
                  Year {year} - Summer
                </Option>
              </React.Fragment>
            ))}
          </div>
        </Select>
      </PlaceInDiv>
      <PrereqsDiv>
        <Typography level="body1" component="span">
          <Typography textColor="neutral.700">Prerequisites</Typography>
          <PrereqsPre>{prereqs ? prereqs : <>No Prerequisites</>}</PrereqsPre>
        </Typography>
      </PrereqsDiv>
    </>
  );
};
