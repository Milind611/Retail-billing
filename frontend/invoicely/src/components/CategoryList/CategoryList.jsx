import React, { useContext, useState } from 'react';
import './CategoryList.css';
import { AppContext } from '../../components/context/AppContext';
import { deleteCategory } from '../../Service/CategoryService';
import toast from './../../../node_modules/react-hot-toast/src/index';


const CategoryList = () => {
  const { categories,setCategories } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const filteredCategories = categories.filter(category=> category.name.toLowerCase().includes(searchTerm.toLowerCase()))
const deleteByCategoryId = async(CategoryId)=>{
try{
const response=  await deleteCategory(CategoryId)
if(response.status ==204){

const updatedCategories=categories.filter(category=> category.categoryId !== CategoryId);
setCategories(updatedCategories);
toast.success("Category Deleted")
}else{
  toast.error("Unable to delete Category")

}

}catch(error){
console.log(error)
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

      <div className="row g-3 pe-2">
        {filteredCategories.map((category, index) => (
          <div className="col-12" key={index}>
            <div className="card pe-3" style={{ backgroundColor: category.bgColor }}>
              <div className="d-flex align-items-center p-2">
                <div style={{ marginRight: '15px' }}>
                  <img src={category.imgUrl} alt={category.name} className="category-image" />
                </div>

                <div className="flex-grow-1">
                  <h5 className="mb-1 text-white">{category.name}</h5>
                  <p className="mb-0 text-white">{category.items} Items</p>
                </div>

                <div className="btn btn-danger btn-sm" onClick={()=> deleteByCategoryId(category.categoryId)}>
                  <i className="bi bi-trash"></i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
