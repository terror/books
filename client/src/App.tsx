import React from 'react';
import Home from './components/Home';
import Volume from './components/Volume';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/volumes/:id" exact component={Volume} />
            </Switch>
        </Router>
    );
};

export default App;
