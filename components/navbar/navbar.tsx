
import {Button, Input, Link, Navbar, Text} from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import {Box} from '../styles/box';
import {BurguerButton} from './burguer-button';
import {UserDropdown} from './user-dropdown';
import { getCookie, deleteCookie  } from "cookies-next"
import jwtDecode from 'jwt-decode';
import LoginModal from './loginModal';
import checkCookie from '@/libs/checkCookie';
import Registeration from '../home/registeration';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface Props {
   children: React.ReactNode;
}

export const NavbarWrapper = ({children}: Props) => {

   const [isAdmin, setIsAdmin] = useState<boolean>(false)
   const [isDoneLoading, setIsDoneLoading] = useState<boolean>(false)
   const [hasCookie, setHasCookie] = useState<boolean>(false)
   const [data, setData] = useState<any>()

   async function a (){
      const token: any = await checkCookie()
      if (token === undefined || token === null) {
         await setIsAdmin(false)
         await setHasCookie(false)
      }
      else {
         const a = await fetch(`/api/user/getuserbysid?sid=${token.studentId.toString()}`)
         await setData((await a.json()))
         await setIsAdmin(token?.isAdmin === undefined ? false : token.isAdmin)
         await setHasCookie(token === undefined ? false : true )
      }
      setIsDoneLoading(true)
   }

   useEffect(() => {
      a()
   }, [])

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
                     <Registeration name={data.name} surname={data.surname} month={data.oldMonth}/>
                  </Navbar.Content>
                  <Navbar.Content>
                     <UserDropdown name={`${data.name} ${data.surname}`} image={data.image} />
                  </Navbar.Content>
               </Navbar.Content>
          
            }
         </Navbar>
         {children}
      </Box>
   );
};
