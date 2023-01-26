import { Select, Option, Typography } from "@mui/joy";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { maxCoursesFamily, setScheduleAtom } from "./useProgramSchedule";

interface MaxCoursesInputProps {
  id: string;
}
const LayoutDiv = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 45px;
  column-gap: 12px;
  margin-bottom: 4px; // TODO - remove this after using component for each term (replace with row gap)
`;

export const MaxCoursesInput = (props: MaxCoursesInputProps) => {
  const { id } = props;
  const [maxCourses, setMaxCourses] = useAtom(maxCoursesFamily({ id: id }));
  const action = useRef(null);

  const [, setSchedule] = useAtom(setScheduleAtom);
  const isMounted = useRef(false);
  useEffect(() => {
    if (isMounted.current) setSchedule();
    else isMounted.current = true;
  }, [maxCourses]);

  return (
    <LayoutDiv>
      <Typography level="body2" textColor="neutral.500">
        Max:
      </Typography>
      <Select
        action={action}
        variant="plain"
        size="sm"
        defaultValue={maxCourses.value}
        value={maxCourses.value}
        onChange={(e, newValue) => {
          (newValue || newValue === 0) &&
            setMaxCourses({ ...maxCourses, value: newValue });
        }}
      >
        <Option value={0}>0</Option>
        <Option value={1}>1</Option>
        <Option value={2}>2</Option>
        <Option value={3}>3</Option>
        <Option value={4}>4</Option>
        <Option value={5}>5</Option>
        <Option value={6}>6</Option>
      </Select>
    </LayoutDiv>
  );
};
