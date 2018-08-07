import React, { Component } from 'react';
import { Select, Row, Col } from 'antd'
import { connect } from 'react-redux'
import { getListCities, getListDistric, getListWards } from '../../../redux/actions/locate'

class SelectAddress extends Component {

    state = {
        listCities: [],
        listDistricts: [],
        listWards: []
    }


    componentDidMount() {
        this.props.getListCities(this.props.token, (err, data) => {
            if (err) {
                return console.log(err)
            }
            this.setState({ listCities: data.data })
        })
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.resetLocate) {
            this.setState({
                listDistricts:[],
                listWards:[],
                city_id:null,
                district_id:null,
                ward_id:null,

            })
            
        }
    }

    showCities = data => {
        let result = null;

        if (data) {
            result = data.map(city => {
                return <Select.Option key={city.id} value={city.id}>{city.name}</Select.Option>
            })
        }
        return result
    }
    showDistrics = data => {
        let result = null;

        if (data) {
            result = data.map(city => {
                return <Select.Option key={city.id} value={city.id}>{city.name}</Select.Option>
            })
        }
        return result
    }
    showWards = data => {
        let result = null;

        if (data) {
            result = data.map(city => {
                return <Select.Option key={city.id} value={city.id}>{city.name}</Select.Option>
            })
        }
        return result
    }

    handleChangeCity = e => {
        this.setState({ city_id: e, listWards:[], district_id: null, ward_id: null })
        this.props.getCity(e)
        this.props.getDistrict(null);
        this.props.getWard(null);
        this.props.getListDistric(this.props.token, e, (err, data) => {
            if (err) {
                return console.log(err)
            }
            // this.setState({}, () => {
            this.setState({ listDistricts: data.data })
          
            // })

        })
    }

    handleChangeDistrict = e => {
        this.setState({ district_id: e,  ward_id: null, listWards:[] })
        this.props.getDistrict(e)
        this.props.getWard(null);
        this.props.getListWards(this.props.token, e, (err, data) => {
            if (err) {
                return console.log(err)
            }
            this.setState({ listWards: data.data })
    

        })
    }

    handleChangeWard = e => {
        this.setState({ ward_id: e })
        this.props.getWard(e)
    }
    render() {

        let { listCities, listDistricts, listWards } = this.state

        return (
            <Row className='mb-5'>
                <Col span={6}>Tỉnh/Thành Phố</Col>
                <Col span={18}>
                    <Select className='mb-5' value={this.state.city_id} name='city_id' style={{ width: '200px' }} onChange={this.handleChangeCity} >
                        {this.showCities(listCities)}
                    </Select>


                </Col>

                <Col span={6}>Quận/Huyện</Col>
                <Col span={18}>
                    <Select className='mb-5' value={this.state.district_id} style={{ width: '200px' }} name='district_id' onChange={this.handleChangeDistrict} >
                        {this.showDistrics(listDistricts)}
                    </Select>
                </Col>

                <Col span={6}>Quận/Huyện</Col>
                <Col span={18}>
                    <Select className='mb-5'  value={this.state.ward_id} style={{ width: '200px' }} name='ward_id' onChange={this.handleChangeWard}  >
                        {this.showWards(listWards)}
                    </Select>
                </Col>

            </Row>
        );
    }
}

export default connect(state => ({
    token: state.auth.token
}), { getListCities, getListDistric, getListWards })(SelectAddress)