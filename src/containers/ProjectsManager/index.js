import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Icon, message } from 'antd';
import Button from '../../components/uielements/button';
import ContactList from '../../components/contacts/contactList';
import SingleContactView from '../../components/contacts/singleView';
import { ContactsWrapper } from './contacts.style';
import Scrollbar from '../../components/utility/customScrollBar.js';
import BtnAddProject from './Popup/BtnAddProject';
import {
  getListProjects,
  getDetailProject,
  deleteProject,
  saveDeleteProject
} from '../../redux/actions/project'
import './style.css'
import PopconfirmWrapper from './popconfirm.style';
import Popconfirms from '../../components/feedback/popconfirm';
import { findIndex } from '../../helpers/fineIndex'
import { IconLoading, outerLoading } from '../../components/iconloading/IconLoading'

const Popconfirm = props => (
  <PopconfirmWrapper>
    <Popconfirms {...props} />
  </PopconfirmWrapper>
);


class Contacts extends Component {

  state = {
    visiable: false
  }

  componentDidMount() {
    let { projects, token, getDetailProject, getListProjects } = this.props
    if (projects.length > 0) {
      getDetailProject(token, projects[0].id)
    }
    getListProjects(token, (err, res) => {
      if (err) {
        return console.log(err);
      }
      // this.props.getDetailProject(this.props.token, res.data[0].id)
    })
  }

  getId = id => {
    this.props.getDetailProject(this.props.token, id)

  }


  getProjectSelected = () => {
    let index = findIndex(this.props.projects, this.props.selectId);
    let result = this.props.projects[index]
    return result
  }

   

  confirm = id => {

    let { deleteProject, saveDeleteProject, projects, token } = this.props
    let index = findIndex(projects, id)

    deleteProject(token, id, (err, res) => {
      if (err) {
        message.error('Xóa thất bại')
      }
      else {
        message.success('Xóa thành công')
        saveDeleteProject({ id, index })
      }
    })
  }

  render() {
    return (
      <ContactsWrapper
        className="isomorphicContacts"
        style={{ background: 'none' }}
      >
        <div className="isoContactListBar">
          <ContactList projects={this.props.projects} selectId={this.props.selectId} getId={this.getId} />
        </div>
        <Layout className="isoContactBoxWrapper" style={outerLoading} >
          {this.props.project.id !== this.props.selectId ? <IconLoading /> : <div> 

          <div className="isoContactControl">
            <BtnAddProject />
            {this.props.projects.length > 0 ?
              <BtnAddProject editProject={this.props.project} />
              :
              ''
            }
            {this.props.projects.length > 0 ?
              <Popconfirm
                title="Bạn chắc chắn muốn xóa？"
                okText="Có"
                cancelText="Không"
                onConfirm={() => this.confirm(this.props.project.id)}

              >
                <Button type="dashed"><Icon type="close" /></Button>
              </Popconfirm>
              :
              ''
            }
          </div>


          <Scrollbar className="contactBoxScrollbar">



            {this.props.project ? <SingleContactView contact={this.props.project} /> : 'Không có dự án để hiện thị'}
          </Scrollbar>
          </div>}
        </Layout>
      </ContactsWrapper>
    );
  }
}

export default connect(state => ({
  projects: state.Projects.projects,
  selectId: state.Projects.seectedId,
  token: state.auth.token,
  project: state.Projects.project
}), { getDetailProject, getListProjects, deleteProject, saveDeleteProject })(Contacts)