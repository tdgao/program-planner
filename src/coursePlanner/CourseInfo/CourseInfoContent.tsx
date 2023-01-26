import { Button, Link } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import { useAtom } from "jotai";
import styled from "styled-components";
import Launch from "@mui/icons-material/Launch";
import { Close } from "@mui/icons-material";
import { PlaceInSchedule } from "./PlaceInSchedule";
import { courseInfoAtom } from "./CourseInfo";

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
  courseInfo: any;
  courseId: string;
}

export const CourseInfoContent = (props: CourseContentProps) => {
  const { courseInfo, courseId } = props;
  const [, setCourse] = useAtom(courseInfoAtom);

  // parse course info
  const title = courseInfo.full_title;
  const url = courseInfo.url;
  const prereqs = JSON.stringify(courseInfo.requirements[0], null, 2);

  const buttonSlot = (
    <Button
      onClick={() => setCourse("")}
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
      <PlaceInSchedule courseId={courseId} />
      <PrereqsDiv>
        <Typography level="body1" component="span">
          <Typography textColor="neutral.700">Prerequisites</Typography>
          <PrereqsPre>{prereqs ? prereqs : <>No Prerequisites</>}</PrereqsPre>
        </Typography>
      </PrereqsDiv>
    </>
  );
};
