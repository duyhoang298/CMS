import { Select, message } from 'antd';
import React, { Component } from 'react'
import { getListProjects } from '../../../../redux/actions/project'
import { connect } from 'react-redux'
const Option = Select.Option;


class SelectProject extends Component {

    state = {
        listProject: [],
        project_id: '',
        localtion: ''
    }

    componentDidMount() {
        this.setState({ project_id: this.props.project_id, listProject: this.props.projects })
        this.props.getListProjects(this.props.token, (err, data) => {
            if (err) return message.error('Err load list project')
            this.setState({ listProject: this.props.projects })
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.project_id !== this.props.project_id) {
            this.setState({
                project_id: nextProps.project_id,
            });
        }
    }


    handleChange = e => {
        let project = this.state.listProject.filter(project => project.id === e)
        this.setState({
            project_id: project[0].id,
            localtion: project[0].address
        }, () => {
            this.props.getProject(this.state.project_id, this.state.localtion)
        })
    }



    showOption = listProject => {
        let result = null;
        if (this.state.listProject.length !== 0) result = listProject.map((project, index) => {
            return <Option key={index} value={project.id}>{project.name}</Option>
        })

        return result
    }

    render() {
        return <Select
            showSearch
            value={this.state.project_id}
            style={{ width: '100%' }}
            placeholder="Select a project"
            optionFilterProp="children"
            onChange={this.handleChange}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
            {this.showOption(this.state.listProject)}

        </Select>
    }
}


export default connect(state => ({
    token: state.auth.token,
    projects: state.Projects.projects
}), { getListProjects })(SelectProject)