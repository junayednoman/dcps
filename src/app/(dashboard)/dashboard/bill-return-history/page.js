"use client";
import HistoryData from "@/app/components/HistoryData";
import { AuthContext } from "@/authContext/AuthContext";
import { CircularProgress } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const HistoryPage = () => {
  const [billData, setBillData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { userName } = useContext(AuthContext);
  const searchParams = useSearchParams();

  const date = searchParams.get("date");
  const school = searchParams.get("school");

  useEffect(() => {
    setLoading(true);
    if (userName && date && school) {
      const apiUrl = "http://localhost:3000/api/bill-return/history";
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cluster: userName,
          userName: userName,
          targetDate: date,
          schoolName: school,
        }),
      })
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          if (data.success && data.message !== "কোন তথ্য পাওয়া যায়নি!") {
            setBillData(data.data);
          } else {
            setBillData(null);
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
  }, [date, school, userName]);

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
        <h3 className="text-2xl font-semibold text-center">
          প্রদানকৃত তথ্যের ভিত্তিতে কোন বিল খুজে পাওয়া যাইনি!
        </h3>
        <p>
          <span className="text-5xl rotate-12 inline-block">👈</span>সাইডবার
          থেকে আবার সার্চ করুন
        </p>
      </div>
    );
  }
  return (
    <div>
      <HistoryData billData={billData} />
    </div>
  );
};

export default HistoryPage;
