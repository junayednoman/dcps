"use client";

import { AuthContext } from "@/authContext/AuthContext";
import convertToBengaliNumber from "@/lib/convertToBengaliNumber";
import { CircularProgress } from "@mui/material";
import { useContext, useEffect, useState } from "react";

const Summery = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const { userName } = useContext(AuthContext);

  useEffect(() => {
    if (userName) {
      setLoading(true);
      const apiUrl = `https://dmsp.vercel.app/api/bill-return/summery`;
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cluster: userName }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.success) {
            setStats(data.data);
            console.log(data);
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
  }, [userName]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <CircularProgress className="spinner" />
      </div>
    );
  }
  return (
    <div className="p-6 shadow-sm rounded-md bg-white">
      <div className="flex items-center md:flex-row flex-col justify-between mb-4">
        <h3 className="text-lg font-semibold md:mb-0 mb-3">
          বিল রিটার্ন সারাংশ
        </h3>
      </div>
      {stats?.permittedPosts ||
      stats?.workingPosts ||
      stats?.vacationConsumers ? (
        <table className="w-full table-auto">
          <thead className="text-left bg-slate-100">
            <tr>
              <th className="border px-4 py-2">অনুমোদিত পদ</th>
              <th className="border px-4 py-2">কর্মরত পদ</th>
              <th className="border px-4 py-2">ছুটি ভোগরত শিক্ষক</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-3">{stats.permittedPosts}</td>
              <td className="border px-4 py-3">{stats.workingPosts}</td>
              <td className="border px-4 py-3">{stats.vacationConsumers}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div className="flex justify-center items-center py-20">
          <h3 className="text-2xl font-semibold text-center">
            কোন তথ্য পাওয়া যায়নি!
          </h3>
        </div>
      )}
    </div>
  );
};

export default Summery;
