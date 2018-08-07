import React, { Component } from 'react';
import IntlMessages from '../utility/intlMessages';
import { InputSearch } from '../uielements/input';
import { PropTypes } from 'prop-types';
import { ContactListWrapper } from './contactList.style';
import Scrollbar from '../utility/customScrollBar';
import {Avatar} from 'antd'
import configs from '../../constants/configs'


var change_alias = (alias) =>  {
  var str = alias;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
  str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
  str = str.replace(/đ/g,"d");
  // str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
  str = str.replace(/ + /g," ");
  str = str.trim(); 
  return str;
}

function filterContacts(notes, search) {
  search = change_alias(search);
  if (search) {
    return notes.filter(note => change_alias(note.name).includes(search));
  }
  return notes;
}



// function filterContacts(contacts, search) {
//   search = search.toUpperCase();
//   return search
//     ? contacts.filter(contact => contact.name.toUpperCase().includes(search))
//     : contacts;
// }

export default class ContactList extends Component {
  constructor(props) {
    super(props);
    this.singleContact = this.singleContact.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      search: '',
    };
  }
  singleContact(contact) {
    const activeClass = this.props.seectedId === contact.id ? 'active' : '';
    return (
      <div
        key={Math.random()}
        className={`${activeClass} isoSingleContact`}
        onClick = { () => this.props.getId(contact.id)}
      >
        <div className="isoAvatar">
          {contact.images.length > 0 ? <img alt="#" src={configs.url + contact.images[0].imageUrl} /> : <Avatar  size="large" icon="user" />}
        </div>
        <div className="isoContactName">
          <h3>{contact.name ? contact.name : 'No Name'}</h3>
        </div>
        {contact.status ? <div className='isoDeleteBtn green-dot'></div> : null}
        {contact.ban ? <div className='isoDeleteBtn  red-dot'></div> : null}
      </div>
    );
  }
  onChange(event) {
    this.setState({ search: event.target.value });
  }
  render() {
    const { search } = this.state;
    const contacts = filterContacts(this.props.contacts, search);
    return (
      <ContactListWrapper className="isoContactListWrapper">
        <InputSearch
          placeholder='Tìm kiếm'
          value={search}
          onChange={this.onChange}
          className="isoSearchBar"
        />
        {contacts && contacts.length > 0 ? (
          <div className="isoContactList">
            <Scrollbar className="contactListScrollbar">
              {contacts.map(contact => this.singleContact(contact))}
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

ContactList.contextTypes = {
  intl: PropTypes.object.isRequired,
};
