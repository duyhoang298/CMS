import { Modal, message, Row, Col, Input, InputNumber, Select, Icon } from 'antd';
import React, { Component } from 'react';
import NumericInputDemo from './InputPrice'
import SelectFloor from './selectFloor';
import UploadFile from '../../../../components/upload/UploadFile'
import { connect } from 'react-redux'
import { addCondo, getDetailCondo, saveAddCondo } from '../../../../redux/actions/building'

const initState = {
    size: '',
    price_rent: '',
    price_sale: '',
    bedroom: 1,
    wc_room: 1,
    images: [],
    description: '',
    direction: 'dong',
    owner: '',
    status: 'for_sale',
    furnishing: 0,
    title: '',
    listFile: [],
    listRmFile: [],
}



class BtnAddCondo extends Component {
    state = {
        visible: false,
        confirmLoading: false,
        ...initState
    }


    componentDidMount() {
        this.setState({ floors: [this.props.floor.id] })
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.floor.id !== nextProps.floor.id)
            this.setState({ floors: [nextProps.floor.id] })
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    getFloors = floors => {
        this.setState({ floors: floors })
    }

    handleOk = (e) => {
        let {  title, size, floors, price_rent, price_sale, bedroom, wc_room, description, direction, status } = this.state
        if(!(title && size && floors && price_rent && price_sale && bedroom && wc_room && description && direction && status)) return message.warning('Vui lòng nhập đầy đủ thông tin')

        this.setState({ confirmLoading: true })

        const dataForm = new FormData();
        dataForm.append('condo[title]', title)
        dataForm.append('condo[size]', size)

        floors.forEach(floor => {
            dataForm.append('condo[floor][]', floor)
        })

        dataForm.append('condo[price_rent]', price_rent)
        dataForm.append('condo[price_sale]', price_sale)
        dataForm.append('condo[bedroom]', bedroom)
        dataForm.append('condo[wc_room]', wc_room)
        dataForm.append('condo[description]', description)
        dataForm.append('condo[direction]', direction)
        // dataForm.append('condo[furnishing]', furnishing)
        dataForm.append('condo[status]', status)
        dataForm.append('condo[building_id]', this.props.building_id)
        // dataForm.append('condo[delete_images][]',)
        if (this.state.listFile.length > 0) {
            this.state.listFile.forEach(file => {
                dataForm.append("condo[new_image_path][]", file.file)
            })
        }
        this.props.addCondo(this.props.token, dataForm, (err, res) => {
            this.setState({ ...initState, visible: false, confirmLoading: false });
            if (err) {
                return
            }
            res.data.forEach(data => {
                console.log(data.id);
                this.props.getDetailCondo(this.props.token, data.id)
            })

        })


    }
    handleCancel = (e) => {
        this.setState({ ...initState, visible: false, floors: [this.props.floor.id] });
    }



    onChangeSize = e => { this.setState({ size: e }) }
    onChangePriceRent = e => { this.setState({ price_rent: e }) }
    onChangePriceSale = e => { this.setState({ price_sale: e }) }
    onChangeNumberBedRoom = e => { this.setState({ bedroom: e }) }
    onChangeNumberWC = e => { this.setState({ wc_room: e }) }
    // onChangeFurnishing = e => { this.setState({ furnishing: e }) }
    onChangeDirection = e => { this.setState({ direction: e }) }
    onChangeOwner = e => { this.setState({ owner: e.target.value }) }
    onChangeTitle = e => { this.setState({ title: e.target.value }) }
    onChangeStatus = e => { this.setState({ status: e }) }
    onChangeDesc = e => { this.setState({ description: e.target.value }) }


    getFileList = file => {
        this.setState({ listFile: file })
    }

    removeFile = id => {
        let { listRmFile } = this.state
        let images = this.state.images.filter(img => img.id !== id)
        listRmFile.push(id)
        this.setState({ images, listRmFile })
    }

