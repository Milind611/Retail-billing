import React ,{useState}from 'react'
import { deleteUser } from '../../Service/UserService';
import toast from './../../../node_modules/react-hot-toast/src/index';

const UsersList = ({users,setUsers}) => {

  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

const deleteByUserId = async (id) => {
  try {
    await deleteUser(id);
    setUsers(prevUsers => prevUsers.filter(user => user.userId !== id));
    toast.success("User Deleted");
  } catch (e) {
    toast.error("Unable to delete user");
  }
};



  return (

    

   <div className="category-list-container" style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden' }}>
     
      <div className="row pe-2">
<div className="input-group mb-3">

        <input type="text" name='keyword' id='keyword' placeholder='Search By Keyword' className='form-control'
        onChange={(e)=> setSearchTerm(e.target.value)} value={searchTerm} />
        <span className="input-group-text bg-warning">
          <i className=" bi bi-search"></i>
        </span>
        </  div>

      </div>

      <div className="row g-3 pe-2">
  {
    filteredUsers.map((user,index)=>(
      <div className="col-12" key={index}>
        <div className="card p-3 bg-dark">
          <div className="d-flex-align-items-center">
            <div className="flex-grow-1">
              <h5 className='mb-1 text-white'>{user.name}</h5>
              <p className='mb-1 text-white'> {user.email}</p>
            </div>
<div>
  <button className="btn btn-danger btn-sm" onClick={()=> deleteByUserId(user.userId)}>
    <i className='bi bi-trash'></i>
  </button>
</div>
          </div>
        </div>
      </div>
    ))
  }
      </div>
    </div>
  )
}

export default UsersList