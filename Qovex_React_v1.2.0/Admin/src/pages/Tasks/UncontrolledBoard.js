// import React from "react"

// import Board from "@lourenci/react-kanban"
// import { Row, Col } from "reactstrap"
// import CardTaskBox from "./card-task-box"
// import RenderCardTitle from "./render-card-title"

// const UncontrolledBoard = props => {
//   const content = props.board
//   return (
//     <React.Fragment>
//       <Row className="mb-4">
//         <Col>
//           <Board
//             initialBoard={content}
//             renderColumnHeader={({ title }) => (
//               <RenderCardTitle title={title} />
//             )}
//             renderCard={(data, { dragging }) => (
//               <CardTaskBox data={data} dragging={dragging}>
//                 {data}
//               </CardTaskBox>
//             )}
//             onNewCardConfirm={draftCard => ({
//               id: new Date().getTime(),
//               ...draftCard,
//             })}
//           />
//         </Col>
//       </Row>
//     </React.Fragment>
//   )
// }

// export default UncontrolledBoard

import React from "react"
import { Board } from "react-trello"
import { Row, Col } from "reactstrap"
import CardTaskBox from "./card-task-box"
import RenderCardTitle from "./render-card-title"

const UncontrolledBoard = (props) => {
  const content = props.board

  return (
    <React.Fragment>
      <Row className="mb-4">
        <Col>
          <Board
            data={content}  // Data is passed here
            renderCard={(card) => (
              <CardTaskBox data={card}>
                {card.title}
              </CardTaskBox>
            )}
            renderColumnHeader={({ title }) => <RenderCardTitle title={title} />}
            onCardAdd={(card) => ({
              id: new Date().getTime(),
              ...card,
            })}
          />
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default UncontrolledBoard
