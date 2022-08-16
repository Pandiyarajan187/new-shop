import React from 'react'
const ShowImage = ({ item, url }) => {
    return (
        <img 
            src={`http://localhost:8000/api/${url}/photo/${item._id}`}
            alt={item._id}
            style={{ height: '250px' }}
        />
    )
}

export default ShowImage
