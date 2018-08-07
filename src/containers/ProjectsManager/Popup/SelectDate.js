import { DatePicker, Col } from 'antd';
import React, { Component } from 'react'
import moment from 'moment'

const dateFormat = 'YYYY/MM/DD';


class DateRange extends Component {

    state = {
        listed_on: null,
        completed_at: null
    }

    componentDidMount(){
        this.setState({
            listed_on: this.props.listed_on,
            completed_at: this.props.completed_at
            // listed_on: null,
            // completed_at: null
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            listed_on: nextProps.listed_on,
            completed_at: nextProps.completed_at
            // listed_on: null,
            // completed_at: null
        })
    }

    onChangeStart = (date, dateString) => {
        this.setState({ listed_on: dateString }, () => {
            this.props.handleChangeTime(this.state)
        })

    }

    onChangeEnd = (date, dateString) => {
        this.setState({ completed_at: dateString }, () => {
            this.props.handleChangeTime(this.state)
        })
    }


    render() {

        return (
            <div>
                <div  >
                    <Col span={6}>Ngày khởi công</Col>
                    <Col span={18} className='mb-5' >
                        <DatePicker
                        value={this.state.listed_on  ? moment(this.state.listed_on, dateFormat) : null}
                            onChange={this.onChangeStart}
                            format={dateFormat} />
                    </Col>
                </div>
                <div>
                    <Col span={6}>Ngày hoàn thành</Col>
                    <Col span={18}>
                        <DatePicker
                        value={this.state.completed_at !==null ? moment(this.state.completed_at, dateFormat) : null}
                            onChange={this.onChangeEnd}
                            format={dateFormat} />
                    </Col>
                </div>

            </div>

        );
    }
}

export default DateRange

