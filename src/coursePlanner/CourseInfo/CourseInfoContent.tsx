import { Button, Link } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import { useAtom } from "jotai";
import styled from "styled-components";
import Launch from "@mui/icons-material/Launch";
import { Close } from "@mui/icons-material";
import { PlaceInSchedule } from "./PlaceInSchedule";
import { courseInfoAtom } from "./CourseInfo";
import { ScrollBarStyles } from "../CourseList/CourseList";
import { courseObjType } from "../ProgramPlannerAtoms";
import { activeCourseAtom } from "../Course";

const LayoutDiv = styled.div`
  display: grid;
  row-gap: 0px;
`;
const ContentDiv = styled.div`
  width: 100%;
  display: grid;
  row-gap: 24px;
  max-height: calc(100vh - 470px);
  overflow-y: scroll;
  ${ScrollBarStyles}
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

export interface CourseContentProps {
  courseInfo: courseObjType;
  courseId: string;
}

export const CourseInfoContent = (props: CourseContentProps) => {
  const { courseInfo, courseId } = props;
  const [, setCourse] = useAtom(courseInfoAtom);
  const [, setActiveCourse] = useAtom(activeCourseAtom);

  // parse course info
  const title = courseInfo.title;
  const url = courseInfo.url;
  const prereqs = JSON.stringify(courseInfo.parsedRequirements[0], null, 2);

  const buttonSlot = (
    <Button
      onClick={() => {
        setCourse("");
        setActiveCourse("");
      }}
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
    <LayoutDiv>
      <Typography level="mainHeading">{courseId}</Typography>
      <ContentDiv>
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
        <PlaceInSchedule courseId={courseId} />
        <PrereqsDiv>
          <Typography level="body1" component="span">
            <Typography textColor="neutral.700">Prerequisites</Typography>
            <PrereqsPre>{prereqs ? prereqs : <>No Prerequisites</>}</PrereqsPre>
          </Typography>
        </PrereqsDiv>
      </ContentDiv>
    </LayoutDiv>
  );
};
