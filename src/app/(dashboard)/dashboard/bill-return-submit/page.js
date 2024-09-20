/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import TextField from "@/app/components/TextField";
import { Field, FieldArray, Form, Formik } from "formik";
import * as React from "react";
import NumberField from "@/app/components/NumberField";
import MyDatePicker from "@/app/components/MyDatePicker";
import AnimateHeight from "react-animate-height";

import {
  Box,
  Checkbox,
  CircularProgress,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import DataDropdown from "@/app/components/DataDropdown";
import SearchableSelect from "@/app/components/SearchableSelect";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "@/authContext/AuthContext";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import convertToBengaliNumber from "@/lib/convertToBengaliNumber";
import dayjs from "dayjs";
import ImageInput2 from "@/app/components/ImageInput2";
import { generateUniqueId } from "@/lib/uniqueId";
import moment from "moment";
import { budgetYearOptions } from "../bill-return-edit/[dataId]/page";
import Loading from "@/app/components/Loading";
import Image from "next/image";

const monthOptions = [
  { value: "January", label: "জানুয়ারী" },
  { value: "February", label: "ফেব্রুয়ারী" },
  { value: "March", label: "মার্চ" },
  { value: "April", label: "এপ্রিল" },
  { value: "May", label: "মে" },
  { value: "June", label: "জুন" },
  { value: "July", label: "জুলাই" },
  { value: "August", label: "আগস্ট" },
  { value: "September", label: "সেপ্টেম্বর" },
  { value: "October", label: "অক্টোবর" },
  { value: "November", label: "নভেম্বর" },
  { value: "December", label: "ডিসেম্বর" },
];

const BilReturnSubmit = () => {
  const [billDataLoading, setBillDataLoading] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { userName } = React.useContext(AuthContext);
  const [fetchedBillData, setFetchedBillData] = React.useState(null);

  // fetch  latest bill data
  React.useEffect(() => {
    setBillDataLoading(true);
    const apiUrl = `https://dmsp.vercel.app/api/bill-return/latest`;
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: userName }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setFetchedBillData(data.data[0]);
        }
      })
      .catch((error) => {
        toast.error("একটি ইরর ঘটেছে!");
        console.error("There was an error!", error);
      })
      .finally(() => {
        setBillDataLoading(false);
      });
  }, []);

  const [monthSelectedOption, setMonthSelectedOption] = React.useState(null);
  const handleMonthSelectChange = (monthSelectedOption) => {
    setMonthSelectedOption(monthSelectedOption);
  };

  const [activeItem, setActiveItem] = React.useState("");

  const [buildingNumber, setBuildingNumber] = React.useState(0);

  // Function to handle change in the building number input
  const handleBuildingNumberChange = (e) => {
    const value = e.target.value;
    setBuildingNumber(parseInt(value));
  };
  const [borderWall, setBorderWall] = React.useState("");
  // Function to handle change in the border_wall select element
  const handleBorderWallChange = (event) => {
    setBorderWall(event.target.value);
  };

  const [laptop, setLaptop] = React.useState(0);

  // Function to handle change in the laptop select element
  const handleLaptopChange = (event) => {
    setLaptop(event.target.value);
  };

  const [multimedia, setMultimedia] = React.useState(0);

  // Function to handle change in the Multimedia select element
  const handleMultimediaChange = (event) => {
    setMultimedia(event.target.value);
  };
  const [piano, setPiano] = React.useState(0);

  // Function to handle change in the Piano select element
  const handlePianoChange = (event) => {
    setPiano(event.target.value);
  };

  const [washBlock, setWashBlock] = React.useState(
    fetchedBillData?.school?.infrastructure?.wash_block
  );

  // Function to handle change in the border_wall select element
  const handleWashBlockChange = (event) => {
    setWashBlock(event.target.value);
  };

  const [tubeWell, setTubeWell] = React.useState("");

  // Function to handle change in the border_wall select element
  const handleTubeWellChange = (event) => {
    setTubeWell(event.target.value);
  };

  const [deepTubeWell, setDeepTubeWell] = React.useState("");

  // Function to handle change in the border_wall select element
  const handleDeepTubeWellChange = (event) => {
    setDeepTubeWell(event.target.value);
  };
  const [registration, setRegistration] = React.useState("");

  // Function to handle change in the border_wall select element
  const handleRegistrationChange = (event) => {
    setRegistration(event.target.value);
  };
  const [namjari, setNamjari] = React.useState("");

  // Function to handle change in the border_wall select element
  const handleNamjariChange = (event) => {
    setNamjari(event.target.value);
  };

  const [schoolAccordionActive, setSchoolAccordionActive] = React.useState("");
  const schoolTogglePara = (value) => {
    setSchoolAccordionActive((oldValue) => (oldValue === value ? 0 : value));
  };

  const [studentAccordionActive, setStudentAccordionActive] =
    React.useState("nursery_four_plus");
  const studentTogglePara = (value) => {
    setStudentAccordionActive((oldValue) => (oldValue === value ? 0 : value));
  };

  const [internetType, setInternetType] = React.useState([]);

  const [internetLabel, setInternetLabel] = React.useState(true);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setInternetType(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const stipendYearOptions = [
    { value: "2014-2015", label: "2014-2015" },
    { value: "2015-2016", label: "2015-2016" },
    { value: "2016-2017", label: "2016-2017" },
    { value: "2017-2018", label: "2017-2018" },
    { value: "2018-2019", label: "2018-2019" },
    { value: "2019-2020", label: "2019-2020" },
    { value: "2020-2021", label: "2020-2021" },
    { value: "2021-2022", label: "2021-2022" },
    { value: "2022-2023", label: "2022-2023" },
    { value: "2023-2024", label: "2023-2024" },
    { value: "2024-2025", label: "2024-2025" },
    { value: "2025-2026", label: "2025-2026" },
    { value: "2026-2027", label: "2026-2027" },
    { value: "2027-2028", label: "2027-2028" },
    { value: "2028-2029", label: "2028-2029" },
    { value: "2029-2030", label: "2029-2030" },
    { value: "2030-2031", label: "2030-2031" },
    { value: "2031-2032", label: "2031-2032" },
    { value: "2032-2033", label: "2032-2033" },
    { value: "2033-2034", label: "2033-2034" },
    { value: "2034-2035", label: "2034-2035" },
    { value: "2035-2036", label: "2035-2036" },
    { value: "2036-2037", label: "2036-2037" },
    { value: "2037-2038", label: "2037-2038" },
    { value: "2038-2039", label: "2038-2039" },
    { value: "2039-2040", label: "2039-2040" },
    { value: "2040-2041", label: "2040-2041" },
  ];

  const [stipendYearSelectedOption, setStipendYearSelectedOption] =
    React.useState("");

  const stipendYearSelectChange = (schoolSelectedOption) => {
    setStipendYearSelectedOption(schoolSelectedOption);
  };

  const [draftSubmit, setDraftSubmit] = React.useState(false);

  if (billDataLoading) {
    return <Loading />;
  }
  // if (!fetchedBillData) {
  //   return (
  //     <div className="flex justify-center items-center h-[80vh]">
  //       <h3 className="text-3xl font-semibold text-center">
  //         কোন তথ্য পাওয়া যায়নি!
  //       </h3>
  //     </div>
  //   );
  // }

  const handleFormSubmit = async (values) => {
    setLoading(true);
    if (values) {
      const formData = {
        unique_id: "",
        school: {
          general: {},
          infrastructure: {},
          land: {},
          stipend: {},
          conference: {},
          development: {},
        },
        teacher: {
          general: {},
          salary: {},
          vacation: {},
          unauthorized_teacher: {},
        },
        student: {
          survey: {},
          admission: {},
          asroyon_survey: {},
        },
      };
      const currentDate = new Date().toISOString();
      const uniqueId = generateUniqueId();
      formData.unique_id = uniqueId;
      formData.submitted_by = userName;
      formData.isDraft = draftSubmit ? true : false;
      formData.submitted_at = currentDate;
      formData.submitted_date = `${monthSelectedOption?.value} ${moment(
        formData.submitted_at
      ).format("YYYY")}`;
      formData.updated_at = "";
      formData.school.general = values.school.general;
      formData.school.general.bill_month = monthSelectedOption?.value;
      formData.school.conference = values.school.conference;
      formData.school.development = values.budgets;
      formData.school.infrastructure = values.school.infrastructure;
      formData.school.infrastructure.others.internet = internetType;
      formData.school.infrastructure.others.laptop.total = laptop;
      formData.school.infrastructure.others.piano.total = piano;
      formData.school.infrastructure.others.multimedia.total = multimedia;
      formData.school.land = values.school.land;
      formData.school.stipend = values.school.stipend;
      values.school.infrastructure.border_wall.wall = borderWall;
      if (borderWall === "নেই") {
        formData.school.infrastructure.border_wall.funding_type = "";
        formData.school.infrastructure.border_wall.founded_date = "";
      }
      values.school.infrastructure.building.buildings = buildingNumber;
      values.school.infrastructure.water.tube_wells = tubeWell;
      values.school.infrastructure.water.deep_tube_wells = deepTubeWell;
      values.school.infrastructure.wash_block = washBlock;
      values.school.land.is_registered = registration;
      values.school.land.is_namjaried = namjari;
      values.school.stipend.stipend_year = stipendYearSelectedOption?.value;
      formData.teacher.general = values.teacher.general;
      formData.teacher.attendance = values.teacher.attendance;
      formData.teacher.hajira_from = values.hajira_from;
      formData.teacher.hajira_to = values.hajira_to;
      formData.teacher.salary = values.salary;
      formData.teacher.vacation = values.vacations;
      formData.teacher.unauthorized_teacher = values.unauthorized_teacher;
      formData.student.survey.survey_admitted = values.survey_admitted;
      formData.student.survey.survey_admitted_to_other_school =
        values.survey_admitted_to_other_school;
      formData.student.survey.survey_unadmitted = values.survey_unadmitted;
      formData.student.survey.survey_total = values.survey_total;
      formData.student.admission.nursery_four_plus = values.nursery_four_plus;
      formData.student.admission.nursery_five_plus = values.nursery_five_plus;
      formData.student.admission.class_one = values.class_one;
      formData.student.admission.class_two = values.class_two;
      formData.student.admission.class_three = values.class_three;
      formData.student.admission.class_four = values.class_four;
      formData.student.admission.class_five = values.class_five;
      formData.student.admission.class_six = values.class_six;
      formData.student.admission.class_seven = values.class_seven;
      formData.student.admission.class_eight = values.class_eight;
      formData.student.asroyon_survey = values.asroyon_survey;

      // API call with the updated form data
      const apiUrl = "https://dmsp.vercel.app/api/bill-return/submit";
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.message === "Bill return submitted") {
            if (draftSubmit) {
              const newWindow = window.open(
                `/dashboard/bill-return-submit/draft/${uniqueId}`,
                "_blank"
              );
              if (newWindow) {
                newWindow.opener = null;
                setDraftSubmit(false);
              }
            }
            toast.success("সফলভাবে সাবমিট হয়েছে!");
          } else {
            console.error("Submission failed:", data);
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        })
        .finally(() => {
          setLoading(false);
          setTimeout(() => {
            window.location.reload();
          }, 1800);
        });
    }
  };

  const handleOpenNewTab = () => {
    setDraftSubmit(true);
  };

  const internetTypeOptions = ["মডেম", "সিম", "রাউটার"];

  const schoolData = fetchedBillData?.school;

  // school general data
  const {
    cluster,
    email,
    emis_code,
    founded_date,
    grade,
    name: schoolName,
    post_office,
    shifts,
    union_corporation,
    village_moholla,
    word_number,
  } = schoolData?.general || {};
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
  } = schoolData?.infrastructure || {};
  const {
    electricity_connection,
    freedom_fight_corner,
    garden,
    internet,
    laptop: fetchedLaptop,
    multimedia: fetchedMultimedia,
    piano: fetchedPiano,
    rasel_corner,
    shahid_minar,
  } = schoolData?.infrastructure?.others || {};

  const {
    deep_tube_wells,
    deep_tube_wells_condition,
    tube_wells,
    tube_wells_condition,
  } = schoolData?.infrastructure?.water || {};
  const infrastructureBorderWall =
    schoolData?.infrastructure?.border_wall || {};
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
  } = schoolData?.infrastructure?.building || {};
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
  } = schoolData?.land || {};

  // school stipend data
  const { stipend_year, latest_season, demand, distributed, total_consumer } =
    schoolData?.stipend || {};

  // school conference data
  const { guardian, mother, pta, smc, staff_meeting, yard } =
    schoolData?.conference || {};
  const schoolDevelopment = schoolData?.development || {};
  // teacher data
  const teacherData = fetchedBillData?.teacher || {};
  const {
    permitted_post,
    teacher_number,
    vacancy,
    women_teacher_number,
    vacation_consumers,
    working_post,
  } = teacherData?.general || {};

  const unauthorized_teacher = teacherData?.unauthorized_teacher;
  const teacherVacations = teacherData?.vacation;
  const teacherSalary = teacherData?.salary;
  // student related data
  const studentData = fetchedBillData?.student;

  const studentSurveyAdmitted = studentData?.survey?.survey_admitted;
  const studentSurveyAdmittedToOthersSchool =
    studentData?.survey?.survey_admitted_to_other_school;
  const studentSurveyUnAdmitted = studentData?.survey?.survey_unadmitted;
  const studentSurveyTotal = studentData?.survey?.survey_total;
  const nursery_four_plus = studentData?.admission?.nursery_four_plus;
  const nursery_five_plus = studentData?.admission?.nursery_five_plus;
  const class_one = studentData?.admission?.class_one;
  const class_two = studentData?.admission?.class_two;
  const class_three = studentData?.admission?.class_three;
  const class_four = studentData?.admission?.class_four;
  const class_five = studentData?.admission?.class_five;
  const class_six = studentData?.admission?.class_six;
  const class_seven = studentData?.admission?.class_seven;
  const class_eight = studentData?.admission?.class_eight;
  const studentAsroyonSurvey = studentData?.asroyon_survey;

  const initialValues = {
    unique_id: "",
    hajira_from: teacherData?.hajira_from || "",
    hajira_to: teacherData?.hajira_to || "",
    submitter_info: {
      submitted_by: "",
    },
    budgets: fetchedBillData?.school?.development || [{}],
    school: {
      general: {
        name: schoolName,
        cluster: cluster,
        village_moholla: village_moholla,
        word_number: word_number,
        post_office: post_office,
        union_corporation: union_corporation,
        emis_code: emis_code,
        email: email,
        founded_date: founded_date,
        grade: grade,
        shifts: shifts,
      },
      infrastructure: {
        building: {
          buildings: buildings,
          building_date_1: building_date_1,
          building_type_1: building_type_1,
          building_condition_1: building_condition_1,
          building_date_2: building_date_2,
          building_type_2: building_type_2,
          building_condition_2: building_condition_2,
          building_date_3: building_date_3,
          building_type_3: building_type_3,
          building_condition_3: building_condition_3,
          building_date_4: building_date_4,
          building_type_4: building_type_4,
          building_condition_4: building_condition_4,
        },
        headmaster_room: headmaster_room,
        office_rooms: office_rooms,
        class_rooms: class_rooms,
        useable_class_rooms: useable_class_rooms,
        multimedia_rooms: multimedia_rooms,
        separated_nursery_class: separated_nursery_class,
        border_wall: {
          wall: borderWall,
          funding_type: infrastructureBorderWall.funding_type,
          founded_date: infrastructureBorderWall.founded_date,
        },
        toilets: toilets,
        wash_block: wash_block,
        wash_block_founded_date: wash_block_founded_date,
        others: {
          shahid_minar: shahid_minar,
          freedom_fight_corner: freedom_fight_corner,
          rasel_corner: rasel_corner,
          garden: garden,
          internet: internet,
          laptop: {
            total: fetchedLaptop?.total,
            actives: fetchedLaptop?.actives,
          },
          multimedia: {
            total: fetchedMultimedia?.total,
            actives: fetchedMultimedia?.actives,
          },
          piano: {
            total: fetchedPiano?.total,
            actives: fetchedPiano?.actives,
          },
          electricity_connection: electricity_connection,
        },
        water: {
          tube_wells: tube_wells,
          tube_wells_condition: tube_wells_condition,
          deep_tube_wells: deep_tube_wells,
          deep_tube_wells_condition: deep_tube_wells_condition,
        },
      },
      land: {
        total_amount: total_amount,
        take_overed: take_overed,
        dispossessed: dispossessed,
        is_registered: registration,
        registration_ownership: registration_ownership,
        khatian_number: khatian_number,
        dag_number: dag_number,
        dolil_number: dolil_number,
        dolil_year: dolil_year,
        is_namjaried: namjari,
        namjari_ownership: namjari_ownership,
        is_cased: is_cased,
        taxt_condition: taxt_condition,
      },
      stipend: {
        stipend_year: stipend_year,
        latest_season: latest_season,
        total_consumer: total_consumer,
        demand: demand,
        distributed: distributed,
      },
      conference: {
        smc: smc,
        pta: pta,
        mother: mother,
        guardian: guardian,
        yard: yard,
        staff_meeting: staff_meeting,
      },
      development: {
        // ...budgets
      },
    },
    permitted_post: "",
    teacher: {
      general: {
        permitted_post: permitted_post,
        working_post: working_post,
        vacancy: vacancy,
        teacher_number: teacher_number,
        women_teacher_number: women_teacher_number,
        vacation_consumers: vacation_consumers,
      },
      // attendance: teacherData?.attendance?.map((teacher) => ({
      //   name: teacher.name || "",
      //   signature: teacher.signature || "",
      //   days: teacher.days.map((day) => ({
      //     status: day.status || "option",
      //     coming_time: day.coming_time || null,
      //     leaving_time: day.leaving_time || null,
      //     absence_reason: day.absence_reason || "",
      //   })),
      // })),
      attendance: teacherData?.attendance?.length
        ? teacherData?.attendance?.map((teacher) => ({
            name: teacher.name || "",
            signature: teacher.signature || "",
            days: teacher.days.map((day) => ({
              status: day.status || "option",
              coming_time: day.coming_time || null,
              leaving_time: day.leaving_time || null,
              absence_reason: day.absence_reason || "",
            })),
          }))
        : Array(15).fill({
            name: "",
            days: Array(31).fill({
              status: "option",
              coming_time: null,
              leaving_time: null,
              signature: "",
              absence_reason: "",
            }),
          }),

      // attendance: Array(15).fill({
      //   name: "",
      //   days: Array(31).fill({
      //     status: "option",
      //     coming_time: null,
      //     leaving_time: null,
      //     signature: "",
      //     absence_reason: "",
      //   }),
      // }),
    },
    students: {
      admission: {},
    },
    salary: teacherData?.salary || [{}],
    vacations: teacherVacations || [{}],
    nursery_four_plus: nursery_four_plus || [{}],
    nursery_five_plus: nursery_five_plus || [{}],
    class_one: class_one || [{}],
    class_two: class_two || [{}],
    class_three: class_three || [{}],
    class_four: class_four || [{}],
    class_five: class_five || [{}],
    class_six: class_six || [{}],
    class_seven: class_seven || [{}],
    class_eight: class_eight || [{}],
    asroyon_survey: studentAsroyonSurvey || [{}],
    survey_total: studentSurveyTotal || [{}],
    survey_admitted: studentSurveyAdmitted || [{}],
    survey_unadmitted: studentSurveyUnAdmitted || [{}],
    survey_admitted_to_other_school: studentSurveyAdmittedToOthersSchool || [
      {},
    ],
    unauthorized_teacher: unauthorized_teacher,
  };

  return (
    <div className="bg-[#FAFAFA] xl:w-[85%] w-full lg:mt-0 mt-4">
      <h2 className="md:text-2xl text-xl font-semibold md:mb-14 mb-8">
        বিল রিটার্ন সাবমিট
      </h2>
      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ touched, values, setFieldValue, errors }) => (
          <Form>
            {/* school related data */}
            <div className="border bg-white shadow-sm rounded-[4px] md:p-8 p-3">
              <h2 className="md:text-xl text-lg font-semibold md:mb-8">
                বিদ্যালয় সংক্রান্ত তথ্য
              </h2>
              <DataDropdown
                title="সাধারণ তথ্য"
                itemKey={"general"}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              >
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4 pt-4">
                  <div className="mb-4">
                    <h1 className="font-semibold">বিলের মাস</h1>
                    <SearchableSelect
                      options={monthOptions}
                      onChange={handleMonthSelectChange}
                      value={monthSelectedOption}
                      placeholder={"মাস সিলেক্ট করুন"}
                    />
                  </div>
                  <TextField
                    defaultValue={schoolName}
                    name="school.general.name"
                    label="বিদ্যালয়ের নাম"
                    placeholder={"বিদ্যালয়ের নাম লিখুন"}
                  />
                  <div className="mb-4">
                    <label className="font-semibold" htmlFor="cluster">
                      ক্লাস্টার
                    </label>
                    <Field
                      className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                      as="select"
                      name="school.general.cluster"
                      id="cluster"
                    >
                      <option
                        className="text-gray-300"
                        value={"ক্লাস্টার সিলেক্ট করুন"}
                        selected
                      >
                        {"ক্লাস্টার সিলেক্ট করুন"}
                      </option>
                      <option value="সাধুহাটি ক্লাস্টার">সাধুহাটি</option>
                      <option value="কামালপুর ক্লাস্টার">কামালপুর</option>
                      <option value="ভাদগাঁও ক্লাস্টার">ভাদগাঁও</option>
                      <option value="শ্যামরারবাজার ক্লাস্টার">
                        শ্যামরারবাজার
                      </option>
                      <option value="আমতৈল ক্লাস্টার">আমতৈল</option>
                      <option value="নাজিরাবাদ ক্লাস্টার">নাজিরাবাদ</option>
                      <option value="বাহারমর্দান ক্লাস্টার">বাহারমর্দান</option>
                      <option value="আকবরপুর ক্লাস্টার">আকবরপুর</option>
                    </Field>
                  </div>
                  <TextField
                    defaultValue={village_moholla}
                    name="school.general.village_moholla"
                    label="গ্রাম/মহল্লার নাম"
                    placeholder={"গ্রাম/মহল্লার নাম লিখুন"}
                  />
                  <NumberField
                    defaultValue={word_number}
                    name="school.general.word_number"
                    label="ওয়ার্ড নাম্বার"
                    placeholder={"ওয়ার্ড নাম্বার লিখুন"}
                  />
                  <TextField
                    defaultValue={post_office}
                    name="school.general.post_office"
                    label="ডাকঘর"
                    placeholder={"ডাকঘর লিখুন"}
                  />
                  <div className="mb-4">
                    <label
                      className="font-semibold"
                      htmlFor="union_corporation"
                    >
                      ইউনিয়ন/পৌরসভা
                    </label>
                    <Field
                      className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                      as="select"
                      name="school.general.union_corporation"
                      id="union_corporation"
                    >
                      <option
                        className="text-gray-300"
                        value="Select an option"
                        selected
                      >
                        একটি অপশন সিলেক্ট করুন
                      </option>
                      <option value="খলিলপুর">খলিলপুর</option>
                      <option value="মনুমুখ">মনুমুখ</option>
                      <option value="কামালপুর">কামালপুর</option>
                      <option value="কাগাবলা">কাগাবলা</option>
                      <option value="আখাইল কুড়া">আখাইল কুড়া</option>
                      <option value="একাটুনা">একাটুনা</option>
                      <option value="চাঁদনী ঘাট">চাঁদনী ঘাট</option>
                      <option value="কনকপুর">কনকপুর</option>
                      <option value="আমতৈল">আমতৈল</option>
                      <option value="নাজিরাবাদ">নাজিরাবাদ</option>
                      <option value="মোস্তফাপুর">মোস্তফাপুর</option>
                      <option value="গিয়াস নগর">গিয়াস নগর</option>
                      <option value="মৌলভীবাজার পৌরসভা ওয়ার্ড নং-১">
                        মৌলভীবাজার পৌরসভা ওয়ার্ড নং-১
                      </option>
                      <option value="মৌলভীবাজার পৌরসভা ওয়ার্ড নং-২">
                        মৌলভীবাজার পৌরসভা ওয়ার্ড নং-২
                      </option>
                      <option value="মৌলভীবাজার পৌরসভা ওয়ার্ড নং-৩">
                        মৌলভীবাজার পৌরসভা ওয়ার্ড নং-৩
                      </option>
                      <option value="মৌলভীবাজার পৌরসভা ওয়ার্ড নং-৪">
                        মৌলভীবাজার পৌরসভা ওয়ার্ড নং-৪
                      </option>
                      <option value="মৌলভীবাজার পৌরসভা ওয়ার্ড নং-৫">
                        মৌলভীবাজার পৌরসভা ওয়ার্ড নং-৫
                      </option>
                      <option value="মৌলভীবাজার পৌরসভা ওয়ার্ড নং-৬">
                        মৌলভীবাজার পৌরসভা ওয়ার্ড নং-৬
                      </option>
                      <option value="মৌলভীবাজার পৌরসভা ওয়ার্ড নং-৭">
                        মৌলভীবাজার পৌরসভা ওয়ার্ড নং-৭
                      </option>
                      <option value="মৌলভীবাজার পৌরসভা ওয়ার্ড নং-৮">
                        মৌলভীবাজার পৌরসভা ওয়ার্ড নং-৮
                      </option>
                      <option value="মৌলভীবাজার পৌরসভা ওয়ার্ড নং-৯">
                        মৌলভীবাজার পৌরসভা ওয়ার্ড নং-৯
                      </option>
                    </Field>
                  </div>

                  <TextField
                    defaultValue={emis_code}
                    name="school.general.emis_code"
                    label="EMIS কোড"
                    placeholder={"EMIS কোড লিখুন"}
                  />
                  <TextField
                    defaultValue={email}
                    name="school.general.email"
                    label="বিদ্যালয়ের ইমেইল"
                    placeholder={"বিদ্যালয়ের ইমেইল লিখুন"}
                  />
                  <MyDatePicker
                    defaultValue={founded_date}
                    name="school.general.founded_date"
                    label="প্রতিষ্ঠার সন"
                  />

                  <div className="mb-4">
                    <label className="font-semibold" htmlFor="grade">
                      গ্রেড*
                    </label>
                    <Field
                      className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                      as="select"
                      name="school.general.grade"
                      id="grade"
                    >
                      <option
                        className="text-gray-300"
                        value="Select an option"
                        selected
                      >
                        গ্রেড সিলেক্ট করুন
                      </option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                    </Field>
                  </div>
                  <div className="mb-4">
                    <label className="font-semibold" htmlFor="shift">
                      শিফট সংখ্যা*
                    </label>
                    <Field
                      className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                      as="select"
                      name="school.general.shifts"
                      id="shift"
                    >
                      <option
                        className="text-gray-300"
                        value="Select an option"
                        selected
                      >
                        শিফট সিলেক্ট করুন
                      </option>
                      <option value="1">১</option>
                      <option value="2">২</option>
                    </Field>
                  </div>
                </div>
              </DataDropdown>
              <DataDropdown
                title="ভৌত অবকাঠামো তথ্য"
                itemKey={"infrastructure"}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              >
                <div className="pt-4">
                  {/* school building related data */}
                  <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4">
                    <div className="mb-4">
                      <label
                        className="font-semibold"
                        htmlFor="building_number"
                      >
                        ভবন সংখ্যা*
                      </label>
                      <input
                        placeholder="ভবন সংখ্যা দিন"
                        name="school.infrastructure.buildings"
                        id="building_number"
                        onChange={handleBuildingNumberChange}
                        type="number"
                        className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                      />
                    </div>
                  </div>
                  <div className="mt-6 mb-12">
                    {buildingNumber >= 1 && (
                      <div className="mt-3 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-6">
                        <MyDatePicker
                          name={
                            "school.infrastructure.building.building_date_1"
                          }
                          label={"ভবন ১ নির্মাণের সন "}
                        />
                        <div className="mb-4">
                          <label
                            className="font-semibold"
                            htmlFor={`building_type_1`}
                          >
                            ভবন ১ এর ধরন*
                          </label>
                          <Field
                            className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                            as="select"
                            name={`school.infrastructure.building.building_type_1`}
                            id={`building_type_1`}
                          >
                            <option
                              className="text-gray-300"
                              value="Select an option"
                              selected
                            >
                              ভবনের ধরন সিলেক্ট করুন
                            </option>
                            <option value="পাকা">পাকা</option>
                            <option value="সেমিপাকা">সেমিপাকা</option>
                            <option value="টিনশেড">টিনশেড</option>
                          </Field>
                        </div>
                        <div className="mb-4">
                          <label
                            className="font-semibold"
                            htmlFor={`building_condition_1`}
                          >
                            ভবন ১ এর বর্তমান অবস্থা*
                          </label>
                          <Field
                            className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                            as="select"
                            name={`school.infrastructure.building.building_condition_1`}
                            id={`building_condition_1`}
                          >
                            <option
                              className="text-gray-300"
                              value="Select an option"
                              selected
                            >
                              ভবনের অবস্থা সিলেক্ট করুন
                            </option>
                            <option value="ভালো">ভালো</option>
                            <option value="জরাজীর্ণ">জরাজীর্ণ</option>
                            <option value="পরিত্যাক্ত">পরিত্যাক্ত</option>
                          </Field>
                        </div>
                      </div>
                    )}

                    {buildingNumber >= 2 && (
                      <div className="mt-3 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-6">
                        <MyDatePicker
                          name={
                            "school.infrastructure.building.building_date_2"
                          }
                          label={"ভবন ২ নির্মাণের সন "}
                        />
                        <div className="mb-4">
                          <label
                            className="font-semibold"
                            htmlFor={`building_type_2`}
                          >
                            ভবন 2 এর ধরন*
                          </label>
                          <Field
                            className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                            as="select"
                            name={`school.infrastructure.building.building_type_2`}
                            id={`building_type_2`}
                          >
                            <option
                              className="text-gray-300"
                              value="Select an option"
                              selected
                            >
                              ভবনের ধরন সিলেক্ট করুন
                            </option>
                            <option value="পাকা">পাকা</option>
                            <option value="সেমিপাকা">সেমিপাকা</option>
                            <option value="টিনশেড">টিনশেড</option>
                          </Field>
                        </div>
                        <div className="mb-4">
                          <label
                            className="font-semibold"
                            htmlFor={`building_condition_2`}
                          >
                            ভবন 2 এর বর্তমান অবস্থা*
                          </label>
                          <Field
                            className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                            as="select"
                            name={`school.infrastructure.building.building_condition_2`}
                            id={`building_condition_2`}
                          >
                            <option
                              className="text-gray-300"
                              value="Select an option"
                              selected
                            >
                              ভবনের অবস্থা সিলেক্ট করুন
                            </option>
                            <option value="ভালো">ভালো</option>
                            <option value="জরাজীর্ণ">জরাজীর্ণ</option>
                            <option value="পরিত্যাক্ত">পরিত্যাক্ত</option>
                          </Field>
                        </div>
                      </div>
                    )}

                    {buildingNumber >= 3 && (
                      <div className="mt-3 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-6">
                        <MyDatePicker
                          name={
                            "school.infrastructure.building.building_date_3"
                          }
                          label={"ভবন ৩ নির্মাণের সন "}
                        />

                        <div className="mb-4">
                          <label
                            className="font-semibold"
                            htmlFor={`building_type_3`}
                          >
                            ভবন ৩ এর ধরন*
                          </label>
                          <Field
                            className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                            as="select"
                            name={`school.infrastructure.building.building_type_3`}
                            id={`building_type_3`}
                          >
                            <option
                              className="text-gray-300"
                              value="Select an option"
                              selected
                            >
                              ভবনের ধরন সিলেক্ট করুন
                            </option>
                            <option value="পাকা">পাকা</option>
                            <option value="সেমিপাকা">সেমিপাকা</option>
                            <option value="টিনশেড">টিনশেড</option>
                          </Field>
                        </div>
                        <div className="mb-4">
                          <label
                            className="font-semibold"
                            htmlFor={`building_condition_3`}
                          >
                            ভবন ৩ এর বর্তমান অবস্থা*
                          </label>
                          <Field
                            className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                            as="select"
                            name={`school.infrastructure.building.building_condition_3`}
                            id={`building_condition_3`}
                          >
                            <option
                              className="text-gray-300"
                              value="Select an option"
                              selected
                            >
                              ভবনের অবস্থা সিলেক্ট করুন
                            </option>
                            <option value="ভালো">ভালো</option>
                            <option value="জরাজীর্ণ">জরাজীর্ণ</option>
                            <option value="পরিত্যাক্ত">পরিত্যাক্ত</option>
                          </Field>
                        </div>
                      </div>
                    )}

                    {buildingNumber >= 4 && (
                      <div className="mt-3 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-6">
                        <MyDatePicker
                          name={
                            "school.infrastructure.building.building_date_4"
                          }
                          label={"ভবন ৪ নির্মাণের সন "}
                        />

                        <div className="mb-4">
                          <label
                            className="font-semibold"
                            htmlFor={`building_type_4`}
                          >
                            ভবন ৪ এর ধরন*
                          </label>
                          <Field
                            className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                            as="select"
                            name={`school.infrastructure.building.building_type_4`}
                            id={`building_type_4`}
                          >
                            <option
                              className="text-gray-300"
                              value="Select an option"
                              selected
                            >
                              ভবনের ধরন সিলেক্ট করুন
                            </option>
                            <option value="পাকা">পাকা</option>
                            <option value="সেমিপাকা">সেমিপাকা</option>
                            <option value="টিনশেড">টিনশেড</option>
                          </Field>
                        </div>
                        <div className="mb-4">
                          <label
                            className="font-semibold"
                            htmlFor={`building_condition_4`}
                          >
                            ভবন ৪ এর বর্তমান অবস্থা*
                          </label>
                          <Field
                            className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                            as="select"
                            name={`school.infrastructure.building.building_condition_4`}
                            id={`building_condition_4`}
                          >
                            <option
                              className="text-gray-300"
                              value="Select an option"
                              selected
                            >
                              ভবনের অবস্থা সিলেক্ট করুন
                            </option>
                            <option value="ভালো">ভালো</option>
                            <option value="জরাজীর্ণ">জরাজীর্ণ</option>
                            <option value="পরিত্যাক্ত">পরিত্যাক্ত</option>
                          </Field>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* class room related data */}
                  <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-6">
                    <NumberField
                      defaultValue={headmaster_room}
                      label="প্রধান শিক্ষকের কক্ষ"
                      placeholder="প্রধান শিক্ষকের কক্ষ সংখ্যা"
                      name="school.infrastructure.headmaster_room"
                    />
                    <NumberField
                      defaultValue={office_rooms}
                      label="অফিস কক্ষ"
                      placeholder="অফিস কক্ষ সংখ্যা দিন"
                      name="school.infrastructure.office_rooms"
                    />
                    <NumberField
                      defaultValue={class_rooms}
                      label="শ্রেণী কক্ষ"
                      placeholder="শ্রেণী কক্ষের সংখ্যা দিন"
                      name="school.infrastructure.class_rooms"
                    />
                    <NumberField
                      defaultValue={useable_class_rooms}
                      label="ব্যবহারযোগ্য শ্রেণী কক্ষ"
                      placeholder="ব্যবহারযোগ্য শ্রেণী কক্ষের সংখ্যা দিন"
                      name="school.infrastructure.useable_class_rooms"
                    />
                    <NumberField
                      defaultValue={multimedia_rooms}
                      label="মাল্টিমিডিয়া কক্ষ"
                      placeholder="মাল্টিমিডিয়া কক্ষ সংখ্যা দিন"
                      name="school.infrastructure.multimedia_rooms"
                    />
                    {/* <NumberField label="শিশু শ্রেণী" placeholder="শিশু শ্রেণী সংখ্যা দিন" name="nursery_class" /> */}

                    <div className="mb-4">
                      <label
                        className="font-semibold"
                        htmlFor="have_nursery_class"
                      >
                        পৃথক শিশু শ্রেণী*
                      </label>
                      <Field
                        className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                        as="select"
                        name="school.infrastructure.separated_nursery_class"
                        id="have_nursery_class"
                      >
                        <option
                          className="text-gray-300"
                          value="Select an option"
                          selected
                        >
                          একটি অপশন সিলেক্ট করুন
                        </option>
                        <option value="আছে">আছে</option>
                        <option value="নেই">নেই</option>
                      </Field>
                    </div>

                    <div className="mb-4">
                      <label className="font-semibold" htmlFor="border_wall">
                        সীমানা প্রাচীর
                      </label>
                      <Field
                        value={borderWall}
                        onChange={handleBorderWallChange}
                        className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                        as="select"
                        name="school.infrastructure.border_wall.wall"
                        id="border_wall"
                      >
                        <option
                          className="text-gray-300"
                          value={infrastructureBorderWall?.wall}
                          selected
                        >
                          {infrastructureBorderWall?.wall}
                        </option>
                        <option value="আছে">আছে</option>
                        <option value="নেই">নেই</option>
                      </Field>
                    </div>
                    {borderWall === "আছে" ? (
                      <div className="mb-4">
                        <label className="font-semibold" htmlFor="border_wall">
                          সীমানা প্রাচীরের অর্থায়ন ধরন*
                        </label>
                        <Field
                          className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                          as="select"
                          name="school.infrastructure.border_wall.funding_type"
                          id="funding_type"
                        >
                          <option
                            className="text-gray-300"
                            value={infrastructureBorderWall.funding_type}
                            selected
                          >
                            {infrastructureBorderWall.funding_type}
                          </option>
                          <option value="ডিপিই">ডিপিই</option>
                          <option value="উপজেলা">জেলা পরিষদ</option>
                          <option value="অন্যান্য">অন্যান্য</option>
                        </Field>
                      </div>
                    ) : (
                      ""
                    )}

                    {borderWall === "আছে" ? (
                      <MyDatePicker
                        defaultValue={infrastructureBorderWall.founded_date}
                        label="সীমানা প্রাচীর নির্মাণের সন"
                        name="school.infrastructure.border_wall.founded_date"
                      />
                    ) : (
                      ""
                    )}

                    <NumberField
                      defaultValue={toilets}
                      label="টয়লেট সংখ্যা"
                      placeholder="টয়লেট সংখ্যা দিন"
                      name="school.infrastructure.toilets"
                    />
                    <div className="mb-4">
                      <label className="font-semibold" htmlFor="wash_block">
                        ওয়াশ ব্লক*
                      </label>
                      <Field
                        onChange={handleWashBlockChange}
                        className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                        as="select"
                        name="school.infrastructure.wash_block"
                        id="wash_block"
                      >
                        <option
                          className="text-gray-300"
                          value={wash_block}
                          selected
                        >
                          {wash_block}
                        </option>
                        <option value="আছে">আছে</option>
                        <option value="নেই">নেই</option>
                      </Field>
                    </div>

                    {washBlock === "আছে" && (
                      <MyDatePicker
                        defaultValue={wash_block_founded_date}
                        label="ওয়াশ ব্লক নির্মাণের সন"
                        name="school.infrastructure.wash_block_founded_date"
                      />
                    )}
                  </div>

                  {/* others data */}
                  <div className="mt-8">
                    <button
                      type="button"
                      className={`relative border-gray-300 flex justify-between items-center w-full px-4 py-3 text-sm font-medium text-left rounded-lg border ${
                        schoolAccordionActive === "others_data"
                          ? " bg-slate-200"
                          : "  bg-slate-100"
                      }  ${
                        schoolAccordionActive === "nursery_four_plus"
                          ? "active"
                          : ""
                      }`}
                      onClick={() => schoolTogglePara("others_data")}
                    >
                      <h5 className="text-gray-900 text-[16px]">
                        অন্যান্য তথ্য
                      </h5>
                      <svg
                        className={`w-4 h-4 ml-2 duration-500 ${
                          schoolAccordionActive === "others_data"
                            ? "rotate-180"
                            : ""
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 9l-7 7-7-7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <AnimateHeight
                      duration={300}
                      height={
                        schoolAccordionActive === "others_data" ? "auto" : 0
                      }
                    >
                      <ul className="p-5">
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-6">
                          <div className="mb-4">
                            <label
                              className="font-semibold"
                              htmlFor={`shahid_minar`}
                            >
                              শহিদ মিনার*
                            </label>
                            <Field
                              className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                              as="select"
                              name={`school.infrastructure.others.shahid_minar`}
                              id={`shahid_minar`}
                            >
                              <option
                                className="text-gray-300"
                                value="একটি অপশন সিলেক্ট করুন"
                                selected
                              >
                                একটি অপশন সিলেক্ট করুন
                              </option>
                              <option value="আছে">আছে</option>
                              <option value="নেই">নেই</option>
                            </Field>
                          </div>

                          <div className="mb-4">
                            <label
                              className="font-semibold"
                              htmlFor={`liberation_war_corner`}
                            >
                              মুক্তিযুদ্ধ কর্নার*
                            </label>
                            <Field
                              className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                              as="select"
                              name={`school.infrastructure.others.freedom_fight_corner`}
                              id={`liberation_war_corner`}
                            >
                              <option
                                className="text-gray-300"
                                value="একটি অপশন সিলেক্ট করুন"
                                selected
                              >
                                একটি অপশন সিলেক্ট করুন
                              </option>
                              <option value="আছে">আছে</option>
                              <option value="নেই">নেই</option>
                            </Field>
                          </div>

                          <div className="mb-4">
                            <label
                              className="font-semibold"
                              htmlFor={`sheikh_rasel_corner`}
                            >
                              শেখ রাসেল কর্নার*
                            </label>
                            <Field
                              className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                              as="select"
                              name={`school.infrastructure.others.rasel_corner`}
                              id={`sheikh_rasel_corner`}
                            >
                              <option
                                className="text-gray-300"
                                value="একটি অপশন সিলেক্ট করুন"
                                selected
                              >
                                একটি অপশন সিলেক্ট করুন
                              </option>
                              <option value="আছে">আছে</option>
                              <option value="নেই">নেই</option>
                            </Field>
                          </div>

                          <div className="mb-4">
                            <label
                              className="font-semibold"
                              htmlFor={`roof_garden`}
                            >
                              বাগান/ছাদ বাগান*
                            </label>
                            <Field
                              className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                              as="select"
                              name={`school.infrastructure.others.garden`}
                              id={`roof_garden`}
                            >
                              <option
                                className="text-gray-300"
                                value="একটি অপশন সিলেক্ট করুন"
                                selected
                              >
                                একটি অপশন সিলেক্ট করুন
                              </option>
                              <option value="আছে">আছে</option>
                              <option value="নেই">নেই</option>
                            </Field>
                          </div>

                          <div>
                            <label
                              className="font-semibold"
                              htmlFor={`internet`}
                            >
                              ইন্টারনেট
                            </label>
                            <FormControl sx={{ width: 300 }}>
                              <InputLabel
                                className={`${
                                  internetLabel ? "block" : "hidden"
                                }`}
                                id="demo-multiple-checkbox-label"
                              >
                                ইন্টারনেট
                              </InputLabel>
                              <Select
                                className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={internetType}
                                onChange={handleChange}
                                // input={<OutlinedInput label="ইন্টারনেট" />}
                                renderValue={(selected) => selected.join(", ")}
                                // MenuProps={MenuProps}
                              >
                                {internetTypeOptions.map((option) => (
                                  <MenuItem key={option} value={option}>
                                    <Checkbox
                                      checked={
                                        internetType.indexOf(option) > -1
                                      }
                                    />
                                    <ListItemText primary={option} />
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </div>
                        </div>

                        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4 mt-4">
                          <div className="mb-4">
                            <label
                              className="font-semibold"
                              htmlFor="laptop_number"
                            >
                              ল্যাপটপ সংখ্যা
                            </label>
                            <input
                              placeholder="ল্যাপটপ সংখ্যা দিন"
                              name="school.infrastructure.others.laptop.total"
                              id="laptop_number"
                              onChange={handleLaptopChange}
                              defaultValue={fetchedLaptop?.total}
                              type="number"
                              className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                            />
                          </div>
                          {laptop >= 1 && (
                            <NumberField
                              defaultValue={fetchedLaptop?.actives}
                              placeholder={"সচল ল্যাপটপের সংখ্যা দিন"}
                              label={"সচল ল্যাপটপের সংখ্যা"}
                              name={
                                "school.infrastructure.others.laptop.actives"
                              }
                            />
                          )}
                        </div>

                        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4 mt-4">
                          <div className="mb-4">
                            <label
                              className="font-semibold"
                              htmlFor="multimedia_number"
                            >
                              মাল্টিমিডিয়া সংখ্যা*
                            </label>
                            <input
                              defaultValue={fetchedMultimedia?.total}
                              placeholder="মাল্টিমিডিয়া সংখ্যা দিন"
                              name="school.infrastructure.others.multimedia.total"
                              id="multimedia_number"
                              onChange={handleMultimediaChange}
                              type="number"
                              className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                            />
                          </div>
                          {multimedia >= 1 && (
                            <NumberField
                              defaultValue={fetchedMultimedia?.actives}
                              placeholder={"সচল মাল্টিমিডিয়ার সংখ্যা দিন"}
                              label={"সচল  সংখ্যা"}
                              name={
                                "school.infrastructure.others.multimedia.actives"
                              }
                            />
                          )}
                        </div>

                        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4 mt-4">
                          <div className="mb-4">
                            <label
                              className="font-semibold"
                              htmlFor="piano_number"
                            >
                              পিয়ানো সংখ্যা
                            </label>
                            <input
                              defaultValue={fetchedPiano?.total}
                              placeholder="পিয়ানো সংখ্যা দিন"
                              name="school.infrastructure.others.piano.total"
                              id="piano_number"
                              onChange={handlePianoChange}
                              type="number"
                              className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                            />
                          </div>
                          {piano >= 1 && (
                            <NumberField
                              defaultValue={fetchedPiano?.actives}
                              placeholder={"সচল পিয়ানো সংখ্যা দিন"}
                              label={"সচল পিয়ানো সংখ্যা"}
                              name={
                                "school.infrastructure.others.piano.actives"
                              }
                            />
                          )}
                        </div>

                        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-6">
                          <div className="my-4">
                            <label
                              className="font-semibold"
                              htmlFor={`electricity`}
                            >
                              বিদ্যুৎ সংযোগ
                            </label>
                            <Field
                              className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                              as="select"
                              name={`school.infrastructure.others.electricity_connection`}
                              id={`electricity`}
                            >
                              <option
                                className="text-gray-300"
                                value="একটি অপশন সিলেক্ট করুন"
                                selected
                              >
                                একটি অপশন সিলেক্ট করুন
                              </option>
                              <option value="আছে">আছে</option>
                              <option value="নেই">নেই</option>
                            </Field>
                          </div>
                        </div>
                      </ul>
                    </AnimateHeight>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className={`relative border-gray-300 flex justify-between items-center w-full px-4 py-3 text-sm font-medium text-left rounded-lg border ${
                        schoolAccordionActive === "water_system_data"
                          ? " bg-slate-200"
                          : "  bg-slate-100"
                      }  ${
                        schoolAccordionActive === "water_system_data"
                          ? "active"
                          : ""
                      }`}
                      onClick={() => schoolTogglePara("water_system_data")}
                    >
                      <h5 className="text-gray-900 text-[16px]">
                        পানিয় জল সংক্রান্ত তথ্য
                      </h5>
                      <svg
                        className={`w-4 h-4 ml-2 duration-500 ${
                          schoolAccordionActive === "water_system_data"
                            ? "rotate-180"
                            : ""
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 9l-7 7-7-7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <AnimateHeight
                      duration={300}
                      height={
                        schoolAccordionActive === "water_system_data"
                          ? "auto"
                          : 0
                      }
                    >
                      <ul className="p-5">
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4 mt-4">
                          <div className="mb-4">
                            <label
                              className="font-semibold"
                              htmlFor="tubewell_number"
                            >
                              টিউবওয়েল সংখ্যা
                            </label>
                            <input
                              defaultValue={tube_wells}
                              placeholder="টিউবওয়েল সংখ্যা দিন"
                              name="school.infrastructure.others.water.tube_wells"
                              id="tubewell_number"
                              onChange={handleTubeWellChange}
                              type="number"
                              className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                            />
                          </div>
                        </div>

                        {tubeWell >= 1 && (
                          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-6">
                            <div className="mb-4">
                              <label
                                className="font-semibold"
                                htmlFor={`tubewell_condition`}
                              >
                                টিউবওয়েল এর বর্তমান অবস্থা
                              </label>
                              <Field
                                className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                                as="select"
                                name={`school.infrastructure.water.tube_wells_condition`}
                                id={`tubewell_condition`}
                              >
                                <option
                                  className="text-gray-300"
                                  value="একটি অপশন সিলেক্ট করুন"
                                  selected
                                >
                                  একটি অপশন সিলেক্ট করুন
                                </option>
                                <option value="ভালো">ভালো</option>
                                <option value="মেরামতযোগ্য">মেরামতযোগ্য</option>
                              </Field>
                            </div>
                          </div>
                        )}

                        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4 mt-4">
                          <div className="mb-4">
                            <label
                              className="font-semibold"
                              htmlFor="deep_tubewell_number"
                            >
                              ডিপ টিউবওয়েল সংখ্যা
                            </label>
                            <input
                              defaultValue={deep_tube_wells}
                              placeholder="ডিপ টিউবওয়েল সংখ্যা দিন"
                              name="school.infrastructure.water.deep_tube_wells"
                              id="deep_tubewell_number"
                              onChange={handleDeepTubeWellChange}
                              type="number"
                              className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                            />
                          </div>
                        </div>

                        {deepTubeWell >= 1 && (
                          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-6">
                            <div className="mb-4">
                              <label
                                className="font-semibold"
                                htmlFor={`deep_tubewell_condition`}
                              >
                                ডিপ টিউবওয়েল এর বর্তমান অবস্থা*
                              </label>
                              <Field
                                className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                                as="select"
                                name={`school.infrastructure.water.deep_tube_wells_condition`}
                                id={`deep_tubewell_condition`}
                              >
                                <option
                                  className="text-gray-300"
                                  value="একটি অপশন সিলেক্ট করুন"
                                  selected
                                >
                                  একটি অপশন সিলেক্ট করুন
                                </option>
                                <option value="ভালো">ভালো</option>
                                <option value="মেরামতযোগ্য">মেরামতযোগ্য</option>
                              </Field>
                            </div>
                          </div>
                        )}
                      </ul>
                    </AnimateHeight>
                  </div>
                </div>
              </DataDropdown>
              <DataDropdown
                title="ভূমি বিষয়ক তথ্য"
                itemKey={"land"}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              >
                {/* land related data */}
                <div className="pt-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4">
                  <NumberField
                    defaultValue={total_amount}
                    name="school.land.total_amount"
                    label="ভূমির পরিমান(শতাংশ)"
                    placeholder="ভূমির পরিমান দিন"
                  />
                  <NumberField
                    defaultValue={take_overed}
                    name="school.land.take_overed"
                    label="দখলকৃত ভূমির পরিমান(শতাংশ)"
                    placeholder="দখলকৃত ভূমির পরিমান দিন"
                  />
                  <NumberField
                    defaultValue={dispossessed}
                    name="school.land.dispossessed"
                    label="বেদখলকৃত ভূমির পরিমান(শতাংশ)"
                    placeholder="বেদখলকৃত ভূমির পরিমান দিন"
                  />

                  <div className="mb-4">
                    <label className="font-semibold" htmlFor={"is_registered"}>
                      রেজিস্টার করা আছে কিনা*
                    </label>
                    <Field
                      onChange={handleRegistrationChange}
                      className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                      as="select"
                      value={registration}
                      name={"school.land.is_registered"}
                      id={"is_registered"}
                    >
                      <option
                        className="text-gray-300"
                        value="একটি অপশন সিলেক্ট করুন"
                        selected
                      >
                        একটি অপশন সিলেক্ট করুন
                      </option>
                      <option value="হ্যাঁ">হ্যাঁ</option>
                      <option value="না">না</option>
                    </Field>
                  </div>

                  {registration === "হ্যাঁ" && (
                    <div className="mb-4">
                      <label
                        className="font-semibold"
                        htmlFor={"registration_ownership"}
                      >
                        রেজিস্ট্রেশন এর মালিকানা*
                      </label>
                      <Field
                        className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                        as="select"
                        name={"school.land.registration_ownership"}
                        id={"registration_ownership"}
                      >
                        <option
                          className="text-gray-300"
                          value="একটি অপশন সিলেক্ট করুন"
                          selected
                        >
                          একটি অপশন সিলেক্ট করুন
                        </option>
                        <option value="ডিপিই">ডিপিই</option>
                        <option value="অন্যান্য">অন্যান্য</option>
                      </Field>
                    </div>
                  )}
                  <TextField
                    defaultValue={khatian_number}
                    name="school.land.khatian_number"
                    label="খতিয়ান নং"
                    placeholder="খতিয়ান নং দিন"
                  />
                  <TextField
                    defaultValue={dag_number}
                    name="school.land.dag_number"
                    label="দাগ নং"
                    placeholder="দাগ নং দিন"
                  />
                  <TextField
                    defaultValue={dolil_number}
                    name="school.land.dolil_number"
                    label="দলিল নং"
                    placeholder="দলিল নং দিন"
                  />
                  <MyDatePicker
                    defaultValue={dolil_year}
                    label="দলিল সন"
                    name="school.land.dolil_year"
                  />
                  <div className="mb-4">
                    <label className="font-semibold" htmlFor={"is_namjaried"}>
                      নামজারি আছে কিনা*
                    </label>
                    <Field
                      onChange={handleNamjariChange}
                      className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                      as="select"
                      value={namjari}
                      name={"school.land.is_namjaried"}
                      id={"is_namjaried"}
                    >
                      <option
                        className="text-gray-300"
                        value="একটি অপশন সিলেক্ট করুন"
                        selected
                      >
                        একটি অপশন সিলেক্ট করুন
                      </option>
                      <option value="হ্যাঁ">হ্যাঁ</option>
                      <option value="না">না</option>
                    </Field>
                  </div>
                  {namjari === "হ্যাঁ" && (
                    <div className="mb-4">
                      <label
                        className="font-semibold"
                        htmlFor={"namjari_ownership"}
                      >
                        নামজারি এর মালিকানা*
                      </label>
                      <Field
                        className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                        as="select"
                        name={"school.land.namjari_ownership"}
                        id={"namjari_ownership"}
                      >
                        <option
                          className="text-gray-300"
                          value="একটি অপশন সিলেক্ট করুন"
                          selected
                        >
                          একটি অপশন সিলেক্ট করুন
                        </option>
                        <option value="ডিপিই">ডিপিই</option>
                        <option value="অন্যান্য">অন্যান্য</option>
                      </Field>
                    </div>
                  )}
                  <div className="mb-4">
                    <label className="font-semibold" htmlFor={"is_cased"}>
                      মামলা আছে কিনা*
                    </label>
                    <Field
                      className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                      as="select"
                      name={"school.land.is_cased"}
                      id={"is_cased"}
                    >
                      <option
                        className="text-gray-300"
                        value="একটি অপশন সিলেক্ট করুন"
                        selected
                      >
                        একটি অপশন সিলেক্ট করুন
                      </option>
                      <option value="হ্যাঁ">হ্যাঁ</option>
                      <option value="না">না</option>
                    </Field>
                  </div>
                  <div className="mb-4">
                    <label
                      className="font-semibold"
                      htmlFor={"land_development_tax_paid"}
                    >
                      ভূমি উন্নয়ন কর*
                    </label>
                    <Field
                      className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                      as="select"
                      name={"school.land.taxt_condition"}
                      id={"land_development_tax_paid"}
                    >
                      <option
                        className="text-gray-300"
                        value="একটি অপশন সিলেক্ট করুন"
                        selected
                      >
                        একটি অপশন সিলেক্ট করুন
                      </option>
                      <option value="পরিশোধিত">পরিশোধিত</option>
                      <option value="অপরিশোধিত">অপরিশোধিত</option>
                    </Field>
                  </div>
                </div>
              </DataDropdown>
              <DataDropdown
                title="উপবৃত্তি সংক্রান্ত তথ্য"
                itemKey={"stipend"}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              >
                {/* stipend related data */}
                <div className="pt-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4">
                  <SearchableSelect
                    className="h-[44px]"
                    options={stipendYearOptions}
                    label={"অর্থ বছর"}
                    placeholder={"একটি অর্থ বছর সিলেক্ট করুন"}
                    onChange={stipendYearSelectChange}
                    value={stipendYearSelectedOption}
                  />
                  <div className="mb-4">
                    <label className="font-semibold" htmlFor={"latest_season"}>
                      সর্বশেষ প্রান্তিক
                    </label>
                    <Field
                      className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                      as="select"
                      name={"school.stipend.latest_season"}
                      id={"latest_season"}
                    >
                      <option
                        className="text-gray-300"
                        value="একটি অপশন সিলেক্ট করুন"
                        selected
                      >
                        একটি অপশন সিলেক্ট করুন
                      </option>
                      <option value="প্রথম প্রান্তিক(জানুয়ারি-জুন)">
                        প্রথম প্রান্তিক(জানুয়ারি-জুন)
                      </option>
                      <option value="দ্বিতীয় প্রান্তিক(জুলাই-ডিসেম্বর)">
                        দ্বিতীয় প্রান্তিক(জুলাই-ডিসেম্বর)
                      </option>
                    </Field>
                  </div>
                  <NumberField
                    defaultValue={total_consumer}
                    name="school.stipend.total_consumer"
                    label="সর্বশেষ প্রান্তিকে মোট সুবিধাভোগী"
                    placeholder="সর্বশেষ প্রান্তিকে মোট সুবিধাভোগীর সংখ্যা দিন"
                  />
                  <NumberField
                    defaultValue={demand}
                    name="school.stipend.demand"
                    label="উপবৃত্তির চাহিদা(টাকা)"
                    placeholder="উপবৃত্তির চাহিদা দিন"
                  />
                  <NumberField
                    defaultValue={distributed}
                    name="school.stipend.distributed"
                    label="বিতরণকৃত অর্থের পরিমান "
                    placeholder="বিতরণকৃত অর্থের পরিমান দিন"
                  />
                </div>
              </DataDropdown>
              <DataDropdown
                title="সভা সংক্রান্ত তথ্য"
                itemKey={"conference"}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              >
                {/* conference related data */}
                <div className="pt-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4">
                  <NumberField
                    defaultValue={smc}
                    name="school.conference.smc"
                    label="এসএমসি"
                    placeholder="এসএমসি সভার সংখ্যা দিন"
                  />
                  <NumberField
                    defaultValue={pta}
                    name="school.conference.pta"
                    label="পিটিএ"
                    placeholder="পিটিএ সভার সংখ্যা দিন"
                  />
                  <NumberField
                    defaultValue={mother}
                    name="school.conference.mother"
                    label="মা-সমাবেশ"
                    placeholder="মা-সমাবেশ এর সংখ্যা দিন"
                  />
                  <NumberField
                    defaultValue={guardian}
                    name="school.conference.guardian"
                    label="অভিভাবক-সমাবেশ"
                    placeholder="অভিভাবক-সমাবেশ এর সংখ্যা দিন"
                  />
                  <NumberField
                    defaultValue={yard}
                    name="school.conference.yard"
                    label="উঠান বৈঠক"
                    placeholder="উঠান বৈঠক এর সংখ্যা দিন"
                  />
                  <NumberField
                    defaultValue={staff_meeting}
                    name="school.conference.staff_meeting"
                    label="স্টাফ মিটিং"
                    placeholder="স্টাফ মিটিং এর সংখ্যা দিন"
                  />
                </div>
              </DataDropdown>
              <DataDropdown
                title="উন্নয়ন কার্যক্রম সংক্রান্ত তথ্য"
                itemKey={"budget"}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              >
                {/* budget related data */}
                <FieldArray name="budgets">
                  {(arrayHelpers) => (
                    <div>
                      {values?.budgets?.map((budget, index) => (
                        <div key={index}>
                          <div className="pt-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4">
                            <div className="mb-4">
                              <label
                                className="font-semibold"
                                htmlFor={`budgets.${index}.name`}
                              >
                                বরাদ্দের ধরন
                              </label>
                              <Field
                                className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                                as="select"
                                name={`budgets.${index}.name`}
                                id={`budgets.${index}.name`}
                              >
                                <option
                                  className="text-gray-300"
                                  value="একটি অপশন সিলেক্ট করুন"
                                  selected
                                >
                                  একটি অপশন সিলেক্ট করুন
                                </option>
                                <option value="স্লিপ">স্লিপ</option>
                                <option value="রুটিন মেরামত">
                                  রুটিন মেরামত
                                </option>
                                <option value="মেজর মেরামত">
                                  বড় ধরণের/মেজর মেরামত
                                </option>
                                <option value="মাইনর মেরামত">
                                  ক্ষুদ্র/মাইনর মেরামত
                                </option>
                                <option value="প্রাক-প্রাথমিক">
                                  প্রাক-প্রাথমিক
                                </option>
                                <option value="ওয়াশব্লক">ওয়াশব্লক</option>
                                <option value="প্লেয়িং এক্সেসরিস">
                                  প্লেয়িং এক্সেসরিস
                                </option>
                              </Field>
                            </div>
                            <div className="mb-4">
                              <label
                                className="font-semibold"
                                htmlFor={`budgets.${index}.year`}
                              >
                                অর্থ বছর
                              </label>
                              <Field
                                className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                                as="select"
                                name={`budgets.${index}.year`}
                                id={`budgets.${index}.year`}
                              >
                                <option
                                  className="text-gray-300"
                                  value="একটি অপশন সিলেক্ট করুন"
                                  selected
                                >
                                  একটি অপশন সিলেক্ট করুন
                                </option>
                                {budgetYearOptions.map((year) => (
                                  <option key={year} value={year}>
                                    {year}
                                  </option>
                                ))}
                              </Field>
                            </div>
                            <NumberField
                              name={`budgets.${index}.amount`}
                              label="বরাদ্দকৃত অর্থ"
                              placeholder="বরাদ্দকৃত অর্থের পরিমান লিখুন"
                            />
                          </div>
                          <button
                            className={`text-[#ED1C24] font-semibold`}
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            ডিলিট করুন
                          </button>
                        </div>
                      ))}
                      <button
                        className="mt-3 text-[#008B4C] underline font-semibold"
                        type="button"
                        onClick={() =>
                          arrayHelpers.push({ name: "", year: "", amount: "" })
                        }
                      >
                        আরও যোগ করুন
                      </button>
                    </div>
                  )}
                </FieldArray>
              </DataDropdown>
            </div>
            {/* teacher related data */}
            <div className="border bg-white shadow-sm rounded-[4px] md:p-8 p-3 mt-7">
              <h2 className="md:text-xl text-lg font-semibold md:mb-8">
                শিক্ষক সংক্রান্ত তথ্য
              </h2>
              <DataDropdown
                title="সাধারণ তথ্য"
                itemKey={"teacher_general"}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              >
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-6 pt-4">
                  <NumberField
                    defaultValue={permitted_post}
                    name="teacher.general.permitted_post"
                    label="অনুমোদিত পদ"
                    placeholder={"অনুমোদিত পদের সংখ্যা দিন"}
                  />
                  <NumberField
                    defaultValue={working_post}
                    name="teacher.general.working_post"
                    label="কর্মরত পদ"
                    placeholder={"কর্মরত পদের সংখ্যা দিন"}
                  />
                  <NumberField
                    defaultValue={vacancy}
                    name="teacher.general.vacancy"
                    label="শূন্য পদ"
                    placeholder={"শূন্য পদের সংখ্যা দিন"}
                  />
                  <NumberField
                    defaultValue={teacher_number}
                    name="teacher.general.teacher_number"
                    label="কর্মরত শিক্ষক(পুরুষ)"
                    placeholder={"শিক্ষক সংখ্যা দিন"}
                  />
                  <NumberField
                    defaultValue={women_teacher_number}
                    name="teacher.general.women_teacher_number"
                    label="কর্মরত শিক্ষক(মহিলা)"
                    placeholder={"শিক্ষকা সংখ্যা দিন"}
                  />
                  <NumberField
                    defaultValue={vacation_consumers}
                    name="teacher.general.vacation_consumers"
                    label="ছুটি ভোগরত শিক্ষক"
                    placeholder={"ছুটি ভোগরত শিক্ষক সংখ্যা দিন"}
                  />
                </div>
              </DataDropdown>
              <DataDropdown
                title="বেতন সংক্রান্ত তথ্য"
                itemKey={"sallary"}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              >
                <div>
                  <FieldArray name="salary">
                    {(arrayHelpers1) => (
                      <div>
                        {values.salary.map((teacher, index) => (
                          <div key={index}>
                            <h3 className="mt-8 text-lg text-[#008B4C] font-semibold">
                              শিক্ষক {index + 1}
                            </h3>
                            <div className="pt-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4">
                              <TextField
                                name={`salary.${index}.name`}
                                label="শিক্ষকের নাম"
                                placeholder="শিক্ষকের নাম লিখুন"
                              />
                              <div className="mb-4">
                                <label
                                  className="font-semibold"
                                  htmlFor={`salary.${index}.designation`}
                                >
                                  শিক্ষকের পদবি
                                </label>
                                <Field
                                  className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                                  as="select"
                                  name={`salary.${index}.designation`}
                                  id={`salary.${index}.designation`}
                                >
                                  <option
                                    className="text-gray-300"
                                    value="একটি অপশন সিলেক্ট করুন"
                                    selected
                                  >
                                    একটি অপশন সিলেক্ট করুন
                                  </option>
                                  <option value="প্রধান শিক্ষক">
                                    প্রধান শিক্ষক
                                  </option>
                                  <option value="প্রধান শিক্ষক(চলতি দায়িত্ব)">
                                    প্রধান শিক্ষক(চলতি দায়িত্ব)
                                  </option>
                                  <option value="প্রধান শিক্ষক(ভারপ্রাপ্ত)">
                                    প্রধান শিক্ষক(ভারপ্রাপ্ত)
                                  </option>
                                  <option value="সহকারি শিক্ষক">
                                    সহকারি শিক্ষক
                                  </option>
                                </Field>
                              </div>
                              <TextField
                                name={`salary.${index}.educational_qualification`}
                                label="সর্বশেষ শিক্ষাগত যোগ্যতা"
                                placeholder="সর্বশেষ শিক্ষাগত যোগ্যতা লিখুন"
                              />
                              <div className="mb-4">
                                <label
                                  className="font-semibold"
                                  htmlFor={`salary.${index}.divisional_training`}
                                >
                                  বিভাগীয় প্রশিক্ষণ
                                </label>
                                <Field
                                  className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                                  as="select"
                                  name={`salary.${index}.divisional_training`}
                                  id={`salary.${index}.divisional_training`}
                                >
                                  <option
                                    className="text-gray-300"
                                    value="একটি অপশন সিলেক্ট করুন"
                                    selected
                                  >
                                    একটি অপশন সিলেক্ট করুন
                                  </option>
                                  <option value="ডিপিএড">ডিপিএড</option>
                                  <option value="সিইএনএড">সিইএনএড</option>
                                  <option value="বিটিপিটি">বিটিপিটি</option>
                                </Field>
                              </div>
                              <MyDatePicker
                                name={`salary.${index}.date_of_birth`}
                                label={"জন্ম তারিখ"}
                              />
                              <MyDatePicker
                                name={`salary.${index}.first_joining_date`}
                                label={"প্রথম যোগদানের তারিখ"}
                              />
                              <MyDatePicker
                                name={`salary.${index}.mentioned_post_joining_date`}
                                label={"উক্ত পদে যোগদানের তারিখ"}
                              />
                              <MyDatePicker
                                name={`salary.${index}.this_school_joining_date`}
                                label={"এই বিদ্যালয়ে যোগদানের তারিখ"}
                              />

                              <NumberField
                                name={`salary.${index}.sallary_scale`}
                                label="বেতন স্কেল"
                                placeholder="বেতন স্কেল দিন"
                              />
                              <NumberField
                                name={`salary.${index}.main_sallary`}
                                label="মূল বেতন"
                                placeholder="মূল বেতন দিন"
                              />
                              <NumberField
                                name={`salary.${index}.educational_allowance`}
                                label="শিক্ষা ভাতা"
                                placeholder="শিক্ষা ভাতার পরিমান দিন"
                              />
                              {/* <NumberField name={`salary.${index}.educational_allowance`} label="শিক্ষা ভাতা" placeholder="শিক্ষা ভাতার পরিমান দিন" /> */}
                              <TextField
                                name={`salary.${index}.bank_account_no`}
                                label="ব্যাংক হিসাব নং"
                                placeholder="ব্যাংক হিসাব নং দিন"
                              />
                              <NumberField
                                name={`salary.${index}.gpf`}
                                label="জিপিএফ নং"
                                placeholder="জিপিএফ নং দিন"
                              />
                              <NumberField
                                name={`salary.${index}.mobile_number`}
                                label="সক্রিয় মোবাইল নং"
                                placeholder="সক্রিয় মোবাইল নং দিন"
                              />
                              <NumberField
                                name={`salary.${index}.current_year_occasional_vacation`}
                                label="চলতি বছরে মোট নৈমিত্তিক ছুটি"
                                placeholder="চলতি বছরে মোট নৈমিত্তিক ছুটি সংখ্যা দিন"
                              />
                              <ImageInput2
                                label={"সাক্ষর"}
                                name={`salary.${index}.signature`}
                              />
                              <div className="flex items-center">
                                {teacher?.signature && (
                                  <Image
                                    src={teacher.signature}
                                    alt="signature"
                                    width={150}
                                    height={100}
                                  />
                                )}
                              </div>
                            </div>
                            <button
                              className={`text-[#ED1C24] font-semibold`}
                              type="button"
                              onClick={() => arrayHelpers1.remove(index)}
                            >
                              ডিলিট করুন
                            </button>
                          </div>
                        ))}
                        <button
                          className="mt-3 text-[#008B4C] underline font-semibold"
                          type="button"
                          onClick={() =>
                            arrayHelpers1.push({
                              name: "",
                              designation: "",
                              educational_qualification: "",
                              divisional_training: "",
                              date_of_birth: "",
                              first_joining_date: "",
                              mentioned_post_joining_date: "",
                              this_school_joining_date: "",
                              educational_allowance: "",
                              signature: "",
                              current_year_occasional_vacation: "",
                              mobile_number: "",
                              gpf: "",
                              bank_account_no: "",
                              main_sallary: "",
                              sallary_scale: "",
                            })
                          }
                        >
                          আরও যোগ করুন
                        </button>
                      </div>
                    )}
                  </FieldArray>
                </div>
              </DataDropdown>
              <DataDropdown
                title="ছুটি সংক্রান্ত তথ্য"
                itemKey={"vacation"}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              >
                <FieldArray name="vacations">
                  {(arrayHelpers) => (
                    <div>
                      {values.vacations.map((vacation, index) => (
                        <div key={index}>
                          <div className="pt-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4">
                            <TextField
                              name={`vacations.${index}.teacher_name`}
                              label="শিক্ষকের নাম"
                              placeholder="শিক্ষকের নাম লিখুন"
                            />
                            <div className="mb-4">
                              <label
                                className="font-semibold"
                                htmlFor={`vacations.${index}.type`}
                              >
                                ছুটির ধরন
                              </label>
                              <Field
                                className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                                as="select"
                                name={`vacations.${index}.type`}
                                id={`vacations.${index}.type`}
                              >
                                <option
                                  className="text-gray-300"
                                  value="একটি অপশন সিলেক্ট করুন"
                                  selected
                                >
                                  একটি অপশন সিলেক্ট করুন
                                </option>
                                <option value="চিকিৎসা">চিকিৎসা</option>
                                <option value="বহিঃবাংলাদেশ">
                                  বহিঃবাংলাদেশ
                                </option>
                                <option value="মাতৃত্ত্ব">মাতৃত্ব</option>
                              </Field>
                            </div>

                            <MyDatePicker
                              name={`vacations.${index}.start_date`}
                              label="ছুটি শুরু"
                            />
                            <MyDatePicker
                              name={`vacations.${index}.end_date`}
                              label="ছুটি শেষ"
                            />
                          </div>
                          <button
                            className={`text-[#ED1C24] font-semibold`}
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            ডিলিট করুন
                          </button>
                        </div>
                      ))}
                      <button
                        className="mt-3 text-[#008B4C] underline font-semibold"
                        type="button"
                        onClick={() =>
                          arrayHelpers.push({
                            teacher_name: "",
                            type: "",
                            start_date: "",
                            end_date: "",
                          })
                        }
                      >
                        আরও যোগ করুন
                      </button>
                    </div>
                  )}
                </FieldArray>
              </DataDropdown>
              <DataDropdown
                title="অননুমোদিত অনুপস্থিত শিক্ষক তথ্য"
                itemKey={"absent_teacher"}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              >
                <div className="mt-4">
                  <FieldArray name="unauthorized_teacher">
                    {(arrayHelpers) => (
                      <>
                        {values?.unauthorized_teacher?.map((teacher, index) => (
                          <div
                            className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4 mb-4"
                            key={index}
                          >
                            <TextField
                              defaultValue={
                                (unauthorized_teacher?.length &&
                                  unauthorized_teacher[0]?.name) ||
                                ""
                              }
                              label={"শিক্ষকের নাম"}
                              placeholder={"শিক্ষকের নাম দিন"}
                              name={`unauthorized_teacher.${index}.name`}
                            />
                            <div className="mb-4">
                              <label
                                className="font-semibold"
                                htmlFor={`unauthorized_teacher.${index}.designation`}
                              >
                                শিক্ষকের পদবি
                              </label>
                              <Field
                                className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                                as="select"
                                name={`unauthorized_teacher.${index}.designation`}
                                id={`unauthorized_teacher.${index}.designation`}
                              >
                                <option
                                  className="text-gray-300"
                                  value="একটি অপশন সিলেক্ট করুন"
                                  selected
                                >
                                  একটি অপশন সিলেক্ট করুন
                                </option>
                                <option value="প্রধান শিক্ষক(চলতি দায়িত্ব)">
                                  প্রধান শিক্ষক(চলতি দায়িত্ব)
                                </option>
                                <option value="প্রধান শিক্ষক(ভারপ্রাপ্ত)">
                                  প্রধান শিক্ষক(ভারপ্রাপ্ত)
                                </option>
                                <option value="সহকারি শিক্ষক">
                                  সহকারি শিক্ষক
                                </option>
                              </Field>
                            </div>
                            <MyDatePicker
                              label={"সর্বশেষ উপস্থিতির তারিখ"}
                              name={`unauthorized_teacher.${index}.last_present_date`}
                            />
                            <button
                              className={`text-[#ED1C24] font-semibold text-left`}
                              type="button"
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              ডিলিট করুন
                            </button>
                          </div>
                        ))}
                        <button
                          className="mt-3 text-[#008B4C] underline font-semibold"
                          type="button"
                          onClick={() =>
                            arrayHelpers.push({
                              name: "",
                              designation: "",
                              last_present_date: "",
                            })
                          }
                        >
                          আরও যোগ করুন
                        </button>
                      </>
                    )}
                  </FieldArray>
                </div>
              </DataDropdown>
              <DataDropdown
                title="হাজিরা সংক্রান্ত তথ্য"
                itemKey={"hajira"}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              >
                <div className="pt-4 grid md:grid-cols-2 grid-cols-1 w-full gap-x-4">
                  <MyDatePicker
                    name={"hajira_from"}
                    label={"হাজিরা শুরুর তারিখ"}
                  />
                  <MyDatePicker
                    name={"hajira_to"}
                    label={"হাজিরা শেষের তারিখ"}
                  />
                </div>
                {values?.teacher?.attendance?.map((teacher, teacherIndex) => (
                  <div key={teacherIndex}>
                    <div className="mt-4">
                      <button
                        type="button"
                        className={`relative border-gray-300 flex justify-between items-center w-full px-4 py-3 text-sm font-medium text-left rounded-lg border ${
                          schoolAccordionActive === `teacher_${teacherIndex}`
                            ? " bg-slate-200"
                            : "  bg-slate-100"
                        } ${
                          schoolAccordionActive === `teacher_${teacherIndex}`
                            ? "active"
                            : ""
                        }`}
                        onClick={() =>
                          schoolTogglePara(`teacher_${teacherIndex}`)
                        }
                      >
                        <h5 className="text-gray-900 text-[16px]">
                          {teacherIndex === 0
                            ? "প্রধান শিক্ষক"
                            : `সহকারী শিক্ষক ${convertToBengaliNumber(
                                teacherIndex
                              )}`}
                        </h5>
                        <svg
                          className={`w-4 h-4 ml-2 duration-500 ${
                            schoolAccordionActive === `teacher_${teacherIndex}`
                              ? "rotate-180"
                              : ""
                          }`}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19 9l-7 7-7-7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>

                      <AnimateHeight
                        duration={300}
                        height={
                          schoolAccordionActive === `teacher_${teacherIndex}`
                            ? "auto"
                            : 0
                        }
                      >
                        <ul className="p-5">
                          {/* here shoudl have a field for taking every teacher name */}
                          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 w-full gap-x-6 pt-4">
                            <TextField
                              label={"শিক্ষকের নাম"}
                              placeholder={"শিক্ষকের নাম লিখুন"}
                              name={`teacher.attendance.${teacherIndex}.name`}
                            />
                            <ImageInput2
                              label={"সাক্ষর দিন"}
                              name={`teacher.attendance.${teacherIndex}.signature`}
                            />
                            <div className="flex items-center">
                              {teacher?.signature && (
                                <Image
                                  src={teacher.signature}
                                  alt="signature"
                                  width={150}
                                  height={100}
                                />
                              )}
                            </div>
                          </div>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Box key={teacherIndex} sx={{ mb: 4 }}>
                              <FieldArray
                                name={`teacher.attendance.${teacherIndex}.days`}
                              >
                                {() => (
                                  <>
                                    {teacher.days.map((day, dayIndex) => (
                                      <Box
                                        key={dayIndex}
                                        sx={{
                                          display: "flex",
                                          gap: 2,
                                          mb: 2,
                                        }}
                                      >
                                        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 w-full gap-x-6 pt-4">
                                          <div>
                                            <label
                                              className="font-semibold"
                                              htmlFor={`teacher.attendance.${teacherIndex}.days.${dayIndex}.status`}
                                            >
                                              {dayIndex < 21
                                                ? `পূর্ববর্তী মাসের দিন-${convertToBengaliNumber(
                                                    dayIndex + 11
                                                  )}`
                                                : `চলতি মাসের দিন-${convertToBengaliNumber(
                                                    dayIndex - 20
                                                  )}`}
                                            </label>
                                            <Field
                                              as="select"
                                              name={`teacher.attendance.${teacherIndex}.days.${dayIndex}.status`}
                                              className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                                            >
                                              <option value="option">
                                                একটি অপশন সিলেক্ট করুন
                                              </option>
                                              <option value="present">
                                                উপস্থিত
                                              </option>
                                              <option value="absent">
                                                অনুপস্থিত
                                              </option>
                                              <option value="সরকারী ছুটি">
                                                সরকারী ছুটি
                                              </option>
                                              <option value="সংরক্ষিত ছুটি">
                                                সংরক্ষিত ছুটি
                                              </option>
                                              <option value="সাপ্তাহিক ছুটি">
                                                সাপ্তাহিক ছুটি
                                              </option>
                                            </Field>
                                          </div>

                                          {values.teacher.attendance[
                                            teacherIndex
                                          ].days[dayIndex].status ===
                                            "present" && (
                                            <>
                                              <div>
                                                <label
                                                  className="font-semibold"
                                                  htmlFor={`teacher.attendance.${teacherIndex}.days.${dayIndex}.coming_time`}
                                                >
                                                  আগমন
                                                </label>
                                                <Field
                                                  name={`teacher.attendance.${teacherIndex}.days.${dayIndex}.coming_time`}
                                                >
                                                  {({ field }) => (
                                                    <TimePicker
                                                      value={
                                                        field.value
                                                          ? dayjs(
                                                              field.value,
                                                              "HH:mm A"
                                                            )
                                                          : null
                                                      }
                                                      onChange={(newValue) =>
                                                        setFieldValue(
                                                          field.name,
                                                          dayjs(
                                                            newValue
                                                          ).format("hh:mm A")
                                                        )
                                                      }
                                                      renderInput={(params) => (
                                                        <TextField
                                                          {...params}
                                                          id={`teacher.attendance.${teacherIndex}.days.${dayIndex}.coming_time`}
                                                          error={
                                                            touched.teacher
                                                              ?.attendance?.[
                                                              teacherIndex
                                                            ]?.days?.[dayIndex]
                                                              ?.coming_time &&
                                                            !!errors.teacher
                                                              ?.attendance?.[
                                                              teacherIndex
                                                            ]?.days?.[dayIndex]
                                                              ?.coming_time
                                                          }
                                                          helperText={
                                                            touched.teacher
                                                              ?.attendance?.[
                                                              teacherIndex
                                                            ]?.days?.[dayIndex]
                                                              ?.coming_time &&
                                                            errors.teacher
                                                              ?.attendance?.[
                                                              teacherIndex
                                                            ]?.days?.[dayIndex]
                                                              ?.coming_time
                                                          }
                                                        />
                                                      )}
                                                    />
                                                  )}
                                                </Field>
                                              </div>

                                              <div>
                                                <label
                                                  className="font-semibold"
                                                  htmlFor={`teacher.attendance.${teacherIndex}.days.${dayIndex}.leaving_time`}
                                                >
                                                  প্রস্থান
                                                </label>
                                                <Field
                                                  name={`teacher.attendance.${teacherIndex}.days.${dayIndex}.leaving_time`}
                                                >
                                                  {({ field }) => (
                                                    <TimePicker
                                                      value={
                                                        field.value
                                                          ? dayjs(
                                                              field.value,
                                                              "HH:mm A"
                                                            )
                                                          : null
                                                      }
                                                      onChange={(newValue) =>
                                                        setFieldValue(
                                                          field.name,
                                                          dayjs(
                                                            newValue
                                                          ).format("hh:mm A")
                                                        )
                                                      }
                                                      renderInput={(params) => (
                                                        <TextField
                                                          {...params}
                                                          id={`teacher.attendance.${teacherIndex}.days.${dayIndex}.leaving_time`}
                                                          error={
                                                            touched.teacher
                                                              ?.attendance?.[
                                                              teacherIndex
                                                            ]?.days?.[dayIndex]
                                                              ?.leaving_time &&
                                                            !!errors.teacher
                                                              ?.attendance?.[
                                                              teacherIndex
                                                            ]?.days?.[dayIndex]
                                                              ?.leaving_time
                                                          }
                                                          helperText={
                                                            touched.teacher
                                                              ?.attendance?.[
                                                              teacherIndex
                                                            ]?.days?.[dayIndex]
                                                              ?.leaving_time &&
                                                            errors.teacher
                                                              ?.attendance?.[
                                                              teacherIndex
                                                            ]?.days?.[dayIndex]
                                                              ?.leaving_time
                                                          }
                                                        />
                                                      )}
                                                    />
                                                  )}
                                                </Field>
                                              </div>
                                            </>
                                          )}

                                          {values.teacher.attendance[
                                            teacherIndex
                                          ].days[dayIndex].status ===
                                            "absent" && (
                                            <div>
                                              <label
                                                className="font-semibold"
                                                htmlFor={`teacher.attendance.${teacherIndex}.days.${dayIndex}.absence_reason`}
                                              >
                                                অনুপস্থিতির কারণ
                                              </label>
                                              <Field
                                                as="select"
                                                name={`teacher.attendance.${teacherIndex}.days.${dayIndex}.absence_reason`}
                                                className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                                              >
                                                <option
                                                  className="text-gray-300"
                                                  value="একটি অপশন সিলেক্ট করুন"
                                                  selected
                                                >
                                                  একটি অপশন সিলেক্ট করুন
                                                </option>
                                                <option value="চিকিৎসা">
                                                  চিকিৎসা
                                                </option>
                                                <option value="বহিঃবাংলাদেশ">
                                                  বহিঃবাংলাদেশ
                                                </option>
                                                <option value="মাতৃত্ত্ব">
                                                  মাতৃত্ব
                                                </option>
                                                <option value="নৈমিত্তিক ছুটি">
                                                  নৈমিত্তিক ছুটি
                                                </option>
                                                <option value="অননুমোদিত ছুটি">
                                                  অননুমোদিত ছুটি
                                                </option>
                                              </Field>
                                            </div>
                                          )}
                                        </div>
                                      </Box>
                                    ))}
                                  </>
                                )}
                              </FieldArray>
                            </Box>
                          </LocalizationProvider>
                        </ul>
                      </AnimateHeight>
                    </div>
                  </div>
                ))}
              </DataDropdown>
            </div>

            {/* teacher related data */}
            <div className="border bg-white shadow-sm rounded-[4px] md:p-8 p-3 mt-4">
              <h2 className="md:text-xl text-lg font-semibold md:mb-8">
                শিক্ষার্থী সংক্রান্ত তথ্য
              </h2>
              <DataDropdown
                title="জরিপকৃত তথ্য(৪+...১০+)"
                itemKey={"survey"}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              >
                <div className="pt-8">
                  <FieldArray name="survey_total">
                    {() => (
                      <div>
                        <h3 className="mb-4 text-lg text-[#008B4C] font-semibold">
                          মোট
                        </h3>
                        {values.survey_total.map((survey_total, index) => (
                          <div
                            key={index}
                            className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4"
                          >
                            <NumberField
                              name={`survey_total.${index}.boys`}
                              label={"বালক"}
                              placeholder={"বালক সংখ্যা দিন"}
                            />
                            <NumberField
                              name={`survey_total.${index}.girls`}
                              label={"বালিকা"}
                              placeholder={"বালিকা সংখ্যা দিন"}
                            />
                            <NumberField
                              name={`survey_total.${index}.total`}
                              label={"মোট শিক্ষার্থী"}
                              placeholder={"মোট শিক্ষার্থী সংখ্যা দিন"}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </FieldArray>

                  <FieldArray name="survey_admitted">
                    {() => (
                      <div>
                        <h3 className="mb-4 mt-6 text-lg text-[#008B4C] font-semibold">
                          সংশ্লিষ্ট বিদ্যালয়ে ভর্তিকৃত
                        </h3>
                        {values.survey_admitted.map(
                          (survey_admitted, index) => (
                            <div
                              key={index}
                              className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4"
                            >
                              <NumberField
                                name={`survey_admitted.${index}.boys`}
                                label={"বালক"}
                                placeholder={"বালক সংখ্যা দিন"}
                              />
                              <NumberField
                                name={`survey_admitted.${index}.girls`}
                                label={"বালিকা"}
                                placeholder={"বালিকা সংখ্যা দিন"}
                              />
                              <NumberField
                                name={`survey_admitted.${index}.total`}
                                label={"মোট শিক্ষার্থী"}
                                placeholder={"মোট শিক্ষার্থী সংখ্যা দিন"}
                              />
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </FieldArray>

                  <FieldArray name="survey_admitted_to_other_school">
                    {() => (
                      <div>
                        <h3 className="mb-4 mt-6 text-lg text-[#008B4C] font-semibold">
                          অন্যান্য বিদ্যালয়ে ভর্তিকৃত
                        </h3>
                        {values.survey_admitted_to_other_school.map(
                          (survey_admitted_to_other_school, index) => (
                            <div
                              key={index}
                              className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4"
                            >
                              <NumberField
                                name={`survey_admitted_to_other_school.${index}.boys`}
                                label={"বালক"}
                                placeholder={"বালক সংখ্যা দিন"}
                              />
                              <NumberField
                                name={`survey_admitted_to_other_school.${index}.girls`}
                                label={"বালিকা"}
                                placeholder={"বালিকা সংখ্যা দিন"}
                              />
                              <NumberField
                                name={`survey_admitted_to_other_school.${index}.total`}
                                label={"মোট শিক্ষার্থী"}
                                placeholder={"মোট শিক্ষার্থী সংখ্যা দিন"}
                              />
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </FieldArray>

                  <FieldArray name="survey_unadmitted">
                    {() => (
                      <div>
                        <h3 className="mb-4 mt-6 text-lg text-[#008B4C] font-semibold">
                          অভর্তিকৃত
                        </h3>
                        {values.survey_unadmitted.map(
                          (survey_unadmitted, index) => (
                            <div
                              key={index}
                              className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4"
                            >
                              <NumberField
                                name={`survey_unadmitted.${index}.boys`}
                                label={"বালক"}
                                placeholder={"বালক সংখ্যা দিন"}
                              />
                              <NumberField
                                name={`survey_unadmitted.${index}.girls`}
                                label={"বালিকা"}
                                placeholder={"বালিকা সংখ্যা দিন"}
                              />
                              <NumberField
                                name={`survey_unadmitted.${index}.total`}
                                label={"মোট শিক্ষার্থী"}
                                placeholder={"মোট শিক্ষার্থী সংখ্যা দিন"}
                              />
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </FieldArray>
                </div>
              </DataDropdown>
              <DataDropdown
                title="ছাত্র/ছাত্রী ভর্তি তথ্য"
                itemKey={"student_admission"}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              >
                <div className="mt-4">
                  {/* data for nursery 4+ students */}
                  <div>
                    <button
                      type="button"
                      className={`relative border-gray-300 flex justify-between items-center w-full px-4 py-3 text-sm font-medium text-left rounded-lg border ${
                        studentAccordionActive === "nursery_four_plus"
                          ? " bg-slate-200"
                          : "  bg-slate-100"
                      }  ${
                        studentAccordionActive === "nursery_four_plus"
                          ? "active"
                          : ""
                      }`}
                      onClick={() => studentTogglePara("nursery_four_plus")}
                    >
                      <h5 className="text-gray-900 text-[16px]">
                        শিশু শ্রেণী ৪+
                      </h5>
                      <svg
                        className={`w-4 h-4 ml-2 duration-500 ${
                          studentAccordionActive === "nursery_four_plus"
                            ? "rotate-180"
                            : ""
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 9l-7 7-7-7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <AnimateHeight
                      duration={300}
                      height={
                        studentAccordionActive === "nursery_four_plus"
                          ? "auto"
                          : 0
                      }
                    >
                      <ul className="p-5">
                        {/* stipend related data */}
                        <FieldArray name="nursery_four_plus">
                          {() => (
                            <div>
                              {values.nursery_four_plus.map(
                                (nursery_four_plus, index) => (
                                  <div key={index}>
                                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4">
                                      {/* data for muslim students */}
                                      <NumberField
                                        name={`nursery_four_plus.${index}.muslim_boy_student`}
                                        label="মুসলিম ছাত্র"
                                        placeholder="ছাত্র সংখ্যা দিন"
                                      />
                                      <NumberField
                                        name={`nursery_four_plus.${index}.muslim_girl_student`}
                                        label="মুসলিম ছাত্রী"
                                        placeholder="ছাত্রী সংখ্যা দিন"
                                      />
                                      <NumberField
                                        name={`nursery_four_plus.${index}.muslim_total_student`}
                                        label="মোট মুসলিম শিক্ষার্থী"
                                        placeholder="মোট সংখ্যা দিন"
                                      />

                                      {/* data for hidu students */}
                                      <NumberField
                                        name={`nursery_four_plus.${index}.hindu_boy_student`}
                                        label="হিন্দু ছাত্র"
                                        placeholder="ছাত্র সংখ্যা দিন"
                                      />
                                      <NumberField
                                        name={`nursery_four_plus.${index}.hindu_girl_student`}
                                        label="হিন্দু ছাত্রী"
                                        placeholder="ছাত্রী সংখ্যা দিন"
                                      />
                                      <NumberField
                                        name={`nursery_four_plus.${index}.hindu_total_student`}
                                        label="মোট হিন্দু শিক্ষার্থী"
                                        placeholder="মোট সংখ্যা দিন"
                                      />

                                      {/* data for total students */}
                                      <NumberField
                                        name={`nursery_four_plus.${index}.total_boy_student`}
                                        label="মোট ছাত্র"
                                        placeholder="ছাত্র সংখ্যা দিন"
                                      />
                                      <NumberField
                                        name={`nursery_four_plus.${index}.total_girl_student`}
                                        label="মোট ছাত্রী"
                                        placeholder="ছাত্রী সংখ্যা দিন"
                                      />
                                      <NumberField
                                        name={`nursery_four_plus.${index}.total_student`}
                                        label="মোট শিক্ষার্থী"
                                        placeholder="মোট সংখ্যা দিন"
                                      />

                                      <NumberField
                                        name={`nursery_four_plus.${index}.special_demanded_student`}
                                        label="বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী"
                                        placeholder="মোট সংখ্যা দিন"
                                      />
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        </FieldArray>
                      </ul>
                    </AnimateHeight>
                  </div>

                  {/* data for nursery 5+ students */}
                  <div className="mt-3">
                    <button
                      type="button"
                      className={`relative border-gray-300 flex justify-between items-center w-full px-4 py-3 text-sm font-medium text-left rounded-lg border ${
                        studentAccordionActive === "nursery_five_plus"
                          ? " bg-slate-200"
                          : "  bg-slate-100"
                      }  ${
                        studentAccordionActive === "nursery_five_plus"
                          ? "active"
                          : ""
                      }`}
                      onClick={() => studentTogglePara("nursery_five_plus")}
                    >
                      <h5 className="text-gray-900 text-[16px]">
                        শিশু শ্রেণী ৫+
                      </h5>
                      <svg
                        className={`w-4 h-4 ml-2 duration-500 ${
                          studentAccordionActive === "nursery_five_plus"
                            ? "rotate-180"
                            : ""
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 9l-7 7-7-7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <AnimateHeight
                      duration={300}
                      height={
                        studentAccordionActive === "nursery_five_plus"
                          ? "auto"
                          : 0
                      }
                    >
                      <ul className="p-5">
                        <FieldArray name="nursery_five_plus">
                          {() => (
                            <div>
                              {values.nursery_five_plus.map(
                                (nursery_five_plus, index) => (
                                  <div key={index}>
                                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4">
                                      {/* data for muslim students */}
                                      <NumberField
                                        name={`nursery_five_plus.${index}.muslim_boy_student`}
                                        label="মুসলিম ছাত্র"
                                        placeholder="ছাত্র সংখ্যা দিন"
                                      />
                                      <NumberField
                                        name={`nursery_five_plus.${index}.muslim_girl_student`}
                                        label="মুসলিম ছাত্রী"
                                        placeholder="ছাত্রী সংখ্যা দিন"
                                      />
                                      <NumberField
                                        name={`nursery_five_plus.${index}.muslim_total_student`}
                                        label="মোট মুসলিম শিক্ষার্থী"
                                        placeholder="মোট শিক্ষার্থী সংখ্যা দিন"
                                      />

                                      {/* data for hidu students */}
                                      <NumberField
                                        name={`nursery_five_plus.${index}.hindu_boy_student`}
                                        label="হিন্দু ছাত্র"
                                        placeholder="ছাত্র সংখ্যা দিন"
                                      />
                                      <NumberField
                                        name={`nursery_five_plus.${index}.hindu_girl_student`}
                                        label="হিন্দু ছাত্রী"
                                        placeholder="ছাত্রী সংখ্যা দিন"
                                      />
                                      <NumberField
                                        name={`nursery_five_plus.${index}.hindu_total_student`}
                                        label="মোট হিন্দু শিক্ষার্থী"
                                        placeholder="মোট শিক্ষার্থী সংখ্যা দিন"
                                      />

                                      {/* data for total students */}
                                      <NumberField
                                        name={`nursery_five_plus.${index}.total_boy_student`}
                                        label="মোট ছাত্র"
                                        placeholder="ছাত্র সংখ্যা দিন"
                                      />
                                      <NumberField
                                        name={`nursery_five_plus.${index}.total_girl_student`}
                                        label="মোট ছাত্রী"
                                        placeholder="ছাত্রী সংখ্যা দিন"
                                      />
                                      <NumberField
                                        name={`nursery_five_plus.${index}.total_student`}
                                        label="মোট শিক্ষার্থী"
                                        placeholder="মোট শিক্ষার্থী সংখ্যা দিন"
                                      />

                                      <NumberField
                                        name={`nursery_five_plus.${index}.special_demanded_student`}
                                        label="বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী"
                                        placeholder="মোট শিক্ষার্থী সংখ্যা দিন"
                                      />
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        </FieldArray>
                      </ul>
                    </AnimateHeight>
                  </div>

                  {/* data for class one students */}
                  <div className="mt-3">
                    <button
                      type="button"
                      className={`relative border-gray-300 flex justify-between items-center w-full px-4 py-3 text-sm font-medium text-left rounded-lg border ${
                        studentAccordionActive === "class_one"
                          ? " bg-slate-200"
                          : "  bg-slate-100"
                      }  ${
                        studentAccordionActive === "class_one" ? "active" : ""
                      }`}
                      onClick={() => studentTogglePara("class_one")}
                    >
                      <h5 className="text-gray-900 text-[16px]">
                        প্রথম শ্রেণি
                      </h5>
                      <svg
                        className={`w-4 h-4 ml-2 duration-500 ${
                          studentAccordionActive === "class_one"
                            ? "rotate-180"
                            : ""
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 9l-7 7-7-7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <AnimateHeight
                      duration={300}
                      height={
                        studentAccordionActive === "class_one" ? "auto" : 0
                      }
                    >
                      <ul className="p-5">
                        <FieldArray name="class_one">
                          {() => (
                            <div>
                              {values.class_one.map((class_one, index) => (
                                <div key={index}>
                                  <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4">
                                    {/* data for muslim students */}
                                    <NumberField
                                      name={`class_one.${index}.muslim_boy_student`}
                                      label="মুসলিম ছাত্র"
                                      placeholder="ছাত্র সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_one.${index}.muslim_girl_student`}
                                      label="মুসলিম ছাত্রী"
                                      placeholder="ছাত্রী সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_one.${index}.muslim_total_student`}
                                      label="মোট মুসলিম শিক্ষার্থী"
                                      placeholder="মোট শিক্ষার্থী সংখ্যা দিন"
                                    />

                                    {/* data for hidu students */}
                                    <NumberField
                                      name={`class_one.${index}.hindu_boy_student`}
                                      label="হিন্দু ছাত্র"
                                      placeholder="ছাত্র সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_one.${index}.hindu_girl_student`}
                                      label="হিন্দু ছাত্রী"
                                      placeholder="ছাত্রী সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_one.${index}.hindu_total_student`}
                                      label="মোট হিন্দু শিক্ষার্থী"
                                      placeholder="মোট শিক্ষার্থী সংখ্যা দিন"
                                    />

                                    {/* data for total students */}
                                    <NumberField
                                      name={`class_one.${index}.total_boy_student`}
                                      label="মোট ছাত্র"
                                      placeholder="ছাত্র সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_one.${index}.total_girl_student`}
                                      label="মোট ছাত্রী"
                                      placeholder="ছাত্রী সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_one.${index}.total_student`}
                                      label="মোট শিক্ষার্থী"
                                      placeholder="মোট শিক্ষার্থী সংখ্যা দিন"
                                    />

                                    <NumberField
                                      name={`class_one.${index}.special_demanded_student`}
                                      label="বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী"
                                      placeholder="মোট শিক্ষার্থী সংখ্যা দিন"
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </FieldArray>
                      </ul>
                    </AnimateHeight>
                  </div>

                  {/* data for class_two students */}
                  <div className="mt-3">
                    <button
                      type="button"
                      className={`relative border-gray-300 flex justify-between items-center w-full px-4 py-3 text-sm font-medium text-left rounded-lg border ${
                        studentAccordionActive === "class_two"
                          ? " bg-slate-200"
                          : "  bg-slate-100"
                      }  ${
                        studentAccordionActive === "class_two" ? "active" : ""
                      }`}
                      onClick={() => studentTogglePara("class_two")}
                    >
                      <h5 className="text-gray-900 text-[16px]">
                        দ্বিতীয় শ্রেণি
                      </h5>
                      <svg
                        className={`w-4 h-4 ml-2 duration-500 ${
                          studentAccordionActive === "class_two"
                            ? "rotate-180"
                            : ""
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 9l-7 7-7-7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <AnimateHeight
                      duration={300}
                      height={
                        studentAccordionActive === "class_two" ? "auto" : 0
                      }
                    >
                      <ul className="p-5">
                        <FieldArray name="class_two">
                          {() => (
                            <div>
                              {values.class_two.map((class_two, index) => (
                                <div key={index}>
                                  <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4">
                                    {/* data for muslim students */}
                                    <NumberField
                                      name={`class_two.${index}.muslim_boy_student`}
                                      label="মুসলিম ছাত্র"
                                      placeholder="ছাত্র সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_two.${index}.muslim_girl_student`}
                                      label="মুসলিম ছাত্রী"
                                      placeholder="ছাত্রী সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_two.${index}.muslim_total_student`}
                                      label="মোট মুসলিম শিক্ষার্থী"
                                      placeholder="মোট সংখ্যা দিন"
                                    />

                                    {/* data for hidu students */}
                                    <NumberField
                                      name={`class_two.${index}.hindu_boy_student`}
                                      label="হিন্দু ছাত্র"
                                      placeholder="ছাত্র সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_two.${index}.hindu_girl_student`}
                                      label="হিন্দু ছাত্রী"
                                      placeholder="ছাত্রী সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_two.${index}.hindu_total_student`}
                                      label="মোট হিন্দু শিক্ষার্থী"
                                      placeholder="মোট সংখ্যা দিন"
                                    />

                                    {/* data for total students */}
                                    <NumberField
                                      name={`class_two.${index}.total_boy_student`}
                                      label="মোট ছাত্র"
                                      placeholder="ছাত্র সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_two.${index}.total_girl_student`}
                                      label="মোট ছাত্রী"
                                      placeholder="ছাত্রী সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_two.${index}.total_student`}
                                      label="মোট শিক্ষার্থী"
                                      placeholder="মোট সংখ্যা দিন"
                                    />

                                    <NumberField
                                      name={`class_two.${index}.special_demanded_student`}
                                      label="বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী"
                                      placeholder="মোট সংখ্যা দিন"
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </FieldArray>
                      </ul>
                    </AnimateHeight>
                  </div>

                  {/* data for class_three students */}
                  <div className="mt-3">
                    <button
                      type="button"
                      className={`relative border-gray-300 flex justify-between items-center w-full px-4 py-3 text-sm font-medium text-left rounded-lg border ${
                        studentAccordionActive === "class_three"
                          ? " bg-slate-200"
                          : "  bg-slate-100"
                      }  ${
                        studentAccordionActive === "class_three" ? "active" : ""
                      }`}
                      onClick={() => studentTogglePara("class_three")}
                    >
                      <h5 className="text-gray-900 text-[16px]">
                        তৃতীয় শ্রেণি
                      </h5>
                      <svg
                        className={`w-4 h-4 ml-2 duration-500 ${
                          studentAccordionActive === "class_three"
                            ? "rotate-180"
                            : ""
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 9l-7 7-7-7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <AnimateHeight
                      duration={300}
                      height={
                        studentAccordionActive === "class_three" ? "auto" : 0
                      }
                    >
                      <ul className="p-5">
                        <FieldArray name="class_three">
                          {() => (
                            <div>
                              {values.class_three.map((class_three, index) => (
                                <div key={index}>
                                  <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4">
                                    {/* data for muslim students */}
                                    <NumberField
                                      name={`class_three.${index}.muslim_boy_student`}
                                      label="মুসলিম ছাত্র"
                                      placeholder="ছাত্র সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_three.${index}.muslim_girl_student`}
                                      label="মুসলিম ছাত্রী"
                                      placeholder="ছাত্রী সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_three.${index}.muslim_total_student`}
                                      label="মোট মুসলিম শিক্ষার্থী"
                                      placeholder="মোট সংখ্যা দিন"
                                    />

                                    {/* data for hidu students */}
                                    <NumberField
                                      name={`class_three.${index}.hindu_boy_student`}
                                      label="হিন্দু ছাত্র"
                                      placeholder="ছাত্র সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_three.${index}.hindu_girl_student`}
                                      label="হিন্দু ছাত্রী"
                                      placeholder="ছাত্রী সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_three.${index}.hindu_total_student`}
                                      label="মোট হিন্দু শিক্ষার্থী"
                                      placeholder="মোট সংখ্যা দিন"
                                    />

                                    {/* data for total students */}
                                    <NumberField
                                      name={`class_three.${index}.total_boy_student`}
                                      label="মোট ছাত্র"
                                      placeholder="ছাত্র সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_three.${index}.total_girl_student`}
                                      label="মোট ছাত্রী"
                                      placeholder="ছাত্রী সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_three.${index}.total_student`}
                                      label="মোট শিক্ষার্থী"
                                      placeholder="মোট সংখ্যা দিন"
                                    />

                                    <NumberField
                                      name={`class_three.${index}.special_demanded_student`}
                                      label="বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী"
                                      placeholder="মোট সংখ্যা দিন"
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </FieldArray>
                      </ul>
                    </AnimateHeight>
                  </div>

                  {/* data for class_four students */}
                  <div className="mt-3">
                    <button
                      type="button"
                      className={`relative border-gray-300 flex justify-between items-center w-full px-4 py-3 text-sm font-medium text-left rounded-lg border ${
                        studentAccordionActive === "class_four"
                          ? " bg-slate-200"
                          : "  bg-slate-100"
                      }  ${
                        studentAccordionActive === "class_four" ? "active" : ""
                      }`}
                      onClick={() => studentTogglePara("class_four")}
                    >
                      <h5 className="text-gray-900 text-[16px]">
                        চতুর্থ শ্রেণি
                      </h5>
                      <svg
                        className={`w-4 h-4 ml-2 duration-500 ${
                          studentAccordionActive === "class_four"
                            ? "rotate-180"
                            : ""
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 9l-7 7-7-7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <AnimateHeight
                      duration={300}
                      height={
                        studentAccordionActive === "class_four" ? "auto" : 0
                      }
                    >
                      <ul className="p-5">
                        <FieldArray name="class_four">
                          {() => (
                            <div>
                              {values.class_four.map((class_four, index) => (
                                <div key={index}>
                                  <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4">
                                    {/* data for muslim students */}
                                    <NumberField
                                      name={`class_four.${index}.muslim_boy_student`}
                                      label="মুসলিম ছাত্র"
                                      placeholder="ছাত্র সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_four.${index}.muslim_girl_student`}
                                      label="মুসলিম ছাত্রী"
                                      placeholder="ছাত্রী সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_four.${index}.muslim_total_student`}
                                      label="মোট মুসলিম শিক্ষার্থী"
                                      placeholder="মোট সংখ্যা দিন"
                                    />

                                    {/* data for hidu students */}
                                    <NumberField
                                      name={`class_four.${index}.hindu_boy_student`}
                                      label="হিন্দু ছাত্র"
                                      placeholder="ছাত্র সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_four.${index}.hindu_girl_student`}
                                      label="হিন্দু ছাত্রী"
                                      placeholder="ছাত্রী সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_four.${index}.hindu_total_student`}
                                      label="মোট হিন্দু শিক্ষার্থী"
                                      placeholder="মোট সংখ্যা দিন"
                                    />

                                    {/* data for total students */}
                                    <NumberField
                                      name={`class_four.${index}.total_boy_student`}
                                      label="মোট ছাত্র"
                                      placeholder="ছাত্র সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_four.${index}.total_girl_student`}
                                      label="মোট ছাত্রী"
                                      placeholder="ছাত্রী সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_four.${index}.total_student`}
                                      label="মোট শিক্ষার্থী"
                                      placeholder="মোট সংখ্যা দিন"
                                    />

                                    <NumberField
                                      name={`class_four.${index}.special_demanded_student`}
                                      label="বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী"
                                      placeholder="মোট সংখ্যা দিন"
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </FieldArray>
                      </ul>
                    </AnimateHeight>
                  </div>

                  {/* data for class_five students */}
                  <div className="mt-3">
                    <button
                      type="button"
                      className={`relative border-gray-300 flex justify-between items-center w-full px-4 py-3 text-sm font-medium text-left rounded-lg border ${
                        studentAccordionActive === "class_five"
                          ? " bg-slate-200"
                          : "  bg-slate-100"
                      }  ${
                        studentAccordionActive === "class_five" ? "active" : ""
                      }`}
                      onClick={() => studentTogglePara("class_five")}
                    >
                      <h5 className="text-gray-900 text-[16px]">
                        পঞ্চম শ্রেণি
                      </h5>
                      <svg
                        className={`w-4 h-4 ml-2 duration-500 ${
                          studentAccordionActive === "class_five"
                            ? "rotate-180"
                            : ""
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 9l-7 7-7-7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <AnimateHeight
                      duration={300}
                      height={
                        studentAccordionActive === "class_five" ? "auto" : 0
                      }
                    >
                      <ul className="p-5">
                        <FieldArray name="class_five">
                          {() => (
                            <div>
                              {values.class_five.map((class_five, index) => (
                                <div key={index}>
                                  <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4">
                                    {/* data for muslim students */}
                                    <NumberField
                                      name={`class_five.${index}.muslim_boy_student`}
                                      label="মুসলিম ছাত্র"
                                      placeholder="ছাত্র সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_five.${index}.muslim_girl_student`}
                                      label="মুসলিম ছাত্রী"
                                      placeholder="ছাত্রী সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_five.${index}.muslim_total_student`}
                                      label="মোট মুসলিম শিক্ষার্থী"
                                      placeholder="মোট সংখ্যা দিন"
                                    />

                                    {/* data for hidu students */}
                                    <NumberField
                                      name={`class_five.${index}.hindu_boy_student`}
                                      label="হিন্দু ছাত্র"
                                      placeholder="ছাত্র সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_five.${index}.hindu_girl_student`}
                                      label="হিন্দু ছাত্রী"
                                      placeholder="ছাত্রী সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_five.${index}.hindu_total_student`}
                                      label="মোট হিন্দু শিক্ষার্থী"
                                      placeholder="মোট সংখ্যা দিন"
                                    />

                                    {/* data for total students */}
                                    <NumberField
                                      name={`class_five.${index}.total_boy_student`}
                                      label="মোট ছাত্র"
                                      placeholder="ছাত্র সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_five.${index}.total_girl_student`}
                                      label="মোট ছাত্রী"
                                      placeholder="ছাত্রী সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_five.${index}.total_student`}
                                      label="মোট শিক্ষার্থী"
                                      placeholder="মোট সংখ্যা দিন"
                                    />

                                    <NumberField
                                      name={`class_five.${index}.special_demanded_student`}
                                      label="বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী"
                                      placeholder="মোট সংখ্যা দিন"
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </FieldArray>
                      </ul>
                    </AnimateHeight>
                  </div>

                  {/* data for class_six students */}
                  <div className="mt-3">
                    <button
                      type="button"
                      className={`relative border-gray-300 flex justify-between items-center w-full px-4 py-3 text-sm font-medium text-left rounded-lg border ${
                        studentAccordionActive === "class_six"
                          ? " bg-slate-200"
                          : "  bg-slate-100"
                      }  ${
                        studentAccordionActive === "class_six" ? "active" : ""
                      }`}
                      onClick={() => studentTogglePara("class_six")}
                    >
                      <h5 className="text-gray-900 text-[16px]">ষষ্ঠ শ্রেণি</h5>
                      <svg
                        className={`w-4 h-4 ml-2 duration-500 ${
                          studentAccordionActive === "class_six"
                            ? "rotate-180"
                            : ""
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 9l-7 7-7-7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <AnimateHeight
                      duration={300}
                      height={
                        studentAccordionActive === "class_six" ? "auto" : 0
                      }
                    >
                      <ul className="p-5">
                        <FieldArray name="class_six">
                          {() => (
                            <div>
                              {values.class_six.map((class_six, index) => (
                                <div key={index}>
                                  <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4">
                                    {/* data for muslim students */}
                                    <NumberField
                                      name={`class_six.${index}.muslim_boy_student`}
                                      label="মুসলিম ছাত্র"
                                      placeholder="ছাত্র সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_six.${index}.muslim_girl_student`}
                                      label="মুসলিম ছাত্রী"
                                      placeholder="ছাত্রী সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_six.${index}.muslim_total_student`}
                                      label="মোট মুসলিম শিক্ষার্থী"
                                      placeholder="মোট সংখ্যা দিন"
                                    />

                                    {/* data for hidu students */}
                                    <NumberField
                                      name={`class_six.${index}.hindu_boy_student`}
                                      label="হিন্দু ছাত্র"
                                      placeholder="ছাত্র সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_six.${index}.hindu_girl_student`}
                                      label="হিন্দু ছাত্রী"
                                      placeholder="ছাত্রী সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_six.${index}.hindu_total_student`}
                                      label="মোট হিন্দু শিক্ষার্থী"
                                      placeholder="মোট সংখ্যা দিন"
                                    />

                                    {/* data for total students */}
                                    <NumberField
                                      name={`class_six.${index}.total_boy_student`}
                                      label="মোট ছাত্র"
                                      placeholder="ছাত্র সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_six.${index}.total_girl_student`}
                                      label="মোট ছাত্রী"
                                      placeholder="ছাত্রী সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_six.${index}.total_student`}
                                      label="মোট শিক্ষার্থী"
                                      placeholder="মোট সংখ্যা দিন"
                                    />

                                    <NumberField
                                      name={`class_six.${index}.special_demanded_student`}
                                      label="বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী"
                                      placeholder="মোট সংখ্যা দিন"
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </FieldArray>
                      </ul>
                    </AnimateHeight>
                  </div>

                  {/* data for class_seven students */}
                  <div className="mt-3">
                    <button
                      type="button"
                      className={`relative border-gray-300 flex justify-between items-center w-full px-4 py-3 text-sm font-medium text-left rounded-lg border ${
                        studentAccordionActive === "class_seven"
                          ? " bg-slate-200"
                          : "  bg-slate-100"
                      }  ${
                        studentAccordionActive === "class_seven" ? "active" : ""
                      }`}
                      onClick={() => studentTogglePara("class_seven")}
                    >
                      <h5 className="text-gray-900 text-[16px]">
                        সপ্তম শ্রেণি
                      </h5>
                      <svg
                        className={`w-4 h-4 ml-2 duration-500 ${
                          studentAccordionActive === "class_seven"
                            ? "rotate-180"
                            : ""
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 9l-7 7-7-7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <AnimateHeight
                      duration={300}
                      height={
                        studentAccordionActive === "class_seven" ? "auto" : 0
                      }
                    >
                      <ul className="p-5">
                        <FieldArray name="class_seven">
                          {() => (
                            <div>
                              {values.class_seven.map((class_seven, index) => (
                                <div key={index}>
                                  <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4">
                                    {/* data for muslim students */}
                                    <NumberField
                                      name={`class_seven.${index}.muslim_boy_student`}
                                      label="মুসলিম ছাত্র"
                                      placeholder="ছাত্র সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_seven.${index}.muslim_girl_student`}
                                      label="মুসলিম ছাত্রী"
                                      placeholder="ছাত্রী সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_seven.${index}.muslim_total_student`}
                                      label="মোট মুসলিম শিক্ষার্থী"
                                      placeholder="মোট সংখ্যা দিন"
                                    />

                                    {/* data for hidu students */}
                                    <NumberField
                                      name={`class_seven.${index}.hindu_boy_student`}
                                      label="হিন্দু ছাত্র"
                                      placeholder="ছাত্র সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_seven.${index}.hindu_girl_student`}
                                      label="হিন্দু ছাত্রী"
                                      placeholder="ছাত্রী সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_seven.${index}.hindu_total_student`}
                                      label="মোট হিন্দু শিক্ষার্থী"
                                      placeholder="মোট সংখ্যা দিন"
                                    />

                                    {/* data for total students */}
                                    <NumberField
                                      name={`class_seven.${index}.total_boy_student`}
                                      label="মোট ছাত্র"
                                      placeholder="ছাত্র সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_seven.${index}.total_girl_student`}
                                      label="মোট ছাত্রী"
                                      placeholder="ছাত্রী সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_seven.${index}.total_student`}
                                      label="মোট শিক্ষার্থী"
                                      placeholder="মোট সংখ্যা দিন"
                                    />

                                    <NumberField
                                      name={`class_seven.${index}.special_demanded_student`}
                                      label="বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী"
                                      placeholder="মোট সংখ্যা দিন"
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </FieldArray>
                      </ul>
                    </AnimateHeight>
                  </div>

                  {/* data for class_eight students */}
                  <div className="mt-3">
                    <button
                      type="button"
                      className={`relative border-gray-300 flex justify-between items-center w-full px-4 py-3 text-sm font-medium text-left rounded-lg border ${
                        studentAccordionActive === "class_eight"
                          ? " bg-slate-200"
                          : "  bg-slate-100"
                      }  ${
                        studentAccordionActive === "class_eight" ? "active" : ""
                      }`}
                      onClick={() => studentTogglePara("class_eight")}
                    >
                      <h5 className="text-gray-900 text-[16px]">
                        অষ্টম শ্রেণি
                      </h5>
                      <svg
                        className={`w-4 h-4 ml-2 duration-500 ${
                          studentAccordionActive === "class_eight"
                            ? "rotate-180"
                            : ""
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 9l-7 7-7-7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <AnimateHeight
                      duration={300}
                      height={
                        studentAccordionActive === "class_eight" ? "auto" : 0
                      }
                    >
                      <ul className="p-5">
                        <FieldArray name="class_eight">
                          {() => (
                            <div>
                              {values.class_eight.map((class_eight, index) => (
                                <div key={index}>
                                  <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4">
                                    {/* data for muslim students */}
                                    <NumberField
                                      name={`class_eight.${index}.muslim_boy_student`}
                                      label="মুসলিম ছাত্র"
                                      placeholder="ছাত্র সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_eight.${index}.muslim_girl_student`}
                                      label="মুসলিম ছাত্রী"
                                      placeholder="ছাত্রী সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_eight.${index}.muslim_total_student`}
                                      label="মোট মুসলিম শিক্ষার্থী"
                                      placeholder="মোট সংখ্যা দিন"
                                    />

                                    {/* data for hidu students */}
                                    <NumberField
                                      name={`class_eight.${index}.hindu_boy_student`}
                                      label="হিন্দু ছাত্র"
                                      placeholder="ছাত্র সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_eight.${index}.hindu_girl_student`}
                                      label="হিন্দু ছাত্রী"
                                      placeholder="ছাত্রী সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_eight.${index}.hindu_total_student`}
                                      label="মোট হিন্দু শিক্ষার্থী"
                                      placeholder="মোট সংখ্যা দিন"
                                    />

                                    {/* data for total students */}
                                    <NumberField
                                      name={`class_eight.${index}.total_boy_student`}
                                      label="মোট ছাত্র"
                                      placeholder="ছাত্র সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_eight.${index}.total_girl_student`}
                                      label="মোট ছাত্রী"
                                      placeholder="ছাত্রী সংখ্যা দিন"
                                    />
                                    <NumberField
                                      name={`class_eight.${index}.total_student`}
                                      label="মোট শিক্ষার্থী"
                                      placeholder="মোট সংখ্যা দিন"
                                    />

                                    <NumberField
                                      name={`class_eight.${index}.special_demanded_student`}
                                      label="বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী"
                                      placeholder="মোট সংখ্যা দিন"
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </FieldArray>
                      </ul>
                    </AnimateHeight>
                  </div>
                </div>
              </DataDropdown>
              <DataDropdown
                title="আশ্রয়ন প্রকল্পের জরিপকৃত তথ্য(৪+...১০+)"
                itemKey={"asroyon"}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              >
                <div className="pt-4">
                  <FieldArray name="asroyon_survey">
                    {() => (
                      <div>
                        {values.asroyon_survey.map((survery, index) => (
                          <div key={index}>
                            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4">
                              <NumberField
                                defaultValue={studentSurveyTotal}
                                name={`asroyon_survey.${index}.survayed_students`}
                                label="মোট জরিপকৃত শিক্ষার্থী"
                                placeholder="শিক্ষার্থী সংখ্যা দিন"
                              />
                              <NumberField
                                defaultValue={studentSurveyAdmitted}
                                name={`asroyon_survey.${index}.admitted_releted_school_students`}
                                label="সংশ্লিষ্ট বিদ্যালয়ে ভর্তিকৃত শিক্ষার্থী"
                                placeholder="শিক্ষার্থী সংখ্যা দিন"
                              />
                              <NumberField
                                defaultValue={studentSurveyUnAdmitted}
                                name={`asroyon_survey.${index}.unadmitted_students`}
                                label="অভর্তিকৃত শিক্ষার্থী"
                                placeholder="শিক্ষার্থী সংখ্যা দিন"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </FieldArray>
                </div>
              </DataDropdown>
            </div>

            <div className="flex items-center justify-between">
              <button
                disabled={loading && !draftSubmit}
                type="submit"
                onClick={() => setDraftSubmit(false)}
                className="px-6 md:py-[10px] py-[6px] md:pt-[15px] pt-[10px] bg-[#008B4C] border border-[#008B4C] hover:bg-[#006f3d] text-white rounded-md font-semibold capitalize mt-5"
              >
                {loading && !draftSubmit ? (
                  <p className="text-white flex items-center gap-2">
                    <CircularProgress className="btnSpinner" />
                    <span>সাবমিট হচ্ছে...</span>
                  </p>
                ) : (
                  "সাবমিট করুন"
                )}
              </button>
              <button
                disabled={loading && draftSubmit}
                onClick={handleOpenNewTab}
                type="submit"
                className="px-6 md:py-[10px] py-[6px] md:pt-[15px] pt-[10px] bg-[#008B4C] border border-[#008B4C] hover:bg-[#006f3d] text-white rounded-md font-semibold capitalize mt-5"
              >
                {loading && draftSubmit ? (
                  <p className="text-white flex items-center gap-2">
                    <span>সাবমিট হচ্ছে...</span>
                    <CircularProgress className="btnSpinner" />
                  </p>
                ) : (
                  "পূর্ণাঙ্গ বিল রিপোর্ট"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <ToastContainer autoClose={1600} />
    </div>
  );
};

export default BilReturnSubmit;
