// import React, { useEffect } from "react"
// import PropTypes from "prop-types"
// import { connect } from "react-redux"
// import { isEmpty, map } from "lodash"

// //Import Breadcrumb
// import Breadcrumbs from "../../components/Common/Breadcrumb"

// //Import Task Cards
// import UncontrolledBoard from "./UncontrolledBoard"

// import { getTasks } from "../../store/tasks/actions"
// import withRouter from "../../components/Common/withRouter"
// import { Col, Row } from "reactstrap"

// const TasksKanban = (props) => {
//   const { tasks, onGetTasks } = props

//   useEffect(() => {
//     onGetTasks()
//   }, [onGetTasks])

//   const data = map(tasks, task => ({ ...task, cards: task.tasks }))
//   data.length = Math.min(data.length, 3)

//   return (
//     <React.Fragment>
//       <div className="page-content">
//         {/* Render Breadcrumbs */}
//         <Breadcrumbs title="Tasks" breadcrumbItem="Kanban Board" />
//         <Row>
//           <Col>
//             {!isEmpty(data) && (
//               <UncontrolledBoard board={{ columns: data }} content={tasks} />
//             )}
//             </Col>
//          </Row>
//       </div>
//     </React.Fragment>
//   )
// }

// TasksKanban.propTypes = {
//   tasks: PropTypes.array,
//   onGetTasks: PropTypes.func,
// }

// const mapStateToProps = ({ tasks }) => ({
//   tasks: tasks.tasks,
// })

// const mapDispatchToProps = dispatch => ({
//   onGetTasks: () => dispatch(getTasks()),
// })

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(withRouter(TasksKanban))

import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { isEmpty, map } from "lodash"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//Import Task Cards
import UncontrolledBoard from "./UncontrolledBoard"

import { getTasks } from "../../store/tasks/actions"
import withRouter from "../../components/Common/withRouter"
import { Col, Row } from "reactstrap"

const TasksKanban = (props) => {
  const { tasks, onGetTasks } = props

  useEffect(() => {
    onGetTasks()
  }, [onGetTasks])

  // Mapping tasks to the format needed by react-trello
  const data = map(tasks, task => ({
    id: task.id,
    title: task.name,
    cards: task.tasks.map(subTask => ({
      id: subTask.id,
      title: subTask.title,
      description: subTask.description,
    })),
  }))
  
  // Limit the number of columns displayed
  const boardData = { lanes: data.slice(0, 3) }

  return (
    <React.Fragment>
      <div className="page-content">
        {/* Render Breadcrumbs */}
        <Breadcrumbs title="Tasks" breadcrumbItem="Kanban Board" />
        <Row>
          <Col>
            {!isEmpty(boardData.lanes) && (
              <UncontrolledBoard board={boardData} />
            )}
          </Col>
        </Row>
      </div>
    </React.Fragment>
  )
}

TasksKanban.propTypes = {
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
)(withRouter(TasksKanban))
