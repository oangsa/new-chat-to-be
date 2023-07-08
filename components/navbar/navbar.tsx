import {Button, Input, Link, Navbar, Text} from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import {Box} from '../styles/box';
import {BurguerButton} from './burguer-button';
import {UserDropdown} from './user-dropdown';
import { getCookie, deleteCookie  } from "cookies-next"
import jwtDecode from 'jwt-decode';
import LoginModal from './loginModal';

interface Props {
   children: React.ReactNode;
}

export const NavbarWrapper = ({children}: Props) => {

   const [isAdmin, setIsAdmin] = useState<boolean>(false)
   const [hasCookie, setHasCookie] = useState<boolean>(false)

   useEffect(() => {
      const cookie: any = getCookie("user-token")
      const token: any = cookie === undefined ? undefined : jwtDecode(cookie, {header: true}) 
      setIsAdmin(token?.isAdmin === undefined ? false : token.isAdmin)
      setHasCookie(cookie === undefined ? false : true )
  }, [])

   const collapseItems = [
      'Profile',
      'Dashboard',
      'Activity',
      'Analytics',
      'System',
      'Deployments',
      'My Settings',
      'Team Settings',
      'Help & Feedback',
      'Log Out',
   ];
   return (
      <Box
         css={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            flex: '1 1 auto',
            overflowY: 'auto',
            overflowX: 'hidden',
         }}
      >
         <Navbar
            isBordered
            css={{
               'borderBottom': '1px solid $border',
               'justifyContent': 'space-between',
               'width': '100%',
               '@md': {
                  justifyContent: 'space-between',
               },

               '& .nextui-navbar-container': {
                  'border': 'none',
                  'maxWidth': '100%',

                  'gap': '$6',
                  '@md': {
                     justifyContent: 'space-between',
                  },
               },
            }}
         >
            <Navbar.Content showIn="md">
               <BurguerButton />
            </Navbar.Content>
            <Navbar.Content
               hideIn={'md'}
               css={{
                  width: '100%',
               }}
            >
            </Navbar.Content>
            {hasCookie === false ? 

               <Navbar.Content>     
                  <Navbar.Content>
                     <LoginModal/>
                  </Navbar.Content>
               </Navbar.Content>
            
            : 
               <Navbar.Content>     
                  <Navbar.Content>
                     <Button color={"gradient"}>ลงทะเบียน</Button>
                  </Navbar.Content>
                  <Navbar.Content>
                     <UserDropdown />
                  </Navbar.Content>
               </Navbar.Content>
          
            }
            
            <Navbar.Collapse>
               {collapseItems.map((item, index) => (
                  <Navbar.CollapseItem
                     key={item}
                     activeColor="secondary"
                     css={{
                        color:
                           index === collapseItems.length - 1 ? '$error' : '',
                     }}
                     isActive={index === 2}
                  >
                     <Link
                        color="inherit"
                        css={{
                           minWidth: '100%',
                        }}
                        href="#"
                     >
                        {item}
                     </Link>
                  </Navbar.CollapseItem>
               ))}
            </Navbar.Collapse>
         </Navbar>
         {children}
      </Box>
   );
};
