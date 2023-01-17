import { atom, useAtom } from "jotai";
import { addedCoursesAtom, programCoursesAtom } from "../ProgramPlannerAtoms";
import { courseType } from "./ProgramSchedule";

// https://www.jsnow.io/p/javascript/react/persisting-data-in-react-usestate - to persist input stateone day

const numYearsAtom = atom(5);

//sort courses by implicit year
const sortCourses = (a: courseType, b: courseType) => {
  const courseA = parseInt(a!.replace(/\D/g, "")) || 0;
  const courseB = parseInt(b!.replace(/\D/g, "")) || 0;
  return courseA - courseB;
};
const initScheduleCourses = (addedCourses: any, programCourses: any) => {
  // get courses to schedule
  let courses = [...addedCourses, ...programCourses];
  return courses.sort(sortCourses);
};

const meetsPrereqs = (course: courseType): boolean => {
  return Math.random() > 0.5;
};

const fillTerm = (
  maxCourses: number,
  scheduleCourses: courseType[]
): courseType[] => {
  return [...Array(maxCourses)].map((_) => {
    for (const i in scheduleCourses) {
      const course = scheduleCourses[i];

      if (meetsPrereqs(course)) {
        scheduleCourses.splice(parseInt(i), 1); // remove course from list
        return course;
      }
    }

    return null;
  });
};

export const useProgramSchedule = () => {
  const [numYears] = useAtom(numYearsAtom);
  const [programCourses] = useAtom(programCoursesAtom);
  const [addedCourses] = useAtom(addedCoursesAtom);

  // const emptySchedule = initSchedule(numYears);
  const scheduleCourses = initScheduleCourses(programCourses, addedCourses);

  let schedule = null;
  schedule = [...Array(numYears)].map((_) => {
    return {
      fall: {
        courses: fillTerm(6, scheduleCourses),
        maxCourses: 6,
      },
      spring: {
        courses: fillTerm(6, scheduleCourses),
        maxCourses: 6,
      },
      summer: {
        courses: fillTerm(6, scheduleCourses),
        maxCourses: 6,
      },
    };
  });

  return {
    schedule: schedule,
  };
};
