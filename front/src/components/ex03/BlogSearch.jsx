import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {Table, Button, InputGroup, Form, Row, Col} from 'react-bootstrap'

const BlogSearch = () => {
    const [loading, setLoading] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [total, setTotal] = useState(0);
    const [end, setEnd] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const search = new URLSearchParams(location.search);
    const page=parseInt(search.get("page"));
    const [query, setQuery]=useState(search.get("query"));
    //console.log(page, query);

    const url=`https://dapi.kakao.com/v2/search/blog?size=5&`;
    const getBlogs= async() => {
        const config ={
            headers: {
                "Authorization":"KakaoAK e65ccac1ecf22adbd36158815d0ac26f"
            }
        }
        setLoading(true);
        const res=await axios(`${url}page=${page}&query=${query}`, config);
        //console.log(res.data);
        setBlogs(res.data.documents);
        setEnd(res.data.meta.is_end);
        setTotal(res.data.meta.pageable_count);
        setLoading(false);
    }

    useEffect(()=>{
        getBlogs();
    },[location]);

    const onSubmit = (e) =>{
        e.preventDefault();
        navigate(`/blog?page=1&query=${query}`);
    }
     
    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>블로그 검색</h1>
            {loading ?
                <div>로딩중...</div>
                :
                <>
                    <Row>
                        <Col md={4}>
                            <form onSubmit={onSubmit}>
                                <InputGroup>
                                    <Form.Control value={query} onChange={(e)=>setQuery(e.target.value)}/>
                                    <Button type="submit">검색</Button>
                                </InputGroup>
                            </form>
                        </Col>
                        <Col>검색수: {total}</Col>
                    </Row>
                    <hr/>
                    <Table striped hover> 
                        <thead>
                            <tr>
                                <th>블로그 이름</th>
                                <th>제목</th>
                            </tr>
                        </thead>
                        <tbody>
                        {blogs.map(blog=>
                            <tr key={blog.url}>
                                <td>{blog.blogname}</td>
                                <td><div dangerouslySetInnerHTML={{__html: blog.title}}></div></td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                <div className='text-center'>
                    <Button onClick={()=>navigate(`/blog?page=${page-1}&query=${query}`)}
                        disabled={page===1}>이전</Button>
                    <span className='mx-2'>{page} / {Math.ceil(total/5)}</span>
                    <Button onClick={()=>navigate(`/blog?page=${page+1}&query=${query}`)} 
                        disabled={end}>다음</Button>
                </div>
            </>
            }
        </div>
    )
}

export default BlogSearch