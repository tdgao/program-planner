import { Link } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import { atom, useAtom } from "jotai";
import styled from "styled-components";
import { coursesAtom } from "../ProgramPlannerAtoms";
import Launch from "@mui/icons-material/Launch";

const LayoutDiv = styled.div`
  width: 100%;
  display: grid;
  row-gap: 12px;
`;
const InfoDiv = styled.div`
  display: grid;
  row-gap: 12px;
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

export const courseInfoAtom = atom("");

export const CourseInfo = () => {
  const [course, setCourse] = useAtom(courseInfoAtom);
  const [courses] = useAtom(coursesAtom);

  const courseInfo = courses[course];

  return (
    <LayoutDiv>
      <Typography level="h4">Course Details</Typography>

      {!!courseInfo ? (
        <CourseInfoContent courseInfo={courseInfo} />
      ) : (
        <Typography level="body1">
          Click on any course to show details
        </Typography>
      )}
    </LayoutDiv>
  );
};

const CourseInfoContent = ({ courseInfo }: any) => {
  // parse course info
  const title = courseInfo.full_title;
  const url = courseInfo.url;
  const prereqs = JSON.stringify(courseInfo.requirements, null, 2);

  return (
    <InfoDiv>
      <Typography level="h5">{title}</Typography>
      <LinkDiv
        href={url}
        target="_blank"
        rel="noopener"
        endDecorator={<Launch fontSize="small" />}
      >
        See course in UVic
      </LinkDiv>
      <PrereqsDiv>
        <Typography level="body1">
          <Typography level="body1" fontWeight="500">
            Prerequisites
          </Typography>
          <PrereqsPre>{prereqs}</PrereqsPre>
        </Typography>
      </PrereqsDiv>
    </InfoDiv>
  );
};
