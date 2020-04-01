import React from 'react'
import moment from 'moment';
import { Comment, Tooltip, Avatar } from 'antd';

function CommentsCard (props){
    let moment1 =  moment(props.time)
    return(
        <div style={{ width: '100%' }}>
        <Comment
            author={props.sender.name}
            avatar={
                <Avatar
                    src={props.sender.image} alt={props.sender.name}
                />
            }
            content={
                    <p>
                        {props.message}
                    </p>
            }
            datetime={
                <Tooltip title={moment1.format('DD-MM-YYYY HH:mm:ss')}>
                    <span>{moment1.fromNow()}</span>
                </Tooltip>
            }
        />
    </div>
    )
}
export default CommentsCard