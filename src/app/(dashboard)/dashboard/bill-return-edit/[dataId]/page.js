"use client";
import TextField from "@/app/components/TextField";
import { Field, FieldArray, Form, Formik } from "formik";
import * as React from "react";
import NumberField from "@/app/components/NumberField";
import MyDatePicker from "@/app/components/MyDatePicker";
import AnimateHeight from "react-animate-height";
import ImageInput from "@/app/components/ImageInput";
import {
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
import { generateUniqueId } from "@/lib/uniqueId";
import setArrayFieldValue from "@/lib/setArrayFieldValue";

const BilReturnSubmit = ({ params }) => {
  const [activeItem, setActiveItem] = React.useState("");
  const { userName } = React.useContext(AuthContext);
  const [billData, setBillData] = React.useState(null);
  React.useEffect(() => {
    const id = params.dataId;
    setLoading(true);
    const apiUrl = `http://localhost:3000/api/bill-return/get-single`;
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, userName }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setBillData(data.data);
        }
      })
      .catch((error) => {
        toast.error("একটি ইরর ঘটেছে!");
        console.error("There was an error!", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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

  const [washBlock, setWashBlock] = React.useState("");

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

  const [internetType, setInternetType] = React.useState([
    "রাউটার",
    "সিম",
    "রাউটার",
  ]);

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
    { value: "2020", label: "2020" },
    { value: "2021", label: "2021" },
    { value: "2022", label: "2022" },
    { value: "2023", label: "2023" },
    { value: "2024", label: "2024" },
  ];

  const [stipendYearSelectedOption, setStipendYearSelectedOption] =
    React.useState("");

  const stipendYearSelectChange = (schoolSelectedOption) => {
    setStipendYearSelectedOption(schoolSelectedOption);
  };
  const [submitLoading, setSubmitLoading] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  // destructuring all data from fetched Data
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <CircularProgress className="spinner" />
      </div>
    );
  }
  if (!billData) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <h3 className="text-3xl font-semibold text-center">No data found!</h3>
      </div>
    );
  }
  const handleFormSubmit = (values) => {
    setSubmitLoading(true);
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
      formData.isDraft = false;
      formData.updated_at = currentDate;
      formData.school.general = values.school.general;
      formData.school.conference = values.school.conference;
      formData.school.development = values.budgets;
      // set budgets
      setArrayFieldValue(
        values.budgets,
        formData.school.development,
        billData.school.development
      );
      formData.school.infrastructure = values.school.infrastructure;
      formData.school.infrastructure.others.internet = internetType;
      formData.school.infrastructure.others.laptop.total =
        laptop || billData.school.infrastructure.others.laptop.total;
      formData.school.infrastructure.others.piano.total =
        piano || billData.school.infrastructure.others.piano.total;
      formData.school.infrastructure.others.multimedia.total =
        multimedia || billData.school.infrastructure.others.multimedia.total;
      formData.school.land = values.school.land;
      formData.school.stipend = values.school.stipend;
      values.school.infrastructure.border_wall.wall =
        borderWall || billData.school.infrastructure.border_wall.wall;
      if (borderWall === "নেই") {
        formData.school.infrastructure.border_wall.funding_type = "";
        formData.school.infrastructure.border_wall.founded_date = "";
      }
      values.school.infrastructure.building.buildings =
        buildingNumber || billData.school.infrastructure.building.buildings;
      values.school.infrastructure.water.tube_wells =
        tubeWell || billData.school.infrastructure.water.tube_wells;
      values.school.infrastructure.water.deep_tube_wells =
        deepTubeWell || billData.school.infrastructure.water.deep_tube_wells;
      values.school.infrastructure.wash_block =
        washBlock || billData.school.infrastructure.wash_block;
      values.school.land.is_registered =
        registration || billData.school.land.is_registered;
      if (registration !== "হ্যাঁ") {
        values.school.land.registration_ownership = "";
      }
      values.school.land.is_namjaried =
        namjari || billData.school.land.is_namjaried;
      if (namjari !== "হ্যাঁ") {
        values.school.land.namjari_ownership = "";
      }
      values.school.stipend.stipend_year =
        stipendYearSelectedOption.value || billData.school.stipend.stipend_year;
      formData.teacher.general = values.teacher.general;
      formData.teacher.salary = values.salary;

      // set salary array data
      values.salary.map((dev, idx) => {
        let devElements = [];
        for (const key in dev) {
          const element = dev[key];
          devElements.push(element);
        }
        if (devElements.length === 0) {
          formData.teacher.salary = billData.teacher.salary;
        } else {
          const fetchedSalary = billData.teacher.salary[idx];
          for (const key in fetchedSalary) {
            if (Object.hasOwnProperty.call(fetchedSalary, key)) {
              const element = fetchedSalary[key];
              if (key === "signature") {
                dev[key] = billData.teacher.salary.signature;
              }
              if (dev[key] === undefined) {
                dev[key] = element;
              }
            }
          }
        }
      });

      formData.teacher.vacation = values.vacations;
      // set vacation array data
      setArrayFieldValue(
        values.vacations,
        formData.teacher.vacation,
        billData.teacher.vacation
      );

      formData.teacher.unauthorized_teacher = values.unauthorized_teacher;
      // set unauthorized teacher data
      setArrayFieldValue(
        values.unauthorized_teacher,
        formData.teacher.unauthorized_teacher,
        billData.teacher.unauthorized_teacher
      );

      formData.student.survey.survey_admitted = values.survey_admitted;
      // set survey_admitted data
      setArrayFieldValue(
        values.survey_admitted,
        formData.student.survey.survey_admitted,
        billData.student.survey.survey_admitted
      );
      formData.student.survey.survey_admitted_to_other_school =
        values.survey_admitted_to_other_school;
      // set survey_admitted_to_other_school data
      setArrayFieldValue(
        values.survey_admitted_to_other_school,
        formData.student.survey.survey_admitted_to_other_school,
        billData.student.survey.survey_admitted_to_other_school
      );
      formData.student.survey.survey_unadmitted = values.survey_unadmitted;
      // set survey_unadmitted data
      setArrayFieldValue(
        values.survey_unadmitted,
        formData.student.survey.survey_unadmitted,
        billData.student.survey.survey_unadmitted
      );
      formData.student.survey.survey_total = values.survey_total;
      // set survey_total data
      setArrayFieldValue(
        values.survey_total,
        formData.student.survey.survey_total,
        billData.student.survey.survey_total
      );

      formData.student.admission.nursery_four_plus = values.nursery_four_plus;
      // set nursery_four_plus data
      setArrayFieldValue(
        values.nursery_four_plus,
        formData.student.admission.nursery_four_plus,
        billData.student.admission.nursery_four_plus
      );
      formData.student.admission.nursery_five_plus = values.nursery_five_plus;
      // set nursery_five_plus data
      setArrayFieldValue(
        values.nursery_five_plus,
        formData.student.admission.nursery_five_plus,
        billData.student.admission.nursery_five_plus
      );
      formData.student.admission.class_one = values.class_one;
      // set class_one data
      setArrayFieldValue(
        values.class_one,
        formData.student.admission.class_one,
        billData.student.admission.class_one
      );
      formData.student.admission.class_two = values.class_two;
      // set class_two data
      setArrayFieldValue(
        values.class_two,
        formData.student.admission.class_two,
        billData.student.admission.class_two
      );
      formData.student.admission.class_three = values.class_three;
      // set class_three data
      setArrayFieldValue(
        values.class_three,
        formData.student.admission.class_three,
        billData.student.admission.class_three
      );
      formData.student.admission.class_four = values.class_four;
      // set nursery_four_plus data
      setArrayFieldValue(
        values.class_four,
        formData.student.admission.class_four,
        billData.student.admission.class_four
      );
      formData.student.admission.class_five = values.class_five;
      // set class_five data
      setArrayFieldValue(
        values.class_five,
        formData.student.admission.class_five,
        billData.student.admission.class_five
      );
      formData.student.admission.class_six = values.class_six;
      formData.student.admission.class_seven = values.class_seven;
      formData.student.admission.class_eight = values.class_eight;

      formData.student.asroyon_survey = values.asroyon_survey;
      // set asroyon_survey data
      setArrayFieldValue(
        values.asroyon_survey,
        formData.student.asroyon_survey,
        billData.student.asroyon_survey
      );

      const apiUrl = `http://localhost:3000/api/bill-return/edit`;
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData, _id: params.dataId }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.success) {
            toast.success("সফল ভাবে আপডেট হয়েছে!");
            setTimeout(() => {
              window.location.reload();
            }, 1200);
          }
        })
        .catch((error) => {
          toast.error("একটি ইরর ঘটেছে!");
          console.error("There was an error!", error);
        })
        .finally(() => {
          setSubmitLoading(false);
        });
      console.log("values, ", formData);
    }
  };

  const internetTypeOptions = ["মডেম", "সিম", "রাউটার"];

  const schoolData = billData?.school;

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
    laptop: fetchedLaptop,
    multimedia: fetchedMultimedia,
    piano: fetchedPiano,
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

  const unauthorized_teacher = teacherData.unauthorized_teacher;
  const teacherVacations = teacherData.vacation;
  const teacherSalary = teacherData.salary;
  // student related data
  const studentData = billData?.student;

  const studentSurveyAdmitted = studentData.survey.survey_admitted;
  const studentSurveyAdmittedToOthersSchool =
    studentData.survey.survey_admitted_to_other_school;
  const studentSurveyUnAdmitted = studentData.survey.survey_unadmitted;
  const studentSurveyTotal = studentData.survey.survey_total;
  const nursery_four_plus = studentData.admission.nursery_four_plus;
  const nursery_five_plus = studentData.admission.nursery_five_plus;
  const class_one = studentData.admission.class_one;
  const class_two = studentData.admission.class_two;
  const class_three = studentData.admission.class_three;
  const class_four = studentData.admission.class_four;
  const class_five = studentData.admission.class_five;
  const studentAsroyonSurvey = studentData.asroyon_survey;

  return (
    <div className="bg-[#FAFAFA] xl:w-[85%] w-full lg:mt-0 mt-4">
      <h2 className="md:text-2xl text-xl font-semibold md:mb-14 mb-8">
        বিল রিটার্ন এডিট
      </h2>
      <Formik
        initialValues={{
          unique_id: "",
          submitter_info: {
            submitted_by: "",
          },
          budgets: [{}],
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
                building_condition_1: building_condition_1,
                building_condition_2: building_condition_2,
                building_condition_3: building_condition_3,
                building_condition_4: building_condition_4,
                building_date_1: building_date_1,
                building_date_2: building_date_2,
                building_date_3: building_date_3,
                building_date_4: building_date_4,
                building_type_1: building_type_1,
                building_type_2: building_type_2,
                building_type_3: building_type_3,
                building_type_4: building_type_4,
                buildings: buildings,
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
                  total: fetchedLaptop.total,
                  actives: fetchedLaptop.actives,
                },
                multimedia: {
                  total: fetchedMultimedia.total,
                  actives: fetchedMultimedia.actives,
                },
                piano: {
                  total: fetchedPiano.total,
                  actives: fetchedPiano.actives,
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
              stipend_year: stipendYearSelectedOption.value,
              total_consumer: total_consumer,
              latest_season: latest_season,
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
            development: {},
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
          },
          students: {
            admission: {},
          },
          salary: [{}],
          vacations: [{}],
          nursery_four_plus: [{}],
          nursery_five_plus: [{}],
          class_one: [{}],
          class_two: [{}],
          class_three: [{}],
          class_four: [{}],
          class_five: [{}],
          class_six: [{}],
          class_seven: [{}],
          class_eight: [{}],
          asroyon_survey: [{}],
          survey_total: [{}],
          survey_admitted: [{}],
          survey_unadmitted: [{}],
          survey_admitted_to_other_school: [{}],
          unauthorized_teacher: [{}],
        }}
        onSubmit={handleFormSubmit}
        enableReinitialize
      >
        {({ values }) => (
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
                  <TextField
                    defaultValue={schoolName}
                    name="school.general.name"
                    label="বিদ্যালয়ের নাম"
                    placeholder={"বিদ্যালয়ের নাম লিখুন"}
                  />
                  <div className="mb-4">
                    <label className="font-semibold" htmlFor="cluster">
                      ক্লাস্টার*
                    </label>
                    <Field
                      className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                      as="select"
                      name="school.general.cluster"
                      id="cluster"
                    >
                      <option
                        className="text-gray-300"
                        value={cluster || "একটি অপশন সিলেক্ট করুন"}
                        selected
                      >
                        {cluster || "একটি অপশন সিলেক্ট করুন"}
                      </option>
                      <option value="সাধুহাটি ক্লাস্টার">সাধুহাটি</option>
                      <option value="কামালপুর ক্লাস্টার">কামালপুর</option>
                      <option value="ভাঁদ‌গাঁও ক্লাস্টার">ভাঁদ‌গাঁও</option>
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
                      defaultValue={union_corporation}
                      className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                      as="select"
                      name="school.general.union_corporation"
                      id="union_corporation"
                    >
                      <option
                        className="text-gray-300"
                        value={union_corporation || "একটি অপশন সিলেক্ট করুন"}
                        selected
                      >
                        {union_corporation || "একটি অপশন সিলেক্ট করুন"}
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
                  {/* <TextField name="school.general.union_corporation" label="ইউনিয়ন/পৌরসভা" placeholder={"ইউনিয়ন/পৌরসভা লিখুন"} /> */}
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
                        value={grade || "একটি অপশন সিলেক্ট করুন"}
                        selected
                      >
                        {grade || "একটি অপশন সিলেক্ট করুন"}
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
                        value={shifts || "একটি অপশন সিলেক্ট করুন"}
                        selected
                      >
                        {shifts || "একটি অপশন সিলেক্ট করুন"}
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
                        defaultValue={buildings}
                        onChange={handleBuildingNumberChange}
                        type="number"
                        className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                      />
                    </div>
                  </div>
                  <div className="mt-6 mb-12">
                    {buildings > 0 || buildingNumber > 0 ? (
                      <div className="mt-3 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-6">
                        <MyDatePicker
                          defaultValue={building_date_1}
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
                              value={
                                building_type_1 || "একটি অপশন সিলেক্ট করুন"
                              }
                              selected
                            >
                              {building_type_1 || "একটি অপশন সিলেক্ট করুন"}
                            </option>
                            <option value="পাকা">পাকা</option>
                            <option value="সেমিপাকা">সেমিপাকা</option>
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
                              value={
                                building_condition_1 || "একটি অপশন সিলেক্ট করুন"
                              }
                              selected
                            >
                              {building_condition_1 || "একটি অপশন সিলেক্ট করুন"}
                            </option>
                            <option value="ভালো">ভালো</option>
                            <option value="জরাজীর্ণ">জরাজীর্ণ</option>
                            <option value="পরিত্যাক্ত">পরিত্যাক্ত</option>
                            <option value="পরিত্যাক্ত">ঝুঁকিপূর্ণ</option>
                          </Field>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}

                    {buildings > 1 || buildingNumber > 1 ? (
                      <div className="mt-3 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-6">
                        <MyDatePicker
                          defaultValue={building_date_2}
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
                              value={
                                building_type_2 || "একটি অপশন সিলেক্ট করুন"
                              }
                              selected
                            >
                              {building_type_2 || "একটি অপশন সিলেক্ট করুন"}
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
                              value={
                                building_condition_2 || "একটি অপশন সিলেক্ট করুন"
                              }
                              selected
                            >
                              {building_condition_2 || "একটি অপশন সিলেক্ট করুন"}
                            </option>
                            <option value="ভালো">ভালো</option>
                            <option value="জরাজীর্ণ">জরাজীর্ণ</option>
                            <option value="পরিত্যাক্ত">পরিত্যাক্ত</option>
                          </Field>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}

                    {buildings > 2 || buildingNumber > 2 ? (
                      <div className="mt-3 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-6">
                        <MyDatePicker
                          defaultValue={building_date_3}
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
                              value={
                                building_type_3 || "একটি অপশন সিলেক্ট করুন"
                              }
                              selected
                            >
                              {building_type_3 || "একটি অপশন সিলেক্ট করুন"}
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
                              value={
                                building_condition_3 || "একটি অপশন সিলেক্ট করুন"
                              }
                              selected
                            >
                              {building_condition_3 || "একটি অপশন সিলেক্ট করুন"}
                            </option>
                            <option value="ভালো">ভালো</option>
                            <option value="জরাজীর্ণ">জরাজীর্ণ</option>
                            <option value="পরিত্যাক্ত">পরিত্যাক্ত</option>
                          </Field>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}

                    {buildings > 3 || buildingNumber > 3 ? (
                      <div className="mt-3 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-6">
                        <MyDatePicker
                          defaultValue={building_date_4}
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
                              value={
                                building_type_4 || "একটি অপশন সিলেক্ট করুন"
                              }
                              selected
                            >
                              {building_type_4 || "একটি অপশন সিলেক্ট করুন"}
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
                              value={
                                building_condition_4 || "একটি অপশন সিলেক্ট করুন"
                              }
                              selected
                            >
                              {building_condition_4 || "একটি অপশন সিলেক্ট করুন"}
                            </option>
                            <option value="ভালো">ভালো</option>
                            <option value="জরাজীর্ণ">জরাজীর্ণ</option>
                            <option value="পরিত্যাক্ত">পরিত্যাক্ত</option>
                          </Field>
                        </div>
                      </div>
                    ) : (
                      ""
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
                          value={
                            separated_nursery_class || "একটি অপশন সিলেক্ট করুন"
                          }
                          selected
                        >
                          {separated_nursery_class || "একটি অপশন সিলেক্ট করুন"}
                        </option>
                        <option value="আছে">আছে</option>
                        <option value="নেই">নেই</option>
                      </Field>
                    </div>

                    <div className="mb-4">
                      <label className="font-semibold" htmlFor="border_wall">
                        সীমানা প্রাচীর*
                      </label>
                      <Field
                        defaultValue={infrastructureBorderWall.wall}
                        value={borderWall}
                        onChange={handleBorderWallChange}
                        className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                        as="select"
                        name="school.infrastructure.border_wall.wall"
                        id="border_wall"
                      >
                        <option
                          className="text-gray-300"
                          value={
                            infrastructureBorderWall.wall ||
                            "একটি অপশন সিলেক্ট করুন"
                          }
                          selected
                        >
                          {infrastructureBorderWall.wall ||
                            "একটি অপশন সিলেক্ট করুন"}
                        </option>
                        <option value="আছে">আছে</option>
                        <option value="নেই">নেই</option>
                      </Field>
                    </div>
                    {borderWall === "আছে" ||
                    infrastructureBorderWall.wall === "আছে" ? (
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
                            value={
                              infrastructureBorderWall.funding_type ||
                              "একটি অপশন সিলেক্ট করুন"
                            }
                            selected
                          >
                            {infrastructureBorderWall.funding_type ||
                              "একটি অপশন সিলেক্ট করুন"}
                          </option>
                          <option value="ডিপিই">ডিপিই</option>
                          <option value="উপজেলা">জেলা পরিষদ</option>
                          <option value="অন্যান্য">অন্যান্য</option>
                        </Field>
                      </div>
                    ) : (
                      ""
                    )}

                    {borderWall === "আছে" && (
                      <MyDatePicker
                        defaultValue={infrastructureBorderWall.founded_date}
                        label="সীমানা প্রাচীর নির্মাণের সন"
                        name="school.infrastructure.border_wall.founded_date"
                      />
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
                          value={wash_block || "একটি অপশন সিলেক্ট করুন"}
                          selected
                        >
                          {wash_block || "একটি অপশন সিলেক্ট করুন"}
                        </option>
                        <option value="আছে">আছে</option>
                        <option value="নেই">নেই</option>
                      </Field>
                    </div>

                    {washBlock === "আছে" || wash_block === "আছে" ? (
                      <MyDatePicker
                        defaultValue={wash_block_founded_date}
                        label="ওয়াশ ব্লক নির্মাণের সন"
                        name="school.infrastructure.wash_block_founded_date"
                      />
                    ) : (
                      ""
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
                                value={shahid_minar || "একটি অপশন সিলেক্ট করুন"}
                                selected
                              >
                                {shahid_minar || "একটি অপশন সিলেক্ট করুন"}
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
                                value={
                                  freedom_fight_corner ||
                                  "একটি অপশন সিলেক্ট করুন"
                                }
                                selected
                              >
                                {freedom_fight_corner ||
                                  "একটি অপশন সিলেক্ট করুন"}
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
                                value={rasel_corner || "একটি অপশন সিলেক্ট করুন"}
                                selected
                              >
                                {rasel_corner || "একটি অপশন সিলেক্ট করুন"}
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
                                value={garden || "একটি অপশন সিলেক্ট করুন"}
                                selected
                              >
                                {garden || "একটি অপশন সিলেক্ট করুন"}
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
                                value={internet}
                                onChange={handleChange}
                                renderValue={(selected) => selected.join(", ")}
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
                              ল্যাপটপ সংখ্যা*
                            </label>
                            <input
                              placeholder="ল্যাপটপ সংখ্যা দিন"
                              defaultValue={fetchedLaptop.total}
                              name="school.infrastructure.others.laptop.total"
                              id="laptop_number"
                              onChange={handleLaptopChange}
                              type="number"
                              className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                            />
                          </div>
                          {laptop > 1 || fetchedLaptop.total > 1 ? (
                            <NumberField
                              defaultValue={fetchedLaptop.actives}
                              placeholder={"সচল ল্যাপটপের সংখ্যা দিন"}
                              label={"সচল ল্যাপটপের সংখ্যা"}
                              name={
                                "school.infrastructure.others.laptop.actives"
                              }
                            />
                          ) : (
                            ""
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
                              placeholder="মাল্টিমিডিয়া সংখ্যা দিন"
                              name="school.infrastructure.others.multimedia.total"
                              id="multimedia_number"
                              onChange={handleMultimediaChange}
                              defaultValue={fetchedMultimedia.total}
                              type="number"
                              className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                            />
                          </div>
                          {multimedia > 1 || fetchedMultimedia.total > 1 ? (
                            <NumberField
                              placeholder={"সচল মাল্টিমিডিয়ার সংখ্যা দিন"}
                              label={"সচল  সংখ্যা"}
                              defaultValue={fetchedMultimedia.actives}
                              name={
                                "school.infrastructure.others.multimedia.actives"
                              }
                            />
                          ) : (
                            ""
                          )}
                        </div>

                        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4 mt-4">
                          <div className="mb-4">
                            <label
                              className="font-semibold"
                              htmlFor="piano_number"
                            >
                              পিয়ানো সংখ্যা*
                            </label>
                            <input
                              placeholder="পিয়ানো সংখ্যা দিন"
                              name="school.infrastructure.others.piano.total"
                              id="piano_number"
                              onChange={handlePianoChange}
                              defaultValue={fetchedPiano.total}
                              type="number"
                              className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                            />
                          </div>
                          {piano > 1 || fetchedPiano.total > 1 ? (
                            <NumberField
                              defaultValue={fetchedPiano.actives}
                              placeholder={"সচল পিয়ানো সংখ্যা দিন"}
                              label={"সচল পিয়ানো সংখ্যা"}
                              name={
                                "school.infrastructure.others.piano.actives"
                              }
                            />
                          ) : (
                            ""
                          )}
                        </div>

                        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-6">
                          <div className="my-4">
                            <label
                              className="font-semibold"
                              htmlFor={`electricity`}
                            >
                              বিদ্যুৎ সংযোগ*
                            </label>
                            <Field
                              className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                              as="select"
                              name={`school.infrastructure.others.electricity_connection`}
                              id={`electricity`}
                            >
                              <option
                                className="text-gray-300"
                                value={
                                  electricity_connection ||
                                  "একটি অপশন সিলেক্ট করুন"
                                }
                                selected
                              >
                                {electricity_connection ||
                                  "একটি অপশন সিলেক্ট করুন"}
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
                              টিউবওয়েল সংখ্যা*
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

                        {tubeWell >= 1 || tube_wells >= 1 ? (
                          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-6">
                            <div className="mb-4">
                              <label
                                className="font-semibold"
                                htmlFor={`tubewell_condition`}
                              >
                                টিউবওয়েল এর বর্তমান অবস্থা*
                              </label>
                              <Field
                                className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                                as="select"
                                name={`school.infrastructure.water.tube_wells_condition`}
                                id={`tubewell_condition`}
                              >
                                <option
                                  className="text-gray-300"
                                  value={
                                    tube_wells_condition ||
                                    "একটি অপশন সিলেক্ট করুন"
                                  }
                                  selected
                                >
                                  {tube_wells_condition ||
                                    "একটি অপশন সিলেক্ট করুন"}
                                </option>
                                <option value="ভালো">ভালো</option>
                                <option value="মেরামতযোগ্য">মেরামতযোগ্য</option>
                              </Field>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}

                        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4 mt-4">
                          <div className="mb-4">
                            <label
                              className="font-semibold"
                              htmlFor="deep_tubewell_number"
                            >
                              ডিপ টিউবওয়েল সংখ্যা*
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

                        {deepTubeWell >= 1 || deep_tube_wells >= 1 ? (
                          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-6">
                            <div className="mb-4">
                              <label
                                className="font-semibold"
                                htmlFor={`deep_tubewell_condition`}
                              >
                                ডিপ টিউবওয়েল এর বর্তমান অবস্থা*
                              </label>
                              <Field
                                defaultValue={deep_tube_wells_condition}
                                className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                                as="select"
                                name={`school.infrastructure.water.deep_tube_wells_condition`}
                                id={`deep_tubewell_condition`}
                              >
                                <option
                                  className="text-gray-300"
                                  value={
                                    deep_tube_wells_condition ||
                                    "একটি অপশন সিলেক্ট করুন"
                                  }
                                  selected
                                >
                                  {deep_tube_wells_condition ||
                                    "একটি অপশন সিলেক্ট করুন"}
                                </option>
                                <option value="ভালো">ভালো</option>
                                <option value="মেরামতযোগ্য">মেরামতযোগ্য</option>
                              </Field>
                            </div>
                          </div>
                        ) : (
                          ""
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
                        value={is_registered || "একটি অপশন সিলেক্ট করুন"}
                        selected
                      >
                        {is_registered || "একটি অপশন সিলেক্ট করুন"}
                      </option>
                      <option value="হ্যাঁ">হ্যাঁ</option>
                      <option value="না">না</option>
                    </Field>
                  </div>

                  {registration === "হ্যাঁ" || is_registered === "হ্যাঁ" ? (
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
                          value={
                            registration_ownership || "একটি অপশন সিলেক্ট করুন"
                          }
                          selected
                        >
                          {registration_ownership || "একটি অপশন সিলেক্ট করুন"}
                        </option>
                        <option value="ডিপিই">ডিপিই</option>
                        <option value="অন্যান্য">অন্যান্য</option>
                      </Field>
                    </div>
                  ) : (
                    ""
                  )}
                  <NumberField
                    defaultValue={khatian_number}
                    name="school.land.khatian_number"
                    label="খতিয়ান নং"
                    placeholder="খতিয়ান নং দিন"
                  />
                  <NumberField
                    defaultValue={dag_number}
                    name="school.land.dag_number"
                    label="দাগ নং"
                    placeholder="দাগ নং দিন"
                  />
                  <NumberField
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
                        value={is_namjaried || "একটি অপশন সিলেক্ট করুন"}
                        selected
                      >
                        {is_namjaried || "একটি অপশন সিলেক্ট করুন"}
                      </option>
                      <option value="হ্যাঁ">হ্যাঁ</option>
                      <option value="না">না</option>
                    </Field>
                  </div>
                  {namjari === "হ্যাঁ" || is_namjaried === "হ্যাঁ" ? (
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
                          value={namjari_ownership || "একটি অপশন সিলেক্ট করুন"}
                          selected
                        >
                          {namjari_ownership || "একটি অপশন সিলেক্ট করুন"}
                        </option>
                        <option value="ডিপিই">ডিপিই</option>
                        <option value="অন্যান্য">অন্যান্য</option>
                      </Field>
                    </div>
                  ) : (
                    ""
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
                        value={is_cased || "একটি অপশন সিলেক্ট করুন"}
                        selected
                      >
                        {is_cased || "একটি অপশন সিলেক্ট করুন"}
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
                        value={taxt_condition || "একটি অপশন সিলেক্ট করুন"}
                        selected
                      >
                        {taxt_condition || "একটি অপশন সিলেক্ট করুন"}
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
                    defaultValue={stipend_year}
                    className="h-[44px]"
                    options={stipendYearOptions}
                    label={"সর্বশেষ প্রান্তিকের বছর"}
                    placeholder={"একটি বছর সিলেক্ট করুন"}
                    onChange={stipendYearSelectChange}
                    value={stipendYearSelectedOption}
                  />
                  <div className="mb-4">
                    <label className="font-semibold" htmlFor={"latest_season"}>
                      সর্বশেষ প্রান্তিকের মৌসুম
                    </label>
                    <Field
                      className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]"
                      as="select"
                      name={"school.stipend.latest_season"}
                      id={"latest_season"}
                    >
                      <option
                        className="text-gray-300"
                        value={latest_season || "একটি অপশন সিলেক্ট করুন"}
                        selected
                      >
                        {latest_season || "একটি অপশন সিলেক্ট করুন"}
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
                    label="উপবৃত্তির চাহিদা"
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
                      {schoolDevelopment.map((budget, index) => (
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
                                defaultValue={
                                  budget.name || "একটি অপশন সিলেক্ট করুন"
                                }
                              >
                                <option className="text-gray-300" value="">
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
                                defaultValue={
                                  budget.year || "একটি অপশন সিলেক্ট করুন"
                                }
                              >
                                <option className="text-gray-300" value="">
                                  একটি অপশন সিলেক্ট করুন
                                </option>
                                <option value={"2014-2015"}>2014-2015</option>
                                <option value={"2015-2016"}>2015-2016</option>
                                <option value={"2016-2017"}>2016-2017</option>
                                <option value={"2017-2018"}>2017-2018</option>
                                <option value={"2018-2019"}>2018-2019</option>
                                <option value={"2019-2020"}>2019-2020</option>
                                <option value={"2020-2021"}>2020-2021</option>
                                <option value={"2021-2022"}>2021-2022</option>
                                <option value={"2022-2023"}>2022-2023</option>
                              </Field>
                            </div>
                            <NumberField
                              name={`budgets.${index}.amount`}
                              label="অর্থের পরিমান"
                              placeholder="অর্থের পরিমান লিখুন"
                              defaultValue={budget.amount}
                            />
                          </div>
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
                        {teacherSalary.map((teacher, index) => (
                          <div key={index}>
                            <h3 className="mt-8 text-lg text-[#008B4C] font-semibold">
                              শিক্ষক {index + 1}
                            </h3>
                            <div className="pt-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4">
                              <TextField
                                name={`salary.${index}.name`}
                                label="শিক্ষকের নাম"
                                placeholder="শিক্ষকের নাম লিখুন"
                                defaultValue={teacher.name}
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
                                  defaultValue={
                                    teacher.designation ||
                                    "একটি অপশন সিলেক্ট করুন"
                                  }
                                >
                                  <option className="text-gray-300" value="">
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
                                defaultValue={teacher.educational_qualification}
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
                                  defaultValue={
                                    teacher.divisional_training ||
                                    "একটি অপশন সিলেক্ট করুন"
                                  }
                                >
                                  <option className="text-gray-300" value="">
                                    একটি অপশন সিলেক্ট করুন
                                  </option>
                                  <option value="ডিপিএড">ডিপিএড</option>
                                  <option value="সিইএনএড">সিইএনএড</option>
                                  <option value="বিটিপিটি">বিটিপিটি</option>
                                </Field>
                              </div>
                              <MyDatePicker
                                name={`salary.${index}.date_of_birth`}
                                label="জন্ম তারিখ"
                                defaultValue={teacher.date_of_birth}
                              />
                              <MyDatePicker
                                name={`salary.${index}.first_joining_date`}
                                label="প্রথম যোগদানের তারিখ"
                                defaultValue={teacher.first_joining_date}
                              />
                              <MyDatePicker
                                name={`salary.${index}.mentioned_post_joining_date`}
                                label="উক্ত পদে যোগদানের তারিখ"
                                defaultValue={
                                  teacher.mentioned_post_joining_date
                                }
                              />
                              <MyDatePicker
                                name={`salary.${index}.this_school_joining_date`}
                                label="এই বিদ্যালয়ে যোগদানের তারিখ"
                                defaultValue={teacher.this_school_joining_date}
                              />
                              <NumberField
                                name={`salary.${index}.sallary_scale`}
                                label="বেতন স্কেল"
                                placeholder="বেতন স্কেল দিন"
                                defaultValue={teacher.sallary_scale}
                              />
                              <NumberField
                                name={`salary.${index}.main_sallary`}
                                label="মূল বেতন"
                                placeholder="মূল বেতন দিন"
                                defaultValue={teacher.main_sallary}
                              />
                              <NumberField
                                name={`salary.${index}.educational_allowance`}
                                label="শিক্ষা ভাতা"
                                placeholder="শিক্ষা ভাতার পরিমান দিন"
                                defaultValue={teacher.educational_allowance}
                              />
                              <NumberField
                                name={`salary.${index}.bank_account_no`}
                                label="ব্যাংক হিসাব নং"
                                placeholder="ব্যাংক হিসাব নং দিন"
                                defaultValue={teacher.bank_account_no}
                              />
                              <NumberField
                                name={`salary.${index}.gpf`}
                                label="জিপিএফ নং"
                                placeholder="জিপিএফ নং দিন"
                                defaultValue={teacher.gpf}
                              />
                              <NumberField
                                name={`salary.${index}.mobile_number`}
                                label="সক্রিয় মোবাইল নং"
                                placeholder="সক্রিয় মোবাইল নং দিন"
                                defaultValue={teacher.mobile_number}
                              />
                              <NumberField
                                name={`salary.${index}.current_year_occasional_vacation`}
                                label="চলতি বছরে মোট নৈমিত্তিক ছুটি"
                                placeholder="চলতি বছরে মোট নৈমিত্তিক ছুটি সংখ্যা দিন"
                                defaultValue={
                                  teacher.current_year_occasional_vacation
                                }
                              />
                              <ImageInput
                                name={`salary.${index}.signature`}
                                label="স্বাক্ষর"
                                placeholder="সাক্ষর দিন"
                              />
                            </div>
                          </div>
                        ))}
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
                      {teacherVacations.map((vacation, index) => (
                        <div key={index}>
                          <div className="pt-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4">
                            <TextField
                              name={`vacations.${index}.teacher_name`}
                              label="শিক্ষকের নাম"
                              placeholder="শিক্ষকের নাম লিখুন"
                              defaultValue={vacation.teacher_name}
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
                                  value={
                                    vacation.type || "একটি অপশন সিলেক্ট করুন"
                                  }
                                >
                                  {vacation.type || "একটি অপশন সিলেক্ট করুন"}
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
                              defaultValue={vacation.start_date}
                            />
                            <MyDatePicker
                              name={`vacations.${index}.end_date`}
                              label="ছুটি শেষ"
                              defaultValue={vacation.end_date}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </FieldArray>
              </DataDropdown>
              <DataDropdown
                title="অননুমোদিত শিক্ষক তথ্য"
                itemKey={"absent_teacher"}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              >
                <div className="mt-4">
                  <FieldArray name="unauthorized_teacher">
                    {(arrayHelpers) => (
                      <>
                        {unauthorized_teacher.map((teacher, index) => (
                          <div
                            className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4"
                            key={index}
                          >
                            <TextField
                              defaultValue={teacher.name}
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
                                  selected
                                  value={
                                    teacher.designation ||
                                    "একটি অপশন সিলেক্ট করুন"
                                  }
                                >
                                  {teacher.designation ||
                                    "একটি অপশন সিলেক্ট করুন"}
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
                              defaultValue={teacher.last_present_date}
                            />
                          </div>
                        ))}
                      </>
                    )}
                  </FieldArray>
                </div>
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
                        {studentSurveyTotal.map((survey_total, index) => (
                          <div
                            key={index}
                            className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4"
                          >
                            <NumberField
                              name={`survey_total.${index}.boys`}
                              label={"বালক"}
                              placeholder={"বালক সংখ্যা দিন"}
                              defaultValue={survey_total.boys}
                            />
                            <NumberField
                              name={`survey_total.${index}.girls`}
                              label={"বালিকা"}
                              placeholder={"বালিকা সংখ্যা দিন"}
                              defaultValue={survey_total.girls}
                            />
                            <NumberField
                              name={`survey_total.${index}.total`}
                              label={"মোট শিক্ষার্থী"}
                              placeholder={"মোট শিক্ষার্থী সংখ্যা দিন"}
                              defaultValue={survey_total.total}
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
                        {studentSurveyAdmitted.map((survey_admitted, index) => (
                          <div
                            key={index}
                            className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4"
                          >
                            <NumberField
                              name={`survey_admitted.${index}.boys`}
                              label={"বালক"}
                              placeholder={"বালক সংখ্যা দিন"}
                              defaultValue={survey_admitted.boys}
                            />
                            <NumberField
                              name={`survey_admitted.${index}.girls`}
                              label={"বালিকা"}
                              placeholder={"বালিকা সংখ্যা দিন"}
                              defaultValue={survey_admitted.girls}
                            />
                            <NumberField
                              name={`survey_admitted.${index}.total`}
                              label={"মোট শিক্ষার্থী"}
                              placeholder={"মোট শিক্ষার্থী সংখ্যা দিন"}
                              defaultValue={survey_admitted.total}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </FieldArray>

                  <FieldArray name="survey_admitted_to_other_school">
                    {() => (
                      <div>
                        <h3 className="mb-4 mt-6 text-lg text-[#008B4C] font-semibold">
                          অন্যান্য বিদ্যালয়ে ভর্তিকৃত
                        </h3>
                        {studentSurveyAdmittedToOthersSchool.map(
                          (survey_admitted_to_other_school, index) => (
                            <div
                              key={index}
                              className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4"
                            >
                              <NumberField
                                name={`survey_admitted_to_other_school.${index}.boys`}
                                label={"বালক"}
                                placeholder={"বালক সংখ্যা দিন"}
                                defaultValue={
                                  survey_admitted_to_other_school.boys
                                }
                              />
                              <NumberField
                                name={`survey_admitted_to_other_school.${index}.girls`}
                                label={"বালিকা"}
                                placeholder={"বালিকা সংখ্যা দিন"}
                                defaultValue={
                                  survey_admitted_to_other_school.girls
                                }
                              />
                              <NumberField
                                name={`survey_admitted_to_other_school.${index}.total`}
                                label={"মোট শিক্ষার্থী"}
                                placeholder={"মোট শিক্ষার্থী সংখ্যা দিন"}
                                defaultValue={
                                  survey_admitted_to_other_school.total
                                }
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
                        {studentSurveyUnAdmitted.map(
                          (survey_unadmitted, index) => (
                            <div
                              key={index}
                              className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4"
                            >
                              <NumberField
                                name={`survey_unadmitted.${index}.boys`}
                                label={"বালক"}
                                placeholder={"বালক সংখ্যা দিন"}
                                defaultValue={survey_unadmitted.boys}
                              />
                              <NumberField
                                name={`survey_unadmitted.${index}.girls`}
                                label={"বালিকা"}
                                placeholder={"বালিকা সংখ্যা দিন"}
                                defaultValue={survey_unadmitted.girls}
                              />
                              <NumberField
                                name={`survey_unadmitted.${index}.total`}
                                label={"মোট শিক্ষার্থী"}
                                placeholder={"মোট শিক্ষার্থী সংখ্যা দিন"}
                                defaultValue={survey_unadmitted.total}
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
                              {nursery_four_plus.map(
                                (nursery_four_plus, index) => (
                                  <div key={index}>
                                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4">
                                      {/* data for muslim students */}
                                      <NumberField
                                        name={`nursery_four_plus.${index}.muslim_boy_student`}
                                        label="মুসলিম ছাত্র"
                                        placeholder="ছাত্র সংখ্যা দিন"
                                        defaultValue={
                                          nursery_four_plus.muslim_boy_student
                                        }
                                      />
                                      <NumberField
                                        name={`nursery_four_plus.${index}.muslim_girl_student`}
                                        label="মুসলিম ছাত্রী"
                                        placeholder="ছাত্রী সংখ্যা দিন"
                                        defaultValue={
                                          nursery_four_plus.muslim_girl_student
                                        }
                                      />
                                      <NumberField
                                        name={`nursery_four_plus.${index}.muslim_total_student`}
                                        label="মোট মুসলিম শিক্ষার্থী"
                                        placeholder="মোট সংখ্যা দিন"
                                        defaultValue={
                                          nursery_four_plus.muslim_total_student
                                        }
                                      />

                                      {/* data for hindu students */}
                                      <NumberField
                                        name={`nursery_four_plus.${index}.hindu_boy_student`}
                                        label="হিন্দু ছাত্র"
                                        placeholder="ছাত্র সংখ্যা দিন"
                                        defaultValue={
                                          nursery_four_plus.hindu_boy_student
                                        }
                                      />
                                      <NumberField
                                        name={`nursery_four_plus.${index}.hindu_girl_student`}
                                        label="হিন্দু ছাত্রী"
                                        placeholder="ছাত্রী সংখ্যা দিন"
                                        defaultValue={
                                          nursery_four_plus.hindu_girl_student
                                        }
                                      />
                                      <NumberField
                                        name={`nursery_four_plus.${index}.hindu_total_student`}
                                        label="মোট হিন্দু শিক্ষার্থী"
                                        placeholder="মোট সংখ্যা দিন"
                                        defaultValue={
                                          nursery_four_plus.hindu_total_student
                                        }
                                      />

                                      {/* data for total students */}
                                      <NumberField
                                        name={`nursery_four_plus.${index}.total_boy_student`}
                                        label="মোট ছাত্র"
                                        placeholder="ছাত্র সংখ্যা দিন"
                                        defaultValue={
                                          nursery_four_plus.total_boy_student
                                        }
                                      />
                                      <NumberField
                                        name={`nursery_four_plus.${index}.total_girl_student`}
                                        label="মোট ছাত্রী"
                                        placeholder="ছাত্রী সংখ্যা দিন"
                                        defaultValue={
                                          nursery_four_plus.total_girl_student
                                        }
                                      />
                                      <NumberField
                                        name={`nursery_four_plus.${index}.total_student`}
                                        label="মোট শিক্ষার্থী"
                                        placeholder="মোট সংখ্যা দিন"
                                        defaultValue={
                                          nursery_four_plus.total_student
                                        }
                                      />

                                      <NumberField
                                        name={`nursery_four_plus.${index}.special_demanded_student`}
                                        label="বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী"
                                        placeholder="মোট সংখ্যা দিন"
                                        defaultValue={
                                          nursery_four_plus.special_demanded_student
                                        }
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
                              {nursery_five_plus.map((nursery, index) => (
                                <div key={index}>
                                  <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4">
                                    {/* data for muslim students */}
                                    <NumberField
                                      name={`nursery_five_plus.${index}.muslim_boy_student`}
                                      label="মুসলিম ছাত্র"
                                      placeholder="ছাত্র সংখ্যা দিন"
                                      defaultValue={nursery.muslim_boy_student}
                                    />
                                    <NumberField
                                      name={`nursery_five_plus.${index}.muslim_girl_student`}
                                      label="মুসলিম ছাত্রী"
                                      placeholder="ছাত্রী সংখ্যা দিন"
                                      defaultValue={nursery.muslim_girl_student}
                                    />
                                    <NumberField
                                      name={`nursery_five_plus.${index}.muslim_total_student`}
                                      label="মোট মুসলিম শিক্ষার্থী"
                                      placeholder="মোট শিক্ষার্থী সংখ্যা দিন"
                                      defaultValue={
                                        nursery.muslim_total_student
                                      }
                                    />

                                    {/* data for hindu students */}
                                    <NumberField
                                      name={`nursery_five_plus.${index}.hindu_boy_student`}
                                      label="হিন্দু ছাত্র"
                                      placeholder="ছাত্র সংখ্যা দিন"
                                      defaultValue={nursery.hindu_boy_student}
                                    />
                                    <NumberField
                                      name={`nursery_five_plus.${index}.hindu_girl_student`}
                                      label="হিন্দু ছাত্রী"
                                      placeholder="ছাত্রী সংখ্যা দিন"
                                      defaultValue={nursery.hindu_girl_student}
                                    />
                                    <NumberField
                                      name={`nursery_five_plus.${index}.hindu_total_student`}
                                      label="মোট হিন্দু শিক্ষার্থী"
                                      placeholder="মোট শিক্ষার্থী সংখ্যা দিন"
                                      defaultValue={nursery.hindu_total_student}
                                    />

                                    {/* data for total students */}
                                    <NumberField
                                      name={`nursery_five_plus.${index}.total_boy_student`}
                                      label="মোট ছাত্র"
                                      placeholder="ছাত্র সংখ্যা দিন"
                                      defaultValue={nursery.total_boy_student}
                                    />
                                    <NumberField
                                      name={`nursery_five_plus.${index}.total_girl_student`}
                                      label="মোট ছাত্রী"
                                      placeholder="ছাত্রী সংখ্যা দিন"
                                      defaultValue={nursery.total_girl_student}
                                    />
                                    <NumberField
                                      name={`nursery_five_plus.${index}.total_student`}
                                      label="মোট শিক্ষার্থী"
                                      placeholder="মোট শিক্ষার্থী সংখ্যা দিন"
                                      defaultValue={nursery.total_student}
                                    />

                                    <NumberField
                                      name={`nursery_five_plus.${index}.special_demanded_student`}
                                      label="বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী"
                                      placeholder="মোট শিক্ষার্থী সংখ্যা দিন"
                                      defaultValue={
                                        nursery.special_demanded_student
                                      }
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
                          {({}) => (
                            <div>
                              {class_one.map((classItem, index) => (
                                <div key={index}>
                                  <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4">
                                    {/* data for muslim students */}
                                    <NumberField
                                      name={`class_one.${index}.muslim_boy_student`}
                                      label="মুসলিম ছাত্র"
                                      placeholder="ছাত্র সংখ্যা দিন"
                                      defaultValue={
                                        classItem.muslim_boy_student
                                      }
                                    />
                                    <NumberField
                                      name={`class_one.${index}.muslim_girl_student`}
                                      label="মুসলিম ছাত্রী"
                                      placeholder="ছাত্রী সংখ্যা দিন"
                                      defaultValue={
                                        classItem.muslim_girl_student
                                      }
                                    />
                                    <NumberField
                                      name={`class_one.${index}.muslim_total_student`}
                                      label="মোট মুসলিম শিক্ষার্থী"
                                      placeholder="মোট শিক্ষার্থী সংখ্যা দিন"
                                      defaultValue={
                                        classItem.muslim_total_student
                                      }
                                    />

                                    {/* data for hindu students */}
                                    <NumberField
                                      name={`class_one.${index}.hindu_boy_student`}
                                      label="হিন্দু ছাত্র"
                                      placeholder="ছাত্র সংখ্যা দিন"
                                      defaultValue={classItem.hindu_boy_student}
                                    />
                                    <NumberField
                                      name={`class_one.${index}.hindu_girl_student`}
                                      label="হিন্দু ছাত্রী"
                                      placeholder="ছাত্রী সংখ্যা দিন"
                                      defaultValue={
                                        classItem.hindu_girl_student
                                      }
                                    />
                                    <NumberField
                                      name={`class_one.${index}.hindu_total_student`}
                                      label="মোট হিন্দু শিক্ষার্থী"
                                      placeholder="মোট শিক্ষার্থী সংখ্যা দিন"
                                      defaultValue={
                                        classItem.hindu_total_student
                                      }
                                    />

                                    {/* data for total students */}
                                    <NumberField
                                      name={`class_one.${index}.total_boy_student`}
                                      label="মোট ছাত্র"
                                      placeholder="ছাত্র সংখ্যা দিন"
                                      defaultValue={classItem.total_boy_student}
                                    />
                                    <NumberField
                                      name={`class_one.${index}.total_girl_student`}
                                      label="মোট ছাত্রী"
                                      placeholder="ছাত্রী সংখ্যা দিন"
                                      defaultValue={
                                        classItem.total_girl_student
                                      }
                                    />
                                    <NumberField
                                      name={`class_one.${index}.total_student`}
                                      label="মোট শিক্ষার্থী"
                                      placeholder="মোট শিক্ষার্থী সংখ্যা দিন"
                                      defaultValue={classItem.total_student}
                                    />

                                    <NumberField
                                      name={`class_one.${index}.special_demanded_student`}
                                      label="বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী"
                                      placeholder="মোট শিক্ষার্থী সংখ্যা দিন"
                                      defaultValue={
                                        classItem.special_demanded_student
                                      }
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
                          {({}) => (
                            <div>
                              {class_two.map((classItem, index) => (
                                <div key={index}>
                                  <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4">
                                    {/* data for muslim students */}
                                    <NumberField
                                      name={`class_two.${index}.muslim_boy_student`}
                                      label="মুসলিম ছাত্র"
                                      placeholder="ছাত্র সংখ্যা দিন"
                                      defaultValue={
                                        classItem.muslim_boy_student
                                      }
                                    />
                                    <NumberField
                                      name={`class_two.${index}.muslim_girl_student`}
                                      label="মুসলিম ছাত্রী"
                                      placeholder="ছাত্রী সংখ্যা দিন"
                                      defaultValue={
                                        classItem.muslim_girl_student
                                      }
                                    />
                                    <NumberField
                                      name={`class_two.${index}.muslim_total_student`}
                                      label="মোট মুসলিম শিক্ষার্থী"
                                      placeholder="মোট সংখ্যা দিন"
                                      defaultValue={
                                        classItem.muslim_total_student
                                      }
                                    />

                                    {/* data for hindu students */}
                                    <NumberField
                                      name={`class_two.${index}.hindu_boy_student`}
                                      label="হিন্দু ছাত্র"
                                      placeholder="ছাত্র সংখ্যা দিন"
                                      defaultValue={classItem.hindu_boy_student}
                                    />
                                    <NumberField
                                      name={`class_two.${index}.hindu_girl_student`}
                                      label="হিন্দু ছাত্রী"
                                      placeholder="ছাত্রী সংখ্যা দিন"
                                      defaultValue={
                                        classItem.hindu_girl_student
                                      }
                                    />
                                    <NumberField
                                      name={`class_two.${index}.hindu_total_student`}
                                      label="মোট হিন্দু শিক্ষার্থী"
                                      placeholder="মোট সংখ্যা দিন"
                                      defaultValue={
                                        classItem.hindu_total_student
                                      }
                                    />

                                    {/* data for total students */}
                                    <NumberField
                                      name={`class_two.${index}.total_boy_student`}
                                      label="মোট ছাত্র"
                                      placeholder="ছাত্র সংখ্যা দিন"
                                      defaultValue={classItem.total_boy_student}
                                    />
                                    <NumberField
                                      name={`class_two.${index}.total_girl_student`}
                                      label="মোট ছাত্রী"
                                      placeholder="ছাত্রী সংখ্যা দিন"
                                      defaultValue={
                                        classItem.total_girl_student
                                      }
                                    />
                                    <NumberField
                                      name={`class_two.${index}.total_student`}
                                      label="মোট শিক্ষার্থী"
                                      placeholder="মোট সংখ্যা দিন"
                                      defaultValue={classItem.total_student}
                                    />

                                    <NumberField
                                      name={`class_two.${index}.special_demanded_student`}
                                      label="বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী"
                                      placeholder="মোট সংখ্যা দিন"
                                      defaultValue={
                                        classItem.special_demanded_student
                                      }
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
                          {({}) => (
                            <div>
                              {class_three.map((classItem, index) => (
                                <div key={index}>
                                  <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4">
                                    {/* data for muslim students */}
                                    <NumberField
                                      name={`class_three.${index}.muslim_boy_student`}
                                      label="মুসলিম ছাত্র"
                                      placeholder="ছাত্র সংখ্যা দিন"
                                      defaultValue={
                                        classItem.muslim_boy_student
                                      }
                                    />
                                    <NumberField
                                      name={`class_three.${index}.muslim_girl_student`}
                                      label="মুসলিম ছাত্রী"
                                      placeholder="ছাত্রী সংখ্যা দিন"
                                      defaultValue={
                                        classItem.muslim_girl_student
                                      }
                                    />
                                    <NumberField
                                      name={`class_three.${index}.muslim_total_student`}
                                      label="মোট মুসলিম শিক্ষার্থী"
                                      placeholder="মোট সংখ্যা দিন"
                                      defaultValue={
                                        classItem.muslim_total_student
                                      }
                                    />

                                    {/* data for hindu students */}
                                    <NumberField
                                      name={`class_three.${index}.hindu_boy_student`}
                                      label="হিন্দু ছাত্র"
                                      placeholder="ছাত্র সংখ্যা দিন"
                                      defaultValue={classItem.hindu_boy_student}
                                    />
                                    <NumberField
                                      name={`class_three.${index}.hindu_girl_student`}
                                      label="হিন্দু ছাত্রী"
                                      placeholder="ছাত্রী সংখ্যা দিন"
                                      defaultValue={
                                        classItem.hindu_girl_student
                                      }
                                    />
                                    <NumberField
                                      name={`class_three.${index}.hindu_total_student`}
                                      label="মোট হিন্দু শিক্ষার্থী"
                                      placeholder="মোট সংখ্যা দিন"
                                      defaultValue={
                                        classItem.hindu_total_student
                                      }
                                    />

                                    {/* data for total students */}
                                    <NumberField
                                      name={`class_three.${index}.total_boy_student`}
                                      label="মোট ছাত্র"
                                      placeholder="ছাত্র সংখ্যা দিন"
                                      defaultValue={classItem.total_boy_student}
                                    />
                                    <NumberField
                                      name={`class_three.${index}.total_girl_student`}
                                      label="মোট ছাত্রী"
                                      placeholder="ছাত্রী সংখ্যা দিন"
                                      defaultValue={
                                        classItem.total_girl_student
                                      }
                                    />
                                    <NumberField
                                      name={`class_three.${index}.total_student`}
                                      label="মোট শিক্ষার্থী"
                                      placeholder="মোট সংখ্যা দিন"
                                      defaultValue={classItem.total_student}
                                    />

                                    <NumberField
                                      name={`class_three.${index}.special_demanded_student`}
                                      label="বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী"
                                      placeholder="মোট সংখ্যা দিন"
                                      defaultValue={
                                        classItem.special_demanded_student
                                      }
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
                              {class_four.map((classItem, index) => (
                                <div key={index}>
                                  <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4">
                                    {/* data for muslim students */}
                                    <NumberField
                                      name={`class_four.${index}.muslim_boy_student`}
                                      label="মুসলিম ছাত্র"
                                      placeholder="ছাত্র সংখ্যা দিন"
                                      defaultValue={
                                        classItem.muslim_boy_student
                                      }
                                    />
                                    <NumberField
                                      name={`class_four.${index}.muslim_girl_student`}
                                      label="মুসলিম ছাত্রী"
                                      placeholder="ছাত্রী সংখ্যা দিন"
                                      defaultValue={
                                        classItem.muslim_girl_student
                                      }
                                    />
                                    <NumberField
                                      name={`class_four.${index}.muslim_total_student`}
                                      label="মোট মুসলিম শিক্ষার্থী"
                                      placeholder="মোট সংখ্যা দিন"
                                      defaultValue={
                                        classItem.muslim_total_student
                                      }
                                    />

                                    {/* data for hindu students */}
                                    <NumberField
                                      name={`class_four.${index}.hindu_boy_student`}
                                      label="হিন্দু ছাত্র"
                                      placeholder="ছাত্র সংখ্যা দিন"
                                      defaultValue={classItem.hindu_boy_student}
                                    />
                                    <NumberField
                                      name={`class_four.${index}.hindu_girl_student`}
                                      label="হিন্দু ছাত্রী"
                                      placeholder="ছাত্রী সংখ্যা দিন"
                                      defaultValue={
                                        classItem.hindu_girl_student
                                      }
                                    />
                                    <NumberField
                                      name={`class_four.${index}.hindu_total_student`}
                                      label="মোট হিন্দু শিক্ষার্থী"
                                      placeholder="মোট সংখ্যা দিন"
                                      defaultValue={
                                        classItem.hindu_total_student
                                      }
                                    />

                                    {/* data for total students */}
                                    <NumberField
                                      name={`class_four.${index}.total_boy_student`}
                                      label="মোট ছাত্র"
                                      placeholder="ছাত্র সংখ্যা দিন"
                                      defaultValue={classItem.total_boy_student}
                                    />
                                    <NumberField
                                      name={`class_four.${index}.total_girl_student`}
                                      label="মোট ছাত্রী"
                                      placeholder="ছাত্রী সংখ্যা দিন"
                                      defaultValue={
                                        classItem.total_girl_student
                                      }
                                    />
                                    <NumberField
                                      name={`class_four.${index}.total_student`}
                                      label="মোট শিক্ষার্থী"
                                      placeholder="মোট সংখ্যা দিন"
                                      defaultValue={classItem.total_student}
                                    />

                                    <NumberField
                                      name={`class_four.${index}.special_demanded_student`}
                                      label="বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী"
                                      placeholder="মোট সংখ্যা দিন"
                                      defaultValue={
                                        classItem.special_demanded_student
                                      }
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
                              {class_five.map((classItem, index) => (
                                <div key={index}>
                                  <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4">
                                    {/* data for muslim students */}
                                    <NumberField
                                      name={`class_five.${index}.muslim_boy_student`}
                                      label="মুসলিম ছাত্র"
                                      placeholder="ছাত্র সংখ্যা দিন"
                                      defaultValue={
                                        classItem.muslim_boy_student
                                      }
                                    />
                                    <NumberField
                                      name={`class_five.${index}.muslim_girl_student`}
                                      label="মুসলিম ছাত্রী"
                                      placeholder="ছাত্রী সংখ্যা দিন"
                                      defaultValue={
                                        classItem.muslim_girl_student
                                      }
                                    />
                                    <NumberField
                                      name={`class_five.${index}.muslim_total_student`}
                                      label="মোট মুসলিম শিক্ষার্থী"
                                      placeholder="মোট সংখ্যা দিন"
                                      defaultValue={
                                        classItem.muslim_total_student
                                      }
                                    />

                                    {/* data for hindu students */}
                                    <NumberField
                                      name={`class_five.${index}.hindu_boy_student`}
                                      label="হিন্দু ছাত্র"
                                      placeholder="ছাত্র সংখ্যা দিন"
                                      defaultValue={classItem.hindu_boy_student}
                                    />
                                    <NumberField
                                      name={`class_five.${index}.hindu_girl_student`}
                                      label="হিন্দু ছাত্রী"
                                      placeholder="ছাত্রী সংখ্যা দিন"
                                      defaultValue={
                                        classItem.hindu_girl_student
                                      }
                                    />
                                    <NumberField
                                      name={`class_five.${index}.hindu_total_student`}
                                      label="মোট হিন্দু শিক্ষার্থী"
                                      placeholder="মোট সংখ্যা দিন"
                                      defaultValue={
                                        classItem.hindu_total_student
                                      }
                                    />

                                    {/* data for total students */}
                                    <NumberField
                                      name={`class_five.${index}.total_boy_student`}
                                      label="মোট ছাত্র"
                                      placeholder="ছাত্র সংখ্যা দিন"
                                      defaultValue={classItem.total_boy_student}
                                    />
                                    <NumberField
                                      name={`class_five.${index}.total_girl_student`}
                                      label="মোট ছাত্রী"
                                      placeholder="ছাত্রী সংখ্যা দিন"
                                      defaultValue={
                                        classItem.total_girl_student
                                      }
                                    />
                                    <NumberField
                                      name={`class_five.${index}.total_student`}
                                      label="মোট শিক্ষার্থী"
                                      placeholder="মোট সংখ্যা দিন"
                                      defaultValue={classItem.total_student}
                                    />

                                    <NumberField
                                      name={`class_five.${index}.special_demanded_student`}
                                      label="বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী"
                                      placeholder="মোট সংখ্যা দিন"
                                      defaultValue={
                                        classItem.special_demanded_student
                                      }
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
                        {studentAsroyonSurvey.map((survery, index) => (
                          <div key={index}>
                            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4">
                              <NumberField
                                defaultValue={survery.survayed_students}
                                name={`asroyon_survey.${index}.survayed_students`}
                                label="মোট জরিপকৃত শিক্ষার্থী"
                                placeholder="শিক্ষার্থী সংখ্যা দিন"
                              />
                              <NumberField
                                defaultValue={
                                  survery.admitted_releted_school_students
                                }
                                name={`asroyon_survey.${index}.admitted_releted_school_students`}
                                label="সংশ্লিষ্ট বিদ্যালয়ে ভর্তিকৃত শিক্ষার্থী"
                                placeholder="শিক্ষার্থী সংখ্যা দিন"
                              />
                              <NumberField
                                defaultValue={survery.unadmitted_students}
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
                disabled={submitLoading}
                type="submit"
                className="px-6 md:py-[10px] py-[6px] md:pt-[15px] pt-[10px] bg-[#008B4C] border border-[#008B4C] hover:bg-[#006f3d] text-white rounded-md font-semibold capitalize mt-5"
              >
                {submitLoading ? (
                  <p className="text-white flex items-center gap-2">
                    <CircularProgress className="btnSpinner" />
                    <span>লোড হচ্ছে...</span>
                  </p>
                ) : (
                  "আপডেট করুন"
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
