import React, { useState } from "react"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Row, Col, Card, CardBody } from "reactstrap"

// Rating Plugin
import Rating from "react-rating"
// import Rating from "react-rating-tooltip"

const UiRating = () => {
  const [def, setdef] = useState("")
  const [customize, setcustomize] = useState("")
  const starStyle = {}

  const tooltipContent = ["Rate 1", "Rate 2", "Rate 3", "Rate 4", "Rate 5"]
  const tooltipContentMore = ["1", "2", "3", "4", "5", "6", "7", "8"]
  const tooltipContentHalf = ["6", "7", "8", "9", "10"]
  const tooltipContentMiddle = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ]
  const tooltipContentStep = ["2", "4", "6", "8", "10"]

  return (
    <React.Fragment>
      <div className="page-content">

        <Breadcrumbs title="UI Elements" breadcrumbItem="Rating" />

        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                <Row>
                  <Col xl="3" md="4" sm="6">
                    <div className="p-4 text-center">
                      <h5 className="font-16 m-b-15">Default rating</h5>
                      <Rating
                        max={5}
                        onChange={rate => {
                          setdef(rate)
                        }}
                        ActiveComponent={
                          <i
                            key={"active_1"}
                            className="mdi mdi-star text-primary"
                            style={starStyle}
                          />
                        }
                        InActiveComponent={
                          <i
                            key={"active_01"}
                            className="mdi mdi-star-outline text-muted"
                            style={starStyle}
                          />
                        }
                      />{" "}
                      <span>{def}</span>
                    </div>
                  </Col>

                  <Col xl="3" md="4" sm="6">
                    <div className="p-4 text-center">
                      <h5 className="font-16 m-b-15">Disabled rating</h5>
                      <Rating
                        ActiveComponent={
                          <i
                            key={"active_2"}
                            className="mdi mdi-star text-primary"
                            style={starStyle}
                          />
                        }
                        InActiveComponent={
                          <i
                            key={"active_02"}
                            className="mdi mdi-star-outline text-muted"
                            style={starStyle}
                          />
                        }
                        readonly={true}
                      />
                    </div>
                  </Col>

                  <Col xl="3" md="4" sm="6">
                    <div className="p-4 text-center">
                      <h5 className="font-16 m-b-15">
                        Readonly rating with a value
                        </h5>
                      <Rating
                        ActiveComponent={
                          <i
                            key={"active_3"}
                            className="mdi mdi-star text-primary"
                            style={starStyle}
                          />
                        }
                        InActiveComponent={
                          <i
                            key={"active_03"}
                            className="mdi mdi-star-outline text-muted"
                            style={starStyle}
                          />
                        }
                        readonly={true}
                        initialRating={3}
                      />
                    </div>
                  </Col>

                  <Col xl="3" md="4" sm="6">
                    <div className="p-4 text-center">
                      <h5 className="font-16 m-b-15">
                        Customized heart rating
                        </h5>
                      <Rating
                        max={5}
                        onChange={rate => {
                          setcustomize(rate)
                        }}
                        ActiveComponent={
                          <i
                            key={"active_4"}
                            className="mdi mdi-heart text-danger"
                            style={starStyle}
                          />
                        }
                        InActiveComponent={
                          <i
                            key={"active_04"}
                            className="mdi mdi-heart-outline text-danger"
                            style={starStyle}
                          />
                        }
                      />
                      <span>{customize}</span>
                    </div>
                  </Col>

                  <Col xl="3" md="4" sm="6">
                    <div className="p-4 text-center">
                      <h5 className="font-16 m-b-15">Handle events</h5>
                      <Rating
                        onChange={rate => alert("Rating : " + rate)}
                        ActiveComponent={
                          <i
                            key={"active_5"}
                            className="mdi mdi-star text-primary"
                            style={starStyle}
                          />
                        }
                        InActiveComponent={
                          <i
                            key={"active_05"}
                            className="mdi mdi-star-outline text-muted"
                            style={starStyle}
                          />
                        }
                      />
                    </div>
                  </Col>

                  <Col xl="3" md="4" sm="6">
                    <div className="p-4 text-center">
                      <h5 className="font-16 m-b-15">Customize tooltips</h5>
                      <Rating
                        max={5}
                        tooltipContent={tooltipContent}
                        onChange={rate => {
                          setcustomize(rate)
                        }}
                        ActiveComponent={
                          <i
                            key={"active_6"}
                            className="mdi mdi-star text-primary"
                            style={starStyle}
                          />
                        }
                        InActiveComponent={
                          <i
                            key={"active_06"}
                            className="mdi mdi-star-outline text-muted"
                            style={starStyle}
                          />
                        }
                      />
                    </div>
                  </Col>

                  <Col xl="3" md="4" sm="6">
                    <div className="p-4 text-center">
                      <h5 className="font-16 m-b-15">Default rating</h5>
                      <Rating
                        max={8}
                        tooltipContent={tooltipContentMore}
                        onChange={rate => {
                          setcustomize(rate)
                        }}
                        ActiveComponent={
                          <i
                            key={"active_7"}
                            className="mdi mdi-star text-primary"
                            style={starStyle}
                          />
                        }
                        InActiveComponent={
                          <i
                            key={"active_07"}
                            className="mdi mdi-star-outline text-muted"
                            style={starStyle}
                          />
                        }
                      />
                    </div>
                  </Col>

                  <Col xl="3" md="4" sm="6">
                    <div className="p-4 text-center">
                      <h5 className="font-16 m-b-15">
                        Set start rate to 5 [6..10]
                        </h5>
                      <Rating
                        max={5}
                        tooltipContent={tooltipContentHalf}
                        onChange={rate => {
                          setcustomize(rate)
                        }}
                        ActiveComponent={
                          <i
                            key={"active_8"}
                            className="mdi mdi-star text-primary"
                            style={starStyle}
                          />
                        }
                        InActiveComponent={
                          <i
                            key={"active_08"}
                            className="mdi mdi-star-outline text-muted"
                            style={starStyle}
                          />
                        }
                      />
                    </div>
                  </Col>

                  <Col xl="3" md="4" sm="6">
                    <div className="p-4 text-center">
                      <h5 className="font-16 m-b-15">
                        Set start and stop rate [2..10]
                        </h5>
                      <Rating
                        max={11}
                        tooltipContent={tooltipContentMiddle}
                        onChange={rate => {
                          setcustomize(rate)
                        }}
                        ActiveComponent={
                          <i
                            key={"active_9"}
                            className="mdi mdi-star text-primary"
                            style={starStyle}
                          />
                        }
                        InActiveComponent={
                          <i
                            key={"active_09"}
                            className="mdi mdi-star-outline text-muted"
                            style={starStyle}
                          />
                        }
                      />
                    </div>
                  </Col>

                  <Col xl="3" md="4" sm="6">
                    <div className="p-4 text-center">
                      <h5 className="font-16 m-b-15">
                        Set start and stop rate [2..10] with step 2
                        </h5>
                      <Rating
                        max={5}
                        tooltipContent={tooltipContentStep}
                        onChange={rate => {
                          setcustomize(rate)
                        }}
                        ActiveComponent={
                          <i
                            key={"active_10"}
                            className="mdi mdi-star text-primary"
                            style={starStyle}
                          />
                        }
                        InActiveComponent={
                          <i
                            key={"active_11"}
                            className="mdi mdi-star-outline text-muted"
                            style={starStyle}
                          />
                        }
                      />
                    </div>
                  </Col>

                  <Col xl="3" md="4" sm="6">
                    <div className="p-4 text-center">
                      <h5 className="font-16 m-b-15">Custom icons</h5>
                      <Rating
                        stop={5}
                        onChange={rate => {
                          setcustomize(rate)
                        }}
                        emptySymbol="mdi mdi-battery-outline fa-2x text-muted"
                        fullSymbol={[
                          "mdi mdi-battery-20 fa-2x text-primary",
                          "mdi mdi-battery-50 fa-2x text-primary",
                          "mdi mdi-battery-70 fa-2x text-primary",
                          "mdi mdi-battery-90 fa-2x text-primary",
                        ]}
                      />
                    </div>
                  </Col>

                  <Col xl="3" md="4" sm="6">
                    <div className="p-4 text-center">
                      <h5 className="font-16 m-b-15">Fractional rating</h5>
                      <Rating
                        onChange={rate => {
                          setcustomize(rate)
                        }}
                        ActiveComponent={
                          <i
                            key={"active_11"}
                            className="mdi mdi-star text-primary"
                            style={starStyle}
                          />
                        }
                        InActiveComponent={
                          <i
                            key={"active_11"}
                            className="mdi mdi-star-outline text-muted"
                            style={starStyle}
                          />
                        }
                        fractions={6}
                      />
                    </div>
                  </Col>

                  <Col xl="3" md="4" sm="6">
                    <div className="p-4 text-center">
                      <h5 className="font-16 m-b-15">Custom CSS icons</h5>
                      <Rating fractions={2} />
                    </div>
                  </Col>
                </Row>{" "}
              </CardBody>
            </Card>
          </Col>
        </Row>

      </div>
    </React.Fragment>
  )
}
export default UiRating
