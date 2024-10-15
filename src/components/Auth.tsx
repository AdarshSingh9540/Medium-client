import { SigninInput } from '@adarshsingh9540/medium-common-package';
import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { BACKEND_URL } from '../constant';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from './Spinner'; 

function Auth({ type }: { type: "signup" | "signin" }) {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SigninInput>({
    name: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false); 

  async function sendReq() {
    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      localStorage.setItem("name", postInputs.name || "");
      navigate("/blogs");
    
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false); 
    }
  }

  return (
    <div>
      <div className='text-3xl font-extrabold '>
        {type === "signup" ? "Create An Account" : "Sign In"}
      </div>
      <div className='text-slate-400 mt-1'>
        {type === "signin" ? "Don't have an account?" : "Already have an account?"}
        <Link className='pl-3 underline cursor-pointer' to={type === "signin" ? "/" : "/signin"}>
          {type === "signin" ? "Sign up" : "Sign in"}
        </Link>
      </div>
      <div className='mt-6'>
        {type === "signup" ? <LabelledInput label="Name" placeholder='Adarsh Singh' onChange={(e) => {
          setPostInputs({
            ...postInputs,
            name: e.target.value,
          })
        }} /> : null}

        <LabelledInput label="Email" placeholder='adarsh2gmail.com' onChange={(e) => {
          setPostInputs({
            ...postInputs,
            email: e.target.value
          })
        }} />

        <LabelledInput label="Password" placeholder='12345' type={"password"} onChange={(e) => {
          setPostInputs({
            ...postInputs,
            password: e.target.value
          })
        }} />
      </div>
      <div>
        <button
          type="button"
          onClick={sendReq}
          className="w-full mt-4   bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-900 transition-colors me-2 mb-2  flex justify-center items-center"
        >
          {loading ? <Spinner /> : (type === "signup" ? "Sign up" : "Sign in")}
        </button>
      </div>
    </div>
  );
}

export default Auth;

interface LabelledInputType {
  label: string,
  placeholder: string,
  type?: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput({ label, placeholder, type, onChange }: LabelledInputType) {
  return (
    <div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 ">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
          placeholder={placeholder} required />
      </div>
    </div>
  );
}
