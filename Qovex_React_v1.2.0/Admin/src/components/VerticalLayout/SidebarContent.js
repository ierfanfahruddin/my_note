import PropTypes from "prop-types"
import React, { useEffect, useRef , useCallback} from "react"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"
import withRouter from "../Common/withRouter"

const SidebarContent = (props) => {
  const ref = useRef()
  const activateParentDropdown = useCallback((item) => {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }
    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement
      if (parent2) {
        parent2.classList.add("mm-show") // ul tag
        const parent3 = parent2.parentElement // li tag
        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false
    }
    scrollElement(item);
    return false
  }, []);
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.router.location.pathname

    const initMenu = () => {
      new MetisMenu("#side-menu")
      let matchingMenuItem = null
      const ul = document.getElementById("side-menu")
      const items = ul.getElementsByTagName("a")
      let itemsArray = [...items]; // converts NodeList to Array
      removeActivation(itemsArray);
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i]
          break
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem)
      }
    }
    initMenu()
  }, [props.router.location.pathname, activateParentDropdown])
  useEffect(() => {
    ref.current.recalculate()
  }, []);
  const scrollElement = (item) => {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  const removeActivation = (items) => {
    let actiItems = items.filter((x) => x.classList.contains("active"));

    actiItems.forEach((item) => {
      if (item.classList.contains("menu-link")) {
        if (!item.classList.contains("active")) {
          item.setAttribute("aria-expanded", false);
        }
        if (item.nextElementSibling) {
          item.nextElementSibling.classList.remove("show");
        }
      }
      if (item.classList.contains("nav-link")) {
        if (item.nextElementSibling) {
          item.nextElementSibling.classList.remove("show");
        }
        item.setAttribute("aria-expanded", false);
      }
      item.classList.remove("active");
    });
  };

  return (
    <React.Fragment>
      <SimpleBar ref={ref} className="vertical-simplebar">
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")} </li>
            <li>
              <Link to="/#" className="waves-effect">
                <i className="mdi mdi-airplay"></i><span className="badge rounded-pill bg-info float-end">2</span>
                <span>{props.t("Dashboard")}</span>
              </Link>
              <ul className="sub-menu">
                <li><Link to="/dashboard">{props.t("Dashboard")} 1</Link></li>
                <li><Link to="/dashboard2">{props.t("Dashboard")} 2</Link></li>
              </ul>
            </li>

            <li>
              <Link to="/calendar" className=" waves-effect">
                <i className="mdi mdi-calendar-text"></i>
                <span>{props.t("Calendar")}</span>
              </Link>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="mdi mdi-inbox-full"></i>
                <span>{props.t("Email")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/email-inbox">{props.t("Inbox")}</Link>
                </li>
                <li>
                  <Link to="/email-read">{props.t("Read Email")} </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="mdi mdi-calendar-check"></i>
                <span>{props.t("Tasks")}</span>
              </Link>
              <ul className="sub-menu">
                <li><Link to="/tasks-list">{props.t("Task List")}</Link></li>
                {/* <li><Link to="/tasks-kanban">{props.t("Kanban Board")}</Link></li> */}
                <li><Link to="/tasks-create">{props.t("Create Task")}</Link></li>
              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="mdi mdi-account-circle-outline"></i>
                <span>{props.t("Pages")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/pages-login">{props.t("Login")}</Link>
                </li>
                <li>
                  <Link to="/pages-register">{props.t("Register")}</Link>
                </li>
                <li>
                  <Link to="/page-recoverpw">
                    {props.t("Recover Password")}
                  </Link>
                </li>
                <li>
                  <Link to="/auth-lock-screen">{props.t("Lock Screen")}</Link>
                </li>
                <li>
                  <Link to="/pages-starter">{props.t("Starter Page")}</Link>
                </li>
                <li>
                  <Link to="/invoice">{props.t("Invoice")}</Link>
                </li>
                <li>
                  <Link to="/pages-profile">{props.t("Profile")}</Link>
                </li>
                <li>
                  <Link to="/pages-maintenance">{props.t("Maintenance")}</Link>
                </li>
                <li>
                  <Link to="/pages-comingsoon">{props.t("Coming Soon")}</Link>
                </li>
                <li>
                  <Link to="/pages-timeline">{props.t("Timeline")}</Link>
                </li>
                <li>
                  <Link to="/pages-faqs">{props.t("FAQs")}</Link>
                </li>
                <li>
                  <Link to="/pages-pricing">{props.t("Pricing")}</Link>
                </li>
                <li>
                  <Link to="/pages-404">{props.t("Error 404")}</Link>
                </li>
                <li>
                  <Link to="/pages-500">{props.t("Error 500")}</Link>
                </li>
              </ul>
            </li>

            <li className="menu-title">{props.t("Components")}</li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="mdi mdi-checkbox-multiple-blank-outline"></i>
                <span>{props.t("UI Elements")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/ui-alerts">{props.t("Alerts")}</Link>
                </li>
                <li>
                  <Link to="/ui-buttons">{props.t("Buttons")}</Link>
                </li>
                <li>
                  <Link to="/ui-cards">{props.t("Cards")}</Link>
                </li>
                <li>
                  <Link to="/ui-carousel">{props.t("Carousel")}</Link>
                </li>
                <li>
                  <Link to="/ui-dropdowns">{props.t("Dropdowns")}</Link>
                </li>
                <li>
                  <Link to="/ui-grid">{props.t("Grid")}</Link>
                </li>
                <li>
                  <Link to="/ui-images">{props.t("Images")}</Link>
                </li>
                <li>
                  <Link to="/ui-lightbox">{props.t("Lightbox")}</Link>
                </li>
                <li>
                  <Link to="/ui-modals">{props.t("Modals")}</Link>
                </li>
                <li>
                  <Link to="/ui-rangeslider">{props.t("Range Slider")}</Link>
                </li>
                <li>
                  <Link to="/ui-progressbars">{props.t("Progress Bars")}</Link>
                </li>
                <li>
                  <Link to="/ui-tabs-accordions">
                    {props.t("Tabs & Accordions")}
                  </Link>
                </li>
                <li>
                  <Link to="/ui-typography">{props.t("Typography")}</Link>
                </li>
                <li>
                  <Link to="/ui-video">{props.t("Video")}</Link>
                </li>
                <li>
                  <Link to="/ui-general">{props.t("General")}</Link>
                </li>
                <li>
                  <Link to="/ui-colors">{props.t("Colors")}</Link>
                </li>
                <li>
                  <Link to="/ui-rating">{props.t("Rating")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="waves-effect">
                <i className="mdi mdi-newspaper"></i>
                <span className="badge rounded-pill bg-danger float-end">6</span>
                <span>{props.t("Forms")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/basic-elements">{props.t("Basic Elements")}</Link>
                </li>
                <li>
                  <Link to="/form-validation">
                    {props.t("Form Validation")}
                  </Link>
                </li>
                <li>
                  <Link to="/form-advanced">{props.t("Form Advanced")}</Link>
                </li>
                <li>
                  <Link to="/form-editors">{props.t("Form Editors")}</Link>
                </li>
                <li>
                  <Link to="/form-uploads">{props.t("Form File Upload")} </Link>
                </li>
                <li>
                  <Link to="/form-repeater">{props.t("Form Repeater")}</Link>
                </li>
                <li>
                  <Link to="/form-wizard">{props.t("Form Wizard")}</Link>
                </li>
                <li>
                  <Link to="/form-mask">{props.t("Form Mask")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="mdi mdi-clipboard-list-outline"></i>
                <span>{props.t("Tables")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/tables-basic">{props.t("Basic Tables")}</Link>
                </li>
                <li>
                  <Link to="/tables-datatable">{props.t("Data Tables")}</Link>
                </li>
                <li>
                  <Link to="/tables-responsive">
                    {props.t("Responsive Table")}
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="mdi mdi-chart-donut"></i>
                <span>{props.t("Charts")}</span>
              </Link>

              <ul className="sub-menu">
                <li>
                  <Link to="/apex-charts">{props.t("Apex charts")}</Link>
                </li>
                <li>
                  <Link to="/chartjs-charts">{props.t("Chartist Chart")}</Link>
                </li>
                <li>
                  <Link to="/e-charts">{props.t("E Chart")}</Link>
                </li>
                <li>
                  <Link to="/charts-knob">{props.t("Jquery Knob")}</Link>
                </li>
                <li>
                  <Link to="/sparkline-charts">
                    {props.t("Sparkline Chart")}
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="mdi mdi-emoticon-happy-outline"></i>
                <span>{props.t("Icons")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/icons-boxicons">{props.t("Boxicons")}</Link>
                </li>
                <li>
                  <Link to="/icons-materialdesign">
                    {props.t("Material Design")}
                  </Link>
                </li>
                <li>
                  <Link to="/icons-dripicons">{props.t("Dripicons")}</Link>
                </li>
                <li>
                  <Link to="/icons-fontawesome">{props.t("Font awesome")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="mdi mdi-map-marker-outline"></i>
                <span>{props.t("Maps")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/maps-google">{props.t("Google Maps")}</Link>
                </li>
                <li>
                  <Link to="/maps-vector">{props.t("Vector Maps")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="mdi mdi-file-tree"></i>
                <span>{props.t("Multi Level")}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/#">{props.t("Level 1.1")}</Link>
                </li>
                <li>
                  <Link to="/#" className="has-arrow">
                    {props.t("Level 1.2")}
                  </Link>
                  <ul className="sub-menu">
                    <li>
                      <Link to="/#">{props.t("Level 2.1")}</Link>
                    </li>
                    <li>
                      <Link to="/#">{props.t("Level 2.2")}</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))