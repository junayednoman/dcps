import { Backdrop, Box, Divider, Fade, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Modal } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { FaHistory } from 'react-icons/fa';
import { FaCirclePlus, FaRegCircleQuestion } from 'react-icons/fa6';
import { IoCloseSharp, IoListSharp } from 'react-icons/io5';
import { MdOutlineLogout, MdOutlineStickyNote2 } from 'react-icons/md';
import SearchableSelect from './SearchableSelect';
import { GoGear } from 'react-icons/go';

const SideBarItems = ({ setDrawer }) => {
    // modal related
    const [modalOpen, setModalOpen] = React.useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const [activeMenuItem, setActiveMenuItem] = React.useState("");
    const [role, setRole] = React.useState("উপজেলা শিক্ষা অফিসার");
    React.useEffect(() => {
        const location = window.location.pathname;

        if (location.includes("submit")) {
            setActiveMenuItem("submit");
        } else if (location.includes("history")) {
            setActiveMenuItem("history");
        } else if (location.includes("list")) {
            setActiveMenuItem("list")
        } else if (location.includes("summery")) {
            setActiveMenuItem("summery")
        }
    }, []);
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
    const monthOptions = [
        { value: 'জানুয়ারী', label: 'জানুয়ারী' },
        { value: 'ফেব্রুয়ারী', label: 'ফেব্রুয়ারী' },
        { value: 'মার্চ', label: 'মার্চ' },
        { value: 'এপ্রিল', label: 'এপ্রিল' },
        { value: 'মে', label: 'মে' },
        { value: 'জুন', label: 'জুন' },
        { value: 'জুলাই', label: 'জুলাই' },
        { value: 'আগস্ট', label: 'আগস্ট' },
        { value: 'সেপ্টেম্বর', label: 'সেপ্টেম্বর' },
        { value: 'অক্টোবর', label: 'অক্টোবর' },
        { value: 'নভেম্বর', label: 'নভেম্বর' },
        { value: 'ডিসেম্বর', label: 'ডিসেম্বর' },
    ];

    const schoolOptions = [
        { value: 'খলিলপুর সরকারি প্রাথমিক বিদ্যালয়', label: 'খলিলপুর সরকারি প্রাথমিক বিদ্যালয়' },
        { value: 'খঞ্জনপুর সরকারি প্রাথমিক বিদ্যালয়', label: 'খঞ্জনপুর সরকারি প্রাথমিক বিদ্যালয়' },
        { value: 'মনুমুখ সরকারি প্রাথমিক বিদ্যালয়', label: 'মনুমুখ সরকারি প্রাথমিক বিদ্যালয়' },
    ];
    const subMenuItems = [
        { label: "সেটিংস", link: "/dashboard/settings", icon: <GoGear className='text-xl' /> },
        { label: "সাহায্য ও সহযোগিতা", link: "/dashboard/help", icon: <FaRegCircleQuestion className='text-xl' /> },
        { label: "লগ আউট", link: "/dashboard/help", icon: <MdOutlineLogout className='text-xl' /> },
    ];
    const [monthSelectedOption, setMonthSelectedOption] = React.useState(null);

    const handleMonthSelectChange = (monthSelectedOption) => {
        setMonthSelectedOption(monthSelectedOption);
    };
    const [schoolSelectedOption, setSchoolSelectedOption] = React.useState(null);

    const handleSchoolSelectChange = (schoolSelectedOption) => {
        setSchoolSelectedOption(schoolSelectedOption);
    };

    return (
        <div className='menuItems'>
            <List>
                {role === "প্রধান শিক্ষক" &&
                    <ListItem
                        onClick={() => {
                            setActiveMenuItem("submit");
                            setDrawer(false)
                        }
                        }
                        disablePadding sx={{ display: 'block' }}>
                        <Link href={'/dashboard/bill-return-submit'}>
                            <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }}>
                                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', }}>
                                    <FaCirclePlus className='text-xl' style={{ color: activeMenuItem === "submit" && "#008B4C" }} />
                                </ListItemIcon>
                                <ListItemText className={`capitalize mt-2`} style={{ color: activeMenuItem === "submit" && "#008B4C" }} primary={'বিল রিটার্ন সাবমিট'} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                }
                {role === "সহকারি উপজেলা শিক্ষা অফিসার" || role === "উপজেলা শিক্ষা অফিসার" &&
                    <>
                        <ListItem
                            onClick={() => {
                                setActiveMenuItem("list")
                                setDrawer(false)
                            }}
                            disablePadding sx={{ display: 'block' }}>
                            <Link href={'/dashboard/bill-return-list'}>
                                <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }}>
                                    <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', }}>
                                        <IoListSharp className='text-xl' style={{ color: activeMenuItem === "list" && "#008B4C" }} />
                                    </ListItemIcon>
                                    <ListItemText className={`capitalize mt-2`} style={{ color: activeMenuItem === "list" && "#008B4C" }} primary={'বিল রিটার্ন তালিকা'} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                        <ListItem
                            onClick={() => {
                                setActiveMenuItem("summery");
                                setDrawer(false);
                            }}
                            disablePadding sx={{ display: 'block' }}>
                            <Link href={'/dashboard/bill-return-summery'}>
                                <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }}>
                                    <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', }}>
                                        <MdOutlineStickyNote2 className='text-xl' style={{ color: activeMenuItem === "summery" && "#008B4C" }} />
                                    </ListItemIcon>
                                    <ListItemText className={`capitalize mt-2`} style={{ color: activeMenuItem === "summery" && "#008B4C" }} primary={'বিল রিটার্ন সারাংশ'} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    </>
                }
                <ListItem onClick={() => setActiveMenuItem("history")} disablePadding sx={{ display: 'block' }}>
                    <button onClick={handleModalOpen}>
                        <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }}>
                            <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', }}>
                                <FaHistory style={{ color: activeMenuItem === "history" && "#008B4C" }} className='text-xl' />
                            </ListItemIcon>
                            <ListItemText style={{ color: activeMenuItem === "history" && "#008B4C" }} className={`capitalize mt-2`} primary={'বিল রিটার্ন ইতিহাস'} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </button>
                    <div>
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
                                    <form className='mt-3'>
                                        <div className="mb-4">
                                            <h1>বিল সাবমিটের মাস সিলেক্ট করুন</h1>
                                            <SearchableSelect
                                                options={monthOptions}
                                                onChange={handleMonthSelectChange}
                                                value={monthSelectedOption}
                                                placeholder={"মাস সিলেক্ট করুন"}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <h1>বিদ্যালয় সিলেক্ট করুন</h1>
                                            <SearchableSelect
                                                options={schoolOptions}
                                                onChange={handleSchoolSelectChange}
                                                value={schoolSelectedOption}
                                            />
                                        </div>
                                        <Link
                                            onClick={() => {
                                                handleModalClose
                                                setDrawer(false)
                                            }}
                                            href={'/dashboard/bill-return-history'} className="px-4 py-[6px] pt-2 bg-primaryColor border border-primaryColor hover:bg-textColor text-white rounded-md font-medium capitalize mt-4">সার্চ করুন</Link>
                                    </form>
                                </Box>
                            </Fade>
                        </Modal>
                    </div>
                </ListItem>
            </List>

            <Divider />
            <List>
                {subMenuItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                        <Link href={item.link}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                {/* {item.icon} */}
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {/* render the icons here */}
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText className='capitalize' primary={item.label} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default SideBarItems;