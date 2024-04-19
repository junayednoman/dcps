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
import dayjs from 'dayjs';

const BilReturnSubmit = () => {
    const [buildingNumber, setBuildingNumber] = React.useState([]);
    const [buildingArray, setBuildingArray] = React.useState([]);
    const handleBuildingNumber = (e) => {
        setBuildingNumber(e.target.value)
    }
    const handleFormSubmit = () => {
        console.log("clicking");
    };


    React.useEffect(() => {
        const newArray = Array.from({ length: buildingNumber });
        setBuildingArray(newArray);
    }, [buildingNumber]);

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

    return (
        <div className='bg-[#FAFAFA]'>
            <h2 className='md:text-2xl text-xl font-semibold md:mb-20 mb-12'>বিল রিটার্ন সাবমিট</h2>
            <Formik
                initialValues={{ school_name: "" }}
                // validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
            >
                {
                    ({ isSubmitting }) => (
                        <Form>
                            <div className='flex lg:flex-row flex-col md:gap-8 gap-5'>
                                {/* school related data */}
                                <div className='xl:w-[78%] w-full border bg-white shadow-sm rounded-[4px] p-8'>
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
                                                        <option className='text-gray-300' value="Select an option" selected disabled>গ্রেড সিলেক্ট করুন</option>
                                                        <option value="A">A</option>
                                                        <option value="B">B</option>
                                                        <option value="C">C</option>
                                                        <option value="D">D</option>
                                                    </Field>
                                                </div>
                                                <div className="mb-4">
                                                    <label className='font-semibold' htmlFor="shift">শিফট সংখ্যা*</label>
                                                    <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name="shift" id="shift">
                                                        <option className='text-gray-300' value="Select an option" selected disabled>শিফট সিলেক্ট করুন</option>
                                                        <option value="A">১</option>
                                                        <option value="B">২</option>
                                                    </Field>
                                                </div>
                                                <TextField name="cluster" label="ক্লাস্টার" placeholder={"ক্লাস্টার লিখুন"} />
                                            </div>
                                        </CustomTabPanel>
                                        <CustomTabPanel value={tabValue} index={1}>
                                            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4 pt-8'>
                                                <div className="mb-4">
                                                    <label className="font-semibold" htmlFor="building_number">ভবন সংখ্যা*</label>
                                                    <Field onChange={handleBuildingNumber} className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" type="number" name="building_number" id="building_number" placeholder="ভবন সংখ্যা" />
                                                </div>
                                            </div>
                                            {buildingNumber > 0 &&
                                                <div className=''>
                                                    {/* <hr className='pb-3' /> */}
                                                    {buildingArray.map((item, i) =>
                                                        < div key={i} className='mt-6'>
                                                            {/* <label className="font-semibold pt-5 text-lg mb-3" htmlFor="building_number">ভবন {i + 1} এর বিবরণ</label> */}
                                                            <div className='mt-3 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-6'>
                                                                {/* <TextField label={`ভবন ${i + 1} নির্মাণের সন`} name={`building_date_${i + 1}`} placeholder={`ভবন ${i + 1} নির্মাণের সন লিখুন`} /> */}

                                                                <div className='mb-4'>
                                                                    <label className='font-semibold' htmlFor={`building_date_${i + 1}`}>ভবন {i + 1} এর নির্মাণ সন*</label>
                                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                        <DatePicker
                                                                            className='border-black h-3'
                                                                        />
                                                                    </LocalizationProvider>
                                                                </div>
                                                                <div className="mb-4">
                                                                    <label className='font-semibold' htmlFor={`building_situation_${i + 1}`}>ভবন {i + 1} এর বর্তমান অবস্থা*</label>
                                                                    <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`building_situation_${i + 1}`} id={`building_situation_${i + 1}`}>
                                                                        <option className='text-gray-300' value="Select an option" selected disabled>ভবনের অবস্থা সিলেক্ট করুন</option>
                                                                        <option value="ভাল">ভাল</option>
                                                                        <option value="জরাজীর্ণ">জরাজীর্ণ</option>
                                                                        <option value="পরিত্যাক্ত">পরিত্যাক্ত</option>
                                                                    </Field>
                                                                </div>
                                                                <div className="mb-4">
                                                                    <label className='font-semibold' htmlFor={`building_type_${i + 1}`}>ভবন {i + 1} এর ধরন*</label>
                                                                    <Field className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={`building_type_${i + 1}`} id={`building_type_${i + 1}`}>
                                                                        <option className='text-gray-300' value="Select an option" selected disabled>ভবনের ধরন সিলেক্ট করুন</option>
                                                                        <option value="পাকা">পাকা</option>
                                                                        <option value="সেমিপাকা">সেমিপাকা</option>
                                                                        <option value="টিনশেড">টিনশেড</option>
                                                                    </Field>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                    }

                                                </div>
                                            }
                                        </CustomTabPanel>
                                        <CustomTabPanel value={tabValue} index={2}>
                                            Item Three
                                        </CustomTabPanel>
                                        <CustomTabPanel value={tabValue} index={3}>
                                            উপবৃত্তি
                                        </CustomTabPanel>
                                        <CustomTabPanel value={tabValue} index={4}>
                                            সভা
                                        </CustomTabPanel>
                                    </Box>
                                </div>
                                {/* student and teacher related data */}
                            </div>
                        </Form>
                    )
                }
            </Formik>

        </div >
    );
};

export default BilReturnSubmit;