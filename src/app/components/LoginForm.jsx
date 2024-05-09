"use client"
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";

const validationSchema = Yup.object().shape({
    emis: Yup.string().required("ইএমআইএস কোড আবশ্যক"),
    password: Yup.string().required("পাসওয়ার্ড আবশ্যক"),
});

const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const handleSubmit = (values) => {
        setLoading(true)
        const apiUrl = "http://localhost:3000/api/auth/sign-in";
        axios.post(apiUrl, values)
            .then(res => {
                if (res.data.role && res.status === 200) {
                    localStorage.setItem("userInfo", JSON.stringify({ name: res.data.name, role: res.data.role }));
                    toast.success(res.data.message)
                    console.log(res.data.name);
                    window.location = "/dashboard"
                } else {
                    console.log(res);
                    toast.warning(res.data.message)
                }
            }).catch(err => {
                console.log('err', err);
                toast.error(err.response.statusText)
            }).finally(() => {
                setLoading(false)
            })
    };

    return (
        <>
            <Formik
                initialValues={{ emis: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="mb-4">
                            <label className="font-semibold" htmlFor="emis">EMIS*</label>
                            {/* <TextField label="বিদ্যালয়ের নাম" placeholder={"বিদ্যালয়ের EMIS কোড দিন"} /> */}
                            <Field id="emis" name="emis" placeholder="বিদ্যালয়ের EMIS কোড দিন" className="md:h-[50px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1" type="text" />
                            <ErrorMessage name="emis" component="div" className="text-[#ED1C24] text-sm mt-1" />
                        </div>

                        <div className="mb-4">
                            <label className="font-semibold" htmlFor="password">পাসওয়ার্ড*</label>
                            <Field className="md:h-[50px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1" type="password" name="password" id="password" placeholder="আপনার পাসওয়ার্ড দিন" />
                            <ErrorMessage name="password" component="div" className="text-[#ED1C24] text-sm mt-1" />
                        </div>

                        <div>
                            <button type="submit" disabled={loading} className="px-6 md:py-[10px] py-[6px] md:pt-[15px] pt-[10px] bg-primaryColor border border-primaryColor hover:bg-textColor text-white rounded-md font-semibold capitalize mt-1">{`${loading ?
                                'লোড হচ্ছে...'


                                : "সাইন ইন"}`}</button>
                        </div>
                    </Form>
                )}
            </Formik>
            <ToastContainer autoClose={1400} />
        </>
    );
};

export default LoginForm;
