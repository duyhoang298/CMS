import { Modal, Button, Col, Row, Input, Icon, message } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addBuilding, editBuilding } from '../../../../redux/actions/building';
import SelectProject from './selectProject';
import configs from "../../../../constants/configs";
import { create } from 'apisauce';

const api = create({
    baseURL: "https://maps.googleapis.com/maps/api/geocode/"
})

const nullData = {
    name: '',
    code: "AAANL",
    localtion: '',
    project_id: '',
    floor: '',
    longtitude: '',
    latitude: '',
    confirmLoading: false,
    visible: false,
}

class BtnAddBuilding extends Component {
    state = { ...nullData }

    componentDidMount() {
        if (this.props.building) {
            this.setState({
                ...this.props.building
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.building !== this.props.building) {
            this.setState({
                ...nextProps.building,
                localtion: this.props.address
            })
        }
    }




    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        let { name, code, localtion, project_id, floor, longtitude, latitude } = this.state
        if (!(name && code && localtion && project_id && floor)) return message.warning('Vui lòng nhập đầy đủ thông tin')
        this.setState({
            confirmLoading: true,
        });

        let data = {
            name: name,
            code: "AAANL",
            localtion: localtion,
            project_id: project_id,
            floor: Number(floor),
            longtitude: longtitude,
            latitude: latitude
        }
        if (this.props.building) {


            this.props.editBuilding(this.props.token, data, this.props.building.id, (err, res) => {
                if (err) {
                    this.setState({ ...this.props.building })
                } else this.setState({ ...res.data });

                this.setState({ visible: false, confirmLoading: false });
            })
        } else
            this.props.addBuilding(this.props.token, data, (err, data) => {
                this.setState({ ...nullData })
            })

    }
    handleCancel = (e) => {
        if (this.props.building) return this.setState({ ...this.props.building, visible: false });

        this.setState({
            ...nullData
        });
    }

    onHandleChange = e => {
        let name = e.target.name;
        let value = e.target.value;
        if(name === 'floor' && value < 0 ) return message.warning('dsa')
        this.setState({
            [name]: value
        })
    }

    getProject = (project_id, localtion) => {
        this.setState({ project_id: project_id, localtion: localtion });
        api.get(`json?address=${localtion}&key=${configs.GEOCODE_API_KEY}`)
            .then(res => {
                let location = res.data.results[0].geometry.location
                this.setState({
                    longtitude: location.lng,
                    latitude: location.lat
                }, () => console.log(this.state));

            })
            .catch(err => console.log(err))
    }



    render() {
        return (
            <div>
                <Button onClick={this.showModal}   ><Icon type={this.props.building ? "edit" : "plus"} /></Button>
                <Modal
                    title={this.props.title}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    confirmLoading={this.state.confirmLoading}
                >
                    {this.props.building && this.state.floor < this.props.building.floor ?
                        <div style={{textAlign:'center', color:'red'}} >                            Cảnh báo: giảm số tầng sẽ làm mất dữ liệu tầng {Number(this.state.floor) + 1 === this.props.building.floor ? this.props.building.floor : Number(this.state.floor) + 1 + ' đến tầng '  + this.props.building.floor }
                        </div>
                        : ''}


                    <Row gutter={16} style={{ marginBottom: '10px' }} >
                        <Col span={8}>  Tên tòa nhà</Col>
                        <Col span={16}> <Input placeholder="Basic usage" name='name' value={this.state.name} onChange={this.onHandleChange} /></Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '10px' }} >
                        <Col span={8}>Số tầng:</Col>
                        <Col span={16}> <Input placeholder="Basic usage" type='number' name='floor' value={this.state.floor} onChange={this.onHandleChange} /></Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '10px' }} >
                        <Col span={8}> Dự án</Col>
                        <Col span={16}><SelectProject project_id={this.state.project_id} getProject={this.getProject} /> </Col>
                    </Row>
                    <Row gutter={16} style={{ marginBottom: '10px' }} >
                        <Col span={8}> Địa chỉ</Col>
                        <Col span={16}> <Input placeholder="Basic usage" disabled name='localtion' value={this.state.localtion} /></Col>
                    </Row>


                    {/* <Row gutter={16} style={{ marginBottom: '10px' }} >
                        <Col span={8}> Số tầng</Col>
                        <Col span={16}> <Input placeholder="Basic usage" type='number' name='floor' value={this.state.floor} onChange={this.onHandleChange} /></Col>
                    </Row> */}

                </Modal>
            </div>
        );
    }
}

export default connect(state => ({
    token: state.auth.token
}), { addBuilding, editBuilding })(BtnAddBuilding)