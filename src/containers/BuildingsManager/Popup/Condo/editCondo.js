import { Modal, Button, Row, Col, Input, InputNumber, Select, message } from 'antd';
import React, { Component } from 'react';
import NumericInputDemo from './InputPrice';
import { connect } from 'react-redux';
import { deleteCondo, saveDeleteCondo, editCondo } from '../../../../redux/actions/building';
import numeral from 'numeral'
import SelectFloor from './selectFloor';
import UploadFile from '../../../../components/upload/UploadFile'
import PopconfirmWrapper from '../../popconfirm.style';
import Popconfirms from '../../../../components/feedback/popconfirm';

const Popconfirm = props => (
    <PopconfirmWrapper>
        <Popconfirms {...props} />
    </PopconfirmWrapper>
)

var changeMoney = money => {
    let m = 1000000;
    let b = 1000 * m;
    let result = null;
    if (money >= b) {
        result = numeral(money / b).format('0[.]000') + 'tỷ'
        result = numeral(Math.floor(money / b)).format('0[.]000') + 'tỷ'
    }
    else if (money >= m) {
        result = numeral(money/m).format('0[.]000') + 'triệu'
    }

    return result

}


class BtnEditCondo extends Component {
    state = {
        visible: false,
        listFile: [],
        listRmFile: [],
        floors: [],
        confirmLoading: false
    }

