"use client"

import AddProduct from "../_actions/addProduct";
import SubmitButton from "./submitButton";

export default function SubmitForm() {
  

  return (
    <form
      action={AddProduct}
      
      className="flex flex-col gap-5 w-full p-10 shadow-xl "
      
    >
      <div>
        <label htmlFor="product">Product</label>
        <input
          className="w-full rounded-lg text-black border-2 border-black"
          type="text"
          name="name"
          id="name"
          required
        ></input>
      </div>
      <div>
        <label htmlFor="price">Price</label>
        <input
          className="w-full rounded-lg text-black border-2 border-black"
          type="text"
          name="price"
          id="price"
          required
        ></input>
      </div>
      <div>
        <label htmlFor="stock">Stock</label>
        <input
          className="w-full rounded-lg text-black border-2 border-black"
          type="text"
          name="stock"
          id="stock"
          required
        ></input>
      </div>
      <div>
        <label htmlFor="desription">Description</label>
        <input
          className="w-full rounded-lg text-black border-2 border-black"
          type="text"
          name="description"
          id="description"
          required
        ></input>
      </div>
      <div>
        <label htmlFor="image">Image</label>
        <input
          className="w-full  text-black "
          type="file"
          name="image"
          id="image"
          required
        ></input>
      </div>
      <div>
        <label htmlFor="file">File</label>
        <input
          className="w-full  text-black"
          type="file"
          name="file"
          id="file"
          required
        ></input>
      </div>
      <SubmitButton/>
    </form>
  );
}
