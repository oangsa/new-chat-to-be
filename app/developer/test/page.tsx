"use client"

import { Button } from '@nextui-org/react'
import axios from 'axios'
import React from 'react'
import Swal from 'sweetalert2'


function Test() {

    function clickEvt() {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: false ,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then(async (result) => {
            if (result.isConfirmed) {
                //62763
                const res = await axios.post(`/api/user/edit`, {
                    name: "กันตินันท์", 
                    surname: "ศิริวรรณรัตน", 
                    yearClass: 1, 
                    studentId: 62763, 
                    Class: 1, 
                    username: "rs62763@rajsima.ac.th", 
                    password: 62763, 
                    imageUrl: "", 
                    isUserUpdate: "false",
                    updateUser: 62763,
                })

                Swal.fire(
                    {
                        title: "Done!",
                        icon: "success"
                    }
                )
            }
          })
    }
  
    return (
        <Button onPress={clickEvt}>Add</Button>
  )
}

export default Test