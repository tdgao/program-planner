import { Info } from "@mui/icons-material";
import { Alert, Typography } from "@mui/joy";
import { Course } from "../Course";
import { courseType } from "./ProgramSchedule";

const AlertStyles = {
  boxSizing: "border-box",
  padding: "unset 24px",
  alignItems: "flex-start",
};
export interface UnscheduledAlertProps {
  unscheduledCourses: courseType[];
}

export const UnscheduledAlert = (props: UnscheduledAlertProps) => {
  const { unscheduledCourses } = props;
  return (
    <Alert
      startDecorator={<Info sx={{ mt: "2px", mx: "4px" }} />}
      variant="soft"
      color="danger"
      sx={AlertStyles}
    >
      <div>
        <Typography fontWeight="lg">You have unscheduled courses</Typography>
        <Typography
          component={"span"}
          fontSize="sm"
          sx={{ opacity: 0.8, display: "flex", gap: "8px" }}
        >
          {unscheduledCourses.map(
            (course, i) => course && <Course key={i}>{course}</Course>
          )}
        </Typography>
      </div>
    </Alert>
  );
};
