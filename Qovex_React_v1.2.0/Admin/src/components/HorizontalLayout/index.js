import PropTypes from 'prop-types'
import React, { Component } from "react"
import { connect } from "react-redux"

import {
  changeLayout,
  changeTopbarTheme,
  changeLayoutWidth,
  changeLayoutTheme
} from "../../store/actions"

// Other Layout related Component

import Header from "./Header"
import Footer from "./Footer"
import Rightbar from "../CommonForBoth/Rightbar"
import withRouter from '../Common/withRouter'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isMenuOpened: false,
    }
  }

  componentDidMount() {
    if (this.props.isPreloader === true) {
      document.getElementById("preloader").style.display = "block"
      document.getElementById("status").style.display = "block"

      setTimeout(function () {
        document.getElementById("preloader").style.display = "none"
        document.getElementById("status").style.display = "none"
      }, 2500)
    } else {
      document.getElementById("preloader").style.display = "none"
      document.getElementById("status").style.display = "none"
    }

    // Scrollto 0,0
    window.scrollTo(0, 0)

    const title = this.props.router.location.pathname;
    let currentage = title.charAt(1).toUpperCase() + title.slice(2)

    document.title =
      currentage + " | Qovex - React Js Admin Dashboard Template"

    this.props.changeLayout("horizontal")
    // this.props.changeLayoutTheme("dark")
    if (this.props.theme) {
      this.props.changeLayoutTheme(this.props.theme)
    }
    if (this.props.topbarTheme) {
      this.props.changeTopbarTheme(this.props.topbarTheme)
    }
    if (this.props.layoutWidth) {
      this.props.changeLayoutWidth(this.props.layoutWidth)
    }
  }

  /**
   * Opens the menu - mobile
   */
  openMenu = () => {
    this.setState({ isMenuOpened: !this.state.isMenuOpened })
  }
  render() {
    return (
      <React.Fragment>
        <div id="preloader">
          <div id="status">
            <div className="spinner-chase">
              <div className="chase-dot"></div>
              <div className="chase-dot"></div>
              <div className="chase-dot"></div>
              <div className="chase-dot"></div>
              <div className="chase-dot"></div>
              <div className="chase-dot"></div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div id="layout-wrapper">
            <header id="page-topbar">
              <Header
                theme={this.props.topbarTheme}
                isMenuOpened={this.state.isMenuOpened}
                openLeftMenuCallBack={this.openMenu}
              >
              </Header>

            </header>
            <div className="main-content">
              {this.props.children}
              <Footer />
            </div>

          </div>

        </div>
        {this.props.showRightSidebar ? <Rightbar /> : null}
      </React.Fragment>
    )
  }
}

Layout.propTypes = {
  changeLayout: PropTypes.func,
  changeLayoutWidth: PropTypes.func,
  changeTopbarTheme: PropTypes.func,
  children: PropTypes.object,
  isPreloader: PropTypes.any,
  layoutWidth: PropTypes.any,
  location: PropTypes.object,
  showRightSidebar: PropTypes.any,
  topbarTheme: PropTypes.any,
  changeLayoutTheme: PropTypes.func,
  theme: PropTypes.any,
}

const mapStatetoProps = state => {
  return {
    ...state.Layout,
  }
}
export default connect(mapStatetoProps, {
  changeTopbarTheme,
  changeLayout,
  changeLayoutWidth,
  changeLayoutTheme
})(withRouter(Layout))
