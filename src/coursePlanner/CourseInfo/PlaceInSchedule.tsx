import { CloseRounded } from "@mui/icons-material";
import { Typography, Autocomplete, Select, Option, IconButton } from "@mui/joy";
import { useAtom } from "jotai";
import React from "react";
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

const yearGroupStyles = { textTransform: "uppercase", padding: "4px 8px" };

const scheduleSlots: Record<string, { label: string; value: string }[]> = {};
[1, 2, 3, 4, 5, 6, 7].forEach((year) => {
  scheduleSlots[`Year ${year}`] = [
    {
      label: `Year ${year} · Fall`,
      value: `year-${year}-fall`,
    },
    {
      label: `Year ${year} · Spring`,
      value: `year-${year}-spring`,
    },
    {
      label: `Year ${year} · Summer`,
      value: `year-${year}-summer`,
    },
  ];
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
      <Select
        value={courseData.scheduleSlot}
        onChange={(e, data) =>
          data &&
          setCourseData({
            ...courseData,
            scheduleSlot: data,
          })
        }
        size="sm"
        variant={"soft"}
        color={isAuto ? "success" : "primary"}
        sx={{ fontWeight: "500" }}
        slotProps={{
          listbox: {
            placement: "top",
            sx: { maxHeight: "300px", overflow: "auto" },
          },
        }}
        endDecorator={
          !isAuto && (
            <IconButton
              size="sm"
              variant="plain"
              color="neutral"
              onMouseDown={(e) => e.stopPropagation()} // don't open the popup when clicking on this button
              onClick={() =>
                setCourseData({
                  ...courseData,
                  scheduleSlot: "auto",
                })
              }
            >
              <CloseRounded />
            </IconButton>
          )
        }
      >
        <Option key={"auto"} value={"auto"}>
          Auto
        </Option>
        {Object.entries(scheduleSlots).map(([year, slots]) => (
          <div key={year}>
            <Typography level="body3" sx={yearGroupStyles}>
              {year}
            </Typography>
            {slots.map((slot) => (
              <Option key={slot.value} value={slot.value}>
                {slot.label}
              </Option>
            ))}
          </div>
        ))}
      </Select>
    </PlaceInDiv>
  );
};
