import React, {ChangeEvent, useEffect, useState} from 'react'
import { Modal, Button, Text, Input, Row, Checkbox, Grid, Container, Col, Card, Spacer } from "@nextui-org/react";
import { IconButton } from '@/app/(admin)/admin/userlist/table.styled';
import { DeleteIcon } from '../icons/table/delete';
import { EditIcon } from '../icons/table/edit';
import Swal from 'sweetalert2';
import axios from 'axios';

interface studentData {
    id: string,
    name: string,
    surname: string,
    studentId: number,
    yearClass: number,
    Class: number,
    reason: string,
    total: number,
    oldMonth: number,
    timestamps: Date,
    username: string,
    password: string,
    image: string,
}

function AddUser() {
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState<studentData>({
        id: "",
        name: "",
        surname: "",
        studentId: 0,
        yearClass: 0,
        Class: 0,
        reason: "",
        total: 0,
        oldMonth: 0,
        timestamps: new Date(),
        username: "",
        password: "",
        image: "",
    });
    const handler = () => setVisible(true);
    
    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setData((prev) => ({...prev, [name]: value}))
        console.log( name, value )
    }

    const closeHandler = () => {
      setVisible(false);
      console.log("closed");
    };

    async function submit() {
        setVisible(false);
        console.log("closed");
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true ,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then(async (result) => {
            if (result.isConfirmed) {
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
                
                if (data.name === "" || data.surname === "" || data.studentId.toString().length < 5 || data.studentId === 0 || data.yearClass === 0 || data.yearClass > 6 || data.Class === 0) return await Toast.fire({ icon: 'error', title: 'Faild!'})
                //62763
                const res = await axios.post(`/api/user/add`, {
                    data: {
                        name: data.name, 
                        surname: data.surname, 
                        yearClass: data.yearClass, 
                        studentId: data.studentId, 
                        Class: data.Class, 
                        username: data.username, 
                        password: data.password,
                        url: data.image
                    }
                })


                if (res.data !== "Success") return await Toast.fire({ icon: 'error', title: 'Faild!'})
                setData({
                    id: "",
                    name: "",
                    surname: "",
                    studentId: 0,
                    yearClass: 0,
                    Class: 0,
                    reason: "",
                    total: 0,
                    oldMonth: 0,
                    timestamps: new Date(),
                    username: "",
                    password: "",
                    image: "",
                })
                return await Toast.fire({ icon: 'success', title: 'Done!' })
            }
          })
    }

    return (
        <div>
            <IconButton>
                <Button onClick={handler}>+ เพิ่ม</Button>
            </IconButton>
            <Modal closeButton aria-labelledby="modal-title" open={visible} onClose={closeHandler} >
                <Modal.Body>
                    <div className="flex justify-between items-center mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            📝 เพิ่มนักเรียน
                        </h3>
                    </div>                
                    <Container gap={0}>
                        <Row gap={0.3}>
                            <Col onInput={inputHandler}>
                                <Input onInput={inputHandler} value={data.name} label='ชื่อ' name="name" fullWidth placeholder="นราวิชญ์" />
                            </Col>
                            <Col>
                                <Input onInput={inputHandler} value={data.surname} label='นามสกุล' name="surname" fullWidth placeholder="ใจรักมั่น" />
                            </Col>
                        </Row>
                        <Spacer y={1}/>
                        <Row gap={0.3}>
                            <Col>
                                <Input onInput={inputHandler} value={data.studentId} label='รหัสประจำตัวนักเรียน' name="studentId" fullWidth placeholder="12345" />
                            </Col>
                            <Col>
                                <Input onInput={inputHandler} value={data.yearClass} label='ชั้นปี' name="yearClass" fullWidth placeholder="1" />
                            </Col>
                        </Row>
                        <Spacer y={1}/>
                        <Row gap={0.3}>
                            <Col>
                                <Input onInput={inputHandler} value={data.Class} label='ห้อง' name="Class" fullWidth placeholder="1" />
                            </Col>
                            <Col>
                                <Input onInput={inputHandler} value={data.image} label='รูปภาพ' name="image" fullWidth placeholder="url" />
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                <Button auto flat color="error" onPress={closeHandler}>
                    ปิด
                </Button>
                <Button auto onPress={submit}>
                    เพิ่มนักเรียน
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddUser