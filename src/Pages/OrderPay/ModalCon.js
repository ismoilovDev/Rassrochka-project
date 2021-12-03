import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';

function ModalCon({modal, toggle, orderAllPay, allSum}) {

    const externalCloseBtn = <button className="close" style={{ position: 'relative', top: '15px', right: '15px' }} onClick={toggle}>&times;</button>;
    return (
        <div className="all-pay">
            <Button color="danger" onClick={toggle} className="all-pay-btn">
                Заплатить все
            </Button>
            <Modal isOpen={modal} toggle={toggle} className="modal-bg" external={externalCloseBtn}>
                <ModalHeader className="text-white">подтвердить оплату</ModalHeader>
                <ModalBody>
                    <div className="d-flex justify-content-center text-center">
                        <p className="text-white h6">
                            Погасит вес имеющийся долг. <br/>
                            Pасчетная сумма <b><strong>{allSum !== undefined ? allSum.toFixed(1) : ""}</strong></b> сумов
                        </p>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <div className=" w-100 d-flex justify-content-between">
                        <Button onClick={() => {
                            orderAllPay(allSum)
                        }} type="button">OK</Button>{' '}
                        <Button onClick={toggle}>Отмена</Button>
                    </div>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default ModalCon;
