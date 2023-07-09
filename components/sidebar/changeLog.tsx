import { Modal, useModal, Button, Text } from "@nextui-org/react";
import { SidebarItem } from "./sidebar-item";
import {ChangeLogIcon} from '../icons/sidebar/changelog-icon';

export default function ChangeLog() {
    const { setVisible, bindings } = useModal();
    return (
        <div>
            <SidebarItem click={() => setVisible(true)} title="Changelog" icon={<ChangeLogIcon />} />
            <Modal scroll width="600px" aria-labelledby="modal-title" aria-describedby="modal-description" {...bindings} >
                <Modal.Header>
                <Text span id="modal-title" size={18}>
                    เวอร์ชั่น: 2.0.0
                </Text>
                </Modal.Header>
                <Modal.Body>
                    <Text span id="modal-description">
                        ⌛ อัพเดตล่าสุด 9 ก.ค. 2566
                    </Text>
                    <Text span>
                        - Revamp UI
                    </Text>
                    <Text span>
                        - Update Database
                    </Text>
                </Modal.Body>
                <Modal.Footer>
                    <Text span>
                        Developed With ❤️ By: Developer Team
                    </Text>
                </Modal.Footer>
                <Button css={{'mb': '$5', 'ml': '$5', 'mr': '$5'}} auto onPress={() => setVisible(false)}>
                        ปิด
                </Button>
            </Modal>
        </div>
    );
}
