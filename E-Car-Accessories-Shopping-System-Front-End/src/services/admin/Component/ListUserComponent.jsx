import userServices from '../Services/UserServices';
import React, { Component } from 'react'
import Navigation from "../Navbar/index"
class ListUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: []
        }

        this.removeUser = this.removeUser.bind(this);
        this.viewUser = this.viewUser.bind(this);
    }
    removeUser(id) {
        userServices.removeUser(id).then((res) => {
            res.data.result!==null && alert('user '+res.data.result.firstName+ " removed successfully !!!");
            res.data.result===null && alert( " failed to remove user "+res.data.result.firstName +" !!!");
            window.location.reload();
        });
       
        this.props.history.push('/list');
        
    }
    viewUser(id) {
        this.props.history.push(`/view-user/${id}`);
    }
    componentDidMount() {
        userServices.getUser().then((res) => {
            this.setState({ user: res.data.result });
        });
    }
    render() {
        let i=0;
        return (
            <div  >
                <Navigation ></Navigation>
                <br />
                <br />
                <br />
                <br />
                <div style={{ marginLeft: "40px", marginRight: "40px" }}>
                <br/>
                    <h2 className="text-center">User List</h2>
                    <div className="row" >
                        <table className="table table-striped table-bordered text-center table-light" >
                            <thead >
                                <tr >
                                    <th> Sr.No.
                                   </th>
                                    <th> User First Name
                                   </th>
                                    <th>User Last Name
                                    </th>
                                    <th>User Date Of Birth
                                    </th>
                                    <th> User Email id
                                    </th>
                                    <th> Phone Number
                                    </th>

                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.user.map(
                                        user =>
                                            <tr key={user.id}>
                                                <td>{++i}</td>
                                                <td>{user.firstName}</td>
                                                <td>{user.lastName}</td>
                                                <td>{user.dateOfBirth}</td>
                                                <td>{user.email}</td>
                                                <td>{user.phoneNumber} </td>
                                                <td>
                                                    <button className="btn btn-info " style={{ backgroundColor: "darkcyan" }} onClick={() => this.viewUser(user.id)} >View</button>
                                                    <button className="btn btn-danger" style={{ backgroundColor: "red",marginLeft :'10px'}} onClick={() => this.removeUser(user.id)}>Remove</button>
                                                </td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListUserComponent