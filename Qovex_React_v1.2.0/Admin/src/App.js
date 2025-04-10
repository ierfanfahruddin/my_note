import React from "react"

import { Routes, Route } from "react-router-dom"
import { connect } from "react-redux"

// layouts Format
import VerticalLayout from "./components/VerticalLayout/"
import HorizontalLayout from "./components/HorizontalLayout/"
import NonAuthLayout from "./components/NonAuthLayout"

// Import scss
import "./assets/scss/theme.scss"


import fakeBackend from "./helpers/AuthType/fakeBackend"
import { authRoutes, userRoutes } from './routes/allRoutes'
import AppRoute from './routes/middleware/Authmiddleware'


// Activating fake backend
fakeBackend()

const App = props => {
  function getLayout() {
    let layoutCls = VerticalLayout

    switch (props.layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout
        break
      default:
        layoutCls = VerticalLayout
        break
    }
    return layoutCls
  }

  const Layout = getLayout()
  return (
    <React.Fragment>
      {/* <Router>

        <Switch>
        {authRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={idx}
              isAuthProtected={false}
            />
          ))}
          
          {userRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={Layout}
              component={route.component}
              key={idx}
              isAuthProtected={true}
              exact
            />
          ))}
        </Switch>

      </Router> */}

      <Routes>
        {authRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              <NonAuthLayout>
                {route.component}
              </NonAuthLayout>
            }
            key={idx}
            exact={true}
          />
        ))}

        {userRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              <AppRoute>
                <Layout>{route.component}</Layout>
              </AppRoute>}
            key={idx}
            exact={true}
          />
        ))}
      </Routes>
    </React.Fragment>
  )
}

// App.propTypes = {
//   layout: PropTypes.any
// }

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  }
}

export default connect(mapStateToProps, null)(App)