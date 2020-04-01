import React, { useState } from 'react';
import { Row, Descriptions, Form, Button } from 'antd';
import TypeOfNewItem from './TypeOfNewItem'
const FieldsOfItem = (props) => {
    const [Click, setClick] = useState(false)
    const fields = props.fields
    var flag = false
    var flag1 = false
    if (props.flag) flag = props.flag
    if (props.click) flag1 = true
    const onChangeClick = () => {
        setClick(!Click)
    }
    const getFields = () => {
        const children = [];
        if(fields.length == 0)  children.push(
            <Descriptions column={1} >
                <Descriptions.Item> {"There is no more information"}</Descriptions.Item>
            </Descriptions>
        )
        for (let i = 0; i < fields.length; i++) {
            let value = fields[i].value
            if(fields[i].value == "true") value = "yes"
            if(fields[i].value == "false") value = "no"
            children.push(
                <div>
                    {flag ? (
                        <Form.Item label = {fields[i].name}>
                            <TypeOfNewItem valueOfField={fields[i].value} i={i} typeOffield={fields[i].type} itemId={props.id} />
                        </Form.Item>
                    ) : (
                            <Descriptions column={1} >
                                <Descriptions.Item label={fields[i].name}>{fields[i].value ? value : "There is no information"}</Descriptions.Item>
                            </Descriptions>
                        )}
                </div>
            );
        }
        return children;
    };
    return (
        <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
            {props.click &&
                <div>
                    <Button shape="round" type="danger" onClick={onChangeClick}>View more information</Button><br /><br />
                </div>
            }
            {flag1 ? (
                <div>
                    {Click && <Row gutter={24}>{getFields()}</Row>}
                </div>
            ) : <Row gutter={24}>{getFields()}</Row>
            }
        </div>
    )
};
export default FieldsOfItem