import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { isEmpty, map, size } from "lodash"
import { Link} from "react-router-dom"
import classNames from "classnames"
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

import ReactApexChart from "react-apexcharts"

import { getTasks } from "../../store/tasks/actions"
import { options, series, statusClasses } from "../../common/data/tasks"
import withRouter from "../../components/Common/withRouter"


const TasksList = props => {
  const { tasks, onGetTasks } = props

  useEffect(() => {
    onGetTasks()  
  }, [onGetTasks])

  const recentTasks = tasks.find(task => task.title === "Recent Tasks")

  return (
    <React.Fragment>
      <div className="page-content">
        
          <Breadcrumbs title="Tasks" breadcrumbItem="Task List" />
          {/* Render Breadcrumbs */}
          <Row>
            <Col lg={8}>
              {map(tasks, (task, i) => (
                <Card key={i}>
                  <CardBody>
                    <CardTitle className="mb-4">{task.title}</CardTitle>
                    <div className="table-responsive">
                      <table className="table table-nowrap align-middle mb-0">
                        <tbody>
                          {map(task.tasks, (item, i) => (
                            <tr key={i}>
                              <td style={{ width: "60px" }}>
                                <div className="form-check">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id={item.id}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={item.id}
                                  />
                                </div>
                              </td>
                              <td>
                                <h5 className="text-truncate font-size-14 m-0">
                                  <Link to="#" className="text-dark">
                                    {item.description}
                                  </Link>
                                </h5>
                              </td>
                              <td>
                                <div className="team">
                                  {map(
                                    item.members,
                                    (member, index) =>
                                      index < 2 && (
                                        <Link
                                          to="#"
                                          className="team-member d-inline-block"
                                          key={index}
                                        >
                                          {member.userImg ? (
                                            <img
                                              src={member.userImg}
                                              className="rounded-circle avatar-xs m-1"
                                              alt=""
                                            />
                                          ) : (
                                            <div className="avatar-xs m-1">
                                              <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                                                {member.username.charAt(0)}
                                              </span>
                                            </div>
                                          )}
                                        </Link>
                                      )
                                  )}
                                  {size(item.members) > 2 && (
                                    <Link
                                      to="#"
                                      className="d-inline-block"
                                    >
                                      <div className="avatar-xs">
                                        <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                                          {size(item.members) - 2} +
                                        </span>
                                      </div>
                                    </Link>
                                  )}
                                </div>
                              </td>
                              <td>
                                <div className="text-center">
                                  <span
                                    className={classNames(
                                      "badge badge-pill font-size-11",
                                      statusClasses[item.status.toLowerCase()]
                                    )}
                                  >
                                    {item.status}
                                  </span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </Col>

            <Col lg={4}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-3">Tasks </CardTitle>
                  <ReactApexChart
                    options={options}
                    series={series}
                    type="line"
                    height={280}
                    className="apex-charts"
                  />
                </CardBody>
              </Card>

              {!isEmpty(recentTasks) && (
                <Card>
                  <CardBody>
                    <CardTitle className="mb-4">{recentTasks.title}</CardTitle>
                    <div className="table-responsive">
                      <table className="table table-nowrap align-middle mb-0">
                        <tbody>
                          {map(recentTasks.tasks, (item, i) => (
                            <tr key={i}>
                              <td>
                                <h5 className="text-truncate font-size-14 m-0">
                                  <Link to="#" className="text-dark">
                                    {item.description}
                                  </Link>
                                </h5>
                              </td>
                              <td>
                                <div className="team">
                                {map(
                                    item.members,
                                    (member, index) =>
                                      index < 2 && (
                                        <Link
                                          to="#"
                                          className="team-member d-inline-block"
                                          key={index}
                                        >
                                          {member.userImg ? (
                                            <img
                                              src={member.userImg}
                                              className="rounded-circle avatar-xs m-1"
                                              alt=""
                                            />
                                          ) : (
                                            <div className="avatar-xs">
                                              <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                                                {member.username.charAt(0)}
                                              </span>
                                            </div>
                                          )}
                                        </Link>
                                      )
                                  )}
                                  {size(item.members) > 2 && (
                                    <Link
                                      to="#"
                                      className="team-member d-inline-block"
                                    >
                                      <div className="avatar-xs">
                                        <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                                          {size(item.members) - 2} +
                                        </span>
                                      </div>
                                    </Link>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardBody>
                </Card>
              )}
           
            </Col>
          </Row>
      </div>
    </React.Fragment>
  )
}

TasksList.propTypes = {
  tasks: PropTypes.array,
  onGetTasks: PropTypes.func,
}

const mapStateToProps = ({ tasks }) => ({
  tasks: tasks.tasks,
})

const mapDispatchToProps = dispatch => ({
  onGetTasks: () => dispatch(getTasks()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TasksList))
