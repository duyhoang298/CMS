import React, { Component } from 'react'
import { Row,  Modal } from 'antd'
import configs from './../../constants/configs'
import ViewImage from './ViewImage'
import Button from '../uielements/button';
import './upload.css'

var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
var uniqid = randLetter + Date.now();


export default class UploadFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listFile: [],
            imagePreviewUrl: [],
            previewVisible: false,
            previewImage: {}
        };
        this._handleImageChange = this._handleImageChange.bind(this);
    }

    componentDidMount() {
        let images;
        if (this.props.images) {
            images = this.props.images.map(img => {
                return {
                    imageUrl: `${configs.url}${img.imageUrl}`,
                    id: img.id,
                    available: true
                }
            })
            this.setState({ imagePreviewUrl: images })
        }

    }


    componentWillReceiveProps(nextProps) {
        let images;
        if (nextProps.listFile.length === 0) {
            this.setState({ imagePreviewUrl: [], listFile: [] })
        }

        //Doi id hoac cancel
        if (nextProps.images && nextProps.images.length > 0 && (this.props.id !== nextProps.id || (nextProps.listFile.length === 0))) {
            images = nextProps.images.map(img => {
                return {
                    imageUrl: `${configs.url}${img.imageUrl}`,
                    id: img.id,
                    available: true
                }
            })
            this.setState({ imagePreviewUrl: images, listFile: [] })
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
        let file
        let listFile = this.state.listFile

        //Upload file
        if (e.target.files.length === 1) {
            file = e.target.files[0];

            listFile.push({ file: file, id: uniqid })
            this.setState({
                listFile
            }, () => {
                this.props.getFileList(this.state.listFile)
            })
            this.fileReader(file, uniqid)
        }

        //Upload list file
        else if (e.target.files.length > 1) {
            file = e.target.files;

            for (let i = 0; i < file.length; i++) {
                listFile.push({ file: file[i], id: uniqid + i })
                this.fileReader(file[i], uniqid + i)
            }


            // listFile.push(file)

            this.setState({
                listFile
            }, () => {
                this.props.getFileList(this.state.listFile)
            })

        }




    }

    fileReader = (file, id) => {
        let reader = new FileReader();
        reader.onloadend = () => {
            let imagePreviewUrl = this.state.imagePreviewUrl
            imagePreviewUrl.push({
                imageUrl: reader.result,
                id: id
            })
            this.setState({
                imagePreviewUrl
            });
        }
        reader.readAsDataURL(file)
    }

    handleCancel = () => this.setState({ previewVisible: false })

    deleteImage = (id, available) => {
        console.log(id, available);
        let { listFile, imagePreviewUrl } = this.state
        if (!available) {
            listFile = listFile.filter(l => l.id !== id)
            imagePreviewUrl = imagePreviewUrl.filter(l => l.id !== id)
            this.setState({ listFile, imagePreviewUrl }, () => this.props.getFileList(this.state.listFile))
        } else {
            this.props.removeFile(id);
            imagePreviewUrl = imagePreviewUrl.filter(l => l.id !== id)
            this.setState({imagePreviewUrl})
            
        }



    }

    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = imagePreviewUrl.map((image, index) => {
                return <ViewImage image={image} key={index} handlePreview={this.handlePreview} deleteImage={this.deleteImage} />
            })
        }
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
                    {$imagePreview}
                </Row>
                <Modal
                    closable={false}
                    visible={this.state.previewVisible}
                    footer={null}
                    onCancel={this.handleCancel}
                    bodyStyle={{padding: 0}}
                    width='1000px'
                >
                    <img alt="" style={{width: '100%'}} src={this.state.previewImage.imageUrl} />
                </Modal>

            </div>
        )
    }

}