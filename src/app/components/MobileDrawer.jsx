
"use client"

// export default BilReturnSubmit;
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import SideBarItems from './SideBarItems';
import { HiBars3 } from "react-icons/hi2";
import { MdOutlineClose } from "react-icons/md";

export default function MobileDrawer() {
    const [openMobileDrawer, setOpenMobileDrawer] = React.useState(false);

    const toggleMobileDrawer = (newOpenMobileDrawer) => () => {
        setOpenMobileDrawer(newOpenMobileDrawer);
    };


    return (
        <div>
            <div onClick={() => setOpenMobileDrawer(!openMobileDrawer)} className='lg:hidden flex justify-center items-center cursor-pointer'>
                <div className='flex items-center justify-center'>
                    <HiBars3 className={`${openMobileDrawer ? 'opacity-0' : 'opacity-100'} duration-300 open_close_btn_mobile_drawer text-3xl`} />
                </div>
                <MdOutlineClose className={`${openMobileDrawer ? 'opacity-100' : 'opacity-0'} duration-300 open_close_btn_mobile_drawer text-3xl`} />
            </div>
            <Drawer open={openMobileDrawer} onClose={toggleMobileDrawer(false)}>
                <div>
                    <SideBarItems setDrawer={setOpenMobileDrawer} />
                </div>
            </Drawer>
        </div>
    );
}