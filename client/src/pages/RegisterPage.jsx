import { useForm } from 'react-hook-form'
import {resgiterRequest} from "../api/auth";

function RegisterPage() {
    const {register,handleSubmit} = useForm();
    const onSubmit=handleSubmit(async(values)=>{
      const res = await resgiterRequest(values)
      console.log(res);
    })
  return (
    <div className="bg-zinc-800 max-w-md p-10 roundad-md">
        <form onSubmit={onSubmit}>
            <input type="text" {...register("name",{required:true})} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder='Username'/>
            <input type="email" {...register("email",{required:true})} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder='Email'/>
            <input type="password" {...register("password",{required:true})} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder='Password'/>
            <button type="submit">Registrar</button>
        </form>
    </div>
  )
}

export default RegisterPage