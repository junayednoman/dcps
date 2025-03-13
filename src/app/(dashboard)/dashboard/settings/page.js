"use client";
import { AuthContext } from "@/authContext/AuthContext";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const Settings = () => {
  const { role } = useContext(AuthContext);
  //   const role = "aueo";
  const [status, setStatus] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [fetchedStatus, setFetchedStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const apiUrl = `https://billreturnmanagement.com/api/switch-status`;
    fetch(apiUrl, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          console.log(data.data.isOpened);
          setFetchedStatus(data.data.isOpened);
          setStatus(data.data.isOpened);
        }
      })
      .catch((error) => {
        toast.error("একটি ইরর ঘটেছে!");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  console.log("fetchedStatus, ", fetchedStatus);

  const handleStatusSubmit = (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    const updateData = {
      id: 1,
      isOpened: status,
    };

    const apiUrl = `https://billreturnmanagement.com/api/switch-status/update-switch-status`;
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          toast.success("সফলভাবে আপডেট হয়েছে!");
        }
      })
      .catch((error) => {
        toast.error("একটি ইরর ঘটেছে!");
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center font-semibold text-3xl mt-4">
        <p>loading...</p>
      </div>
    );
  }

  return (
    <>
      {role === "ueo" ? (
        <div>
          <form onSubmit={handleStatusSubmit}>
            <div className="form-control flex flex-row items-center gap-4">
              <label htmlFor="status" className="label-text cursor-pointer">
                {status ? "সফটওয়্যারটি বন্ধ রাখুন" : "সফটওয়্যারটি খোলা রাখুন"}
              </label>
              <input
                onChange={(e) => setStatus(e.target.checked)}
                type="checkbox"
                id="status"
                defaultChecked={fetchedStatus}
                className="toggle"
              />
            </div>
            <br />
            <div>
              <button
                disabled={submitLoading}
                type="submit"
                className="px-4 pt-2 py-[6px] bg-primaryColor border border-primaryColor hover:bg-textColor text-white rounded-md font-medium capitalize"
              >
                {submitLoading ? "আপডেট হচ্ছে..." : "সেভ করুন"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="font-semibold text-2xl">
          <h3>There is nothing to set up!</h3>
        </div>
      )}
    </>
  );
};

export default Settings;
