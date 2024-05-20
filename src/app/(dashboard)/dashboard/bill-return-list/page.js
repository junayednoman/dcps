"use client";
import Link from "next/link";
import { useState } from "react";
import convertToBengaliNumber from "@/lib/convertToBengaliNumber";

const BillList = () => {
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
  const filteredData = tableData.filter(
    (item) =>
      item.name.includes(searchTerm) ||
      String(item.atomicNumber).includes(searchTerm)
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

  
  return (
    <div className="p-6 shadow-sm rounded-md bg-white">
      <div className="flex items-center md:flex-row flex-col justify-between mb-4">
        <h3 className="text-lg font-semibold md:mb-0 mb-3">
          বিল রিটার্ন তালিকা
        </h3>
        <input
          type="text"
          placeholder="সার্চ করুন..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-[#008B4C]"
        />
      </div>
      <div>
        <table className="w-full table-auto">
          <thead className="text-left bg-slate-100">
            <tr>
              <th className="border px-4 py-2">ক্রমিক</th>
              <th className="border px-4 py-2 md:block hidden">ইএমআইএস</th>
              <th className="border px-4 py-2">নাম</th>
              <th className="border px-4 py-2 md:block hidden">একশন</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td className="border px-4 py-3">{item.id}</td>
                <td className="border px-4 py-3 md:block hidden">
                  {item.emis}
                </td>
                <td className="border px-4 py-3">{item.name}</td>
                <td className="border px-4 py-3 md:block hidden">
                  <Link
                    href={`/dashboard/bill-details`}
                    className="text-greenColor font-medium underline"
                  >
                    বিস্তারিত দেখুন
                  </Link>
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
            {convertToBengaliNumber(tableData.length)} টির মধ্যে ১ থেকে{" "}
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
    </div>
  );
};

export default BillList;
