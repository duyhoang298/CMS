import React, { Component } from 'react';
import { connect } from 'react-redux';
import clone from 'clone';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import Scrollbars from '../../components/utility/customScrollBar.js';
import Menu from '../../components/uielements/menu';
import SidebarWrapper from './sidebar.style';

import {
  toggleOpenDrawer,
  changeOpenKeys,
  changeCurrent,
  toggleCollapsed,
} from '../../redux/actions/app';
import Logo from '../../components/utility/logo';
import { getCurrentTheme } from '../ThemeSwitcher/config';
import { themeConfig } from '../../config';

const { Sider } = Layout;

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.onOpenChange = this.onOpenChange.bind(this);
  }

  componentDidMount(){
    this.props.changeCurrent(["investors"]);
  }

  handleClick(e) {
    this.props.changeCurrent([e.key]);
    if (this.props.app.view === 'MobileView') {
      setTimeout(() => {
        this.props.toggleCollapsed();
        this.props.toggleOpenDrawer();
      }, 100);
    }
  }
  onOpenChange(newOpenKeys) {
    const { app, changeOpenKeys } = this.props;
    const latestOpenKey = newOpenKeys.find(
      key => !(app.openKeys.indexOf(key) > -1)
    );
    const latestCloseKey = app.openKeys.find(
      key => !(newOpenKeys.indexOf(key) > -1)
    );
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    changeOpenKeys(nextOpenKeys);
  }
  getAncestorKeys = key => {
    const map = {
      sub3: ['sub2'],
    };
    return map[key] || [];
  };

  render() {
    const { url, app, toggleOpenDrawer } = this.props;
    const customizedTheme = getCurrentTheme('sidebarTheme', themeConfig.theme);
    const collapsed = clone(app.collapsed) && !clone(app.openDrawer);
    const { openDrawer } = app;
    const mode = collapsed === true ? 'vertical' : 'inline';
    const onMouseEnter = event => {
      if (openDrawer === false) {
        toggleOpenDrawer();
      }
      return;
    };
    const onMouseLeave = () => {
      if (openDrawer === true) {
        toggleOpenDrawer();
      }
      return;
    };
    const scrollheight = app.height;
    const styling = {
      backgroundColor: customizedTheme.backgroundColor,
    };
    const submenuColor = {
      color: customizedTheme.textColor,
    };
    return (
      <SidebarWrapper>
        <Sider
          trigger={null}
          collapsible={true}
          collapsed={collapsed}
          width="240"
          className="isomorphicSidebar"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={styling}
        >
          <Logo collapsed={collapsed} />
          <Scrollbars style={{ height: scrollheight - 70 }}>
            <Menu
              onClick={this.handleClick}
              theme="dark"
              mode={mode}
              openKeys={collapsed ? [] : app.openKeys}
              selectedKeys={app.current}
              onOpenChange={this.onOpenChange}
              className="isoDashboardMenu"
            >
            <Menu.Item key="investors">
                <Link to={`${url}/investors`}>
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="fa  fa-user-secret" />
                    <span className="nav-text">
                      Quản lý chủ đầu tư
                    </span>
                  </span>
                </Link>
              </Menu.Item>
              
              <Menu.Item key="projects">
                <Link to={`${url}/projects`}>
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="fa fa-building-o" />
                    <span className="nav-text">
                      Quản lý dự án
                    </span>
                  </span>
                </Link>
              </Menu.Item>

              <Menu.Item key="buildings">
                <Link to={`${url}/buildings`}>
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="fa fa-building" />
                    <span className="nav-text">
                      Quản lý tòa nhà
                    </span>
                  </span>
                </Link>
              </Menu.Item>

              

              <Menu.Item key="users">
                <Link to={`${url}/users`}>
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="fa fa-user" />
                    <span className="nav-text">
                    Quản lý thành viên
                    </span>
                  </span>
                </Link>
              </Menu.Item>

              {/* <Menu.Item key="blankPage">
                <Link to={`${url}/blankPage`}>
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="ion-document" />
                    <span className="nav-text">
                      <IntlMessages id="sidebar.blankPage" />
                    </span>
                  </span>
                </Link>
              </Menu.Item> */}
            </Menu>
          </Scrollbars>
        </Sider>
      </SidebarWrapper>
    );
  }
}

export default connect(
  state => ({
    app: state.App,
  }),
  { toggleOpenDrawer, changeOpenKeys, changeCurrent, toggleCollapsed }
)(Sidebar);
