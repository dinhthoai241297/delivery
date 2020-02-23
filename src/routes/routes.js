import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import App from 'App'
import paths from './paths'
import List from 'components/delivery/List'
import Add from 'components/delivery/Add'
import Details from 'components/delivery/Details'

export default (
    <Router>
        <Route
            render={props => (
                <App {...props}>
                    <Switch>
                        <Route path={paths.delivery.list} component={List} />
                        <Route path={paths.delivery.add} component={Add} />
                        <Route
                            path={paths.delivery.update + '/:id'}
                            render={props => <Add {...props} isUpdate={true} />}
                        />
                        <Route path={paths.delivery.details + '/:id'} component={Details} />
                        <Redirect to={paths.delivery.list} />
                    </Switch>
                </App>
            )}
        />
    </Router>
)
