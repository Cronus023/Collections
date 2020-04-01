import React from 'react'
import { Carousel } from 'antd';

function ImageSlider(props) {
    return (
        <div>
            <Carousel autoplay>
            {props.images.map((url, index) => (
                    <div key={index}>
                        <img style={{ width: '100%', maxHeight: '150px' }}
                            src={url} alt={`collecionImg-${index}`} />
                    </div>
            ))}
            </Carousel>
        </div>
    )
}

export default ImageSlider