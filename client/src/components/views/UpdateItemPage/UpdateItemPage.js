import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Input, Button, Typography } from 'antd';
import TypeOfNewItem from '../../utils/TypeOfNewItem'
import Axios from 'axios'
const { Title } = Typography;

const UpdateItemPage = (props) => {
    const itemId = props.match.params.itemId
    var [fields, setfields] = useState([])
    const [Name,setName] = useState("")
    const [Tag,setTag] = useState("")
    const [click,setClick] = useState(false)
    useEffect(() => {
        Axios.get(`/api/items/likes?id=${itemId}`)
            .then(response => {
                if (response.data.success) {
                    setName(response.data.items[0].name)
                    setTag(response.data.items[0].tag)
                    setfields(response.data.items[0].fields)
                } else {
                    alert('Failed to fectch product datas')
                }
            })
    }, [])
    const newFields = (newF) => {
        setfields(newF)
    }
    const newClick=()=>{
        setClick(false)
    }
    const types = []
    const names = []
    const value = []
    const getFields = () => {
        const children = [];
        for (let i = 0; i < fields.length; i++) {
            if (fields[i]) {
                names[i] = fields[i].name
                types[i] = fields[i].type
                value[i] = fields[i].value
            }
            children.push(
                <Col key={i}>
                    <Form.Item
                        name={`field-${i}`}
                        label={names[i]}
                        rules={[
                            {
                                required: true,
                                message: 'Input something!',
                            },
                        ]}
                    >
                        <TypeOfNewItem
                            refreshfunction={newFields}
                            click={click}
                            newClick={newClick}
                            typeOffield={types[i]}
                            nameOfField={names[i]}
                            valueOfField={value[i]}
                            itemId={itemId}
                            i={i}
                        />
                    </Form.Item>
                </Col>
            );
        }
        return children;
    };
    const onChangeName = (e) =>{
        setName(e.currentTarget.value)
    }
    const onChangeTag = (e) =>{
        setTag(e.currentTarget.value)
    }
    const onChange =()=>{
        setClick(true)
        Axios.post(`/api/items/updateField?id=${itemId}&name=${Name}&tag=${Tag}`)
    }
    return (
        <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Update item</Title>
            </div>
            <Form>
            <label>Name</label>
                <Input
                   value={Name}
                   onChange={onChangeName}
                />
                <br />
                <br />
                <label>Tag</label>
                <Input
                   value={Tag}
                   onChange={onChangeTag}
                />
                <br />
                <br />
                <Row gutter={8}>{getFields()}</Row>
            </Form>
            <Button onClick={onChange}>Change</Button>

        </div>
    )
};
export default UpdateItemPage