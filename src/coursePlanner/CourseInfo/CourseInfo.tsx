import { Button, Link } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import { atom, useAtom } from "jotai";
import styled from "styled-components";
import { coursesAtom } from "../ProgramPlannerAtoms";
import Launch from "@mui/icons-material/Launch";
import { Close } from "@mui/icons-material";

const LayoutDiv = styled.div`
  width: 100%;
  display: grid;
  row-gap: 12px;
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
  alignItems: "flex-start",
};

export const courseInfoAtom = atom("");

export const CourseInfo = () => {
  const [course, setCourse] = useAtom(courseInfoAtom);
  const [courses] = useAtom(coursesAtom);

  const courseInfo = courses[course];

  return (
    <LayoutDiv>
      <Typography level="mainHeading">Course Details</Typography>

      {!!courseInfo ? (
        <CourseContent
          courseInfo={courseInfo}
          onCloseClick={() => setCourse("")}
        />
      ) : (
        <Typography level="body1">
          Click on any course to show details
        </Typography>
      )}
    </LayoutDiv>
  );
};

interface CourseContentProps {
  courseInfo: any;
  onCloseClick: () => void;
}
const CourseContent = (props: CourseContentProps) => {
  const { courseInfo, onCloseClick } = props;
  // parse course info
  const title = courseInfo.full_title;
  const url = courseInfo.url;
  const prereqs = JSON.stringify(courseInfo.requirements[0], null, 2);

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
      <PrereqsDiv>
        <Typography level="body1">
          <Typography>Prerequisites</Typography>
          <PrereqsPre>{prereqs ? prereqs : <>No Prerequisites</>}</PrereqsPre>
        </Typography>
      </PrereqsDiv>
    </>
  );
};
