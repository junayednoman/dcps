"use client"
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField } from "@mui/material";

const validationSchema = Yup.object().shape({
    email: Yup.string().email("ইমেইল অ্যাড্রেস সঠিক নয়").required("ইমেইল আবশ্যক"),
    password: Yup.string().required("পাসওয়ার্ড আবশ্যক"),
});

const handleSubmit = () => {
    console.log("clicking");
};

const LoginForm = () => {
    return (
        <>
            <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="mb-4">
                            <label className="font-semibold" htmlFor="emis">EMIS*</label>
                            {/* <TextField label="বিদ্যালয়ের নাম" placeholder={"বিদ্যালয়ের EMIS কোড দিন"} /> */}
                            <Field id="emis" name="emis" placeholder="বিদ্যালয়ের EMIS কোড দিন" className="md:h-[50px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1" type="email" />
                            <ErrorMessage name="email" component="div" className="text-[#ED1C24] text-sm mt-1" />
                        </div>

                        <div className="mb-4">
                            <label className="font-semibold" htmlFor="password">পাসওয়ার্ড*</label>
                            <Field className="md:h-[50px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1" type="password" name="password" id="password" placeholder="আপনার পাসওয়ার্ড দিন" />
                            <ErrorMessage name="password" component="div" className="text-[#ED1C24] text-sm mt-1" />
                        </div>

                        <div>
                            <button type="submit" className="px-6 md:py-[10px] py-[6px] md:pt-[15px] pt-[10px] bg-primaryColor border border-primaryColor hover:bg-textColor text-white rounded-md font-semibold capitalize mt-1">{isSubmitting ? "লোড হচ্ছে..." : "সাইন ইন"}</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default LoginForm;
