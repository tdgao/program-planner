import React, { useEffect } from "react";
import styled from "styled-components";
import { CourseInfo } from "./CourseInfo/CourseInfo";
import { AddCourses } from "./AddCourse/AddCourses";
import { atom, useAtom } from "jotai";
import courses from "../assets/masterCourseList.json";

export const coursesAtom = atom(courses);
export const degreeCoursesAtom = atom({});
export const addedCoursesAtom = atom({});

export const PageDiv = styled.div`
  display: grid;
  grid-template-columns: 500px auto;
`;

export const ProgramPlanner = () => {
  return (
    <PageDiv>
      <div>
        <div>
          <AddCourses />
          <CourseInfo name="" description="" />
        </div>
      </div>
      <div></div>
    </PageDiv>
  );
};
