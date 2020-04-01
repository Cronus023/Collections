import React, { useEffect, useState } from 'react'
import { Tooltip, Icon } from 'antd';
import Axios from 'axios';

function Likes(props) {
    const [Likes, setLikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    
    useEffect(() => {
        Axios.post(`/api/likes/getlikes?id=${props.id}`)
            .then(response => {
                if (response.data.success) {
                    setLikes(response.data.likes.length) 
                    if(response.data.userId){     
                    response.data.likes.map(like => {
                        if (like.userOfLike === response.data.userId) {
                            setLikeAction('liked')
                        }
                    })
                    }
                } else {
                    alert('Failed to get likes')
                }
            })
    }, [])

    const onLike = () => {
        if (LikeAction === null) {
            Axios.post(`/api/likes/upLike?id=${props.id}`)
                .then(response => {
                    if (response.data.success) {
                        setLikes(Likes + 1)
                        setLikeAction('liked')
                    } else {
                        alert('Failed to increase the like')
                    }
                })
        } else {
            Axios.post(`/api/likes/unLike?id=${props.id}`)
                .then(response => {
                    if (response.data.success) {
                        setLikes(Likes - 1)
                        setLikeAction(null)
                    } else {
                        alert('Failed to decrease the like')
                    }
                })

        }
    }
    return (
        <React.Fragment>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like"
                        theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
                        onClick={onLike} />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Likes}</span>
            </span>&nbsp;&nbsp;
        </React.Fragment>
    )
}

export default Likes