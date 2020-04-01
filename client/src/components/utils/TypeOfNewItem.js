import React, { useState } from 'react'
import { Input, Checkbox, InputNumber, Form } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import Axios from 'axios'
function TypeOfNewItem(props) {
    var valueOfField = props.valueOfField
    if(props.valueOfField == "false") valueOfField = false
    const [value, setValue] = useState(valueOfField)
    const type = props.typeOffield
    const nameOfField = props.nameOfField
    const onInput = (event) => {
        let valueOfField = ""
        if (type == 1 || type == 2 || type == 4) {
            const e = event.currentTarget.value
            setValue(e)
            valueOfField = e
        }
        else if (type == 3) {
            const e = event.target.checked
            setValue(e)
            valueOfField = e
        }
        else {
            const e = event
            setValue(e)
            valueOfField = e
        }
        const field = {
            value: valueOfField,
            name: nameOfField
        }
        if (props.collectionId) {
            Axios.put(`/api/collections/upDatefield?id=${props.collectionId}`, field)
                .then(response => {
                    if (!response.data.success)
                        alert('Failed to fectch item datas')
                    else {
                        props.refreshfunction(response.data.fields)
                    }
            })
        }
        if (props.itemId) {
            Axios.put(`/api/items/upDatefield?id=${props.itemId}&i=${props.i}&value=${valueOfField}`, field)
        }
    }
    if (type == 1) {
        return (
            <div> 
                <Input min={1} onChange={onInput} value={value} />
            </div>
        )
    }
    if (type == 2) {
        return (
            <div>
                <TextArea onChange={onInput} value={value} />
            </div>
        )
    }
    if (type == 3) {
        return (
            <div>
                <Checkbox onChange={onInput} checked={value} />
            </div>
        )
    }
    if (type == 4) {
        return (
            <div>
                <Input type="date" onChange={onInput} value={value} />
            </div>
        )
    }
    if (type == 5) {
        return (
            <div>
                <InputNumber  min={1} onChange={onInput} value={value} />
            </div>
        )
    }
}
export default TypeOfNewItem