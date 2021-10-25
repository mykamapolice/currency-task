import React from 'react';
import {useForm} from "react-hook-form";

const ConverterPage = () => {
  const onSubmit = (data: any) => console.log(data);
  const { register, handleSubmit } = useForm();


  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("firstName")} />
        <select {...register("From")}>
          <option value="female">female</option>
          <option value="male">male</option>
          <option value="other">other</option>
        </select><select {...register("To")}>
          <option value="female">female</option>
          <option value="male">male</option>
          <option value="other">other</option>
        </select>
        <input type="submit" />
      </form>
    </div>
  );
};

export default ConverterPage;
