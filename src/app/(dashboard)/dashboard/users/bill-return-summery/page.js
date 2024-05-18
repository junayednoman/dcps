"use client"
import { useState } from "react";
import convertToBengaliNumber from "@/lib/convertToBengaliNumber";

const Summery = () => {
    const tableData = [
        { id: "১", permitted_posts: "৩", active_post: '৪', teachers_on_vacation: '৩' },
        // Add more data as needed
    ];
    return (
        <div className="p-6 shadow-sm rounded-md bg-white">
            <div className="flex items-center md:flex-row flex-col justify-between mb-4">
                <h3 className="text-lg font-semibold md:mb-0 mb-3">বিল রিটার্ন সারাংশ</h3>
                <input
                    type="text"
                    placeholder="সার্চ করুন..."
                    className="px-4 py-2 mr-4 rounded-md border border-gray-300 focus:outline-none focus:border-[#008B4C]"
                />
            </div>
            <table className="w-full table-auto">
                <thead className="text-left bg-slate-100">
                    <tr>
                        <th className="border px-4 py-2">ক্রমিক</th>
                        <th className="border px-4 py-2">অনুমোদিত পদ</th>
                        <th className="border px-4 py-2">কর্মরত পদ</th>
                        <th className="border px-4 py-2">ছুটি ভোগরত শিক্ষক</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((item) => (
                        <tr key={item.id}>
                            <td className="border px-4 py-3">{item.id}</td>
                            <td className="border px-4 py-3">{item.permitted_posts}</td>
                            <td className="border px-4 py-3">{item.active_post}</td>
                            <td className="border px-4 py-3">{item.teachers_on_vacation}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Summery;
