import React ,{useState,useEffect}from 'react'
import './ManageUsers.css'
import UserForm from '../../components/UserForm/UserForm'
import toast from './../../../node_modules/react-hot-toast/src/index';
import UsersList from '../../components/UsersList/UsersList'
import { fetchUsers } from '../../Service/UserService';
const ManageUsers = () => {
const [users, setUsers] = useState([])
const [loading, setLoading] = useState(false);

useEffect(()=>{
async function loadUsers() {
  try{
setLoading(true);
const response = await fetchUsers();
setUsers(response.data);
  }catch(error){
toast.error("Unable to fetch Users");
  }finally{
setLoading(false);
  }
}
loadUsers()
},[]);

  return (
  
      <div className="users-container text-light">
        <div className="left-column">
         <UserForm setUsers={setUsers}/>
        </div>

        <div className="right-column">
        <UsersList users={users} setUsers={setUsers}/>
        </div>
      </div>
   
  )
}

export default ManageUsers