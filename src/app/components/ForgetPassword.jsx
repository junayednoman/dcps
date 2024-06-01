"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";

const validationSchema = Yup.object().shape({
  unique_id: Yup.string().required("ইউজার আইডি আবশ্যক"),
});

const ForgetPassword = () => {
  const [resetToken, setResetToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values) => {
    setLoading(true);
    const apiUrl = "https://dmsp.vercel.app/api/auth/forget-password";
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: values.unique_id }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.success) {
          setResetToken(data.hashedToken);
          console.log(data);
        } else {
          toast.warn("সঠিক আইডি দিন");
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
        initialValues={{ unique_id: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div className="mb-4">
              <label className="font-semibold" htmlFor="unique_id">
                আইডি*
              </label>
              <Field
                id="unique_id"
                name="unique_id"
                placeholder="আপনার ইউজার আইডি দিন"
                className="md:h-[50px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1"
                type="text"
              />
              <ErrorMessage
                name="unique_id"
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
      <ToastContainer autoClose={1500} />
      {resetToken && <div className="py-4 mb-5">Token: {resetToken}</div>}
      <Link href={"/reset-password"}>Reset Pass</Link>
    </>
  );
};

export default ForgetPassword;
