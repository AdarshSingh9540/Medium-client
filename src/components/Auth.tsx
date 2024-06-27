import { SigninInput } from '@adarshsingh9540/medium-common-package';
import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { BACKEND_URL } from '../constant';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from './Spinner'; // Import Spinner component

function Auth({ type }: { type: "signup" | "signin" }) {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SigninInput>({
    name: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false); // Add loading state

  async function sendReq() {
    setLoading(true); // Set loading to true when request starts
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
      setLoading(false); // Set loading to false after request completes
    }
  }

  return (
    <div>
      <div className='text-3xl font-extrabold '>
        {type === "signup" ? "Create An Account" : "Sign In"}
      </div>
      <div className='text-slate-400 mt-1'>
        {type === "signin" ? "Don't have an account?" : "Already have an account?"}
        <Link className='pl-3 underline cursor-pointer' to={type === "signin" ? "/signup" : "/signin"}>
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
          className="w-full mt-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 flex justify-center items-center"
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
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder} required />
      </div>
    </div>
  );
}
