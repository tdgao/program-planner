import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { atomFamily } from "jotai/utils";
import { atomWithStorage } from "jotai/utils";
import { useEffect } from "react";
import { courseDataFamily, courseDataType } from "../Course";
import { currentProgramAtom } from "../ProgramDetails/ProgramDetails";
import { programCoursesFamily } from "../ProgramDetails/SelectProgramCourses";
import {
  addedCoursesAtom,
  coursesAtom,
  coursesObjType,
  currentProgramCoursesAtom,
  defaultProgramCoursesAtom,
} from "../ProgramPlannerAtoms";
import { getPrereqs, meetsPrereqs } from "./meetsPrereqs";
import { courseType } from "./ProgramSchedule";

const initScheduleCourses = (
  addedCourses: string[],
  programCourses: string[]
) => {
  // get courses to schedule
  const courses = [...addedCourses, ...programCourses];

  return sortByImplicitYear(courses);
};

export type termType = "fall" | "spring" | "summer";
export type curScheduleType = {
  completed: courseType[];
  currentTerm: courseType[];
};
const fillTerm = (
  maxCourses: number | undefined,
  scheduleCourses: courseType[],
  courses: coursesObjType,
  curSchedule: curScheduleType,
  forceSchedule: courseDataType[],
  slot: {
    year: number;
    term: termType;
  },
  coursesData: courseDataType[]
): courseType[] => {
  const forceScheduleTerm = forceSchedule
    .filter(
      (item) => item.scheduleSlot === `year-${slot.year + 1}-${slot.term}`
    )
    .map((item) => {
      scheduleCourses.splice(scheduleCourses.indexOf(item.courseId), 1); // remove course from list
      return item.courseId;
    });
  curSchedule.currentTerm = [...forceScheduleTerm];

  const numFillTerm = Math.max(0, (maxCourses || 0) - forceScheduleTerm.length);

  let autoTerm = [...Array(numFillTerm)].map((_) => {
    for (const i in scheduleCourses) {
      const courseId = scheduleCourses[i];
      const prereqs = getPrereqs(courseId, courses);
      const courseData = coursesData.find((item) => item.courseId === courseId);

      const offered = courseData?.forceOffered?.[slot.term]
        ? courseData.forceOffered[slot.term]
        : courseData?.offered?.[slot.term];
      if (
        courseId &&
        !forceSchedule.map((item) => item.courseId).includes(courseId) &&
        offered !== "NO"
      ) {
        // console.log("Course going in: ", courseId);
        if (meetsPrereqs(prereqs, curSchedule) === true) {
          curSchedule.currentTerm.push(courseId);
          scheduleCourses.splice(parseInt(i), 1); // remove course from list
          return courseId;
        }
      }
    }

    return null;
  });

  const workterm = getWorkTerm([...forceScheduleTerm, ...autoTerm]);
  if (workterm) {
    if (getWorkTerm(autoTerm)) {
      autoTerm.splice(autoTerm.indexOf(workterm), 1);
      scheduleCourses.push(...autoTerm);
      autoTerm = [workterm];
    } else {
      scheduleCourses.push(...autoTerm);
      autoTerm = [];
    }
  }

  const term = [...forceScheduleTerm, ...autoTerm];

  curSchedule.completed.push(...term);
  return term;
};

type paramType = {
  id: string;
  value?: number;
  term?: string;
};
export const maxCoursesFamily = atomFamily(
  (param: paramType) =>
    atomWithStorage(param.id, { value: param.value, term: param.term }),
  (a: paramType, b: paramType) => a.id === b.id
);

export const numYearsAtom = atom(7);
export const scheduleAtom = atom<any>([]);
export const unscheduledCoursesAtom = atom<courseType[]>([]);
export const scheduledCoursesAtom = atom<courseType[]>([]);
export const setScheduleAtom = atom(null, (get, set, _) => {
  console.log("running set schedule");
  const numYears = get(numYearsAtom);
  const programCourses = get(currentProgramCoursesAtom);
  const addedCourses = get(addedCoursesAtom);
  const courses = get(coursesAtom);
  const scheduleCourses = initScheduleCourses(programCourses, addedCourses);

  const coursesData = scheduleCourses.map((courseId: string) => {
    return get(courseDataFamily({ courseId: courseId }));
  });

  const forceSchedule = scheduleCourses
    .map((courseId: string) => {
      return get(courseDataFamily({ courseId: courseId }));
    })
    .filter((item) => item.scheduleSlot !== "auto");

  const curSchedule = {
    completed: [...ASSUME_COMPLETED],
    currentTerm: [],
  };

  const schedule = [...Array(numYears)].map((_, i) => {
    const maxCourses: any = {};
    ["fall", "spring", "summer"].forEach((term) => {
      maxCourses[term] = get(
        maxCoursesFamily({ id: `year-${i}-${term}`, value: 5, term: term })
      ).value;
    });

    const year: any = {};
    ["fall", "spring", "summer"].forEach((term) => {
      year[term] = {
        courses: fillTerm(
          maxCourses[term],
          scheduleCourses,
          courses,
          curSchedule,
          forceSchedule,
          {
            year: i,
            term: term as termType,
          },
          coursesData
        ),
        maxCourses: maxCourses[term],
      };
    });
    return year;
  });

  set(scheduledCoursesAtom, curSchedule.completed);
  set(unscheduledCoursesAtom, scheduleCourses);
  set(scheduleAtom, schedule);
});

export const useProgramSchedule = () => {
  const setSchedule = useSetAtom(setScheduleAtom);
  const schedule = useAtomValue(scheduleAtom);
  const currentProgram = useAtomValue(currentProgramAtom);
  const addedCourses = useAtomValue(addedCoursesAtom);
  const defaultProgramCourses = useAtomValue(defaultProgramCoursesAtom);
  const programCourses = useAtomValue(
    programCoursesFamily({
      program: currentProgram,
      coursesToSchedule: defaultProgramCourses,
    })
  );

  useEffect(() => {
    setSchedule();
  }, [currentProgram, programCourses, addedCourses]);

  return {
    schedule: schedule,
  };
};

function getWorkTerm(courses: (string | null)[]) {
  let workterm = null;
  courses.forEach((courseId) => {
    if (WORKTERM_COURSES.includes(courseId || "")) workterm = courseId;
  });
  return workterm;
}

function sortByImplicitYear(courses: string[]) {
  //sort courses by implicit year
  const sortCourses = (a: courseType, b: courseType) => {
    const courseA = parseInt(a!.replace(/\D/g, "")) || 0;
    const courseB = parseInt(b!.replace(/\D/g, "")) || 0;
    return courseA - courseB;
  };

  return courses.sort(sortCourses);
}

const ASSUME_COMPLETED = [
  "Foundations of Math 12",
  "Mathematics 12",
  "Pre-Calculus 12",
  "Chemistry 11",
  "Chemistry 12",
  "Pre-Calculus 12 or Principles of Mathematics 12",
  "admission to BEng or BSEng program",
  "Completed Principles of Mathematics 12 or Pre-Calculus 12 with a minimum grade of A (86%) ",
];
const WORKTERM_COURSES = ["ENGR001", "ENGR002", "ENGR003", "ENGR004"];
