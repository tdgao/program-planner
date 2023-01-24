import { FormLabel, Input } from "@mui/joy";
import { useAtom } from "jotai";
import { useEffect } from "react";
import styled from "styled-components";
import { maxCoursesFamily, setScheduleAtom } from "./useProgramSchedule";

interface MaxCoursesInputProps {
  id: string;
}
const InputDiv = styled(Input)`
  max-width: 150px;
`;

export const MaxCoursesInput = (props: MaxCoursesInputProps) => {
  const { id } = props;
  const [maxCourses, setMaxCourses] = useAtom(maxCoursesFamily({ id: id }));

  const [, setSchedule] = useAtom(setScheduleAtom);
  // causing a lot of re-renders with each input
  // TODO search on internet on how to not call on mount
  useEffect(() => {
    setSchedule();
  }, [maxCourses]);

  const handleOnChange = (e: any) => {
    const val = parseInt(e.target.value);
    val >= 0 && setMaxCourses({ ...maxCourses, value: val });
  };

  return (
    <InputDiv
      type="number"
      data-term={maxCourses.term}
      value={maxCourses.value}
      onChange={handleOnChange}
    />
  );
};
