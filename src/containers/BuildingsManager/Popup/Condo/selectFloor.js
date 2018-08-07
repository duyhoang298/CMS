import React, { Component } from 'react';
import { Select } from 'antd';
import { connect } from 'react-redux'
const Option = Select.Option;

class SelectFloor extends Component {

    state = {
        floors: []
    }


    componentDidMount() {
        this.setState({
            floors: this.props.floor
        });
    }

    componentWillReceiveProps(nextProps) {
            this.setState({
                floors: nextProps.floor
            });

    }


    handleChange = e => {
        // this.setState({ floors: e });
        this.props.getFloors(e)
    }



    render() {
        let {  floors } = this.props
        return (
            <Select
                mode="multiple"
                placeholder="Chọn tầng"
                value={this.state.floors}
                onChange={this.handleChange}
                style={{ width: '100%' }}
                disabled={this.props.disable}
            >
                {floors && floors.map(floor => {
                    return <Option key={floor.id} value={floor.id}  >{floor.name} </Option>
                })}
            </Select>
        );
    }
}

export default connect(state => ({
    floors: state.Building.floors
}), {})(SelectFloor)