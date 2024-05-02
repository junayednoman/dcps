"use client"

import { CircularProgress } from "@mui/material";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useState } from "react";
import { LuDownload } from "react-icons/lu";
const DataDraft = () => {

    const [formData, setFormData] = useState([]);
    const [data] = useLocalStorage("formData", [])
    console.log(data);



    const handlePrint = () => {
        window.print();
    };

    if (!data) {
        return <CircularProgress color="secondary" />
    }



    return (
        <div id="print-content" className="xl:w-[80%] draftContent">
            <div className="p-8 rounded-md shadow-sm bg-white">
                {/* school related daa */}
                <h2 className='md:text-xl text-lg font-semibold main-heading'>বিদ্যালয় সংক্রান্ত তথ্য</h2>
                <div className="w-full h-[1px] bg-[#008B4C] md:mb-9 mt-2 print:mb-6"></div>
                <div>
                    <div>
                        <h4 className='md:text-[17px] text-lg font-semibold md:mb-5 print:mb-4 print:text-xl text-[#008B4C]'>সাধারণ তথ্য</h4>
                        <div className="flex flex-wrap gap-x-12 gap-y-4">
                            <p><span className="font-medium">বিদ্যালয়ের নাম: </span>{data.school_name}</p>
                            <p><span className="font-medium">ক্লাস্টার: </span>{data.cluster}</p>
                            <p><span className="font-medium">গ্রাম/মহল্লার নাম: </span>গোলাবাড়ি</p>
                            <p><span className="font-medium">ওয়ার্ড নাম্বার: </span>৬</p>
                            <p><span className="font-medium">ডাকঘর: </span>গোলাবাড়ি</p>
                            <p><span className="font-medium">ইউনিয়ন/পৌরসভা: </span>গোলাবাড়ি</p>
                            <p><span className="font-medium">EMIS কোড: </span>jk34l4e</p>
                            <p><span className="font-medium">বিদ্যালয়ের ইমেইল: </span>school@gmail.com</p>
                            <p><span className="font-medium">প্রতিষ্ঠার সন: </span>১২-৪-২০০০</p>
                            <p><span className="font-medium">গ্রেড: </span>A</p>
                            <p><span className="font-medium">শিফট সংখ্যা: </span>১</p>
                            <p><span className="font-medium">মহল্লার: </span>গোলাবাড়ি</p>
                        </div>
                    </div>
                    <div className="mt-12 ">
                        <div className="flex flex-wrap gap-x-12 gap-y-4">
                            <p><span className="font-medium">ভবন সংখ্যা: </span>৩</p>
                            <p><span className="font-medium">ভবন ১ নির্মাণের সন: </span>১২-৪-২০০০</p>
                            <p><span className="font-medium">ভবন ১ এর ধরন: </span>পাকা</p>
                            <p><span className="font-medium">ভবন ১ এর বর্তমান অবস্থা*: </span>ভালো</p>
                        </div>
                        <div className="flex flex-wrap gap-x-12 gap-y-4 mt-10">
                            <p><span className="font-medium">প্রধান শিক্ষকের কক্ষ: </span>১</p>
                            <p><span className="font-medium">অফিস কক্ষ: </span>৩</p>
                            <p><span className="font-medium">শ্রেণী কক্ষ: </span>৩</p>
                            <p><span className="font-medium">অফিস: </span>৩</p>
                            <p><span className="font-medium">ব্যবহারযোগ্য শ্রেণী কক্ষ: </span>৩</p>
                            <p><span className="font-medium">মাল্টিমিডিয়া কক্ষ: </span>৩</p>
                            <p><span className="font-medium">পৃথক শিশু শ্রেণী: </span>আছে</p>
                            <p><span className="font-medium">সীমানা প্রাচীর: </span>আছে</p>
                            <p><span className="font-medium">সীমানা প্রাচীরের অর্থায়ন ধরন: </span>ডিপিই</p>
                            <p><span className="font-medium">সীমানা প্রাচীর নির্মাণের সন: </span>১২-৪-২০০০</p>
                            <p><span className="font-medium">টয়লেট সংখ্যা: </span>৩</p>
                            <p><span className="font-medium">ওয়াশ ব্লক: </span>আছে</p>
                            <p><span className="font-medium">ওয়াশ ব্লক নির্মাণের সন: </span>১২-৪-২০০০</p>
                        </div>
                        <div className="flex flex-wrap gap-x-12 gap-y-4 mt-10">
                            <p><span className="font-medium">শহিদ মিনার: </span>আছে</p>
                            <p><span className="font-medium">মুক্তিযুদ্ধ কর্নার: </span>আছে</p>
                            <p><span className="font-medium">শেখ রাসেল কর্নার: </span>আছে</p>
                            <p><span className="font-medium">বাগান/ছাদ বাগান: </span>আছে</p>
                            <p><span className="font-medium">ইন্টারনেট: </span>রাউটার</p>
                            <p><span className="font-medium">মহল্লার: </span>গোলাবাড়ি</p>
                            <p><span className="font-medium">ল্যাপটপ সংখ্যা: </span>৩</p>
                            <p><span className="font-medium">সচল ল্যাপটপ সংখ্যা: </span>৩</p>
                            <p><span className="font-medium">মাল্টিমিডিয়া সংখ্যা: </span>৩</p>
                            <p><span className="font-medium">সচল মাল্টিমিডিয়া সংখ্যা: </span>৩</p>
                            <p><span className="font-medium">পিয়ানো সংখ্যা সংখ্যা: </span>৩</p>
                            <p><span className="font-medium">সচল পিয়ানো সংখ্যা সংখ্যা: </span>৩</p>
                            <p><span className="font-medium">বিদ্যুৎ সংযোগ: </span>আছে</p>

                        </div>
                        <div className="flex flex-wrap gap-x-12 gap-y-4 mt-10">
                            <p><span className="font-medium">টিউবওয়েল সংখ্যা: </span>৩</p>
                            <p><span className="font-medium">টিউবওয়েল এর বর্তমান অবস্থা: </span>ভালো</p>
                            <p><span className="font-medium">ডিপ টিউবওয়েল সংখ্যা: </span>৩</p>
                            <p><span className="font-medium">ডিপ টিউবওয়েল এর বর্তমান অবস্থা: </span>ভালো</p>
                        </div>

                    </div>
                    <div className="mt-12">
                        <h4 className='md:text-[17px] text-lg font-semibold md:mb-5 print:mb-4 print:text-xl text-[#008B4C]'>ভূমি বিষয়ক তথ্য</h4>
                        <div className="flex flex-wrap gap-x-12 gap-y-4">
                            <p><span className="font-medium">ভূমির পরিমান(শতাংশ): </span>৫</p>
                            <p><span className="font-medium">দখলকৃত ভূমির পরিমান(শতাংশ): </span>৫</p>
                            <p><span className="font-medium">বেদখলকৃত ভূমির পরিমান(শতাংশ): </span>৫</p>
                            <p><span className="font-medium">রেজিস্টার করা আছে কিনা: </span>আছে</p>
                            <p><span className="font-medium">রেজিস্ট্রেশন এর মালিকানা: </span>ডিপিই</p>
                            <p><span className="font-medium">খাতিয়ান নং: </span>৩৫৩৪৬</p>
                            <p><span className="font-medium">দাগ নং: </span>৩৫৩৪৬</p>
                            <p><span className="font-medium">দলিল নং: </span>৩৫৩৪৬</p>
                            <p><span className="font-medium">দলিল সন: </span>১২-৪-২০০০</p>
                            <p><span className="font-medium">নামজারি আছে কিনা: </span>আছে</p>
                            <p><span className="font-medium">নামজারি এর মালিকানা: </span>ডিপিই</p>
                            <p><span className="font-medium">মামলা আছে কিনা: </span>না</p>
                            <p><span className="font-medium">ভূমি উন্নয়ন কর: </span>পরিশোধিত</p>
                        </div>
                    </div>
                    <div className="mt-12">
                        <h4 className='md:text-[17px] text-lg font-semibold md:mb-5 print:mb-4 print:text-xl text-[#008B4C]'>উপবৃত্তি সংক্রান্ত তথ্য</h4>
                        <div className="flex flex-wrap gap-x-12 gap-y-4">
                            <p><span className="font-medium">সর্বশেষ প্রান্তিকের সময়কাল: </span>প্রথম</p>
                            <p><span className="font-medium">সর্বশেষ প্রান্তিকে মোট সুবিধাভোগী: </span>৩</p>
                            <p><span className="font-medium">উপবৃত্তির চাহিদা: </span>৩</p>
                            <p><span className="font-medium">বিতরণকৃত অর্থের পরিমান: </span>৩</p>
                        </div>
                    </div>
                    <div className="mt-12">
                        <h4 className='md:text-[17px] text-lg font-semibold md:mb-5 print:mb-4 print:text-xl text-[#008B4C]'>সভা সংক্রান্ত তথ্য</h4>
                        <div className="flex flex-wrap gap-x-12 gap-y-4">
                            <p><span className="font-medium">এসএমসি: </span>৪</p>
                            <p><span className="font-medium">পিটিএ: </span>৪</p>
                            <p><span className="font-medium">মা-সমাবেশ: </span>৪</p>
                            <p><span className="font-medium">অভিভাবক-সমাবেশ: </span>৩</p>
                            <p><span className="font-medium">উঠান বৈঠক: </span>৩</p>
                            <p><span className="font-medium">স্টাফ মিটিং: </span>৩</p>
                        </div>
                    </div>
                    <div className="mt-12">
                        <h4 className='md:text-[17px] text-lg font-semibold md:mb-5 print:mb-4 print:text-xl text-[#008B4C]'>উন্নয়ন কার্যক্রম সংক্রান্ত তথ্য</h4>
                        <div className="flex flex-wrap gap-x-12 gap-y-4">
                            <p>১। </p>
                            <p><span className="font-medium">বরাদ্দের ধরন: </span>স্লিপ</p>
                            <p><span className="font-medium">অর্থ বছর: </span>১২-৪-২০০০</p>
                            <p><span className="font-medium">অর্থের পরিমান: </span>৩</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* teacher related data */}
            <div className="mt-10 p-8 rounded-md shadow-sm bg-white">
                <h2 className='md:text-xl text-lg font-semibold main-heading'>শিক্ষক সংক্রান্ত তথ্য</h2>
                <div className="w-full h-[1px] bg-[#008B4C] md:mb-9 mt-2 print:mb-6"></div>
                <div>
                    <div>
                        <h4 className='md:text-[17px] text-lg font-semibold md:mb-5 print:mb-4 print:text-xl text-[#008B4C]'>সাধারণ তথ্য</h4>
                        <div className="flex flex-wrap gap-x-12 gap-y-4">
                            <p><span className="font-medium">অনুমোদিত পদ: </span>৩</p>
                            <p><span className="font-medium">কর্মরত পদ: </span>৩</p>
                            <p><span className="font-medium">শূন্য পদ: </span>৩</p>
                            <p><span className="font-medium">কর্মরত শিক্ষক(পুরুষ): </span>৩</p>
                            <p><span className="font-medium">কর্মরত শিক্ষক(মহিলা): </span>৩</p>
                        </div>
                    </div>
                    <div className="mt-12">
                        <h4 className='md:text-[17px] text-lg font-semibold md:mb-5 print:mb-4 print:text-xl text-[#008B4C]'>বেতন সংক্রান্ত তথ্য</h4>
                        <div className="flex flex-wrap gap-x-12 gap-y-4">
                            <span className="text-base font-semibold">শিক্ষক ১ঃ</span>
                            <p><span className="font-medium">শিক্ষকের নাম: </span>আছে</p>
                            <p><span className="font-medium">শিক্ষকের পদবি: </span>আছে</p>
                            <p><span className="font-medium">সর্বশেষ শিক্ষাগত যোগ্যতা: </span>আছে</p>
                            <p><span className="font-medium">বিভাগীয় প্রশিক্ষণ: </span>আছে</p>
                            <p><span className="font-medium">জন্ম তারিখ: </span>১২-৪-২০০০</p>
                            <p><span className="font-medium">প্রথম যোগদানের তারিখ: </span>১২-৪-২০০০</p>
                            <p><span className="font-medium">উক্ত পদে যোগদানের তারিখ: </span>১২-৪-২০০০</p>
                            <p><span className="font-medium">এই বিদ্যালয়ে যোগদানের তারিখ: </span>১২-৪-২০০০</p>
                            <p><span className="font-medium">বেতন স্কেল: </span>১২-৪-২০০০</p>
                            <p><span className="font-medium">মূল বেতন: </span>৩</p>
                            <p><span className="font-medium">শিক্ষা ভাতা: </span>৩</p>
                            <p><span className="font-medium">ব্যাংক হিসাব নং: </span>435</p>
                            <p><span className="font-medium">জিপিএফ নং: </span>৩</p>
                            <p><span className="font-medium">সক্রিয় মোবাইল নং: </span>৩</p>
                            <p><span className="font-medium">চলতি বছরে মোট নৈমিত্তিক ছুটি: </span>৩</p>
                            <p><span className="font-medium">স্বাক্ষর: </span>আছে</p>
                        </div>
                    </div>
                    <div className="mt-12">
                        <h4 className='md:text-[17px] text-lg font-semibold md:mb-5 print:mb-4 print:text-xl text-[#008B4C]'>ছুটি সংক্রান্ত তথ্য</h4>
                        <div className="flex flex-wrap gap-x-12 gap-y-4">
                            <span className="text-base font-semibold">শিক্ষক ১ঃ</span>
                            <p><span className="font-medium">শিক্ষকের নাম: </span>আছে</p>
                            <p><span className="font-medium">ছুটির ধরন: </span>আছে</p>
                            <p><span className="font-medium">ছুটি শুরু: </span>আছে</p>
                            <p><span className="font-medium">ছুটি শেষ: </span>আছে</p>
                        </div>
                    </div>
                    <div className="mt-12">
                        <h4 className='md:text-[17px] text-lg font-semibold md:mb-5 print:mb-4 print:text-xl text-[#008B4C]'>অনুমোদিত শিক্ষক তথ্য</h4>
                        <div className="flex flex-wrap gap-x-12 gap-y-4">
                            <p><span className="font-medium">শিক্ষকের নাম: </span>আছে</p>
                            <p><span className="font-medium">শিক্ষকের পদবি: </span>আছে</p>
                            <p><span className="font-medium">সর্বশেষ উপস্থিতির তারিখ: </span>আছে</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* student related data */}
            <div className="mt-10 p-8 rounded-md shadow-sm bg-white">
                <h2 className='md:text-xl text-lg font-semibold main-heading'>শিক্ষার্থী সংক্রান্ত তথ্য</h2>
                <div className="w-full h-[1px] bg-[#008B4C] md:mb-9 mt-2 print:mb-6"></div>

                <div>
                    <div>
                        <h4 className='md:text-[17px] text-lg font-semibold md:mb-5 print:mb-4 print:text-xl text-[#008B4C]'>জরিপকৃত তথ্য(৪+...১০+)</h4>
                        <div className="flex flex-wrap gap-x-12 gap-y-4">
                            <span className="text-base font-semibold">মোটঃ</span>
                            <p><span className="font-medium">বালক: </span>৪</p>
                            <p><span className="font-medium">বালিকা: </span>৩</p>
                            <p><span className="font-medium">মোট শিক্ষার্থী: </span>৭</p>
                        </div>
                        <div className="flex flex-wrap gap-x-12 gap-y-4 mt-5">
                            <span className="text-base font-semibold">সংশ্লিষ্ট বিদ্যালয়ে ভর্তিকৃতঃ</span>
                            <p><span className="font-medium">বালক: </span>৪</p>
                            <p><span className="font-medium">বালিকা: </span>৩</p>
                            <p><span className="font-medium">মোট শিক্ষার্থী: </span>৭</p>
                        </div>
                        <div className="flex flex-wrap gap-x-12 gap-y-4 mt-5">
                            <span className="text-base font-semibold">অন্যান্য বিদ্যালয়ে ভর্তিকৃতঃ</span>
                            <p><span className="font-medium">বালক: </span>৪</p>
                            <p><span className="font-medium">বালিকা: </span>৩</p>
                            <p><span className="font-medium">মোট শিক্ষার্থী: </span>৭</p>
                        </div>
                        <div className="flex flex-wrap gap-x-12 gap-y-4 mt-5">
                            <span className="text-base font-semibold">অভর্তিকৃতঃ</span>
                            <p><span className="font-medium">বালক: </span>৪</p>
                            <p><span className="font-medium">বালিকা: </span>৩</p>
                            <p><span className="font-medium">মোট শিক্ষার্থী: </span>৭</p>
                        </div>
                    </div>
                    <div className="mt-12">
                        <div>
                            <h4 className='md:text-[17px] text-lg font-semibold md:mb-5 print:mb-4 print:text-xl text-[#008B4C]'>ছাত্র/ছাত্রী ভর্তি তথ্য</h4>
                            <div className="flex flex-wrap gap-x-12 gap-y-4">
                                <span className="text-base font-semibold">শিশু শ্রেণী ৪+ঃ</span>
                                <p><span className="font-medium">মুসলিম ছাত্র: </span>৪</p>
                                <p><span className="font-medium">মুসলিম ছাত্রি: </span>৪</p>
                                <p><span className="font-medium">মুসলিম মোট শিক্ষার্থী: </span>৪</p>
                                <p><span className="font-medium">হিন্দু ছাত্র: </span>৪</p>
                                <p><span className="font-medium">হিন্দু ছাত্রি: </span>৪</p>
                                <p><span className="font-medium">হিন্দু মোট শিক্ষার্থী: </span>৪</p>
                                <p><span className="font-medium">হিন্দু: </span>৪</p>
                                <p><span className="font-medium">মোট ছাত্রি: </span>৪</p>
                                <p><span className="font-medium">মোট শিক্ষার্থী: </span>৪</p>
                                <p><span className="font-medium">বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী: </span>৪</p>
                            </div>
                            <div className="flex flex-wrap gap-x-12 gap-y-4 mt-10">
                                <span className="text-base font-semibold">শিশু শ্রেণী ৫+ঃ</span>
                                <p><span className="font-medium">মুসলিম ছাত্র: </span>৪</p>
                                <p><span className="font-medium">মুসলিম ছাত্রি: </span>৪</p>
                                <p><span className="font-medium">মুসলিম মোট শিক্ষার্থী: </span>৪</p>
                                <p><span className="font-medium">হিন্দু ছাত্র: </span>৪</p>
                                <p><span className="font-medium">হিন্দু ছাত্রি: </span>৪</p>
                                <p><span className="font-medium">হিন্দু মোট শিক্ষার্থী: </span>৪</p>
                                <p><span className="font-medium">হিন্দু: </span>৪</p>
                                <p><span className="font-medium">মোট ছাত্রি: </span>৪</p>
                                <p><span className="font-medium">মোট শিক্ষার্থী: </span>৪</p>
                                <p><span className="font-medium">বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী: </span>৪</p>
                            </div>
                            <div className="flex flex-wrap gap-x-12 gap-y-4 mt-10">
                                <span className="text-base font-semibold">প্রথম শ্রেণিঃ</span>
                                <p><span className="font-medium">মুসলিম ছাত্র: </span>৪</p>
                                <p><span className="font-medium">মুসলিম ছাত্রি: </span>৪</p>
                                <p><span className="font-medium">মুসলিম মোট শিক্ষার্থী: </span>৪</p>
                                <p><span className="font-medium">হিন্দু ছাত্র: </span>৪</p>
                                <p><span className="font-medium">হিন্দু ছাত্রি: </span>৪</p>
                                <p><span className="font-medium">হিন্দু মোট শিক্ষার্থী: </span>৪</p>
                                <p><span className="font-medium">হিন্দু: </span>৪</p>
                                <p><span className="font-medium">মোট ছাত্রি: </span>৪</p>
                                <p><span className="font-medium">মোট শিক্ষার্থী: </span>৪</p>
                                <p><span className="font-medium">বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী: </span>৪</p>
                            </div>
                            <div className="flex flex-wrap gap-x-12 gap-y-4 mt-10">
                                <span className="text-base font-semibold">দ্বিতীয় শ্রেণিঃ</span>
                                <p><span className="font-medium">মুসলিম ছাত্র: </span>৪</p>
                                <p><span className="font-medium">মুসলিম ছাত্রি: </span>৪</p>
                                <p><span className="font-medium">মুসলিম মোট শিক্ষার্থী: </span>৪</p>
                                <p><span className="font-medium">হিন্দু ছাত্র: </span>৪</p>
                                <p><span className="font-medium">হিন্দু ছাত্রি: </span>৪</p>
                                <p><span className="font-medium">হিন্দু মোট শিক্ষার্থী: </span>৪</p>
                                <p><span className="font-medium">হিন্দু: </span>৪</p>
                                <p><span className="font-medium">মোট ছাত্রি: </span>৪</p>
                                <p><span className="font-medium">মোট শিক্ষার্থী: </span>৪</p>
                                <p><span className="font-medium">বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী: </span>৪</p>
                            </div>
                            <div className="flex flex-wrap gap-x-12 gap-y-4 mt-10">
                                <span className="text-base font-semibold">তৃতীয় শ্রেণিঃ</span>
                                <p><span className="font-medium">মুসলিম ছাত্র: </span>৪</p>
                                <p><span className="font-medium">মুসলিম ছাত্রি: </span>৪</p>
                                <p><span className="font-medium">মুসলিম মোট শিক্ষার্থী: </span>৪</p>
                                <p><span className="font-medium">হিন্দু ছাত্র: </span>৪</p>
                                <p><span className="font-medium">হিন্দু ছাত্রি: </span>৪</p>
                                <p><span className="font-medium">হিন্দু মোট শিক্ষার্থী: </span>৪</p>
                                <p><span className="font-medium">হিন্দু: </span>৪</p>
                                <p><span className="font-medium">মোট ছাত্রি: </span>৪</p>
                                <p><span className="font-medium">মোট শিক্ষার্থী: </span>৪</p>
                                <p><span className="font-medium">বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী: </span>৪</p>
                            </div>
                            <div className="flex flex-wrap gap-x-12 gap-y-4 mt-10">
                                <span className="text-base font-semibold">চতুর্থ শ্রেণিঃ</span>
                                <p><span className="font-medium">মুসলিম ছাত্র: </span>৪</p>
                                <p><span className="font-medium">মুসলিম ছাত্রি: </span>৪</p>
                                <p><span className="font-medium">মুসলিম মোট শিক্ষার্থী: </span>৪</p>
                                <p><span className="font-medium">হিন্দু ছাত্র: </span>৪</p>
                                <p><span className="font-medium">হিন্দু ছাত্রি: </span>৪</p>
                                <p><span className="font-medium">হিন্দু মোট শিক্ষার্থী: </span>৪</p>
                                <p><span className="font-medium">হিন্দু: </span>৪</p>
                                <p><span className="font-medium">মোট ছাত্রি: </span>৪</p>
                                <p><span className="font-medium">মোট শিক্ষার্থী: </span>৪</p>
                                <p><span className="font-medium">বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী: </span>৪</p>
                            </div>
                            <div className="flex flex-wrap gap-x-12 gap-y-4 mt-10">
                                <span className="text-base font-semibold">পঞ্চম শ্রেণিঃ</span>
                                <p><span className="font-medium">মুসলিম ছাত্র: </span>৪</p>
                                <p><span className="font-medium">মুসলিম ছাত্রি: </span>৪</p>
                                <p><span className="font-medium">মুসলিম মোট শিক্ষার্থী: </span>৪</p>
                                <p><span className="font-medium">হিন্দু ছাত্র: </span>৪</p>
                                <p><span className="font-medium">হিন্দু ছাত্রি: </span>৪</p>
                                <p><span className="font-medium">হিন্দু মোট শিক্ষার্থী: </span>৪</p>
                                <p><span className="font-medium">হিন্দু: </span>৪</p>
                                <p><span className="font-medium">মোট ছাত্রি: </span>৪</p>
                                <p><span className="font-medium">মোট শিক্ষার্থী: </span>৪</p>
                                <p><span className="font-medium">বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী: </span>৪</p>
                            </div>
                            <div className="flex flex-wrap gap-x-12 gap-y-4 mt-10">
                                <span className="text-base font-semibold">ষষ্ঠ শ্রেণিঃ</span>
                                <p><span className="font-medium">মুসলিম ছাত্র: </span>৪</p>
                                <p><span className="font-medium">মুসলিম ছাত্রি: </span>৪</p>
                                <p><span className="font-medium">মুসলিম মোট শিক্ষার্থী: </span>৪</p>
                                <p><span className="font-medium">হিন্দু ছাত্র: </span>৪</p>
                                <p><span className="font-medium">হিন্দু ছাত্রি: </span>৪</p>
                                <p><span className="font-medium">হিন্দু মোট শিক্ষার্থী: </span>৪</p>
                                <p><span className="font-medium">হিন্দু: </span>৪</p>
                                <p><span className="font-medium">মোট ছাত্রি: </span>৪</p>
                                <p><span className="font-medium">মোট শিক্ষার্থী: </span>৪</p>
                                <p><span className="font-medium">বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী: </span>৪</p>
                            </div>
                            <div className="flex flex-wrap gap-x-12 gap-y-4 mt-10">
                                <span className="text-base font-semibold">সপ্তম শ্রেণিঃ</span>
                                <p><span className="font-medium">মুসলিম ছাত্র: </span>৪</p>
                                <p><span className="font-medium">মুসলিম ছাত্রি: </span>৪</p>
                                <p><span className="font-medium">মুসলিম মোট শিক্ষার্থী: </span>৪</p>
                                <p><span className="font-medium">হিন্দু ছাত্র: </span>৪</p>
                                <p><span className="font-medium">হিন্দু ছাত্রি: </span>৪</p>
                                <p><span className="font-medium">হিন্দু মোট শিক্ষার্থী: </span>৪</p>
                                <p><span className="font-medium">হিন্দু: </span>৪</p>
                                <p><span className="font-medium">মোট ছাত্রি: </span>৪</p>
                                <p><span className="font-medium">মোট শিক্ষার্থী: </span>৪</p>
                                <p><span className="font-medium">বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী: </span>৪</p>
                            </div>
                            <div className="flex flex-wrap gap-x-12 gap-y-4 mt-10">
                                <span className="text-base font-semibold">অষ্টম শ্রেণিঃ</span>
                                <p><span className="font-medium">মুসলিম ছাত্র: </span>৪</p>
                                <p><span className="font-medium">মুসলিম ছাত্রি: </span>৪</p>
                                <p><span className="font-medium">মুসলিম মোট শিক্ষার্থী: </span>৪</p>
                                <p><span className="font-medium">হিন্দু ছাত্র: </span>৪</p>
                                <p><span className="font-medium">হিন্দু ছাত্রি: </span>৪</p>
                                <p><span className="font-medium">হিন্দু মোট শিক্ষার্থী: </span>৪</p>
                                <p><span className="font-medium">হিন্দু: </span>৪</p>
                                <p><span className="font-medium">মোট ছাত্রি: </span>৪</p>
                                <p><span className="font-medium">মোট শিক্ষার্থী: </span>৪</p>
                                <p><span className="font-medium">বিশেষ চাহিদা সম্পন্ন শিক্ষার্থী: </span>৪</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12">
                        <h4 className='md:text-[17px] text-lg font-semibold md:mb-5 print:mb-4 print:text-xl text-[#008B4C]'>আশ্রয়ন প্রকল্পের জরিপকৃত তথ্য(৪+...১০+)</h4>
                        <div className="flex flex-wrap gap-x-12 gap-y-4">
                            <p><span className="font-medium">মোট জরিপকৃত শিক্ষার্থী: </span>৪</p>
                            <p><span className="font-medium">সংশ্লিষ্ট বিদ্যালয়ে ভর্তিকৃত শিক্ষার্থী: </span>৫</p>
                            <p><span className="font-medium">অভর্তিকৃত শিক্ষার্থী: </span>৫</p>
                        </div>
                    </div>
                    {/* <div className="mt-12">
                        <h4 className='md:text-[17px] text-lg font-semibold md:mb-5 print:mb-4 print:text-xl text-[#008B4C]'>সাধারণ তথ্য</h4>
                        <div className="flex flex-wrap gap-x-12 gap-y-4">
                            <p><span className="font-medium">অনুমোদিত: </span>আছে</p>
                        </div>
                    </div> */}
                </div>

            </div>
            <div className="flex items-center gap-10 mt-3 justify-between">
                <button type="submit" className="px-6 md:py-[10px] py-[6px] md:pt-[15px] pt-[10px] bg-[#008B4C] border border-[#008B4C] hover:bg-[#006f3d] text-white rounded-md font-semibold capitalize mt-5 print:hidden">সাবমিট করুন</button>
                <button onClick={handlePrint} type="submit" className="px-6 md:py-[10px] py-[6px] md:pt-[15px] pt-[10px] bg-[#008B4C] border border-[#008B4C] hover:bg-[#006f3d] text-white rounded-md font-semibold capitalize mt-5 print:hidden flex items-center gap-3"><span>ডাউনলোড করুন </span><span className="block -mt-[2px]"><LuDownload className="text-xl" /></span></button>
            </div>
        </div>
    );
};

export default DataDraft;