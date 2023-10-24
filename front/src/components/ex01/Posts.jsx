import React, { useState,useEffect } from 'react'
import { Table, Spinner, Button } from 'react-bootstrap'

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const getPosts = () => {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(json => {
            const start=(page-1)*10 + 1;
            const end=(page*10);  

            const newJson=json.filter(j=>j.id>=start && j.id<=end);
            setPosts(newJson);
            console.log(newJson);
            setLoading(false);
        });
    }

    useEffect(()=>{
        getPosts();
    },[page]);

    if(loading) return (
        <div className='text-center my-5'>
            <Spinner varient="primary"/>
            <h5>로딩중 입니다....</h5>
        </div>
    );

    return (
        <div>
            <h1 className='text-center my-5'>Posts</h1>
            <Table bordered striped hover>
                <thead>
                    <tr>
                       <td>ID</td>
                       <td>Title</td> 
                    </tr>
                </thead>
                <tbody>
                    {posts.map(posts=>
                        <tr key={posts.id}>
                            <td>{posts.id}</td>
                            <td>{posts.title}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <div className="text-center">
                <Button onClick={()=>setPage(page-1)} disabled={page===1}>이전</Button>
                <span className='mx-3'>{page}/20</span>
                <Button onClick={()=>setPage(page+1)} disabled={page===20}>다음</Button>
            </div>
        </div>
    )
}

export default Posts