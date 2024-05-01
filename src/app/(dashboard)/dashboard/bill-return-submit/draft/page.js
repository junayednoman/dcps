"use client"
const dataDraft = () => {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div id="print-content">
            <h2 className='md:text-2xl text-lg font-semibold main-heading'>বিদ্যালয় সংক্রান্ত তথ্য</h2>
            <div className="w-full h-[1px] bg-[#008B4C] md:mb-9 mt-2 print:mb-6"></div>
            <div>
                <h4 className='md:text-xl text-lg font-semibold md:mb-5 print:mb-4 print:text-xl text-[#008B4C]'>সাধারণ তথ্য</h4>
                <div className="flex flex-wrap gap-x-12 gap-y-4">
                    <p><span className="font-medium">বিদ্যালয়ের নাম: </span>খলিলপুর সরকারি প্রাথমিক বিদ্যালয়</p>
                    <p><span className="font-medium">ক্লাস্টার: </span>সাধুহাটি</p>
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
                <h4 className='md:text-xl text-lg font-semibold md:mb-5 print:mb-4 print:text-xl text-[#008B4C]'>ভৌত অবকাঠামো সংক্রান্ত তথ্য</h4>
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
                    <p><span className="font-medium">বাগান/ছাদ বাগান: </span>আছে</p>
                    <p><span className="font-medium">ইন্টারনেট: </span>গোলাবাড়ি</p>
                    <p><span className="font-medium">মহল্লার: </span>গোলাবাড়ি</p>
                    {/* <p><span className="font-medium">ওয়াশ: </span>আছে</p> */}
                    {/* <p><span className="font-medium">অফিস: </span>৩</p> */}
                    {/* <p><span className="font-medium">ভবন: </span>১২-৪-২০০০</p> */}
                </div>
                <div className="flex flex-wrap gap-x-12 gap-y-4 mt-10">
                </div>
            </div>
            <button className="print:hidden" onClick={handlePrint}>download</button>
        </div>
    );
};

export default dataDraft;