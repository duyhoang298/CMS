import React, { Component } from 'react';
import { Modal, Button, Icon, Input, message } from 'antd'
import UploadFile from '../../../components/upload/UploadFile';
import { actAddInvestorRequest, actEditInvestorRequest } from '../../../redux/actions/investor'
import { connect } from 'react-redux'

const clearData = {
  visible: false,
  listFile: [],
  listRmFile: [],
  name: '',
  id: '',
  description: '',
  confirmLoading: false
}

class BtnAddUser extends Component {
  state = { ...clearData }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  componentDidMount() {
    let { user } = this.props
    if (user) this.setState({ ...user })
  }

  componentWillReceiveProps(nextProps) {
    let { user } = nextProps
    if (user) {
      this.setState({ ...user })
    }
  }

  handleOk = (e) => {
    if(!(this.state.name && this.state.description)) return message.warning('Vui lòng nhập đầy đủ thông tin')

    const formData = new FormData();
    formData.append('developer[name]', this.state.name);
    formData.append('developer[description]', this.state.description)

    if (this.state.listFile.length > 0) {
      this.state.listFile.forEach(file => {
        formData.append("developer[avatar_path][]", file.file)
      })
    }

    if (this.state.listRmFile.length > 0) {
      this.state.listRmFile.forEach(id => {
        formData.append(`developer[delete_images][${id}]`, true)
      })
    }
    this.setState({ confirmLoading: true })
    if (this.props.user) {
      this.props.actEditInvestorRequest(this.props.token, formData, this.props.user.id, (err, res) => {
        this.setState({ 
          visible: false,
          confirmLoading: false,
          listFile:[],
          listRmFile:[]
         })
      })
    }

    else this.props.actAddInvestorRequest(this.props.token, formData, (err, res) => {
      this.setState({ ...clearData })
    })

  }



handleCancel = (e) => {
  this.setState({
    visible: false,
  }, () => {
    if (!this.props.user)
      return this.setState({
        name: '',
        description: '',
      })

    this.setState({
      ...this.props.user,
    })
  });

}

handleChange = e => {
  let name = e.target.name;
  let value = e.target.value;

  this.setState({
    [name]: value
  })
}

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
      <Button type="button" onClick={this.showModal}>
        <Icon type={this.props.btn} />{' '}
      </Button>

      <Modal
        title={this.props.btn === 'plus' ? 'THÊM CHỦ ĐẦU TƯ' : 'SỬA CHỦ ĐẦU TƯ'}
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        confirmLoading={this.state.confirmLoading}
      >
        Tên: <Input style={{ marginBottom: '10px' }} value={this.state.name} placeholder="Nhập tên" name='name' onChange={this.handleChange} />
        Giới thiệu: <Input style={{ marginBottom: '10px' }} value={this.state.description} placeholder="Mô tả" name='description' onChange={this.handleChange} />
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

export default connect(state=>({
  token: state.auth.token
}) , {actAddInvestorRequest, actEditInvestorRequest})(BtnAddUser)