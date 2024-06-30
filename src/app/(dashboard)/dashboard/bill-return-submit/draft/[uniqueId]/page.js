"use client";

import convertToBengaliNumber from "@/lib/convertToBengaliNumber";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LuDownload } from "react-icons/lu";
const DataDraft = ({ params }) => {
  const [billData, setBillData] = useState(null);

  const [loading, setLoading] = useState();
  useEffect(() => {
    setLoading(true);
    const apiUrl = "https://dmsp.vercel.app/api/bill-return/get-draft";
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params.uniqueId),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.unique_id === params.uniqueId) {
          setBillData(data);
          setLoading(false);
        }
      })
      .catch((error) => {
        toast.error("There was an error!");
        console.error("There was an error!", error);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params.uniqueId]);

  const handlePrint = () => {
    window.print();
  };

  if (loading || !billData) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <CircularProgress className="spinner" />
      </div>
    );
  }

  const schoolData = billData?.school;

  // school general data
  const {
    cluster,
    email,
    emis_code,
    founded_date,
    grade,
    name,
    post_office,
    shifts,
    union_corporation,
    village_moholla,
    word_number,
  } = schoolData.general;

  // school infrastructure data

  const {
    class_rooms,
    headmaster_room,
    multimedia_rooms,
    office_rooms,
    separated_nursery_class,
    toilets,
    useable_class_rooms,
    wash_block,
    wash_block_founded_date,
  } = schoolData.infrastructure;

  const {
    electricity_connection,
    freedom_fight_corner,
    garden,
    internet,
    laptop,
    multimedia,
    piano,
    rasel_corner,
    shahid_minar,
  } = schoolData.infrastructure.others;
  const {
    deep_tube_wells,
    deep_tube_wells_condition,
    tube_wells,
    tube_wells_condition,
  } = schoolData.infrastructure.water;
  const infrastructureBorderWall = schoolData.infrastructure.border_wall;
  const {
    building_condition_1,
    building_condition_2,
    building_condition_3,
    building_condition_4,
    building_date_1,
    building_date_2,
    building_date_3,
    building_date_4,
    building_type_1,
    building_type_2,
    building_type_3,
    building_type_4,
    buildings,
  } = schoolData.infrastructure.building;

  // school land data

  const {
    dag_number,
    dispossessed,
    dolil_number,
    dolil_year,
    is_cased,
    is_namjaried,
    is_registered,
    khatian_number,
    namjari_ownership,
    registration_ownership,
    take_overed,
    taxt_condition,
    total_amount,
  } = schoolData.land;

  // school stipend data
  const { stipend_year, latest_season, demand, distributed, total_consumer } =
    schoolData.stipend;

  // school conference data
  const { guardian, mother, pta, smc, staff_meeting, yard } =
    schoolData.conference;
  const schoolDevelopment = schoolData.development;

  // teacher data
  const teacherData = billData?.teacher;
  const {
    permitted_post,
    teacher_number,
    vacancy,
    women_teacher_number,
    vacation_consumers,
    working_post,
  } = teacherData.general;

  console.log(teacherData.general);
  // student related data
  const studentData = billData?.student;

  const studentSurveyAdmitted = studentData.survey.survey_admitted[0];
  const studentSurveyAdmittedToOthersSchool =
    studentData.survey.survey_admitted_to_other_school[0];
  const studentSurveyUnAdmitted = studentData.survey.survey_unadmitted[0];
  const studentSurveyTotal = studentData.survey.survey_total[0];
  const nursery_four_plus = studentData.admission.nursery_four_plus[0];
  const nursery_five_plus = studentData.admission.nursery_five_plus[0];
  const class_one = studentData.admission.class_one[0];
  const class_two = studentData.admission.class_two[0];
  const class_three = studentData.admission.class_three[0];
  const class_four = studentData.admission.class_four[0];
  const class_five = studentData.admission.class_five[0];
  const class_six = studentData.admission.class_six[0];
  const class_seven = studentData.admission.class_seven[0];
  const class_eight = studentData.admission.class_eight[0];

  const {
    admitted_releted_school_students,
    survayed_students,
    unadmitted_students,
  } = studentData.asroyon_survey[0];

  const handleSubmit = (id) => {
    const currentDate = new Date().toISOString();
    const updateData = { isDraft: false, updatedDate: currentDate };
    setLoading(true);
    const apiUrl = "https://dmsp.vercel.app/api/bill-return/update";
    fetch(apiUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ updateData: updateData, id: billData._id }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        toast.error("There was an error!");
        console.error("There was an error!", error);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {billData ? (
        <div id="print-content" className="xl:w-[80%] draftContent">
          <div className="p-8 rounded-md shadow-sm bg-white">
            <div className="flex items-center justify-between">
              {/* school related daa */}
              <h2 className="md:text-xl text-lg font-semibold main-heading">
                বিদ্যালয় সংক্রান্ত তথ্য
              </h2>
              <Link
                href={`https://dmsp.vercel.app/dashboard/bill-return-edit/${billData._id}`}
                className="text-lg font-semibold underline"
              >
                Edit
              </Link>
            </div>
            <div className="w-full h-[1px] bg-[#008B4C] md:mb-9 mb-5 mt-2 print:mb-6"></div>
            {schoolData ? (
              <div>
                <div>
                  <h4 className="md:text-[17px] text-lg font-semibold md:mb-5 mb-4 print:mb-4 print:text-xl text-[#008B4C]">
                    সাধারণ তথ্য
                  </h4>
                  {schoolData.general ? (
                    <div className="flex flex-wrap gap-x-12 gap-y-4 md:flex-row flex-col">
                      <p>
                        <span className="font-medium">বিদ্যালয়ের নাম: </span>
                        {name}
                      </p>
                      <p>
                        <span className="font-medium">ক্লাস্টার: </span>
                        {cluster}
                      </p>
                      <p>
                        <span className="font-medium">গ্রাম/মহল্লার নাম: </span>
                        {village_moholla}
                      </p>
                      <p>
                        <span className="font-medium">ওয়ার্ড নাম্বার: </span>
                        {word_number}
                      </p>
                      <p>
                        <span className="font-medium">ডাকঘর: </span>
                        {post_office}
                      </p>
                      <p>
                        <span className="font-medium">ইউনিয়ন/পৌরসভা: </span>
                        {union_corporation}
                      </p>
                      <p>
                        <span className="font-medium">EMIS কোড: </span>
                        {emis_code}
                      </p>
                      <p>
                        <span className="font-medium">বিদ্যালয়ের ইমেইল: </span>
                        {email}
                      </p>
                      <p>
                        <span className="font-medium">প্রতিষ্ঠার সন: </span>
                        {founded_date}
                      </p>
                      <p>
                        <span className="font-medium">গ্রেড: </span>
                        {grade}
                      </p>
                      <p>
                        <span className="font-medium">শিফট সংখ্যা: </span>
                        {shifts}
                      </p>
                    </div>
                  ) : (
                    <div className="p-8">কোন তথ্য পাওয়া যাইনি</div>
                  )}
                </div>

                <div className="mt-12 ">
                  <h4 className="md:text-[17px] text-lg font-semibold md:mb-5 mb-4 print:mb-4 print:text-xl text-[#008B4C]">
                    অবকাঠামো সংক্রান্ত তথ্য
                  </h4>
                  {schoolData.infrastructure ? (
                    <>
                      <div className="flex flex-wrap gap-x-12 gap-y-4 md:flex-row flex-col">
                        <p>
                          <span className="font-medium">ভবন সংখ্যা: </span>
                          {buildings}
                        </p>
                        {buildings >= 1 && (
                          <>
                            <p>
                              <span className="font-medium">
                                ভবন ১ নির্মাণের সন:{" "}
                              </span>
                              {building_date_1}
                            </p>
                            <p>
                              <span className="font-medium">
                                ভবন ১ এর ধরন:{" "}
                              </span>
                              {building_type_1}
                            </p>
                            <p>
                              <span className="font-medium">
                                ভবন ১ এর বর্তমান অবস্থা:{" "}
                              </span>
                              {building_condition_1}
                            </p>
                          </>
                        )}
                        {buildings >= 2 && (
                          <>
                            <p>
                              <span className="font-medium">
                                ভবন ২ নির্মাণের সন:{" "}
                              </span>
                              {building_date_2}
                            </p>
                            <p>
                              <span className="font-medium">
                                ভবন ২ এর ধরন:{" "}
                              </span>
                              {building_type_2}
                            </p>
                            <p>
                              <span className="font-medium">
                                ভবন ২ এর বর্তমান অবস্থা:{" "}
                              </span>
                              {building_condition_2}
                            </p>
                          </>
                        )}
                        {buildings >= 3 && (
                          <>
                            <p>
                              <span className="font-medium">
                                ভবন ৩ নির্মাণের সন:{" "}
                              </span>
                              {building_date_3}
                            </p>
                            <p>
                              <span className="font-medium">
                                ভবন ৩ এর ধরন:{" "}
                              </span>
                              {building_type_3}
                            </p>
                            <p>
                              <span className="font-medium">
                                ভবন ৩ এর বর্তমান অবস্থা:{" "}
                              </span>
                              {building_condition_3}
                            </p>
                          </>
                        )}
                        {buildings >= 4 && (
                          <>
                            <p>
                              <span className="font-medium">
                                ভবন ৪ নির্মাণের সন:{" "}
                              </span>
                              {building_date_3}
                            </p>
                            <p>
                              <span className="font-medium">
                                ভবন ৪ এর ধরন:{" "}
                              </span>
                              {building_type_3}
                            </p>
                            <p>
                              <span className="font-medium">
                                ভবন ৪ এর বর্তমান অবস্থা:{" "}
                              </span>
                              {building_condition_3}
                            </p>
                          </>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-x-12 gap-y-4 md:flex-row flex-col mt-10">
                        <p>
                          <span className="font-medium">
                            প্রধান শিক্ষকের কক্ষ:{" "}
                          </span>
                          {headmaster_room}
                        </p>
                        <p>
                          <span className="font-medium">অফিস কক্ষ: </span>
                          {office_rooms}
                        </p>
                        <p>
                          <span className="font-medium">শ্রেণী কক্ষ: </span>
                          {class_rooms}
                        </p>
                        <p>
                          <span className="font-medium">
                            ব্যবহারযোগ্য শ্রেণী কক্ষ:{" "}
                          </span>
                          {useable_class_rooms}
                        </p>
                        <p>
                          <span className="font-medium">
                            মাল্টিমিডিয়া কক্ষ:{" "}
                          </span>
                          {multimedia_rooms}
                        </p>
                        <p>
                          <span className="font-medium">
                            পৃথক শিশু শ্রেণী:{" "}
                          </span>
                          {separated_nursery_class}
                        </p>
                        <p>
                          <span className="font-medium">সীমানা প্রাচীর: </span>
                          {infrastructureBorderWall.wall}
                        </p>
                        {infrastructureBorderWall.wall === "আছে" && (
                          <>
                            <p>
                              <span className="font-medium">
                                সীমানা প্রাচীরের অর্থায়ন ধরন:{" "}
                              </span>
                              {infrastructureBorderWall.funding_type}
                            </p>
                            <p>
                              <span className="font-medium">
                                সীমানা প্রাচীর নির্মাণের সন:{" "}
                              </span>
                              {infrastructureBorderWall.founded_date}
                            </p>
                          </>
                        )}
                        <p>
                          <span className="font-medium">টয়লেট সংখ্যা: </span>
                          {toilets}
                        </p>
                        <p>
                          <span className="font-medium">ওয়াশ ব্লক: </span>
                          {wash_block}
                        </p>
                        <p>
                          <span className="font-medium">
                            ওয়াশ ব্লক নির্মাণের সন:{" "}
                          </span>
                          {wash_block_founded_date}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-x-12 gap-y-4 md:flex-row flex-col mt-10">
                        <p>
                          <span className="font-medium">শহিদ মিনার: </span>
                          {shahid_minar}
                        </p>
                        <p>
                          <span className="font-medium">
                            মুক্তিযুদ্ধ কর্নার:{" "}
                          </span>
                          {freedom_fight_corner}
                        </p>
                        <p>
                          <span className="font-medium">
                            শেখ রাসেল কর্নার:{" "}
                          </span>
                          {rasel_corner}
                        </p>
                        <p>
                          <span className="font-medium">বাগান/ছাদ বাগান: </span>
                          {garden}
                        </p>
                        <p>
                          <span className="font-medium">ইন্টারনেট: </span>
                          {internet.map((item) => (
                            <span key={item}>{item}, </span>
                          ))}
                        </p>
                        <p>
                          <span className="font-medium">ল্যাপটপ সংখ্যা: </span>
                          {laptop.total}
                        </p>
                        <p>
                          <span className="font-medium">
                            সচল ল্যাপটপ সংখ্যা:{" "}
                          </span>
                          {laptop.actives}
                        </p>
                        <p>
                          <span className="font-medium">
                            মাল্টিমিডিয়া সংখ্যা:{" "}
                          </span>
                          {multimedia.total}
                        </p>
                        <p>
                          <span className="font-medium">
                            সচল মাল্টিমিডিয়া সংখ্যা:{" "}
                          </span>
                          {multimedia.actives}
                        </p>
                        <p>
                          <span className="font-medium">
                            পিয়ানো সংখ্যা সংখ্যা:{" "}
                          </span>
                          {piano.total}
                        </p>
                        <p>
                          <span className="font-medium">
                            সচল পিয়ানো সংখ্যা সংখ্যা:{" "}
                          </span>
                          {piano.actives}
                        </p>
                        <p>
                          <span className="font-medium">বিদ্যুৎ সংযোগ: </span>
                          {electricity_connection}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-x-12 gap-y-4 md:flex-row flex-col mt-10">
                        <p>
                          <span className="font-medium">টিউবওয়েল সংখ্যা: </span>
                          {tube_wells}
                        </p>
                        <p>
                          <span className="font-medium">
                            টিউবওয়েল এর বর্তমান অবস্থা:{" "}
                          </span>
                          {tube_wells_condition}
                        </p>
                        <p>
                          <span className="font-medium">
                            ডিপ টিউবওয়েল সংখ্যা:{" "}
                          </span>
                          {deep_tube_wells}
                        </p>
                        <p>
                          <span className="font-medium">
                            ডিপ টিউবওয়েল এর বর্তমান অবস্থা:{" "}
                          </span>
                          {deep_tube_wells_condition}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="p-8">কোন তথ্য পাওয়া যাইনি</div>
                  )}
                </div>

                <div className="mt-12">
                  <h4 className="md:text-[17px] text-lg font-semibold md:mb-5 mb-4 print:mb-4 print:text-xl text-[#008B4C]">
                    ভূমি বিষয়ক তথ্য
                  </h4>
                  {schoolData.land ? (
                    <div className="flex flex-wrap gap-x-12 gap-y-4 md:flex-row flex-col">
                      <p>
                        <span className="font-medium">
                          ভূমির পরিমান(শতাংশ):{" "}
                        </span>
                        {total_amount}
                      </p>
                      <p>
                        <span className="font-medium">
                          দখলকৃত ভূমির পরিমান(শতাংশ):{" "}
                        </span>
                        {take_overed}
                      </p>
                      <p>
                        <span className="font-medium">
                          বেদখলকৃত ভূমির পরিমান(শতাংশ):{" "}
                        </span>
                        {dispossessed}
                      </p>
                      <p>
                        <span className="font-medium">
                          রেজিস্টার করা আছে কিনা:{" "}
                        </span>
                        {is_registered}
                      </p>
                      <p>
                        <span className="font-medium">
                          রেজিস্ট্রেশন এর মালিকানা:{" "}
                        </span>
                        {registration_ownership}
                      </p>
                      <p>
                        <span className="font-medium">খতিয়ান নং: </span>
                        {khatian_number}
                      </p>
                      <p>
                        <span className="font-medium">দাগ নং: </span>
                        {dag_number}
                      </p>
                      <p>
                        <span className="font-medium">দলিল নং: </span>
                        {dolil_number}
                      </p>
                      <p>
                        <span className="font-medium">দলিল সন: </span>
                        {dolil_year}
                      </p>
                      <p>
                        <span className="font-medium">নামজারি আছে কিনা: </span>
                        {is_namjaried}
                      </p>
                      <p>
                        <span className="font-medium">
                          নামজারি এর মালিকানা:{" "}
                        </span>
                        {namjari_ownership}
                      </p>
                      <p>
                        <span className="font-medium">মামলা আছে কিনা: </span>
                        {is_cased}
                      </p>
                      <p>
                        <span className="font-medium">ভূমি উন্নয়ন কর: </span>
                        {taxt_condition}
                      </p>
                    </div>
                  ) : (
                    <div className="p-8">কোন তথ্য পাওয়া যাইনি</div>
                  )}
                </div>

                <div className="mt-12">
                  <h4 className="md:text-[17px] text-lg font-semibold md:mb-5 mb-4 print:mb-4 print:text-xl text-[#008B4C]">
                    উপবৃত্তি সংক্রান্ত তথ্য
                  </h4>
                  {schoolData.stipend ? (
                    <div className="flex flex-wrap gap-x-12 gap-y-4 md:flex-row flex-col">
                      <p>
                        <span className="font-medium">
                          সর্বশেষ প্রান্তিকের বছর:{" "}
                        </span>
                        {stipend_year}
                      </p>
                      <p>
                        <span className="font-medium">
                          সর্বশেষ প্রান্তিকের মৌসুম:{" "}
                        </span>
                        {latest_season}
                      </p>
                      <p>
                        <span className="font-medium">
                          সর্বশেষ প্রান্তিকে মোট সুবিধাভোগী:{" "}
                        </span>
                        {total_consumer}
                      </p>
                      <p>
                        <span className="font-medium">উপবৃত্তির চাহিদা: </span>
                        {demand}
                      </p>
                      <p>
                        <span className="font-medium">
                          বিতরণকৃত অর্থের পরিমান:{" "}
                        </span>
                        {distributed}
                      </p>
                    </div>
                  ) : (
                    <div className="p-8">কোন তথ্য পাওয়া যাইনি</div>
                  )}
                </div>

                <div className="mt-12">
                  <h4 className="md:text-[17px] text-lg font-semibold md:mb-5 mb-4 print:mb-4 print:text-xl text-[#008B4C]">
                    সভা সংক্রান্ত তথ্য
                  </h4>
                  {schoolData.conference ? (
                    <div className="flex flex-wrap gap-x-12 gap-y-4 md:flex-row flex-col">
                      <p>
                        <span className="font-medium">এসএমসি: </span>
                        {smc}
                      </p>
                      <p>
                        <span className="font-medium">পিটিএ: </span>
                        {pta}
                      </p>
                      <p>
                        <span className="font-medium">মা-সমাবেশ: </span>
                        {mother}
                      </p>
                      <p>
                        <span className="font-medium">অভিভাবক-সমাবেশ: </span>
                        {guardian}
                      </p>
                      <p>
                        <span className="font-medium">উঠান বৈঠক: </span>
                        {yard}
                      </p>
                      <p>
                        <span className="font-medium">স্টাফ মিটিং: </span>
                        {staff_meeting}
                      </p>
                    </div>
                  ) : (
                    <div className="p-8">কোন তথ্য পাওয়া যাইনি</div>
                  )}
                </div>

                <div className="mt-12">
                  <h4 className="md:text-[17px] text-lg font-semibold md:mb-5 mb-4 print:mb-4 print:text-xl text-[#008B4C]">
                    উন্নয়ন কার্যক্রম সংক্রান্ত তথ্য
                  </h4>
                  {schoolDevelopment.length > 0 ? (
                    schoolDevelopment.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-wrap gap-x-12 gap-y-4 md:flex-row flex-col mb-3"
                      >
                        <p>{convertToBengaliNumber(index + 1)}। </p>
                        <p>
                          <span className="font-medium">বরাদ্দের ধরন: </span>
                          {item.name}
                        </p>
                        <p>
                          <span className="font-medium">অর্থ বছর: </span>
                          {item.year}
                        </p>
                        <p>
                          <span className="font-medium">অর্থের পরিমান: </span>
                          {item.amount}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="p-8">কোন তথ্য পাওয়া যাইনি</div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-8">কোন তথ্য পাওয়া যাইনি</div>
            )}
          </div>

          {/* teacher related data */}
          <div className="md:mt-10 mt-6 md:p-8 p-4 rounded-md shadow-sm bg-white">
            <h2 className="md:text-xl text-lg font-semibold main-heading">
              শিক্ষক সংক্রান্ত তথ্য
            </h2>
            <div className="w-full h-[1px] bg-[#008B4C] md:mb-9 mb-5 mt-2 print:mb-6"></div>
            {teacherData ? (
              <div>
                <div>
                  <h4 className="md:text-[17px] text-lg font-semibold md:mb-5 mb-4 print:mb-4 print:text-xl text-[#008B4C]">
                    সাধারণ তথ্য
                  </h4>
                  {teacherData.general ? (
                    <div className="flex flex-wrap gap-x-12 gap-y-4 md:flex-row flex-col">
                      <p>
                        <span className="font-medium">অনুমোদিত পদ: </span>
                        {permitted_post}
                      </p>
                      <p>
                        <span className="font-medium">কর্মরত পদ: </span>
                        {working_post}
                      </p>
                      <p>
                        <span className="font-medium">শূন্য পদ: </span>
                        {vacancy}
                      </p>
                      <p>
                        <span className="font-medium">
                          কর্মরত শিক্ষক(পুরুষ):{" "}
                        </span>
                        {teacher_number}
                      </p>
                      <p>
                        <span className="font-medium">
                          কর্মরত শিক্ষক(মহিলা):{" "}
                        </span>
                        {women_teacher_number}
                      </p>
                      <p>
                        <span className="font-medium">ছুটি ভোগরত শিক্ষক: </span>
                        {vacation_consumers}
                      </p>
                    </div>
                  ) : (
                    <div className="p-8">কোন তথ্য পাওয়া যাইনি</div>
                  )}
                </div>
                <div className="mt-12">
                  <h4 className="md:text-[17px] text-lg font-semibold md:mb-5 mb-4 print:mb-4 print:text-xl text-[#008B4C]">
                    বেতন সংক্রান্ত তথ্য
                  </h4>
                  {teacherData.salary.length > 0 ? (
                    teacherData.salary.map((salaryItem, index) => (
                      <div
                        key={index}
                        className="flex flex-wrap gap-x-12 gap-y-4 md:flex-row flex-col mb-7"
                      >
                        <span className="text-base font-semibold">
                          শিক্ষক {convertToBengaliNumber(index + 1)}ঃ
                        </span>
                        <p>
                          <span className="font-medium">শিক্ষকের নাম: </span>
                          {salaryItem.name}
                        </p>
                        <p>
                          <span className="font-medium">শিক্ষকের পদবি: </span>
                          {salaryItem.designation}
                        </p>
                        <p>
                          <span className="font-medium">
                            সর্বশেষ শিক্ষাগত যোগ্যতা:{" "}
                          </span>
                          {salaryItem.educational_qualification}
                        </p>
                        <p>
                          <span className="font-medium">
                            বিভাগীয় প্রশিক্ষণ:{" "}
                          </span>
                          {salaryItem.divisional_training}
                        </p>
                        <p>
                          <span className="font-medium">জন্ম তারিখ: </span>
                          {salaryItem.date_of_birth}
                        </p>
                        <p>
                          <span className="font-medium">
                            প্রথম যোগদানের তারিখ:{" "}
                          </span>
                          {salaryItem.first_joining_date}
                        </p>
                        <p>
                          <span className="font-medium">
                            উক্ত পদে যোগদানের তারিখ:{" "}
                          </span>
                          {salaryItem.mentioned_post_joining_date}
                        </p>
                        <p>
                          <span className="font-medium">
                            এই বিদ্যালয়ে যোগদানের তারিখ:{" "}
                          </span>
                          {salaryItem.this_school_joining_date}
                        </p>
                        <p>
                          <span className="font-medium">বেতন স্কেল: </span>
                          {salaryItem.sallary_scale}
                        </p>
                        <p>
                          <span className="font-medium">মূল বেতন: </span>
                          {salaryItem.main_sallary}
                        </p>
                        <p>
                          <span className="font-medium">শিক্ষা ভাতা: </span>
                          {salaryItem.educational_allowance}
                        </p>
                        <p>
                          <span className="font-medium">ব্যাংক হিসাব নং: </span>
                          {salaryItem.bank_account_no}
                        </p>
                        <p>
                          <span className="font-medium">জিপিএফ নং: </span>
                          {salaryItem.gpf}
                        </p>
                        <p className="font-medium text-xl">
                          <span className="font-medium inline-block">
                            সক্রিয় মোবাইল নং:{" "}
                          </span>
                          {salaryItem.mobile_number}
                        </p>
                        <p>
                          <span className="font-medium">
                            চলতি বছরে মোট নৈমিত্তিক ছুটি:{" "}
                          </span>
                          {salaryItem.current_year_occasional_vacation}
                        </p>
                        <div className="felx items-center text-[16px]">
                          <span className="font-medium inline-block">
                            স্বাক্ষর:{" "}
                          </span>
                          <Image
                            className="inline-block ml-3"
                            width={80}
                            height={40}
                            src={salaryItem.signature}
                            alt="signature"
                          ></Image>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8">কোন তথ্য পাওয়া যাইনি</div>
                  )}
                </div>

                <div className="mt-12">
                  <h4 className="md:text-[17px] text-lg font-semibold md:mb-5 mb-4 print:mb-4 print:text-xl text-[#008B4C]">
                    ছুটি সংক্রান্ত তথ্য
                  </h4>
                  {teacherData.vacation.length > 0 ? (
                    teacherData.vacation.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-wrap gap-x-12 gap-y-4 md:flex-row flex-col mb-3"
                      >
                        <span className="text-base font-semibold">
                          শিক্ষক {convertToBengaliNumber(index + 1)}ঃ
                        </span>
                        <p>
                          <span className="font-medium">শিক্ষকের নাম: </span>
                          {item.teacher_name}
                        </p>
                        <p>
                          <span className="font-medium">ছুটির ধরন: </span>
                          {item.type}
                        </p>
                        <p>
                          <span className="font-medium">ছুটি শুরু: </span>
                          {item.start_date}
                        </p>
                        <p>
                          <span className="font-medium">ছুটি শেষ: </span>
                          {item.end_date}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="p-8">কোন তথ্য পাওয়া যাইনি</div>
                  )}
                </div>

                <div className="mt-12">
                  <h4 className="md:text-[17px] text-lg font-semibold md:mb-5 mb-4 print:mb-4 print:text-xl text-[#008B4C]">
                    অননুমোদিত শিক্ষক তথ্য
                  </h4>
                  {teacherData.unauthorized_teacher.length > 0 ? (
                    teacherData.unauthorized_teacher.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-wrap gap-x-12 gap-y-4 md:flex-row flex-col"
                      >
                        <span className="text-base font-semibold">
                          শিক্ষক {convertToBengaliNumber(index + 1)}ঃ
                        </span>
                        <p>
                          <span className="font-medium">শিক্ষকের নাম: </span>
                          {item.name}
                        </p>
                        <p>
                          <span className="font-medium">শিক্ষকের পদবি: </span>
                          {item.designation}
                        </p>
                        <p>
                          <span className="font-medium">
                            সর্বশেষ উপস্থিতির তারিখ:{" "}
                          </span>
                          {item.last_present_date}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="p-8">কোন তথ্য পাওয়া যাইনি</div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-8">কোন তথ্য পাওয়া যাইনি</div>
            )}
          </div>

          {/* student related data */}
          <div className="md:mt-10 mt-6 md:p-8 p-4 rounded-md shadow-sm bg-white">
            <h2 className="md:text-xl text-lg font-semibold main-heading">
              শিক্ষার্থী সংক্রান্ত তথ্য
            </h2>
            <div className="w-full h-[1px] bg-[#008B4C] md:mb-9 mb-5 mt-2 print:mb-6"></div>

            <div>
              <div>
                <h4 className="md:text-[17px] text-lg font-semibold md:mb-5 mb-4 print:mb-4 print:text-xl text-[#008B4C]">
                  জরিপকৃত তথ্য(৪+...১০+)
                </h4>
                {studentData.survey ? (
                  <>
                    <div className="flex flex-wrap gap-x-12 gap-y-4 md:flex-row flex-col">
                      <span className="text-base font-semibold">মোটঃ</span>
                      <p>
                        <span className="font-medium">বালক: </span>
                        {studentSurveyTotal.boys}
                      </p>
                      <p>
                        <span className="font-medium">বালিকা: </span>
                        {studentSurveyTotal.girls}
                      </p>
                      <p>
                        <span className="font-medium">মোট শিক্ষার্থী: </span>
                        {studentSurveyTotal.total}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-x-12 gap-y-4 md:flex-row flex-col mt-5">
                      <span className="text-base font-semibold">
                        সংশ্লিষ্ট বিদ্যালয়ে ভর্তিকৃতঃ
                      </span>
                      <p>
                        <span className="font-medium">বালক: </span>
                        {studentSurveyAdmitted.boys}
                      </p>
                      <p>
                        <span className="font-medium">বালিকা: </span>
                        {studentSurveyAdmitted.girls}
                      </p>
                      <p>
                        <span className="font-medium">মোট শিক্ষার্থী: </span>
                        {studentSurveyAdmitted.total}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-x-12 gap-y-4 md:flex-row flex-col mt-5">
                      <span className="text-base font-semibold">
                        অন্যান্য বিদ্যালয়ে ভর্তিকৃতঃ
                      </span>
                      <p>
                        <span className="font-medium">বালক: </span>
                        {studentSurveyAdmittedToOthersSchool.boys}
                      </p>
                      <p>
                        <span className="font-medium">বালিকা: </span>
                        {studentSurveyAdmittedToOthersSchool.girls}
                      </p>
                      <p>
                        <span className="font-medium">মোট শিক্ষার্থী: </span>
                        {studentSurveyAdmittedToOthersSchool.total}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-x-12 gap-y-4 md:flex-row flex-col mt-5">
                      <span className="text-base font-semibold">
                        অভর্তিকৃতঃ
                      </span>
                      <p>
                        <span className="font-medium">বালক: </span>
                        {studentSurveyUnAdmitted.boys}
                      </p>
                      <p>
                        <span className="font-medium">বালিকা: </span>
                        {studentSurveyUnAdmitted.girls}
                      </p>
                      <p>
                        <span className="font-medium">মোট শিক্ষার্থী: </span>
                        {studentSurveyUnAdmitted.total}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="p-8">কোন তথ্য পাওয়া যাইনি</div>
                )}
              </div>
              <div className="mt-12">
                <div>
                  <h4 className="md:text-[17px] text-lg font-semibold md:mb-5 mb-4 print:mb-4 print:text-xl text-[#008B4C]">
                    ছাত্র/ছাত্রী ভর্তি তথ্য
                  </h4>
                  {nursery_four_plus && (
                    <div className="flex flex-wrap gap-x-12 gap-y-4 md:flex-row flex-col">
                      <span className="text-base font-semibold">
                        শিশু শ্রেণী ৪+ঃ
                      </span>
                      <p>
                        <span className="font-medium">মুসলিম ছাত্র: </span>
                        {nursery_four_plus.muslim_boy_student}
                      </p>
                      <p>
                        <span className="font-medium">মুসলিম ছাত্রী: </span>
                        {nursery_four_plus.muslim_girl_student}
                      </p>
                      <p>
                        <span className="font-medium">
                          মুসলিম মোট শিক্ষার্থী:{" "}
                        </span>
                        {nursery_four_plus.muslim_total_student}
                      </p>
                      <p>
                        <span className="font-medium">হিন্দু ছাত্র: </span>
                        {nursery_four_plus.hindu_boy_student}
                      </p>
                      <p>
                        <span className="font-medium">হিন্দু ছাত্রী: </span>
                        {nursery_four_plus.hindu_girl_student}
                      </p>
                      <p>
                        <span className="font-medium">
                          হিন্দু মোট শিক্ষার্থী:{" "}
                        </span>
                        {nursery_four_plus.hindu_total_student}
                      </p>
                      <p>
                        <span className="font-medium">মোট ছাত্র: </span>
                        {nursery_four_plus.total_boy_student}
                      </p>
                      <p>
                        <span className="font-medium">মোট ছাত্রী: </span>
                        {nursery_four_plus.total_girl_student}
                      </p>
                      <p>
                        <span className="font-medium">মোট শিক্ষার্থী: </span>
                        {nursery_four_plus.total_student}
                      </p>
                      <p>
                        <span className="font-medium">
                          বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী:{" "}
                        </span>
                        {nursery_four_plus.special_demanded_student}
                      </p>
                    </div>
                  )}
                  {nursery_five_plus && (
                    <div className="flex flex-wrap gap-x-12 gap-y-4 md:flex-row flex-col mt-10">
                      <span className="text-base font-semibold">
                        শিশু শ্রেণী ৫+ঃ
                      </span>
                      <p>
                        <span className="font-medium">মুসলিম ছাত্র: </span>
                        {nursery_five_plus.muslim_boy_student}
                      </p>
                      <p>
                        <span className="font-medium">মুসলিম ছাত্রী: </span>
                        {nursery_five_plus.muslim_girl_student}
                      </p>
                      <p>
                        <span className="font-medium">
                          মুসলিম মোট শিক্ষার্থী:{" "}
                        </span>
                        {nursery_five_plus.muslim_total_student}
                      </p>
                      <p>
                        <span className="font-medium">হিন্দু ছাত্র: </span>
                        {nursery_five_plus.hindu_boy_student}
                      </p>
                      <p>
                        <span className="font-medium">হিন্দু ছাত্রী: </span>
                        {nursery_five_plus.hindu_girl_student}
                      </p>
                      <p>
                        <span className="font-medium">
                          হিন্দু মোট শিক্ষার্থী:{" "}
                        </span>
                        {nursery_five_plus.hindu_total_student}
                      </p>
                      <p>
                        <span className="font-medium">মোট ছাত্র: </span>
                        {nursery_five_plus.total_boy_student}
                      </p>
                      <p>
                        <span className="font-medium">মোট ছাত্রী: </span>
                        {nursery_five_plus.total_girl_student}
                      </p>
                      <p>
                        <span className="font-medium">মোট শিক্ষার্থী: </span>
                        {nursery_five_plus.total_student}
                      </p>
                      <p>
                        <span className="font-medium">
                          বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী:{" "}
                        </span>
                        {nursery_five_plus.special_demanded_student}
                      </p>
                    </div>
                  )}
                  {class_one && (
                    <div className="flex flex-wrap gap-x-12 gap-y-4 md:flex-row flex-col mt-10">
                      <span className="text-base font-semibold">
                        প্রথম শ্রেণিঃ
                      </span>
                      <p>
                        <span className="font-medium">মুসলিম ছাত্র: </span>
                        {class_one.muslim_boy_student}
                      </p>
                      <p>
                        <span className="font-medium">মুসলিম ছাত্রী: </span>
                        {class_one.muslim_girl_student}
                      </p>
                      <p>
                        <span className="font-medium">
                          মুসলিম মোট শিক্ষার্থী:{" "}
                        </span>
                        {class_one.muslim_total_student}
                      </p>
                      <p>
                        <span className="font-medium">হিন্দু ছাত্র: </span>
                        {class_one.hindu_boy_student}
                      </p>
                      <p>
                        <span className="font-medium">হিন্দু ছাত্রী: </span>
                        {class_one.hindu_girl_student}
                      </p>
                      <p>
                        <span className="font-medium">
                          হিন্দু মোট শিক্ষার্থী:{" "}
                        </span>
                        {class_one.hindu_total_student}
                      </p>
                      <p>
                        <span className="font-medium">মোট ছাত্র: </span>
                        {class_one.total_boy_student}
                      </p>
                      <p>
                        <span className="font-medium">মোট ছাত্রী: </span>
                        {class_one.total_girl_student}
                      </p>
                      <p>
                        <span className="font-medium">মোট শিক্ষার্থী: </span>
                        {class_one.total_student}
                      </p>
                      <p>
                        <span className="font-medium">
                          বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী:{" "}
                        </span>
                        {class_one.special_demanded_student}
                      </p>
                    </div>
                  )}
                  {class_two && (
                    <div className="flex flex-wrap gap-x-12 gap-y-4 md:flex-row flex-col mt-10">
                      <span className="text-base font-semibold">
                        দ্বিতীয় শ্রেণিঃ
                      </span>
                      <p>
                        <span className="font-medium">মুসলিম ছাত্র: </span>
                        {class_two.muslim_boy_student}
                      </p>
                      <p>
                        <span className="font-medium">মুসলিম ছাত্রী: </span>
                        {class_two.muslim_girl_student}
                      </p>
                      <p>
                        <span className="font-medium">
                          মুসলিম মোট শিক্ষার্থী:{" "}
                        </span>
                        {class_two.muslim_total_student}
                      </p>
                      <p>
                        <span className="font-medium">হিন্দু ছাত্র: </span>
                        {class_two.hindu_boy_student}
                      </p>
                      <p>
                        <span className="font-medium">হিন্দু ছাত্রী: </span>
                        {class_two.hindu_girl_student}
                      </p>
                      <p>
                        <span className="font-medium">
                          হিন্দু মোট শিক্ষার্থী:{" "}
                        </span>
                        {class_two.hindu_total_student}
                      </p>
                      <p>
                        <span className="font-medium">মোট ছাত্র: </span>
                        {class_two.total_boy_student}
                      </p>
                      <p>
                        <span className="font-medium">মোট ছাত্রী: </span>
                        {class_two.total_girl_student}
                      </p>
                      <p>
                        <span className="font-medium">মোট শিক্ষার্থী: </span>
                        {class_two.total_student}
                      </p>
                      <p>
                        <span className="font-medium">
                          বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী:{" "}
                        </span>
                        {class_two.special_demanded_student}
                      </p>
                    </div>
                  )}
                  {class_three && (
                    <div className="flex flex-wrap gap-x-12 gap-y-4 md:flex-row flex-col mt-10">
                      <span className="text-base font-semibold">
                        তৃতীয় শ্রেণিঃ
                      </span>
                      <p>
                        <span className="font-medium">মুসলিম ছাত্র: </span>
                        {class_three.muslim_boy_student}
                      </p>
                      <p>
                        <span className="font-medium">মুসলিম ছাত্রী: </span>
                        {class_three.muslim_girl_student}
                      </p>
                      <p>
                        <span className="font-medium">
                          মুসলিম মোট শিক্ষার্থী:{" "}
                        </span>
                        {class_three.muslim_total_student}
                      </p>
                      <p>
                        <span className="font-medium">হিন্দু ছাত্র: </span>
                        {class_three.hindu_boy_student}
                      </p>
                      <p>
                        <span className="font-medium">হিন্দু ছাত্রী: </span>
                        {class_three.hindu_girl_student}
                      </p>
                      <p>
                        <span className="font-medium">
                          হিন্দু মোট শিক্ষার্থী:{" "}
                        </span>
                        {class_three.hindu_total_student}
                      </p>
                      <p>
                        <span className="font-medium">মোট ছাত্র: </span>
                        {class_three.total_boy_student}
                      </p>
                      <p>
                        <span className="font-medium">মোট ছাত্রী: </span>
                        {class_three.total_girl_student}
                      </p>
                      <p>
                        <span className="font-medium">মোট শিক্ষার্থী: </span>
                        {class_three.total_student}
                      </p>
                      <p>
                        <span className="font-medium">
                          বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী:{" "}
                        </span>
                        {class_three.special_demanded_student}
                      </p>
                    </div>
                  )}
                  {class_four && (
                    <div className="flex flex-wrap gap-x-12 gap-y-4 md:flex-row flex-col mt-10">
                      <span className="text-base font-semibold">
                        চতুর্থ শ্রেণিঃ
                      </span>
                      <p>
                        <span className="font-medium">মুসলিম ছাত্র: </span>
                        {class_four.muslim_boy_student}
                      </p>
                      <p>
                        <span className="font-medium">মুসলিম ছাত্রী: </span>
                        {class_four.muslim_girl_student}
                      </p>
                      <p>
                        <span className="font-medium">
                          মুসলিম মোট শিক্ষার্থী:{" "}
                        </span>
                        {class_four.muslim_total_student}
                      </p>
                      <p>
                        <span className="font-medium">হিন্দু ছাত্র: </span>
                        {class_four.hindu_boy_student}
                      </p>
                      <p>
                        <span className="font-medium">হিন্দু ছাত্রী: </span>
                        {class_four.hindu_girl_student}
                      </p>
                      <p>
                        <span className="font-medium">
                          হিন্দু মোট শিক্ষার্থী:{" "}
                        </span>
                        {class_four.hindu_total_student}
                      </p>
                      <p>
                        <span className="font-medium">মোট ছাত্র: </span>
                        {class_four.total_boy_student}
                      </p>
                      <p>
                        <span className="font-medium">মোট ছাত্রী: </span>
                        {class_four.total_girl_student}
                      </p>
                      <p>
                        <span className="font-medium">মোট শিক্ষার্থী: </span>
                        {class_four.total_student}
                      </p>
                      <p>
                        <span className="font-medium">
                          বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী:{" "}
                        </span>
                        {class_four.special_demanded_student}
                      </p>
                    </div>
                  )}
                  {class_five && (
                    <div className="flex flex-wrap gap-x-12 gap-y-4 md:flex-row flex-col mt-10">
                      <span className="text-base font-semibold">
                        পঞ্চম শ্রেণিঃ
                      </span>
                      <p>
                        <span className="font-medium">মুসলিম ছাত্র: </span>
                        {class_five.muslim_boy_student}
                      </p>
                      <p>
                        <span className="font-medium">মুসলিম ছাত্রী: </span>
                        {class_five.muslim_girl_student}
                      </p>
                      <p>
                        <span className="font-medium">
                          মুসলিম মোট শিক্ষার্থী:{" "}
                        </span>
                        {class_five.muslim_total_student}
                      </p>
                      <p>
                        <span className="font-medium">হিন্দু ছাত্র: </span>
                        {class_five.hindu_boy_student}
                      </p>
                      <p>
                        <span className="font-medium">হিন্দু ছাত্রী: </span>
                        {class_five.hindu_girl_student}
                      </p>
                      <p>
                        <span className="font-medium">
                          হিন্দু মোট শিক্ষার্থী:{" "}
                        </span>
                        {class_five.hindu_total_student}
                      </p>
                      <p>
                        <span className="font-medium">মোট ছাত্র: </span>
                        {class_five.total_boy_student}
                      </p>
                      <p>
                        <span className="font-medium">মোট ছাত্রী: </span>
                        {class_five.total_girl_student}
                      </p>
                      <p>
                        <span className="font-medium">মোট শিক্ষার্থী: </span>
                        {class_five.total_student}
                      </p>
                      <p>
                        <span className="font-medium">
                          বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী:{" "}
                        </span>
                        {class_five.special_demanded_student}
                      </p>
                    </div>
                  )}
                  {class_six && (
                    <div className="flex flex-wrap gap-x-12 gap-y-4 md:flex-row flex-col mt-10">
                      <span className="text-base font-semibold">
                        ষষ্ঠ শ্রেণিঃ
                      </span>
                      <p>
                        <span className="font-medium">মুসলিম ছাত্র: </span>
                        {class_six.muslim_boy_student}
                      </p>
                      <p>
                        <span className="font-medium">মুসলিম ছাত্রী: </span>
                        {class_six.muslim_girl_student}
                      </p>
                      <p>
                        <span className="font-medium">
                          মুসলিম মোট শিক্ষার্থী:{" "}
                        </span>
                        {class_six.muslim_total_student}
                      </p>
                      <p>
                        <span className="font-medium">হিন্দু ছাত্র: </span>
                        {class_six.hindu_boy_student}
                      </p>
                      <p>
                        <span className="font-medium">হিন্দু ছাত্রী: </span>
                        {class_six.hindu_girl_student}
                      </p>
                      <p>
                        <span className="font-medium">
                          হিন্দু মোট শিক্ষার্থী:{" "}
                        </span>
                        {class_six.hindu_total_student}
                      </p>
                      <p>
                        <span className="font-medium">মোট ছাত্র: </span>
                        {class_six.total_boy_student}
                      </p>
                      <p>
                        <span className="font-medium">মোট ছাত্রী: </span>
                        {class_six.total_girl_student}
                      </p>
                      <p>
                        <span className="font-medium">মোট শিক্ষার্থী: </span>
                        {class_six.total_student}
                      </p>
                      <p>
                        <span className="font-medium">
                          বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী:{" "}
                        </span>
                        {class_six.special_demanded_student}
                      </p>
                    </div>
                  )}
                  {class_seven && (
                    <div className="flex flex-wrap gap-x-12 gap-y-4 md:flex-row flex-col mt-10">
                      <span className="text-base font-semibold">
                        সপ্তম শ্রেণিঃ
                      </span>
                      <p>
                        <span className="font-medium">মুসলিম ছাত্র: </span>
                        {class_seven.muslim_boy_student}
                      </p>
                      <p>
                        <span className="font-medium">মুসলিম ছাত্রী: </span>
                        {class_seven.muslim_girl_student}
                      </p>
                      <p>
                        <span className="font-medium">
                          মুসলিম মোট শিক্ষার্থী:{" "}
                        </span>
                        {class_seven.muslim_total_student}
                      </p>
                      <p>
                        <span className="font-medium">হিন্দু ছাত্র: </span>
                        {class_seven.hindu_boy_student}
                      </p>
                      <p>
                        <span className="font-medium">হিন্দু ছাত্রী: </span>
                        {class_seven.hindu_girl_student}
                      </p>
                      <p>
                        <span className="font-medium">
                          হিন্দু মোট শিক্ষার্থী:{" "}
                        </span>
                        {class_seven.hindu_total_student}
                      </p>
                      <p>
                        <span className="font-medium">মোট ছাত্র: </span>
                        {class_seven.total_boy_student}
                      </p>
                      <p>
                        <span className="font-medium">মোট ছাত্রী: </span>
                        {class_seven.total_girl_student}
                      </p>
                      <p>
                        <span className="font-medium">মোট শিক্ষার্থী: </span>
                        {class_seven.total_student}
                      </p>
                      <p>
                        <span className="font-medium">
                          বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী:{" "}
                        </span>
                        {class_seven.special_demanded_student}
                      </p>
                    </div>
                  )}
                  {class_eight && (
                    <div className="flex flex-wrap gap-x-12 gap-y-4 md:flex-row flex-col mt-10">
                      <span className="text-base font-semibold">
                        অষ্টম শ্রেণিঃ
                      </span>
                      <p>
                        <span className="font-medium">মুসলিম ছাত্র: </span>
                        {class_eight.muslim_boy_student}
                      </p>
                      <p>
                        <span className="font-medium">মুসলিম ছাত্রী: </span>
                        {class_eight.muslim_girl_student}
                      </p>
                      <p>
                        <span className="font-medium">
                          মুসলিম মোট শিক্ষার্থী:{" "}
                        </span>
                        {class_eight.muslim_total_student}
                      </p>
                      <p>
                        <span className="font-medium">হিন্দু ছাত্র: </span>
                        {class_eight.hindu_boy_student}
                      </p>
                      <p>
                        <span className="font-medium">হিন্দু ছাত্রী: </span>
                        {class_eight.hindu_girl_student}
                      </p>
                      <p>
                        <span className="font-medium">
                          হিন্দু মোট শিক্ষার্থী:{" "}
                        </span>
                        {class_eight.hindu_total_student}
                      </p>
                      <p>
                        <span className="font-medium">মোট ছাত্র: </span>
                        {class_eight.total_boy_student}
                      </p>
                      <p>
                        <span className="font-medium">মোট ছাত্রী: </span>
                        {class_eight.total_girl_student}
                      </p>
                      <p>
                        <span className="font-medium">মোট শিক্ষার্থী: </span>
                        {class_eight.total_student}
                      </p>
                      <p>
                        <span className="font-medium">
                          বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী:{" "}
                        </span>
                        {class_eight.special_demanded_student}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-12">
                <h4 className="md:text-[17px] text-lg font-semibold md:mb-5 mb-4 print:mb-4 print:text-xl text-[#008B4C]">
                  আশ্রয়ন প্রকল্পের জরিপকৃত তথ্য(৪+...১০+)
                </h4>
                {studentData.asroyon_survey.length > 0 && (
                  <div className="flex flex-wrap gap-x-12 gap-y-4 md:flex-row flex-col">
                    <p>
                      <span className="font-medium">
                        মোট জরিপকৃত শিক্ষার্থী:{" "}
                      </span>
                      {survayed_students}
                    </p>
                    <p>
                      <span className="font-medium">
                        সংশ্লিষ্ট বিদ্যালয়ে ভর্তিকৃত শিক্ষার্থী:{" "}
                      </span>
                      {admitted_releted_school_students}
                    </p>
                    <p>
                      <span className="font-medium">
                        অভর্তিকৃত শিক্ষার্থী:{" "}
                      </span>
                      {unadmitted_students}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-10 mt-3 justify-between">
            <button
              onClick={() => handleSubmit(billData._id)}
              type="submit"
              className="px-6 md:py-[10px] py-[6px] md:pt-[15px] pt-[10px] bg-[#008B4C] border border-[#008B4C] hover:bg-[#006f3d] text-white rounded-md font-semibold capitalize mt-5 print:hidden"
            >
              সাবমিট করুন
            </button>
            <button
              onClick={handlePrint}
              type="submit"
              className="px-6 md:py-[10px] py-[6px] md:pt-[15px] pt-[10px] bg-[#008B4C] border border-[#008B4C] hover:bg-[#006f3d] text-white rounded-md font-semibold capitalize mt-5 print:hidden flex items-center gap-3"
            >
              <span>ডাউনলোড করুন </span>
              <span className="block -mt-[2px]">
                <LuDownload className="text-xl" />
              </span>
            </button>
          </div>
        </div>
      ) : (
        <div className="p-8">কোন তথ্য পাওয়া যাইনি</div>
      )}
    </>
  );
};

export default DataDraft;
