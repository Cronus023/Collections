import React, { useEffect, useState } from 'react'
import { Col, Card, Row, Button } from 'antd';
import Axios from 'axios'
import ImageSlider from '../../../utils/ImageSlider';
import './CssUtils/Collections.css';
function TopCollections(props) {
    const [Collections, setCollections] = useState([])
    useEffect(() => {
        Axios.post(`/api/collections/getAllCollections`)
            .then(response => {
                if (response.data.success) {
                    var collections = response.data.collections
                    collections.sort((prev, next) => {
                        if (prev.items > next.items) return -1
                    });
                    if (collections.length == 1 || collections.length == 2) setCollections(collections)
                    else setCollections(collections.slice(0, 3))
                }
                else {
                    alert('Failed to get collections datas')
                }
            })
    }, [])

    return (
        <div className="collections" style={{ textAlign: 'center' }} >
            {Collections.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>No collections yet...</h2>
                </div> :
                <div>
                    <div style={{ width: '25%', margin: 'auto' }} >
                        <h1 style={{ color: 'red' }}>First place {Collections[0].items + " " + "items!"}</h1>
                        <Card
                            hoverable={true}
                            cover={<a href={`top3/${Collections[0]._id}`}> <ImageSlider images={Collections[0].images} /></a>}>
                            <Button  shape="round" type="danger" href={`top3/${Collections[0]._id}`}>View more information</Button>
                        </Card>
                    </div>
                    {Collections.length > 1 && <Row>
                        <Col span={7}>
                            <h1 style={{ color: '#FFFF00' }}>Second place {Collections[1].items + " " + "items!"}</h1>
                            <Card
                                hoverable={true}
                                cover={<a href={`top3/${Collections[1]._id}`}> <ImageSlider images={Collections[1].images} /></a>} >
                                <Button  shape="round" type="danger" href={`top3/${Collections[1]._id}`}>View more information</Button>
                            </Card>
                        </Col>
                        {Collections.length > 2 && <Col span={7} offset={10}>
                            <h1 style={{ color: 'blue' }}>Third place {Collections[2].items + " " + "items!"}</h1>
                            <Card
                                hoverable={true}
                                cover={<a href={`top3/${Collections[2]._id}`}> <ImageSlider images={Collections[2].images} /></a>}>
                                <Button  shape="round" type="danger" href={`top3/${Collections[2]._id}`}>View more information</Button>
                            </Card>
                        </Col>}
                    </Row>}
                </div>
            }
        </div>
    )
}
export default TopCollections

