import React, {useState} from 'react';
import {Box} from '../styles/box';
import {Sidebar} from './sidebar.styles';
import {Avatar, Tooltip} from '@nextui-org/react';
import {Flex} from '../styles/flex';
import {HomeIcon} from '../icons/sidebar/home-icon';
import {DashboardIcon} from '../icons/sidebar/dashboard-icon';
import {AccountsIcon} from '../icons/sidebar/accounts-icon';
import {DevIcon} from '../icons/sidebar/dev-icon';
import {ViewIcon} from '../icons/sidebar/view-icon';
import {SettingsIcon} from '../icons/sidebar/settings-icon';
import {SidebarItem} from './sidebar-item';
import {SidebarMenu} from './sidebar-menu';
import {FilterIcon} from '../icons/sidebar/filter-icon';
import {useSidebarContext} from '../layout/layout-context';
import {ChangeLogIcon} from '../icons/sidebar/changelog-icon';
import {useRouter, usePathname} from 'next/navigation';
import Image from "next/image";
import Logo from "../../public/Logo.png"
import { ChatIcon } from '../icons/sidebar/chat-icon';

export const SidebarWrapper = () => {
   const router = useRouter();
   const pathname = usePathname();
   const {collapsed, setCollapsed} = useSidebarContext();

   return (
      <Box
         as="aside"
         css={{
            height: '100vh',
            zIndex: 202,
            position: 'sticky',
            top: '0',
         }}
      >
         {collapsed ? <Sidebar.Overlay onClick={setCollapsed} /> : null}

         <Sidebar collapsed={collapsed}>
            <Sidebar.Header>
                <Image width={150} height={150} src={Logo} alt="company logo" />
            </Sidebar.Header>
            <Flex
               direction={'column'}
               justify={'between'}
               css={{height: '100%'}}
            >
               <Sidebar.Body className="body sidebar">
                  <SidebarItem
                     title="หน้าหลัก"
                     icon={<HomeIcon />}
                     isActive={pathname === '/'}
                     href="/"
                  />
                  <SidebarMenu title="แอดมิน">
                     <SidebarItem
                        isActive={pathname === '/admin/userlist'}
                        title="รายชื่อนักเรียน"
                        icon={<AccountsIcon />}
                        href="/admin/userlist"
                     />
                     <SidebarItem
                        isActive={pathname === '/admin/dashboard'}
                        title="แผงควบคุม"
                        icon={<DashboardIcon />}
                        href="/admin/dashboard"
                     />
                  </SidebarMenu>

                  <SidebarMenu title="ทั่วไป">
                     <SidebarItem
                        isActive={pathname === '/chats'}
                        title="แชท"
                        icon={<ChatIcon />}
                     />
                     <SidebarItem
                        isActive={pathname === '/setting'}
                        title="ตั้งค่า"
                        icon={<SettingsIcon />}
                     />
                  </SidebarMenu>

                  <SidebarMenu title="อัพเดต">
                     <SidebarItem
                        isActive={pathname === '/changelog'}
                        title="Changelog"
                        icon={<ChangeLogIcon />}
                     />
                  </SidebarMenu>
               </Sidebar.Body>
            </Flex>
         </Sidebar>
      </Box>
   );
};
