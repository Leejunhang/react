import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Button, Form, Row, Col} from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import '../Pagination.css';

const ReviewPage = ({location}) => {
    const [reviwes, setReviews] = useState([]);
    const [page, setPage] = useState(1);
    const size=5;
    const {bid} = useParams();
    const [total, setTotal] = useState(0);
    const [contents, setContents] =useState("");

    const getReviews = async() => {
        const url=`/review/list.json?page=${page}&size=${size}&bid=${bid}`;
        const res=await axios(url);
        //console.log(res.data);
        let list=res.data.list;
        list=list.map(r=>r && {...r, ellipsis:true});
        setReviews(list);
        setTotal(res.data.total);
    }

    useEffect(()=>{
        getReviews();
    }, [page]);

    const onClickWrite = () => {
        sessionStorage.setItem("target", location.pathname);
        window.location.href="/users/login";
    }

    const onChangePage = (page)=> {
        setPage(page)
    }

    const onChangeEllipsis = (rid) => {
        const list=reviwes.map(r=>r.rid===rid ? {...r, ellipsis:!r.ellipsis} : r);
        setReviews(list);
    }

    const onClickRegister = async() => {
        if(contents==="") {
            alert("리뷰 내용을 입력하세요!");
        }else{
            const res=await axios.post('/review/insert', {
                uid:sessionStorage.getItem("uid"),
                bid,
                contents
            });
            if(res.data === 1) {
                getReviews();
                setContents("");
            }
        }
    }

    const onClickDelete = async(rid) => {
        if(window.confirm(`${rid}번 리뷰를 삭제하시겠습니까?`)){
            const res=await axios.post('/review/delete', {rid});
            if(res.data===1) {
                getReviews();
            }
        }
    }
    return (
        <div className='py-3'>
            {!sessionStorage.getItem("uid") ? 
                <div className='px-5'>
                    <Button className='w-100' onClick={onClickWrite}>리뷰작성</Button>
                </div>
                :
                <div>
                    <Form.Control value={contents} onChange={(e)=>setContents(e.target.value)}
                        as="textarea" rows={5} placeholder='내용을 입력하세요.'/>
                    <div className='text-end mt-2'>
                        <Button className='px-5' onClick={onClickRegister}>등록</Button>
                    </div>    
                </div>    
            }
            {reviwes.map(review=>
                <Row key={review.rid} className='my-3'>
                    <Col xs={2} md={1} className='align-self-center'>
                        <img src={review.photo||"http://via.placeholder.com/100x100"} className='photo' width="80%"/>
                        <div className='uname text-center'>{review.uname}</div>
                    </Col>
                    <Col>
                        <div className='uname'>{review.fmtdate}</div>
                        <div onClick={()=>onChangeEllipsis(review.rid)} style={{cursor:'pointer'}}
                            className={review.ellipsis && 'ellipsis2'}>[{review.rid}] {review.contents}</div>
                        
                        {sessionStorage.getItem("uid") === review.uid &&
                            <div className='text-end'>
                                <Button onClick={()=>onClickDelete(review.rid)} 
                                    variant='danger' size='sm me-2'>삭제</Button>
                                <Button size='sm'>수정</Button>
                            </div>
                        }
                    </Col>
                </Row>    
            )}
            {total > size &&
                <Pagination
                    activePage={page}
                    itemsCountPerPage={size}
                    totalItemsCount={total}
                    pageRangeDisplayed={10}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={onChangePage}/>
            }
        </div>
    )
}

export default ReviewPage