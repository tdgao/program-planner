import { CloseRounded } from "@mui/icons-material";
import { Typography, List, ListItem, Select, Option, Chip } from "@mui/joy";
import { useAtom } from "jotai";
import { useEffect } from "react";
import styled from "styled-components";
import { courseDataFamily, isTermOffered, termOfferedType } from "../Course";
import {
  setScheduleAtom,
  termType,
} from "../ProgramSchedule/useProgramSchedule";

const CourseOfferingDiv = styled.div``;
const OfferedDiv = styled.div`
  display: flex;
  column-gap: 12px;
`;
interface CourseOfferingsProps {
  courseId: string;
}
export const CourseOfferings = (props: CourseOfferingsProps) => {
  const { courseId } = props;
  const [courseData, setCourseData] = useAtom(
    courseDataFamily({ courseId: courseId })
  );

  const [, setSchedule] = useAtom(setScheduleAtom);
  useEffect(() => {
    setSchedule();
  }, [courseData]);

  const { offered, offeredYears } = courseData;

  return (
    <CourseOfferingDiv>
      <Typography fontWeight={500}>Course term offerings</Typography>
      <List
        size="sm"
        sx={{
          "--List-gap": "8px",
        }}
      >
        <ListItem>
          <div>
            <SelectOffering term="fall" courseId={courseId} />
            <Typography level="body3" component="p">
              Previous years offered: {offeredYears?.FALL.join(", ") || "none"}
            </Typography>
          </div>
        </ListItem>
        <ListItem>
          <div>
            <SelectOffering term="spring" courseId={courseId} />
            <Typography level="body3" component="p">
              Previous years offered:{" "}
              {offeredYears?.SPRING.join(", ") || "none"}
            </Typography>
          </div>
        </ListItem>
        <ListItem>
          <div>
            <SelectOffering term="summer" courseId={courseId} />
            <Typography level="body3" component="p">
              Previous years offered:{" "}
              {offeredYears?.SUMMER.join(", ") || "none"}
            </Typography>
          </div>
        </ListItem>
      </List>
    </CourseOfferingDiv>
  );
};

const SelectDiv = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
`;

interface SelectOfferingProps {
  term: termType;
  courseId: string;
}
const SelectOffering = (props: SelectOfferingProps) => {
  const { term, courseId } = props;

  const [courseData, setCourseData] = useAtom(
    courseDataFamily({ courseId: courseId })
  );
  const { offered, forceOffered } = courseData;
  const termForceOffered = forceOffered[term];
  const prettyOffered =
    offered[term] === "YES"
      ? "Offered"
      : offered[term] === "NO"
      ? "Not offered"
      : offered[term] === "MAYBE"
      ? "Potentially offered"
      : null;

  const chipColor = !!termForceOffered
    ? "neutral"
    : offered[term] === "NO"
    ? "danger"
    : offered[term] === "MAYBE"
    ? "warning"
    : "success";

  return (
    <SelectDiv>
      <Typography sx={{ textTransform: "capitalize" }}>{term}:</Typography>
      <Chip
        color={chipColor}
        disabled={!!termForceOffered}
        variant={!!termForceOffered ? "plain" : "soft"}
        size="sm"
      >
        {prettyOffered}
      </Chip>
      <Select
        size="sm"
        variant={termForceOffered ? "soft" : "plain"}
        color={
          termForceOffered === "YES"
            ? "success"
            : termForceOffered === "NO"
            ? "danger"
            : "neutral"
        }
        placeholder={"Set offering"}
        value={termForceOffered}
        onChange={(e, update: termOfferedType | null) => {
          courseData.forceOffered[term] = update;
          setCourseData({ ...courseData });
        }}
        endDecorator={
          termForceOffered && (
            <CloseRounded
              onMouseDown={(event) => {
                // don't open the popup when clicking on this button
                event.stopPropagation();
              }}
              onClick={() => {
                courseData.forceOffered[term] = null;
                setCourseData({ ...courseData });
              }}
            />
          )
        }
      >
        <Option value={undefined}>Unset</Option>
        <Option value="YES">Offered</Option>
        <Option value="NO">Not offered</Option>
      </Select>
    </SelectDiv>
  );
};
