import React from 'react'
import { Button,Tooltip } from 'antd';
import Axios from 'axios'
import {DeleteFilled,CloseCircleFilled,InfoCircleFilled,PlusCircleFilled,ExclamationCircleOutlined} from '@ant-design/icons';
function UserCollections(props) {
    let id = props.id
    let block = !props.block
    const onView = () => {
        window.location.href = `/collections/get/${id}`
    }
    const onUpdate = () => {
        window.location.href = `/collections/upload/${id}`
    }
    const onNewAdmin = () => {
        Axios.post(`/api/users/admin_by_id?id=${id}`)
        .then(response => {
            if (response.data.success) {
                props.refresh(response.data.users)
                alert('Now user is admin!')
            } else {
                alert('Failed to make new admin')
            }
        })
    }
    const onBlock = () => {
        Axios.post(`/api/users/block_by_id?id=${id}&block=${block}`)
        .then(response => {
            if (response.data.success) {
                props.refresh(response.data.users)
            } else {
                alert('Failed to block user')
            }
        })
    }
    const onDelete = () => {
        Axios.post(`/api/users/delete_by_id?id=${id}`)
        .then(response => {
            if (response.data.success) {
                props.refresh(response.data.users)
            } else {
                alert('Failed to delete user')
            }
        })
    }
    return (
        <div>
            <Tooltip title="New Admin">
                <ExclamationCircleOutlined  onClick={onNewAdmin} style={{ color: "red",margin: "10px" }}  />
            </Tooltip>
            <Tooltip title="Add collection">
                <PlusCircleFilled  onClick={onUpdate} style={{ color: "blue",margin: "10px" }}  />
            </Tooltip>
            <Tooltip title="User collections">
                 <InfoCircleFilled  onClick={onView} style={{ color: "green",margin: "10px" }}  />
            </Tooltip>
            <Tooltip title="Delete user">
                <DeleteFilled  onClick={onDelete} style={{ color: "red",margin: "10px" }} />
            </Tooltip>
            {props.block?<Tooltip title="Unblock user">
                <CloseCircleFilled onClick={onBlock} style={{ color: "green", margin: "10px" }} />
            </Tooltip>:
            <Tooltip title="Block user">
                <CloseCircleFilled onClick={onBlock} style={{ color: "black", margin: "10px" }} />
            </Tooltip>}
        </div>
    )
}
export default UserCollections

