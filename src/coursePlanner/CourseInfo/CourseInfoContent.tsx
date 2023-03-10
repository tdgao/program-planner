import { Alert, Button, Link, Sheet, Switch, Tooltip } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import { atom, useAtom, useAtomValue } from "jotai";
import styled from "styled-components";
import Launch from "@mui/icons-material/Launch";
import {
  CloseRounded,
  InfoOutlined,
  Check,
  ErrorOutline,
} from "@mui/icons-material";
import { PlaceInSchedule } from "./PlaceInSchedule";
import { courseInfoAtom } from "./CourseInfo";
import { courseObjType } from "../ProgramPlannerAtoms";
import { activeCourseAtom, courseDataFamily } from "../Course";
import parse from "html-react-parser";
import { CourseOfferings } from "./CourseOfferings";
import { scheduledCoursesAtom } from "../ProgramSchedule/useProgramSchedule";
import { ScrollBarStyles } from "../CourseList/CourseList";

const LayoutDiv = styled.div`
  display: grid;
  row-gap: 4px;
`;
const ContentDiv = styled.div`
  width: 100%;
  display: grid;
  row-gap: 24px;
  grid-template-rows: max-content max-content max-content;
  overflow-y: scroll;
  max-height: calc(100vh - 65px);
  padding-top: 8px;
  padding-right: 4px;
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
  padding: 12px 0;
  white-space: pre-wrap; /* Since CSS 2.1 */
  word-wrap: break-word; /* Internet Explorer 5.5+ */
`;
const headerStyles = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};
const infoIconStyles = { position: "relative", top: "1px" };
export const HtmlPrereqsDiv = styled.div`
  a,
  a:visited {
    color: rgb(9, 107, 222);
  }
  ul {
    padding-left: 24px;
  }
`;

const showCodeAtom = atom(false);

export interface CourseContentProps {
  courseInfo: courseObjType;
  courseId: string;
}
export const CourseInfoContent = (props: CourseContentProps) => {
  const { courseInfo, courseId } = props;
  const [courseData] = useAtom(courseDataFamily({ courseId: courseId }));
  const [, setCourse] = useAtom(courseInfoAtom);
  const [activeCourse, setActiveCourse] = useAtom(activeCourseAtom);
  const [showCode, setShowCode] = useAtom(showCodeAtom);
  const scheduledCourses = useAtomValue(scheduledCoursesAtom);

  const htmlParseOptions = {
    replace: (domNode: any) => {
      if (domNode?.name === "a") {
        const href =
          "https://www.uvic.ca/calendar/undergrad/index.php" +
          domNode.attribs.href;

        const aTagNode = domNode;
        const aTagCourseId = aTagNode.children?.[0].data;
        const scheduled = scheduledCourses.includes(aTagCourseId);

        const iconBackground = activeCourse === aTagCourseId && {
          backgroundColor: "info.200",
        };

        return (
          <Sheet
            sx={{
              display: "inline-flex",
              alignItems: "center",
              columnGap: "4px",
              width: "max-content",
              py: "2px",
            }}
          >
            <Link underline="always" href={href} target="_blank">
              {aTagCourseId}
            </Link>
            {scheduled && (
              <Check
                color="success"
                sx={{
                  borderRadius: "8px",
                  ...iconBackground,
                }}
                // onClick={() => {
                //   setActiveCourse(aTagCourseId);
                //   setCourse(aTagCourseId);
                // }}
                onMouseEnter={() => setActiveCourse(aTagCourseId)}
                onMouseLeave={() => setActiveCourse(courseId)}
              />
            )}
          </Sheet>
        );
      }
    },
  };

  // parse course info
  const title = courseInfo?.title || null;
  const url = courseInfo?.url || null;
  const prereqs = JSON.stringify(courseInfo?.parsedRequirements[0], null, 2);
  const htmlPrereqs = parse(
    courseInfo?.htmlRequirements || "",
    htmlParseOptions
  );

  const buttonSlot = (
    <Button
      onClick={() => {
        setCourse("");
        setActiveCourse("");
      }}
      endDecorator={<CloseRounded />}
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
  const noCourseInfoAlert = (
    <Alert color="warning" startDecorator={<ErrorOutline />}>
      This course does not exist in our system :/ <br />
      You can still manually schedule it
    </Alert>
  );

  return (
    <LayoutDiv>
      <Typography
        level="mainHeading"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {courseId}
        {buttonSlot}
      </Typography>
      <ContentDiv>
        <SectionDiv>
          {!courseInfo && noCourseInfoAlert}
          <Typography
            level="body1"
            textColor="neutral.700"
            fontWeight="500"
            sx={headerStyles}
          >
            {title}
          </Typography>
          {url && (
            <LinkDiv
              href={url}
              target="_blank"
              rel="noopener"
              endDecorator={<Launch fontSize="small" />}
            >
              See course in UVic
            </LinkDiv>
          )}
        </SectionDiv>
        <PlaceInSchedule courseId={courseId} />
        <CourseOfferings courseId={courseId} />
        {/* TODO - can strip out prereqs div into a component */}
        <PrereqsDiv>
          <Typography level="body1" component="span">
            <>
              <Typography
                textColor="neutral.700"
                fontWeight={500}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography
                  endDecorator={
                    <Tooltip
                      title={`Prerequisite conditions are only checked for "Complete 1 of..." and "Complete all of..." `}
                      placement="top"
                      sx={{ width: "300px" }}
                      enterDelay={250}
                    >
                      <InfoOutlined sx={infoIconStyles} />
                    </Tooltip>
                  }
                >
                  Prerequisites
                </Typography>
                {showCodeSlot}
              </Typography>
              {showCode ? (
                <PrereqsPre>
                  {prereqs ? prereqs : <>No Prerequisites</>}
                </PrereqsPre>
              ) : (
                <HtmlPrereqsDiv>
                  {prereqs ? htmlPrereqs : <>No Prerequisites</>}
                </HtmlPrereqsDiv>
              )}
            </>
          </Typography>
        </PrereqsDiv>
      </ContentDiv>
    </LayoutDiv>
  );
};
