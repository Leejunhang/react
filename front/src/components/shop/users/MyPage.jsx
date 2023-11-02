import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Spinner, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BoxModal from '../BoxModal';
import { BoxContext } from '../BoxContext';
const MyPage = () => {
    const {box, setBox} =  useContext(BoxContext);
    const navi = useNavigate();
    const ref_file = useRef(null);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({  //여러 명이면 대괄호, 한 사람 여러 정보는 중괄호
        uid:'',
        upass:'',
        uname:'',
        phone:'',
        address1:'',
        address2:'',
        fmtdate:'',
        fmtmodi:'',
        file:null
    });
    const {uid, upass, uname, phone, address1, address2, fmtdate, fmtmodi, photo, file} = user;
    const getUser = async() =>{
        setLoading(true);
        const res=await axios.get(`/users/read/${sessionStorage.getItem("uid")}`);
        setUser(res.data);
        setLoading(false);
    }

    const onChangeFile = (e) => {
        setUser({
            ...user,
            photo:URL.createObjectURL(e.target.files[0]),
            file: e.target.files[0]
        })
    }

    const onUpdatePhoto = async() => {
        if(!file) {
            //alert('수정할 사진을  선택해 주세요!');
            setBox({
                show:true,
                message:'수정할 사진을 선택해 주세요!'
            });
        }else{
            /*
            if(window.confirm("번경된 사진을 저장하실래요?")){
                //사진 저장
                const formData=new FormData();
                formData.append('file', file);
                formData.append('uid', uid);
                await axios.post('/users/update/photo', formData);
                alert("사진이 변경되었습니다!")
            }*/
            setBox({
                show:true,
                message:"변경된 사진을 저장 하실래요?",
                action: async()=>{
                    const formData=new FormData();
                    formData.append('file', file);
                    formData.append('uid', uid);
                    await axios.post('/users/update/photo', formData);
                    alert("사진이 변경되었습니다!")
                }
            })
        }
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
                            <img onClick={()=>ref_file.current.click()}
                                 src= {photo||"https://via.placeholder.com/200x200"} width="100%" className='photo'/>
                            <input type='file' ref={ref_file} onChange={onChangeFile} style={{display:'none'}}/>
                            <br/>
                            <Button size='sm mt-2' onClick={onUpdatePhoto}  variant='success'>이미지 수정</Button>
                            <hr/>
                        </div>
                        <div>
                            <div>이름: {uname}</div>
                            <div>ID: {uid}</div>
                            <div>전화번호: {phone}</div>
                            <div>주소1: {address1}</div>
                            <div>주소2: {address2}</div>
                            <div>가입일: {fmtdate}</div>
                            <div>수정일: {fmtdate}</div>
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