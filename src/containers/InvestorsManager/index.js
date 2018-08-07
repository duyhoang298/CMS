import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Button, message, Icon } from 'antd';
import ContactList from '../../components/investors/contactList';
import SingleContactView from '../../components/investors/singleView';
import { ContactsWrapper } from './contacts.style';
import Scrollbar from '../../components/utility/customScrollBar.js';
import BtnAddUser from './Popup/BtnAddUser';
import { actGetInvestorRequest, actDeleteInvestorRequest, actGetListInvestor, saveDeleteInvestor } from '../../redux/actions/investor'
import './style.css'
import PopconfirmWrapper from '../ProjectsManager/popconfirm.style'
import Popconfirms from '../../components/feedback/popconfirm';
import { IconLoading, outerLoading } from '../../components/iconloading/IconLoading'

const Popconfirm = props => (
  <PopconfirmWrapper>
    <Popconfirms {...props} />
  </PopconfirmWrapper>
);




const { Content } = Layout;
class Investor extends Component {

  componentDidMount() {
    this.props.actGetListInvestor(this.props.token);
    if (this.props.users.length > 0) this.getId(this.props.users[0].id)
  }

  getId = id => {
    this.props.actGetInvestorRequest(this.props.token, id)
  }

  findIndex = (users, id) => {
    let result = -1;
    users.forEach((user, index) => {
      if (user.id === id) {
        result = index
      }
    });
    return result
  }




  confirm = id => {
    let { actDeleteInvestorRequest, users, token, saveDeleteInvestor } = this.props
    let index = this.findIndex(users, id)
    console.log('index', index);
    actDeleteInvestorRequest(token, id, (err, res) => {
      if (err) {
        message.error('Xóa thất bại')
      }
      else {
        message.success('Xóa thành công')
        saveDeleteInvestor({ id, index })
      }

    })
  }




  render() {
    let { seectedId } = this.props;
    return (
      <ContactsWrapper
        className="isomorphicContacts"
        style={{ background: 'none' }}
      >

        <div className="isoContactListBar">
          <ContactList contacts={this.props.users} getId={this.getId} seectedId={seectedId} />
        </div>



        <Layout className="isoContactBoxWrapper" style={outerLoading} >
           {this.props.seectedId !== this.props.user.id ? <IconLoading /> : 
           <div>
          {this.props.users.length !== 0 ?
            <Content className="isoContactBox">
              <div className="isoContactControl" >
                <BtnAddUser btn="plus" />
                <BtnAddUser btn="edit" user={this.props.user} />
                <Popconfirm
                  title="Bạn chắc chắn muốn xóa？"
                  okText="Có"
                  cancelText="Không"
                  onConfirm={() => this.confirm(this.props.user.id)}
                >
                  <Button type="dashed"><Icon type="close" /></Button>
                </Popconfirm>
              </div>

              <Scrollbar className="contactBoxScrollbar" >

                <SingleContactView contact={this.props.user} />

              </Scrollbar>
            </Content>
            :
            <Content className="isoContactBox">
              <div className="isoContactControl">
                <BtnAddUser btn="plus" addUser={this.addUser} />
              </div>
            </Content>
          }
          </div>
           }
        </Layout>
      </ContactsWrapper>
    );
  }
}


export default connect(state => ({
  users: state.Investor.users,
  seectedId: state.Investor.seectedId,
  user: state.Investor.user,
  token: state.auth.token
}), { actGetInvestorRequest, actDeleteInvestorRequest, actGetListInvestor, saveDeleteInvestor })(Investor)
