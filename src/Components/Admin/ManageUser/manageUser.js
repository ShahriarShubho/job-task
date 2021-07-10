import React, { useEffect, useState } from 'react';
import { Spinner, Table } from 'react-bootstrap';


const ManageUser = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {     
        fetch("http://localhost:5000/allUser")
          .then((response) => response.json())
          .then((data) => {
              console.log(data);
            setUsers(data)
            setLoading(false);
         
          });
      }, []);

    console.log(users);
    return (
        <div className="text-center">
            <h3>Users</h3>
            <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>seral</th>
            <th>Name</th>
            <th>email</th>
            <th>Number</th>
            <th>Address</th>
            <th>Type</th>
          </tr>
        </thead>
        {loading &&   <Spinner className="my-5" animation="grow" variant="primary" />}
        {users.map((user, index) =>
        <tbody>
          <tr>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.number}</td>
            <td>{user.address}</td>
            <td>{user.type}</td>
            
          </tr>
        </tbody>)}
      </Table>
        </div>
    );
};

export default ManageUser;