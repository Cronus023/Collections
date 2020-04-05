import React, { useEffect, useState } from 'react'
import { Button, Descriptions, Input,Menu } from 'antd';
import Axios from 'axios'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function ProductInfo(props) {
    const TypesOfFields = [
        { key: 1, value: "Input" },
        { key: 2, value: "TextArea" },
        { key: 3, value: "Check-box" },
        { key: 4, value: "Date" },
        { key: 5, value: "Number" },
    ]
    const [Collection, setCollection] = useState({})
    const [Fields, setFieldsValue] = useState(1)
    const [NameFields, setNameFieldsValue] = useState("")
    const [Click, setClick] = useState(false)
    const onTypeFieldsChange = (event) => {
        setFieldsValue(event.currentTarget.value)
    }
    const onNameFieldsChange = (event) => {
        setNameFieldsValue(event.currentTarget.value)
    }
    useEffect(() => {
        setCollection(props.detail)
    }, [props.detail])
    const deleteCollection = () => {
        Axios.delete(`/api/collections/collection_by_id?id=${Collection._id}&type=single`)
            .then(response => {
                if (response.data.success) {
                    alert('Collection Successfully Deleted')
                } else {
                    alert('Failed to delete collection')
                }
            })
    }
    const onAdd = (event) => {
        if(!NameFields) return alert("Choose the name of your field!")
        event.preventDefault();
        const Newfield ={
            user:Collection.writer._id,
            col: Collection._id,
            name: NameFields,
            type: Fields,
            value: ""
        }
        Axios.post(`/api/collections/collection_by_id?id=${Collection._id}`, Newfield)
            .then(response => {
                if (response.data.success) {
                    alert('Field add')
                }
                else {
                    alert(response.data.message || response.data.err )
                }
            })
        setClick(false)
    }
    const onSetClick = () => setClick(!Click)
    return (
        <div>
            <Descriptions column={2} >
                <Descriptions.Item label="Topic">{Collection.topic}</Descriptions.Item>
                <Descriptions.Item label="items"> {Collection.items}</Descriptions.Item>
                <Descriptions.Item label="Description"> {Collection.description}</Descriptions.Item>
            </Descriptions>
            <br /><br /><br /><br />
            <div>
            <Menu mode="horizontal">
                <SubMenu title={<span>Actions on a collection</span>}>
                    <MenuItemGroup>
                        <Menu.Item><a onClick={deleteCollection} href = "/">Delete Collection</a></Menu.Item>
                        <Menu.Item><a href ={`/collections/change/${Collection._id}`}>Update Collection</a></Menu.Item>
                        <Menu.Item><a href = {`/collections/newItem/${Collection._id}`}>Add Item</a></Menu.Item>
                        <Menu.Item><a href = {`/collections/myItems/${Collection._id}`}>View items of collection</a></Menu.Item>
                    </MenuItemGroup>
                </SubMenu>
                <Menu.Item key="add"><a onClick={onSetClick}>Add field to your item</a></Menu.Item>
            </Menu>
                {Click?(
                <div>
                <label>Type of the field:</label><br />
                <select onChange={onTypeFieldsChange}>
                    {TypesOfFields.map(item => (
                        <option key={item.key} value={item.key}>{item.value} </option>
                    ))}
                </select>
                <br />
                <label>Name of the field:</label>
                <Input length="20px"
                    onChange={onNameFieldsChange}
                    value={NameFields}
                />
                <br /><br />
                <Button onClick={onAdd}>Add field</Button>
                </div>
                ):<h3></h3>}
            </div>
        </div>
    )
}

export default ProductInfo