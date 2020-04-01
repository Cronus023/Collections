import React, { useState } from 'react'
import { Form, Input } from 'antd';
function ChangeNameAndTag(props) {
    const [Name, setName] = useState({ value: props.name })
    const [Tag, setTag] = useState({ value: props.tag })
    if (Name.value) props.refreshName(Name.value); else props.refreshName(props.name)
    if (Tag.value) props.refreshTag(Tag.value); else props.refreshTag(props.tag)
    function validateNameAndTag(value) {
        if (value) {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
        return {
            validateStatus: 'error',
            errorMsg: 'Fill the field or nothing will change',
        };
    }
    const onChangeName = (e) => {
        const value = e.currentTarget.value
        setName({ ...validateNameAndTag(value), value })
    }
    const onChangeTag = (e) => {
        const value = e.currentTarget.value
        setTag({ ...validateNameAndTag(value), value })
    }
    return (
        <div style={{ maxWidth: '100px'}}>
            <Form>
                <Form.Item
                    label="Name"
                    validateStatus={Name.validateStatus}
                    help={Name.errorMsg}
                >
                    <Input
                        value={Name.value}
                        onChange={onChangeName}
                    />
                </Form.Item>
                <Form.Item
                    label="Tag"
                    validateStatus={Tag.validateStatus}
                    help={Tag.errorMsg}
                >
                    <Input
                        value={Tag.value}
                        onChange={onChangeTag}
                    />
                </Form.Item>
            </Form>
        </div>
    )
}
export default ChangeNameAndTag