"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CustomTabPanel from "@/app/components/CutomTabPanel";
import DataDropdown from "@/app/components/DataDropdown";
import DataGrid from "@/app/components/DataGrid";
import PairedData from "@/app/components/PairedData";
import { CircularProgress } from "@mui/material";
import convertToBengaliNumber from "@/lib/convertToBengaliNumber";
import { AuthContext } from "@/authContext/AuthContext";
import { toast } from "react-toastify";
import Image from "next/image";

const BillDetails = ({ params }) => {
  const [activeItem, setActiveItem] = React.useState("");
  const [billData, setBillData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const { userName, role } = React.useContext(AuthContext);
  const [showVerify, setShowVerify] = React.useState(false);

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  function schoolTabIndexes(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [schoolTabValue, setSchoolTabValue] = React.useState(0);

  const handleSchoolTabValueChange = (event, newValue) => {
    setSchoolTabValue(newValue);
  };

  const [teacherTabValue, setTeacherTabValue] = React.useState(0);

  const handleTeacherTabValueChange = (event, newValue) => {
    setTeacherTabValue(newValue);
  };

  const [studentTabValue, setStudentTabValue] = React.useState(0);
  const handleStudentTabValueChange = (event, newValue) => {
    setStudentTabValue(newValue);
  };

  React.useEffect(() => {
    if (role !== "head-master") {
      if (role === "ueo" && !billData?.isUEOVerified) {
        if (billData?.isAUEOVerified) {
          setShowVerify(true);
        } else {
          setShowVerify(false);
        }
      } else if (role === "aueo" && !billData?.isAUEOVerified) {
        setShowVerify(true);
      } else {
        setShowVerify(false);
      }
    } else {
      setShowVerify(false);
    }
  }, [role, billData]);
  console.log(showVerify);

  React.useEffect(() => {
    const id = params.billId;
    if (userName) {
      setLoading(true);
      const apiUrl = `http://localhost:3000/api/bill-return/get-single`;
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, cluster: userName }),
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
    }
  }, [userName, params]);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <CircularProgress className="spinner" />
      </div>
    );
  }

  if (!billData) {
    return (
      <div className="flex justify-center flex-col gap-6 items-center h-[80vh]">
        <h3 className="text-3xl font-semibold text-center">
          কোন তথ্য পাওয়া যাইনি!
        </h3>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-[5px] pt-[8px] bg-[#008B4C] border border-[#008B4C] hover:bg-[#006f3d] text-white rounded-md font-medium capitalize"
        >
          রিলোড করুন
        </button>
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

  const teacherSalary = teacherData.salary;
  const teacherVacations = teacherData.vacation;
  const unauthorized_teacher = teacherData.unauthorized_teacher;
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
  const studentAsroyonSurvey = studentData.asroyon_survey[0];
  console.log(studentAsroyonSurvey);

  const handleBillVerify = () => {
    const currentDate = new Date().toISOString();
    const aueoUpdateData = { isAUEOVerified: true, updatedDate: currentDate };
    const ueoUpdateData = { isUEOVerified: true, updatedDate: currentDate };
    setLoading(true);
    const apiUrl = "http://localhost:3000/api/bill-return/update";
    fetch(apiUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        updateData: role === "aueo" ? aueoUpdateData : ueoUpdateData,
        id: billData._id,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          toast.success("সফলভাবে এপ্রোভ হয়েছে!");
          setTimeout(() => {
            window.location.reload();
          }, 1300);
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
  };

  return (
    <div id="print-content" className="bg-[#FAFAFA] xl:w-[80%] w-full">
      <h2 className="md:text-2xl text-xl font-semibold md:mb-14 mb-8">
        বিল রিটার্ন বিস্তারিত
      </h2>
      {/* school related data */}
      <div className="flex lg:flex-row flex-col md:gap-8 gap-5">
        <div className="border bg-white shadow-sm rounded-[4px] p-8 w-full">
          <h2 className="md:text-xl text-lg font-semibold md:mb-8">
            বিদ্যালয় সংক্রান্ত তথ্য
          </h2>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                indicatorColor="#000"
                className="text-xl"
                variant="scrollable"
                scrollButtons="auto"
                value={schoolTabValue}
                onChange={handleSchoolTabValueChange}
                aria-label="basic tabs example"
              >
                <Tab label="সাধারণ তথ্য" {...schoolTabIndexes(0)} />
                <Tab label="ভৌত অবকাঠামো তথ্য" {...schoolTabIndexes(1)} />
                <Tab label="ভূমি বিষয়ক তথ্য" {...schoolTabIndexes(2)} />
                <Tab label="উপবৃত্তি সংক্রান্ত তথ্য" {...schoolTabIndexes(3)} />
                <Tab label="সভা সংক্রান্ত তথ্য" {...schoolTabIndexes(4)} />
                <Tab
                  label="উন্নয়ন কার্যক্রম সংক্রান্ত তথ্য"
                  {...schoolTabIndexes(5)}
                />
              </Tabs>
            </Box>
            <CustomTabPanel value={schoolTabValue} index={0}>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4 gap-y-4 pt-6">
                <PairedData label={"বিদ্যালয়ের নাম"} value={schoolName} />
                <PairedData label={"ক্লাস্টার"} value={cluster} />
                <PairedData
                  label={"গ্রাম/মহল্লার নাম"}
                  value={village_moholla}
                />
                <PairedData label={"ওয়ার্ড নাম্বার"} value={word_number} />
                <PairedData label={"ডাকঘর"} value={post_office} />
                <PairedData label={"ইউনিয়ন/পৌরসভা"} value={union_corporation} />
                <PairedData label={"EMIS কোড"} value={emis_code} />
                <PairedData label={"বিদ্যালয়ের ইমেইল"} value={email} />
                <PairedData label={"প্রতিষ্ঠার সন"} value={founded_date} />
                <PairedData label={"গ্রেড"} value={grade} />
                <PairedData label={"শিফট সংখ্যা"} value={shifts} />
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={schoolTabValue} index={1}>
              <div className="pt-6">
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4 gap-y-4">
                  <PairedData label={"ভবন সংখ্যা"} value={buildings} />
                  <PairedData
                    label={"ভবন ১ নির্মাণের সন"}
                    value={building_date_1}
                  />
                  <PairedData label={"ভবন ১ এর ধরন"} value={building_type_1} />
                  <PairedData
                    label={"ভবন ১ এর বর্তমান অবস্থা"}
                    value={building_condition_1}
                  />
                  <PairedData
                    label={"প্রধান শিক্ষকের কক্ষ"}
                    value={headmaster_room}
                  />
                  <PairedData label={"অফিস কক্ষ"} value={office_rooms} />
                  <PairedData label={"শ্রেণী কক্ষ"} value={class_rooms} />
                  <PairedData
                    label={"ব্যবহারযোগ্য শ্রেণী কক্ষ"}
                    value={useable_class_rooms}
                  />
                  <PairedData
                    label={"মাল্টিমিডিয়া কক্ষ"}
                    value={multimedia_rooms}
                  />
                  <PairedData
                    label={"পৃথক শিশু শ্রেণী"}
                    value={separated_nursery_class}
                  />
                  <PairedData
                    label={"সীমানা প্রাচীর"}
                    value={infrastructureBorderWall.walls}
                  />
                  <PairedData
                    label={"সীমানা প্রাচীরের অর্থায়ন ধরন"}
                    value={infrastructureBorderWall.funding_type}
                  />
                  <PairedData
                    label={"সীমানা প্রাচীর নির্মাণের সন"}
                    value={infrastructureBorderWall.founded_date}
                  />
                  <PairedData label={"টয়লেট সংখ্যা"} value={toilets} />
                  <PairedData label={"ওয়াশ ব্লক"} value={wash_block} />
                  <PairedData
                    label={"ওয়াশ ব্লক নির্মাণের সন"}
                    value={wash_block_founded_date}
                  />
                </div>
                <div className="mt-8">
                  <DataDropdown
                    title={"অন্যান্য তথ্য"}
                    itemKey={"othersDataDetails"}
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                  >
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4 gap-y-4 pt-3">
                      <PairedData label={"শহিদ মিনার"} value={shahid_minar} />
                      <PairedData
                        label={"মুক্তিযুদ্ধ কর্নার"}
                        value={freedom_fight_corner}
                      />
                      <PairedData
                        label={"শেখ রাসেল কর্নার"}
                        value={rasel_corner}
                      />
                      <PairedData label={"বাগান/ছাদ বাগান"} value={garden} />
                      <PairedData label={"ইন্টারনেট"} value={internet} />
                      <PairedData
                        label={"ল্যাপটপ সংখ্যা"}
                        value={fetchedLaptop.total}
                      />
                      <PairedData
                        label={"সচল ল্যাপটপের সংখ্যা"}
                        value={fetchedLaptop.actives}
                      />
                      <PairedData
                        label={"মাল্টিমিডিয়া সংখ্যা"}
                        value={fetchedMultimedia.total}
                      />
                      <PairedData
                        label={"সচল মাল্টিমিডিয়া সংখ্যা"}
                        value={fetchedMultimedia.actives}
                      />
                      <PairedData
                        label={"পিয়ানো সংখ্যা"}
                        value={fetchedPiano.total}
                      />
                      <PairedData
                        label={"সচল পিয়ানো সংখ্যা"}
                        value={fetchedPiano.actives}
                      />
                      <PairedData
                        label={"বিদ্যুৎ সংযোগ"}
                        value={electricity_connection}
                      />
                    </div>
                  </DataDropdown>
                </div>
                <div>
                  <DataDropdown
                    title={"পানিয় জল সংক্রান্ত তথ্য"}
                    itemKey={"waterReletadData"}
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                  >
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4 gap-y-4 pt-3">
                      <PairedData
                        label={"টিউবওয়েল সংখ্যা"}
                        value={tube_wells}
                      />
                      <PairedData
                        label={"টিউবওয়েল এর বর্তমান অবস্থা"}
                        value={tube_wells_condition}
                      />
                      <PairedData
                        label={"ডিপ টিউবওয়েল সংখ্যা"}
                        value={deep_tube_wells}
                      />
                      <PairedData
                        label={"ডিপ টিউবওয়েল এর বর্তমান অবস্থা"}
                        value={deep_tube_wells_condition}
                      />
                    </div>
                  </DataDropdown>
                </div>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={schoolTabValue} index={2}>
              {/* land related data */}
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4 gap-y-4 pt-6">
                <PairedData
                  label={"ভূমির পরিমান(শতাংশ)"}
                  value={total_amount}
                />
                <PairedData
                  label={"দখলকৃত ভূমির পরিমান(শতাংশ)"}
                  value={take_overed}
                />
                <PairedData
                  label={"বেদখলকৃত ভূমির পরিমান(শতাংশ)"}
                  value={dispossessed}
                />
                <PairedData
                  label={"রেজিস্টার করা আছে কিনা"}
                  value={is_registered}
                />
                <PairedData
                  label={"রেজিস্ট্রেশন এর মালিকানা"}
                  value={registration_ownership}
                />
                <PairedData label={"খতিয়ান নং"} value={khatian_number} />
                <PairedData label={"দাগ নং"} value={dag_number} />
                <PairedData label={"দলিল নং"} value={dolil_number} />
                <PairedData label={"দলিল সন"} value={dolil_year} />
                <PairedData label={"নামজারি আছে কিনা"} value={is_namjaried} />
                <PairedData
                  label={"নামজারি এর মালিকানা"}
                  value={namjari_ownership}
                />
                <PairedData label={"মামলা আছে কিনা"} value={is_cased} />
                <PairedData label={"ভূমি উন্নয়ন কর"} value={taxt_condition} />
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={schoolTabValue} index={3}>
              {/* stipend related data */}
              <DataGrid>
                <PairedData
                  label={"সর্বশেষ প্রান্তিকের বছর"}
                  value={stipend_year}
                />
                <PairedData
                  label={"সর্বশেষ প্রান্তিকের সময়কাল"}
                  value={latest_season}
                />
                <PairedData
                  label={"সর্বশেষ প্রান্তিকে মোট সুবিধাভোগী"}
                  value={total_consumer}
                />
                <PairedData label={"উপবৃত্তির চাহিদা"} value={demand} />
                <PairedData
                  label={"বিতরণকৃত অর্থের পরিমান"}
                  value={distributed}
                />
              </DataGrid>
            </CustomTabPanel>
            <CustomTabPanel value={schoolTabValue} index={4}>
              {/* conference related data */}
              <DataGrid>
                <PairedData label={"এসএমসি"} value={smc} />
                <PairedData label={"পিটিএ"} value={pta} />
                <PairedData label={"মা-সমাবেশ"} value={mother} />
                <PairedData label={"অভিভাবক-সমাবেশ"} value={guardian} />
                <PairedData label={"উঠান বৈঠক"} value={yard} />
                <PairedData label={"স্টাফ মিটিং"} value={staff_meeting} />
              </DataGrid>
            </CustomTabPanel>
            <CustomTabPanel value={schoolTabValue} index={5}>
              {/* budget related data */}
              <DataGrid>
                <PairedData
                  label={"বরাদ্দের ধরন"}
                  value={schoolDevelopment.type}
                />
                <PairedData label={"অর্থ বছর"} value={schoolDevelopment.year} />
                <PairedData
                  label={"অর্থের পরিমান"}
                  value={schoolDevelopment.amount}
                />
              </DataGrid>
            </CustomTabPanel>
          </Box>
        </div>
        {/* student and teacher related data */}
      </div>

      {/* teacher related data */}
      <div className="flex lg:flex-row flex-col md:gap-8 gap-5 md:mt-8 mt-5">
        <div className="border bg-white shadow-sm rounded-[4px] p-8 w-full">
          <h2 className="md:text-xl text-lg font-semibold md:mb-8">
            শিক্ষক সংক্রান্ত তথ্য
          </h2>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                indicatorColor="#000"
                className="text-xl"
                variant="scrollable"
                scrollButtons="auto"
                value={teacherTabValue}
                onChange={handleTeacherTabValueChange}
                aria-label="basic tabs example"
              >
                <Tab label="সাধারণ তথ্য" {...a11yProps(0)} />
                <Tab label="বেতন সংক্রান্ত তথ্য" {...a11yProps(1)} />
                <Tab label="ছুটি সংক্রান্ত তথ্য" {...a11yProps(2)} />
                <Tab label="অননুমোদিত শিক্ষক তথ্য" {...a11yProps(3)} />
              </Tabs>
            </Box>
            {/* general data */}
            <CustomTabPanel value={teacherTabValue} index={0}>
              <DataGrid>
                <PairedData label={"অনুমোদিত পদ"} value={permitted_post} />
                <PairedData label={"কর্মরত পদ"} value={working_post} />
                <PairedData label={"শূন্য পদ"} value={vacancy} />
                <PairedData
                  label={"কর্মরত শিক্ষক(পুরুষ)"}
                  value={teacher_number}
                />
                <PairedData
                  label={"কর্মরত শিক্ষক(মহিলা)"}
                  value={women_teacher_number}
                />
                <PairedData
                  label={"ছুটি ভোগরত শিক্ষক"}
                  value={vacation_consumers}
                />
              </DataGrid>
            </CustomTabPanel>
            <CustomTabPanel value={teacherTabValue} index={1}>
              {teacherSalary.map((salary, idx) => (
                <div key={idx} className="pt-6">
                  <span className="text-lg font-semibold">
                    শিক্ষক {convertToBengaliNumber(idx + 1)}ঃ
                  </span>
                  <DataGrid>
                    <PairedData label={"শিক্ষকের নাম"} value={salary.name} />
                    <PairedData
                      label={"শিক্ষকের পদবি"}
                      value={salary.designation}
                    />
                    <PairedData
                      label={"সর্বশেষ শিক্ষাগত যোগ্যতা"}
                      value={salary.educational_qualification}
                    />
                    <PairedData
                      label={"বিভাগীয় প্রশিক্ষণ"}
                      value={salary.divisional_training}
                    />
                    <PairedData
                      label={"জন্ম তারিখ"}
                      value={salary.date_of_birth}
                    />
                    <PairedData
                      label={"প্রথম যোগদানের তারিখ"}
                      value={salary.first_joining_date}
                    />
                    <PairedData
                      label={"উক্ত পদে যোগদানের তারিখ"}
                      value={salary.mentioned_post_joining_date}
                    />
                    <PairedData
                      label={"এই বিদ্যালয়ে যোগদানের তারিখ"}
                      value={salary.this_school_joining_date}
                    />
                    <PairedData
                      label={"বেতন স্কেল"}
                      value={salary.sallary_scale}
                    />
                    <PairedData
                      label={"মূল বেতন"}
                      value={salary.main_sallary}
                    />
                    <PairedData
                      label={"শিক্ষা ভাতা"}
                      value={salary.educational_allowance}
                    />
                    <PairedData
                      label={"ব্যাংক হিসাব নং"}
                      value={salary.bank_account_no}
                    />
                    <PairedData label={"জিপিএফ নং"} value={salary.gpf} />
                    <PairedData
                      label={"সক্রিয় মোবাইল নং"}
                      value={salary.mobile_number}
                    />
                    <PairedData
                      label={"চলতি বছরে মোট নৈমিত্তিক ছুটি"}
                      value={salary.current_year_occasional_vacation}
                    />
                    <div className="p-2 pb-[6px] px-3 border border-[#008b4c1a] bg-[#008b4c06] rounded-[4px]">
                      <div className="text-black">
                        <span className="font-medium">স্বাক্ষরঃ </span>
                        <Image
                          className="inline-block ml-3"
                          width={80}
                          height={40}
                          src={salary.signature}
                          alt="signature"
                        ></Image>
                      </div>
                    </div>
                  </DataGrid>
                </div>
              ))}
            </CustomTabPanel>
            <CustomTabPanel value={teacherTabValue} index={2}>
              {/* vacation related data */}
              {teacherVacations.map((vacation, index) => (
                <div key={index} className="pt-6">
                  <span className="text-lg font-semibold">
                    শিক্ষক {convertToBengaliNumber(index + 1)}ঃ
                  </span>
                  <DataGrid>
                    <PairedData
                      label={"শিক্ষকের নাম"}
                      value={vacation.teacher_name}
                    />
                    <PairedData label={"ছুটির ধরন"} value={vacation.type} />
                    <PairedData
                      label={"ছুটি শুরু"}
                      value={vacation.start_date}
                    />
                    <PairedData label={"ছুটি শেষ"} value={vacation.end_date} />
                  </DataGrid>
                </div>
              ))}
            </CustomTabPanel>
            <CustomTabPanel value={teacherTabValue} index={3}>
              <DataGrid>
                <PairedData
                  label={"শিক্ষকের নাম"}
                  value={unauthorized_teacher[0].name}
                />
                <PairedData
                  label={"শিক্ষকের পদবি"}
                  value={unauthorized_teacher[0].designation}
                />
                <PairedData
                  label={"সর্বশেষ উপস্থিতির তারিখ"}
                  value={unauthorized_teacher[0].last_present_date}
                />
              </DataGrid>
            </CustomTabPanel>
          </Box>
        </div>
      </div>

      {/* student related data */}
      <div>
        <div className="flex lg:flex-row flex-col md:gap-8 gap-5 md:mt-8 mt-5">
          <div className=" border bg-white shadow-sm rounded-[4px] p-8 w-full">
            <h2 className="md:text-xl text-lg font-semibold md:mb-8">
              শিক্ষার্থী সংক্রান্ত তথ্য
            </h2>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  indicatorColor="#000"
                  className="text-xl"
                  variant="scrollable"
                  scrollButtons="auto"
                  value={studentTabValue}
                  onChange={handleStudentTabValueChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="জরিপকৃত তথ্য(৪+...১০+)" {...a11yProps(0)} />
                  <Tab label="ছাত্র/ছাত্রী ভর্তি তথ্য" {...a11yProps(1)} />
                  <Tab
                    label="আশ্রয়ন প্রকল্পের জরিপকৃত তথ্য(৪+...১০+)"
                    {...a11yProps(2)}
                  />
                </Tabs>
              </Box>
              <CustomTabPanel value={studentTabValue} index={0}>
                <DataGrid title={"মোট"}>
                  <PairedData label={"বালক"} value={studentSurveyTotal.boys} />
                  <PairedData
                    label={"বালিকা"}
                    value={studentSurveyTotal.girls}
                  />
                  <PairedData
                    label={"মোট শিক্ষার্থী"}
                    value={studentSurveyTotal.total}
                  />
                </DataGrid>
                <DataGrid title={"সংশ্লিষ্ট বিদ্যালয়ে ভর্তিকৃত"}>
                  <PairedData
                    label={"বালক"}
                    value={studentSurveyAdmitted.boys}
                  />
                  <PairedData
                    label={"বালিকা"}
                    value={studentSurveyAdmitted.girls}
                  />
                  <PairedData
                    label={"মোট শিক্ষার্থী"}
                    value={studentSurveyAdmitted.total}
                  />
                </DataGrid>
                <DataGrid title={"অন্যান্য বিদ্যালয়ে ভর্তিকৃত"}>
                  <PairedData
                    label={"বালক"}
                    value={studentSurveyAdmittedToOthersSchool.boys}
                  />
                  <PairedData
                    label={"বালিকা"}
                    value={studentSurveyAdmittedToOthersSchool.girls}
                  />
                  <PairedData
                    label={"মোট শিক্ষার্থী"}
                    value={studentSurveyAdmittedToOthersSchool.total}
                  />
                </DataGrid>
                <DataGrid title={"অভর্তিকৃত"}>
                  <PairedData
                    label={"বালক"}
                    value={studentSurveyUnAdmitted.boys}
                  />
                  <PairedData
                    label={"বালিকা"}
                    value={studentSurveyUnAdmitted.girls}
                  />
                  <PairedData
                    label={"মোট শিক্ষার্থী"}
                    value={studentSurveyUnAdmitted.total}
                  />
                </DataGrid>
              </CustomTabPanel>
              <CustomTabPanel value={studentTabValue} index={1}>
                <div className="mt-6">
                  <DataDropdown
                    title={"শিশু শ্রেণী ৪+"}
                    itemKey={"shishu4"}
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                  >
                    <DataGrid mtZero={true}>
                      <PairedData
                        label={"মুসলিম ছাত্র"}
                        value={nursery_four_plus.muslim_boy_student}
                      />
                      <PairedData
                        label={"মুসলিম ছাত্রী"}
                        value={nursery_four_plus.muslim_girl_student}
                      />
                      <PairedData
                        label={"মোট মুসলিম শিক্ষার্থী"}
                        value={nursery_four_plus.muslim_total_student}
                      />
                      <PairedData
                        label={"হিন্দু ছাত্র"}
                        value={nursery_four_plus.hindu_boy_student}
                      />
                      <PairedData
                        label={"হিন্দু ছাত্রী"}
                        value={nursery_four_plus.hindu_girl_student}
                      />
                      <PairedData
                        label={"মোট হিন্দু শিক্ষার্থী"}
                        value={nursery_four_plus.hindu_total_student}
                      />
                      <PairedData
                        label={"মোট ছাত্র"}
                        value={nursery_four_plus.total_boy_student}
                      />
                      <PairedData
                        label={"মোট ছাত্রী"}
                        value={nursery_four_plus.total_girl_student}
                      />
                      <PairedData
                        label={"মোট শিক্ষার্থী"}
                        value={nursery_four_plus.total_student}
                      />
                      <PairedData
                        label={"বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী"}
                        value={nursery_four_plus.special_demanded_student}
                      />
                    </DataGrid>
                  </DataDropdown>
                  <DataDropdown
                    title={"শিশু শ্রেণী ৫+"}
                    itemKey={"shishu5"}
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                  >
                    <DataGrid mtZero={true}>
                      <PairedData
                        label={"মুসলিম ছাত্র"}
                        value={nursery_five_plus.muslim_boy_student}
                      />
                      <PairedData
                        label={"মুসলিম ছাত্রী"}
                        value={nursery_five_plus.muslim_girl_student}
                      />
                      <PairedData
                        label={"মোট মুসলিম শিক্ষার্থী"}
                        value={nursery_five_plus.muslim_total_student}
                      />
                      <PairedData
                        label={"হিন্দু ছাত্র"}
                        value={nursery_five_plus.hindu_boy_student}
                      />
                      <PairedData
                        label={"হিন্দু ছাত্রী"}
                        value={nursery_five_plus.hindu_girl_student}
                      />
                      <PairedData
                        label={"মোট হিন্দু শিক্ষার্থী"}
                        value={nursery_five_plus.hindu_total_student}
                      />
                      <PairedData
                        label={"মোট ছাত্র"}
                        value={nursery_five_plus.total_boy_student}
                      />
                      <PairedData
                        label={"মোট ছাত্রী"}
                        value={nursery_five_plus.total_girl_student}
                      />
                      <PairedData
                        label={"মোট শিক্ষার্থী"}
                        value={nursery_five_plus.total_student}
                      />
                      <PairedData
                        label={"বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী"}
                        value={nursery_five_plus.special_demanded_student}
                      />
                    </DataGrid>
                  </DataDropdown>
                  <DataDropdown
                    title={"প্রথম শ্রেণি"}
                    itemKey={"classone"}
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                  >
                    <DataGrid mtZero={true}>
                      <PairedData
                        label={"মুসলিম ছাত্র"}
                        value={class_one.muslim_boy_student}
                      />
                      <PairedData
                        label={"মুসলিম ছাত্রী"}
                        value={class_one.muslim_girl_student}
                      />
                      <PairedData
                        label={"মোট মুসলিম শিক্ষার্থী"}
                        value={class_one.muslim_total_student}
                      />
                      <PairedData
                        label={"হিন্দু ছাত্র"}
                        value={class_one.hindu_boy_student}
                      />
                      <PairedData
                        label={"হিন্দু ছাত্রী"}
                        value={class_one.hindu_girl_student}
                      />
                      <PairedData
                        label={"মোট হিন্দু শিক্ষার্থী"}
                        value={class_one.hindu_total_student}
                      />
                      <PairedData
                        label={"মোট ছাত্র"}
                        value={class_one.total_boy_student}
                      />
                      <PairedData
                        label={"মোট ছাত্রী"}
                        value={class_one.total_girl_student}
                      />
                      <PairedData
                        label={"মোট শিক্ষার্থী"}
                        value={class_one.total_student}
                      />
                      <PairedData
                        label={"বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী"}
                        value={class_one.special_demanded_student}
                      />
                    </DataGrid>
                  </DataDropdown>
                  <DataDropdown
                    title={"দ্বিতীয় শ্রেণি"}
                    itemKey={"classtwo"}
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                  >
                    <DataGrid mtZero={true}>
                      <PairedData
                        label={"মুসলিম ছাত্র"}
                        value={class_two.muslim_boy_student}
                      />
                      <PairedData
                        label={"মুসলিম ছাত্রী"}
                        value={class_two.muslim_girl_student}
                      />
                      <PairedData
                        label={"মোট মুসলিম শিক্ষার্থী"}
                        value={class_two.muslim_total_student}
                      />
                      <PairedData
                        label={"হিন্দু ছাত্র"}
                        value={class_two.hindu_boy_student}
                      />
                      <PairedData
                        label={"হিন্দু ছাত্রী"}
                        value={class_two.hindu_girl_student}
                      />
                      <PairedData
                        label={"মোট হিন্দু শিক্ষার্থী"}
                        value={class_two.hindu_total_student}
                      />
                      <PairedData
                        label={"মোট ছাত্র"}
                        value={class_two.total_boy_student}
                      />
                      <PairedData
                        label={"মোট ছাত্রী"}
                        value={class_two.total_girl_student}
                      />
                      <PairedData
                        label={"মোট শিক্ষার্থী"}
                        value={class_two.total_student}
                      />
                      <PairedData
                        label={"বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী"}
                        value={class_two.special_demanded_student}
                      />
                    </DataGrid>
                  </DataDropdown>
                  <DataDropdown
                    title={"তৃতীয় শ্রেণি"}
                    itemKey={"classthree"}
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                  >
                    <DataGrid mtZero={true}>
                      <PairedData
                        label={"মুসলিম ছাত্র"}
                        value={class_three.muslim_boy_student}
                      />
                      <PairedData
                        label={"মুসলিম ছাত্রী"}
                        value={class_three.muslim_girl_student}
                      />
                      <PairedData
                        label={"মোট মুসলিম শিক্ষার্থী"}
                        value={class_three.muslim_total_student}
                      />
                      <PairedData
                        label={"হিন্দু ছাত্র"}
                        value={class_three.hindu_boy_student}
                      />
                      <PairedData
                        label={"হিন্দু ছাত্রী"}
                        value={class_three.hindu_girl_student}
                      />
                      <PairedData
                        label={"মোট হিন্দু শিক্ষার্থী"}
                        value={class_three.hindu_total_student}
                      />
                      <PairedData
                        label={"মোট ছাত্র"}
                        value={class_three.total_boy_student}
                      />
                      <PairedData
                        label={"মোট ছাত্রী"}
                        value={class_three.total_girl_student}
                      />
                      <PairedData
                        label={"মোট শিক্ষার্থী"}
                        value={class_three.total_student}
                      />
                      <PairedData
                        label={"বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী"}
                        value={class_three.special_demanded_student}
                      />
                    </DataGrid>
                  </DataDropdown>
                  <DataDropdown
                    title={"চতুর্থ শ্রেণি"}
                    itemKey={"classfour"}
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                  >
                    <DataGrid mtZero={true}>
                      <PairedData
                        label={"মুসলিম ছাত্র"}
                        value={class_four.muslim_boy_student}
                      />
                      <PairedData
                        label={"মুসলিম ছাত্রী"}
                        value={class_four.muslim_girl_student}
                      />
                      <PairedData
                        label={"মোট মুসলিম শিক্ষার্থী"}
                        value={class_four.muslim_total_student}
                      />
                      <PairedData
                        label={"হিন্দু ছাত্র"}
                        value={class_four.hindu_boy_student}
                      />
                      <PairedData
                        label={"হিন্দু ছাত্রী"}
                        value={class_four.hindu_girl_student}
                      />
                      <PairedData
                        label={"মোট হিন্দু শিক্ষার্থী"}
                        value={class_four.hindu_total_student}
                      />
                      <PairedData
                        label={"মোট ছাত্র"}
                        value={class_four.total_boy_student}
                      />
                      <PairedData
                        label={"মোট ছাত্রী"}
                        value={class_four.total_girl_student}
                      />
                      <PairedData
                        label={"মোট শিক্ষার্থী"}
                        value={class_four.total_student}
                      />
                      <PairedData
                        label={"বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী"}
                        value={class_four.special_demanded_student}
                      />
                    </DataGrid>
                  </DataDropdown>
                  <DataDropdown
                    title={"পঞ্চম শ্রেণি"}
                    itemKey={"classfive"}
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                  >
                    <DataGrid mtZero={true}>
                      <PairedData
                        label={"মুসলিম ছাত্র"}
                        value={class_five.muslim_boy_student}
                      />
                      <PairedData
                        label={"মুসলিম ছাত্রী"}
                        value={class_five.muslim_girl_student}
                      />
                      <PairedData
                        label={"মোট মুসলিম শিক্ষার্থী"}
                        value={class_five.muslim_total_student}
                      />
                      <PairedData
                        label={"হিন্দু ছাত্র"}
                        value={class_five.hindu_boy_student}
                      />
                      <PairedData
                        label={"হিন্দু ছাত্রী"}
                        value={class_five.hindu_girl_student}
                      />
                      <PairedData
                        label={"মোট হিন্দু শিক্ষার্থী"}
                        value={class_five.hindu_total_student}
                      />
                      <PairedData
                        label={"মোট ছাত্র"}
                        value={class_five.total_boy_student}
                      />
                      <PairedData
                        label={"মোট ছাত্রী"}
                        value={class_five.total_girl_student}
                      />
                      <PairedData
                        label={"মোট শিক্ষার্থী"}
                        value={class_five.total_student}
                      />
                      <PairedData
                        label={"বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী"}
                        value={class_five.special_demanded_student}
                      />
                    </DataGrid>
                  </DataDropdown>
                  {/* <DataDropdown
                    title={"ষষ্ঠ শ্রেণি"}
                    itemKey={"classsix"}
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                  >
                    <DataGrid mtZero={true}>
                      <PairedData label={"মুসলিম ছাত্র"} value={"ছুটিশেষ"} />
                      <PairedData label={"মুসলিম ছাত্রী"} value={"ছুটিশেষ"} />
                      <PairedData
                        label={"মোট মুসলিম শিক্ষার্থী"}
                        value={"ছুটিশেষ"}
                      />
                      <PairedData label={"হিন্দু ছাত্র"} value={"ছুটিশেষ"} />
                      <PairedData label={"হিন্দু ছাত্রী"} value={"ছুটিশেষ"} />
                      <PairedData
                        label={"মোট হিন্দু শিক্ষার্থী"}
                        value={"ছুটিশেষ"}
                      />
                      <PairedData label={"মোট ছাত্র"} value={"ছুটিশেষ"} />
                      <PairedData label={"মোট ছাত্রী"} value={"ছুটিশেষ"} />
                      <PairedData label={"মোট শিক্ষার্থী"} value={"ছুটিশেষ"} />
                      <PairedData
                        label={"বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী"}
                        value={"ছুটিশেষ"}
                      />
                    </DataGrid>
                  </DataDropdown>
                  <DataDropdown
                    title={"সপ্তম শ্রেণি"}
                    itemKey={"classseven"}
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                  >
                    <DataGrid mtZero={true}>
                      <PairedData label={"মুসলিম ছাত্র"} value={"ছুটিশেষ"} />
                      <PairedData label={"মুসলিম ছাত্রী"} value={"ছুটিশেষ"} />
                      <PairedData
                        label={"মোট মুসলিম শিক্ষার্থী"}
                        value={"ছুটিশেষ"}
                      />
                      <PairedData label={"হিন্দু ছাত্র"} value={"ছুটিশেষ"} />
                      <PairedData label={"হিন্দু ছাত্রী"} value={"ছুটিশেষ"} />
                      <PairedData
                        label={"মোট হিন্দু শিক্ষার্থী"}
                        value={"ছুটিশেষ"}
                      />
                      <PairedData label={"মোট ছাত্র"} value={"ছুটিশেষ"} />
                      <PairedData label={"মোট ছাত্রী"} value={"ছুটিশেষ"} />
                      <PairedData label={"মোট শিক্ষার্থী"} value={"ছুটিশেষ"} />
                      <PairedData
                        label={"বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী"}
                        value={"ছুটিশেষ"}
                      />
                    </DataGrid>
                  </DataDropdown>
                  <DataDropdown
                    title={"অষ্টম শ্রেণি"}
                    itemKey={"classeight"}
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                  >
                    <DataGrid mtZero={true}>
                      <PairedData label={"মুসলিম ছাত্র"} value={"ছুটিশেষ"} />
                      <PairedData label={"মুসলিম ছাত্রী"} value={"ছুটিশেষ"} />
                      <PairedData
                        label={"মোট মুসলিম শিক্ষার্থী"}
                        value={"ছুটিশেষ"}
                      />
                      <PairedData label={"হিন্দু ছাত্র"} value={"ছুটিশেষ"} />
                      <PairedData label={"হিন্দু ছাত্রী"} value={"ছুটিশেষ"} />
                      <PairedData
                        label={"মোট হিন্দু শিক্ষার্থী"}
                        value={"ছুটিশেষ"}
                      />
                      <PairedData label={"মোট ছাত্র"} value={"ছুটিশেষ"} />
                      <PairedData label={"মোট ছাত্রী"} value={"ছুটিশেষ"} />
                      <PairedData label={"মোট শিক্ষার্থী"} value={"ছুটিশেষ"} />
                      <PairedData
                        label={"বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী"}
                        value={"ছুটিশেষ"}
                      />
                    </DataGrid>
                  </DataDropdown> */}
                </div>
              </CustomTabPanel>

              <CustomTabPanel value={studentTabValue} index={2}>
                <DataGrid>
                  <PairedData
                    label={"মোট জরিপকৃত শিক্ষার্থী"}
                    value={studentAsroyonSurvey.survayed_students}
                  />
                  <PairedData
                    label={"সংশ্লিষ্ট বিদ্যালয়ে ভর্তিকৃত শিক্ষার্থী"}
                    value={
                      studentAsroyonSurvey.admitted_releted_school_students
                    }
                  />
                  <PairedData
                    label={"অভর্তিকৃত শিক্ষার্থী"}
                    value={studentAsroyonSurvey.unadmitted_students}
                  />
                </DataGrid>
              </CustomTabPanel>
            </Box>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        {showVerify && (
          <button
            onClick={handleBillVerify}
            type="submit"
            className="px-6 md:py-[10px] py-[6px] md:pt-[15px] pt-[10px] bg-[#008B4C] border border-[#008B4C] hover:bg-[#006f3d] text-white rounded-md font-semibold capitalize mt-5"
          >
            {role === "ueo" ? "এপ্রুভ করুন" : "ভেরিফাই করুন"}
          </button>
        )}
      </div>
    </div>
  );
};

export default BillDetails;