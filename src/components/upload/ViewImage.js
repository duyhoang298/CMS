import React, { Component } from 'react';
import { Col, Icon, } from 'antd'

const imgStyle = {
    height: '150px',
    paddingTop: '5px',
    marginBottom: '10px',
    marginRight: '10px',
    borderRadius: '5px'
}

class ViewImage extends Component {

    deleteImage = () => {
    this.props.deleteImage(this.props.image.id, this.props.image.available)
        
    }

    handlePreview = image => {
        this.props.handlePreview(image)
    }



    render() {
        return (
            <Col span={7} style={imgStyle}  >
                <Icon type='close' onClick={this.deleteImage} style={{ cursor: 'pointer' }} />
                <img alt="" src={this.props.image.imageUrl} style={{ cursor: 'pointer', width: '100%', height: '80%' }} onClick={() => this.handlePreview(this.props.image)} />
            </Col>
        );
    }
}

export default ViewImage;