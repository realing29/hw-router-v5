import { useState } from "react";
import {
  Link,
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  Redirect,
  NavLink,
} from "react-router-dom";

const Users = ({ users }) => (
  <div>
    <ul>
      {users.map((u, i) => (
        <li key={"u" + i}>
          <NavLink to={`/users/${i}/profile`}>{u}</NavLink>
        </li>
      ))}
    </ul>
  </div>
);

const UserInfo = () => {
  const { userId } = useParams();

  return (
    <div>
      <h1>UserPage</h1>
      <NavLink to={`/users/${userId}/edit`}>Edit</NavLink>
      <br />
      <NavLink to={`/users`}>Users list</NavLink>
      <p>{"userId: " + userId}</p>
    </div>
  );
};

const UserEdit = () => {
  const { userId } = useParams();
  return (
    <div>
      <h1>Edit user page</h1>
      <NavLink to={`/users/${userId}/profile`}>User Page</NavLink>
      <br />
      <NavLink to={`/users/${+userId + 1}/profile`}>Another user</NavLink>
      <br />

      <NavLink to="/users">Users list</NavLink>
    </div>
  );
};

const MyRedirect = () => {
  const { userId } = useParams();
  return <Redirect to={`/users/${userId}/profile`} />;
};

const App = () => {
  const [users] = useState([
    "Ренат",
    "Иван",
    "Матвей",
    "Кирилл",
    "Владислав",
    "Дмитрий",
  ]);
  return (
    <>
      <Router>
        <h1>Home page</h1>
        <Link to="/users">Users list</Link>
        <Switch>
          <Route path="/users">
            <h1>Users Layout</h1>
            <NavLink to="/">home page</NavLink>
            <Route exact path="/users">
              <Users users={users} />
            </Route>
            <Route path="/users/:userId">
              <Switch>
                <Route path="/users/:userId/profile">
                  <UserInfo />
                </Route>
                <Route path="/users/:userId/edit">
                  <UserEdit />
                </Route>
                <Route path="/users/:userId/">
                  <MyRedirect />
                </Route>
              </Switch>
            </Route>
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
