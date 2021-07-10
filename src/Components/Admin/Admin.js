import React from "react";
import { useRouteMatch, Link, Switch, Route } from "react-router-dom";
import AddUser from "./AddUser/AddUser"
import ManageUser from "./ManageUser/manageUser"
import "./Admin.css";

const Admin = () => {
  let { path, url } = useRouteMatch();
  return (
    <div>
      <ul>
        <li>
          <Link to={`${url}/addUser`}>Add User</Link>
        </li>
        <li>
          <Link to={`${url}/manageUser`}>Manage User</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path={path}>
         <ManageUser/>
        </Route>
        <Route path={`${path}/manageUser`}>
          <ManageUser/>
        </Route>
        <Route path={`${path}/addUser`}>
          <AddUser/>
        </Route>
      </Switch>
    </div>
  );
};

export default Admin;