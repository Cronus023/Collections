import React , {useState} from 'react'
import { Menu } from 'antd'
import TopCollections from './Sections/Top3CollectionPage'
import LatestItems from './Sections/LatestItemsPage'
import Users from './Sections/Users'
import "./Sections/CssUtils/main.css"
function LandingPage(props) {
    console.log(window.localStorage.getItem('userId'))
    const[click,setClick] = useState(false)
    const[clickOnAdmin,setClickOnAdmin] = useState(false)
    let isAdmin = false
    if(props.user.userData) isAdmin=props.user.userData.isAdmin
    const onClick = () => {
        setClickOnAdmin(false)
        setClick(true)
    }
    const onAdmin = () => {
        setClickOnAdmin(true)
        setClick(false)
    }
    return (
        <div className="main">
            <Menu mode="horizontal">
                <Menu.Item key="items">
                    <a href="/">Last added items</a>
                </Menu.Item>
                <Menu.Item key="collections">
                    <a onClick={onClick}>Top 3 collections</a>
                </Menu.Item>
                {isAdmin&&(<Menu.Item key="users">
                    <a onClick={onAdmin}>Users</a>
                </Menu.Item>)}
            </Menu>
            {click? <TopCollections/>: clickOnAdmin? <Users/>: <LatestItems/>}
        </div>
    )
}
export default LandingPage
