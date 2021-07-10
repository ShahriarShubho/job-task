import React from 'react';
import { useForm } from 'react-hook-form';
import swal from "sweetalert";

const AddUser = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        const userData = {
            name: data.name,
            email: data.email,
            password: data.password,
            number: data.number,
            address: data.address,
            type: data.type
        }
        console.log(userData);
        fetch("http://localhost:5000/addUser", {
            method: "POST",
            headers: { 'Content-Type' : 'application/json'},
            body : JSON.stringify(userData)
        })
        .then(res => res.json())
        .then(success => {
          if(success){
            swal("Great!", "Admin has successfully added", "success");
          }else{
            swal("Opppsss!", "something wrong", "error");
          }
        })
    }
    return (
        <div>
            <div>
      <h3 className="text-center py-4">Make a admin given the bellow data</h3>
      <div className="m-auto" style={{width : '450px'}}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <strong>Name  : </strong>
      <input className="mb-3 border-primary rounder-lg" placeholder="Enter Name" {...register("name", { required: true })} />
      {errors.name && <span className="text-danger">name field is required</span>} <br/>
      <strong>Email : </strong>
      <input className="mb-3 border-primary rounder-lg" placeholder="Enter Email address" {...register("email", { required: true })} /> 
      {errors.email && <span className="text-danger">Must Add a Email</span>} <br/>
      <strong>Password : </strong>
      <input className="mb-3 border-primary rounder-lg" placeholder="Enter Password" {...register("password", { required: true })} /> 
      {errors.password && <span className="text-danger">Must Add a Password</span>} <br/>
      <strong>Contract Number : </strong>
      <input className="mb-3 border-primary rounder-lg" type="number" placeholder="Enter Contract Number" {...register("number", { required: true })} /> 
      {errors.number && <span className="text-danger">Must Add a Contract Number</span>} <br/>
      <strong>Password : </strong>
      <input className="mb-3 border-primary rounder-lg" placeholder="Enter Address" {...register("address", { required: true })} /> 
      {errors.address && <span className="text-danger">Must Add Address</span>} <br/>
      <select {...register("type")}>
        <option value="agent">Agent</option>
        <option value="customer">Customer</option>
        <option value="operator">Operator</option>
      </select> <br/>
      
      <input className="btn btn-primary mt-3" type="submit" />
    </form>
      </div>
    </div> 
        </div>
    );
};

export default AddUser;