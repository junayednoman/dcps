"use client"
import TextField from '@/app/components/TextField';
import { Field, FieldArray, Form, Formik, } from 'formik';
import * as React from 'react';
import NumberField from '@/app/components/NumberField';
import MyDatePicker from '@/app/components/MyDatePicker';
import AnimateHeight from 'react-animate-height';
import ImageInput from '@/app/components/ImageInput';
import { Checkbox, CircularProgress, FormControl, InputLabel, ListItemText, MenuItem, Select } from '@mui/material';
import { bool, boolean } from 'yup';
import DataDropdown from '@/app/components/DataDropdown';
import SearchableSelect from '@/app/components/SearchableSelect';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from '@/authContext/AuthContext';
import getDate from '@/lib/getDate';
import { generateUniqueId } from '@/lib/uniqueId';

const BilReturnSubmit = () => {
    const [activeItem, setActiveItem] = React.useState('')

    const [buildingNumber, setBuildingNumber] = React.useState(0);

    // Function to handle change in the building number input
    const handleBuildingNumberChange = (e) => {
        const value = e.target.value;
        setBuildingNumber(parseInt(value))
    };

    const [borderWall, setBorderWall] = React.useState('');

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

    const [washBlock, setWashBlock] = React.useState('');

    // Function to handle change in the border_wall select element
    const handleWashBlockChange = (event) => {
        setWashBlock(event.target.value);
    };

    const [tubeWell, setTubeWell] = React.useState('');

    // Function to handle change in the border_wall select element
    const handleTubeWellChange = (event) => {
        setTubeWell(event.target.value);
    };

    const [deepTubeWell, setDeepTubeWell] = React.useState('');

    // Function to handle change in the border_wall select element
    const handleDeepTubeWellChange = (event) => {
        setDeepTubeWell(event.target.value);
    };
    const [registration, setRegistration] = React.useState('');

    // Function to handle change in the border_wall select element
    const handleRegistrationChange = (event) => {
        setRegistration(event.target.value);
    };
    const [namjari, setNamjari] = React.useState('');

    // Function to handle change in the border_wall select element
    const handleNamjariChange = (event) => {
        setNamjari(event.target.value);
    };


    const [schoolAccordionActive, setSchoolAccordionActive] = React.useState('');
    const schoolTogglePara = (value) => {
        setSchoolAccordionActive((oldValue) => (oldValue === value ? 0 : value));
    };

    const [studentAccordionActive, setStudentAccordionActive] = React.useState('nursery_four_plus');
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
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const stipendYearOptions = [
        { value: '2020', label: '2020' },
        { value: '2021', label: '2021' },
        { value: '2022', label: '2022' },
        { value: '2023', label: '2023' },
        { value: '2024', label: '2024' },
    ];


    const [stipendYearSelectedOption, setStipendYearSelectedOption] = React.useState('');

    const stipendYearSelectChange = (schoolSelectedOption) => {
        setStipendYearSelectedOption(schoolSelectedOption);
    };

    const [loading, setLoading] = React.useState(false);
    const [draftSubmit, setDraftSubmit] = React.useState(false);
    const { name: submitter_name } = React.useContext(AuthContext);
    const handleFormSubmit = (values) => {

        if (values) {
            // console.log(values);
            const formData = {
                unique_id: "",
                submitter_info: {
                    submitted_by: ""
                },
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
            }

            setLoading(true);
            const date = getDate();
            const uniqueId = generateUniqueId();
            formData.unique_id = uniqueId;
            formData.submitter_info.submitted_by = submitter_name;
            formData.submitter_info.submitted_date = date;
            formData.school.general = values.school.general;
            formData.school.conference = values.school.conference;
            formData.school.development = values.budgets;
            formData.school.infrastructure = values.school.infrastructure;
            formData.school.infrastructure.others.internet = internetType;
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
            values.school.stipend.stipend_year = stipendYearSelectedOption.value;
            formData.teacher.general = values.teacher.general;
            formData.teacher.salary = values.salary;
            formData.teacher.vacation = values.vacations;
            formData.teacher.unauthorized_teacher = values.unauthorized_teacher;
            formData.student.survey.survey_admitted = values.survey_admitted;
            formData.student.survey.survey_admitted_to_other_school = values.survey_admitted_to_other_school;
            formData.student.survey.survey_unadmitted = values.survey_unadmitted;
            formData.student.survey.survey_total = values.survey_total;
            formData.student.admission.nursery_four_plus = values.nursery_four_plus;
            formData.student.admission.nursery_five_plus = values.nursery_five_plus;
            formData.student.admission.class_one = values.class_one;
            formData.student.admission.class_two = values.class_two;
            formData.student.admission.class_three = values.class_three;
            formData.student.admission.class_four = values.class_four;
            formData.student.admission.class_five = values.class_five;
            // formData.student.admission = values.class_six;
            // formData.student.admission = values.class_seven;
            // formData.student.admission = values.class_eight;
            formData.student.asroyon_survey = values.asroyon_survey;
            const apiUrl = "http://localhost:3000/api/bill-return/submit";
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(response => {
                    return response.json();
                }).then(data => {
                    console.log(data);
                    if (data && data.message === "Bill return submitted") {
                        if (draftSubmit) {
                            const newWindow = window.open(`/dashboard/bill-return-submit/draft/${uniqueId}`, '_blank');
                            if (newWindow) {
                                newWindow.opener = null;
                                setDraftSubmit(false);
                            }
                        }
                        console.log(formData.school.stipend);
                        toast.success("সফলভাবে সাবমিট হয়েছে!");
                    } else {
                        toast.warn("সাবমিট হয়নি")
                    }
                })
                .catch(error => {
                    toast.error('There was an error!');
                    console.error('There was an error!', error);
                })
                .finally(() => {
                    setLoading(false);
                    return uniqueId;

                });
        }
    };

    const handleOpenNewTab = () => {
        setDraftSubmit(true);
    };

    const internetTypeOptions = ['মডেম', 'সিম', 'রাউটার'];

    return (
        <div className='bg-[#FAFAFA] xl:w-[85%] w-full lg:mt-0 mt-4'>
            <h2 className='md:text-2xl text-xl font-semibold md:mb-14 mb-8'>বিল রিটার্ন সাবমিট</h2>
            <Formik
                initialValues={{
                    unique_id: "",
                    submitter_info: {
                        submitted_by: ""
                    },
                    budgets: [{}],
                    school: {
                        general: {
                            name: "",
                            cluster: "",
                            village_moholla: "",
                            word_number: "",
                            post_office: "",
                            union_corporation: "",
                            emis_code: "",
                            email: "",
                            founded_date: "",
                            grade: "",
                            shifts: "",
                        },
                        infrastructure: {
                            building: {
                                buildings: "",
                                building_date_1: "",
                                building_type_1: "",
                                building_condition_1: "",
                                building_date_2: "",
                                building_type_2: "",
                                building_condition_2: "",
                                building_date_3: "",
                                building_type_3: "",
                                building_condition_3: "",
                                building_date_4: "",
                                building_type_4: "",
                                building_condition_4: "",
                            },
                            headmaster_room: "",
                            office_rooms: "",
                            class_rooms: "",
                            useable_class_rooms: "",
                            multimedia_rooms: "",
                            separated_nursery_class: "",
                            border_wall: {
                                wall: "",
                                funding_type: "",
                                founded_date: "",
                            },
                            toilets: "",
                            wash_block: "",
                            wash_block_founded_date: "",
                            others: {
                                shahid_minar: "",
                                freedom_fight_corner: "",
                                rasel_corner: "",
                                garden: "",
                                internet: "",
                                laptop: {
                                    total: "",
                                    actives: "",
                                },
                                multimedia: {
                                    total: "",
                                    actives: "",
                                },
                                piano: {
                                    total: "",
                                    condition: "",
                                },
                                electricity_connection: "",
                            },
                            water: {
                                tube_wells: "",
                                tube_wells_condition: "",
                                deep_tube_wells: "",
                                deep_tube_wells_condition: "",
                            }
                        },
                        land: {
                            total_amount: "",
                            take_overed: "",
                            dispossessed: "",
                            is_registered: '',
                            registration_ownership: '',
                            khatian_number: "",
                            dag_number: "",
                            dolil_number: "",
                            dolil_year: "",
                            is_namjaried: '',
                            namjari_ownership: '',
                            is_cased: '',
                            taxt_condition: '',
                        },
                        stipend: {
                            stipend_year: "",
                            total_consumer: "",
                            demand: "",
                            distributed: "",
                        },
                        conference: {
                            smc: "",
                            pta: "",
                            mother: "",
                            guardian: "",
                            yard: "",
                            staff_meeting: "",
                        },
                        development: {
                            // ...budgets
                        }
                    },
                    permitted_post: "",
                    teacher: {
                        general: {
                            permitted_post: "",
                            working_post: "",
                            vacency: "",
                            teacher_number: "",
                            women_teacher_number: "",
                        },
                    },
                    students: {
                        admission: {}
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
                    class_eight: [{}],
                    asroyon_survey: [{}],
                    survey_total: [{}],
                    survey_admitted: [{}],
                    survey_unadmitted: [{}],
                    survey_admitted_to_other_school: [{}],
                    unauthorized_teacher: [{}],
                }}
                // validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
            >
                {
                    ({ isSubmitting, values }) => (
                        <Form>
                            {/* school related data */}
                            <div className='border bg-white shadow-sm rounded-[4px] md:p-8 p-3'>
                                <h2 className='md:text-xl text-lg font-semibold md:mb-8'>বিদ্যালয় সংক্রান্ত তথ্য</h2>
                                <DataDropdown title="সাধারণ তথ্য" itemKey={'general'} activeItem={activeItem} setActiveItem={setActiveItem}>
                                    <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4 pt-4'>
                                        <TextField name="school.general.name" label="বিদ্যালয়ের নাম" placeholder={"বিদ্যালয়ের নাম লিখুন"} />
                                        <div className="mb-4">
                                            <label className='font-semibold' htmlFor="cluster">ক্লাস্টার*</label>
                                            <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name="school.general.cluster" id="cluster">
                                                <option className='text-gray-300' value="Select an option" selected>ক্লাস্টার সিলেক্ট করুন</option>
                                                <option value="সাধুহাটি">সাধুহাটি</option>
                                                <option value="কামালপুর">কামালপুর</option>
                                                <option value="ভাঁদ‌গাঁও">ভাঁদ‌গাঁও</option>
                                                <option value="শ্যামরারবাজার">শ্যামরারবাজার</option>
                                                <option value="আমতৈল">আমতৈল</option>
                                                <option value="নাজিরাবাদ">নাজিরাবাদ</option>
                                                <option value="বাহারমর্দান">বাহারমর্দান</option>
                                                <option value="আকবরপুর">আকবরপুর</option>
                                            </Field>
                                        </div>
                                        <TextField name="school.general.village_moholla" label="গ্রাম/মহল্লার নাম" placeholder={"গ্রাম/মহল্লার নাম লিখুন"} />
                                        <NumberField name="school.general.word_number" label="ওয়ার্ড নাম্বার" placeholder={"ওয়ার্ড নাম্বার লিখুন"} />
                                        <TextField name="school.general.post_office" label="ডাকঘর" placeholder={"ডাকঘর লিখুন"} />
                                        <div className="mb-4">
                                            <label className='font-semibold' htmlFor="union_corporation">ইউনিয়ন/পৌরসভা</label>
                                            <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name="school.general.union_corporation" id="union_corporation">
                                                <option className='text-gray-300' value="Select an option" selected>একটি অপশন সিলেক্ট করুন</option>
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
                                                <option value="মৌলভীবাজার পৌরসভা ওয়ার্ড নং-১">মৌলভীবাজার পৌরসভা ওয়ার্ড নং-১</option>
                                                <option value="মৌলভীবাজার পৌরসভা ওয়ার্ড নং-২">মৌলভীবাজার পৌরসভা ওয়ার্ড নং-২</option>
                                                <option value="মৌলভীবাজার পৌরসভা ওয়ার্ড নং-৩">মৌলভীবাজার পৌরসভা ওয়ার্ড নং-৩</option>
                                                <option value="মৌলভীবাজার পৌরসভা ওয়ার্ড নং-৪">মৌলভীবাজার পৌরসভা ওয়ার্ড নং-৪</option>
                                                <option value="মৌলভীবাজার পৌরসভা ওয়ার্ড নং-৫">মৌলভীবাজার পৌরসভা ওয়ার্ড নং-৫</option>
                                                <option value="মৌলভীবাজার পৌরসভা ওয়ার্ড নং-৬">মৌলভীবাজার পৌরসভা ওয়ার্ড নং-৬</option>
                                                <option value="মৌলভীবাজার পৌরসভা ওয়ার্ড নং-৭">মৌলভীবাজার পৌরসভা ওয়ার্ড নং-৭</option>
                                                <option value="মৌলভীবাজার পৌরসভা ওয়ার্ড নং-৮">মৌলভীবাজার পৌরসভা ওয়ার্ড নং-৮</option>
                                                <option value="মৌলভীবাজার পৌরসভা ওয়ার্ড নং-৯">মৌলভীবাজার পৌরসভা ওয়ার্ড নং-৯</option>
                                            </Field>
                                        </div>
                                        {/* <TextField name="school.general.union_corporation" label="ইউনিয়ন/পৌরসভা" placeholder={"ইউনিয়ন/পৌরসভা লিখুন"} /> */}
                                        <TextField name="school.general.emis_code" label="EMIS কোড" placeholder={"EMIS কোড লিখুন"} />
                                        <TextField name="school.general.email" label="বিদ্যালয়ের ইমেইল" placeholder={"বিদ্যালয়ের ইমেইল লিখুন"} />
                                        <MyDatePicker name="school.general.founded_date" label="প্রতিষ্ঠার সন" />

                                        <div className="mb-4">
                                            <label className='font-semibold' htmlFor="grade">গ্রেড*</label>
                                            <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name="school.general.grade" id="grade">
                                                <option className='text-gray-300' value="Select an option" selected>গ্রেড সিলেক্ট করুন</option>
                                                <option value="A">A</option>
                                                <option value="B">B</option>
                                                <option value="C">C</option>
                                                <option value="D">D</option>
                                            </Field>
                                        </div>
                                        <div className="mb-4">
                                            <label className='font-semibold' htmlFor="shift">শিফট সংখ্যা*</label>
                                            <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name="school.general.shifts" id="shift">
                                                <option className='text-gray-300' value="Select an option" selected>শিফট সিলেক্ট করুন</option>
                                                <option value="1">১</option>
                                                <option value="2">২</option>
                                            </Field>
                                        </div>
                                    </div>
                                </DataDropdown>
                                <DataDropdown title="ভৌত অবকাঠামো তথ্য" itemKey={'infrastructure'} activeItem={activeItem} setActiveItem={setActiveItem}>
                                    <div className='pt-4'>
                                        {/* school building related data */}
                                        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4'>
                                            <div className="mb-4">
                                                <label className="font-semibold" htmlFor="building_number">ভবন সংখ্যা*</label>
                                                <input placeholder="ভবন সংখ্যা দিন" name='school.infrastructure.buildings' id="building_number" onChange={handleBuildingNumberChange} type="number" className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" />
                                            </div>
                                        </div>
                                        < div className='mt-6 mb-12'>

                                            {buildingNumber >= 1 &&
                                                <div className='mt-3 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-6'>
                                                    <MyDatePicker name={'school.infrastructure.building.building_date_1'} label={'ভবন ১ নির্মাণের সন '} />
                                                    <div className="mb-4">
                                                        <label className='font-semibold' htmlFor={`building_type_1`}>ভবন ১ এর ধরন*</label>
                                                        <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`school.infrastructure.building.building_type_1`} id={`building_type_1`}>
                                                            <option className='text-gray-300' value="Select an option" selected>ভবনের ধরন সিলেক্ট করুন</option>
                                                            <option value="পাকা">পাকা</option>
                                                            <option value="সেমিপাকা">সেমিপাকা</option>
                                                        </Field>
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className='font-semibold' htmlFor={`building_condition_1`}>ভবন ১ এর বর্তমান অবস্থা*</label>
                                                        <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`school.infrastructure.building.building_condition_1`} id={`building_condition_1`}>
                                                            <option className='text-gray-300' value="Select an option" selected >ভবনের অবস্থা সিলেক্ট করুন</option>
                                                            <option value="ভালো">ভালো</option>
                                                            <option value="জরাজীর্ণ">জরাজীর্ণ</option>
                                                            <option value="পরিত্যাক্ত">পরিত্যাক্ত</option>
                                                            <option value="পরিত্যাক্ত">ঝুঁকিপূর্ণ</option>
                                                        </Field>
                                                    </div>
                                                </div>
                                            }

                                            {buildingNumber >= 2 &&
                                                <div className='mt-3 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-6'>
                                                    <MyDatePicker name={'school.infrastructure.building.building_date_2'} label={'ভবন ২ নির্মাণের সন '} />
                                                    <div className="mb-4">
                                                        <label className='font-semibold' htmlFor={`building_type_2`}>ভবন 2 এর ধরন*</label>
                                                        <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`school.infrastructure.building.building_type_2`} id={`building_type_2`}>
                                                            <option className='text-gray-300' value="Select an option" selected>ভবনের ধরন সিলেক্ট করুন</option>
                                                            <option value="পাকা">পাকা</option>
                                                            <option value="সেমিপাকা">সেমিপাকা</option>
                                                            <option value="টিনশেড">টিনশেড</option>
                                                        </Field>
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className='font-semibold' htmlFor={`building_condition_2`}>ভবন 2 এর বর্তমান অবস্থা*</label>
                                                        <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`school.infrastructure.building.building_condition_2`} id={`building_condition_2`}>
                                                            <option className='text-gray-300' value="Select an option" selected>ভবনের অবস্থা সিলেক্ট করুন</option>
                                                            <option value="ভালো">ভালো</option>
                                                            <option value="জরাজীর্ণ">জরাজীর্ণ</option>
                                                            <option value="পরিত্যাক্ত">পরিত্যাক্ত</option>
                                                        </Field>
                                                    </div>

                                                </div>
                                            }

                                            {buildingNumber >= 3 &&
                                                <div className='mt-3 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-6'>
                                                    <MyDatePicker name={'school.infrastructure.building.building_date_3'} label={'ভবন ৩ নির্মাণের সন '} />

                                                    <div className="mb-4">
                                                        <label className='font-semibold' htmlFor={`building_type_3`}>ভবন ৩ এর ধরন*</label>
                                                        <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`school.infrastructure.building.building_type_3`} id={`building_type_3`}>
                                                            <option className='text-gray-300' value="Select an option" selected>ভবনের ধরন সিলেক্ট করুন</option>
                                                            <option value="পাকা">পাকা</option>
                                                            <option value="সেমিপাকা">সেমিপাকা</option>
                                                            <option value="টিনশেড">টিনশেড</option>
                                                        </Field>
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className='font-semibold' htmlFor={`building_condition_3`}>ভবন ৩ এর বর্তমান অবস্থা*</label>
                                                        <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`school.infrastructure.building.building_condition_3`} id={`building_condition_3`}>
                                                            <option className='text-gray-300' value="Select an option" selected>ভবনের অবস্থা সিলেক্ট করুন</option>
                                                            <option value="ভালো">ভালো</option>
                                                            <option value="জরাজীর্ণ">জরাজীর্ণ</option>
                                                            <option value="পরিত্যাক্ত">পরিত্যাক্ত</option>
                                                        </Field>
                                                    </div>
                                                </div>
                                            }

                                            {buildingNumber >= 4 &&
                                                <div className='mt-3 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-6'>
                                                    <MyDatePicker name={'school.infrastructure.building.building_date_4'} label={'ভবন ৪ নির্মাণের সন '} />

                                                    <div className="mb-4">
                                                        <label className='font-semibold' htmlFor={`building_type_4`}>ভবন ৪ এর ধরন*</label>
                                                        <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`school.infrastructure.building.building_type_4`} id={`building_type_4`}>
                                                            <option className='text-gray-300' value="Select an option" selected>ভবনের ধরন সিলেক্ট করুন</option>
                                                            <option value="পাকা">পাকা</option>
                                                            <option value="সেমিপাকা">সেমিপাকা</option>
                                                            <option value="টিনশেড">টিনশেড</option>
                                                        </Field>
                                                    </div>
                                                    <div className="mb-4">
                                                        <label className='font-semibold' htmlFor={`building_condition_4`}>ভবন ৪ এর বর্তমান অবস্থা*</label>
                                                        <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`school.infrastructure.building.building_condition_4`} id={`building_condition_4`}>
                                                            <option className='text-gray-300' value="Select an option" selected>ভবনের অবস্থা সিলেক্ট করুন</option>
                                                            <option value="ভালো">ভালো</option>
                                                            <option value="জরাজীর্ণ">জরাজীর্ণ</option>
                                                            <option value="পরিত্যাক্ত">পরিত্যাক্ত</option>
                                                        </Field>
                                                    </div>
                                                </div>
                                            }

                                        </div>

                                        {/* class room related data */}
                                        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-6'>
                                            <NumberField label="প্রধান শিক্ষকের কক্ষ" placeholder="প্রধান শিক্ষকের কক্ষ সংখ্যা" name="school.infrastructure.headmaster_room" />
                                            <NumberField label="অফিস কক্ষ" placeholder="অফিস কক্ষ সংখ্যা দিন" name="school.infrastructure.office_rooms" />
                                            <NumberField label="শ্রেণী কক্ষ" placeholder="শ্রেণী কক্ষের সংখ্যা দিন" name="school.infrastructure.class_rooms" />
                                            <NumberField label="ব্যবহারযোগ্য শ্রেণী কক্ষ" placeholder="ব্যবহারযোগ্য শ্রেণী কক্ষের সংখ্যা দিন" name="school.infrastructure.useable_class_rooms" />
                                            <NumberField label="মাল্টিমিডিয়া কক্ষ" placeholder="মাল্টিমিডিয়া কক্ষ সংখ্যা দিন" name="school.infrastructure.multimedia_rooms" />
                                            {/* <NumberField label="শিশু শ্রেণী" placeholder="শিশু শ্রেণী সংখ্যা দিন" name="nursery_class" /> */}

                                            <div className="mb-4">
                                                <label className='font-semibold' htmlFor="have_nursery_class">পৃথক শিশু শ্রেণী*</label>
                                                <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name="school.infrastructure.separated_nursery_class" id="have_nursery_class">
                                                    <option className='text-gray-300' value="Select an option" selected>একটি অপশন সিলেক্ট করুন</option>
                                                    <option value="আছে">আছে</option>
                                                    <option value="নেই">নেই</option>
                                                </Field>
                                            </div>

                                            <div className="mb-4">
                                                <label className='font-semibold' htmlFor="border_wall">সীমানা প্রাচীর*</label>
                                                <Field
                                                    value={borderWall}
                                                    onChange={handleBorderWallChange} className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name="school.infrastructure.border_wall.wall" id="border_wall">
                                                    <option className='text-gray-300' value="Select an option" selected>একটি অপশন সিলেক্ট করুন</option>
                                                    <option value="আছে">আছে</option>
                                                    <option value="নেই">নেই</option>
                                                </Field>
                                            </div>
                                            {borderWall === 'আছে' &&
                                                <div className="mb-4">
                                                    <label className='font-semibold' htmlFor="border_wall">সীমানা প্রাচীরের অর্থায়ন ধরন*</label>
                                                    <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name="school.infrastructure.border_wall.funding_type" id="funding_type">
                                                        <option className='text-gray-300' value="Select an option" selected>একটি অপশন সিলেক্ট করুন</option>
                                                        <option value="ডিপিই">ডিপিই</option>
                                                        <option value="উপজেলা">জেলা পরিষদ</option>
                                                        <option value="অন্যান্য">অন্যান্য</option>
                                                    </Field>
                                                </div>
                                            }

                                            {borderWall === "আছে" &&
                                                <MyDatePicker label="সীমানা প্রাচীর নির্মাণের সন" name="school.infrastructure.border_wall.founded_date" />
                                            }

                                            <NumberField label="টয়লেট সংখ্যা" placeholder="টয়লেট সংখ্যা দিন" name="school.infrastructure.toilets" />

                                            <div className="mb-4">
                                                <label className='font-semibold' htmlFor="wash_block">ওয়াশ ব্লক*</label>
                                                <Field onChange={handleWashBlockChange} className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name="school.infrastructure.wash_block" id="wash_block">
                                                    <option className='text-gray-300' value="Select an option" selected>একটি অপশন সিলেক্ট করুন</option>
                                                    <option value="আছে">আছে</option>
                                                    <option value="নেই">নেই</option>
                                                </Field>
                                            </div>

                                            {washBlock === "আছে" &&
                                                <MyDatePicker label="ওয়াশ ব্লক নির্মাণের সন" name="school.infrastructure.wash_block_founded_date" />
                                            }
                                        </div>

                                        {/* others data */}
                                        <div className='mt-8'>
                                            <button type="button" className={`relative border-gray-300 flex justify-between items-center w-full px-4 py-3 text-sm font-medium text-left rounded-lg border ${schoolAccordionActive === 'others_data' ? ' bg-slate-200' : '  bg-slate-100'}  ${schoolAccordionActive === 'nursery_four_plus' ? 'active' : ''}`} onClick={() => schoolTogglePara('others_data')}>
                                                <h5 className="text-gray-900 text-[16px]">অন্যান্য তথ্য</h5>
                                                <svg className={`w-4 h-4 ml-2 duration-500 ${schoolAccordionActive === 'others_data' ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>

                                            <AnimateHeight duration={300} height={schoolAccordionActive === 'others_data' ? 'auto' : 0}>
                                                <ul className="p-5">
                                                    <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-6'>
                                                        <div className="mb-4">
                                                            <label className='font-semibold' htmlFor={`shahid_minar`}>শহিদ মিনার*</label>
                                                            <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`school.infrastructure.others.shahid_minar`} id={`shahid_minar`}>
                                                                <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                                                                <option value="আছে">আছে</option>
                                                                <option value="নেই">নেই</option>
                                                            </Field>
                                                        </div>

                                                        <div className="mb-4">
                                                            <label className='font-semibold' htmlFor={`liberation_war_corner`}>মুক্তিযুদ্ধ কর্নার*</label>
                                                            <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`school.infrastructure.others.freedom_fight_corner`} id={`liberation_war_corner`}>
                                                                <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                                                                <option value="আছে">আছে</option>
                                                                <option value="নেই">নেই</option>
                                                            </Field>
                                                        </div>

                                                        <div className="mb-4">
                                                            <label className='font-semibold' htmlFor={`sheikh_rasel_corner`}>শেখ রাসেল কর্নার*</label>
                                                            <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`school.infrastructure.others.rasel_corner`} id={`sheikh_rasel_corner`}>
                                                                <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                                                                <option value="আছে">আছে</option>
                                                                <option value="নেই">নেই</option>
                                                            </Field>
                                                        </div>

                                                        <div className="mb-4">
                                                            <label className='font-semibold' htmlFor={`roof_garden`}>বাগান/ছাদ বাগান*</label>
                                                            <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`school.infrastructure.others.garden`} id={`roof_garden`}>
                                                                <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                                                                <option value="আছে">আছে</option>
                                                                <option value="নেই">নেই</option>
                                                            </Field>
                                                        </div>

                                                        <div>
                                                            <label className='font-semibold' htmlFor={`internet`}>ইন্টারনেট</label>
                                                            <FormControl sx={{ width: 300 }}>
                                                                <InputLabel className={`${internetLabel ? 'block' : 'hidden'}`} id="demo-multiple-checkbox-label">ইন্টারনেট</InputLabel>
                                                                <Select
                                                                    className='md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]'
                                                                    labelId="demo-multiple-checkbox-label"
                                                                    id="demo-multiple-checkbox"
                                                                    multiple
                                                                    value={internetType}
                                                                    onChange={handleChange}
                                                                    // input={<OutlinedInput label="ইন্টারনেট" />}
                                                                    renderValue={(selected) => selected.join(', ')}
                                                                // MenuProps={MenuProps}
                                                                >
                                                                    {internetTypeOptions.map((option) => (
                                                                        <MenuItem key={option} value={option}>
                                                                            <Checkbox checked={internetType.indexOf(option) > -1} />
                                                                            <ListItemText primary={option} />
                                                                        </MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </div>

                                                    </div>

                                                    <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4 mt-4'>
                                                        <div className="mb-4">
                                                            <label className="font-semibold" htmlFor="laptop_number">ল্যাপটপ সংখ্যা*</label>
                                                            <input placeholder="ল্যাপটপ সংখ্যা দিন" name='school.infrastructure.others.laptop.total' id="laptop_number" onChange={handleLaptopChange} type="number" className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" />
                                                        </div>
                                                        {laptop >= 1 &&
                                                            <NumberField placeholder={"সচল ল্যাপটপের সংখ্যা দিন"} label={'সচল ল্যাপটপের সংখ্যা'} name={"school.infrastructure.others.laptop.actives"} />
                                                        }
                                                    </div>




                                                    <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4 mt-4'>
                                                        <div className="mb-4">
                                                            <label className="font-semibold" htmlFor="multimedia_number">মাল্টিমিডিয়া সংখ্যা*</label>
                                                            <input placeholder="মাল্টিমিডিয়া সংখ্যা দিন" name='school.infrastructure.others.multimedia.total' id="multimedia_number" onChange={handleMultimediaChange} type="number" className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" />
                                                        </div>
                                                        {multimedia >= 1 &&
                                                            <NumberField placeholder={"সচল মাল্টিমিডিয়ার সংখ্যা দিন"} label={'সচল মাল্টিমিডিয়া সংখ্যা'} name={"school.infrastructure.others.multimedia.actives"} />
                                                        }
                                                    </div>


                                                    <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4 mt-4'>
                                                        <div className="mb-4">
                                                            <label className="font-semibold" htmlFor="piano_number">পিয়ানো সংখ্যা*</label>
                                                            <input placeholder="পিয়ানো সংখ্যা দিন" name='school.infrastructure.others.piano.total' id="piano_number" onChange={handlePianoChange} type="number" className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" />
                                                        </div>
                                                        {piano >= 1 &&
                                                            <div className="mb-4">
                                                                <label className='font-semibold' htmlFor={`piano_condition`}>পিয়ানো এর বর্তমান অবস্থা*</label>
                                                                <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`school.infrastructure.others.piano.condition`} id={`piano_condition`}>
                                                                    <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                                                                    <option value="সচল">সচল</option>
                                                                    <option value="নষ্ট">নষ্ট</option>
                                                                </Field>
                                                            </div>
                                                        }
                                                    </div>



                                                    < div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-6'>
                                                        <div className="my-4">
                                                            <label className='font-semibold' htmlFor={`electricity`}>বিদ্যুৎ সংযোগ*</label>
                                                            <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`school.infrastructure.others.electricity_connection`} id={`electricity`}>
                                                                <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                                                                <option value="আছে">আছে</option>
                                                                <option value="নেই">নেই</option>
                                                            </Field>
                                                        </div>
                                                    </div>

                                                </ul>
                                            </AnimateHeight>
                                        </div>

                                        <div className='mt-4'>
                                            <button type="button" className={`relative border-gray-300 flex justify-between items-center w-full px-4 py-3 text-sm font-medium text-left rounded-lg border ${schoolAccordionActive === 'water_system_data' ? ' bg-slate-200' : '  bg-slate-100'}  ${schoolAccordionActive === 'water_system_data' ? 'active' : ''}`} onClick={() => schoolTogglePara('water_system_data')}>
                                                <h5 className="text-gray-900 text-[16px]">পানিয় জল সংক্রান্ত তথ্য</h5>
                                                <svg className={`w-4 h-4 ml-2 duration-500 ${schoolAccordionActive === 'water_system_data' ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>

                                            <AnimateHeight duration={300} height={schoolAccordionActive === 'water_system_data' ? 'auto' : 0}>
                                                <ul className="p-5">
                                                    <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4 mt-4'>
                                                        <div className="mb-4">
                                                            <label className="font-semibold" htmlFor="tubewell_number">টিউবওয়েল সংখ্যা*</label>
                                                            <input placeholder="টিউবওয়েল সংখ্যা দিন" name='school.infrastructure.others.water.tube_wells' id="tubewell_number" onChange={handleTubeWellChange} type="number" className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" />
                                                        </div>
                                                    </div>

                                                    {tubeWell >= 1 &&
                                                        < div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-6'>
                                                            <div className="mb-4">
                                                                <label className='font-semibold' htmlFor={`tubewell_condition`}>টিউবওয়েল এর বর্তমান অবস্থা*</label>
                                                                <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`school.infrastructure.water.tube_wells_condition`} id={`tubewell_condition`}>
                                                                    <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                                                                    <option value="ভালো">ভালো</option>
                                                                    <option value="মেরামতযোগ্য">মেরামতযোগ্য</option>
                                                                </Field>
                                                            </div>
                                                        </div>
                                                    }

                                                    <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4 mt-4'>
                                                        <div className="mb-4">
                                                            <label className="font-semibold" htmlFor="deep_tubewell_number">ডিপ টিউবওয়েল সংখ্যা*</label>
                                                            <input placeholder="ডিপ টিউবওয়েল সংখ্যা দিন" name='school.infrastructure.water.deep_tube_wells' id="deep_tubewell_number" onChange={handleDeepTubeWellChange} type="number" className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" />
                                                        </div>
                                                    </div>

                                                    {deepTubeWell >= 1 &&
                                                        < div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-6'>
                                                            <div className="mb-4">
                                                                <label className='font-semibold' htmlFor={`deep_tubewell_condition`}>ডিপ টিউবওয়েল এর বর্তমান অবস্থা*</label>
                                                                <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`school.infrastructure.water.deep_tube_wells_condition`} id={`deep_tubewell_condition`}>
                                                                    <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                                                                    <option value="ভালো">ভালো</option>
                                                                    <option value="মেরামতযোগ্য">মেরামতযোগ্য</option>
                                                                </Field>
                                                            </div>
                                                        </div>
                                                    }

                                                </ul>
                                            </AnimateHeight>
                                        </div>
                                    </div>
                                </DataDropdown>
                                <DataDropdown title="ভূমি বিষয়ক তথ্য" itemKey={'land'} activeItem={activeItem} setActiveItem={setActiveItem}>
                                    {/* land related data */}
                                    <div className='pt-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4'>
                                        <NumberField name="school.land.total_amount" label="ভূমির পরিমান(শতাংশ)" placeholder="ভূমির পরিমান দিন" />
                                        <NumberField name="school.land.take_overed" label="দখলকৃত ভূমির পরিমান(শতাংশ)" placeholder="দখলকৃত ভূমির পরিমান দিন" />
                                        <NumberField name="school.land.dispossessed" label="বেদখলকৃত ভূমির পরিমান(শতাংশ)" placeholder="বেদখলকৃত ভূমির পরিমান দিন" />

                                        <div className="mb-4">
                                            <label className='font-semibold' htmlFor={"is_registered"}>রেজিস্টার করা আছে কিনা*</label>
                                            <Field onChange={handleRegistrationChange} className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" value={registration} name={"school.land.is_registered"} id={"is_registered"}>
                                                <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                                                <option value='হ্যাঁ'>হ্যাঁ</option>
                                                <option value='না'>না</option>
                                            </Field>
                                        </div>

                                        {registration === 'হ্যাঁ' &&
                                            <div className="mb-4">
                                                <label className='font-semibold' htmlFor={"registration_ownership"}>রেজিস্ট্রেশন এর মালিকানা*</label>
                                                <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={"school.land.registration_ownership"} id={"registration_ownership"}>
                                                    <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                                                    <option value='ডিপিই'>ডিপিই</option>
                                                    <option value='অন্যান্য'>অন্যান্য</option>
                                                </Field>
                                            </div>
                                        }
                                        <NumberField name="school.land.khatian_number" label="খতিয়ান নং" placeholder="খতিয়ান নং দিন" />
                                        <NumberField name="school.land.dag_number" label="দাগ নং" placeholder="দাগ নং দিন" />
                                        <NumberField name="school.land.dolil_number" label="দলিল নং" placeholder="দলিল নং দিন" />
                                        <MyDatePicker label="দলিল সন" name="school.land.dolil_year" />
                                        <div className="mb-4">
                                            <label className='font-semibold' htmlFor={"is_namjaried"}>নামজারি আছে কিনা*</label>
                                            <Field onChange={handleNamjariChange} className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" value={namjari} name={"school.land.is_namjaried"} id={"is_namjaried"}>
                                                <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                                                <option value='হ্যাঁ'>হ্যাঁ</option>
                                                <option value='না'>না</option>
                                            </Field>
                                        </div>
                                        {namjari === 'হ্যাঁ' &&
                                            <div className="mb-4">
                                                <label className='font-semibold' htmlFor={"namjari_ownership"}>নামজারি এর মালিকানা*</label>
                                                <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={"school.land.namjari_ownership"} id={"namjari_ownership"}>
                                                    <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                                                    <option value='ডিপিই'>ডিপিই</option>
                                                    <option value='অন্যান্য'>অন্যান্য</option>
                                                </Field>
                                            </div>
                                        }
                                        <div className="mb-4">
                                            <label className='font-semibold' htmlFor={"is_cased"}>মামলা আছে কিনা*</label>
                                            <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={"school.land.is_cased"} id={"is_cased"}>
                                                <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                                                <option value='হ্যাঁ'>হ্যাঁ</option>
                                                <option value='না'>না</option>
                                            </Field>
                                        </div>
                                        <div className="mb-4">
                                            <label className='font-semibold' htmlFor={"land_development_tax_paid"}>ভূমি উন্নয়ন কর*</label>
                                            <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={"school.land.taxt_condition"} id={"land_development_tax_paid"}>
                                                <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                                                <option value='পরিশোধিত'>পরিশোধিত</option>
                                                <option value='অপরিশোধিত'>অপরিশোধিত</option>
                                            </Field>
                                        </div>
                                    </div>
                                </DataDropdown>
                                <DataDropdown title="উপবৃত্তি সংক্রান্ত তথ্য" itemKey={'stipend'} activeItem={activeItem} setActiveItem={setActiveItem}>
                                    {/* stipend related data */}
                                    <div className='pt-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4'>
                                        <div className='mb-4'>
                                            <label className='font-semibold' htmlFor={"stipend_year"}>সর্বশেষ প্রান্তিকের বছর</label>
                                            <SearchableSelect
                                                className="h-[44px]"
                                                options={stipendYearOptions}
                                                onChange={stipendYearSelectChange}
                                                value={stipendYearSelectedOption} />
                                        </div>
                                        <div className="mb-4">
                                            <label className='font-semibold' htmlFor={"latest_season"}>সর্বশেষ প্রান্তিকের মৌসুম</label>
                                            <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={"school.stipend.latest_season"} id={"latest_season"}>
                                                <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                                                <option value='প্রথম প্রান্তিক(জানুয়ারি-জুন)'>প্রথম প্রান্তিক(জানুয়ারি-জুন)</option>
                                                <option value='দ্বিতীয় প্রান্তিক(জুলাই-ডিসেম্বর)'>দ্বিতীয় প্রান্তিক(জুলাই-ডিসেম্বর)</option>
                                            </Field>
                                        </div>
                                        <NumberField name="school.stipend.total_consumer" label="সর্বশেষ প্রান্তিকে মোট সুবিধাভোগী" placeholder="সর্বশেষ প্রান্তিকে মোট সুবিধাভোগীর সংখ্যা দিন" />
                                        <NumberField name="school.stipend.demand" label="উপবৃত্তির চাহিদা" placeholder="উপবৃত্তির চাহিদা দিন" />
                                        <NumberField name="school.stipend.distributed" label="বিতরণকৃত অর্থের পরিমান " placeholder="বিতরণকৃত অর্থের পরিমান দিন" />
                                    </div>
                                </DataDropdown>
                                <DataDropdown title="সভা সংক্রান্ত তথ্য" itemKey={'conference'} activeItem={activeItem} setActiveItem={setActiveItem}>
                                    {/* conference related data */}
                                    <div className='pt-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4'>
                                        <NumberField name="school.conference.smc" label="এসএমসি" placeholder="এসএমসি সভার সংখ্যা দিন" />
                                        <NumberField name="school.conference.pta" label="পিটিএ" placeholder="পিটিএ সভার সংখ্যা দিন" />
                                        <NumberField name="school.conference.mother" label="মা-সমাবেশ" placeholder="মা-সমাবেশ এর সংখ্যা দিন" />
                                        <NumberField name="school.conference.guardian" label="অভিভাবক-সমাবেশ" placeholder="অভিভাবক-সমাবেশ এর সংখ্যা দিন" />
                                        <NumberField name="school.conference.yard" label="উঠান বৈঠক" placeholder="উঠান বৈঠক এর সংখ্যা দিন" />
                                        <NumberField name="school.conference.staff_meeting" label="স্টাফ মিটিং" placeholder="স্টাফ মিটিং এর সংখ্যা দিন" />
                                    </div>
                                </DataDropdown>
                                <DataDropdown title="উন্নয়ন কার্যক্রম সংক্রান্ত তথ্য" itemKey={'budget'} activeItem={activeItem} setActiveItem={setActiveItem}>
                                    {/* budget related data */}
                                    <FieldArray name="budgets">
                                        {arrayHelpers => (
                                            <div>
                                                {values.budgets.map((budget, index) => (
                                                    <div key={index}>
                                                        <div className='pt-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4'>
                                                            <div className="mb-4">
                                                                <label className='font-semibold' htmlFor={`budgets.${index}.name`}>বরাদ্দের ধরন</label>
                                                                <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`budgets.${index}.name`} id={`budgets.${index}.name`}>
                                                                    <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                                                                    <option value='স্লিপ'>স্লিপ</option>
                                                                    <option value='রুটিন মেরামত'>রুটিন মেরামত</option>
                                                                    <option value='মেজর মেরামত'>বড় ধরণের/মেজর মেরামত</option>
                                                                    <option value='মাইনর মেরামত'>ক্ষুদ্র/মাইনর মেরামত</option>
                                                                    <option value='প্রাক-প্রাথমিক'>প্রাক-প্রাথমিক</option>
                                                                    <option value='ওয়াশব্লক'>ওয়াশব্লক</option>
                                                                    <option value='প্লেয়িং এক্সেসরিস'>প্লেয়িং এক্সেসরিস</option>
                                                                </Field>
                                                            </div>
                                                            <div className="mb-4">
                                                                <label className='font-semibold' htmlFor={`budgets.${index}.year`}>অর্থ বছর</label>
                                                                <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`budgets.${index}.year`} id={`budgets.${index}.year`}>
                                                                    <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                                                                    <option value={'2014-2015'}>2014-2015</option>
                                                                    <option value={'2015-2016'}>2015-2016</option>
                                                                    <option value={'2016-2017'}>2016-2017</option>
                                                                    <option value={'2017-2018'}>2017-2018</option>
                                                                    <option value={'2018-2019'}>2018-2019</option>
                                                                    <option value={'2019-2020'}>2019-2020</option>
                                                                    <option value={'2020-2021'}>2020-2021</option>
                                                                    <option value={'2021-2022'}>2021-2022</option>
                                                                    <option value={'2022-2023'}>2022-2023</option>
                                                                </Field>
                                                            </div>
                                                            <NumberField name={`budgets.${index}.amount`} label="অর্থের পরিমান" placeholder="অর্থের পরিমান লিখুন" />
                                                        </div>
                                                        <button className={`text-[#ED1C24] font-semibold`} type="button" onClick={() => arrayHelpers.remove(index)}>
                                                            ডিলিট করুন
                                                        </button>
                                                    </div>
                                                ))}
                                                <button className='mt-3 text-[#008B4C] underline font-semibold' type="button" onClick={() => arrayHelpers.push({ name: '', year: '', amount: '' })}>
                                                    আরও যোগ করুন
                                                </button>
                                            </div>
                                        )}
                                    </FieldArray>
                                </DataDropdown>

                            </div>
                            {/* teacher related data */}
                            <div className='border bg-white shadow-sm rounded-[4px] md:p-8 p-3 mt-7'>
                                <h2 className='md:text-xl text-lg font-semibold md:mb-8'>শিক্ষক সংক্রান্ত তথ্য</h2>
                                <DataDropdown title="সাধারণ তথ্য" itemKey={'teacher_general'} activeItem={activeItem} setActiveItem={setActiveItem}>
                                    <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-6 pt-4'>
                                        <NumberField name="teacher.general.permitted_post" label="অনুমোদিত পদ" placeholder={'অনুমোদিত পদের সংখ্যা দিন'} />
                                        <NumberField name="teacher.general.working_post" label="কর্মরত পদ" placeholder={'কর্মরত পদের সংখ্যা দিন'} />
                                        <NumberField name="teacher.general.vacency" label="শূন্য পদ" placeholder={'শূন্য পদের সংখ্যা দিন'} />
                                        <NumberField name="teacher.general.teacher_number" label="কর্মরত শিক্ষক(পুরুষ)" placeholder={'শিক্ষক সংখ্যা দিন'} />
                                        <NumberField name="teacher.general.women_teacher_number" label="কর্মরত শিক্ষক(মহিলা)" placeholder={'শিক্ষকা সংখ্যা দিন'} />
                                    </div>
                                </DataDropdown>
                                <DataDropdown title="বেতন সংক্রান্ত তথ্য" itemKey={'sallary'} activeItem={activeItem} setActiveItem={setActiveItem}>
                                    <div>
                                        <FieldArray name="salary">
                                            {arrayHelpers1 => (
                                                <div>
                                                    {values.salary.map((teacher, index) => (
                                                        <div key={index}>
                                                            <h3 className='mt-8 text-lg text-[#008B4C] font-semibold'>শিক্ষক {index + 1}</h3>
                                                            <div className='pt-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4'>
                                                                <TextField name={`salary.${index}.name`} label="শিক্ষকের নাম" placeholder="শিক্ষকের নাম লিখুন" />
                                                                <div className="mb-4">
                                                                    <label className='font-semibold' htmlFor={`salary.${index}.designation`}>শিক্ষকের পদবি</label>
                                                                    <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`salary.${index}.designation`} id={`salary.${index}.designation`}>
                                                                        <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                                                                        <option value='প্রধান শিক্ষক'>প্রধান শিক্ষক</option>
                                                                        <option value='প্রধান শিক্ষক(চলতি দায়িত্ব)'>প্রধান শিক্ষক(চলতি দায়িত্ব)</option>
                                                                        <option value='প্রধান শিক্ষক(ভারপ্রাপ্ত)'>প্রধান শিক্ষক(ভারপ্রাপ্ত)</option>
                                                                        <option value='সহকারি শিক্ষক'>সহকারি শিক্ষক</option>
                                                                    </Field>
                                                                </div>
                                                                <TextField name={`salary.${index}.educational_qualification`} label="সর্বশেষ শিক্ষাগত যোগ্যতা" placeholder="সর্বশেষ শিক্ষাগত যোগ্যতা লিখুন" />
                                                                <div className="mb-4">
                                                                    <label className='font-semibold' htmlFor={`salary.${index}.divisional_training`}>বিভাগীয় প্রশিক্ষণ</label>
                                                                    <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`salary.${index}.divisional_training`} id={`salary.${index}.divisional_training`}>
                                                                        <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                                                                        <option value='ডিপিএড'>ডিপিএড</option>
                                                                        <option value='সিইএনএড'>সিইএনএড</option>
                                                                        <option value='বিটিপিটি'>বিটিপিটি</option>
                                                                    </Field>
                                                                </div>
                                                                <MyDatePicker name={`salary.${index}.date_of_birth`} label={'জন্ম তারিখ'} />
                                                                <MyDatePicker name={`salary.${index}.first_joining_date`} label={'প্রথম যোগদানের তারিখ'} />
                                                                <MyDatePicker name={`salary.${index}.mentioned_post_joining_date`} label={'উক্ত পদে যোগদানের তারিখ'} />
                                                                <MyDatePicker name={`salary.${index}.this_school_joining_date`} label={'এই বিদ্যালয়ে যোগদানের তারিখ'} />

                                                                <NumberField name={`salary.${index}.sallary_scale`} label="বেতন স্কেল" placeholder="বেতন স্কেল দিন" />
                                                                <NumberField name={`salary.${index}.main_sallary`} label="মূল বেতন" placeholder="মূল বেতন দিন" />
                                                                <NumberField name={`salary.${index}.educational_allowance`} label="শিক্ষা ভাতা" placeholder="শিক্ষা ভাতার পরিমান দিন" />
                                                                {/* <NumberField name={`salary.${index}.educational_allowance`} label="শিক্ষা ভাতা" placeholder="শিক্ষা ভাতার পরিমান দিন" /> */}
                                                                <NumberField name={`salary.${index}.bank_account_no`} label="ব্যাংক হিসাব নং" placeholder="ব্যাংক হিসাব নং দিন" />
                                                                <NumberField name={`salary.${index}.gpf`} label="জিপিএফ নং" placeholder="জিপিএফ নং দিন" />
                                                                <NumberField name={`salary.${index}.mobile_number`} label="সক্রিয় মোবাইল নং" placeholder="সক্রিয় মোবাইল নং দিন" />
                                                                <NumberField name={`salary.${index}.current_year_occasional_vacation`} label="চলতি বছরে মোট নৈমিত্তিক ছুটি" placeholder="চলতি বছরে মোট নৈমিত্তিক ছুটি সংখ্যা দিন" />
                                                                <ImageInput name={`salary.${index}.signature`} label='স্বাক্ষর' placeholder='সাক্ষর দিন' />
                                                            </div>
                                                            <button className={`text-[#ED1C24] font-semibold`} type="button" onClick={() => arrayHelpers1.remove(index)}>
                                                                ডিলিট করুন
                                                            </button>
                                                        </div>
                                                    ))}
                                                    <button className='mt-3 text-[#008B4C] underline font-semibold' type="button" onClick={() => arrayHelpers1.push({ name: '', designation: '', educational_qualification: '', divisional_training: '', date_of_birth: '', first_joining_date: '', mentioned_post_joining_date: '', this_school_joining_date: '', educational_allowance: '', signature: '', current_year_occasional_vacation: '', mobile_number: '', gpf: '', bank_account_no: '', main_sallary: '', sallary_scale: '' })}>
                                                        আরও যোগ করুন
                                                    </button>
                                                </div>
                                            )}
                                        </FieldArray>
                                    </div>
                                </DataDropdown>
                                <DataDropdown title="ছুটি সংক্রান্ত তথ্য" itemKey={'vacation'} activeItem={activeItem} setActiveItem={setActiveItem}>
                                    <FieldArray name="vacations">
                                        {arrayHelpers => (
                                            <div>
                                                {values.vacations.map((vacation, index) => (
                                                    <div key={index}>
                                                        <div className='pt-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4'>
                                                            <TextField name={`vacations.${index}.teacher_name`} label="শিক্ষকের নাম" placeholder="শিক্ষকের নাম লিখুন" />
                                                            <div className="mb-4">
                                                                <label className='font-semibold' htmlFor={`vacations.${index}.type`}>ছুটির ধরন</label>
                                                                <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`vacations.${index}.type`} id={`vacations.${index}.type`}>
                                                                    <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                                                                    <option value='চিকিৎসা'>চিকিৎসা</option>
                                                                    <option value='বহিঃবাংলাদেশ'>বহিঃবাংলাদেশ</option>
                                                                    <option value='মাতৃত্ত্ব'>মাতৃত্ব</option>
                                                                </Field>
                                                            </div>

                                                            <MyDatePicker name={`vacations.${index}.start_date`} label='ছুটি শুরু' />
                                                            <MyDatePicker name={`vacations.${index}.end_date`} label='ছুটি শেষ' />

                                                        </div>
                                                        <button className={`text-[#ED1C24] font-semibold`} type="button" onClick={() => arrayHelpers.remove(index)}>
                                                            ডিলিট করুন
                                                        </button>
                                                    </div>
                                                ))}
                                                <button className='mt-3 text-[#008B4C] underline font-semibold' type="button" onClick={() => arrayHelpers.push({ teacher_name: '', type: '', start_date: '', end_date: '' })}>
                                                    আরও যোগ করুন
                                                </button>
                                            </div>
                                        )}
                                    </FieldArray>
                                </DataDropdown>
                                <DataDropdown title="অননুমোদিত শিক্ষক তথ্য" itemKey={'absent_teacher'} activeItem={activeItem} setActiveItem={setActiveItem}>
                                    <div className='mt-4'>
                                        <FieldArray name='unauthorized_teacher'>
                                            {
                                                arrayHelpers => (
                                                    <>
                                                        {values.unauthorized_teacher.map((teacher, index) => (
                                                            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4' key={index}>
                                                                <TextField label={"শিক্ষকের নাম"} placeholder={'শিক্ষকের নাম দিন'} name={`unauthorized_teacher.${index}.name`} />
                                                                <div className="mb-4">
                                                                    <label className='font-semibold' htmlFor={`unauthorized_teacher.${index}.designation`}>শিক্ষকের পদবি</label>
                                                                    <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`unauthorized_teacher.${index}.designation`} id={`unauthorized_teacher.${index}.designation`}>
                                                                        <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                                                                        <option value='প্রধান শিক্ষক(চলতি দায়িত্ব)'>প্রধান শিক্ষক(চলতি দায়িত্ব)</option>
                                                                        <option value='প্রধান শিক্ষক(ভারপ্রাপ্ত)'>প্রধান শিক্ষক(ভারপ্রাপ্ত)</option>
                                                                        <option value='সহকারি শিক্ষক'>সহকারি শিক্ষক</option>
                                                                    </Field>
                                                                </div>
                                                                <MyDatePicker label={'সর্বশেষ উপস্থিতির তারিখ'} name={`unauthorized_teacher.${index}.last_present_date`} />
                                                            </div>
                                                        ))}
                                                    </>
                                                )
                                            }
                                        </FieldArray>
                                    </div>
                                </DataDropdown>
                            </div>

                            {/* teacher related data */}
                            <div className='border bg-white shadow-sm rounded-[4px] md:p-8 p-3 mt-4'>
                                <h2 className='md:text-xl text-lg font-semibold md:mb-8'>শিক্ষার্থী সংক্রান্ত তথ্য</h2>
                                <DataDropdown title="জরিপকৃত তথ্য(৪+...১০+)" itemKey={'survey'} activeItem={activeItem} setActiveItem={setActiveItem}>
                                    <div className='pt-8'>
                                        <FieldArray name="survey_total">
                                            {() => (
                                                <div>
                                                    <h3 className='mb-4 text-lg text-[#008B4C] font-semibold'>মোট</h3>
                                                    {values.survey_total.map((survey_total, index) => (
                                                        <div key={index} className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4'>
                                                            <NumberField name={`survey_total.${index}.boys`} label={"বালক"} placeholder={'বালক সংখ্যা দিন'} />
                                                            <NumberField name={`survey_total.${index}.girls`} label={"বালিকা"} placeholder={'বালিকা সংখ্যা দিন'} />
                                                            <NumberField name={`survey_total.${index}.total`} label={"মোট শিক্ষার্থী"} placeholder={'মোট শিক্ষার্থী সংখ্যা দিন'} />
                                                        </div>
                                                    ))}

                                                </div>
                                            )}
                                        </FieldArray>

                                        <FieldArray name="survey_admitted">
                                            {() => (
                                                <div>
                                                    <h3 className='mb-4 mt-6 text-lg text-[#008B4C] font-semibold'>সংশ্লিষ্ট বিদ্যালয়ে ভর্তিকৃত</h3>
                                                    {values.survey_admitted.map((survey_admitted, index) => (
                                                        <div key={index} className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4'>
                                                            <NumberField name={`survey_admitted.${index}.boys`} label={"বালক"} placeholder={'বালক সংখ্যা দিন'} />
                                                            <NumberField name={`survey_admitted.${index}.girls`} label={"বালিকা"} placeholder={'বালিকা সংখ্যা দিন'} />
                                                            <NumberField name={`survey_admitted.${index}.total`} label={"মোট শিক্ষার্থী"} placeholder={'মোট শিক্ষার্থী সংখ্যা দিন'} />
                                                        </div>
                                                    ))}

                                                </div>
                                            )}
                                        </FieldArray>

                                        <FieldArray name="survey_admitted_to_other_school">
                                            {() => (
                                                <div>
                                                    <h3 className='mb-4 mt-6 text-lg text-[#008B4C] font-semibold'>অন্যান্য বিদ্যালয়ে ভর্তিকৃত</h3>
                                                    {values.survey_admitted_to_other_school.map((survey_admitted_to_other_school, index) => (
                                                        <div key={index} className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4'>
                                                            <NumberField name={`survey_admitted_to_other_school.${index}.boys`} label={"বালক"} placeholder={'বালক সংখ্যা দিন'} />
                                                            <NumberField name={`survey_admitted_to_other_school.${index}.girls`} label={"বালিকা"} placeholder={'বালিকা সংখ্যা দিন'} />
                                                            <NumberField name={`survey_admitted_to_other_school.${index}.total`} label={"মোট শিক্ষার্থী"} placeholder={'মোট শিক্ষার্থী সংখ্যা দিন'} />
                                                        </div>
                                                    ))}

                                                </div>
                                            )}
                                        </FieldArray>

                                        <FieldArray name="survey_unadmitted">
                                            {() => (
                                                <div>
                                                    <h3 className='mb-4 mt-6 text-lg text-[#008B4C] font-semibold'>অভর্তিকৃত</h3>
                                                    {values.survey_unadmitted.map((survey_unadmitted, index) => (
                                                        <div key={index} className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4'>
                                                            <NumberField name={`survey_unadmitted.${index}.boys`} label={"বালক"} placeholder={'বালক সংখ্যা দিন'} />
                                                            <NumberField name={`survey_unadmitted.${index}.girls`} label={"বালিকা"} placeholder={'বালিকা সংখ্যা দিন'} />
                                                            <NumberField name={`survey_unadmitted.${index}.total`} label={"মোট শিক্ষার্থী"} placeholder={'মোট শিক্ষার্থী সংখ্যা দিন'} />
                                                        </div>
                                                    ))}

                                                </div>
                                            )}
                                        </FieldArray>

                                    </div>
                                </DataDropdown>
                                <DataDropdown title="ছাত্র/ছাত্রী ভর্তি তথ্য" itemKey={'student_admission'} activeItem={activeItem} setActiveItem={setActiveItem}>
                                    <div className='mt-4'>
                                        {/* data for nursery 4+ students */}
                                        <div>
                                            <button type="button" className={`relative border-gray-300 flex justify-between items-center w-full px-4 py-3 text-sm font-medium text-left rounded-lg border ${studentAccordionActive === 'nursery_four_plus' ? ' bg-slate-200' : '  bg-slate-100'}  ${studentAccordionActive === 'nursery_four_plus' ? 'active' : ''}`} onClick={() => studentTogglePara('nursery_four_plus')}>
                                                <h5 className="text-gray-900 text-[16px]">শিশু শ্রেণী ৪+</h5>
                                                <svg className={`w-4 h-4 ml-2 duration-500 ${studentAccordionActive === 'nursery_four_plus' ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>

                                            <AnimateHeight duration={300} height={studentAccordionActive === 'nursery_four_plus' ? 'auto' : 0}>
                                                <ul className="p-5">
                                                    {/* stipend related data */}
                                                    <FieldArray name="nursery_four_plus">
                                                        {() => (
                                                            <div>
                                                                {values.nursery_four_plus.map((nursery_four_plus, index) => (
                                                                    <div key={index}>
                                                                        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4'>
                                                                            {/* data for muslim students */}
                                                                            <NumberField name={`nursery_four_plus.${index}.muslim_boy_student`} label="মুসলিম ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                            <NumberField name={`nursery_four_plus.${index}.muslim_girl_student`} label="মুসলিম ছাত্রী" placeholder='ছাত্রী সংখ্যা দিন' />
                                                                            <NumberField name={`nursery_four_plus.${index}.muslim_total_student`} label="মোট মুসলিম শিক্ষার্থী" placeholder='মোট সংখ্যা দিন' />

                                                                            {/* data for hidu students */}
                                                                            <NumberField name={`nursery_four_plus.${index}.hindu_boy_student`} label="হিন্দু ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                            <NumberField name={`nursery_four_plus.${index}.hindu_girl_student`} label="হিন্দু ছাত্রী" placeholder='ছাত্রী সংখ্যা দিন' />
                                                                            <NumberField name={`nursery_four_plus.${index}.hindu_total_student`} label="মোট হিন্দু শিক্ষার্থী" placeholder='মোট সংখ্যা দিন' />

                                                                            {/* data for total students */}
                                                                            <NumberField name={`nursery_four_plus.${index}.total_boy_student`} label="মোট ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                            <NumberField name={`nursery_four_plus.${index}.total_girl_student`} label="মোট ছাত্রী" placeholder='ছাত্রী সংখ্যা দিন' />
                                                                            <NumberField name={`nursery_four_plus.${index}.total_student`} label="মোট শিক্ষার্থী" placeholder='মোট সংখ্যা দিন' />


                                                                            <NumberField name={`nursery_four_plus.${index}.special_demanded_student`} label="বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী" placeholder='মোট সংখ্যা দিন' />
                                                                        </div>


                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </FieldArray>

                                                </ul>
                                            </AnimateHeight>
                                        </div>

                                        {/* data for nursery 5+ students */}
                                        <div className='mt-3'>
                                            <button type="button" className={`relative border-gray-300 flex justify-between items-center w-full px-4 py-3 text-sm font-medium text-left rounded-lg border ${studentAccordionActive === 'nursery_five_plus' ? ' bg-slate-200' : '  bg-slate-100'}  ${studentAccordionActive === 'nursery_five_plus' ? 'active' : ''}`} onClick={() => studentTogglePara('nursery_five_plus')}>
                                                <h5 className="text-gray-900 text-[16px]">শিশু শ্রেণী ৫+</h5>
                                                <svg className={`w-4 h-4 ml-2 duration-500 ${studentAccordionActive === 'nursery_five_plus' ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>

                                            <AnimateHeight duration={300} height={studentAccordionActive === 'nursery_five_plus' ? 'auto' : 0}>
                                                <ul className="p-5">
                                                    <FieldArray name="nursery_five_plus">
                                                        {() => (
                                                            <div>
                                                                {values.nursery_five_plus.map((nursery_five_plus, index) => (
                                                                    <div key={index}>
                                                                        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4'>
                                                                            {/* data for muslim students */}
                                                                            <NumberField name={`nursery_five_plus.${index}.muslim_boy_student`} label="মুসলিম ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                            <NumberField name={`nursery_five_plus.${index}.muslim_girl_student`} label="মুসলিম ছাত্রী" placeholder='ছাত্রী সংখ্যা দিন' />
                                                                            <NumberField name={`nursery_five_plus.${index}.muslim_total_student`} label="মোট মুসলিম শিক্ষার্থী" placeholder='মোট শিক্ষার্থী সংখ্যা দিন' />

                                                                            {/* data for hidu students */}
                                                                            <NumberField name={`nursery_five_plus.${index}.hindu_boy_student`} label="হিন্দু ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                            <NumberField name={`nursery_five_plus.${index}.hindu_girl_student`} label="হিন্দু ছাত্রী" placeholder='ছাত্রী সংখ্যা দিন' />
                                                                            <NumberField name={`nursery_five_plus.${index}.hindu_total_student`} label="মোট হিন্দু শিক্ষার্থী" placeholder='মোট শিক্ষার্থী সংখ্যা দিন' />

                                                                            {/* data for total students */}
                                                                            <NumberField name={`nursery_five_plus.${index}.total_boy_student`} label="মোট ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                            <NumberField name={`nursery_five_plus.${index}.total_girl_student`} label="মোট ছাত্রী" placeholder='ছাত্রী সংখ্যা দিন' />
                                                                            <NumberField name={`nursery_five_plus.${index}.total_student`} label="মোট শিক্ষার্থী" placeholder='মোট শিক্ষার্থী সংখ্যা দিন' />


                                                                            <NumberField name={`nursery_five_plus.${index}.special_demanded_student`} label="বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী" placeholder='মোট শিক্ষার্থী সংখ্যা দিন' />
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
                                        <div className='mt-3'>
                                            <button type="button" className={`relative border-gray-300 flex justify-between items-center w-full px-4 py-3 text-sm font-medium text-left rounded-lg border ${studentAccordionActive === 'class_one' ? ' bg-slate-200' : '  bg-slate-100'}  ${studentAccordionActive === 'class_one' ? 'active' : ''}`} onClick={() => studentTogglePara('class_one')}>
                                                <h5 className="text-gray-900 text-[16px]">প্রথম শ্রেণি</h5>
                                                <svg className={`w-4 h-4 ml-2 duration-500 ${studentAccordionActive === 'class_one' ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>

                                            <AnimateHeight duration={300} height={studentAccordionActive === 'class_one' ? 'auto' : 0}>
                                                <ul className="p-5">
                                                    <FieldArray name="class_one">
                                                        {() => (
                                                            <div>
                                                                {values.class_one.map((class_one, index) => (
                                                                    <div key={index}>
                                                                        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4'>
                                                                            {/* data for muslim students */}
                                                                            <NumberField name={`class_one.${index}.muslim_boy_student`} label="মুসলিম ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                            <NumberField name={`class_one.${index}.muslim_girl_student`} label="মুসলিম ছাত্রী" placeholder='ছাত্রী সংখ্যা দিন' />
                                                                            <NumberField name={`class_one.${index}.muslim_total_student`} label="মোট মুসলিম শিক্ষার্থী" placeholder='মোট শিক্ষার্থী সংখ্যা দিন' />

                                                                            {/* data for hidu students */}
                                                                            <NumberField name={`class_one.${index}.hindu_boy_student`} label="হিন্দু ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                            <NumberField name={`class_one.${index}.hindu_girl_student`} label="হিন্দু ছাত্রী" placeholder='ছাত্রী সংখ্যা দিন' />
                                                                            <NumberField name={`class_one.${index}.hindu_total_student`} label="মোট হিন্দু শিক্ষার্থী" placeholder='মোট শিক্ষার্থী সংখ্যা দিন' />

                                                                            {/* data for total students */}
                                                                            <NumberField name={`class_one.${index}.total_boy_student`} label="মোট ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                            <NumberField name={`class_one.${index}.total_girl_student`} label="মোট ছাত্রী" placeholder='ছাত্রী সংখ্যা দিন' />
                                                                            <NumberField name={`class_one.${index}.total_student`} label="মোট শিক্ষার্থী" placeholder='মোট শিক্ষার্থী সংখ্যা দিন' />


                                                                            <NumberField name={`class_one.${index}.special_demanded_student`} label="বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী" placeholder='মোট শিক্ষার্থী সংখ্যা দিন' />
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
                                        <div className='mt-3'>
                                            <button type="button" className={`relative border-gray-300 flex justify-between items-center w-full px-4 py-3 text-sm font-medium text-left rounded-lg border ${studentAccordionActive === 'class_two' ? ' bg-slate-200' : '  bg-slate-100'}  ${studentAccordionActive === 'class_two' ? 'active' : ''}`} onClick={() => studentTogglePara('class_two')}>
                                                <h5 className="text-gray-900 text-[16px]">দ্বিতীয় শ্রেণি</h5>
                                                <svg className={`w-4 h-4 ml-2 duration-500 ${studentAccordionActive === 'class_two' ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>

                                            <AnimateHeight duration={300} height={studentAccordionActive === 'class_two' ? 'auto' : 0}>
                                                <ul className="p-5">
                                                    <FieldArray name="class_two">
                                                        {() => (
                                                            <div>
                                                                {values.class_two.map((class_two, index) => (
                                                                    <div key={index}>
                                                                        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4'>
                                                                            {/* data for muslim students */}
                                                                            <NumberField name={`class_two.${index}.muslim_boy_student`} label="মুসলিম ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                            <NumberField name={`class_two.${index}.muslim_girl_student`} label="মুসলিম ছাত্রী" placeholder='ছাত্রী সংখ্যা দিন' />
                                                                            <NumberField name={`class_two.${index}.muslim_total_student`} label="মোট মুসলিম শিক্ষার্থী" placeholder='মোট সংখ্যা দিন' />

                                                                            {/* data for hidu students */}
                                                                            <NumberField name={`class_two.${index}.hindu_boy_student`} label="হিন্দু ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                            <NumberField name={`class_two.${index}.hindu_girl_student`} label="হিন্দু ছাত্রী" placeholder='ছাত্রী সংখ্যা দিন' />
                                                                            <NumberField name={`class_two.${index}.hindu_total_student`} label="মোট হিন্দু শিক্ষার্থী" placeholder='মোট সংখ্যা দিন' />

                                                                            {/* data for total students */}
                                                                            <NumberField name={`class_two.${index}.total_boy_student`} label="মোট ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                            <NumberField name={`class_two.${index}.total_girl_student`} label="মোট ছাত্রী" placeholder='ছাত্রী সংখ্যা দিন' />
                                                                            <NumberField name={`class_two.${index}.total_student`} label="মোট শিক্ষার্থী" placeholder='মোট সংখ্যা দিন' />


                                                                            <NumberField name={`class_two.${index}.special_demanded_student`} label="বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী" placeholder='মোট সংখ্যা দিন' />
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
                                        <div className='mt-3'>
                                            <button type="button" className={`relative border-gray-300 flex justify-between items-center w-full px-4 py-3 text-sm font-medium text-left rounded-lg border ${studentAccordionActive === 'class_three' ? ' bg-slate-200' : '  bg-slate-100'}  ${studentAccordionActive === 'class_three' ? 'active' : ''}`} onClick={() => studentTogglePara('class_three')}>
                                                <h5 className="text-gray-900 text-[16px]">তৃতীয় শ্রেণি</h5>
                                                <svg className={`w-4 h-4 ml-2 duration-500 ${studentAccordionActive === 'class_three' ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>

                                            <AnimateHeight duration={300} height={studentAccordionActive === 'class_three' ? 'auto' : 0}>
                                                <ul className="p-5">
                                                    <FieldArray name="class_three">
                                                        {() => (
                                                            <div>
                                                                {values.class_three.map((class_three, index) => (
                                                                    <div key={index}>
                                                                        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4'>
                                                                            {/* data for muslim students */}
                                                                            <NumberField name={`class_three.${index}.muslim_boy_student`} label="মুসলিম ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                            <NumberField name={`class_three.${index}.muslim_girl_student`} label="মুসলিম ছাত্রী" placeholder='ছাত্রী সংখ্যা দিন' />
                                                                            <NumberField name={`class_three.${index}.muslim_total_student`} label="মোট মুসলিম শিক্ষার্থী" placeholder='মোট সংখ্যা দিন' />

                                                                            {/* data for hidu students */}
                                                                            <NumberField name={`class_three.${index}.hindu_boy_student`} label="হিন্দু ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                            <NumberField name={`class_three.${index}.hindu_girl_student`} label="হিন্দু ছাত্রী" placeholder='ছাত্রী সংখ্যা দিন' />
                                                                            <NumberField name={`class_three.${index}.hindu_total_student`} label="মোট হিন্দু শিক্ষার্থী" placeholder='মোট সংখ্যা দিন' />

                                                                            {/* data for total students */}
                                                                            <NumberField name={`class_three.${index}.total_boy_student`} label="মোট ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                            <NumberField name={`class_three.${index}.total_girl_student`} label="মোট ছাত্রী" placeholder='ছাত্রী সংখ্যা দিন' />
                                                                            <NumberField name={`class_three.${index}.total_student`} label="মোট শিক্ষার্থী" placeholder='মোট সংখ্যা দিন' />


                                                                            <NumberField name={`class_three.${index}.special_demanded_student`} label="বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী" placeholder='মোট সংখ্যা দিন' />
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
                                        <div className='mt-3'>
                                            <button type="button" className={`relative border-gray-300 flex justify-between items-center w-full px-4 py-3 text-sm font-medium text-left rounded-lg border ${studentAccordionActive === 'class_four' ? ' bg-slate-200' : '  bg-slate-100'}  ${studentAccordionActive === 'class_four' ? 'active' : ''}`} onClick={() => studentTogglePara('class_four')}>
                                                <h5 className="text-gray-900 text-[16px]">চতুর্থ শ্রেণি</h5>
                                                <svg className={`w-4 h-4 ml-2 duration-500 ${studentAccordionActive === 'class_four' ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>

                                            <AnimateHeight duration={300} height={studentAccordionActive === 'class_four' ? 'auto' : 0}>
                                                <ul className="p-5">
                                                    <FieldArray name="class_four">
                                                        {() => (
                                                            <div>
                                                                {values.class_four.map((class_four, index) => (
                                                                    <div key={index}>
                                                                        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4'>
                                                                            {/* data for muslim students */}
                                                                            <NumberField name={`class_four.${index}.muslim_boy_student`} label="মুসলিম ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                            <NumberField name={`class_four.${index}.muslim_girl_student`} label="মুসলিম ছাত্রী" placeholder='ছাত্রী সংখ্যা দিন' />
                                                                            <NumberField name={`class_four.${index}.muslim_total_student`} label="মোট মুসলিম শিক্ষার্থী" placeholder='মোট সংখ্যা দিন' />

                                                                            {/* data for hidu students */}
                                                                            <NumberField name={`class_four.${index}.hindu_boy_student`} label="হিন্দু ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                            <NumberField name={`class_four.${index}.hindu_girl_student`} label="হিন্দু ছাত্রী" placeholder='ছাত্রী সংখ্যা দিন' />
                                                                            <NumberField name={`class_four.${index}.hindu_total_student`} label="মোট হিন্দু শিক্ষার্থী" placeholder='মোট সংখ্যা দিন' />

                                                                            {/* data for total students */}
                                                                            <NumberField name={`class_four.${index}.total_boy_student`} label="মোট ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                            <NumberField name={`class_four.${index}.total_girl_student`} label="মোট ছাত্রী" placeholder='ছাত্রী সংখ্যা দিন' />
                                                                            <NumberField name={`class_four.${index}.total_student`} label="মোট শিক্ষার্থী" placeholder='মোট সংখ্যা দিন' />


                                                                            <NumberField name={`class_four.${index}.special_demanded_student`} label="বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী" placeholder='মোট সংখ্যা দিন' />
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
                                        <div className='mt-3'>
                                            <button type="button" className={`relative border-gray-300 flex justify-between items-center w-full px-4 py-3 text-sm font-medium text-left rounded-lg border ${studentAccordionActive === 'class_five' ? ' bg-slate-200' : '  bg-slate-100'}  ${studentAccordionActive === 'class_five' ? 'active' : ''}`} onClick={() => studentTogglePara('class_five')}>
                                                <h5 className="text-gray-900 text-[16px]">পঞ্চম শ্রেণি</h5>
                                                <svg className={`w-4 h-4 ml-2 duration-500 ${studentAccordionActive === 'class_five' ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>

                                            <AnimateHeight duration={300} height={studentAccordionActive === 'class_five' ? 'auto' : 0}>
                                                <ul className="p-5">
                                                    <FieldArray name="class_five">
                                                        {() => (
                                                            <div>
                                                                {values.class_five.map((class_five, index) => (
                                                                    <div key={index}>
                                                                        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4'>
                                                                            {/* data for muslim students */}
                                                                            <NumberField name={`class_five.${index}.muslim_boy_student`} label="মুসলিম ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                            <NumberField name={`class_five.${index}.muslim_girl_student`} label="মুসলিম ছাত্রী" placeholder='ছাত্রী সংখ্যা দিন' />
                                                                            <NumberField name={`class_five.${index}.muslim_total_student`} label="মোট মুসলিম শিক্ষার্থী" placeholder='মোট সংখ্যা দিন' />

                                                                            {/* data for hidu students */}
                                                                            <NumberField name={`class_five.${index}.hindu_boy_student`} label="হিন্দু ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                            <NumberField name={`class_five.${index}.hindu_girl_student`} label="হিন্দু ছাত্রী" placeholder='ছাত্রী সংখ্যা দিন' />
                                                                            <NumberField name={`class_five.${index}.hindu_total_student`} label="মোট হিন্দু শিক্ষার্থী" placeholder='মোট সংখ্যা দিন' />

                                                                            {/* data for total students */}
                                                                            <NumberField name={`class_five.${index}.total_boy_student`} label="মোট ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                            <NumberField name={`class_five.${index}.total_girl_student`} label="মোট ছাত্রী" placeholder='ছাত্রী সংখ্যা দিন' />
                                                                            <NumberField name={`class_five.${index}.total_student`} label="মোট শিক্ষার্থী" placeholder='মোট সংখ্যা দিন' />


                                                                            <NumberField name={`class_five.${index}.special_demanded_student`} label="বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী" placeholder='মোট সংখ্যা দিন' />
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
                                        <div className='mt-3'>
                                            <button type="button" className={`relative border-gray-300 flex justify-between items-center w-full px-4 py-3 text-sm font-medium text-left rounded-lg border ${studentAccordionActive === 'class_six' ? ' bg-slate-200' : '  bg-slate-100'}  ${studentAccordionActive === 'class_six' ? 'active' : ''}`} onClick={() => studentTogglePara('class_six')}>
                                                <h5 className="text-gray-900 text-[16px]">ষষ্ঠ শ্রেণি</h5>
                                                <svg className={`w-4 h-4 ml-2 duration-500 ${studentAccordionActive === 'class_six' ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>

                                            <AnimateHeight duration={300} height={studentAccordionActive === 'class_six' ? 'auto' : 0}>
                                                <ul className="p-5">
                                                    <FieldArray name="class_six">
                                                        {() => (
                                                            <div>
                                                                {values.class_six.map((class_six, index) => (
                                                                    <div key={index}>
                                                                        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4'>
                                                                            {/* data for muslim students */}
                                                                            <NumberField name={`class_six.${index}.muslim_boy_student`} label="মুসলিম ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                            <NumberField name={`class_six.${index}.muslim_girl_student`} label="মুসলিম ছাত্রী" placeholder='ছাত্রী সংখ্যা দিন' />
                                                                            <NumberField name={`class_six.${index}.muslim_total_student`} label="মোট মুসলিম শিক্ষার্থী" placeholder='মোট সংখ্যা দিন' />

                                                                            {/* data for hidu students */}
                                                                            <NumberField name={`class_six.${index}.hindu_boy_student`} label="হিন্দু ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                            <NumberField name={`class_six.${index}.hindu_girl_student`} label="হিন্দু ছাত্রী" placeholder='ছাত্রী সংখ্যা দিন' />
                                                                            <NumberField name={`class_six.${index}.hindu_total_student`} label="মোট হিন্দু শিক্ষার্থী" placeholder='মোট সংখ্যা দিন' />

                                                                            {/* data for total students */}
                                                                            <NumberField name={`class_six.${index}.total_boy_student`} label="মোট ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                            <NumberField name={`class_six.${index}.total_girl_student`} label="মোট ছাত্রী" placeholder='ছাত্রী সংখ্যা দিন' />
                                                                            <NumberField name={`class_six.${index}.total_student`} label="মোট শিক্ষার্থী" placeholder='মোট সংখ্যা দিন' />


                                                                            <NumberField name={`class_six.${index}.special_demanded_student`} label="বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী" placeholder='মোট সংখ্যা দিন' />
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
                                        <div className='mt-3'>
                                            <button type="button" className={`relative border-gray-300 flex justify-between items-center w-full px-4 py-3 text-sm font-medium text-left rounded-lg border ${studentAccordionActive === 'class_seven' ? ' bg-slate-200' : '  bg-slate-100'}  ${studentAccordionActive === 'class_seven' ? 'active' : ''}`} onClick={() => studentTogglePara('class_seven')}>
                                                <h5 className="text-gray-900 text-[16px]">সপ্তম শ্রেণি</h5>
                                                <svg className={`w-4 h-4 ml-2 duration-500 ${studentAccordionActive === 'class_seven' ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>

                                            <AnimateHeight duration={300} height={studentAccordionActive === 'class_seven' ? 'auto' : 0}>
                                                <ul className="p-5">
                                                    <FieldArray name="class_seven">
                                                        {() => (
                                                            <div>
                                                                {values.class_seven.map((class_seven, index) => (
                                                                    <div key={index}>
                                                                        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4'>
                                                                            {/* data for muslim students */}
                                                                            <NumberField name={`class_seven.${index}.muslim_boy_student`} label="মুসলিম ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                            <NumberField name={`class_seven.${index}.muslim_girl_student`} label="মুসলিম ছাত্রী" placeholder='ছাত্রী সংখ্যা দিন' />
                                                                            <NumberField name={`class_seven.${index}.muslim_total_student`} label="মোট মুসলিম শিক্ষার্থী" placeholder='মোট সংখ্যা দিন' />

                                                                            {/* data for hidu students */}
                                                                            <NumberField name={`class_seven.${index}.hindu_boy_student`} label="হিন্দু ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                            <NumberField name={`class_seven.${index}.hindu_girl_student`} label="হিন্দু ছাত্রী" placeholder='ছাত্রী সংখ্যা দিন' />
                                                                            <NumberField name={`class_seven.${index}.hindu_total_student`} label="মোট হিন্দু শিক্ষার্থী" placeholder='মোট সংখ্যা দিন' />

                                                                            {/* data for total students */}
                                                                            <NumberField name={`class_seven.${index}.total_boy_student`} label="মোট ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                            <NumberField name={`class_seven.${index}.total_girl_student`} label="মোট ছাত্রী" placeholder='ছাত্রী সংখ্যা দিন' />
                                                                            <NumberField name={`class_seven.${index}.total_student`} label="মোট শিক্ষার্থী" placeholder='মোট সংখ্যা দিন' />


                                                                            <NumberField name={`class_seven.${index}.special_demanded_student`} label="বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী" placeholder='মোট সংখ্যা দিন' />
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
                                        <div className='mt-3'>
                                            <button type="button" className={`relative border-gray-300 flex justify-between items-center w-full px-4 py-3 text-sm font-medium text-left rounded-lg border ${studentAccordionActive === 'class_eight' ? ' bg-slate-200' : '  bg-slate-100'}  ${studentAccordionActive === 'class_eight' ? 'active' : ''}`} onClick={() => studentTogglePara('class_eight')}>
                                                <h5 className="text-gray-900 text-[16px]">অষ্টম শ্রেণি</h5>
                                                <svg className={`w-4 h-4 ml-2 duration-500 ${studentAccordionActive === 'class_eight' ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>

                                            <AnimateHeight duration={300} height={studentAccordionActive === 'class_eight' ? 'auto' : 0}>
                                                <ul className="p-5">
                                                    <FieldArray name="class_eight">
                                                        {() => (
                                                            <div>
                                                                {values.class_eight.map((class_eight, index) => (
                                                                    <div key={index}>
                                                                        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4'>
                                                                            {/* data for muslim students */}
                                                                            <NumberField name={`class_eight.${index}.muslim_boy_student`} label="মুসলিম ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                            <NumberField name={`class_eight.${index}.muslim_girl_student`} label="মুসলিম ছাত্রী" placeholder='ছাত্রী সংখ্যা দিন' />
                                                                            <NumberField name={`class_eight.${index}.muslim_total_student`} label="মোট মুসলিম শিক্ষার্থী" placeholder='মোট সংখ্যা দিন' />

                                                                            {/* data for hidu students */}
                                                                            <NumberField name={`class_eight.${index}.hindu_boy_student`} label="হিন্দু ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                            <NumberField name={`class_eight.${index}.hindu_girl_student`} label="হিন্দু ছাত্রী" placeholder='ছাত্রী সংখ্যা দিন' />
                                                                            <NumberField name={`class_eight.${index}.hindu_total_student`} label="মোট হিন্দু শিক্ষার্থী" placeholder='মোট সংখ্যা দিন' />

                                                                            {/* data for total students */}
                                                                            <NumberField name={`class_eight.${index}.total_boy_student`} label="মোট ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                            <NumberField name={`class_eight.${index}.total_girl_student`} label="মোট ছাত্রী" placeholder='ছাত্রী সংখ্যা দিন' />
                                                                            <NumberField name={`class_eight.${index}.total_student`} label="মোট শিক্ষার্থী" placeholder='মোট সংখ্যা দিন' />


                                                                            <NumberField name={`class_eight.${index}.special_demanded_student`} label="বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী" placeholder='মোট সংখ্যা দিন' />
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
                                <DataDropdown title="আশ্রয়ন প্রকল্পের জরিপকৃত তথ্য(৪+...১০+)" itemKey={'asroyon'} activeItem={activeItem} setActiveItem={setActiveItem}>
                                    <div className='pt-4'>

                                        <FieldArray name='asroyon_survey'>
                                            {() => (
                                                <div>
                                                    {values.asroyon_survey.map((survery, index) => (
                                                        <div key={index}>
                                                            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4'>
                                                                <NumberField name={`asroyon_survey.${index}.survayed_students`} label="মোট জরিপকৃত শিক্ষার্থী" placeholder="শিক্ষার্থী সংখ্যা দিন" />
                                                                <NumberField name={`asroyon_survey.${index}.admitted_releted_school_students`} label="সংশ্লিষ্ট বিদ্যালয়ে ভর্তিকৃত শিক্ষার্থী" placeholder="শিক্ষার্থী সংখ্যা দিন" />
                                                                <NumberField name={`asroyon_survey.${index}.unadmitted_students`} label="অভর্তিকৃত শিক্ষার্থী" placeholder="শিক্ষার্থী সংখ্যা দিন" />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </FieldArray>

                                    </div>
                                </DataDropdown>
                            </div>



                            <div className='flex items-center justify-between'>
                                <button disabled={loading && !draftSubmit} type="submit" className="px-6 md:py-[10px] py-[6px] md:pt-[15px] pt-[10px] bg-[#008B4C] border border-[#008B4C] hover:bg-[#006f3d] text-white rounded-md font-semibold capitalize mt-5">
                                    {loading && !draftSubmit ?
                                        <p className='text-white flex items-center gap-2'>
                                            <CircularProgress className="btnSpinner" />
                                            <span>লোড হচ্ছে...</span>
                                        </p> :
                                        "সাবমিট করুন"}
                                </button>
                                <button disabled={loading && draftSubmit} onClick={handleOpenNewTab} type="submit" className="px-6 md:py-[10px] py-[6px] md:pt-[15px] pt-[10px] bg-[#008B4C] border border-[#008B4C] hover:bg-[#006f3d] text-white rounded-md font-semibold capitalize mt-5">
                                    {loading && draftSubmit ?
                                        <p className='text-white flex items-center gap-2'>
                                            <span>লোড হচ্ছে...</span>
                                            <CircularProgress className="btnSpinner" />
                                        </p> :
                                        "পূর্ণাঙ্গ বিল রিপোর্ট"}
                                </button>
                            </div>
                        </Form>
                    )
                }
            </Formik>

            <ToastContainer autoClose={1600} />
        </div >
    );
};


export default BilReturnSubmit;