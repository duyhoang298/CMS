import React from 'react'
import { Modal, Button, Input, Row, Col, Icon, message } from 'antd';
import DateRange from './SelectDate';
import SelectAddress from './SelectAddress';
import _ from 'lodash'
import { addProject, updateProject } from '../../../redux/actions/project'
import { connect } from 'react-redux'
import UploadFile from '../../../components/upload/UploadFile'

const clearData = {
  confirmLoading: false,
  visible: false,
  name: '',
  developer: '',
  address: '',
  tenure: '',
  listed_on: null,
  completed_at: null,
  city_id: '',
  ward_id: '',
  district_id: '',
  images: [],
  listFile: [],
  listRmFile: []
}

class BtnAddProject extends React.Component {
  state = { ...clearData }

  componentDidMount() {

    let { editProject } = this.props
    if (editProject) {
      this.setState({ ...editProject })
    }
  }


  componentWillReceiveProps(nextProps) {
    let { editProject } = nextProps
    this.setState({ ...editProject })
  }

  showModal = () => {
    this.setState({
      visible: true,
    });

  }

  handleOk = () => {
    let { name, address, tenure, listed_on, completed_at, developer, city_id, ward_id, district_id } = this.state
    if (!(name && address && tenure && listed_on && completed_at && developer)) return message.warning('Vui lòng nhập đầy đủ thông tin')

    let dataForm = new FormData();
    dataForm.append('project[name]', this.state.name)
    dataForm.append('project[address]', this.state.address)
    dataForm.append('project[tenure]', this.state.tenure)
    dataForm.append('project[listed_on]', _.kebabCase(this.state.listed_on))
    dataForm.append('project[completed_at]', _.kebabCase(this.state.completed_at))
    dataForm.append('project[developer]', this.state.developer)
    if (this.state.listFile.length > 0) {
      this.state.listFile.forEach(file => {
        dataForm.append("project[new_image_path][]", file.file)
      })
    }

    this.setState({ confirmLoading: true })

    if (this.props.editProject) {
      if (this.state.listRmFile.length > 0) {
        this.state.listRmFile.forEach(id => {
          dataForm.append(`project[delete_images][${id}]`, true)
        })
      }
      this.props.updateProject(this.props.token, dataForm, this.props.editProject.id, (err, data) => {
        this.setState({
          // ...clearData,
          confirmLoading: false,
          visible: false,
          listFile: [],
          listRmFile: []
        })
      })
    }
    else {
      if(!(city_id && ward_id && district_id))return message.warning('Vui lòng nhập đầy đủ thông tin')
      dataForm.append('project[city_id]', this.state.city_id)
      dataForm.append('project[district_id]', this.state.district_id)
      dataForm.append('project[ward_id]', this.state.ward_id)

      this.props.addProject(this.props.token, dataForm, ((err, res) => {
        this.setState({ ...clearData })
      }))
    }
  }

  handleCancel = () => {

    let { editProject } = this.props

    if (editProject) {
      return this.setState({
        visible: false,
        ...editProject,
        listRmFile: []
      })
    }

    this.setState({
      ...clearData
    });
  }

  handleChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    })
  }



  handleChangeDeveloper = val => {
    this.setState({ developer: val })
  }

  handleChangeTime = val => {
    this.setState({
      listed_on: val.listed_on,
      completed_at: val.completed_at
    })
  }

  getCity = e => this.setState({ city_id: e })
  getDistrict = e => this.setState({ district_id: e })
  getWard = e => this.setState({ ward_id: e })


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
    const { visible, confirmLoading } = this.state;
    return (
      <div>
        {this.props.editProject ? <Button onClick={this.showModal}><Icon type="edit" /></Button> : <Button type="primary" onClick={this.showModal} ><Icon type="plus" />   </Button>}

        <Modal title={this.props.editProject ? 'SỬA DỰ ÁN' : 'THÊM DỰ ÁN'}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          confirmLoading={confirmLoading}
        >

          <div>
            <Row className='mb-5'>
              <Col span={6}>Tên dự án</Col>
              <Col span={18}><Input name='name' value={this.state.name} onChange={this.handleChange} /></Col>
            </Row>

            <Row className='mb-5'>
              <Col span={6}>Nhiệm kỳ</Col>
              <Col span={18}><Input name='tenure' value={this.state.tenure} onChange={this.handleChange} /></Col>
            </Row>

            <Row className='mb-5'>
              <Col span={6}>Chủ đầu tư</Col>
              <Col span={18}><Input name='developer' value={this.state.developer} onChange={this.handleChange} /></Col>
              {/* <Col span={18}>  <SelectDev  handleChangeDeveloper={this.handleChangeDeveloper} value={this.state.developer_id}  /> </Col> */}
            </Row>



            <Row >
              <Col span={6}>Địa chỉ</Col>
              <Col span={18} className='mb-5'>
                <Input name='address' value={this.state.address} onChange={this.handleChange} />
              </Col>
            </Row>
              {
                this.props.editProject ? '' :
                  <SelectAddress
                    getCity={this.getCity}
                    getDistrict={this.getDistrict}
                    getWard={this.getWard}
                    resetLocate={this.state.visible}
                  />

              }
            <Row className='mb-5'>
              <DateRange listed_on={this.state.listed_on} completed_at={this.state.completed_at} handleChangeTime={this.handleChangeTime} />
            </Row>

          </div>

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
  token: state.auth.token
}), { addProject, updateProject })(BtnAddProject)
