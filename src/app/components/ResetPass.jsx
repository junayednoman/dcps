"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  reset_token: Yup.string().required("টোকেন আবশ্যক"),
  password: Yup.string()
    .required("পাসওয়ার্ড অবশ্যই পূরণ করতে হবে।")
    .min(6, "পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে।")
    .matches(/\d/, "পাসওয়ার্ডে অন্তত একটি সংখ্যা থাকতে হবে।"),
});

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values) => {
    setLoading(true);
    const apiUrl = "http://localhost:3000/api/auth/reset-password";
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: values.reset_token,
        password: values.password,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.success) {
          toast.success("সফলভাবে পাসওয়ার্ড রিসেট হয়েছে");
          setTimeout(() => {
            window.location = "/";
          }, 1600);
        } else {
          toast.warn("সঠিক তথ্য দিন");
        }
      })
      .catch((error) => {
        toast.error("There was an error!");
        console.error("There was an error!", error);
      })
      .finally(() => {
        setLoading(false);
      });
    console.log(values);
  };

  return (
    <>
      <Formik
        initialValues={{ reset_token: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div className="mb-4">
              <label className="font-semibold" htmlFor="reset_token">
                টোকেন*
              </label>
              <Field
                id="reset_token"
                name="reset_token"
                placeholder="আপনার টোকেন দিন"
                className="md:h-[50px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1"
                type="text"
              />
              <ErrorMessage
                name="reset_token"
                component="div"
                className="text-[#ED1C24] text-sm mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="font-semibold" htmlFor="password">
                পাসওয়ার্ড*
              </label>
              <div className="relative">
                <Field
                  className="md:h-[50px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1"
                  type={"text"}
                  name="password"
                  id="password"
                  placeholder="নতুন পাসওয়ার্ড দিন"
                />
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-[#ED1C24] text-sm mt-1"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="px-6 md:py-[10px] py-[6px] md:pt-[15px] pt-[10px] bg-[#006f3d] border border-[#006f3d] hover:bg-[#00532e] text-white rounded-md font-semibold capitalize mt-1 w-full"
              >{`${loading ? "লোড হচ্ছে..." : "এগিয়ে যান"}`}</button>
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer autoClose={1600} />
    </>
  );
};

export default ResetPassword;
