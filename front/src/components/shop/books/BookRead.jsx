import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const BookRead = () => {
    const {bid} = useParams();
    console.log('.........', bid);

    const getBooks = async() => {
        const res=await axios.get('/books/read/' + bid);
        console.log(res.data);
    }
    
    useEffect(()=>{
        getBooks();
    },[]);
    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>도서 정보</h1>
        </div>
    )
}

export default BookRead