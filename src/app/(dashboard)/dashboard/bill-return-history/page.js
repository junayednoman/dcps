"use client";

import SearchableSelect from "@/app/components/SearchableSelect";
import { AuthContext } from "@/authContext/AuthContext";
import { Backdrop, Box, Fade, Modal, Tooltip } from "@mui/material";
import React from "react";
import { IoCloseSharp } from "react-icons/io5";

const yearOptions = [
  { value: "2020", label: "২০২০" },
  { value: "2021", label: "২০২১" },
  { value: "2022", label: "২০২২" },
  { value: "2023", label: "২০২৩" },
  { value: "2024", label: "২০২৪" },
  { value: "2025", label: "২০২৫" },
  { value: "2026", label: "২০২৬" },
  { value: "2027", label: "২০২৭" },
  { value: "2028", label: "২০২৮" },
  { value: "2029", label: "২০২৯" },
  { value: "2030", label: "২০৩০" },
  { value: "2031", label: "২০৩১" },
  { value: "2032", label: "২০৩২" },
  { value: "2033", label: "২০৩৩" },
];

const monthOptions = [
  { value: "January", label: "জানুয়ারী" },
  { value: "February", label: "ফেব্রুয়ারী" },
  { value: "March", label: "মার্চ" },
  { value: "April", label: "এপ্রিল" },
  { value: "May", label: "মে" },
  { value: "June", label: "জুন" },
  { value: "July", label: "জুলাই" },
  { value: "August", label: "আগস্ট" },
  { value: "September", label: "সেপ্টেম্বর" },
  { value: "October", label: "অক্টোবর" },
  { value: "November", label: "নভেম্বর" },
  { value: "December", label: "ডিসেম্বর" },
];

const schoolOptions = [
  {
    value: "নিমারাই সরকারি প্রাথমিক বিদ‌্যালয়",
    label: "নিমারাই সরকারি প্রাথমিক বিদ‌্যালয়",
  },
  {
    value: "খঞ্জনপুর সরকারি প্রাথমিক বিদ্যালয়",
    label: "খঞ্জনপুর সরকারি প্রাথমিক বিদ্যালয়",
  },
  {
    value: "মনুমুখ সরকারি প্রাথমিক বিদ্যালয়",
    label: "মনুমুখ সরকারি প্রাথমিক বিদ্যালয়",
  },
];

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 430,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const HistoryPage = () => {
  const [loading, setLoading] = React.useState(false);
  const [billData, setBillData] = React.useState(null);
  const { userName } = React.useContext(AuthContext);
  console.log(billData);
  // modal related
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const [yearSelectedOption, setyearSelectedOption] = React.useState(null);
  const handleYearSelectChange = (yearSelectedOption) => {
    setyearSelectedOption(yearSelectedOption);
  };

  const [monthSelectedOption, setMonthSelectedOption] = React.useState(null);
  const handleMonthSelectChange = (monthSelectedOption) => {
    setMonthSelectedOption(monthSelectedOption);
  };

  const [schoolSelectedOption, setSchoolSelectedOption] = React.useState(null);
  const handleSchoolSelectChange = (schoolSelectedOption) => {
    setSchoolSelectedOption(schoolSelectedOption);
  };

  const handelFormSubmit = (e) => {
    e.preventDefault();
    const formData = {
      date: `${monthSelectedOption.value} ${yearSelectedOption.value}`,
      school: schoolSelectedOption.value,
    };

    setLoading(true);
    const apiUrl = "http://localhost:3000/api/bill-return/history";
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cluster: userName,
        userName: userName,
        targetDate: formData.date,
        schoolName: formData.school,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.data);
        if (data.success) {
          setBillData(data.data);
        }
      })
      .catch((error) => {
        toast.error("একটি ইরর ঘটেছে!");
        console.error("There was an error!", error);
      })
      .finally(() => {
        setLoading(false);
        handleModalClose();
      });

    // setyearSelectedOption(null);
    // setMonthSelectedOption(null);
    // setSchoolSelectedOption(null);
  };

  return (
    <div>
      <div className="text-center flex sm:flex-row flex-col items-center md:gap-10 gap-5 p-6">
        <h3 className="text-2xl font-semibold">বিল রিটার্ন ইতিহাস</h3>
        <button
          onClick={handleModalOpen}
          className="px-4 py-[5px] pt-[8px] bg-[#008B4C] border border-[#008B4C] hover:bg-[#006f3d] text-white rounded-md font-medium capitalize"
        >
          সার্চ করুন
        </button>
      </div>
      {/* modal content */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalOpen}
        onClose={handleModalClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={modalOpen}>
          <Box sx={modalStyle}>
            <button className="w-full cursor-default">
              <IoCloseSharp
                onClick={handleModalClose}
                className="text-2xl ml-auto cursor-pointer"
              />
            </button>
            <form className="mt-3">
              <SearchableSelect
                options={yearOptions}
                onChange={handleYearSelectChange}
                value={yearSelectedOption}
                label={"বিল সাবমিটের বছর*"}
                placeholder={"বিল সাবমিটের বছর সিলেক্ট করুন"}
              />
              <SearchableSelect
                options={monthOptions}
                onChange={handleMonthSelectChange}
                value={monthSelectedOption}
                label={"বিল সাবমিটের মাস*"}
                placeholder={"বিল সাবমিটের মাস সিলেক্ট করুন"}
              />
              <SearchableSelect
                options={schoolOptions}
                onChange={handleSchoolSelectChange}
                value={schoolSelectedOption}
                label={"বিদ্যালয়*"}
                placeholder={"বিদ্যালয় সিলেক্ট করুন"}
              />
              <div className="mt-7">
                <Tooltip
                  placement="right"
                  title={`${
                    !yearSelectedOption ||
                    !monthSelectedOption ||
                    !schoolSelectedOption
                      ? "Select all options"
                      : ""
                  }`}
                >
                  <button
                    disabled={
                      !yearSelectedOption ||
                      !monthSelectedOption ||
                      !schoolSelectedOption
                    }
                    onClick={handelFormSubmit}
                    href={"/dashboard/bill-return-history"}
                    className={`px-4 py-[6px] pt-2 bg-primaryColor border border-primaryColor hover:bg-textColor text-white rounded-md font-medium capitalize ${
                      !yearSelectedOption ||
                      !monthSelectedOption ||
                      !schoolSelectedOption
                        ? "cursor-not-allowed opacity-75"
                        : "cursor-pointer opacity-100"
                    }`}
                  >
                    সার্চ করুন
                  </button>
                </Tooltip>
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default HistoryPage;
