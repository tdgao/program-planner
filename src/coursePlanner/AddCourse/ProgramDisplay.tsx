import { Link, Typography } from "@mui/joy";
import { useAtom } from "jotai";
import { School } from "@mui/icons-material";
import { currentProgramAtom } from "../ProgramDetails/ProgramDetails";
import programsJsonObj from "../../assets/programs.json";
import { programsObjType } from "../ProgramPlannerAtoms";
import { SectionDiv } from "../CourseList/CourseList";
const programsJson: programsObjType = programsJsonObj;

export const ProgramDisplay = () => {
  const [currentProgram] = useAtom(currentProgramAtom);

  return (
    <SectionDiv>
      <Typography fontWeight={500}>Your program</Typography>
      <Typography color="primary" fontWeight={500} startDecorator={<School />}>
        {currentProgram}
      </Typography>
    </SectionDiv>
  );
};
