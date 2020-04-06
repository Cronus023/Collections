import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Input, Button, Typography } from 'antd';
import TypeOfNewItem from '../../utils/TypeOfNewItem'
import Axios from 'axios'
import moment from 'moment';
const { Title } = Typography;

const NewItemPage = (props) => {
    console.log(props)
    const collectionId = props.match.params.collectionId
    var [fields, setfields] = useState([])
    const [Name,setName] =useState("")
    const [Tag,setTag] =useState("")
    const [Writer,setWriter] = useState("")
    const [Items,setItems]=useState(0)
    useEffect(() => {
        Axios.get(`/api/collections/fields_by_id?id=${collectionId}`)
            .then(response => {
                if (response.data.success) {
                    setfields(response.data.fields)
                } else {
                    alert('Failed to fectch product datas')
                }
            })
        Axios.get(`/api/collections/collection_by_id?id=${collectionId}`)
            .then(response => {
                setWriter(response.data.writer)
                setItems(response.data.collection[0].items)
            })
    }, [])

    const newFields = (newF) => {
        setfields(newF)
    }
    const types = []
    const names1 = []
    const getFields = () => {
        const children = [];
        for (let i = 0; i < fields.length; i++) {
            if (fields[i] != undefined) {
                names1[i] = fields[i].name
                types[i] = fields[i].type
            }
            children.push(
                <Col key={i}>
                    <Form.Item
                        name={`field-${i}`}
                        label={names1[i]}
                        rules={[
                            {
                                required: true,
                                message: 'Input something!',
                            },
                        ]}
                    >
                        <TypeOfNewItem
                            refreshfunction={newFields}
                            typeOffield={types[i]}
                            nameOfField={names1[i]}
                            collectionId={collectionId}
                        />
                    </Form.Item>
                </Col>
            );
        }
        return children;
    };
    const onName = (event)=>{
        setName(event.currentTarget.value)
    }
    const onTag = (event)=>{
        setTag(event.currentTarget.value)
    }
    const onAdd = () => {
        Axios.get(`/api/collections/fields_by_id?id=${collectionId}`)
            .then(response => {
                if (response.data.success) {
                    fields = response.data.fields
                } else {
                    alert('Failed')
                }
            })
        if(!Name || !Tag) return alert("Fill Name and Tag!")
        const newItem ={
            name:Name,
            tag:Tag,
            collect:collectionId,
            fields:fields,
            comments:"",
            user:Writer._id,
            date:moment()
        }
        Axios.post(`/api/items/items?items=${Items}`, newItem)
            .then(response => {
                if (response.data.success) {
                   window.location.href="/"
                } else {
                    alert('Failed')
                }
            })
    }
    return (
        <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Add item</Title>
            </div>
            <Form>
                <label>Name</label>
                <Input 
                    onChange={onName}
                    value={Name}
                />
                <br /><br />
                <label>Tag</label>
                <Input 
                     onChange={onTag}
                     value={Tag}
                />
                <br /><br />
                <h2>Additional fields(fill is not necessary!) :</h2>
                <Row gutter={8}>{getFields()}</Row>
            </Form>
            <Button onClick={onAdd}>Add Item</Button>
        </div>
    )
};
export default NewItemPage