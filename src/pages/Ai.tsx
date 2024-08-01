import  { useState } from 'react';
import axios from "axios";
import { Navbar } from "../components/Navbar";
import { BACKEND_URL } from "../constant";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import SideBar from '../components/SideBar';

export const Ai = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const blog = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://ai-server-blush.vercel.app/chat", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: title }),
      });

      const data = await response.json();
      console.log(data);

      const formattedDescription = data.response.split('\n').map((line:any, index:any) => (
        <p key={index} className="text-lg text-gray-700">{line}</p>
      ));

      setDescription(formattedDescription);
    } catch (error) {
      console.error('Error while fetching:', error);
    } finally {
      setLoading(false);
    }
  };

  const publishPost = async () => {
    try {
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
    } catch (error) {
      console.error('Error publishing post:', error);
    }
  };

  const handleCopyText = () => {
    const textarea = document.createElement('textarea');
    textarea.value = description;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Text copied to clipboard!');
  };

  return (
    <div className="flex flex-col h-screen">
      <div className=''>
      <Navbar />
        
      </div>
      
      <div className="flex flex-1 overflow-hidden pt-10 lg:pt-20">
      <div className="hidden lg:block">
            <SideBar />
          </div>
        <div className="flex-1 p-4 overflow-y-auto">


          <div className="max-w-screen-lg lg:pl-24 mx-auto mt-8 lg:mt-0">
            <input
              type="text"
              id="helper-text"
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4"
              placeholder="Enter title name for generating blog"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="mt-4">
              {loading ? (
                <Spinner />
              ) : (
                description && (
                  <div>
                    <h3 className="text-xl font-bold mb-2">Generated Text:</h3>
                    <p className="text-lg text-gray-700">{description}</p>
                    <div className="flex flex-wrap mt-6 gap-2">
                      <Link to="/publish">
                        <button
                          onClick={publishPost}
                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                        >
                          <span className="text-white mr-2">⬅</span> Back to Publish page
                        </button>
                      </Link>
                      <button
                        onClick={handleCopyText}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
            <button
              onClick={blog}
              className="mt-6 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-green-500 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-green-700"
            >
              Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ai;