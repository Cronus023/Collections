import React, { useState, useEffect } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import FileUpload from '../../utils/FileUpload'
import Axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

function UploadPage(props) {
    let id = props.match.params.userId
    let userId = null 
    let admin = false
    if(props.user.userData){
        userId = props.user.userData._id
        admin = props.user.userData.isAdmin
        if(id!=userId && !admin){
            alert ("You can't visit this page!")
            window.location.href="/"
        }
    }
    
    const TypesOfTopic = [
        { key: 1, value: "Family" },
        { key: 2, value: "Sport" },
        { key: 3, value: "Books" },
        { key: 4, value: "Alcohol" },
    ]
    const [TitleValue, setTitleValue] = useState("Family")
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [NameValue, setNameValue] = useState("")

    const [Url, setImages] = useState([])
   
    const onNameChange = (event) => {
        setNameValue(event.currentTarget.value)
    }

    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }

    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value)
    }

    const updateUrl = (newImages) => {
        setImages(newImages)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        const variables = {
            writer: id,
            name: NameValue,
            description: DescriptionValue,
            topic: TitleValue,
            images: Url,
        }
        if (!TitleValue || !DescriptionValue || !Url || !NameValue) {
            return alert('fill all the fields first!')
        }
        Axios.post(`/api/collections/uploadCollection`, variables)
            .then(response => {
                if (response.data.success) {
                    alert('Collection Successfully Created')
                    props.history.push('/')
                }
                 else {
                    alert('Failed to upload collection')
                }
            })
    }
    return (
        <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Create new collection</Title>
            </div>
            <Form id="form" onSubmit={onSubmit} >
                <FileUpload refreshFunction={updateUrl} />
                <br /><br />
                <label>Name</label>
                <Input
                    onChange={onNameChange}
                    value={NameValue}
                />
                <br /><br />
                <label>Topic</label>
                <br /><br />
                <select onChange={onTitleChange}>
                    {TypesOfTopic.map(item => (
                        <option key={item.key} value={item.value}>{item.value} </option>
                    ))}
                </select>
                <br /><br />
                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={DescriptionValue}
                />
                <br /><br />
                <Button onClick={onSubmit}>Submit</Button>
            </Form>
        </div>
    )
}

export default UploadPage

