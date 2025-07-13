import React ,{useState}from 'react'
import { assests } from './../../assets/assests';
import { useContext } from 'react';
import { AppContext } from './../context/AppContext';
import toast from './../../../node_modules/react-hot-toast/src/index';
import { addItem } from './../../Service/ItemService';


const ItemForm = () => {
  const {categories,setItemsData,itemsData,setCategories} = useContext(AppContext);

  const [image, setImage] = useState(false)
    const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name:"",
    categoryId:"",
    price:"",
    description:""
  });


 const onChangeHandler = (e)=>{
const value = e.target.value;
const name = e.target.name;
setData((data)=>({...data,[name]:value}));

 }

const onSubmitHandler = async (e) => {
  e.preventDefault();

  if (!image) {
    toast.error("Select Image");
    return;
  }

  setLoading(true);
  const formData = new FormData();
  formData.append("item", JSON.stringify(data));
  formData.append("file", image);

  try {
    const response = await addItem(formData);

    if (response.status === 200) {
      setItemsData([...itemsData, response.data]);
      setCategories((prevCategories)=> prevCategories.map(
        (category)=> category.categoryId === data.categoryId ? {...category,items:category.items+1}: category
      ))
      toast.success("Item Added");

      setData({
        name: "",
        categoryId: "",
        price: "",
        description: ""
      });
      setImage(false);
    }
  } catch (error) {
    toast.error("Unable to add Item");
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  return (
<div className="item-from-category " style={{height:'100vh',overflowY:'auto',overflowX:'hidden'}}>
   <div className="mx-2 mt-2" >
    <div className="row">
      <div className="card col-md-8 from-container">
        <div className="card-body">
          <form onSubmit={onSubmitHandler}>
            <div className="mb-3">
              <label htmlFor="image" className='form-label'>
                <img src={image ? URL.createObjectURL(image):assests.upload } alt="" width={48} />
              </label>
              <input type="file"name='image' id='image' className='form-control' hidden onChange={(e)=> setImage(e.target.files[0])}/>
            </div>
            <div className="mb-3">
              <label htmlFor="name" className='form-label ' >Name</label>
              <input type="text" 
              name='name'
               id='name'
                className='form-control' 
                placeholder='Item Name'
                onChange={onChangeHandler} value={data.name}
                />
            </div>
            <div className="mb-3">
              <label htmlFor="Category" className='form-label' >Category</label>
              <select name="categoryId" id="category" className='form-control'
              onChange={onChangeHandler} value={data.categoryId}>
                  <option value="">---SELECT CATEGORY---</option>
                  {categories.map((category,index) =>(
                    <option key={index} value={category.categoryId}>{category.name} </option>
                  ))}
                  
              </select>

            </div>
            <div className="mb-3">
              <label htmlFor="price " className='form-label'>Price</label>
              <input type="number" name='price' id='price' className='form-control' placeholder='&#8377;200.00'
              onChange={onChangeHandler} value={data.price}/>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className='form-label'>Description</label>
            <textarea type="text"
             name='description' 
             id='description'
              className='form-control'
               placeholder='Write content here..'
               onChange={onChangeHandler} value={data.description}
                rows="5"></textarea>
            </div>
         
          <button type='submit' className='btn btn-warning w-100'disabled={loading} >
            {loading ? "Loading":"Save"}

          </button>
          </form>
        </div>
      </div>
    </div>
   </div>
</div>
  )
}

export default ItemForm