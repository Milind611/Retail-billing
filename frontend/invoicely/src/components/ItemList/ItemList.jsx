import React ,{useContext, useState} from 'react'
import { AppContext } from '../context/AppContext';
import { deleteItem } from '../../Service/ItemService';
import toast from './../../../node_modules/react-hot-toast/src/index';
import './ItemList.css'

const ItemsList = () => {
    const [searchTerm, setSearchTerm] = useState('');
  const {    itemsData,setItemsData} = useContext(AppContext);


  const filteredItems = itemsData.filter((item)=>{
    return item.name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const removeItem = async(itemId)=>{
    try {
      const response = await deleteItem(itemId);
      if(response.status === 200){
        const updatedItems = itemsData.filter(item => item.itemId !== itemId);
        setItemsData(updatedItems);
        toast.success("Item deleted")
      }
      else{
      toast.error("Unable to delete Item")

      }
    } catch (error) {
      toast.error("Unable to delete Item")
    }
  }


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
       {filteredItems.map((item, index) => (
  <div className="col-12" key={index}> 
    <div className="card p-3 bg-dark">
      <div className="d-flex align-items-center">
        <div >
          <img src={item.imgUrl} alt={item.name}  className="item-image"/>
        </div>
        <div className="flex-grow-1 ms-3">
          <h6 className='mb-1 text-white'>{item.name}</h6>
          <p className="mb-0 text-white">
            Category: {item.categoryName}
          </p>
          <span className="mb-0 badge rounded-pill text-bg-warning">
            ₹{item.price}
          </span>
        </div>
        <div>
          <button className="btn btn-danger btn-sm" onClick={() => removeItem(item.itemId)}>
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
))}

      <div className="row g-3 pe-2">
        
      </div>
    </div>
  )
}

export default ItemsList