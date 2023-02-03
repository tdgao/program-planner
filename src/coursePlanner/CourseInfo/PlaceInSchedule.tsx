import { Typography, Autocomplete } from "@mui/joy";
import { useAtom } from "jotai";
import { useEffect } from "react";
import styled from "styled-components";
import { courseDataFamily } from "../Course";
import { setScheduleAtom } from "../ProgramSchedule/useProgramSchedule";

const PlaceInDiv = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  row-gap: 8px;
`;

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

interface PlaceInScheduleProps {
  courseId: string;
}
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
      <Typography fontWeight={500} sx={{ width: "max-content" }}>
        Scheduled Slot
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
            scheduleSlot: data.value,
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
