import React,{useEffect,useState} from 'react'
import Axios from 'axios'
import { Icon, Col, Card, Row} from 'antd';
import FieldsOfItem from '../../utils/FieldsOfItem'
import Likes from '../../utils/Likes'
import { EditOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import Change from './Sections/Change'
import ChangeNameAndTag from './Sections/ChangeNameAndTag'
import Delete from './Sections/Delete'
const { Meta } = Card;

function MyItemsPage(props){ 
    const collectionId =props.match.params.collectionId
    const [Items, setItems] = useState([])
    const [click,setClick] = useState(false)
    const [Name,setName] = useState("")
    const [Tag,setTag] = useState("")

    const onChangeName = (e) =>{
        setName(e)
    }
    const onChangeTag = (e) =>{
        setTag(e)
    }

    useEffect(()=>{
        Axios.get(`/api/items/items?id=${collectionId}`)
            .then(response => {
                if (response.data.success) {
                    setItems(response.data.items)
                } else {
                    alert('Failed to fectch product datas')
                }
            })
    },[])
    const refresh = (i) =>{
        setItems (i)
    }
    const refreshClick=()=>{
        setClick(false)
    }
    const refreshItems=(items)=>{
        setItems(items)
    }
    const onChange = () =>{
        setClick(true)
    } 
    const renderCards = Items.map((item, index) => {
        return <Col lg={24} md={8} xs={24}>
            <Card
                actions={[
                    <Likes id = {item._id} collectionId={collectionId} />,
                    <Delete length={Items.length} collectionId={collectionId} refreshfunction = {refresh} id = {item._id}/>,
                    click?(<Change refreshTag={onChangeTag} refreshName={onChangeName}  refreshItems={refreshItems} collectionId={collectionId} refreshClick={refreshClick} name={Name} tag={Tag} itemId={item._id} refresh={refreshClick} shape="round" type="danger" />):
                    (<Tooltip title = "Edit item">
                        <EditOutlined onClick={onChange} />
                    </Tooltip>)
                  ]}
                size="small"
                hoverable={true}
                cover={<a href={`/items/comments/${item._id}`} ></a>}            >
                {click? (
                    <ChangeNameAndTag refreshTag={onChangeTag} refreshName={onChangeName} name={item.name} tag={item.tag}/>
                ) 
                :<Meta title={item.name} description = {item.tag}/>}
                <FieldsOfItem id = {item._id} flag={click} fields={item.fields} />
            </Card>
        </Col>
    })
    
    return(
        <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>  Items  <Icon type="smile" />  </h2>
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
export default MyItemsPage