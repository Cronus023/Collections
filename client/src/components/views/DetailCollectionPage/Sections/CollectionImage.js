import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery';
function CollectionImage(props) {
    const [Images, setImages] = useState([])
    useEffect(() => {
        if (props.detail.images && props.detail.images.length > 0) {
            let images = [];
            props.detail.images && props.detail.images.map(url => {
                images.push({
                    original:url,
                    thumbnail:url
                })
            })
            setImages(images)
        }
    }, [props.detail])
    return (
        <div><ImageGallery items={Images} /></div>
    )
}
export default CollectionImage