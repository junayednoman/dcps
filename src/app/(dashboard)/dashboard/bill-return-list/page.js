"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import convertToBengaliNumber from "@/lib/convertToBengaliNumber";
import Loading from "@/app/components/Loading";
import { AuthContext } from "@/authContext/AuthContext";
import { toast } from "react-toastify";

const BillList = () => {
  const [loading, setLoading] = useState(false);
  const [schoolData, setSchoolData] = useState(null);
  const { userName } = useContext(AuthContext);
  console.log(schoolData);
  useEffect(() => {
    if (userName) {
      setLoading(true);
      const apiUrl = "https://dmsp.vercel.app/api/bill-return/list";
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
          // handleModalClose();
          console.log(data.data);
          if (data.success) {
            setSchoolData(data.data);
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
  console.log(schoolData);

  const tableData = [
    { id: "১", name: "খলিলপুর সরকারি প্রাথমিক বিদ্যালয়", emis: "34fsdf" },
    { id: "২", name: "খঞ্জন পুর সরকারি প্রাথমিক বিদ্যালয়", emis: "4r34df34" },
    { id: "৩", name: "মনুমুখ সরকারি প্রাথমিক বিদ্যালয়", emis: "dr789" },
    { id: "৪", name: "মোবারকপুর সরকারি প্রাথমিক বিদ্যালয়", emis: "er987hui" },
    { id: "৫", name: "নাদামপুর সরকারি প্রাথমিক বিদ্যালয়", emis: "548094ji" },
    { id: "৬", name: "নিজ বাহাদুর সরকারি প্রাথমিক বিদ্যালয়", emis: "ed89e" },
    {
      id: "৭",
      name: "পশ্চিম সাধুহাটি সরকারি প্রাথমিক বিদ্যালয়",
      emis: "ewf897",
    },
    {
      id: "৮",
      name: "পূর্ব লামুয়া হাজি আতিক মিয়া সরকারি প্রাথমিক বিদ্যালয়",
      emis: "dsf-0",
    },
    { id: "৯", name: "রফিনগর সরকারি প্রাথমিক বিদ্যালয়", emis: "df8s8f" },
    { id: "১০", name: "রফিনগর সরকারি প্রাথমিক বিদ্যালয়", emis: "d87fy" },
    // Add more data as needed
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Filtering data based on search term
  const filteredData = schoolData?.filter(
    (item) =>
      item.school.general.name.includes(searchTerm) ||
      String(item.atomicNumber).includes(searchTerm)
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Change items per page
  const changeItemsPerPage = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  if (loading) {
    return <Loading />;
  }

  return (
    schoolData && (
      <div className="md:p-6 p-3 py-6 shadow-sm rounded-md bg-white">
        <div className="flex items-center md:flex-row flex-col justify-between mb-4">
          <h3 className="text-lg font-semibold md:mb-0 mb-3">
            বিল রিটার্ন তালিকা ({convertToBengaliNumber(schoolData.length)})
          </h3>
          {schoolData.length > 0 && (
            <input
              type="text"
              placeholder="সার্চ করুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-[#008B4C]"
            />
          )}
        </div>
        {schoolData.length > 0 ? (
          <>
            <div>
              <table className="w-full table-auto">
                <thead className="text-left bg-slate-100">
                  <tr>
                    <th className="border px-4 py-2">ক্রমিক</th>
                    <th className="border px-4 py-2 md:block hidden">
                      ইএমআইএস
                    </th>
                    <th className="border px-4 py-2">নাম</th>
                    <th className="border px-4 py-2 md:block hidden">
                      এপ্রুভ করেছেন
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems?.map((item, index) => (
                    <tr key={item.id}>
                      <td className="border px-4 py-3">
                        {convertToBengaliNumber(index + 1)}
                      </td>
                      <td className="border px-4 py-3 md:block hidden">
                        {item.school.general.emis_code}
                      </td>
                      <td className="border px-4 py-3">
                        <Link
                          href={`/dashboard/bill-details/${item._id}`}
                          className="font-medium hover:underline"
                        >
                          {item.school.general.name}
                        </Link>
                      </td>
                      <td className="border px-4 py-3 md:block hidden">
                        {item.isUEOVerified ? (
                          <p className="text-[#008B4C] font-medium">
                            উপজেলা শিক্ষা অফিসার
                          </p>
                        ) : item.isAUEOVerified ? (
                          <p className="text-[#B41E8E] font-medium">
                            সহকারি শিক্ষা অফিসার
                          </p>
                        ) : (
                          <p className="text-[#ED1C24] font-medium">
                            এপ্রুভ করা হইনি
                          </p>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="mt-6 flex md:flex-row flex-col gap-8 items-center justify-between">
              <div className="flex items-center gap-5">
                <h5>
                  {convertToBengaliNumber(schoolData.length)} টির মধ্যে ১ থেকে{" "}
                  {convertToBengaliNumber(
                    itemsPerPage === 9 ? 10 : itemsPerPage
                  )}{" "}
                  পর্যন্ত দেখাচ্ছে
                </h5>
                <select
                  value={itemsPerPage}
                  onChange={(e) => changeItemsPerPage(parseInt(e.target.value))}
                  className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none"
                >
                  <option value={5}>৫ প্রতি পেইজে</option>
                  <option value={10}>১০ প্রতি পেইজে</option>
                  <option value={20}>২০ প্রতি পেইজে</option>
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
                  length: Math.ceil(filteredData?.length / itemsPerPage),
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
                    currentPage ===
                    Math.ceil(filteredData?.length / itemsPerPage)
                  }
                  className={`py-1 px-[13px] pt-[7px] mr-2 ${
                    currentPage ===
                    Math.ceil(filteredData?.length / itemsPerPage)
                      ? "bg-gray-300"
                      : "bg-[#008B4C]"
                  } text-white rounded-md focus:outline-none`}
                >
                  {">"}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-6 justify-center">
            <p className="py-20 text-center text-xl font-semibold">
              কোন তথ্য পাওয়া যাইনি!
            </p>
          </div>
        )}
      </div>
    )
  );
};

export default BillList;
