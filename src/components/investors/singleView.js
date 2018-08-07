import React, { Component } from 'react';
import { ContactCardWrapper } from './contactCard.style';
import { Modal } from 'antd'
import SliderImages from '../contacts/sliderImages';

export default class extends Component {

  state = {visible: false}

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
  render() {
    const { contact } = this.props;
    const name = contact.name ? contact.name : 'No Name';

    return (
      <ContactCardWrapper className="isoContactCard"  >
        <div className="isoContactCardHead">
          <div onClick={this.showModal}>
            { contact.images && contact.images.length > 0 ? <SliderImages images={contact.images} /> : 'NO IMG'}
          </div>
        </div>
        <div className="isoContactInfoWrapper">

          <div className="isoContactCardInfos" key='name'>
            <p className="isoInfoLabel">Tên </p>
            <p className="isoInfoDetails">{name}</p>
          </div>
          <div className="isoContactCardInfos" key='email'>
            <p className="isoInfoLabel">Giới thiệu </p>
            <p className="isoInfoDetails">{contact.description}</p>
          </div>


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



