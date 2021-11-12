import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import { AiFillCalculator } from "react-icons/ai";

function Calculator() {

    const [sum, setSum] = useState(0);
    const [paid, setPaid] = useState(0);
    const [protsent, setProtsent] = useState(0);
    const [month, setMonth] = useState(0);
    const [result, setResult] =useState(0)

    const calc = () => {
        if(protsent >= 0 && month >= 0 && paid >= 0 && sum >= 0 && paid < sum){
            const adding = (month * protsent) / 100;
            const astat = sum - paid;
            const constant = astat * (1 + adding);    
            const calc = constant / month    
            setResult(calc.toFixed(2));
        }else{
            alert('Не были введены правильные числа !!!')
        }
        // setSum(0);
        // setPaid(0);
        // setProtsent(0);
        // setMonth(0);
    }

    const [modal, setModal] = useState(false);

    const toggle = () => {        
        setResult(0)
        setModal(!modal);
    }

    const externalCloseBtn = <button className="close" style={{ position: 'relative', top: '15px', right: '15px' }} onClick={toggle}>&times;</button>;
    return (
        <div className="calculator">
            <Button color="danger" onClick={toggle} className="openModal nav-links">
                <AiFillCalculator className="calc-svg" />
                Калькулятор</Button>
            <Modal isOpen={modal} toggle={toggle} className="modal-bg" external={externalCloseBtn}>
                <ModalHeader className="text-white">Калькулятор</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="calc-1">Стоимость товара</Label>
                        <Input className="text-white" type="number" id="calc-1" onChange={e => setSum(e.target.value)} placeholder="Стоимость товара" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="clac-2">Аванс</Label>
                        <Input className="text-white" type="number" id="clac-2" onChange={e => setPaid(e.target.value)} placeholder="Аванс" />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <Label for="clac-3">Процент</Label>
                        <Input className="text-white" type="number" id="clac-3" onChange={e => setProtsent(e.target.value)} placeholder="Процент" />
                    </FormGroup>
                    <FormGroup className="form-group pt-2">
                        <Label for="calc-4">Месяц</Label>
                        <Input className="text-white" type="number" id="calc-4" onChange={e => setMonth(e.target.value)} placeholder="Месяц" />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <p className="d-flex text-white">
                        <span className="mx-2">Cумма : </span>
                        {result} 
                        <span className="mx-1">сум</span>
                    </p>
                    <div>
                        <Button type="button" onClick={calc}>OK</Button>{' '}
                        <Button onClick={toggle}>Отмена</Button>
                    </div>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default Calculator;
