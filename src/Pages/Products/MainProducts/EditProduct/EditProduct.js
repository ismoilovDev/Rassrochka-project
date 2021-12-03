import React, { useEffect, useState } from 'react';
import logo from '../../../../assets/images/logo-icon.png';
import http from '../../../../Services/getData';
import { AiFillFolderAdd } from "react-icons/ai";
import { FaEdit } from 'react-icons/fa';
import { Col, Card, CardBody, CardTitle, Form, Row, Label, InputGroup, Input, Button, Alert, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useHistory } from 'react-router-dom';


const EditProduct = ({ index }) => {

   const [modal, setModal] = useState(false);
   const [product, setProduct] = useState([]);
   const history = useHistory();
   // Single Product
   useEffect(() => {
      const fetchPosts = async () => {
         try {
            const response = await http.get(`/product/single?id=${index}`);
            setProduct(response.data.payload);
         } catch (err) {
            if (err.response) {
               console.log(err.response.data);
            } else {
               console.log(`Error: ${err.message}`);
            }
         }
      }
      fetchPosts();
   }, // eslint-disable-next-line
      [])
   const [option, setOption] = useState([]);
   const [img, setImg] = useState(product.product_img);
   const [name, setName] = useState("");
   const [ind, setInd] = useState("");

   // Get Option
   const getOption = () => {
      http.get('/categories')
         .then((res) => {
            setOption(res.data.payload)
         })
         .catch(err => console.log(err))
   }

   // Alert Messege ---->
   let [classes, setClasses] = useState('messege-alert-box')
   const showAlert = () => {
      if (classes === 'messege-alert-box') {
         setClasses('messege-alert-box active')
      } else {
         setClasses('messege-alert-box')
      }
   }

   // Delete Massege
   const deleteAlert = () => {
      setClasses('messege-alert-box')
   }
   // Edit Product
   const editProduct = async (e) => {
      e.preventDefault();
      if (
         img &&
         name &&
         ind
      ) {
         let formdata = new FormData();
         formdata.append('product_img', img, img.name);
         formdata.append('name', name);
         formdata.append('category_id', ind);
         await http.post(`/product/edit/${index}`, formdata)
            .then((res) => {
               setName('');
               history.push('/products');
               window.location.reload(false)
            })
            .catch((err) => console.log(err))
      } else {
         showAlert()
         setTimeout(() => {
            deleteAlert()
         }, 4000)

      }
   }


   useEffect(() => {
      getOption()
      // eslint-disable-next-line
   }, [])

   const toggle = () => {
      setModal(!modal);
   }

   const externalCloseBtn = <button className="close" style={{ position: 'relative', top: '15px', right: '15px' }} onClick={toggle}>&times;</button>;
   return (
      <>
         <div>
            <div className={classes}>
               <Alert className="messege-alert" color="warning">
                  Пожалуйста, заполните форму полностью
               </Alert>
            </div>
            <Button color="danger" onClick={toggle} className="openModal nav-links">
               <FaEdit className="calc-svg" />
               Редактировать
            </Button>
            <Modal isOpen={modal} toggle={toggle} fullscreen="lg" size="lg" className="modal-bg" external={externalCloseBtn}>
               <ModalHeader className="text-white">Редактировать продукт</ModalHeader>
               <ModalBody className="p-0">
                     <Card className="x-100">
                        <CardBody className="py-2 px-4 register-title">
                           <CardTitle className="d-flex align-items-center justify-content-between text-white">
                              <div>
                                 <FaEdit />
                                 <h5>Редактировать продукт</h5>
                              </div>
                              <div className="nav-logo nav-logo-1">
                                 <a href="/">
                                    <img src={logo} alt="logo">
                                    </img>
                                    <h4>Рассрочка</h4>
                                 </a>
                              </div>
                           </CardTitle>
                           <div className="hr"></div>
                           <Form className="pb-5" onSubmit={editProduct}>
                              <Row>
                                 <Col xs="6" className="mb-2 old-img-box">
                                    <p className="text-white">Текущая фотография</p>
                                    <img className="rounded" height="150px" src={product.product_img} alt="product" />
                                 </Col>
                                 <Col xs="6">
                                    <Label className="mb-3 text-white" for="product_img">Выбрать новое изображение</Label>
                                    <InputGroup size="md">
                                       <Input className="text-white" onChange={(e) => setImg(e.target.files[0])} type="file" id="product_img" placeholder="product img" />
                                    </InputGroup>
                                    <br />
                                 </Col>

                                 <Col xs="6" className="mt-5">
                                    <Label className="mb-2 text-white" for="category_id">Выбрать категорию !</Label><br />
                                    <select className="bg-dark w-100" id="category_id" onChange={(e) => setInd(e.target.value)} >
                                       <option value={product.id}></option>
                                       {
                                          option.map((item) => {
                                             return (
                                                <option key={item.id} value={String(item.id)}>{String(item.name)}</option>
                                             )
                                          })
                                       }
                                    </select>
                                    <br />
                                 </Col>

                                 <Col xs="6" className="mt-5">
                                    <Label className="mb-2 text-white" for="product_name">Наименование товара</Label>
                                    <InputGroup size="md">
                                       <Input className="text-white" onChange={(e) => setName(e.target.value)} type="text" id="product_name" placeholder={product.product_name} />
                                    </InputGroup>
                                    <br />
                                 </Col>

                                 <Col xs="12" className="mt-4 d-flex justify-content-end">
                                    <Button type="submit" className="align-items-center px-4" size="xs">
                                       <AiFillFolderAdd />Редактировать
                                    </Button>
                                    <Button className="bg-danger btn btn-danger ml-3"  onClick={toggle}>Отмена</Button>
                                 </Col>
                              </Row>
                           </Form>
                        </CardBody>
                     </Card>
               </ModalBody>
            </Modal>
         </div>
         {/* {index !== null ? (
            <div className="main py-4">
               <div className={classes}>
                  <Alert className="messege-alert" color="warning">
                     Пожалуйста, заполните форму полностью
                  </Alert>
               </div>
               <Col xl="7" className="mx-auto">
                  <Card>
                     <CardBody className="p-5 register-title">
                        <CardTitle className="d-flex align-items-center justify-content-between text-white">
                           <div>
                              <FaUserPlus />
                              <h5>Редактировать продукт</h5>
                           </div>
                           <div className="nav-logo nav-logo-1">
                              <a href="/">
                                 <img src={logo} alt="logo">
                                 </img>
                                 <h4>Рассрочка</h4>
                              </a>
                           </div>
                        </CardTitle>
                        <div className="hr"></div>
                        <Form className="pb-5" onSubmit={editProduct}>
                           <Row>
                              <Col xs="6" className="mb-2 old-img-box">
                                 <p className="text-white">Текущая фотография</p>
                                 <img className="rounded" height="150px" src={product.product_img} alt="product" />
                              </Col>
                              <Col xs="6">
                                 <Label className="mb-3 text-white" for="product_img">Выбрать новое изображение</Label>
                                 <InputGroup size="md">
                                    <Input className="text-white" onChange={(e) => setImg(e.target.files[0])} type="file" id="product_img" placeholder="product img" />
                                 </InputGroup>
                                 <br />
                              </Col>

                              <Col xs="6" className="mt-5">
                                 <Label className="mb-2 text-white" for="category_id">Выбрать категорию !</Label><br />
                                 <select className="bg-dark w-100" id="category_id" onChange={(e) => setInd(e.target.value)} >
                                    <option value={product.id}></option>
                                    {
                                       option.map((item) => {
                                          return (
                                             <option key={item.id} value={String(item.id)}>{String(item.name)}</option>
                                          )
                                       })
                                    }
                                 </select>
                                 <br />
                              </Col>

                              <Col xs="6" className="mt-5">
                                 <Label className="mb-2 text-white" for="product_name">Наименование товара</Label>
                                 <InputGroup size="md">
                                    <Input className="text-white" onChange={(e) => setName(e.target.value)} type="text" id="product_name" placeholder={product.product_name} />
                                 </InputGroup>
                                 <br />
                              </Col>


                              <Col xs="12" className="mt-4 d-flex justify-content-end">
                                 <Button type="submit" className=" align-items-center px-4" size="xs">
                                    <AiFillFolderAdd />Редактировать
                                 </Button>
                              </Col>
                           </Row>
                        </Form>
                     </CardBody>
                  </Card>
               </Col>
            </div>
         ) : (
            toProducts()
         )
         } */}
      </>
   )
}

export default EditProduct;
