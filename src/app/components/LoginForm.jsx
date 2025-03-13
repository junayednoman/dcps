"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { LiaEyeSlash, LiaEyeSolid } from "react-icons/lia";
import { Checkbox, FormControlLabel, Popover } from "@mui/material";

const validationSchema = Yup.object().shape({
  unique_id: Yup.string().required("ইউজার আইডি আবশ্যক"),
  password: Yup.string().required("পাসওয়ার্ড আবশ্যক"),
});

const LoginForm = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [passwordType, setPasswordType] = useState(true);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values) => {
    setLoading(true);
    const apiUrl = "https://billreturnmanagement.com/api/auth/sign-in";
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        console.log("response", response);
        if (response.ok) {
        } else {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data && data.message === "Logged in successfully") {
          localStorage.setItem(
            "userInfo",
            JSON.stringify({ user_name: data.user_name, role: data.role })
          );
          toast.success("সাইন ইন সফল হয়েছে!");
          setTimeout(() => {
            window.location = "/dashboard";
          }, 1000);
        } else {
          toast.warn("তথ্য সঠিক নয়!");
        }
      })
      .catch((error) => {
        toast.error("There was an error!");
        console.log("There was an error!", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const checkBoxColor = {
    unchecked: "#000",
    checked: "#008B4C",
  };

  return (
    <>
      <Formik
        initialValues={{ unique_id: "", password: "" }}
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

            <div className="mb-4">
              <label className="font-semibold" htmlFor="password">
                পাসওয়ার্ড*
              </label>
              <div className="relative">
                <Field
                  className="md:h-[50px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1"
                  type={passwordType ? "password" : "text"}
                  name="password"
                  id="password"
                  placeholder="আপনার পাসওয়ার্ড দিন"
                />
                <div
                  className="cursor-pointer inline-block absolute bottom-[36px] right-8"
                  onClick={() => setPasswordType(!passwordType)}
                >
                  <LiaEyeSlash
                    className={`text-[21px] ${
                      passwordType ? "opacity-0" : "opacity-100"
                    } duration-200 absolute`}
                  />
                  <LiaEyeSolid
                    className={`text-[21px] ${
                      passwordType ? "opacity-100" : "opacity-0"
                    } duration-200 absolute`}
                  />
                </div>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-[#ED1C24] text-sm mt-1"
              />
            </div>

            <div className="my-3 flex items-center justify-between rememberMe">
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: checkBoxColor.unchecked,
                      "&.Mui-checked": {
                        color: checkBoxColor.checked,
                      },
                    }}
                  />
                }
                label="Remember me"
              />
              <p
                aria-describedby={id}
                variant="contained"
                onClick={handleClick}
                className="font-semibold text-[#008B4C] cursor-pointer"
              >
                পাসওয়ার্ড ভুলে গেছেন?
              </p>

              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <div className="px-5 py-2 pt-[14px] rounded-md sm:w-[450px] w-[300px]">
                  <p className="font-medium text-black">
                    আপনার ঊর্ধ্বতন কর্মকর্তার সাথে যোগাযোগ করুন।
                  </p>
                  <p className="text-sm mt-1">
                    আপনি head-master হলে আপনার পাসওয়ার্ড পরিবর্তন করতে AUEO এর
                    সাথে, আর AUEO হলে UEO এর সাথে যোগাযোগ করুন।
                  </p>
                </div>
              </Popover>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="px-6 md:py-[10px] py-[6px] md:pt-[15px] pt-[10px] bg-[#006f3d] border border-[#006f3d] hover:bg-[#00532e] text-white rounded-md font-semibold capitalize mt-1 w-full"
              >{`${loading ? "লোড হচ্ছে..." : "সাইন ইন"}`}</button>
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer autoClose={1400} />
    </>
  );
};

export default LoginForm;
