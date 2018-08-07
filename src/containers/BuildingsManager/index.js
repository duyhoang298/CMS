import React, { Component } from 'react';
import NoteList from './noteList';
import NoteComponentWrapper from './noteComponent.style';
import { connect } from 'react-redux';
import './style.css'
import {
  getListBuilding,
  getDetailBuilding,
  getListFloor,
  getListCondosByBuilding
} from '../../redux/actions/building'
import { getDetailProject } from '../../redux/actions/project'
import Floor from './floor'
import InfoBuilding from './infoBuilding';

import { IconLoading, outerLoading } from '../../components/iconloading/IconLoading'

class Notes extends Component {

  state = {
    showFloor: true,
    project: ''
  }


  componentDidMount() {
    this.props.getListBuilding(this.props.token)
    this.props.getDetailProject(this.props.token, this.props.building.project_id, (err, res) => {
      if (err) {
        return console.log(err);
      }
      if (res && res.data.length > 0) {

        this.setState({ project: res.data }, () => {
          this.props.getListFloor(this.props.token, this.state.project.id, (err, res) => {
            this.setState({ floors: res.data });

            //get list condos
            if (res && res.data.length > 0)
              this.props.getListCondosByBuilding(this.props.token, this.props.seectedId)
          })
        });
      }

    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.floors !== this.state.floors) this.setState({ floors: nextProps.floors })
    if (this.props.building !== nextProps.building) {

      this.props.getDetailProject(nextProps.token, nextProps.building.project_id, (err, res) => {
        if (err) {
          return console.log(err);
        }
        if (res && res.data !== null) {
          this.setState({ project: res.data }, () => {
            this.props.getListFloor(this.props.token, this.props.building.id, (err, res) => {
              if (res && res.data !== null)
                this.setState({ floors: res.data });
              //get list condos
              this.props.getListCondosByBuilding(this.props.token, nextProps.seectedId)
            })
          });
        }

      })
    }
  }



  updateNote = (event) => {
    const { editNote, selectedId } = this.props;
    editNote(selectedId, event.target.value);
  }


  findIndex = (buildings, id) => {
    let result = -1;
    buildings.forEach((building, index) => {
      if (building.id === id) {
        result = index
      }
    });
    return result
  }

  getId = id => {
    this.props.getDetailBuilding(this.props.token, id)
  }



  showFloors = floors => {
    var result = null;
    if (floors)
      result = floors.map((floor, index) => {
        if (floor.building_id === this.props.seectedId) {
          return <Floor key={index} floor={floor} />
        } else return null
      })
    return result
  }



  handleToggleContent = () => {
    this.setState({
      showFloor: !this.state.showFloor
    })
  }


  render() {

    const { building, buildings, seectedId } = this.props
    return (
      <div>

        <NoteComponentWrapper className="isomorphicNoteComponent">
          <div style={{ width: '340px' }} className="isoNoteListSidebar">
            <NoteList
              buildings={buildings}
              getId={this.getId}
              seectedId={seectedId}
              deleteBuilding={this.deleteBuilding}

            />
          </div>
          {building ?

            <div className='layout' style={outerLoading}>

              {building.id !== seectedId || building.project_id !== this.state.project.id ? <IconLoading /> :
                <div>
                  <InfoBuilding project={this.state.project} building={building} />

                  <div className='content' >
                    {/* <Scrollbars> */}
                    {this.showFloors(this.state.floors)}
                    {/* </Scrollbars> */}
                  </div>

                </div>
              }

            </div>
            :
            <h3>Không có dữ liệu để hiển thị</h3>
          }
        </NoteComponentWrapper>
      </div>
    );
  }
}



export default connect(state => ({
  buildings: state.Building.buildings,
  seectedId: state.Building.seectedId,
  building: state.Building.building,
  floors: state.Building.floors,
  // condos: state.Condos,
  token: state.auth.token
}), {
    getListCondosByBuilding,
    getListFloor,
    getListBuilding,
    getDetailBuilding,
    getDetailProject,
  })(Notes);

