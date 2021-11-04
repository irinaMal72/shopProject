import React from 'react';
import {Col,Card,Image} from "react-bootstrap";
import star from '../assets/star.png'
import {useHistory} from "react-router-dom"
import {DEVICE_ROUTE} from "../utils/consts";

const DeviceItem = ({device}) => {
    const  history = useHistory() //динамическиц переход по страницам
    return (
        <Col md={3} className="mt-3" onClick={()=>history.push(DEVICE_ROUTE + "/" + device.id)}>
            <Card style={{width:150, cursor:'pointer'}} border={"light"}>
                <Image width={150} height={150} src={device.img} alt={"Изображение товара"}/>
                <div className="mt-1 d-flex justify-content-between align-content-between">
                    <div>Samsung...</div>
                    <div className="d-flex align-items-center">
                        <div>{device.rating}</div>
                        <Image src={star} width={15} height={15}/>
                    </div>
                </div>
                <div>{device.name}</div>
            </Card>
        </Col>
    );
};

export default DeviceItem;