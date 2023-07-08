import React, {ChangeEvent, useEffect, useState} from 'react'
import { Modal, Button, Text, Input, Row, Checkbox, Grid, Container, Col, Card, Spacer } from "@nextui-org/react";
import { IconButton } from '@/app/(admin)/admin/userlist/table.styled';
import { DeleteIcon } from '../icons/table/delete';
import { EditIcon } from '../icons/table/edit';
import Swal from 'sweetalert2';
import axios from 'axios';

interface props {
    studentId: number
}

interface leaveModal {
    name: string,
    surname: string,
    month: number
}

interface leaveFrom {
    other: string
}

function Registeration({name, surname, month}:leaveModal) {
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState<leaveFrom>({
        other: ""
    })
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
                
                if (data.other === "") return await Toast.fire({ icon: 'error', title: 'Faild!'})
                //62763


                // if (res.data !== "Success") return await Toast.fire({ icon: 'error', title: 'Faild!'})
                setData({
                    other: ""
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
                                <Input disabled value={name} label='ชื่อ' name="name" fullWidth placeholder="นราวิชญ์" />
                            </Col>
                            <Col>
                                <Input disabled value={surname} label='นามสกุล' name="surname" fullWidth placeholder="ใจรักมั่น" />
                            </Col>
                        </Row>
                        <Spacer y={1}/>
                        <Row gap={0.3}>
                            <Col>
                                <Input onInput={inputHandler} value={name} label='รหัสประจำตัวนักเรียน' name="studentId" fullWidth placeholder="12345" />
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                <Button auto flat color="error" onPress={closeHandler}>
                    ปิด
                </Button>
                <Button auto onPress={submit}>
                    ยืนยัน
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Registeration