import "./App.css";
import React from "react";
import styled from "styled-components";
import { CourseInfo } from "./AddCourse/CourseInfo";
import { AddCourses } from "./AddCourse/AddCourses";

const PageDiv = styled.div`
  display: grid;
  grid-template-columns: 500px auto;
`;

export const App = () => {
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
