import React, { Component } from 'react';
import { Button, Icon, Row, Col } from 'antd'
import BtnAddBuilding from './Popup/Building/addBuilding';
import { connect } from 'react-redux'
import PopconfirmWrapper from './popconfirm.style';
import Popconfirms from '../../components/feedback/popconfirm';
import { findIndex } from '../../helpers/fineIndex'
import {deleteBuilding, saveDeleteBuilding} from '../../redux/actions/building'
import message from '../../components/feedback/message';
const Popconfirm = props => (
    <PopconfirmWrapper>
        <Popconfirms {...props} />
    </PopconfirmWrapper>
);


class InfoBuilding extends Component {
    
    confirm = id => {
        
        let { buildings, token, saveDeleteBuilding, deleteBuilding } = this.props
        let index = findIndex(buildings, id)
        deleteBuilding(token, id, (err, res) => {
            if (err) {
                message.error('Xóa thất bại')
            }
            else {
                message.success('Xóa thành công')
                saveDeleteBuilding({ id, index })
            }
        })
    }


    render() {
        let { building, project } = this.props
        return (
            <div className='info'>
                <div className='Btn-Edit-Building' >
                    <BtnAddBuilding title='Thêm tòa nhà' />
                    <BtnAddBuilding building={building } address={project.address} title='Sửa tòa nhà' />

                    <Popconfirm
                        title="Are you sure？"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => this.confirm(building.id)}
                    >
                        <Button ><Icon type='delete' /></Button>
                    </Popconfirm>
                </div>

                <h3 className='name' >{building.name}</h3>

                <Row gutter={16} style={{ marginBottom: '10px' }} >
                    <Col span={4}><strong>Thuộc dự án</strong></Col>
                    <strong>: </strong>{project.name}
                </Row>

                <Row gutter={16} style={{ marginBottom: '10px' }} >
                    <Col span={4}><strong>Địa chỉ: </strong></Col>
                    <strong>: </strong>{project.address}
                </Row>

                <Row gutter={16} style={{ marginBottom: '10px' }} >
                    <Col span={4}><strong>Số tầng: </strong></Col>
                    <strong>: </strong>{building.floor}
                </Row>



            </div>
        );
    }
}

export default connect(state => ({
    projects: state.Projects,
    token: state.auth.token,
    buildings: state.Building.buildings
}), { deleteBuilding, saveDeleteBuilding })(InfoBuilding)