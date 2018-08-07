import React, { Component } from 'react';
import { InputSearch } from '../../components/uielements/input';
import { NoteListWrapper } from './noteComponent.style';
import Scrollbars from '../../components/utility/customScrollBar.js';
import message from '../../components/feedback/message';


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

 
function filterNotes(notes, search) {
  search = change_alias(search);
  if (search) {
    return notes.filter(note => change_alias(note.name).includes(search));
  }
  return notes;
}

// function filterNotes(notes, search) {
//   search = search.toUpperCase();
//   if (search) {
//     return notes.filter(note => note.name.toUpperCase().includes(search));
//   }
//   return notes;
// }

export default class extends Component {
  constructor(props) {
    super(props)
    this.singleNote = this.singleNote.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      search: '',
    };
  }
  
  singleNote(note) {
    const { seectedId} = this.props;
    const activeClass = seectedId === note.id ? 'active' : '';
    return (
      <div className={`isoList ${activeClass} `} onClick={() => this.props.getId(note.id)} key={note.id}>
        <div
          className="isoNoteBGColor"
          style={{ width: '5px'}}
        />
        <div className="isoNoteText"  >
          <h3>{note.name}</h3>
          <span className="isoNoteCreatedDate">
            {note.localtion}
          </span>
        </div>
      </div>
    );
  }

  
  onChange(event) {
    this.setState({ search: event.target.value });
  }

  confirm = (e) => {
    message.success('Xóa thành công');
    this.props.deleteBuilding(e)
    }
  
   
  render() {
    const { search } = this.state;
    const notes = filterNotes(this.props.buildings, search);
    return (
      <NoteListWrapper className="isoNoteListWrapper">
        <InputSearch
          placeholder="Tìm kiếm tòa nhà"
          className="isoSearchNotes"
          value={search}
          onChange={this.onChange}
        />
        <div className="isoNoteList">
          <Scrollbars>
            {notes && notes.length > 0 ? (
              notes.map(note => this.singleNote(note))
            ) : (
                <span className="isoNotlistNotice">No building found</span>
              )}
          </Scrollbars>
        </div>
      </NoteListWrapper>
    );
  }
}



