import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Spinner, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const MyPage = () => {
    const navi = useNavigate();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({  //여러 명이면 대괄호, 한 사람 여러 정보는 중괄호
        uid:'',
        upass:'',
        uname:'',
        photo:'',
        phone:'',
        address1:'',
        address2:'',
        fmtdate:''
    });
    const {uid, upass, uname, photo, phone, address1, address2, fmtdate} = user;
    const getUser = async() =>{
        setLoading(true);
        const res=await axios.get(`/users/read/${sessionStorage.getItem("uid")}`);
        setUser(res.data);
        setLoading(false);
    }

    useEffect(()=>{
       getUser(); 
    }, []);
    
    if(loading) return <div className='text-center my-5'><Spinner variant='primary'/></div>
    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>마이페이지</h1>
            <Row className='justify-content-center mx-3'>
                <Col md={6}>
                    <Card className='p-5'>
                        <div>
                            {photo || <img src="http://via.placeholder.com/200x200" width="100%" className='photo'/>}
                            <br/>
                            <Button size='sm mt-2' variant='success'>이미지 수정</Button>
                            <hr/>
                        </div>
                        <div>
                            <div>이름: {uname}</div>
                            <div>ID: {uid}</div>
                            <div>전화번호: {phone}</div>
                            <div>주소1: {address1}</div>
                            <div>주소2: {address2}</div>
                            <div>가입일: {fmtdate}</div>
                            <hr/>
                            <Button size="sm" onClick={()=>navi('/users/update')}>정보수정</Button>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default MyPage