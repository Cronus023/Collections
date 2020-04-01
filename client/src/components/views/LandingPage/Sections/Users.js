import React, { useEffect, useState } from 'react'
import { Col, Comment, Avatar,Tooltip,Row,Table } from 'antd'
import Axios from "axios"

import UserCollections from './UserSections/UserCollections'
import './CssUtils/Collections.css'
function Users() {
    const [Users, setUsers] = useState([])
    useEffect(() => {
        Axios.post("/api/users/getUsers")
            .then(response => {
                if (response.data.success) {
                    setUsers(response.data.users)
                } else {
                    alert('Failed to fectch product datas')
                }
            })
    }, [])
    const refresh = (u) =>{
        setUsers(u)
    }
    const renderUsers = Users.map((user, index) => {
        if(user.role!=1){
            return <Col lg={6} md={8} xs={24}>
                <Comment
                    author={user.name}
                    avatar={
                        <Avatar
                            src={user.image} alt={user.name}
                        />
                    }
                    content={
                        <p> 
                            <UserCollections refresh={refresh} block={user.isBlocked} id={user._id}/>
                        </p>
                    }
                    datetime={
                        <Tooltip title="Status">
                            {user.isBlocked?<label style={{color:"blue"}}>Blocked</label>:<label style={{color:"blue"}}>Free</label>}
                        </Tooltip>
                    }
                />
            </Col>
        }
    })
    return (
        <div className="users">
            <div style={{ height: '500px' }}>  
                <Row gutter={[16, 16]}>
                    {renderUsers}
                </Row>   
            </div>
        </div>
    )
}
export default Users