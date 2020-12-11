import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../components/Login.js';
import Dashboard from '../components/Dashboard';

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/" component={Login} exact />
                <Route path="/dashboard" component={Dashboard} />
            </Switch>
        </Router>
    )
}

