import React,{useEffect,useState} from 'react'
import Axios from 'axios'
import { Icon, Col, Card, Row } from 'antd';
import ImageSlider from '../../utils/ImageSlider';

const { Meta } = Card;

function MyCollectionsPage(props){
    let id = props.match.params.userId
    const [Collections, setCollections] = useState([])
    useEffect(()=>{
        Axios.post(`/api/collections/getCollections?id=${id}`)
            .then(response => {
                if (response.data.success) {
                   setCollections(response.data.collections)
                } 
                else if(response.data.message){
                    alert(response.data.message)
                    window.location.href = "/"
                }
                else {
                    alert('Failed to get collections datas')
                }
            })
    },[])
    const renderCards = Collections.map((collection, index) => {
        return <Col lg={6} md={8} xs={24}>
            <Card
                hoverable={true}
                cover={<a userId={id} href={`/collections/${collection._id}`} > <ImageSlider images={collection.images} /></a>}            >
                <Meta
                    title={collection.name}
                    description={collection.topic}
                />
            </Card>
        </Col>
    })

    return(
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>  Collections  <Icon type="smile" />  </h2>
            </div>
            {Collections.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>No post yet...</h2>
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
export default MyCollectionsPage