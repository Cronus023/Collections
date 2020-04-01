import React, { useState,useEffect } from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import FileUpload from '../../utils/FileUpload'
import Axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

function UpdateCollectionPage(props) {
    const TypesOfTopic = [
        { key: 1, value: "Family" },
        { key: 2, value: "Sport" },
        { key: 3, value: "Books" },
        { key: 4, value: "Alcohol" },
    ]
    const collectionId = props.match.params.collectionId
    const [Name, setName] = useState("")
    const [Description, setDescription] = useState("")
    const [Topic, setTopic] = useState("")
    const [Images, setImages] = useState("")
    useEffect(() => {
        Axios.get(`/api/collections/collection_by_id?id=${collectionId}&type=single`)
            .then(response => {
              setName(response.data.collection[0].name)
              setTopic(response.data.collection[0].topic)
              setDescription(response.data.collection[0].description)
              setImages(response.data.collection[0].images)
            })
    }, [])
    const onNameChange = (event) => {
        setName(event.currentTarget.value)
    }
    const onTopicChange = (event) => {
        setTopic(event.currentTarget.value)
    }
    const onDescriptionChange = (event) => {
        setDescription(event.currentTarget.value)
    }
    const updateImages = (newImages) => {
        setImages(newImages)
    }
    const updateCollection = (event) => {
        event.preventDefault();
        const variables = {
            name: Name,
            description: Description,
            topic:Topic,
            images: Images,
        }
        if (!Name || !Description  || !Images || !Topic) {
            return alert('fill all the fields first!')
        }
        Axios.put(`/api/collections/collection_by_id?id=${collectionId }&type=single`,variables)
            .then(response => {
                if (response.data.success) {
                    window.location.href = `/collections/${collectionId }`
                    alert('Collection Successfully Updated')
                } else {
                    alert('Failed to update collection')
                }
        }) 
    }
    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Update collection</Title>
            </div>
            <Form onSubmit={updateCollection} >
                <FileUpload refreshFunction={updateImages} images={Images} />
                <br /><br /> 
                <label>Name</label>
                <Input
                    onChange={onNameChange}
                    value={Name}
                />
                <br /><br />
                <label>Topic</label>
                <br /><br />
                <select onChange={onTopicChange}>
                    {TypesOfTopic.map(item => (
                        <option key={item.key} value={item.value}>{item.value} </option>
                    ))}
                </select>
                <br /><br />
                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={Description}
                />
                <br /><br />
                <Button onClick={updateCollection}>Update</Button>
            </Form>
        </div>
    )
}
export default UpdateCollectionPage
