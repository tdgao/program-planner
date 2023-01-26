import { Typography, Select, Option } from "@mui/joy";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import styled from "styled-components";
import { forceScheduleFamily } from "../Course";
import { setScheduleAtom } from "../ProgramSchedule/useProgramSchedule";

const PlaceInDiv = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
`;
const ContainerDiv = styled.div`
  max-height: 250px;
  overflow: auto;
`;

interface PlaceInScheduleProps {
  courseId: string;
}

export const PlaceInSchedule = (props: PlaceInScheduleProps) => {
  const { courseId } = props;
  const [forceSchedule, setForceSchedule] = useAtom(
    forceScheduleFamily({ courseId: courseId, scheduleSlot: "auto" })
  );
  const isAuto = forceSchedule.scheduleSlot === "auto";

  const [, setSchedule] = useAtom(setScheduleAtom);
  useEffect(() => {
    setSchedule();
  }, [forceSchedule]);

  return (
    <PlaceInDiv>
      <Typography textColor="neutral.700">Place in schedule:</Typography>
      <Select
        defaultValue="auto"
        value={forceSchedule.scheduleSlot}
        size="sm"
        variant={isAuto ? "soft" : "solid"}
        color={isAuto ? "success" : "primary"}
        onChange={(e, scheduleSlot) =>
          scheduleSlot && setForceSchedule({ scheduleSlot: scheduleSlot })
        }
      >
        <ContainerDiv>
          <Option value="auto">Auto</Option>
          {[1, 2, 3, 4, 5, 6, 7].map((year) => (
            <React.Fragment key={year}>
              <Option value={`year-${year}-fall`}>Year {year} - Fall</Option>
              <Option value={`year-${year}-spring`}>
                Year {year} - Spring
              </Option>
              <Option value={`year-${year}-summer`}>
                Year {year} - Summer
              </Option>
            </React.Fragment>
          ))}
        </ContainerDiv>
      </Select>
    </PlaceInDiv>
  );
};
