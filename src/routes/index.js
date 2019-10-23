import React from 'react'
import { Route, Switch } from 'react-router'
import NoMatch from "../components/NoMatch.js";
import NavBar from "../components/NavBar.js";
import PageEditor from "../components/admin/PageEditor.js";
import TreeEditor from "../components/admin/TreeEditor.js";
import Door from "../components/Door.js";
import ListPage from "../components/ListPage.js";
import Page from "../components/Page.js";


import '../styles/App.scss';

const routes = (
    <div id="app">
        <NavBar />
        <Switch>
            <Route path="/admin" render={() => (
                <div className="admin">
                <Switch>
                    <Route path="/admin/pid/:pid" render={ () => (<Door children={<PageEditor />} isAdminRoute={true} />) } />
                    <Route path="/admin" render={ () => (<Door children={<TreeEditor />} isAdminRoute={true} />) } />
                </Switch>
                </div>
            )} />

            <Route path="/page/:pid" render={() => (<Door children={<Page />} />)} />
            <Route path={["/:page", "/"]} render={() => (<Door children={<ListPage />} />)} />
            <Route component={NoMatch} />
        </Switch>
    </div>
)

export default routes