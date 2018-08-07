import React, { Component } from 'react';
import IntlMessages from '../utility/intlMessages';
import { InputSearch } from '../uielements/input';
import { ContactListWrapper } from './contactList.style';
import Scrollbar from '../utility/customScrollBar';
import configs from '../../constants/configs'
import { connect } from 'react-redux'
import {searchProject} from '../../redux/actions/project'
 

// function filterContacts(projects, search) {
  
//   search = search.toUpperCase();
//   return search
//     ? projects.filter(project => project.name.toUpperCase().includes(search))
//     : projects;
// }

 class ContactList extends Component {
  constructor(props) {
    super(props);
    this.singleContact = this.singleContact.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      search: '',
    };
  }

   

  singleContact(project) {
   
    const activeClass = this.props.selectId === project.id ? 'active' : '';
    // const onChange = () => changeContact(project.id);
    return (
      <div
        key={project.id}
        className={`${activeClass} isoSingleContact`}
        onClick = { () => this.props.getId(project.id)}
      >
        <div className="isoAvatar">
          {project.images.length !== 0 ? <img alt="#" src={`${configs.url}${project.images[0].imageUrl}`} /> : ''}
        </div>
        <div className="isoContactName">
          <h3>{project.name ? project.name : 'No Name'}</h3>
        </div>
        
      </div>
    );
  }
  onChange(event) {
    this.setState({ search: event.target.value });
    this.props.searchProject(this.props.token,event.target.value, (err, data)=>{
      if(data) this.setState({projects: data.data})
    })
  }
  render() {
    const { search } = this.state;
    // const projects = filterContacts(this.props.projects, search);
    const projects = search ? this.state.projects : this.props.projects
    return (
      <ContactListWrapper className="isoContactListWrapper">
        <InputSearch
          placeholder='Tìm kiếm dự án'
          value={search}
          onChange={this.onChange}
          className="isoSearchBar"
        />
        {projects && projects.length > 0 ? (
          <div className="isoContactList">
            <Scrollbar className="contactListScrollbar">
              {projects ? projects.map(project => this.singleContact(project)) : `Không có dự án`}
            </Scrollbar>
          </div>
        ) : (
          <span className="isoNoResultMsg">
            {<IntlMessages id="Component.contacts.noOption" />}
          </span>
        )}
      </ContactListWrapper>
    );
  }
}
 
export default connect(state =>({
  token: state.auth.token
}) , {searchProject})(ContactList)