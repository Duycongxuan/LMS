import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanized-duration";
import Footer from "../../components/student/Footer";
import Youtube from "react-youtube";

const CourseDetails = () => {
  const { id } = useParams();
  const {
    star,
    star_blank,
    down_arrow_icon,
    play_icon,
    time_left_clock_icon,
    time_clock_icon,
    lesson_icon,
  } = assets;

  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);

  const [openSections, setOpenSections] = useState({});
  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const [courseData, setCourseData] = useState(null);

  const {
    allCourses,
    caculateRating,
    caculateChapterTime,
    caculateCourseDuration,
    caculateNoOfLectures,
    currency,
  } = useContext(AppContext);

  const fetchCourseData = async () => {
    const findCourse = allCourses.find((course) => course._id === id);
    setCourseData(findCourse);
  };

  useEffect(() => {
    fetchCourseData();
  }, [allCourses]);

  return courseData ? (
    <>
      <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left">
        <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-100/70 h-[500px]"></div>

        {/* {Left column} */}
        <div className="max-w-xl z-10 text-gray-500">
          <h1 className="md:text-[36px] md:leading-[44px] text-[28px] leading-[34px] font-semibold text-gray-800">
            {courseData.courseTitle}
          </h1>
          <p
            className="pt-4 md:text-base text-sm"
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription.slice(0, 200),
            }}
          ></p>

          {/* review and ratings */}
          <div className="flex items-center space-x-2 pt-3 pb-2 text-sm">
            <p>{caculateRating(courseData)}</p>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <img
                  className="w-3.5 h-3.5"
                  key={i}
                  src={
                    i < Math.floor(caculateRating(courseData))
                      ? star
                      : star_blank
                  }
                  alt=""
                />
              ))}
            </div>
            <p className="text-blue-500">
              {courseData.courseRatings.length}{" "}
              {courseData.courseRatings.length > 1 ? "ratings" : "rating"}
            </p>

            <p>
              {courseData.enrolledStudents.length}{" "}
              {courseData.enrolledStudents.length > 1 ? "students" : "student"}{" "}
            </p>
          </div>

          <p className="text-sm">
            Course by{" "}
            <span className="text-blue-500 underline">GreatStack</span>
          </p>

          <div className="pt-8 text-gray-800">
            <h2 className="text-xl font-semibold">Course Structure</h2>
            <div className="pt-5">
              {courseData.courseContent.map((chapter, index) => (
                <div
                  key={index}
                  className="border border-gray-300 bg-white mb-2 rounded"
                >
                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={down_arrow_icon}
                        alt="arrow icon"
                        className={`transform transition-transform ${
                          openSections[index] ? "rotate-180" : ""
                        }`}
                      />
                      <p className="font-medium md:text-base text-sm">
                        {chapter.chapterTitle}
                      </p>
                    </div>
                    <p className="text-sm md:text-[16px]">
                      {chapter.chapterContent.length} lectures -{" "}
                      {caculateChapterTime(chapter)}
                    </p>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openSections[index] ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-600">
                      {chapter.chapterContent.map((lecture, i) => (
                        <li key={i} className="flex items-start gap-2 py-2">
                          <img
                            className="w-4 h-4 mt-1"
                            src={play_icon}
                            alt="play icon"
                          />
                          <div className="flex items-center justify-between w-full text-gray-600 text-xs md:text-[16px]">
                            <p>{lecture.lectureTitle}</p>
                            <div className="flex gap-2">
                              {lecture.isPreviewFree && (
                                <p
                                  onClick={() => {
                                    setPlayerData({
                                      videoId: lecture.lectureUrl
                                        .split("/")
                                        .pop(),
                                    });
                                  }}
                                  className="text-blue-500 cursor-pointer"
                                >
                                  Preview
                                </p>
                              )}
                              <p>
                                {humanizeDuration(
                                  lecture.lectureDuration * 60 * 1000,
                                  { unit: ["h", "m"] }
                                )}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="py-20 text-sm md:text-[16px]">
            <h3 className="text-xl font-semibold text-gray-800">
              Course Description
            </h3>
            <p
              className="pt-4 md:text-base text-sm rich-text"
              dangerouslySetInnerHTML={{
                __html: courseData.courseDescription,
              }}
            ></p>
          </div>
        </div>

        {/* {Right column} */}
        <div className="max-w-[424px] z-10 shadow-[0px_4px_15px_2px_rgba(0,0,0,0.1)] rounded-t md:rotate-none overflow-hidden bg-white min-w-[300px] sm:min-w-[420px] ">
          {playerData ? (
            <Youtube
              videoId={playerData.videoId}
              opts={{
                playerVars: {
                  autoplay: 1,
                },
              }}
              iframeClassName="w-full aspect-video"
            />
          ) : (
            <img src={courseData.courseThumbnail} alt="" />
          )}
          <div className="p-5">
            <div className="flex items-center gap-2">
              <img
                src={time_left_clock_icon}
                alt="time left clock icon"
                className="w-3.5"
              />
              <p className="text-red-500">
                <span className="font-medium">5 days</span> left at this prices!
              </p>
            </div>
            <div className="flex gap-3 items-center pt-2">
              <p className="text-gray-800 md:text-4xl text-2xl font-semibold">
                {currency}
                {(
                  courseData.coursePrice -
                  (courseData.discount * courseData.coursePrice) / 100
                ).toFixed(2)}
              </p>
              <p className="line-through md:text-lg text-gray-600">
                {currency}
                {courseData.coursePrice}
              </p>
              <p className="md:text-lg text-gray-600">
                {courseData.discount}% off
              </p>
            </div>
            <div className="flex items-center text-sm md:text-[16px] gap-4 pt-2 md:pt-4 to-gray-400">
              <div className="flex items-center gap-1">
                <img src={star} alt="start icon" />
                <p>{caculateRating(courseData)}</p>
              </div>
              <div className="h-4 w-px bg-gray-500/40"></div>
              <div className="flex items-center gap-1">
                <img src={time_clock_icon} alt="time clock icon" />
                <p>{caculateCourseDuration(courseData)}</p>
              </div>
              <div className="h-4 w-px bg-gray-500/40"></div>
              <div className="flex items-center gap-1">
                <img src={lesson_icon} alt="lesson icon" />
                <p>
                  {caculateNoOfLectures(courseData)}{" "}
                  {caculateNoOfLectures(courseData) > 1 ? "lessons" : "lesson"}
                </p>
              </div>
            </div>
            <button className="md:mt-6 mt-4 w-full py-3 rounded bg-blue-600 text-white font-medium">
              {isAlreadyEnrolled ? "Already Enrolled" : "Enroll now"}
            </button>
            <div className="pt-6">
              <p className="md:text-xl text-lg font-medium to-gray-600">
                What's in the course?
              </p>
              <ul className="ml-4 pt-2 text-sm md:text-[16px] list-disc text-gray-600">
                <li>Lifetime access with free updates.</li>
                <li>Step-by-step, hands-on project guidance.</li>
                <li>Downloadable resources and source code.</li>
                <li>Quizzes to test your knowledge.</li>
                <li>Certificate of completion.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default CourseDetails;
