import { Typography, Autocomplete } from "@mui/joy";
import { useAtom } from "jotai";
import { useEffect } from "react";
import styled from "styled-components";
import { courseDataFamily } from "../Course";
import { setScheduleAtom } from "../ProgramSchedule/useProgramSchedule";

const PlaceInDiv = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
`;

interface PlaceInScheduleProps {
  courseId: string;
}

const scheduleSlots = [
  {
    label: "Auto",
    value: "auto",
    year: "Select a slot",
  },
];

[1, 2, 3, 4, 5, 6, 7].forEach((year) => {
  scheduleSlots.push({
    label: `Year ${year} ⋅ Fall`,
    value: `year-${year}-fall`,
    year: `Year ${year}`,
  });
  scheduleSlots.push({
    label: `Year ${year} ⋅ Spring`,
    value: `year-${year}-spring`,
    year: `Year ${year}`,
  });
  scheduleSlots.push({
    label: `Year ${year} ⋅ Summer`,
    value: `year-${year}-summer`,
    year: `Year ${year}`,
  });
});

export const PlaceInSchedule = (props: PlaceInScheduleProps) => {
  const { courseId } = props;
  const [courseData, setCourseData] = useAtom(
    courseDataFamily({ courseId: courseId })
  );
  const isAuto = courseData.scheduleSlot === "auto";

  const [, setSchedule] = useAtom(setScheduleAtom);
  useEffect(() => {
    setSchedule();
  }, [courseData]);

  return (
    <PlaceInDiv>
      <Typography textColor="neutral.700" sx={{ width: "max-content" }}>
        Place in schedule:
      </Typography>
      <Autocomplete
        options={scheduleSlots}
        groupBy={(option) => option.year}
        disableClearable
        defaultValue={scheduleSlots[0]}
        value={scheduleSlots.find(
          (obj) => obj.value === courseData.scheduleSlot
        )}
        onChange={(e, data) =>
          data &&
          setCourseData({
            ...courseData,
            ...{ scheduleSlot: data.value },
          })
        }
        size="sm"
        variant={"soft"}
        color={isAuto ? "success" : "primary"}
        sx={{ fontWeight: "500" }}
        slotProps={{
          listbox: {
            // placement: "top",
            sx: { maxHeight: "300px" },
          },
        }}
      />
    </PlaceInDiv>
  );
};
