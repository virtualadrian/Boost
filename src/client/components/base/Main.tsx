import {
  Location,
  State,
  UI,
} from 'client/redux'
import g, { ThemeProvider } from 'glamorous'
import React from 'react'
import { connect } from 'react-redux'
import {
  bindActionCreators,
  Dispatch,
} from 'redux'
import { Themes } from 'style'
import Nav from './Nav'
import PageRouter from './PageRouter'
import TitleBar from './TitleBar'

const Styled = {
  Main: g.div({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
  }),
  Body: g.div({
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  }),
}

interface StateProps {
  location: Location.State
  ui: UI.State
}

const stateToProps = (state: State): StateProps => ({
  location: state.location,
  ui: state.ui,
})

interface DispatchProps {
  actions: UI.ActionCreators
}

const dispatchToProps = {
  toggleNav: UI.ActionCreators.toggleNav
}

type MainProps = StateProps & typeof dispatchToProps

const Main = connect(stateToProps, dispatchToProps)((props: MainProps) => {
  return (
    <ThemeProvider theme={Themes.defaultTheme}>
      <Styled.Main>
        <TitleBar
          toggleNav={props.toggleNav}
        />
        <Styled.Body>
          <Nav
            isNavOpen={props.ui.isNavOpen}
          />
          <PageRouter
            location={props.location}
          />
        </Styled.Body>
      </Styled.Main>
    </ThemeProvider>
  )
})

export default Main
