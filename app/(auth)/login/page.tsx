"use client"
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { hasCookie } from "cookies-next"
import loginHandler from '@/libs/loginHandler'
import { Button, Card, Container, FormElement, Input, Row, Spacer, Text } from '@nextui-org/react';


export default function Login() {
  const router = useRouter()
  const [data, setData] = useState({
      username: '',
      password: ''
  })

  useEffect(() => {
      const goShit = () => {
          return process.env.NODE_ENV === 'development' ?  "" : !hasCookie("user-token") ? "" : router.push("/")
      }
      goShit()
  })
  
  const swalSuccess = () => {
      // Swal.fire({
      //     title: 'Authenticated!',
      //     icon: "success",
      // })

      router.refresh()
  }

  const swalError = () => {
      
      // Swal.fire({
      //     title: 'Authenticate Failed!',
      //     icon: "error",
      // })

      router.refresh()
  }

  const submit = async () => {
    await loginHandler(data.username, data.password)
      // Swal.fire({
      //     title: 'Checking',
      //     icon: "warning",
      //     didOpen: async () => {
              
      //         Swal.showLoading()

      //         if (await checkA(data.username, data.password)) return setTimeout(swalSuccess, 500);

      //         return setTimeout(swalError, 500);

      //     },
      // })

  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData((prev) => ({...prev, [name]: value}))
  }

  return (
    <>
      <div>
          <Container display="flex" alignItems="center" justify="center" css={{ minHeight: '100vh' }} >
              <Card css={{ mw: '490px', p: '20px' }} variant="bordered">
                  <Card.Header> 📝 ลงทะเบียนเข้าใช้งานศูนย์เพื่อนใจ TO BE NUMBER ONE R.S </Card.Header>
                  <Card.Divider/>
                  <Card.Body>
                      <Input name="username" onInput={handleChange} value={data.username} underlined fullWidth color="primary" size="lg" placeholder="Email" />
                      <Spacer y={1} />
                      <Input.Password name="password" onInput={handleChange} value={data.password} underlined fullWidth color="primary" size="lg" placeholder="Password" css={{ mb: '6px' }} />
                      <Spacer y={1} />
                      <Button onPress={submit}>เข้าสู่ระบบ</Button>
                  </Card.Body>
              </Card>
          </Container>
      </div>
    </>
  )
}
