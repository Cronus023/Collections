import React from 'react'
import { CommentOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

function Comments(props) {
    const onClick = () =>{
        window.location.href = `/items/comments/${props.id}`
    }
    return (
        <div>
            <Tooltip title = "Comments">
                <CommentOutlined onClick = {onClick} />
            </Tooltip>
        </div>
    )
}
export default Comments

