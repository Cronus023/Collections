import React, { useEffect, useState } from 'react'
import { Row, Col, Icon, Descriptions, Card } from 'antd';
import Axios from 'axios'
import ImageGallery from 'react-image-gallery';
import FieldsOfItem from '../../utils/FieldsOfItem';
import moment from 'moment';
import Likes from '../../utils/Likes'
import Comments from '../../utils/Comments';

const { Meta } = Card;
function Detail(props) {
    const [Collection, setCollection] = useState([])
    const [Items, setItems] = useState([])
    const [Images, setImages] = useState([])
    const collectionId = props.match.params.collectionId
    useEffect(() => {
        Axios.get(`/api/collections/collection_by_id?id=${collectionId}`)
            .then(response => {
                if (response.data.success) {
                    setCollection(response.data.collection)
                    let images = response.data.collection[0].images
                    if (images && images.length > 0) {
                        let newimages = [];
                        images && images.map(url => {
                            newimages.push({
                                original: url,
                                thumbnail: url
                            })
                        })
                        setImages(newimages)
                    }
                }
                else {
                    alert('Failed to get collection')
                }
            })
        Axios.post(`/api/items/item_by_collectionId?collectionId=${collectionId}`)
            .then(response => {
                if (response.data.success) {
                    setItems(response.data.item)
                } else {
                    alert('Failed to fectch item datas')
                }
            })
    }, [])
    const renderCards = Items.map((item, index) => {
        let moment1 = moment(item.createdAt)
        while (index < 10) {
            return <Col lg={24} md={8} xs={24}>
                <Card
                    onClick={console.log("Lol")}
                    actions={[
                        <Likes id={item._id} />,
                        <Comments id={item._id} />
                    ]}
                    size="small"
                    hoverable={true}
                    cover={<a href={`/items/comments/${item._id}`} ></a>}>
                    <Meta title={item.name} description={moment1.format('DD-MM-YYYY HH:mm:ss')} />
                    <FieldsOfItem id={item._id} fields={item.fields} />
                </Card>
            </Col>
        }
    })
    return (
        <div>
            <div style={{ textAlign: 'center' }}>
                <h2>  Collection Info  <Icon type="smile" />  </h2>
                <br />
            </div>
            {Collection.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>Wait...</h2>
                </div> :
                <div>
                    <Row gutter={[16, 16]} >
                        <Col lg={9} xs={24}>
                            <ImageGallery items={Images} />
                        </Col>
                        <Col lg={9} xs={24}>
                            <Descriptions column={2} >
                                <Descriptions.Item label="Name">{Collection[0].name}</Descriptions.Item>
                                <Descriptions.Item label="Topic">{Collection[0].topic}</Descriptions.Item>
                                <Descriptions.Item label="Description"> {Collection[0].description}</Descriptions.Item>
                            </Descriptions>
                            <br />
                            <div style={{ maxWidth: '800px', margin: '2rem auto', textAlign: 'center' }}>
                                <h2>Owner:</h2>
                                <label>{Collection[0].writer.name}</label><br />
                                <img src={Collection[0].writer.image} />
                            </div>
                        </Col>
                    </Row>
                </div>
            }
            <div style={{ maxWidth: '800px', margin: '2rem auto', textAlign: 'center' }}>
                <h1>Items of Collection</h1>
                {Items.length === 0 ?
                    <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                        <h2>No items yet...</h2>
                    </div> :
                    <div>
                        <Row gutter={[16, 16]} >
                            {renderCards}
                        </Row>
                    </div>
                }
                <br /><br />
            </div>

        </div>
    )
}
export default Detail

