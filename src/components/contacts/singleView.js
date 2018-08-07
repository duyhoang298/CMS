import React, { Component } from 'react';
import { ContactCardWrapper } from './contactCard.style';
import { Modal } from 'antd'
import './carosel.css'
import SliderImages from './sliderImages';

export default class extends Component {

  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  getTime = date => {
    let result = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    console.log(result);
    return result
  }

  render() {
    const { contact } = this.props;
    // const name = 'Hình ảnh';


    return (
      <ContactCardWrapper className="isoContactCard">
        <div className="isoContactCardHead">
          {/* <div className="isoPersonImage"> */}
          <div onClick={this.showModal}>
            {contact.images.length > 0 ? <SliderImages images={contact.images} /> : 'NO IMG'}
          </div>
          {/* <h1 className="isoPersonName">{name}</h1> */}
        </div>
        <div className="isoContactInfoWrapper">
          <div className="isoContactCardInfos">
            <p className="isoInfoLabel">Tên dự án</p>
            <p className="isoInfoDetails">{contact.name}</p>
          </div>
          <div className="isoContactCardInfos">
            <p className="isoInfoLabel">Chủ đầu tư</p>
            <p className="isoInfoDetails">{contact.developer}</p>
          </div>

          <div className="isoContactCardInfos">
            <p className="isoInfoLabel">Địa chỉ</p>
            <p className="isoInfoDetails">{contact.address}</p>
          </div>
          {
            contact.listed_on && contact.completed_at
              ?
              <div>
                <div className="isoContactCardInfos">
                  <p className="isoInfoLabel">Khởi công</p>
                  <p className="isoInfoDetails">{contact.listed_on}</p>
                </div>
                <div className="isoContactCardInfos">
                  <p className="isoInfoLabel">Hoàn thành</p>
                  <p className="isoInfoDetails">{contact.completed_at}</p>
                </div>
              </div>
              :
              ''
          }

          <div className="isoContactCardInfos">
            <p className="isoInfoLabel">Nhiệm kỳ</p>
            <p className="isoInfoDetails">{contact.tenure}</p>
          </div>
          {/* <div className="isoContactCardInfos">
            <p className="isoInfoLabel">Ngày thêm</p>
            <p className="isoInfoDetails">{contact.install_at}</p>
          </div> */}
          {
            contact.update_at ?
              <div className="isoContactCardInfos">
                <p className="isoInfoLabel">Cập nhật </p>
                <p className="isoInfoDetails">{contact.update_at}</p>
              </div>
              : ''
          }

          {/* <div className="isoContactCardInfos">
            <p className="isoInfoLabel">Giới thiệu</p>
            <p className="isoInfoDetails">{contact.description}</p>
          </div> */}

          <Modal
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            closable={false}
            footer={null}
            bodyStyle={{ padding: 0 }}
            width='700px'
          >
            {contact.images.length > 0 ? <SliderImages images={contact.images} view={true} /> : 'NO IMG'}
          </Modal>

        </div>
      </ContactCardWrapper>

    );
  }
}
