import { Link, Typography } from "@mui/joy";
import { useAtom } from "jotai";
import { SectionDiv } from "./AddCourses";
import { School } from "@mui/icons-material";
import { currentProgramAtom } from "../ProgramInfo/ProgramInfo";
import programsJsonObj from "../../assets/programs.json";
import { programsObjType } from "../ProgramPlannerAtoms";
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