    render() {
        return (
            <div>
                <Icon type="plus-circle-o" onClick={this.showModal} style={{ fontSize: '25px', paddingLeft: '10px', cursor: 'pointer', color: '#00aeff' }} />
                <Modal
                    title="THÊM CĂN HỘ"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    confirmLoading={this.state.confirmLoading}
                >
                    <Row gutter={16} style={{ marginBottom: '10px' }}>
                        <Col span={8}>Tiêu đề</Col>
                        <Col span={16}><Input value={this.state.title} onChange={this.onChangeTitle} /></Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '10px' }} >
                        <Col span={8}>Diện tích</Col>
                        <Col span={16}><InputNumber min={1} value={this.state.size} onChange={this.onChangeSize} /> m2</Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '10px' }} >
                        <Col span={8}>Tầng</Col>
                        <Col span={16}>
                            <SelectFloor getFloors={this.getFloors} floor={this.state.floors} disable={false} />
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '10px' }} >
                        <Col span={8}>Giá bán</Col>
                        <Col span={16}><NumericInputDemo val={this.state.price_rent} onChange={this.onChangePriceRent} /> VNĐ</Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '10px' }} >
                        <Col span={8}>Giá thuê</Col>
                        <Col span={16}><NumericInputDemo val={this.state.price_sale} onChange={this.onChangePriceSale} /> VNĐ</Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '10px' }} >
                        <Col span={8}>Số phòng ngủ</Col>
                        <Col span={16}><InputNumber min={1} value={this.state.bedroom} onChange={this.onChangeNumberBedRoom} /></Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '10px' }} >
                        <Col span={8}>Số nhà vệ sinh</Col>
                        <Col span={16}><InputNumber min={1} value={this.state.wc_room} onChange={this.onChangeNumberWC} /></Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '10px' }} >
                        <Col span={8}>Hướng nhà</Col>
                        <Col span={16}>
                            <Select value={this.state.direction} style={{ width: 120 }} onChange={this.onChangeDirection} >
                                <Select.Option value="dong">Đông</Select.Option>
                                <Select.Option value="tay">Tây</Select.Option>
                                <Select.Option value="nam">Nam</Select.Option>
                                <Select.Option value="bac">Bắc</Select.Option>
                                <Select.Option value="dong_bac">Đông Bắc</Select.Option>
                                <Select.Option value="tay_bac">Tây Bắc</Select.Option>
                                <Select.Option value="don_gnam">Đông Nam</Select.Option>
                                <Select.Option value="tay_nam">Tây Nam</Select.Option>

                            </Select>
                        </Col>
                    </Row>

                    <Row gutter={16} style={{ marginBottom: '10px' }} >
                        <Col span={8}>Trạng thái</Col>
                        <Col span={16}>
                            <Select value={this.state.status} style={{ width: 120 }} onChange={this.onChangeStatus} >
                                <Select.Option value="for_sale">Rao bán</Select.Option>
                                <Select.Option value="for_rent">Cần cho thuê</Select.Option>
                                <Select.Option value="authority">Thẩm quyền</Select.Option>
                                <Select.Option value="no_action">Không </Select.Option>
                                <Select.Option value="saled">Đã bán</Select.Option>
                                <Select.Option value="rented">Đã cho thuê</Select.Option>
                            </Select>
                        </Col>
                    </Row>
                    {/* <Row gutter={16} style={{ marginBottom: '10px' }}  >
                        <Col span={8}>Chủ nhân</Col>
                        <Col span={16}><Input value={this.state.owner} onChange={this.onChangeOwner} /></Col>
                    </Row> */}
                    {/* <Row gutter={16} style={{ marginBottom: '10px' }} >
                        <Col span={8}>Nội thất</Col>
                        <Col span={16}><InputNumber value={this.state.furnishing} min={0} onChange={this.onChangeFurnishing} /></Col>
                    </Row> */}
                    <Row gutter={16} style={{ marginBottom: '10px' }} >
                        <Col span={8}>Mô tả</Col>
                        <Col span={16}><Input.TextArea value={this.state.description} onChange={this.onChangeDesc} /></Col>
                    </Row>

                    <UploadFile
                        getFileList={this.getFileList}
                        images={this.state.images}
                        id={this.state.id}
                        listFile={this.state.listFile}
                        removeFile={this.removeFile}
                    />
                </Modal>
            </div>
        );
    }
}

export default connect(state => ({
    token: state.auth.token,
    building_id: state.Building.building.id
}), { addCondo, getDetailCondo, saveAddCondo })(BtnAddCondo)