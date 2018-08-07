import React, { Component } from 'react'
import { Row, Modal } from 'antd'
import configs from './../../constants/configs'
import ViewAvatar from './ViewAvatar'
import Button from '../uielements/button';
import './upload.css'

export default class UploadAvatar extends Component {
    constructor(props) {
        super(props);
        this.state = {

            imagePreviewUrl: '',
            previewVisible: false,
            previewImage: ''
        };
        this._handleImageChange = this._handleImageChange.bind(this);
    }

    componentDidMount() {
        if (this.props.avatar)
            this.setState({ imagePreviewUrl: `${configs.url}${this.props.avatar}` })
    }


    componentWillReceiveProps(nextProps) {
        // if(!nextProps.fileAvatar){
        //     this.setState({imagePreviewUrl:'', file: ''});
        // }

        //Doi id hoac cancel
        if (nextProps.avatar && (this.props.id !== nextProps.id || this.props.fileAvatar === '')) {
            this.setState({ imagePreviewUrl: `${configs.url}${nextProps.avatar}`, file: '', previewImage: '' })
        }

    }

    handlePreview = (image) => {
        this.setState({
            previewImage: image,
            previewVisible: true,
        });
    }

    _handleImageChange(e) {
        e.preventDefault();
        //Upload file
        let file = e.target.files[0];
        this.setState({
            file
        }, () => {
            this.props.getAvatar(file)
        })
        this.fileReader(file)
    }

    fileReader = (file) => {
        let reader = new FileReader();
        reader.onloadend = () => {
            this.setState({
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file)
    }

    handleCancel = () => this.setState({ previewVisible: false })

    deleteImage = () => {
        this.setState({ imagePreviewUrl: '', file: '' });
        this.props.getAvatar()
    }



    render() {

        return (
            <div>
                <div className='upload-btn-wrapper'>
                    <Button
                        type="file"
                        icon="upload"
                    >
                        {/* <input type="file" /> */}
                        Tải ảnh
                       <input type="file" onChange={this._handleImageChange} multiple={this.props.singleFile ? false : true} />
                    </Button>
                </div>
                <Row gutter={16}>
                    {this.state.imagePreviewUrl ? <ViewAvatar image={this.state.imagePreviewUrl} handlePreview={this.handlePreview} deleteImage={this.deleteImage} /> : ''}
                </Row>
                <Modal
                    closable={false}
                    visible={this.state.previewVisible}
                    footer={null}
                    onCancel={this.handleCancel}
                    bodyStyle={{ padding: 0 }}
                    width='1000px'
                >
                    <img alt="Avatar" style={{ width: '100%' }} src={this.state.previewImage} />
                </Modal>

            </div>
        )
    }

}