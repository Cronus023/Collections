import React from 'react'
import { Button } from 'antd';
import Axios from 'axios'
function Change (props){
    const onChange = () =>{
        props.refreshClick()
        Axios.post(`/api/items/updateField?id=${props.itemId}&name=${props.name}&tag=${props.tag}&col=${props.collectionId}`)
        .then(response => {
            if (response.data.success){
                props.refreshItems(response.data.items)
            }
            else {
                alert("Failed to Update Fields")
            }
        })
    }
    return(
        <div>
            <Button shape="round" type="danger" onClick={onChange}>Save</Button>
        </div>
    )
}
export default Change