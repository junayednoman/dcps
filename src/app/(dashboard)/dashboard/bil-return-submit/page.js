"use client"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@/app/components/TextField';
import { Field, Form, Formik } from 'formik';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CustomTabPanel from '@/app/components/CutomTabPanel';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import NumberField from '@/app/components/NumberField';
import MyDatePicker from '@/app/components/MyDatePicker';
import AnimateHeight from 'react-animate-height';


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

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const [tabValue, setTabValue] = React.useState(0);

    const handleChange = (event, newTabValue) => {
        setTabValue(newTabValue);
    };

    const handleFormSubmit = (values) => {
        console.log(values);
    };


    const [accordionActive, setAccordionActive] = React.useState();
    const togglePara = (value) => {
        setAccordionActive((oldValue) => (oldValue === value ? 0 : value));
    };


    console.log(accordionActive);
    return (
        <div className='bg-[#FAFAFA]'>
            <h2 className='md:text-2xl text-xl font-semibold md:mb-20 mb-12'>বিল রিটার্ন সাবমিট</h2>
            <Formik
                initialValues={{
                    school_name: "",
                    building_number: "",
                    building_situation_1: "",
                    building_type_1: "",
                    building_situation_2: "",
                    building_type_2: "",
                    building_situation_3: "",
                    building_situation_4: "",
                    building_type_3: "",
                    building_type_4: "",
                }}
                // validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
            >
                {
                    ({ isSubmitting }) => (
                        <Form>
                            <div className='flex lg:flex-row flex-col md:gap-8 gap-5'>
                                {/* school related data */}
                                <div className='xl:w-[80%] w-full border bg-white shadow-sm rounded-[4px] p-8'>
                                    <h2 className='md:text-xl text-lg font-semibold md:mb-8'>বিদ্যালয় সংক্রান্ত তথ্য</h2>
                                    <Box sx={{ width: '100%' }}>
                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                            <Tabs className='text-xl' variant="scrollable" scrollButtons="auto" value={tabValue} onChange={handleChange} aria-label="basic tabs example">
                                                <Tab label="সাধারণ তথ্য" {...a11yProps(0)} />
                                                <Tab label="ভৌত সুবিধাদি তথ্য" {...a11yProps(1)} />
                                                <Tab label="ভুমি বিষয়ক তথ্য" {...a11yProps(2)} />
                                                <Tab label="উপবৃত্তি সংক্রান্ত তথ্য" {...a11yProps(3)} />
                                                <Tab label="সভা সংক্রান্ত তথ্য" {...a11yProps(4)} />
                                            </Tabs>
                                        </Box>
                                        <CustomTabPanel value={tabValue} index={0}>
                                            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-6 pt-8'>
                                                <TextField name="school_name" label="বিদ্যালয়ের নাম" placeholder={"বিদ্যালয়ের নাম লিখুন"} />
                                                <TextField name="village" label="গ্রামের নাম" placeholder={"গ্রামের নাম লিখুন"} />
                                                <TextField name="word_number" label="ওয়ার্ড নাম্বার" placeholder={"ওয়ার্ড নাম্বার লিখুন"} />
                                                <TextField name="cluster" label="ক্লাস্টার" placeholder={"ক্লাস্টার লিখুন"} />
                                                <TextField name="post_office" label="ডাকঘর" placeholder={"ডাকঘর লিখুন"} />
                                                <TextField name="union_corporation" label="ইউনিয়ন/পৌরসভা" placeholder={"ইউনিয়ন/পৌরসভা লিখুন"} />
                                                <TextField name="emis_code" label="EMIS কোড" placeholder={"EMIS কোড লিখুন"} />
                                                <TextField name="school_email" label="বিদ্যালয়ের ইমেইল" placeholder={"বিদ্যালয়ের ইমেইল লিখুন"} />
                                                <TextField name="found_date" label="প্রতিষ্ঠার সন" placeholder={"প্রতিষ্ঠার সন লিখুন"} />

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
                                        <CustomTabPanel value={tabValue} index={1}>
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
                                                            <div className='mb-4'>
                                                                <label className='font-semibold' htmlFor={`building_date_1`}>ভবন ১ এর নির্মাণ সন*</label>
                                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                    <DatePicker
                                                                        className='border-black h-3'
                                                                    />
                                                                </LocalizationProvider>
                                                            </div>
                                                            <div className="mb-4">
                                                                <label className='font-semibold' htmlFor={`building_situation_1`}>ভবন ১ এর বর্তমান অবস্থা*</label>
                                                                <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`building_situation_1`} id={`building_situation_1`}>
                                                                    <option className='text-gray-300' value="Select an option" selected >ভবনের অবস্থা সিলেক্ট করুন</option>
                                                                    <option value="ভাল">ভাল</option>
                                                                    <option value="জরাজীর্ণ">জরাজীর্ণ</option>
                                                                    <option value="পরিত্যাক্ত">পরিত্যাক্ত</option>
                                                                </Field>
                                                            </div>
                                                            <div className="mb-4">
                                                                <label className='font-semibold' htmlFor={`building_type_1`}>ভবন ১ এর ধরন*</label>
                                                                <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`building_type_1`} id={`building_type_1`}>
                                                                    <option className='text-gray-300' value="Select an option" selected>ভবনের ধরন সিলেক্ট করুন</option>
                                                                    <option value="পাকা">পাকা</option>
                                                                    <option value="সেমিপাকা">সেমিপাকা</option>
                                                                    <option value="টিনশেড">টিনশেড</option>
                                                                </Field>
                                                            </div>
                                                        </div>
                                                    }

                                                    {buildingNumber >= 2 &&
                                                        <div className='mt-3 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-6'>
                                                            <div className='mb-4'>
                                                                <label className='font-semibold' htmlFor={`building_date_2`}>ভবন 2 এর নির্মাণ সন*</label>
                                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                    <DatePicker
                                                                        className='border-black h-3'
                                                                    />
                                                                </LocalizationProvider>
                                                            </div>
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
                                                            <div className='mb-4'>
                                                                <label className='font-semibold' htmlFor={`building_date_3`}>ভবন ৩ এর নির্মাণ সন*</label>
                                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                    <DatePicker
                                                                        className='border-black h-3'
                                                                    />
                                                                </LocalizationProvider>
                                                            </div>
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
                                                            <div className='mb-4'>
                                                                <label className='font-semibold' htmlFor={`building_date_4`}>ভবন ৪ এর নির্মাণ সন*</label>
                                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                    <DatePicker
                                                                        className='border-black h-3'
                                                                    />
                                                                </LocalizationProvider>
                                                            </div>
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
                                                    <NumberField label="মাল্টিমিডিয়া কক্ষ" placeholder="মাল্টিমিডিয়া কক্ষ সংখ্যা দিন" name="multimedia_room" />
                                                    <NumberField label="শিশু শ্রেণী" placeholder="শিশু শ্রেণী সংখ্যা দিন" name="nursery_class" />

                                                    <div className="mb-4">
                                                        <label className='font-semibold' htmlFor="border_wall">সিমানা প্রাচীর*</label>
                                                        <Field onChange={handleBorderWallChange} className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name="border_wall" id="border_wall">
                                                            <option className='text-gray-300' value="Select an option" selected>একটি অপশন সিলেক্ট করুন</option>
                                                            <option value="আছে">আছে</option>
                                                            <option value="নাই">নাই</option>
                                                        </Field>
                                                    </div>

                                                    {borderWall === "আছে" &&
                                                        <MyDatePicker label="সিমানা প্রাচীর নির্মাণের সন" name="border_wall_building_data" />
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

                                                    <NumberField label="প্রধান" placeholder="প্রধান শিক্ষকের কক্ষ সংখ্যা দিন" name="head_master_room" />
                                                </div>

                                                {/* others data */}
                                                <div className='mt-8'>
                                                    <button type="button" className={`relative border-gray-300 flex justify-between items-center w-full px-4 py-3 text-sm font-medium text-left rounded-lg border ${accordionActive === 'others_data' ? ' bg-slate-200' : '  bg-slate-100'}  ${accordionActive === 'others_data' ? 'active' : ''}`} onClick={() => togglePara('others_data')}>
                                                        <h5 className="text-gray-900 text-[16px]">অন্যান্য তথ্য</h5>
                                                        <svg className={`w-4 h-4 ml-2 duration-500 ${accordionActive === 'others_data' ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </button>

                                                    <AnimateHeight duration={300} height={accordionActive === 'others_data' ? 'auto' : 0}>
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
                                                                    <label className='font-semibold' htmlFor={`roof_garden`}>ছাদ বাগান*</label>
                                                                    <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`roof_garden`} id={`roof_garden`}>
                                                                        <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                                                                        <option value="আছে">আছে</option>
                                                                        <option value="নাই">নাই</option>
                                                                    </Field>
                                                                </div>

                                                                <div className="mb-4">
                                                                    <label className='font-semibold' htmlFor={`internet`}>ইন্টারনেট*</label>
                                                                    <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`internet`} id={`internet`}>
                                                                        <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                                                                        <option value="আছে">আছে</option>
                                                                        <option value="নাই">নাই</option>
                                                                    </Field>
                                                                </div>
                                                            </div>

                                                            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4 mt-4'>
                                                                <div className="mb-4">
                                                                    <label className="font-semibold" htmlFor="laptop_number">ল্যাপটপ সংখ্যা*</label>
                                                                    <input placeholder="ল্যাপটপ সংখ্যা দিন" name='laptop_number' id="laptop_number" onChange={handleLaptopChange} type="number" className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" />
                                                                </div>
                                                            </div>

                                                            {laptop >= 1 &&
                                                                < div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-6'>
                                                                    <div className="mb-4">
                                                                        <label className='font-semibold' htmlFor={`laption_condition`}>ল্যাপটপ এর বর্তমান অবস্থা*</label>
                                                                        <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`laption_condition`} id={`laption_condition`}>
                                                                            <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                                                                            <option value="সচল">সচল</option>
                                                                            <option value="নষ্ট">নষ্ট</option>
                                                                        </Field>
                                                                    </div>
                                                                </div>
                                                            }


                                                            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4 mt-4'>
                                                                <div className="mb-4">
                                                                    <label className="font-semibold" htmlFor="multimedia_number">মাল্টিমিডিয়া সংখ্যা*</label>
                                                                    <input placeholder="মাল্টিমিডিয়া সংখ্যা দিন" name='multimedia_number' id="multimedia_number" onChange={handleMultimediaChange} type="number" className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" />
                                                                </div>
                                                            </div>

                                                            {multimedia >= 1 &&
                                                                < div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-6'>
                                                                    <div className="mb-4">
                                                                        <label className='font-semibold' htmlFor={`multimedia_condition`}>মাল্টিমিডিয়া এর বর্তমান অবস্থা*</label>
                                                                        <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`multimedia_condition`} id={`multimedia_condition`}>
                                                                            <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                                                                            <option value="সচল">সচল</option>
                                                                            <option value="নষ্ট">নষ্ট</option>
                                                                        </Field>
                                                                    </div>
                                                                </div>
                                                            }


                                                            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4 mt-4'>
                                                                <div className="mb-4">
                                                                    <label className="font-semibold" htmlFor="piano_number">পিয়ানো সংখ্যা*</label>
                                                                    <input placeholder="পিয়ানো সংখ্যা দিন" name='piano_number' id="piano_number" onChange={handlePianoChange} type="number" className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" />
                                                                </div>
                                                            </div>

                                                            {piano >= 1 &&
                                                                < div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-6'>
                                                                    <div className="mb-4">
                                                                        <label className='font-semibold' htmlFor={`piano_condition`}>পিয়ানো এর বর্তমান অবস্থা*</label>
                                                                        <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`piano_condition`} id={`piano_condition`}>
                                                                            <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                                                                            <option value="সচল">সচল</option>
                                                                            <option value="নষ্ট">নষ্ট</option>
                                                                        </Field>
                                                                    </div>
                                                                </div>
                                                            }

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
                                                    <button type="button" className={`relative border-gray-300 flex justify-between items-center w-full px-4 py-3 text-sm font-medium text-left rounded-lg border ${accordionActive === 'water_system_data' ? ' bg-slate-200' : '  bg-slate-100'}  ${accordionActive === 'water_system_data' ? 'active' : ''}`} onClick={() => togglePara('water_system_data')}>
                                                        <h5 className="text-gray-900 text-[16px]">পানিয় জল সংক্রান্ত তথ্য</h5>
                                                        <svg className={`w-4 h-4 ml-2 duration-500 ${accordionActive === 'water_system_data' ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </button>

                                                    <AnimateHeight duration={300} height={accordionActive === 'water_system_data' ? 'auto' : 0}>
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
                                                                            <option value="পরিত্যক্ত">পরিত্যক্ত</option>
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
                                                                            <option value="পরিত্যক্ত">পরিত্যক্ত</option>
                                                                        </Field>
                                                                    </div>
                                                                </div>
                                                            }

                                                        </ul>
                                                    </AnimateHeight>
                                                </div>

                                            </div>

                                        </CustomTabPanel>
                                        <CustomTabPanel value={tabValue} index={2}>
                                            {/* land related data */}
                                            <div className='pt-8 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4'>
                                                <NumberField name="land_amount" label="ভুমির পরিমান(শতাংশ)" placeholder="ভুমির পরিমান দিন" />
                                                <NumberField name="take_overed_land_amount" label="দখলকৃত ভুমির পরিমান(শতাংশ)" placeholder="দখলকৃত ভুমির পরিমান দিন" />
                                                <NumberField name="dispossessed_land" label="বেদখলকৃত ভুমির পরিমান(শতাংশ)" placeholder="বেদখলকৃত ভুমির পরিমান দিন" />
                                                <div className="mb-4">
                                                    <label className='font-semibold' htmlFor={"is_registered"}>রেজিস্টার করা আছে কিনা*</label>
                                                    <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={"is_registered"} id={"is_registered"}>
                                                        <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                                                        <option value='হ্যাঁ'>হ্যাঁ</option>
                                                        <option value='না'>না</option>
                                                    </Field>
                                                </div>
                                                <NumberField name="khatian_number" label="খাতিয়ান নং" placeholder="খাতিয়ান নং দিন" />
                                                <NumberField name="dag_number" label="দাগ নং" placeholder="দাগ নং দিন" />
                                                <NumberField name="dolil_number" label="দলিল নং" placeholder="দলিল নং দিন" />
                                                <MyDatePicker label="দলিল সন" name="dolil_year" />
                                                <div className="mb-4">
                                                    <label className='font-semibold' htmlFor={"is_namjaried"}>নামজারি আছে কিনা*</label>
                                                    <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={"is_namjaried"} id={"is_namjaried"}>
                                                        <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                                                        <option value='হ্যাঁ'>হ্যাঁ</option>
                                                        <option value='না'>না</option>
                                                    </Field>
                                                </div>
                                                <div className="mb-4">
                                                    <label className='font-semibold' htmlFor={"is_cased"}>মামলা আছে কিনা*</label>
                                                    <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={"is_cased"} id={"is_cased"}>
                                                        <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                                                        <option value='হ্যাঁ'>হ্যাঁ</option>
                                                        <option value='না'>না</option>
                                                    </Field>
                                                </div>
                                                <div className="mb-4">
                                                    <label className='font-semibold' htmlFor={"land_development_tax_paid"}>ভুমি উন্নয়ন কর*</label>
                                                    <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={"land_development_tax_paid"} id={"land_development_tax_paid"}>
                                                        <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected >একটি অপশন সিলেক্ট করুন</option>
                                                        <option value='পরিশোধিত'>পরিশোধিত</option>
                                                        <option value='অপরিশোধিত'>অপরিশোধিত</option>
                                                    </Field>
                                                </div>
                                            </div>
                                        </CustomTabPanel>
                                        <CustomTabPanel value={tabValue} index={3}>
                                            {/* stipend related data */}
                                            <div className='pt-8 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4'>
                                                <NumberField name="total_stipend_consumers" label="সর্বশেষ প্রান্তিকে মোট সুবিধাভোগি" placeholder="সর্বশেষ প্রান্তিকে মোট সুবিধাভোগির সংখ্যা দিন" />
                                                <NumberField name="stipend_demand" label="উপবৃত্তির চাহিদা" placeholder="উপবৃত্তির চাহিদা দিন" />
                                                <NumberField name="stipend_received_money" label="উপবৃত্তির প্রাপ্ত অর্থ" placeholder="উপবৃত্তির প্রাপ্ত অর্থ দিন" />
                                            </div>
                                        </CustomTabPanel>
                                        <CustomTabPanel value={tabValue} index={4}>
                                            {/* stipend related data */}
                                            <div className='pt-8 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4'>
                                                <NumberField name="smc" label="এসএমসি" placeholder="এসএমসি সভার সংখ্যা দিন" />
                                                <NumberField name="pta" label="পিটিএ" placeholder="পিটিএ সভার সংখ্যা দিন" />
                                                <NumberField name="mother_conference" label="মা-সমাবেশ" placeholder="মা-সমাবেশ এর সংখ্যা দিন" />
                                                <NumberField name="gurdian_conference" label="অভিভাবক-সমাবেশ" placeholder="অভিভাবক-সমাবেশ এর সংখ্যা দিন" />
                                                <NumberField name="staff_meeting" label="স্টাফ মিটিং" placeholder="স্টাফ মিটিং এর সংখ্যা দিন" />
                                                <NumberField name="yard_assembly" label="উঠান বৈঠক" placeholder="উঠান বৈঠক এর সংখ্যা দিন" />
                                            </div>
                                        </CustomTabPanel>
                                    </Box>
                                </div>
                                {/* student and teacher related data */}
                            </div>
                            {/* <button type='submit'>submit</button> */}
                        </Form>
                    )
                }
            </Formik>

        </div >
    );
};

export default BilReturnSubmit;