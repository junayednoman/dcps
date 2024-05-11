"use client"
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CustomTabPanel from '@/app/components/CutomTabPanel';
import DataDropdown from '@/app/components/DataDropdown';
import DataGrid from '@/app/components/DataGrid';
import PairedData from '@/app/components/PairedData';

const BillDetails = () => {
    const [activeItem, setActiveItem] = React.useState('');

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    function schoolTabIndexes(index) {
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


    return (
        <div id="print-content" className='bg-[#FAFAFA] xl:w-[80%] w-full'>
            <h2 className='md:text-2xl text-xl font-semibold md:mb-14 mb-8'>বিল রিটার্ন বিস্তারিত</h2>
            {/* school related data */}
            <div className='flex lg:flex-row flex-col md:gap-8 gap-5'>
                <div className='border bg-white shadow-sm rounded-[4px] p-8 w-full'>
                    <h2 className='md:text-xl text-lg font-semibold md:mb-8'>বিদ্যালয় সংক্রান্ত তথ্য</h2>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs indicatorColor="#000" className='text-xl' variant="scrollable" scrollButtons="auto" value={schoolTabValue} onChange={handleSchoolTabValueChange} aria-label="basic tabs example">
                                <Tab label="সাধারণ তথ্য" {...schoolTabIndexes(0)} />
                                <Tab label="ভৌত অবকাঠামো তথ্য" {...schoolTabIndexes(1)} />
                                <Tab label="ভূমি বিষয়ক তথ্য" {...schoolTabIndexes(2)} />
                                <Tab label="উপবৃত্তি সংক্রান্ত তথ্য" {...schoolTabIndexes(3)} />
                                <Tab label="সভা সংক্রান্ত তথ্য" {...schoolTabIndexes(4)} />
                                <Tab label="উন্নয়ন কার্যক্রম সংক্রান্ত তথ্য" {...schoolTabIndexes(5)} />
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={schoolTabValue} index={0}>
                            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4 gap-y-4 pt-6'>
                                <PairedData label={"বিদ্যালয়ের নাম"} value={"খলিলপুর সরকারি প্রাথমিক বিদ্যালয়"} />
                                <PairedData label={"ক্লাস্টার"} value={"সাধুহাটি"} />
                                <PairedData label={"গ্রাম/মহল্লার নাম"} value={"খলিলপুর"} />
                                <PairedData label={"ওয়ার্ড নাম্বার"} value={"৪"} />
                                <PairedData label={"ডাকঘর"} value={"খলিলপুর"} />
                                <PairedData label={"ইউনিয়ন/পৌরসভা"} value={"খলিলপুর"} />
                                <PairedData label={"EMIS কোড"} value={"34i6u"} />
                                <PairedData label={"বিদ্যালয়ের ইমেইল"} value={"example@gmail.com"} />
                                <PairedData label={"প্রতিষ্ঠার সন"} value={"০৩/০৬/২০০১"} />
                                <PairedData label={"গ্রেড"} value={"A"} />
                                <PairedData label={"শিফট সংখ্যা"} value={"১"} />
                                <PairedData label={"বিদ্যালয়ের"} value={"খলিলপুর"} />
                                {/* <PairedData label={"প্রতিষ্ঠার সন"} value={"০৩/০৬/২০০১"} /> */}
                            </div>
                        </CustomTabPanel>
                        <CustomTabPanel value={schoolTabValue} index={1}>
                            <div className='pt-6'>
                                <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4 gap-y-4'>
                                    <PairedData label={"ভবন সংখ্যা"} value={"৩"} />
                                    <PairedData label={"ভবন ১ নির্মাণের সন"} value={"সাধুহাটি"} />
                                    <PairedData label={"ভবন ১ এর ধরন"} value={"খলিলপুর"} />
                                    <PairedData label={"ভবন ১ এর বর্তমান অবস্থা"} value={"৪"} />
                                    <PairedData label={"প্রধান শিক্ষকের কক্ষ"} value={"খলিলপুর"} />
                                    <PairedData label={"অফিস কক্ষ"} value={"খলিলপুর"} />
                                    <PairedData label={"শ্রেণী কক্ষ"} value={"34i6u"} />
                                    <PairedData label={"ব্যবহারযোগ্য শ্রেণী কক্ষ"} value={"3"} />
                                    <PairedData label={"মাল্টিমিডিয়া কক্ষ"} value={"3"} />
                                    <PairedData label={"পৃথক শিশু শ্রেণী"} value={"3"} />
                                    <PairedData label={"সীমানা প্রাচীর"} value={"3"} />
                                    <PairedData label={"সীমানা প্রাচীরের অর্থায়ন ধরন"} value={"3"} />
                                    <PairedData label={"সীমানা প্রাচীর নির্মাণের সন"} value={"3"} />
                                    <PairedData label={"টয়লেট সংখ্যা"} value={"3"} />
                                    <PairedData label={"ওয়াশ ব্লক"} value={"3"} />
                                    <PairedData label={"ওয়াশ ব্লক নির্মাণের সন"} value={"ওয়াশ ব্লক নির্মাণের সন"} />

                                </div>
                                <div className='mt-8'>
                                    <DataDropdown title={"অন্যান্য তথ্য"} itemKey={"othersDataDetails"} activeItem={activeItem} setActiveItem={setActiveItem}>
                                        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4 gap-y-4 pt-3'>
                                            <PairedData label={"শহিদ মিনার"} value={"খলিলপুর"} />
                                            <PairedData label={"মুক্তিযুদ্ধ কর্নার"} value={"খলিলপুর"} />
                                            <PairedData label={"শেখ রাসেল কর্নার"} value={"খলিলপুর"} />
                                            <PairedData label={"বাগান/ছাদ বাগান"} value={"খলিলপুর"} />
                                            <PairedData label={"ইন্টারনেট"} value={"খলিলপুর"} />
                                            <PairedData label={"ল্যাপটপ সংখ্যা"} value={"খলিলপুর"} />
                                            <PairedData label={"সচল ল্যাপটপের সংখ্যা"} value={"খলিলপুর"} />
                                            <PairedData label={"মাল্টিমিডিয়া সংখ্যা"} value={"খলিলপুর"} />
                                            <PairedData label={"সচল মাল্টিমিডিয়া সংখ্যা"} value={"খলিলপুর"} />
                                            <PairedData label={"পিয়ানো সংখ্যা"} value={"খলিলপুর"} />
                                            <PairedData label={"পিয়ানো এর বর্তমান অবস্থা"} value={"খলিলপুর"} />
                                            <PairedData label={"বিদ্যুৎ সংযোগ"} value={"খলিলপুর"} />
                                        </div>
                                    </DataDropdown>
                                </div>
                                <div>
                                    <DataDropdown title={"পানিয় জল সংক্রান্ত তথ্য"} itemKey={"waterReletadData"} activeItem={activeItem} setActiveItem={setActiveItem}>
                                        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4 gap-y-4 pt-3'>
                                            <PairedData label={"টিউবওয়েল সংখ্যা"} value={"খলিলপুর"} />
                                            <PairedData label={"টিউবওয়েল এর বর্তমান অবস্থা"} value={"খলিলপুর"} />
                                            <PairedData label={"ডিপ টিউবওয়েল সংখ্যা"} value={"খলিলপুর"} />
                                            <PairedData label={"ডিপ টিউবওয়েল এর বর্তমান অবস্থা"} value={"খলিলপুর"} />
                                            <PairedData label={"বিদ্যালয়ের"} value={"খলিলপুর"} />
                                        </div>
                                    </DataDropdown>
                                </div>
                            </div>
                        </CustomTabPanel>
                        <CustomTabPanel value={schoolTabValue} index={2}>
                            {/* land related data */}
                            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4 gap-y-4 pt-6'>
                                <PairedData label={"ভূমির পরিমান(শতাংশ)"} value={"৩৩"} />
                                <PairedData label={"দখলকৃত ভূমির পরিমান(শতাংশ)"} value={"৩৩"} />
                                <PairedData label={"বেদখলকৃত ভূমির পরিমান(শতাংশ)"} value={"৩৩"} />
                                <PairedData label={"রেজিস্টার করা আছে কিনা"} value={"৩৩"} />
                                <PairedData label={"রেজিস্ট্রেশন এর মালিকানা"} value={"৩৩"} />
                                <PairedData label={"খতিয়ান নং"} value={"৩৩"} />
                                <PairedData label={"দাগ নং"} value={"৩৩"} />
                                <PairedData label={"দলিল নং"} value={"৩৩"} />
                                <PairedData label={"দলিল সন"} value={"৩৩"} />
                                <PairedData label={"নামজারি আছে কিনা"} value={"৩৩"} />
                                <PairedData label={"নামজারি এর মালিকানা"} value={"৩৩"} />
                                <PairedData label={"মামলা আছে কিনা"} value={"৩৩"} />
                                <PairedData label={"ভূমি উন্নয়ন কর"} value={"৩৩"} />
                            </div>
                        </CustomTabPanel>
                        <CustomTabPanel value={schoolTabValue} index={3}>
                            {/* stipend related data */}
                            <DataGrid>
                                <PairedData label={"সর্বশেষ প্রান্তিকের সময়কাল"} value={"ভূমি উন্নয়ন কর"} />
                                <PairedData label={"সর্বশেষ প্রান্তিকে মোট সুবিধাভোগী"} value={"ভূমি উন্নয়ন কর"} />
                                <PairedData label={"উপবৃত্তির চাহিদা"} value={"ভূমি উন্নয়ন কর"} />
                                <PairedData label={"বিতরণকৃত অর্থের পরিমান"} value={"ভূমি উন্নয়ন কর"} />
                            </DataGrid>
                        </CustomTabPanel>
                        <CustomTabPanel value={schoolTabValue} index={4}>
                            {/* conference related data */}
                            <DataGrid>
                                <PairedData label={"এসএমসি"} value={"3"} />
                                <PairedData label={"পিটিএ"} value={"3"} />
                                <PairedData label={"মা-সমাবেশ"} value={"3"} />
                                <PairedData label={"অভিভাবক-সমাবেশ"} value={"3"} />
                                <PairedData label={"উঠান বৈঠক"} value={"3"} />
                                <PairedData label={"স্টাফ মিটিং"} value={"3"} />
                            </DataGrid>
                        </CustomTabPanel>
                        <CustomTabPanel value={schoolTabValue} index={5}>
                            {/* budget related data */}
                            <DataGrid>
                                <PairedData label={"বরাদ্দের ধরন"} value={"3"} />
                                <PairedData label={"অর্থ বছর"} value={"3"} />
                                <PairedData label={"অর্থের পরিমান"} value={"3"} />
                            </DataGrid>
                        </CustomTabPanel>
                    </Box>
                </div>
                {/* student and teacher related data */}
            </div>

            {/* teacher related data */}
            <div className='flex lg:flex-row flex-col md:gap-8 gap-5 md:mt-8 mt-5'>
                <div className='border bg-white shadow-sm rounded-[4px] p-8 w-full'>
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
                            <DataGrid>
                                <PairedData label={"অনুমোদিত পদ"} value={"3"} />
                                <PairedData label={"কর্মরত পদ"} value={"3"} />
                                <PairedData label={"শূন্য পদ"} value={"3"} />
                                <PairedData label={"কর্মরত শিক্ষক(পুরুষ)"} value={"3"} />
                                <PairedData label={"কর্মরত শিক্ষক(মহিলা)"} value={"3"} />
                            </DataGrid>
                        </CustomTabPanel>
                        <CustomTabPanel value={teacherTabValue} index={1}>
                            <DataGrid>
                                <PairedData label={"শিক্ষকের নাম"} value={"3"} />
                                <PairedData label={"শিক্ষকের পদবি"} value={"3"} />
                                <PairedData label={"সর্বশেষ শিক্ষাগত যোগ্যতা"} value={"3"} />
                                <PairedData label={"বিভাগীয় প্রশিক্ষণ"} value={"3"} />
                                <PairedData label={"জন্ম তারিখ"} value={"3"} />
                                <PairedData label={"প্রথম যোগদানের তারিখ"} value={"3"} />
                                <PairedData label={"উক্ত পদে যোগদানের তারিখ"} value={"3"} />
                                <PairedData label={"এই বিদ্যালয়ে যোগদানের তারিখ"} value={"3"} />
                                <PairedData label={"বেতন স্কেল"} value={"3"} />
                                <PairedData label={"মূল বেতন"} value={"3"} />
                                <PairedData label={"শিক্ষা ভাতা"} value={"3"} />
                                <PairedData label={"ব্যাংক হিসাব নং"} value={"3"} />
                                <PairedData label={"জিপিএফ নং"} value={"3"} />
                                <PairedData label={"সক্রিয় মোবাইল নং"} value={"3"} />
                                <PairedData label={"চলতি বছরে মোট নৈমিত্তিক ছুটি"} value={"3"} />
                                <PairedData label={"স্বাক্ষর"} value={"3"} />
                            </DataGrid>
                        </CustomTabPanel>
                        <CustomTabPanel value={teacherTabValue} index={2}>
                            {/* vacation related data */}
                            <DataGrid>
                                <PairedData label={"শিক্ষকের নাম"} value={"স্বাক্ষর"} />
                                <PairedData label={"ছুটির ধরন"} value={"স্বাক্ষর"} />
                                <PairedData label={"ছুটি শুরু"} value={"স্বাক্ষর"} />
                                <PairedData label={"ছুটি শেষ"} value={"স্বাক্ষর"} />
                            </DataGrid>
                        </CustomTabPanel>
                        <CustomTabPanel value={teacherTabValue} index={3}>
                            <DataGrid>
                                <PairedData label={"শিক্ষকের নাম"} value={"ছুটিশেষ"} />
                                <PairedData label={"শিক্ষকের পদবি"} value={"ছুটিশেষ"} />
                                <PairedData label={"সর্বশেষ উপস্থিতির তারিখ"} value={"ছুটিশেষ"} />
                            </DataGrid>
                        </CustomTabPanel>
                    </Box>
                </div>
            </div>

            {/* student related data */}
            <div>
                <div className='flex lg:flex-row flex-col md:gap-8 gap-5 md:mt-8 mt-5'>
                    <div className=' border bg-white shadow-sm rounded-[4px] p-8 w-full'>
                        <h2 className='md:text-xl text-lg font-semibold md:mb-8'>শিক্ষার্থী সংক্রান্ত তথ্য</h2>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs indicatorColor="#000" className='text-xl' variant="scrollable" scrollButtons="auto" value={studentTabValue} onChange={handleStudentTabValueChange} aria-label="basic tabs example">
                                    <Tab label="জরিপকৃত তথ্য(৪+...১০+)" {...a11yProps(0)} />
                                    <Tab label="ছাত্র/ছাত্রী ভর্তি তথ্য" {...a11yProps(1)} />
                                    <Tab label="আশ্রয়ন প্রকল্পের জরিপকৃত তথ্য(৪+...১০+)" {...a11yProps(2)} />
                                </Tabs>
                            </Box>
                            <CustomTabPanel value={studentTabValue} index={0}>
                                <DataGrid title={"মোট"}>
                                    <PairedData label={"বালক"} value={"ছুটিশেষ"} />
                                    <PairedData label={"বালিকা"} value={"ছুটিশেষ"} />
                                    <PairedData label={"মোট শিক্ষার্থী"} value={"ছুটিশেষ"} />
                                </DataGrid>
                                <DataGrid title={"সংশ্লিষ্ট বিদ্যালয়ে ভর্তিকৃত"}>
                                    <PairedData label={"বালক"} value={"ছুটিশেষ"} />
                                    <PairedData label={"বালিকা"} value={"ছুটিশেষ"} />
                                    <PairedData label={"মোট শিক্ষার্থী"} value={"ছুটিশেষ"} />
                                </DataGrid>
                                <DataGrid title={"অন্যান্য বিদ্যালয়ে ভর্তিকৃত"}>
                                    <PairedData label={"বালক"} value={"ছুটিশেষ"} />
                                    <PairedData label={"বালিকা"} value={"ছুটিশেষ"} />
                                    <PairedData label={"মোট শিক্ষার্থী"} value={"ছুটিশেষ"} />
                                </DataGrid>
                                <DataGrid title={"অভর্তিকৃত"}>
                                    <PairedData label={"বালক"} value={"ছুটিশেষ"} />
                                    <PairedData label={"বালিকা"} value={"ছুটিশেষ"} />
                                    <PairedData label={"মোট শিক্ষার্থী"} value={"ছুটিশেষ"} />
                                </DataGrid>
                            </CustomTabPanel>
                            <CustomTabPanel value={studentTabValue} index={1}>
                                <div className='mt-6'>
                                    <DataDropdown title={"শিশু শ্রেণী ৪+"} itemKey={"shishu4"} activeItem={activeItem} setActiveItem={setActiveItem}>
                                        <DataGrid mtZero={true}>
                                            <PairedData label={"মুসলিম ছাত্র"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মুসলিম ছাত্রী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট মুসলিম শিক্ষার্থী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"হিন্দু ছাত্র"} value={"ছুটিশেষ"} />
                                            <PairedData label={"হিন্দু ছাত্রী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট হিন্দু শিক্ষার্থী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট ছাত্র"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট ছাত্রী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট শিক্ষার্থী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী"} value={"ছুটিশেষ"} />
                                        </DataGrid>
                                    </DataDropdown>
                                    <DataDropdown title={"শিশু শ্রেণী ৫+"} itemKey={"shishu5"} activeItem={activeItem} setActiveItem={setActiveItem}>
                                        <DataGrid mtZero={true}>
                                            <PairedData label={"মুসলিম ছাত্র"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মুসলিম ছাত্রী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট মুসলিম শিক্ষার্থী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"হিন্দু ছাত্র"} value={"ছুটিশেষ"} />
                                            <PairedData label={"হিন্দু ছাত্রী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট হিন্দু শিক্ষার্থী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট ছাত্র"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট ছাত্রী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট শিক্ষার্থী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী"} value={"ছুটিশেষ"} />
                                        </DataGrid>
                                    </DataDropdown>
                                    <DataDropdown title={"প্রথম শ্রেণি"} itemKey={"classone"} activeItem={activeItem} setActiveItem={setActiveItem}>
                                        <DataGrid mtZero={true}>
                                            <PairedData label={"মুসলিম ছাত্র"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মুসলিম ছাত্রী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট মুসলিম শিক্ষার্থী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"হিন্দু ছাত্র"} value={"ছুটিশেষ"} />
                                            <PairedData label={"হিন্দু ছাত্রী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট হিন্দু শিক্ষার্থী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট ছাত্র"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট ছাত্রী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট শিক্ষার্থী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী"} value={"ছুটিশেষ"} />
                                        </DataGrid>
                                    </DataDropdown>
                                    <DataDropdown title={"দ্বিতীয় শ্রেণি"} itemKey={"classtwo"} activeItem={activeItem} setActiveItem={setActiveItem}>
                                        <DataGrid mtZero={true}>
                                            <PairedData label={"মুসলিম ছাত্র"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মুসলিম ছাত্রী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট মুসলিম শিক্ষার্থী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"হিন্দু ছাত্র"} value={"ছুটিশেষ"} />
                                            <PairedData label={"হিন্দু ছাত্রী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট হিন্দু শিক্ষার্থী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট ছাত্র"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট ছাত্রী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট শিক্ষার্থী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী"} value={"ছুটিশেষ"} />
                                        </DataGrid>
                                    </DataDropdown>
                                    <DataDropdown title={"তৃতীয় শ্রেণি"} itemKey={"classthree"} activeItem={activeItem} setActiveItem={setActiveItem}>
                                        <DataGrid mtZero={true}>
                                            <PairedData label={"মুসলিম ছাত্র"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মুসলিম ছাত্রী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট মুসলিম শিক্ষার্থী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"হিন্দু ছাত্র"} value={"ছুটিশেষ"} />
                                            <PairedData label={"হিন্দু ছাত্রী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট হিন্দু শিক্ষার্থী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট ছাত্র"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট ছাত্রী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট শিক্ষার্থী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী"} value={"ছুটিশেষ"} />
                                        </DataGrid>
                                    </DataDropdown>
                                    <DataDropdown title={"চতুর্থ শ্রেণি"} itemKey={"classfour"} activeItem={activeItem} setActiveItem={setActiveItem}>
                                        <DataGrid mtZero={true}>
                                            <PairedData label={"মুসলিম ছাত্র"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মুসলিম ছাত্রী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট মুসলিম শিক্ষার্থী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"হিন্দু ছাত্র"} value={"ছুটিশেষ"} />
                                            <PairedData label={"হিন্দু ছাত্রী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট হিন্দু শিক্ষার্থী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট ছাত্র"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট ছাত্রী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট শিক্ষার্থী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী"} value={"ছুটিশেষ"} />
                                        </DataGrid>
                                    </DataDropdown>
                                    <DataDropdown title={"পঞ্চম শ্রেণি"} itemKey={"classfive"} activeItem={activeItem} setActiveItem={setActiveItem}>
                                        <DataGrid mtZero={true}>
                                            <PairedData label={"মুসলিম ছাত্র"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মুসলিম ছাত্রী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট মুসলিম শিক্ষার্থী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"হিন্দু ছাত্র"} value={"ছুটিশেষ"} />
                                            <PairedData label={"হিন্দু ছাত্রী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট হিন্দু শিক্ষার্থী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট ছাত্র"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট ছাত্রী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট শিক্ষার্থী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী"} value={"ছুটিশেষ"} />
                                        </DataGrid>
                                    </DataDropdown>
                                    <DataDropdown title={"ষষ্ঠ শ্রেণি"} itemKey={"classsix"} activeItem={activeItem} setActiveItem={setActiveItem}>
                                        <DataGrid mtZero={true}>
                                            <PairedData label={"মুসলিম ছাত্র"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মুসলিম ছাত্রী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট মুসলিম শিক্ষার্থী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"হিন্দু ছাত্র"} value={"ছুটিশেষ"} />
                                            <PairedData label={"হিন্দু ছাত্রী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট হিন্দু শিক্ষার্থী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট ছাত্র"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট ছাত্রী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট শিক্ষার্থী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী"} value={"ছুটিশেষ"} />
                                        </DataGrid>
                                    </DataDropdown>
                                    <DataDropdown title={"সপ্তম শ্রেণি"} itemKey={"classseven"} activeItem={activeItem} setActiveItem={setActiveItem}>
                                        <DataGrid mtZero={true}>
                                            <PairedData label={"মুসলিম ছাত্র"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মুসলিম ছাত্রী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট মুসলিম শিক্ষার্থী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"হিন্দু ছাত্র"} value={"ছুটিশেষ"} />
                                            <PairedData label={"হিন্দু ছাত্রী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট হিন্দু শিক্ষার্থী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট ছাত্র"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট ছাত্রী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট শিক্ষার্থী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী"} value={"ছুটিশেষ"} />
                                        </DataGrid>
                                    </DataDropdown>
                                    <DataDropdown title={"অষ্টম শ্রেণি"} itemKey={"classeight"} activeItem={activeItem} setActiveItem={setActiveItem}>
                                        <DataGrid mtZero={true}>
                                            <PairedData label={"মুসলিম ছাত্র"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মুসলিম ছাত্রী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট মুসলিম শিক্ষার্থী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"হিন্দু ছাত্র"} value={"ছুটিশেষ"} />
                                            <PairedData label={"হিন্দু ছাত্রী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট হিন্দু শিক্ষার্থী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট ছাত্র"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট ছাত্রী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"মোট শিক্ষার্থী"} value={"ছুটিশেষ"} />
                                            <PairedData label={"বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী"} value={"ছুটিশেষ"} />
                                        </DataGrid>
                                    </DataDropdown>
                                </div>
                            </CustomTabPanel>

                            <CustomTabPanel value={studentTabValue} index={2}>
                                <DataGrid>
                                    <PairedData label={"মোট জরিপকৃত শিক্ষার্থী"} value={"৪"} />
                                    <PairedData label={"সংশ্লিষ্ট বিদ্যালয়ে ভর্তিকৃত শিক্ষার্থী"} value={"৪"} />
                                    <PairedData label={"অভর্তিকৃত শিক্ষার্থী"} value={"৪"} />
                                </DataGrid>
                            </CustomTabPanel>
                        </Box>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-between'>
                <button type="submit" className="px-6 md:py-[10px] py-[6px] md:pt-[15px] pt-[10px] bg-[#008B4C] border border-[#008B4C] hover:bg-[#006f3d] text-white rounded-md font-semibold capitalize mt-5">ভেরিফাই করুন</button>
            </div>


        </div >
    );
};


export default BillDetails;