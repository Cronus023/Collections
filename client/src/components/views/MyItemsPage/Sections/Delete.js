import React from 'react'
import { Tooltip } from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import Axios from 'axios'
function Likes (props){
    const onDelete = () =>{
       Axios.delete(`/api/items/delete?id=${props.id}&collection=${props.collectionId}&length=${props.length}`)
        .then(response => {
            if (response.data.success) {
                props.refreshfunction(response.data.items)
                alert("Item deleted")
            } else alert('Failed to delete item')
        })
    }
    return(
        <div>
            <Tooltip title="Delete item">
                <DeleteOutlined onClick={onDelete} />
            </Tooltip>
        </div>
    )
}
export default Likes