import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUserByID, userList } from '../../services/serviceAuthentication';
import { userForEdit } from '../../app/reducers/editSlice';


const UsersList = () => {

    let tokenLogin = useSelector((state) => state.loginState.token)
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        userList(tokenLogin)
            .then((response) => {
                console.log(response.data.UserList)
                setUsers(response.data.UserList)
            })
            .catch((error) => {
                console.log(`Email or password incorrect ${error}`);
            })
    }, []);

    const deleteUser = (id) => {
        deleteUserByID(id, tokenLogin)
            .then((response) => {
                if (response.status === 204) {
                    alert(`User with id: ${id} successfully deleted`)
                    setUsers(users.filter(item  => item.id !== id))
                } else {
                    throw new Error('User not found & no delete done')
                }
            })
            .catch((error) => {
                alert(`Something wemt wrong: ${error}`)
            })
    }

    const navEditUser = (path, key) =>{
        dispatch(userForEdit({"user": users[key]}))
        navigate(path);
   }

    return (
        <div>
            <h1 className='text-light'>Lista de usuarios</h1>
            <table className='table'>
                <thead>
                    <tr className='text-light'>
                        <th scope='col'>Email</th>
                        <th scope='col'>Id</th>
                        <th scope='col'>Is Active</th>
                        <th scope='col'>Last Name</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Password</th>
                    </tr>
                </thead>
                <tbody className='text-light'>
                    {users.map((user, index) => {
                        return (
                            <tr key={index} className='fw-normal text-light' >
                                <th scope="row">
                                    <span>{user.email}</span>
                                </th>

                                <td className='align-middle'>
                                    <span>{user.id}</span>
                                </td>
                                <td className='align-middle'>
                                    <span>{(user.isActive).toString()}</span>
                                </td>
                                <td classNama='align-middle'>
                                    <span>{user.lastName}</span>
                                </td>
                                <td classNama='align-middle'>
                                    <span>{user.name}</span>
                                </td>
                                <td classNama='align-middle'>
                                    <span>{user.password}</span>
                                </td>
                                <td classNama='align-middle'>
                                    <button className='btn btn-primary btn-sm' onClick={() => navEditUser('/edit', index)}>Edit</button>
                                </td>
                                <td classNama='align-middle'>
                                    <button className='btn btn-primary btn-sm' onClick={() => deleteUser(user.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default UsersList;
