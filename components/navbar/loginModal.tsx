"use client"
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { hasCookie, setCookie } from "cookies-next"
import loginHandler from '@/libs/loginHandler'
import { Button, Card, Col, Container, FormElement, Input, Loading, Modal, Row, Spacer, Text } from '@nextui-org/react';
import { IconButton } from '@/app/(admin)/admin/userlist/table.styled'
import Swal from 'sweetalert2'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'


export default function LOginModal() {
  const router: AppRouterInstance = useRouter()
  const [data, setData] = useState({
      username: '',
      password: ''
  })

  const [visible, setVisible] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const submit = async () => {

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-right',
        customClass: {
          popup: 'colored-toast'
        },
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
    })
    setIsClicked(true)
    router.refresh()
    if ((await loginHandler(data.username, data.password)) !== "Success") {
      setIsClicked(false)
      router.refresh()
      setVisible(false);
      return Toast.fire({ icon: 'error', title: 'Failed!' })
    }

    setVisible(false);
    setData({
        username: '',
        password: ''
    })

    Toast.fire({ icon: 'success', title: 'Authenticated' })

    return setTimeout(() => window.location.reload(), 3010)

  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData((prev) => ({...prev, [name]: value}))
  }

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };


  const handler = () => setVisible(true);

  return (
    <>
      <div>
        <IconButton>
            <Button color={'secondary'} onClick={handler}>ลงชื่อเข้าใช้</Button>
        </IconButton>
        <Modal closeButton aria-labelledby="login-form" open={visible} onClose={closeHandler} >
            <Modal.Body>
                <div className="flex justify-between items-center mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        📝 ลงทะเบียนเข้าใช้งานศูนย์เพื่อนใจ TO BE NUMBER ONE R.S
                    </h3>
                </div>                
                <Container gap={0}>
                    <Input onInput={handleChange} value={data.username} label='ชื่อผู้ใช้' name="username" fullWidth placeholder="rsxxxxx@rajsima.ac.th" />
                    <Input.Password onInput={handleChange} value={data.password} label='รหัสผ่าน' name="password" fullWidth placeholder="•••••" />
                </Container>
            </Modal.Body>
            <Modal.Footer>
            {
              isClicked === false && 
              <Button auto flat color="error" onPress={closeHandler}>
                ปิด
              </Button>
            }
            {isClicked === true ? 
              <Button auto disabled>
                <Loading type="spinner" color="currentColor" size="sm" />
              </Button> :
              <Button auto onPress={submit}>
                  ลงชื่อเข้าใช้
              </Button>
            }
            </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}