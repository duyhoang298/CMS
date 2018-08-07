import React, { Component } from 'react';
import { Icon } from 'antd'

const outerLoading = {
    // opacity: 0.5,
    position: 'relative',
}

const styleIcon = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    color: 'black',
    fontSize: 50
}

class IconLoading extends Component {
    render() {
        return (
            <Icon type='loading' style={styleIcon} />
        );
    }
}

export  {IconLoading, outerLoading};