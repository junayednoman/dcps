"use client"
import TextField from '@/app/components/TextField';
import { Field, FieldArray, Form, Formik } from 'formik';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CustomTabPanel from '@/app/components/CutomTabPanel';
import NumberField from '@/app/components/NumberField';
import MyDatePicker from '@/app/components/MyDatePicker';
import AnimateHeight from 'react-animate-height';
import ImageInput from '@/app/components/ImageInput';
import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from '@mui/material';

const BilReturnSubmit = () => {
    const [buildingNumber, setBuildingNumber] = React.useState(0)

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

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
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



    const [schoolAccordionActive, setSchoolAccordionActive] = React.useState('');
    const schoolTogglePara = (value) => {
        setSchoolAccordionActive((oldValue) => (oldValue === value ? 0 : value));
    };

    const [studentAccordionActive, setStudentAccordionActive] = React.useState('nursery_four_plus');
    const studentTogglePara = (value) => {
        setStudentAccordionActive((oldValue) => (oldValue === value ? 0 : value));
    };

    const [personName, setPersonName] = React.useState([]);
    const [internetLabel, setInternetLabel] = React.useState(true);
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };


    const handleFormSubmit = (values) => {
        console.log(values);
    };

    const internetTypes = ['মডেম', 'সিম', 'রাউটার'];

    return (
        <div className='bg-[#FAFAFA]'>
            <h2 className='md:text-2xl text-xl font-semibold md:mb-14 mb-8'>বিল রিটার্ন সাবমিট</h2>
            <Formik
                initialValues={{
                    budgets: [{ name: '', year: '', amount: '' }],
                    teachers: [{}],
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
                            <div className='flex lg:flex-row flex-col md:gap-8 gap-5'>
                                <div className='xl:w-[80%] w-full border bg-white shadow-sm rounded-[4px] p-8'>
                                    <h2 className='md:text-xl text-lg font-semibold md:mb-8'>বিদ্যালয় সংক্রান্ত তথ্য</h2>
                                    <Box sx={{ width: '100%' }}>
                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                            <Tabs indicatorColor="#000" className='text-xl' variant="scrollable" scrollButtons="auto" value={schoolTabValue} onChange={handleSchoolTabValueChange} aria-label="basic tabs example">
                                                <Tab label="সাধারণ তথ্য" {...a11yProps(0)} />
                                                <Tab label="ভৌত অবকাঠামো তথ্য" {...a11yProps(1)} />
                                                <Tab label="ভূমি বিষয়ক তথ্য" {...a11yProps(2)} />
                                                <Tab label="উপবৃত্তি সংক্রান্ত তথ্য" {...a11yProps(3)} />
                                                <Tab label="সভা সংক্রান্ত তথ্য" {...a11yProps(4)} />
                                                <Tab label="উন্নয়ন কার্যক্রম সংক্রান্ত তথ্য" {...a11yProps(5)} />

                                            </Tabs>
                                        </Box>
                                        <CustomTabPanel value={schoolTabValue} index={0}>
                                            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-6 pt-6'>
                                                <TextField name="school_name" label="বিদ্যালয়ের নাম" placeholder={"বিদ্যালয়ের নাম লিখুন"} />
                                                <div className="mb-4">
                                                    <label className='font-semibold' htmlFor="cluster">ক্লাস্টার*</label>
                                                    <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name="cluster" id="cluster">
                                                        <option className='text-gray-300' value="Select an option" selected>ক্লাস্টার সিলেক্ট করুন</option>
                                                        <option value="সাধুহাটি ক্লাস্টার">সাধুহাটি</option>
                                                        <option value="কামালপুর">কামালপুর</option>
                                                        <option value="ভাঁদ‌গাঁও">ভাঁদ‌গাঁও</option>
                                                        <option value="শ্যামরারবাজার">শ্যামরারবাজার</option>
                                                        <option value="আমতৈল">আমতৈল</option>
                                                        <option value="নাজিরাবাদ">নাজিরাবাদ</option>
                                                        <option value="বাহারমর্দান">বাহারমর্দান</option>
                                                        <option value="আকবরপুর">আকবরপুর</option>
                                                    </Field>
                                                </div>
                                                <TextField name="village" label="গ্রাম/মহল্লার নাম" placeholder={"গ্রাম/মহল্লার নাম লিখুন"} />
                                                <TextField name="word_number" label="ওয়ার্ড নাম্বার" placeholder={"ওয়ার্ড নাম্বার লিখুন"} />
                                                <TextField name="post_office" label="ডাকঘর" placeholder={"ডাকঘর লিখুন"} />
                                                <TextField name="union_corporation" label="ইউনিয়ন/পৌরসভা" placeholder={"ইউনিয়ন/পৌরসভা লিখুন"} />
                                                <TextField name="emis_code" label="EMIS কোড" placeholder={"EMIS কোড লিখুন"} />
                                                <TextField name="school_email" label="বিদ্যালয়ের ইমেইল" placeholder={"বিদ্যালয়ের ইমেইল লিখুন"} />
                                                {/* <TextField name="found_date" label="প্রতিষ্ঠার সন" placeholder={"প্রতিষ্ঠার সন লিখুন"} /> */}
                                                <MyDatePicker name="founded_date" label="প্রতিষ্ঠার সন" />

                                                <div className="mb-4">
                                                    <label className='font-semibold' htmlFor="grade">গ্রেড*</label>
                                                    <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name="grade" id="grade">
                                                        <option className='text-gray-300' value="Select an option" selected>গ্রেড সিলেক্ট করুন</option>
                                                        <option value="A">A</option>
                                                        <option value="B">B</option>
                                                        <option value="C">C</option>
                                                        <option value="D">D</option>
                                                    </Field>
                                                </div>
                                                <div className="mb-4">
                                                    <label className='font-semibold' htmlFor="shift">শিফট সংখ্যা*</label>
                                                    <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name="shift" id="shift">
                                                        <option className='text-gray-300' value="Select an option" selected>শিফট সিলেক্ট করুন</option>
                                                        <option value="A">১</option>
                                                        <option value="B">২</option>
                                                    </Field>
                                                </div>
                                                {/* <TextField name="cluster" label="ক্লাস্টার" placeholder={"ক্লাস্টার লিখুন"} /> */}
                                            </div>
                                        </CustomTabPanel>
                                        <CustomTabPanel value={schoolTabValue} index={1}>
                                            <div className='pt-8'>
                                                {/* school building related data */}
                                                <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4'>
                                                    <div className="mb-4">
                                                        <label className="font-semibold" htmlFor="building_number">ভবন সংখ্যা*</label>
                                                        <input placeholder="ভবন সংখ্যা দিন" name='building_number' id="building_number" onChange={handleBuildingNumberChange} type="number" className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" />
                                                    </div>
                                                </div>
                                                < div className='mt-6 mb-12'>

                                                    {buildingNumber >= 1 &&
                                                        <div className='mt-3 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-6'>
                                                            <MyDatePicker name={'building_date_1'} label={'ভবন ১ নির্মাণের সন '} />
                                                            <div className="mb-4">
                                                                <label className='font-semibold' htmlFor={`building_type_1`}>ভবন ১ এর ধরন*</label>
                                                                <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`building_type_1`} id={`building_type_1`}>
                                                                    <option className='text-gray-300' value="Select an option" selected>ভবনের ধরন সিলেক্ট করুন</option>
                                                                    <option value="পাকা">পাকা</option>
                                                                    <option value="সেমিপাকা">সেমিপাকা</option>
                                                                </Field>
                                                            </div>
                                                            <div className="mb-4">
                                                                <label className='font-semibold' htmlFor={`building_situation_1`}>ভবন ১ এর বর্তমান অবস্থা*</label>
                                                                <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`building_situation_1`} id={`building_situation_1`}>
                                                                    <option className='text-gray-300' value="Select an option" selected >ভবনের অবস্থা সিলেক্ট করুন</option>
                                                                    <option value="ভাল">ভাল</option>
                                                                    <option value="জরাজীর্ণ">জরাজীর্ণ</option>
                                                                    <option value="পরিত্যাক্ত">পরিত্যাক্ত</option>
                                                                    <option value="পরিত্যাক্ত">ঝুঁকিপূর্ণ</option>
                                                                </Field>
                                                            </div>
                                                        </div>
                                                    }

                                                    {buildingNumber >= 2 &&
                                                        <div className='mt-3 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-6'>
                                                            <MyDatePicker name={'building_date_2'} label={'ভবন ২ নির্মাণের সন '} />
                                                            <div className="mb-4">
                                                                <label className='font-semibold' htmlFor={`building_situation_2`}>ভবন 2 এর বর্তমান অবস্থা*</label>
                                                                <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`building_situation_2`} id={`building_situation_2`}>
                                                                    <option className='text-gray-300' value="Select an option" selected>ভবনের অবস্থা সিলেক্ট করুন</option>
                                                                    <option value="ভাল">ভাল</option>
                                                                    <option value="জরাজীর্ণ">জরাজীর্ণ</option>
                                                                    <option value="পরিত্যাক্ত">পরিত্যাক্ত</option>
                                                                </Field>
                                                            </div>
                                                            <div className="mb-4">
                                                                <label className='font-semibold' htmlFor={`building_type_2`}>ভবন 2 এর ধরন*</label>
                                                                <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`building_type_2`} id={`building_type_2`}>
                                                                    <option className='text-gray-300' value="Select an option" selected>ভবনের ধরন সিলেক্ট করুন</option>
                                                                    <option value="পাকা">পাকা</option>
                                                                    <option value="সেমিপাকা">সেমিপাকা</option>
                                                                    <option value="টিনশেড">টিনশেড</option>
                                                                </Field>
                                                            </div>
                                                        </div>
                                                    }

                                                    {buildingNumber >= 3 &&
                                                        <div className='mt-3 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-6'>
                                                            <MyDatePicker name={'building_date_3'} label={'ভবন ৩ নির্মাণের সন '} />
                                                            <div className="mb-4">
                                                                <label className='font-semibold' htmlFor={`building_situation_3`}>ভবন ৩ এর বর্তমান অবস্থা*</label>
                                                                <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`building_situation_3`} id={`building_situation_3`}>
                                                                    <option className='text-gray-300' value="Select an option" selected>ভবনের অবস্থা সিলেক্ট করুন</option>
                                                                    <option value="ভাল">ভাল</option>
                                                                    <option value="জরাজীর্ণ">জরাজীর্ণ</option>
                                                                    <option value="পরিত্যাক্ত">পরিত্যাক্ত</option>
                                                                </Field>
                                                            </div>
                                                            <div className="mb-4">
                                                                <label className='font-semibold' htmlFor={`building_type_3`}>ভবন ৩ এর ধরন*</label>
                                                                <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`building_type_3`} id={`building_type_3`}>
                                                                    <option className='text-gray-300' value="Select an option" selected>ভবনের ধরন সিলেক্ট করুন</option>
                                                                    <option value="পাকা">পাকা</option>
                                                                    <option value="সেমিপাকা">সেমিপাকা</option>
                                                                    <option value="টিনশেড">টিনশেড</option>
                                                                </Field>
                                                            </div>
                                                        </div>
                                                    }

                                                    {buildingNumber >= 4 &&
                                                        <div className='mt-3 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-6'>
                                                            <MyDatePicker name={'building_date_4'} label={'ভবন ৪ নির্মাণের সন '} />
                                                            <div className="mb-4">
                                                                <label className='font-semibold' htmlFor={`building_situation_4`}>ভবন ৪ এর বর্তমান অবস্থা*</label>
                                                                <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`building_situation_4`} id={`building_situation_4`}>
                                                                    <option className='text-gray-300' value="Select an option" selected>ভবনের অবস্থা সিলেক্ট করুন</option>
                                                                    <option value="ভাল">ভাল</option>
                                                                    <option value="জরাজীর্ণ">জরাজীর্ণ</option>
                                                                    <option value="পরিত্যাক্ত">পরিত্যাক্ত</option>
                                                                </Field>
                                                            </div>
                                                            <div className="mb-4">
                                                                <label className='font-semibold' htmlFor={`building_type_4`}>ভবন ৪ এর ধরন*</label>
                                                                <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`building_type_4`} id={`building_type_4`}>
                                                                    <option className='text-gray-300' value="Select an option" selected>ভবনের ধরন সিলেক্ট করুন</option>
                                                                    <option value="পাকা">পাকা</option>
                                                                    <option value="সেমিপাকা">সেমিপাকা</option>
                                                                    <option value="টিনশেড">টিনশেড</option>
                                                                </Field>
                                                            </div>
                                                        </div>
                                                    }

                                                </div>

                                                {/* class room related data */}
                                                <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-6'>
                                                    <NumberField label="প্রধান শিক্ষকের কক্ষ" placeholder="প্রধান শিক্ষকের কক্ষ সংখ্যা" name="head_master_room" />
                                                    <NumberField label="অফিস কক্ষ" placeholder="অফিস কক্ষ সংখ্যা দিন" name="office_room" />
                                                    <NumberField label="শ্রেণী কক্ষ" placeholder="শ্রেণী কক্ষের সংখ্যা দিন" name="class_room" />
                                                    <NumberField label="ব্যবহারযোগ্য শ্রেণী কক্ষ" placeholder="ব্যবহারযোগ্য শ্রেণী কক্ষের সংখ্যা দিন" name="useable_class_room" />
                                                    <NumberField label="মাল্টিমিডিয়া কক্ষ" placeholder="মাল্টিমিডিয়া কক্ষ সংখ্যা দিন" name="multimedia_room" />
                                                    {/* <NumberField label="শিশু শ্রেণী" placeholder="শিশু শ্রেণী সংখ্যা দিন" name="nursery_class" /> */}

                                                    <div className="mb-4">
                                                        <label className='font-semibold' htmlFor="have_nursery_class">পৃথক শিশু শ্রেণী*</label>
                                                        <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name="have_nursery_class" id="have_nursery_class">
                                                            <option className='text-gray-300' value="Select an option" selected>একটি অপশন সিলেক্ট করুন</option>
                                                            <option value="আছে">আছে</option>
                                                            <option value="নাই">নাই</option>
                                                        </Field>
                                                    </div>

                                                    <div className="mb-4">
                                                        <label className='font-semibold' htmlFor="border_wall">সীমানা প্রাচীর*</label>
                                                        <Field onChange={handleBorderWallChange} className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name="border_wall" id="border_wall">
                                                            <option className='text-gray-300' value="Select an option" selected>একটি অপশন সিলেক্ট করুন</option>
                                                            <option value="আছে">আছে</option>
                                                            <option value="নাই">নাই</option>
                                                        </Field>
                                                    </div>
                                                    {borderWall === 'আছে' &&
                                                        <div className="mb-4">
                                                            <label className='font-semibold' htmlFor="border_wall">সীমানা প্রাচীরের অর্থায়ন ধরন*</label>
                                                            <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name="funding_type" id="funding_type">
                                                                <option className='text-gray-300' value="Select an option" selected>একটি অপশন সিলেক্ট করুন</option>
                                                                <option value="ডিপিই">ডিপিই</option>
                                                                <option value="উপজেলা">জেলা পরিষদ</option>
                                                                <option value="অন্যান্য">অন্যান্য</option>
                                                            </Field>
                                                        </div>
                                                    }

                                                    {borderWall === "আছে" &&
                                                        <MyDatePicker label="সীমানা প্রাচীর নির্মাণের সন" name="border_wall_building_data" />
                                                    }

                                                    <NumberField label="টয়লেট সংখ্যা" placeholder="টয়লেট সংখ্যা দিন" name="toilet" />

                                                    <div className="mb-4">
                                                        <label className='font-semibold' htmlFor="wash_block">ওয়াশ ব্লক*</label>
                                                        <Field onChange={handleWashBlockChange} className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name="border_wall" id="border_wall">
                                                            <option className='text-gray-300' value="Select an option" selected>একটি অপশন সিলেক্ট করুন</option>
                                                            <option value="আছে">আছে</option>
                                                            <option value="নাই">নাই</option>
                                                        </Field>
                                                    </div>

                                                    {washBlock === "আছে" &&
                                                        <MyDatePicker label="ওয়াশ ব্লক নির্মাণের সন" name="wash_block_building_data" />
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
                                                                    <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`shahid_minar`} id={`shahid_minar`}>
                                                                        <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                                                                        <option value="আছে">আছে</option>
                                                                        <option value="নাই">নাই</option>
                                                                    </Field>
                                                                </div>

                                                                <div className="mb-4">
                                                                    <label className='font-semibold' htmlFor={`liberation_war_corner`}>মুক্তিযুদ্ধ কর্নার*</label>
                                                                    <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`liberation_war_corner`} id={`liberation_war_corner`}>
                                                                        <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                                                                        <option value="আছে">আছে</option>
                                                                        <option value="নাই">নাই</option>
                                                                    </Field>
                                                                </div>

                                                                <div className="mb-4">
                                                                    <label className='font-semibold' htmlFor={`sheikh_rasel_corner`}>শেখ রাসেল কর্নার*</label>
                                                                    <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`sheikh_rasel_corner`} id={`sheikh_rasel_corner`}>
                                                                        <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                                                                        <option value="আছে">আছে</option>
                                                                        <option value="নাই">নাই</option>
                                                                    </Field>
                                                                </div>

                                                                <div className="mb-4">
                                                                    <label className='font-semibold' htmlFor={`roof_garden`}>বাগান/ছাদ বাগান*</label>
                                                                    <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`roof_garden`} id={`roof_garden`}>
                                                                        <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                                                                        <option value="আছে">আছে</option>
                                                                        <option value="নাই">নাই</option>
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
                                                                            value={personName}
                                                                            onChange={handleChange}
                                                                            // input={<OutlinedInput label="ইন্টারনেট" />}
                                                                            renderValue={(selected) => selected.join(', ')}
                                                                        // MenuProps={MenuProps}
                                                                        >
                                                                            {internetTypes.map((internetType) => (
                                                                                <MenuItem key={internetType} value={internetType}>
                                                                                    <Checkbox checked={personName.indexOf(internetType) > -1} />
                                                                                    <ListItemText primary={internetType} />
                                                                                </MenuItem>
                                                                            ))}
                                                                        </Select>
                                                                    </FormControl>
                                                                </div>

                                                            </div>

                                                            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4 mt-4'>
                                                                <div className="mb-4">
                                                                    <label className="font-semibold" htmlFor="laptop_number">ল্যাপটপ সংখ্যা*</label>
                                                                    <input placeholder="ল্যাপটপ সংখ্যা দিন" name='laptop_number' id="laptop_number" onChange={handleLaptopChange} type="number" className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" />
                                                                </div>
                                                                {laptop >= 1 &&
                                                                    <NumberField placeholder={"সচল ল্যাপটপের সংখ্যা দিন"} label={'সচল ল্যাপটপের সংখ্যা'} name={"active_laptops"} />
                                                                }
                                                            </div>




                                                            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4 mt-4'>
                                                                <div className="mb-4">
                                                                    <label className="font-semibold" htmlFor="multimedia_number">মাল্টিমিডিয়া সংখ্যা*</label>
                                                                    <input placeholder="মাল্টিমিডিয়া সংখ্যা দিন" name='multimedia_number' id="multimedia_number" onChange={handleMultimediaChange} type="number" className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" />
                                                                </div>
                                                                {multimedia >= 1 &&
                                                                    <NumberField placeholder={"সচল মাল্টিমিডিয়ার সংখ্যা দিন"} label={'সচল মাল্টিমিডিয়া সংখ্যা'} name={"active_multimedias"} />
                                                                }
                                                            </div>


                                                            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4 mt-4'>
                                                                <div className="mb-4">
                                                                    <label className="font-semibold" htmlFor="piano_number">পিয়ানো সংখ্যা*</label>
                                                                    <input placeholder="পিয়ানো সংখ্যা দিন" name='piano_number' id="piano_number" onChange={handlePianoChange} type="number" className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" />
                                                                </div>
                                                                {piano >= 1 &&
                                                                    <div className="mb-4">
                                                                        <label className='font-semibold' htmlFor={`piano_condition`}>পিয়ানো এর বর্তমান অবস্থা*</label>
                                                                        <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`piano_condition`} id={`piano_condition`}>
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
                                                                    <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`electricity`} id={`electricity`}>
                                                                        <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                                                                        <option value="আছে">আছে</option>
                                                                        <option value="নাই">নাই</option>
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
                                                                    <input placeholder="টিউবওয়েল সংখ্যা দিন" name='tubewell_number' id="tubewell_number" onChange={handleTubeWellChange} type="number" className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" />
                                                                </div>
                                                            </div>

                                                            {tubeWell >= 1 &&
                                                                < div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-6'>
                                                                    <div className="mb-4">
                                                                        <label className='font-semibold' htmlFor={`laption_condition`}>টিউবওয়েল এর বর্তমান অবস্থা*</label>
                                                                        <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`laption_condition`} id={`laption_condition`}>
                                                                            <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                                                                            <option value="ভাল">ভাল</option>
                                                                            <option value="পরিত্যক্ত">মেরামতযোগ্য</option>
                                                                        </Field>
                                                                    </div>
                                                                </div>
                                                            }

                                                            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4 mt-4'>
                                                                <div className="mb-4">
                                                                    <label className="font-semibold" htmlFor="deep_tubewell_number">ডিপ টিউবওয়েল সংখ্যা*</label>
                                                                    <input placeholder="ডিপ টিউবওয়েল সংখ্যা দিন" name='deep_tubewell_number' id="deep_tubewell_number" onChange={handleDeepTubeWellChange} type="number" className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" />
                                                                </div>
                                                            </div>

                                                            {deepTubeWell >= 1 &&
                                                                < div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-6'>
                                                                    <div className="mb-4">
                                                                        <label className='font-semibold' htmlFor={`laption_condition`}>ডিপ টিউবওয়েল এর বর্তমান অবস্থা*</label>
                                                                        <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`laption_condition`} id={`laption_condition`}>
                                                                            <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                                                                            <option value="ভাল">ভাল</option>
                                                                            <option value="পরিত্যক্ত">মেরামতযোগ্য</option>
                                                                        </Field>
                                                                    </div>
                                                                </div>
                                                            }

                                                        </ul>
                                                    </AnimateHeight>
                                                </div>

                                            </div>

                                        </CustomTabPanel>
                                        <CustomTabPanel value={schoolTabValue} index={2}>
                                            {/* land related data */}
                                            <div className='pt-8 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4'>
                                                <NumberField name="land_amount" label="ভূমির পরিমান(শতাংশ)" placeholder="ভূমির পরিমান দিন" />
                                                <NumberField name="take_overed_land_amount" label="দখলকৃত ভূমির পরিমান(শতাংশ)" placeholder="দখলকৃত ভূমির পরিমান দিন" />
                                                <NumberField name="dispossessed_land" label="বেদখলকৃত ভূমির পরিমান(শতাংশ)" placeholder="বেদখলকৃত ভূমির পরিমান দিন" />

                                                <div className="mb-4">
                                                    <label className='font-semibold' htmlFor={"is_registered"}>রেজিস্টার করা আছে কিনা*</label>
                                                    <Field onChange={handleRegistrationChange} className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={"is_registered"} id={"is_registered"}>
                                                        <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                                                        <option value='হ্যাঁ'>হ্যাঁ</option>
                                                        <option value='না'>না</option>
                                                    </Field>
                                                </div>

                                                {registration === 'হ্যাঁ' &&
                                                    <div className="mb-4">
                                                        <label className='font-semibold' htmlFor={"registration_ownership"}>রেজিস্ট্রেশন এর মালিকানা*</label>
                                                        <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={"registration_ownership"} id={"registration_ownership"}>
                                                            <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                                                            <option value='ডিপিই'>ডিপিই</option>
                                                            <option value='অন্যান্য'>অন্যান্য</option>
                                                        </Field>
                                                    </div>
                                                }
                                                <NumberField name="khatian_number" label="খাতিয়ান নং" placeholder="খাতিয়ান নং দিন" />
                                                <NumberField name="dag_number" label="দাগ নং" placeholder="দাগ নং দিন" />
                                                <NumberField name="dolil_number" label="দলিল নং" placeholder="দলিল নং দিন" />
                                                <MyDatePicker label="দলিল সন" name="dolil_year" />
                                                <div className="mb-4">
                                                    <label className='font-semibold' htmlFor={"is_namjaried"}>নামজারি আছে কিনা*</label>
                                                    <Field onChange={handleNamjariChange} className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={"is_namjaried"} id={"is_namjaried"}>
                                                        <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                                                        <option value='হ্যাঁ'>হ্যাঁ</option>
                                                        <option value='না'>না</option>
                                                    </Field>
                                                </div>
                                                {namjari === 'হ্যাঁ' &&
                                                    <div className="mb-4">
                                                        <label className='font-semibold' htmlFor={"namjari_ownership"}>নামজারি এর মালিকানা*</label>
                                                        <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={"namjari_ownership"} id={"namjari_ownership"}>
                                                            <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                                                            <option value='ডিপিই'>ডিপিই</option>
                                                            <option value='অন্যান্য'>অন্যান্য</option>
                                                        </Field>
                                                    </div>
                                                }
                                                <div className="mb-4">
                                                    <label className='font-semibold' htmlFor={"is_cased"}>মামলা আছে কিনা*</label>
                                                    <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={"is_cased"} id={"is_cased"}>
                                                        <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                                                        <option value='হ্যাঁ'>হ্যাঁ</option>
                                                        <option value='না'>না</option>
                                                    </Field>
                                                </div>
                                                <div className="mb-4">
                                                    <label className='font-semibold' htmlFor={"land_development_tax_paid"}>ভূমি উন্নয়ন কর*</label>
                                                    <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={"land_development_tax_paid"} id={"land_development_tax_paid"}>
                                                        <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                                                        <option value='পরিশোধিত'>পরিশোধিত</option>
                                                        <option value='অপরিশোধিত'>অপরিশোধিত</option>
                                                    </Field>
                                                </div>
                                            </div>
                                        </CustomTabPanel>
                                        <CustomTabPanel value={schoolTabValue} index={3}>
                                            {/* stipend related data */}
                                            <div className='pt-8 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4'>
                                                <div className="mb-4">
                                                    <label className='font-semibold' htmlFor={"land_development_tax_paid"}>সর্বশেষ প্রান্তিকের সময়কাল</label>
                                                    <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={"land_development_tax_paid"} id={"land_development_tax_paid"}>
                                                        <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                                                        <option value='প্রথম প্রান্তিক(জানুয়ারি-জুন)'>প্রথম প্রান্তিক(জানুয়ারি-জুন)</option>
                                                        <option value='দ্বিতীয় প্রান্তিক(জুলাই-ডিসেম্বর)'>দ্বিতীয় প্রান্তিক(জুলাই-ডিসেম্বর)</option>
                                                    </Field>
                                                </div>
                                                <NumberField name="total_stipend_consumers" label="সর্বশেষ প্রান্তিকে মোট সুবিধাভোগী" placeholder="সর্বশেষ প্রান্তিকে মোট সুবিধাভোগীর সংখ্যা দিন" />
                                                <NumberField name="stipend_demand" label="উপবৃত্তির চাহিদা" placeholder="উপবৃত্তির চাহিদা দিন" />
                                                <NumberField name="stipend_received_money" label="বিতরণকৃত অর্থের পরিমান " placeholder="বিতরণকৃত অর্থের পরিমান দিন" />
                                            </div>
                                        </CustomTabPanel>
                                        <CustomTabPanel value={schoolTabValue} index={4}>
                                            {/* stipend related data */}
                                            <div className='pt-8 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4'>
                                                <NumberField name="smc" label="এসএমসি" placeholder="এসএমসি সভার সংখ্যা দিন" />
                                                <NumberField name="pta" label="পিটিএ" placeholder="পিটিএ সভার সংখ্যা দিন" />
                                                <NumberField name="mother_conference" label="মা-সমাবেশ" placeholder="মা-সমাবেশ এর সংখ্যা দিন" />
                                                <NumberField name="gurdian_conference" label="অভিভাবক-সমাবেশ" placeholder="অভিভাবক-সমাবেশ এর সংখ্যা দিন" />
                                                <NumberField name="yard_assembly" label="উঠান বৈঠক" placeholder="উঠান বৈঠক এর সংখ্যা দিন" />
                                                <NumberField name="staff_meeting" label="স্টাফ মিটিং" placeholder="স্টাফ মিটিং এর সংখ্যা দিন" />
                                            </div>
                                        </CustomTabPanel>
                                        <CustomTabPanel value={schoolTabValue} index={5}>
                                            {/* stipend related data */}
                                            <FieldArray name="budgets">
                                                {arrayHelpers => (
                                                    <div>
                                                        {values.budgets.map((budget, index) => (
                                                            <div key={index}>
                                                                <div className='pt-8 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4'>
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
                                                                    <div className='flex gap-3 items-center col-span-2'>
                                                                        <MyDatePicker name={"budget_year_from"} label={'অর্থ বছর'} />
                                                                        <p className='mt-4 w-[6px]'>-</p>
                                                                        <MyDatePicker name={"budget_year_to"} />
                                                                    </div>
                                                                    {/* <TextField name={`budgets.${index}.year`} label="অর্থ বছর" placeholder="অর্থ বছর লিখুন" /> */}
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
                                        </CustomTabPanel>
                                    </Box>
                                </div>
                                {/* student and teacher related data */}
                            </div>

                            {/* teacher related data */}
                            <div className='flex lg:flex-row flex-col md:gap-8 gap-5 md:mt-8 mt-5'>
                                <div className='xl:w-[80%] w-full border bg-white shadow-sm rounded-[4px] p-8'>
                                    <h2 className='md:text-xl text-lg font-semibold md:mb-8'>শিক্ষক সংক্রান্ত তথ্য</h2>
                                    <Box sx={{ width: '100%' }}>
                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                            <Tabs indicatorColor="#000" className='text-xl' variant="scrollable" scrollButtons="auto" value={teacherTabValue} onChange={handleTeacherTabValueChange} aria-label="basic tabs example">
                                                <Tab label="সাধারণ তথ্য" {...a11yProps(0)} />
                                                <Tab label="বেতন সংক্রান্ত তথ্য" {...a11yProps(1)} />
                                                <Tab label="ছুটি সংক্রান্ত তথ্য" {...a11yProps(2)} />
                                                <Tab label="অননুমোদিত শিক্ষক তথ্য" {...a11yProps(3)} />
                                            </Tabs>
                                        </Box>
                                        {/* general data */}
                                        <CustomTabPanel value={teacherTabValue} index={0}>
                                            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-6 pt-8'>
                                                <NumberField name="permitted_post" label="অনুমোদিত পদ" placeholder={'অনুমোদিত পদের সংখ্যা দিন'} />
                                                <NumberField name="working_post" label="কর্মরত পদ" placeholder={'কর্মরত পদের সংখ্যা দিন'} />
                                                <NumberField name="vacency" label="শূন্য পদ" placeholder={'শূন্য পদের সংখ্যা দিন'} />
                                                <NumberField name="teacher_number" label="কর্মরত শিক্ষক(পুরুষ)" placeholder={'শিক্ষক সংখ্যা দিন'} />
                                                <NumberField name="women_teacher_number" label="কর্মরত শিক্ষক(মহিলা)" placeholder={'শিক্ষকা সংখ্যা দিন'} />
                                            </div>
                                        </CustomTabPanel>
                                        <CustomTabPanel value={teacherTabValue} index={1}>
                                            <div>
                                                <FieldArray name="teachers">
                                                    {arrayHelpers1 => (
                                                        <div>
                                                            {values.teachers.map((teacher, index) => (
                                                                <div key={index}>
                                                                    <h3 className='mt-8 text-lg text-[#008B4C] font-semibold'>শিক্ষক {index + 1}</h3>
                                                                    <div className='pt-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4'>
                                                                        <TextField name={`teachers.${index}.name`} label="শিক্ষকের নাম" placeholder="শিক্ষকের নাম লিখুন" />
                                                                        <div className="mb-4">
                                                                            <label className='font-semibold' htmlFor={`teachers.${index}.designation`}>শিক্ষকের পদবি</label>
                                                                            <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`teachers.${index}.designation`} id={`teachers.${index}.designation`}>
                                                                                <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                                                                                <option value='প্রধান শিক্ষক(চলতি দায়িত্ব)'>প্রধান শিক্ষক(চলতি দায়িত্ব)</option>
                                                                                <option value='প্রধান শিক্ষক(ভারপ্রাপ্ত)'>প্রধান শিক্ষক(ভারপ্রাপ্ত)</option>
                                                                                <option value='সহকারি শিক্ষক'>সহকারি শিক্ষক</option>
                                                                            </Field>
                                                                        </div>
                                                                        <TextField name={`teachers.${index}.educational_qualification`} label="সর্বশেষ শিক্ষাগত যোগ্যতা" placeholder="সর্বশেষ শিক্ষাগত যোগ্যতা লিখুন" />
                                                                        <div className="mb-4">
                                                                            <label className='font-semibold' htmlFor={`teachers.${index}.divisional_training`}>বিভাগীয় প্রশিক্ষণ</label>
                                                                            <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`teachers.${index}.divisional_training`} id={`teachers.${index}.divisional_training`}>
                                                                                <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                                                                                <option value='ডিপিএড'>ডিপিএড</option>
                                                                                <option value='সিইএনএড'>সিইএনএড</option>
                                                                                <option value='বিটিপিটি'>বিটিপিটি</option>
                                                                            </Field>
                                                                        </div>
                                                                        <MyDatePicker name={`teachers.${index}.date_of_birth`} label={'জন্ম তারিখ'} />
                                                                        <MyDatePicker name={`teachers.${index}.first_joining_date`} label={'প্রথম যোগদানের তারিখ'} />
                                                                        <MyDatePicker name={`teachers.${index}.mentioned_post_joining_date`} label={'উক্ত পদে যোগদানের তারিখ'} />
                                                                        <MyDatePicker name={`teachers.${index}.this_school_joining_date`} label={'এই বিদ্যালয়ে যোগদানের তারিখ'} />

                                                                        <NumberField name={`teachers.${index}.sallary_scale`} label="বেতন স্কেল" placeholder="বেতন স্কেল দিন" />
                                                                        <NumberField name={`teachers.${index}.main_sallary`} label="মূল বেতন" placeholder="মূল বেতন দিন" />
                                                                        <NumberField name={`teachers.${index}.educational_allowance`} label="শিক্ষা ভাতা" placeholder="শিক্ষা ভাতা দিন" />
                                                                        <NumberField name={`teachers.${index}.bank_account`} label="ব্যাংক হিসাব নং" placeholder="ব্যাংক হিসাব নং দিন" />
                                                                        <TextField name={`teachers.${index}.gpf`} label="জিপিএফ নং" placeholder="জিপিএফ নং দিন" />
                                                                        <NumberField name={`teachers.${index}.mobile_number`} label="সক্রিয় মোবাইল নং" placeholder="সক্রিয় মোবাইল নং দিন" />
                                                                        <NumberField name={`teachers.${index}.current_year_occasional_vacation`} label="চলতি বছরে মোট নৈমিত্তিক ছুটি" placeholder="চলতি বছরে মোট নৈমিত্তিক ছুটি সংখ্যা দিন" />
                                                                        <ImageInput name={`teachers.${index}.signature`} label='স্বাক্ষর' placeholder='সাক্ষর দিন' />
                                                                    </div>
                                                                    <button className={`text-[#ED1C24] font-semibold`} type="button" onClick={() => arrayHelpers1.remove(index)}>
                                                                        ডিলিট করুন
                                                                    </button>
                                                                </div>
                                                            ))}
                                                            <button className='mt-3 text-[#008B4C] underline font-semibold' type="button" onClick={() => arrayHelpers1.push({ name: '', designation: '', educational_qualification: '', divisional_training: '', date_of_birth: '', first_joining_date: '', mentioned_post_joining_date: '', this_school_joining_date: '', educational_allowance: '', signature: '', current_year_occasional_vacation: '', mobile_number: '', gpf: '', bank_account: '', main_sallary: '', sallary_scale: '' })}>
                                                                আরও যোগ করুন
                                                            </button>
                                                        </div>
                                                    )}
                                                </FieldArray>
                                            </div>
                                            <div className='pt-10'>
                                                {/* school building related data */}
                                                <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4'>

                                                </div>

                                            </div>

                                        </CustomTabPanel>
                                        <CustomTabPanel value={teacherTabValue} index={2}>
                                            {/* land related data */}
                                            {/* stipend related data */}
                                            <FieldArray name="vacations">
                                                {arrayHelpers => (
                                                    <div>
                                                        {values.vacations.map((vacation, index) => (
                                                            <div key={index}>
                                                                <div className='pt-8 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4'>
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
                                        </CustomTabPanel>
                                        <CustomTabPanel>
                                            <div className='mt-8'>
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
                                        </CustomTabPanel>
                                    </Box>
                                </div>
                            </div>

                            {/* student related data */}
                            <div className='flex lg:flex-row flex-col md:gap-8 gap-5 md:mt-8 mt-5'>
                                <div className='xl:w-[80%] w-full border bg-white shadow-sm rounded-[4px] p-8'>
                                    <h2 className='md:text-xl text-lg font-semibold md:mb-8'>শিক্ষার্থী সংক্রান্ত তথ্য</h2>
                                    <Box sx={{ width: '100%' }}>
                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                            <Tabs indicatorColor="#000" className='text-xl' variant="scrollable" scrollButtons="auto" value={studentTabValue} onChange={handleStudentTabValueChange} aria-label="basic tabs example">
                                                <Tab label="জরিপকৃত তথ্য(৪+...১০+)" {...a11yProps(0)} />
                                                <Tab label="ছাত্র/ছাত্রি ভর্তি তথ্য" {...a11yProps(1)} />
                                                <Tab label="আশ্রয়ন প্রকল্পের জরিপকৃত তথ্য(৪+...১০+)" {...a11yProps(2)} />
                                            </Tabs>
                                        </Box>
                                        <CustomTabPanel value={studentTabValue} index={0}>
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

                                        </CustomTabPanel>
                                        <CustomTabPanel value={studentTabValue} index={1}>
                                            <div className='mt-8'>
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
                                                                                    <NumberField name={`nursery_four_plus.${index}.muslim_girl_student`} label="মুসলিম ছাত্রি" placeholder='ছাত্রি সংখ্যা দিন' />
                                                                                    <NumberField name={`nursery_four_plus.${index}.muslim_total_student`} label="মোট" placeholder='মোট সংখ্যা দিন' />

                                                                                    {/* data for hidu students */}
                                                                                    <NumberField name={`nursery_four_plus.${index}.hindu_boy_student`} label="হিন্দু ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                                    <NumberField name={`nursery_four_plus.${index}.hindu_girl_student`} label="হিন্দু ছাত্রি" placeholder='ছাত্রি সংখ্যা দিন' />
                                                                                    <NumberField name={`nursery_four_plus.${index}.hindu_total_student`} label="মোট" placeholder='মোট সংখ্যা দিন' />

                                                                                    {/* data for total students */}
                                                                                    <NumberField name={`nursery_four_plus.${index}.total_boy_student`} label="মোট ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                                    <NumberField name={`nursery_four_plus.${index}.total_girl_student`} label="মোট ছাত্রি" placeholder='ছাত্রি সংখ্যা দিন' />
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
                                                                                    <NumberField name={`nursery_five_plus.${index}.muslim_girl_student`} label="মুসলিম ছাত্রি" placeholder='ছাত্রি সংখ্যা দিন' />
                                                                                    <NumberField name={`nursery_five_plus.${index}.muslim_total_student`} label="মুসলিম মোট ছাত্র/ছাত্রি" placeholder='মোট সংখ্যা দিন' />

                                                                                    {/* data for hidu students */}
                                                                                    <NumberField name={`nursery_five_plus.${index}.hindu_boy_student`} label="হিন্দু ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                                    <NumberField name={`nursery_five_plus.${index}.hindu_girl_student`} label="হিন্দু ছাত্রি" placeholder='ছাত্রি সংখ্যা দিন' />
                                                                                    <NumberField name={`nursery_five_plus.${index}.hindu_total_student`} label="হিন্দু মোট ছাত্র/ছাত্রি" placeholder='মোট সংখ্যা দিন' />

                                                                                    {/* data for total students */}
                                                                                    <NumberField name={`nursery_five_plus.${index}.total_boy_student`} label="মোট ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                                    <NumberField name={`nursery_five_plus.${index}.total_girl_student`} label="মোট ছাত্রি" placeholder='ছাত্রি সংখ্যা দিন' />
                                                                                    <NumberField name={`nursery_five_plus.${index}.total_student`} label="মোট ছাত্র/ছাত্রি" placeholder='মোট সংখ্যা দিন' />


                                                                                    <NumberField name={`nursery_five_plus.${index}.special_demanded_student`} label="বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী" placeholder='মোট সংখ্যা দিন' />
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
                                                                                    <NumberField name={`class_one.${index}.muslim_girl_student`} label="মুসলিম ছাত্রি" placeholder='ছাত্রি সংখ্যা দিন' />
                                                                                    <NumberField name={`class_one.${index}.muslim_total_student`} label="মুসলিম মোট ছাত্র/ছাত্রি" placeholder='মোট সংখ্যা দিন' />

                                                                                    {/* data for hidu students */}
                                                                                    <NumberField name={`class_one.${index}.hindu_boy_student`} label="হিন্দু ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                                    <NumberField name={`class_one.${index}.hindu_girl_student`} label="হিন্দু ছাত্রি" placeholder='ছাত্রি সংখ্যা দিন' />
                                                                                    <NumberField name={`class_one.${index}.hindu_total_student`} label="হিন্দু মোট ছাত্র/ছাত্রি" placeholder='মোট সংখ্যা দিন' />

                                                                                    {/* data for total students */}
                                                                                    <NumberField name={`class_one.${index}.total_boy_student`} label="মোট ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                                    <NumberField name={`class_one.${index}.total_girl_student`} label="মোট ছাত্রি" placeholder='ছাত্রি সংখ্যা দিন' />
                                                                                    <NumberField name={`class_one.${index}.total_student`} label="মোট ছাত্র/ছাত্রি" placeholder='মোট সংখ্যা দিন' />


                                                                                    <NumberField name={`class_one.${index}.special_demanded_student`} label="বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী" placeholder='মোট সংখ্যা দিন' />
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
                                                                                    <NumberField name={`class_two.${index}.muslim_girl_student`} label="মুসলিম ছাত্রি" placeholder='ছাত্রি সংখ্যা দিন' />
                                                                                    <NumberField name={`class_two.${index}.muslim_total_student`} label="মুসলিম মোট ছাত্র/ছাত্রি" placeholder='মোট সংখ্যা দিন' />

                                                                                    {/* data for hidu students */}
                                                                                    <NumberField name={`class_two.${index}.hindu_boy_student`} label="হিন্দু ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                                    <NumberField name={`class_two.${index}.hindu_girl_student`} label="হিন্দু ছাত্রি" placeholder='ছাত্রি সংখ্যা দিন' />
                                                                                    <NumberField name={`class_two.${index}.hindu_total_student`} label="হিন্দু মোট ছাত্র/ছাত্রি" placeholder='মোট সংখ্যা দিন' />

                                                                                    {/* data for total students */}
                                                                                    <NumberField name={`class_two.${index}.total_boy_student`} label="মোট ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                                    <NumberField name={`class_two.${index}.total_girl_student`} label="মোট ছাত্রি" placeholder='ছাত্রি সংখ্যা দিন' />
                                                                                    <NumberField name={`class_two.${index}.total_student`} label="মোট ছাত্র/ছাত্রি" placeholder='মোট সংখ্যা দিন' />


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
                                                                                    <NumberField name={`class_three.${index}.muslim_girl_student`} label="মুসলিম ছাত্রি" placeholder='ছাত্রি সংখ্যা দিন' />
                                                                                    <NumberField name={`class_three.${index}.muslim_total_student`} label="মুসলিম মোট ছাত্র/ছাত্রি" placeholder='মোট সংখ্যা দিন' />

                                                                                    {/* data for hidu students */}
                                                                                    <NumberField name={`class_three.${index}.hindu_boy_student`} label="হিন্দু ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                                    <NumberField name={`class_three.${index}.hindu_girl_student`} label="হিন্দু ছাত্রি" placeholder='ছাত্রি সংখ্যা দিন' />
                                                                                    <NumberField name={`class_three.${index}.hindu_total_student`} label="হিন্দু মোট ছাত্র/ছাত্রি" placeholder='মোট সংখ্যা দিন' />

                                                                                    {/* data for total students */}
                                                                                    <NumberField name={`class_three.${index}.total_boy_student`} label="মোট ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                                    <NumberField name={`class_three.${index}.total_girl_student`} label="মোট ছাত্রি" placeholder='ছাত্রি সংখ্যা দিন' />
                                                                                    <NumberField name={`class_three.${index}.total_student`} label="মোট ছাত্র/ছাত্রি" placeholder='মোট সংখ্যা দিন' />


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
                                                                                    <NumberField name={`class_four.${index}.muslim_girl_student`} label="মুসলিম ছাত্রি" placeholder='ছাত্রি সংখ্যা দিন' />
                                                                                    <NumberField name={`class_four.${index}.muslim_total_student`} label="মুসলিম মোট ছাত্র/ছাত্রি" placeholder='মোট সংখ্যা দিন' />

                                                                                    {/* data for hidu students */}
                                                                                    <NumberField name={`class_four.${index}.hindu_boy_student`} label="হিন্দু ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                                    <NumberField name={`class_four.${index}.hindu_girl_student`} label="হিন্দু ছাত্রি" placeholder='ছাত্রি সংখ্যা দিন' />
                                                                                    <NumberField name={`class_four.${index}.hindu_total_student`} label="হিন্দু মোট ছাত্র/ছাত্রি" placeholder='মোট সংখ্যা দিন' />

                                                                                    {/* data for total students */}
                                                                                    <NumberField name={`class_four.${index}.total_boy_student`} label="মোট ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                                    <NumberField name={`class_four.${index}.total_girl_student`} label="মোট ছাত্রি" placeholder='ছাত্রি সংখ্যা দিন' />
                                                                                    <NumberField name={`class_four.${index}.total_student`} label="মোট ছাত্র/ছাত্রি" placeholder='মোট সংখ্যা দিন' />


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
                                                                                    <NumberField name={`class_five.${index}.muslim_girl_student`} label="মুসলিম ছাত্রি" placeholder='ছাত্রি সংখ্যা দিন' />
                                                                                    <NumberField name={`class_five.${index}.muslim_total_student`} label="মুসলিম মোট ছাত্র/ছাত্রি" placeholder='মোট সংখ্যা দিন' />

                                                                                    {/* data for hidu students */}
                                                                                    <NumberField name={`class_five.${index}.hindu_boy_student`} label="হিন্দু ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                                    <NumberField name={`class_five.${index}.hindu_girl_student`} label="হিন্দু ছাত্রি" placeholder='ছাত্রি সংখ্যা দিন' />
                                                                                    <NumberField name={`class_five.${index}.hindu_total_student`} label="হিন্দু মোট ছাত্র/ছাত্রি" placeholder='মোট সংখ্যা দিন' />

                                                                                    {/* data for total students */}
                                                                                    <NumberField name={`class_five.${index}.total_boy_student`} label="মোট ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                                    <NumberField name={`class_five.${index}.total_girl_student`} label="মোট ছাত্রি" placeholder='ছাত্রি সংখ্যা দিন' />
                                                                                    <NumberField name={`class_five.${index}.total_student`} label="মোট ছাত্র/ছাত্রি" placeholder='মোট সংখ্যা দিন' />


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
                                                                                    <NumberField name={`class_six.${index}.muslim_girl_student`} label="মুসলিম ছাত্রি" placeholder='ছাত্রি সংখ্যা দিন' />
                                                                                    <NumberField name={`class_six.${index}.muslim_total_student`} label="মুসলিম মোট ছাত্র/ছাত্রি" placeholder='মোট সংখ্যা দিন' />

                                                                                    {/* data for hidu students */}
                                                                                    <NumberField name={`class_six.${index}.hindu_boy_student`} label="হিন্দু ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                                    <NumberField name={`class_six.${index}.hindu_girl_student`} label="হিন্দু ছাত্রি" placeholder='ছাত্রি সংখ্যা দিন' />
                                                                                    <NumberField name={`class_six.${index}.hindu_total_student`} label="হিন্দু মোট ছাত্র/ছাত্রি" placeholder='মোট সংখ্যা দিন' />

                                                                                    {/* data for total students */}
                                                                                    <NumberField name={`class_six.${index}.total_boy_student`} label="মোট ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                                    <NumberField name={`class_six.${index}.total_girl_student`} label="মোট ছাত্রি" placeholder='ছাত্রি সংখ্যা দিন' />
                                                                                    <NumberField name={`class_six.${index}.total_student`} label="মোট ছাত্র/ছাত্রি" placeholder='মোট সংখ্যা দিন' />


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
                                                                                    <NumberField name={`class_seven.${index}.muslim_girl_student`} label="মুসলিম ছাত্রি" placeholder='ছাত্রি সংখ্যা দিন' />
                                                                                    <NumberField name={`class_seven.${index}.muslim_total_student`} label="মুসলিম মোট ছাত্র/ছাত্রি" placeholder='মোট সংখ্যা দিন' />

                                                                                    {/* data for hidu students */}
                                                                                    <NumberField name={`class_seven.${index}.hindu_boy_student`} label="হিন্দু ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                                    <NumberField name={`class_seven.${index}.hindu_girl_student`} label="হিন্দু ছাত্রি" placeholder='ছাত্রি সংখ্যা দিন' />
                                                                                    <NumberField name={`class_seven.${index}.hindu_total_student`} label="হিন্দু মোট ছাত্র/ছাত্রি" placeholder='মোট সংখ্যা দিন' />

                                                                                    {/* data for total students */}
                                                                                    <NumberField name={`class_seven.${index}.total_boy_student`} label="মোট ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                                    <NumberField name={`class_seven.${index}.total_girl_student`} label="মোট ছাত্রি" placeholder='ছাত্রি সংখ্যা দিন' />
                                                                                    <NumberField name={`class_seven.${index}.total_student`} label="মোট ছাত্র/ছাত্রি" placeholder='মোট সংখ্যা দিন' />


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
                                                                                    <NumberField name={`class_eight.${index}.muslim_girl_student`} label="মুসলিম ছাত্রি" placeholder='ছাত্রি সংখ্যা দিন' />
                                                                                    <NumberField name={`class_eight.${index}.muslim_total_student`} label="মুসলিম মোট ছাত্র/ছাত্রি" placeholder='মোট সংখ্যা দিন' />

                                                                                    {/* data for hidu students */}
                                                                                    <NumberField name={`class_eight.${index}.hindu_boy_student`} label="হিন্দু ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                                    <NumberField name={`class_eight.${index}.hindu_girl_student`} label="হিন্দু ছাত্রি" placeholder='ছাত্রি সংখ্যা দিন' />
                                                                                    <NumberField name={`class_eight.${index}.hindu_total_student`} label="হিন্দু মোট ছাত্র/ছাত্রি" placeholder='মোট সংখ্যা দিন' />

                                                                                    {/* data for total students */}
                                                                                    <NumberField name={`class_eight.${index}.total_boy_student`} label="মোট ছাত্র" placeholder='ছাত্র সংখ্যা দিন' />
                                                                                    <NumberField name={`class_eight.${index}.total_girl_student`} label="মোট ছাত্রি" placeholder='ছাত্রি সংখ্যা দিন' />
                                                                                    <NumberField name={`class_eight.${index}.total_student`} label="মোট ছাত্র/ছাত্রি" placeholder='মোট সংখ্যা দিন' />


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
                                        </CustomTabPanel>

                                        <CustomTabPanel value={studentTabValue} index={2}>
                                            <div className='pt-8'>

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
                                        </CustomTabPanel>
                                    </Box>
                                </div>
                            </div>
                            <button type="submit" className="px-6 md:py-[10px] py-[6px] md:pt-[15px] pt-[10px] bg-primaryColor border border-primaryColor hover:bg-textColor text-white rounded-md font-semibold capitalize mt-5">সাবমিট করুন</button>
                        </Form>
                    )
                }
            </Formik>

        </div >
    );
};

export default BilReturnSubmit;