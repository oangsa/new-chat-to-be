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

                const res = await fetch("/api/usetage/getusetagebyyear")

                console.log(res)

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