import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Icon, Col, Card, Row } from 'antd';
import moment from 'moment';
import Likes from '../../../utils/Likes'
import FieldsOfItem from '../../../utils/FieldsOfItem';
import Comments from './Comments';
const { Meta } = Card;

function LatestItems(props) {
    const [Items, setItems] = useState([])
    useEffect(() => {
        Axios.post("/api/items/latestitems")
            .then(response => {
                if (response.data.success) {
                    setItems(response.data.items.reverse())
                } else {
                    alert('Failed to fectch product datas')
                }
            })
    }, [])
    const renderCards = Items.map((item, index) => {
        let moment1 =  moment(item.createdAt)
        while (index < 10) {
            return <Col lg={24} md={8} xs={24}>
                <Card
                    onClick={console.log("Lol")}
                    actions={[
                        <Likes id={item._id} />,
                        <Comments id={item._id}/>
                    ]}
                    size="small"
                    hoverable={true}
                    cover={<a href={`/items/comments/${item._id}`} ></a>}>
                    <Meta title={item.name} description={moment1.format('DD-MM-YYYY HH:mm:ss')} />
                    <FieldsOfItem click={true} id={item._id} fields={item.fields} />
                </Card>
            </Col>
        }
    })

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>Latest 10 items <Icon type="smile" /></h2>
            </div>
            {Items.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>No items yet...</h2>
                </div> :
                <div>
                    <Row gutter={[16, 16]}>
                        {renderCards}
                    </Row>
                </div>
            }
            <br /><br />
        </div>
    )
}
export default LatestItems

