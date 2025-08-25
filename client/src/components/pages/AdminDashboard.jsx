import React, { useState } from "react";
import UploadPost from "../molecules/UploadPost";
import UploadProduct from "../molecules/UploadProduct";
import ProductList from "../molecules/ProductList";

const AdminDashboard = () => {
  // conditional rendering

  const [showPostForm, setShowPostForm] = useState(false);
  const [showProductForm , setShowProductForm] = useState(false)


  return (
    <div className="container mt-2">
      <div>
        <h2>Welcome to the secure Admin Dashboard </h2>
      </div>

      <div className="my-3">

        <button onClick={() => {setShowPostForm(!showPostForm); }} className="btn btn-outline-primary" disabled ={showProductForm}>
          
          {showPostForm ? "cancel" : " Add Post"}

        </button>

        <button onClick={()=>{setShowProductForm(!showProductForm)}} className="btn btn-outline-success ms-3" disabled = {showPostForm} >

        {showProductForm ? "cancel" : " Add Product"}
        
        </button>
          

          {/* ternary operator */}

        {/* routing logic will be better rather than manually disabling the buttons */}

        {showPostForm === true && <UploadPost />}

        {showProductForm === true  && <UploadProduct/>}

        {!showProductForm && !showPostForm   && <ProductList/> }



      </div>
    </div>
  );
};

export default AdminDashboard;