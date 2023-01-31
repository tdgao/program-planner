import { Button, Link, Switch } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import { atom, useAtom } from "jotai";
import styled from "styled-components";
import Launch from "@mui/icons-material/Launch";
import { Close } from "@mui/icons-material";
import { PlaceInSchedule } from "./PlaceInSchedule";
import { courseInfoAtom } from "./CourseInfo";
import { ScrollBarStyles } from "../CourseList/CourseList";
import { courseObjType } from "../ProgramPlannerAtoms";
import { activeCourseAtom } from "../Course";
import parse from "html-react-parser";

const LayoutDiv = styled.div`
  display: grid;
  row-gap: 0px;
`;
const ContentDiv = styled.div`
  width: 100%;
  display: grid;
  row-gap: 24px;
  grid-template-rows: max-content max-content max-content;
  height: calc(100vh - 470px);
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

const showCodeAtom = atom(false);
const htmlParseOptions = {
  replace: (domNode: any) => {
    if (domNode.attribs && domNode.name === "a") {
      domNode.attribs.href =
        "https://www.uvic.ca/calendar/undergrad/index.php" +
        domNode.attribs.href;
      return domNode;
    }
  },
};

export interface CourseContentProps {
  courseInfo: courseObjType;
  courseId: string;
}
export const CourseInfoContent = (props: CourseContentProps) => {
  const { courseInfo, courseId } = props;
  const [, setCourse] = useAtom(courseInfoAtom);
  const [, setActiveCourse] = useAtom(activeCourseAtom);
  const [showCode, setShowCode] = useAtom(showCodeAtom);

  // parse course info
  const title = courseInfo.title;
  const url = courseInfo.url;
  const prereqs = JSON.stringify(courseInfo.parsedRequirements[0], null, 2);
  const htmlPrereqs = parse(
    courseInfo.htmlRequirements || "",
    htmlParseOptions
  );

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
  const showCodeSlot = (
    <Switch
      checked={showCode}
      color={showCode ? "info" : "neutral"}
      variant="soft"
      size="sm"
      startDecorator={
        <Typography level="body3" fontFamily="monospace">
          JSON
        </Typography>
      }
      onChange={() => setShowCode(!showCode)}
    />
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
            <>
              <Typography
                textColor="neutral.700"
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                Prerequisites {showCodeSlot}
              </Typography>
              {showCode ? (
                <PrereqsPre>
                  {prereqs ? prereqs : <>No Prerequisites</>}
                </PrereqsPre>
              ) : (
                <>{prereqs ? htmlPrereqs : <>No Prerequisites</>}</>
              )}
            </>
          </Typography>
        </PrereqsDiv>
      </ContentDiv>
    </LayoutDiv>
  );
};
