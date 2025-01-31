import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/student/Home";
import CourseList from "./pages/student/CourseList";
import CourseDetails from "./pages/student/CourseDetails";
import MyEnrollments from "./pages/student/MyEnrollments";
import Player from "./pages/student/Player";
import Loading from "./components/student/Loading";
import Educator from "./pages/eductor/Educator";
import Dashboard from "./pages/eductor/Dashboard";
import AddCourse from "./pages/eductor/AddCourse";
import MyCourses from "./pages/eductor/MyCourses";
import StudentEnrolled from "./pages/eductor/StudentEnrolled";


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course-list" element={<CourseList />} />
        <Route path="/course-list/:input" element={<CourseList />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/my-enrollments" element={<MyEnrollments />} />
        <Route path="/player/:courseId" element={<Player />} />
        <Route path="/loading/:path" element={<Loading />} />
        <Route path="/educator" element={<Educator/>}>
            <Route path="educator" element={<Dashboard />}/>
            <Route path="add-course" element={<AddCourse />}/>
            <Route path="my-courses" element={<MyCourses />}/>
            <Route path="student-enrolled" element={<StudentEnrolled />}/>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
