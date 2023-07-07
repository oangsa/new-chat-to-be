"use client"
import { Button, Card, Container, FormElement, Input, Row, Spacer, Text } from '@nextui-org/react';
import { ChangeEvent, useState } from 'react';

export default function NewLogin() {

    const [data, setData] = useState({
        username: '',
        password: ''
    })

    const handleChange = (e: ChangeEvent<FormElement>) => {
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
                            <Button>เข้าสู่ระบบ</Button>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        </>
    )
}