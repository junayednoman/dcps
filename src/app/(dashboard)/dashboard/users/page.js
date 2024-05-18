"use client"
import Link from "next/link";
import { useState } from "react";
import convertToBengaliNumber from "@/lib/convertToBengaliNumber";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { Backdrop, Box, Fade, Modal } from "@mui/material";
import { IoCloseSharp } from "react-icons/io5";
import TextField from "@/app/components/TextField";

const Users = () => {
    const tableData = [
        { id: "১", name: "খলিলপুর সরকারি প্রাথমিক বিদ্যালয়", designation: "প্রধান শিক্ষক" },
        { id: "২", name: "খঞ্জন পুর সরকারি প্রাথমিক বিদ্যালয়", designation: "প্রধান শিক্ষক" },
        { id: "৩", name: "মনুমুখ সরকারি প্রাথমিক বিদ্যালয়", designation: "প্রধান শিক্ষক" },
        { id: "৪", name: "মোবারকপুর সরকারি প্রাথমিক বিদ্যালয়", designation: "প্রধান শিক্ষক" },
        { id: "৫", name: "নাদামপুর সরকারি প্রাথমিক বিদ্যালয়", designation: "প্রধান শিক্ষক" },
        { id: "৬", name: "নিজ বাহাদুর সরকারি প্রাথমিক বিদ্যালয়", designation: "প্রধান শিক্ষক" },
        { id: "৭", name: "পশ্চিম সাধুহাটি সরকারি প্রাথমিক বিদ্যালয়", designation: "প্রধান শিক্ষক" },
        { id: "৮", name: "পূর্ব লামুয়া হাজি আতিক মিয়া সরকারি প্রাথমিক বিদ্যালয়", designation: "প্রধান শিক্ষক" },
        { id: "৯", name: "রফিনগর সরকারি প্রাথমিক বিদ্যালয়", designation: "প্রধান শিক্ষক" },
        { id: "১০", name: "রফিনগর সরকারি প্রাথমিক বিদ্যালয়", designation: "প্রধান শিক্ষক" },
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

    // modal related
    const [modalOpen, setModalOpen] = useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 430,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    return (
        <>
            <div className="mb-6">
                <button type="submit" className="px-6 md:py-[10px] py-[6px] md:pt-[15px] pt-[10px] bg-[#008B4C] border border-[#008B4C] hover:bg-[#006f3d] text-white rounded-md font-semibold capitalize mt-5">নতুন ইউজার যুক্ত করুন</button>
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
                            <button className='w-full cursor-default'>
                                <IoCloseSharp onClick={handleModalClose} className='text-2xl ml-auto cursor-pointer' />
                            </button>
                            <form className=''>
                                <TextField name="name" placeholder="enter name" label="Name" />
                                <TextField name="email" placeholder="enter email" label="email" />
                                <TextField name="password" placeholder="enter password" label="password" />
                                <div>
                                    <label htmlFor="role">Role</label>
                                    <select className="md:h-[44px] h-[40px] px-3 border border-textColor rounded-md w-full mt-1 pt-[2px]" as="select" name={'role'} id={`role`}>
                                        <option className='text-gray-300' value="একটি অপশন সিলেক্ট করুন" selected></option>
                                        <option value="head-master">head-master</option>
                                        <option value="UEO">UEO</option>
                                        <option value="AUEO">AUEO</option>
                                    </select>
                                </div>
                                <div className="mt-8">
                                    <Link onClick={handleModalClose} href={'/dashboard/bill-return-history'} className="px-4 py-[6px] pt-2 bg-primaryColor border border-primaryColor hover:bg-textColor text-white rounded-md font-medium capitalize mt-4">যোগ করুন</Link>
                                </div>
                            </form>
                        </Box>
                    </Fade>
                </Modal>
            </div>
            <div className="p-6 shadow-sm rounded-md bg-white">
                <div className="flex items-center md:flex-row flex-col justify-between mb-4">
                    <h3 className="text-lg font-semibold md:mb-0 mb-3">ব্যবহারকারী</h3>
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
                                <th className="border px-4 py-2">নাম</th>
                                <th className="border px-4 py-2 ">পদবি</th>
                                <th className="border px-4 py-2">একশন</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item) => (
                                <tr key={item.id}>
                                    <td className="border px-4 py-3">{item.id}</td>
                                    <td className="border px-4 py-3">{item.name}</td>
                                    <td className="border px-4 py-3">{item.designation}</td>
                                    <td className="border px-4 py-3">
                                        <Link href={`/dashboard/bill-details`} className=" font-medium underline">
                                            <div className="flex items-center gap-4 text-xl">
                                                <div className="tooltip tooltip-left" data-tip="Edit user">
                                                    <MdEdit />
                                                </div>
                                                <div className="tooltip tooltip-right" data-tip="Delete user">
                                                    <MdDeleteOutline className=" text-[21px]" />
                                                </div>
                                            </div>
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
                        <h5>{convertToBengaliNumber(tableData.length)} টির মধ্যে ১ থেকে {convertToBengaliNumber(itemsPerPage === 9 ? 10 : itemsPerPage)} পর্যন্ত দেখাচ্ছে</h5>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => changeItemsPerPage(parseInt(e.target.value))}
                            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none"
                        >
                            <option value={5}>প্রতি পেইজে ৫</option>
                            <option value={10}>প্রতি পেইজে ১০</option>
                            <option value={20}>প্রতি পেইজে ২০</option>
                        </select>
                    </div>
                    <div className="flex items-center">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`py-1 px-[13px] pt-[7px] mr-2 ${currentPage === 1 ? "bg-gray-300" : "bg-[#008B4C]"
                                } text-white rounded-md focus:outline-none`}
                        >
                            {"<"}
                        </button>
                        {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }).map(
                            (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => paginate(index + 1)}
                                    className={`py-1 px-[13px] pt-[7px] mr-2 ${currentPage === index + 1 ? "bg-[#008B4C]" : "bg-gray-300"
                                        } text-white rounded-md focus:outline-none`}
                                >
                                    {index + 1}
                                </button>
                            )
                        )}
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
                            className={`py-1 px-[13px] pt-[7px] mr-2 ${currentPage === Math.ceil(filteredData.length / itemsPerPage)
                                ? "bg-gray-300"
                                : "bg-[#008B4C]"
                                } text-white rounded-md focus:outline-none`}
                        >
                            {">"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Users;