    componentDidMount() {
        this.setState({ ...this.props.condo, floors: [this.props.floor.id] })
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.condo !== nextProps.condo) {
            this.setState({ ...nextProps.condo, floors: [nextProps.floor.id] });
        }
    }

    showModal = () => {
        this.setState({
            visible: true,
        });

    }
    handleOk = (e) => {
        let { title, size, floors, price_rent, price_sale, bedroom, wc_room, description, direction, status } = this.state
        if (!(title && size && floors && price_rent && price_sale && bedroom && wc_room && description && direction && status)) return message.warning('Vui lòng nhập đầy đủ thông tin')

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
        if (this.state.listRmFile.length > 0) {
            this.state.listRmFile.forEach(id => {
                dataForm.append(`condo[delete_images][${id}]`, true)
            })
        }

        if (this.state.listFile.length > 0) {
            this.state.listFile.forEach(file => {
                dataForm.append("condo[new_image_path][]", file.file)
            })
        }
        this.props.editCondo(this.props.token, dataForm, this.state.id, (err, res) => {
            this.setState({ confirmLoading: false, visible: false });

            this.handleCancel()

        })
    }


    handleCancel = (e) => {
        this.setState({
            visible: false,
            listFile: [],
            listRmFile: [],
            floors: [this.props.floor.id],
            ...this.props.condo,

        })

    }


    getFileList = file => {
        this.setState({ listFile: file })
    }

    getFloors = floors => {
        this.setState({ floors: floors })

    }

    removeFile = id => {
        let { listRmFile } = this.state
        let images = this.state.images.filter(img => img.id !== id)
        listRmFile.push(id)
        this.setState({ images, listRmFile })
    }

    confirm = (id) => {
        this.props.deleteCondo(this.props.token, id, (err, res) => {
            this.setState({ visible: false })

            if (err) {
                return message.error('Xóa thất bại')
            }
            message.success('Xóa thành công')
            this.props.saveDeleteCondo(id)
        })
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
    render() {
        // console.log(this.state);
        let { condo } = this.props
        let direction;
        switch (condo.direction) {
            case 'dong': direction = 'Đông'; break;
            case 'tay': direction = 'Tây'; break;
            case 'nam': direction = 'Nam'; break;
            case 'bac': direction = 'Bắc'; break;
            case 'dong_bac': direction = 'Đông Bắc'; break;
            case 'dong_nam': direction = 'Đông Nam'; break;
            case 'tay_bac': direction = 'Tây Bắc'; break;
            case 'tay_nam': direction = 'Tây Nam'; break;
            default: ''; break;
        }

        let status;
        switch (condo.status) {
            case 'for_sale': status = 'Rao bán'; break;
            case 'for_rent': status = 'Cần cho thuê'; break;
            case 'authority': status = 'Thẩm quyền'; break;
            case 'no_action': status = 'Không'; break;
            case 'saled': status = 'Đã bán'; break;
            case 'rented': status = 'Đã cho thuê'; break;
            default: ''; break;
        }
        return (
            <div>

                <Col gutter={{ xs: 8, sm: 16, md: 24 }} xs={24} sm={12} md={8} lg={8} ><div onClick={this.showModal} className='room' style={{ background: condo.status ? '#74cdf7' : '#83889F' }} >
                    <h4 className='title-condo'> {condo.title} </h4>
                    <h5>
                        <i className="fa fa-bed"> {condo.bed_room || 0} </i>
                        <i className="fa fa-bath"> {condo.wc_room || 0} </i>
                        <br />
                        <i className="fa fa-home"> {condo.size} m2 </i>
                        {/* <i className="fa fa-home"> {condo.furnishing || 0}</i> */}
                        <br />
                        <i className="fa fa-compass"> {direction}</i>

                        <div> <strong>Status:</strong> {status}</div>

                    </h5>
                    <h5>
                        {/* <div><strong>Giá bán:</strong>{numeral(condo.price_rent / 1000000).format('0,0')} tr </div> */}
                        <div><strong>Giá bán:</strong>{changeMoney(condo.price_rent)}</div>
                        <div><strong>Giá thuê:</strong>{changeMoney(condo.price_sale)}</div>
                    </h5>

                </div>
                </Col>


                <Modal
                    title="SỬA CĂN HỘ"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    confirmLoading={this.state.confirmLoading}
                    footer={[
                        <Popconfirm
                            title="Are you sure？"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => this.confirm(this.state.id)}
                            key={this.state.id}
                        >
                            <Button key="delete" type="danger"   >Xóa</Button>,
                        </Popconfirm>,
                        <Button key="back" onClick={this.handleCancel}>Hủy bỏ</Button>,
                        <Button key="submit" type="primary" onClick={this.handleOk}>
                            Sửa
                        </Button>,
                    ]}
                >
                    <Row gutter={16} style={{ marginBottom: '10px' }}  >
                        <Col span={8}>Tiêu đề</Col>
                        <Col span={16}><Input value={this.state.title} onChange={this.onChangeTitle} /></Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '10px' }} >
                        <Col span={8}>Diện tích </Col>
                        <Col span={16}><InputNumber min={1} value={this.state.size} onChange={this.onChangeSize} /> m2</Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '10px' }} >
                        <Col span={8}>Tầng</Col>
                        <Col span={16}>
                            <SelectFloor disable={true} getFloors={this.getFloors} floor={this.state.floors} />
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '10px' }} >
                        <Col span={8}>Giá bán</Col>
                        <Col span={16}><NumericInputDemo value={this.state.price_rent} onChange={this.onChangePriceRent} /> VNĐ</Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '10px' }} >
                        <Col span={8}>Giá thuê</Col>
                        <Col span={16}><NumericInputDemo value={this.state.price_sale} onChange={this.onChangePriceSale} /> VNĐ</Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '10px' }} >
                        <Col span={8}>Số phòng ngủ</Col>
                        <Col span={16}><InputNumber min={1} value={this.state.bedroom} onChange={this.onChangeNumberBedRoom} /></Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '10px' }} >
                        <Col span={8}>Số nhà vệ sinh</Col>
                        <Col span={16}><InputNumber min={1} value={this.state.wc_room} onChange={this.onChangeNumberWC} /></Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '10px' }}>
                        <Col span={8}>Hướng nhà</Col>
                        <Col span={16}>
                            <Select value={this.state.direction} style={{ width: 120 }} onChange={this.onChangeDirection} >
                                <Select.Option value="dong">Đông</Select.Option>
                                <Select.Option value="tay">Tây</Select.Option>
                                <Select.Option value="nam">Nam</Select.Option>
                                <Select.Option value="bac">Bắc</Select.Option>
                                <Select.Option value="dong_bac">Đông Bắc</Select.Option>
                                <Select.Option value="tay_bac">Tây Bắc</Select.Option>
                                <Select.Option value="dong_nam">Đông Nam</Select.Option>
                                <Select.Option value="tay_nam">Tây Nam</Select.Option>
                            </Select>
                        </Col>
                    </Row>

                    <Row gutter={16} style={{ marginBottom: '10px' }} >
                        <Col span={8}>Trạng thái</Col>
                        <Col span={16}>
                            <Select value={this.state.status} style={{ minWidth: 120 }} onChange={this.onChangeStatus} >
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

export default connect(
    state => ({
        token: state.auth.token,
        building_id: state.Building.seectedId
    })
    , { deleteCondo, saveDeleteCondo, editCondo })(BtnEditCondo)