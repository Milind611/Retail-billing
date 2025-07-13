import React,{useState,useEffect} from 'react'
import { assests } from './../../assets/assests';
import toast from './../../../node_modules/react-hot-toast/src/index';
import { useContext } from 'react';
import { AppContext } from './../context/AppContext';
import { addCategory } from '../../Service/CategoryService';


const CategoryForm = () => {
  const {setCategories,categories} = useContext(AppContext)
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(false)
  const [data, setData] = useState({
    name:"",
    description:"",
    bgColor:"#2c2c2c"
  });

  const onChnageHandler=(e)=>{
    const value = e.target.value
    const name = e.target.name
    setData((data)=>({...data,[name]:value}))
  }

  useEffect(() => {
    console.log(data);
  }, [data])
  
  const onSubmitHandler = async(e)=>{
e.preventDefault();
setLoading(true);
if(!image){
  toast.error("Please select the image from category")
}
const formData = new FormData()
formData.append("category",JSON.stringify(data))
formData.append("file",image)
try {
  const response = await addCategory(formData)
  if(response.status === 201){
    setCategories([...categories,response.data])
    toast.success("Category Added")
    setData({
      name:"",
      description:"",
    bgColor:"#2c2c2c"
      
    })
    setImage(false)
  }
} catch (error) {
  console.error(error)
  toast.error("Error adding category")

}
finally{
  setLoading(false)
}
  }

  return (
   <div className="mx-2 mt-2" >
    <div className="row">
      <div className="card col-md-12 from-container">
        <div className="card-body">
          <form  onSubmit={onSubmitHandler}>
            <div className="mb-3">
              <label htmlFor="image" className='form-label'>
                <img 
           src={image ? URL.createObjectURL(image) : assests.upload}
                 alt="" width={48} />
              </label>
              <input type="file"name='image' id='image' className='form-control' hidden
              onChange={(e)=> setImage(e.target.files[0])}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="name" className='form-label'>Name</label>
              <input type="text" 
              name='name'
               id='name'
                className='form-control' 
                placeholder='CategoryName'
                onChange={onChnageHandler}
                value={data.name}
                />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className='form-label'>Description</label>
            <textarea type="text"
             name='description' 
             id='description'
              className='form-control'
               placeholder='Write content here..'
                rows="5"
                onChange={onChnageHandler}
                value={data.description}
                ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="bgColor" className='form-label'> Background color</label>
              <br />
              <input type="color"
               name='bgColor'
                id='bgColor'
                //  className='form-control'
                  placeholder='#fffff'
                   onChange={onChnageHandler}
                value={data.bgColor} />
            </div>
          <button type='submit'
          disabled={loading}
      className='btn btn-warning w-100' >{loading?"Loading...":"Submit"}</button>
          </form>
        </div>
      </div>
    </div>
   </div>
  )
}
export default CategoryForm;