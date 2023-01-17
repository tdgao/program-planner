import { atom, useAtom } from "jotai";
import { atomFamily } from "jotai/utils";
import { useEffect } from "react";
import { addedCoursesAtom, programCoursesAtom } from "../ProgramPlannerAtoms";
import { courseType } from "./ProgramSchedule";

// https://www.jsnow.io/p/javascript/react/persisting-data-in-react-usestate - to persist input stateone day

export const numYearsAtom = atom(5);

//sort courses by implicit year
const sortCourses = (a: courseType, b: courseType) => {
  const courseA = parseInt(a!.replace(/\D/g, "")) || 0;
  const courseB = parseInt(b!.replace(/\D/g, "")) || 0;
  return courseA - courseB;
};
export const initScheduleCourses = (addedCourses: any, programCourses: any) => {
  // get courses to schedule
  let courses = [...addedCourses, ...programCourses];
  return courses.sort(sortCourses);
};

const meetsPrereqs = (course: courseType): boolean => {
  return Math.random() > 0.5;
};

export const fillTerm = (
  maxCourses: number | undefined,
  scheduleCourses: courseType[]
): courseType[] => {
  return [...Array(maxCourses || 0)].map((_) => {
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

type ParamType = {
  id: string;
  value?: number;
  term?: string;
};
export const maxCoursesFamily = atomFamily(
  (param: ParamType) => atom({ value: param.value, term: param.term }),
  (a: ParamType, b: ParamType) => a.id === b.id
);

export const scheduleAtom = atom<any>([]);
export const setScheduleAtom = atom(null, (get, set, _) => {
  const numYears = get(numYearsAtom);
  const programCourses = get(programCoursesAtom);
  const addedCourses = get(addedCoursesAtom);
  const scheduleCourses = initScheduleCourses(programCourses, addedCourses);

  const schedule = [...Array(numYears)].map((_, i) => {
    const maxCourses = ["fall", "spring", "summer"].map((term) => {
      return get(maxCoursesFamily({ id: i + term, value: 6, term: term }))
        .value;
    });

    return {
      fall: {
        courses: fillTerm(maxCourses[0], scheduleCourses),
        maxCourses: maxCourses[0],
      },
      spring: {
        courses: fillTerm(maxCourses[1], scheduleCourses),
        maxCourses: maxCourses[1],
      },
      summer: {
        courses: fillTerm(maxCourses[2], scheduleCourses),
        maxCourses: maxCourses[2],
      },
    };
  });

  set(scheduleAtom, schedule);
});

export const useProgramSchedule = () => {
  const [schedule] = useAtom(scheduleAtom);
  const [, setSchedule] = useAtom(setScheduleAtom);

  useEffect(() => {
    setSchedule();
  }, []);

  return {
    schedule: schedule,
  };
};
