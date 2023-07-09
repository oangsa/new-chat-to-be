"use client"

import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import Swal from 'sweetalert2'


function Test() {
    const router = useRouter()

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

                router.refresh()

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