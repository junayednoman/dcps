"use client";
import * as Yup from "yup";
import { useContext, useEffect, useState } from "react";
import convertToBengaliNumber from "@/lib/convertToBengaliNumber";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { Backdrop, Box, CircularProgress, Fade, Modal } from "@mui/material";
import { IoCloseSharp } from "react-icons/io5";
import TextField from "@/app/components/TextField";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import Loading from "@/app/components/Loading";
import { AuthContext } from "@/authContext/AuthContext";
import UserNames from "@/app/components/UserNames";

const Users = () => {
  const { userName, role } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [mutated, setMutated] = useState(false);

  const [schoolOptions, setSchoolOptions] = useState(null);
  useEffect(() => {
    if (role === "aueo") {
      const apiUrl = "https://dmsp.vercel.app/api/clusters";
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userName),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.data);
          if (data.success) {
            const schoolOptions = data.data.schools.map((school) => ({
              value: school.name,
              label: school.name,
            }));
            setSchoolOptions(schoolOptions);
          }
        })
        .catch((error) => {
          toast.error("There was an error!");
          console.error("There was an error!", error);
        })
        .finally(() => {
          // setLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    setDataLoading(true);
    const apiUrl = "https://dmsp.vercel.app/api/users";
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userName),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setUsers(data.data);
        }
      })
      .catch((error) => {
        toast.error("একটি ইরর ঘটেছে!");
        console.error("There was an error!", error);
      })
      .finally(() => {
        setDataLoading(false);
      });
  }, [mutated, userName]);

  const validationSchema = Yup.object().shape({
    // user_name: Yup.string().required("ইউজার নামটি অবশ্যই পূরণ করতে হবে।"),
    unique_id: Yup.string().required("ইউনিক আইডি অবশ্যই পূরণ করতে হবে।"),
    password: Yup.string()
      .required("পাসওয়ার্ড অবশ্যই পূরণ করতে হবে।")
      .min(6, "পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে।")
      .matches(/\d/, "পাসওয়ার্ডে অন্তত একটি সংখ্যা থাকতে হবে।"),
  });
  const updateShema = Yup.object().shape({
    password: Yup.string()
      .required("পাসওয়ার্ড অবশ্যই পূরণ করতে হবে।")
      .min(6, "পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে।")
      .matches(/\d/, "পাসওয়ার্ডে অন্তত একটি সংখ্যা থাকতে হবে।"),
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Filtering data based on search term
  const filteredData = users.filter(
    (item) =>
      item?.user_name?.includes(searchTerm) ||
      String(item.role).includes(searchTerm)
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Change items per page
  const changeItemsPerPage = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // modal related
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

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

  // user names
  const [selectedUserName, setSelectedUserName] = useState(null);

  const [userNameError, setUserNameError] = useState(false);
  const handleUserNameChange = (selectedUserName) => {
    if (selectedUserName) {
      setUserNameError(false);
    }
    setSelectedUserName(selectedUserName);
  };

  // update user modal
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const handleUpdateModalOpen = () => setUpdateModalOpen(true);
  const handleUpdateModalClose = () => {
    setUpdateModalOpen(false);
    setSelectedUserName(null);
  };

  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (values) => {
    if (!selectedUserName) {
      return setUserNameError(true);
    } else {
      values.user_name = selectedUserName.value;
      setUserNameError(false);
    }
    setLoading(true);
    if (role === "ueo") {
      values.role = "aueo";
    } else {
      values.role = "head-master";
    }
    const currentDate = new Date().toISOString();
    values.created_at = currentDate;
    values.parent = userName;

    const apiUrl = "https://dmsp.vercel.app/api/users/add";
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // handleModalClose();
        console.log(data);
        if (data.message === "user name exist") {
          setSelectedUserName(null);
          Swal.fire({
            title: "ইউজার নামটি ইতোমধ্যে নেওয়া হয়েছে!",
            text: "ইউজার নামটি ইতোমধ্যে নেওয়া হয়েছে। অন্য নাম দিয়ে চেস্টা করুন।",
            icon: "warning",
            confirmButtonText: "ঠিক আছে",
            customClass: {
              confirmButton: "my-confirm-button",
            },
          });
        } else if (data.message === "id exist") {
          Swal.fire({
            title: "ইউনিক আইডিটি ইতোমধ্যে নেওয়া হয়েছে!",
            text: "ইউনিক আইডিটি ইতোমধ্যে নেওয়া হয়েছে। অন্য আইডি দিয়ে চেস্টা করুন।",
            icon: "warning",
            confirmButtonText: "ঠিক আছে",
            customClass: {
              confirmButton: "my-confirm-button",
            },
          });
        }
        if (data.success) {
          toast.success("সফলভাবে সাবমিট হয়েছে!");
          setMutated(!mutated);
        } else {
          toast.warn("সাবমিট হয়নি");
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
  };

  const handleUserDelete = (id) => {
    Swal.fire({
      title: "আপনি কি নিশ্চিত?",
      text: "ডিলিট করলে ফিরিয়ে আনতে পারবেন না!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ED1C24",
      cancelButtonColor: "#008B4C",
      confirmButtonText: "হে, ডিলিট করুন!",
      cancelButtonText: "বাতিল করুন",
    }).then((result) => {
      if (result.isConfirmed) {
        const apiUrl = "https://dmsp.vercel.app/api/users/delete";
        fetch(apiUrl, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(id),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            // handleModalClose();
            console.log(data);
            if (data.success) {
              Swal.fire({
                title: "ডিলিট হয়েছে!",
                text: "ইউজারটি সফলভাবে ডিলিট হয়েছে!",
                icon: "success",
                confirmButtonColor: "#ED1C24",
                confirmButtonText: "ঠিক আছে",
              }).then((result) => {
                if (result.isConfirmed) {
                  // window.location.reload();
                  setMutated(!mutated);
                }
              });
            }
          })
          .catch((error) => {
            toast.error("একটি ইরর ঘটেছে!");
            console.error("There was an error!", error);
          })
          .finally(() => {
            // setLoading(false);
          });
      }
    });
  };
  console.log(users);
  const handleUserUpdate = (id) => {};
  if (dataLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className="mb-6">
        <button
          onClick={handleModalOpen}
          type="submit"
          disabled={loading}
          className="px-6 md:py-[10px] py-[6px] md:pt-[15px] pt-[10px] bg-[#008B4C] border border-[#008B4C] hover:bg-[#006f3d] text-white rounded-md font-semibold capitalize mt-5"
        >
          {loading ? (
            <p className="text-white flex items-center gap-2">
              <span>লোড হচ্ছে...</span>
              <CircularProgress className="btnSpinner" />
            </p>
          ) : role === "ueo" ? (
            "নতুন ক্লাস্টার যুক্ত করুন"
          ) : (
            "নতুন বিদ্যালয় যুক্ত করুন"
          )}
        </button>
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

              <Formik
                initialValues={{
                  unique_id: "",
                  user_name: "",
                  password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
              >
                {({ isValid }) => (
                  <Form>
                    <div className="">
                      <UserNames
                        schoolOptions={schoolOptions}
                        userNameError={userNameError}
                        handleUserNameChange={handleUserNameChange}
                        selectedUserName={selectedUserName}
                        role={role}
                        UserName={userName}
                      />
                      <TextField
                        name="unique_id"
                        placeholder="ইউনিক আইডি দিন"
                        label="ইউনিক আইডি*"
                      />
                      <TextField
                        name="password"
                        placeholder="পাসওয়ার্ড দিন"
                        label="পাসওয়ার্ড*"
                      />
                      <div className="mt-5">
                        <button
                          type="submit"
                          disabled={!isValid}
                          className={`px-5 py-[9px] pt-3 bg-primaryColor border border-primaryColor text-white rounded-md font-medium capitalize ${
                            !isValid ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        >
                          {loading ? (
                            <p className="text-white flex items-center gap-2">
                              <span>লোড হচ্ছে...</span>
                              <CircularProgress className="btnSpinner" />
                            </p>
                          ) : (
                            "যোগ করুন"
                          )}
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </Box>
          </Fade>
        </Modal>
        {/* user update modal */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={updateModalOpen}
          onClose={handleUpdateModalClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={updateModalOpen}>
            <Box sx={modalStyle}>
              <button className="w-full cursor-default">
                <IoCloseSharp
                  onClick={handleUpdateModalClose}
                  className="text-2xl ml-auto cursor-pointer"
                />
              </button>

              <Formik
                initialValues={{
                  password: "",
                }}
                validationSchema={updateShema}
                onSubmit={handleUserUpdate}
              >
                {({ isValid }) => (
                  <Form>
                    <div className="">
                      <TextField
                        name="password"
                        placeholder="পাসওয়ার্ড দিন"
                        label="পাসওয়ার্ড*"
                      />
                      <div className="mt-5">
                        <button
                          type="submit"
                          disabled={!isValid}
                          className={`px-5 py-[9px] pt-3 bg-primaryColor border border-primaryColor text-white rounded-md font-medium capitalize ${
                            !isValid ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        >
                          {loading ? (
                            <p className="text-white flex items-center gap-2">
                              <span>লোড হচ্ছে...</span>
                              <CircularProgress className="btnSpinner" />
                            </p>
                          ) : (
                            "যোগ করুন"
                          )}
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </Box>
          </Fade>
        </Modal>
      </div>
      <div className="p-6 shadow-sm rounded-md bg-white">
        <div className="flex items-center md:flex-row flex-col justify-between mb-4">
          <h3 className="text-lg font-semibold md:mb-0 mb-3">
            ব্যবহারকারীঃ{" "}
            <span className="text-xl">
              {convertToBengaliNumber(users.length)}
            </span>
          </h3>
          {users.length > 0 && (
            <input
              type="text"
              placeholder="সার্চ করুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-[#008B4C]"
            />
          )}
        </div>
        <div>
          {users.length > 0 ? (
            <table className="w-full table-auto">
              <thead className="text-left bg-slate-100">
                <tr>
                  <th className="border px-4 py-2">ক্রমিক</th>
                  <th className="border px-4 py-2">নাম</th>
                  <th className="border px-4 py-2 ">ভূমিকা</th>
                  <th className="border px-4 py-2">একশন</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-3">{index + 1}</td>
                    <td className="border px-4 py-3">{item.user_name}</td>
                    <td className="border px-4 py-3">
                      {item.role === "ueo"
                        ? "উপজেলা শিক্ষা অফিসার"
                        : item.role === "aueo"
                        ? "ক্লাস্টার"
                        : "বিদ্যালয়"}
                    </td>
                    <td className="border px-4 py-3">
                      <div>
                        <div className="flex items-center gap-4 text-xl">
                          <div
                            onClick={handleUpdateModalOpen}
                            className="tooltip tooltip-left cursor-pointer"
                            data-tip="Edit user"
                          >
                            <MdEdit />
                          </div>
                          <div
                            onClick={() => handleUserDelete(item._id)}
                            className="tooltip tooltip-right cursor-pointer"
                            data-tip="Delete user"
                          >
                            <MdDeleteOutline className=" text-[21px]" />
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="py-20 text-center text-xl font-semibold">
              No data found!
            </p>
          )}
        </div>
        {/* Pagination */}
        {users.length > 0 && (
          <div className="mt-6 flex md:flex-row flex-col gap-8 items-center justify-between">
            <div className="flex items-center gap-5">
              <h5>
                {convertToBengaliNumber(users.length)} টির মধ্যে ১ থেকে{" "}
                {convertToBengaliNumber(itemsPerPage === 9 ? 10 : itemsPerPage)}{" "}
                পর্যন্ত দেখাচ্ছে
              </h5>
              <select
                value={itemsPerPage}
                onChange={(e) => changeItemsPerPage(parseInt(e.target.value))}
                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none"
              >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={20}>20 per page</option>
              </select>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`py-1 px-[13px] pt-[7px] mr-2 ${
                  currentPage === 1 ? "bg-gray-300" : "bg-[#008B4C]"
                } text-white rounded-md focus:outline-none`}
              >
                {"<"}
              </button>
              {Array.from({
                length: Math.ceil(filteredData.length / itemsPerPage),
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`py-1 px-[13px] pt-[7px] mr-2 ${
                    currentPage === index + 1 ? "bg-[#008B4C]" : "bg-gray-300"
                  } text-white rounded-md focus:outline-none`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={
                  currentPage === Math.ceil(filteredData.length / itemsPerPage)
                }
                className={`py-1 px-[13px] pt-[7px] mr-2 ${
                  currentPage === Math.ceil(filteredData.length / itemsPerPage)
                    ? "bg-gray-300"
                    : "bg-[#008B4C]"
                } text-white rounded-md focus:outline-none`}
              >
                {">"}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Users;
