import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Form, Col, Row, Alert } from 'reactstrap';
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import http from '../../Services/getData';

function Category() {


    const [modal, setModal] = useState(false);
    const [categories, setCotegories] = useState([]);
    const [name, setName] = useState('')
    const [editName, setEditName] = useState('')
    const [ind, setInd] = useState('')
    const [oldName, setOldName] = useState('')

    


    // ADD CATEGORIES
    const addCategories = async (e) => {
        e.preventDefault()
        const data = { name }
        try {
            const response = await http.post('/category/add', data);
            const allCategories = [...categories, response.data.payload];
            setCotegories(allCategories);
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
        getCategories()
    }

    
    const [classes, setClasses] = useState(['edit-category'])
    const clickId = (id, names) => {
        setInd(id)
        setClasses(prev => [...prev, 'active'])
        setOldName(names)
    }


    // Delete EditInput
    const deleteInput = () => {
        setClasses(['edit-category'])
    }
    

    // Alert Messege ---->
    let [classesAlert, setClassesAlert] = useState('messege-alert-box')
    const showAlert = () => {
        if (classesAlert === 'messege-alert-box') {
            setClassesAlert('messege-alert-box active')
        } else {
            setClassesAlert('messege-alert-box')
        }
    }


    // EDIT CATEGORIES
    const editCategories = async (e) => {
        e.preventDefault()
        try {
            const response = await http.patch(`/category/edit/${ind}`, { name: editName });
            setCotegories(categories.map(post => post.id === ind ? { ...response.data } : post));
            setOldName('');
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
        getCategories()
    }


    // GET CATEGORIES
    const getCategories = () => {
        http.get('/categories')
            .then(res => setCotegories(res.data.payload))
            .catch(err => console.log(err))
    }
    useEffect(() => {
        getCategories()
    }, [])

    // DELETE CATEGORIES
    const deleteCategories = (id) => {

        http.delete(`/category/delete?id=${id}`)
            .then((res) => {
                const categoryList = categories.filter(post => post.id !== id);
                setCotegories(categoryList);
            })
            .catch(err => console.log(err))
    }

    const toggle = () => {
        setModal(!modal);
        deleteInput()
        setOldName('');
        setName('')
        setEditName('')
    }

    const externalCloseBtn = <button className="close" style={{ position: 'relative', top: '15px', right: '15px' }} onClick={toggle}>&times;</button>;
    return (
        <div className="category">
            <div className={classesAlert}>
                <Alert className="messege-alert" color="warning">
                    Подождите!
                </Alert>
            </div>
            <Button color="danger" onClick={toggle} className="openModal nav-links">
                <AiOutlineAppstoreAdd className="calc-svg" />
                Категория
            </Button>
            <Modal isOpen={modal} toggle={toggle} fullscreen="lg" size="lg" className="modal-bg" external={externalCloseBtn}>
                <ModalHeader className="text-white">Категория</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col xs='5'>
                            <Form onSubmit={addCategories}>
                                <FormGroup>
                                    <Label for="add-category">Добавить категорию</Label>
                                    <Input className="text-white" type="search" id="add-category" onChange={e => setName(e.target.value)} placeholder="Стоимость товара" />
                                </FormGroup>
                                <Button type='submit'>
                                    Добавить
                                </Button>
                            </Form>
                        </Col>
                        <Col className="category-box" xs='7'>
                            <Label>Категории</Label>
                            <ul className="category-ul">
                                {
                                    categories.map((category, i) => {
                                        return <li className="d-flex justify-content-between align-items-center" key={i}>
                                            <span>{category.name}</span>
                                            <div>
                                                <Button size='sm' onClick={() => clickId(category.id, category.name)} className="bg-success mr-2">Редактировать</Button>
                                                <Button size='sm' onClick={() => deleteCategories(category.id)} className="bg-danger">Удалить</Button>
                                            </div>
                                        </li>
                                    })
                                }
                            </ul>
                        </Col>
                        <Col className={classes.join(' ')} xs='5'>
                            <div className="d-flex align-items-center">
                                <Form onSubmit={editCategories}>
                                    <FormGroup>
                                        <Label for="edit-category">Редактировать продукт</Label>
                                        <Input className="text-white" type="search" id="edit-category" onChange={e => setEditName(e.target.value)} placeholder={oldName} />
                                    </FormGroup>
                                    <Button type='submit'>
                                        Добавить
                                    </Button>
                                </Form>
                                <Button size="sm" className="bg-danger btn btn-danger h-25 mb-4 ml-2" onClick={deleteInput}>X</Button>
                            </div>
                            
                        </Col>
                        <Col>
                        
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <div className="d-flex w-100 justify-content-end">
                        <Button onClick={toggle}>Отмена</Button>
                    </div>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default Category;
