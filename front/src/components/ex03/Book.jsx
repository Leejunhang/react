import React from 'react'

const Book = ({book}) => {
    const {title, thumbnail, price, authors} = book;
    return (
        <tr>
            <td><img src={thumbnail ? thumbnail:"https://via.placeholder.com/170x200"} width={30}/></td>
            <td>{title}</td>
            <td>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
            <td>{authors}</td>
        </tr>
    )
}

export default Book