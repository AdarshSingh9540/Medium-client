import axios from "axios";
import { Navbar } from "../components/Navbar";
import { BACKEND_URL } from "../constant";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import { Editor } from 'primereact/editor'; 

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(""); 
  const navigate = useNavigate();

  return (
    <div className="pt-20">
      <Navbar />
      <div className="mx-4">
        <div className="flex flex-row justify-center w-full pt-8">
          <div className="hidden lg:block">
            <SideBar />
          </div>
          <div  className="max-w-screen-lg w-full lg:pl-24">
            <input
              type="text"
              id="helper-text"
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4" 
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />

  
            <div className="mb-4">
              <Editor
                value={description}
                onTextChange={(e) => setDescription(e.htmlValue || "")} 
                style={{ height: '300px' }}
              />
            </div>

            <button
              onClick={async () => {
                const response = await axios.post(
                  `${BACKEND_URL}/api/v1/blog`,
                  {
                    title,
                    content: description, 
                  },
                  {
                    headers: {
                      Authorization: localStorage.getItem("token"),
                    },
                  }
                );
                navigate(`/blog/${response.data.id}`);
              }}
              type="submit"
              className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
              Publish post
            </button>
            <div>
              <Link to='/ai'>
                <button className="bg-green-500 p-2 rounded-lg mt-6">Generate using AI</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
