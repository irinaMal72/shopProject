import React from 'react';
import {Container,Col,Row,Image,Button,Card} from "react-bootstrap";
import  bigStar from "../assets/bigStar.png";

const DevicePage = () => {
    const device = {id:2, name:"12 Pro", price:100000, rating: 0, img:"https://i-mobilestore.ru/wa-data/public/shop/products/97/84/8497/images/38004/38004.970.jpg"}
    const description = [
        {id:1, title:'Оперативная память', description:'5 гб'},
        {id:2, title:'Камера', description:'12 мб'},
        {id:3, title:'Процессор', description:'Пентиум 3'},
    ]
    return (
        <Container>
            <Row>
                <Col md={4}>
                    <Image width={300} height={ 300} src={device.img}/>
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2>{device.name}</h2>
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{background:`url(${bigStar}) no-repeat center center`,width:240,height: 240, backgroundSize: 'cover', fontSize:64}}
                        >
                            {device.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width:300,height:300, fontSize:32, border:"5px solid lightgray"}}
                    >
                        <h3>{device.price} руб.</h3>
                        <Button variant={"outline-dark"}>Добавить в корзину</Button>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Характеристики</h1>
                {description.map((info, index)=>
                    <Row key={info.id} style={{background:index % 2 === 0?
                    "lightgray":"transparent", padding:10}}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default DevicePage;