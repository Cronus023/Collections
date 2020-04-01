import React, { Component } from 'react'
import { Form, Icon, Input, Button, Row, Col, } from 'antd';
import io from "socket.io-client";
import { connect } from "react-redux";
import moment from "moment";
import { getComments,afterPostMessage } from "../../../_actions/comments_actions"
import CommentsCard from "./Sections/CommentsCard"

export class CommentPage extends Component {
    state = {
        chatMessage: "",
    }
    componentDidMount() {
        let server = "http://localhost:5000";
        this.socket = io(server);
        this.props.dispatch(getComments(this.props.match.params.itemId));
        this.socket.on("Output Chat Message", messageFromBackEnd => {
            this.props.dispatch(afterPostMessage(messageFromBackEnd));
        })
    }
    hanleSearchChange = (e) => {
        this.setState({
            chatMessage: e.target.value
        })
    }
    submitChatMessage = (e) => {
        e.preventDefault();

        if (this.props.user.userData && !this.props.user.userData.isAuth) {
            return alert('Please Log in first');
        }
        let chatMessage = this.state.chatMessage
        let userId = this.props.user.userData._id
        let userName = this.props.user.userData.name
        let itemId = this.props.match.params.itemId
        let nowTime = moment();

        this.socket.emit("Input Chat Message", {
            chatMessage,
            userId,
            userName,
            nowTime,
            itemId
        });
        this.setState({ chatMessage: "" })
    }
    renderCards = () =>
        this.props.comments.comments
        && this.props.comments.comments.map((comment) => (
            <CommentsCard time={comment.createdAt} key={comment._id}  {...comment} />
        ));
    render() {
        return (
            <React.Fragment>
                <div>
                    <p style={{ fontSize: '2rem', textAlign: 'center' }}> Comments</p>
                </div>

                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div className="infinite-container" style={{ height: '500px', overflowY: 'scroll' }}> 
                        {this.props.comments && (
                            this.renderCards()
                        )}
                        <div
                            ref={el => {
                                this.messagesEnd = el;
                            }}
                            style={{ float: "left", clear: "both" }}
                        />
                    </div>

                    <Row >
                        <Form layout="inline" onSubmit={this.submitChatMessage}>
                            <Col span={18}>
                                <Input
                                    id="message"
                                    prefix={<Icon type="message" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Let's start talking"
                                    type="text"
                                    value={this.state.chatMessage}
                                    onChange={this.hanleSearchChange}      
                                />
                            </Col>
                            <Col span={4}>
                                <Button type="primary" style={{ width: '100%' }} onClick={this.submitChatMessage}  htmlType="submit">
                                    <Icon type="enter" />
                                </Button>
                            </Col>
                        </Form>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        comments: state.comment
    }
}
export default connect(mapStateToProps)(CommentPage);
