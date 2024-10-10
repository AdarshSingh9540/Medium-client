import { useState } from 'react';
import axios from "axios";
import { BACKEND_URL } from "../constant";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

export const Ai = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [plainTextDescription, setPlainTextDescription] = useState("");
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
  
      const cleanedResponse = data.response
        .replace(/##/g, '')
        .replace(/[\*#\/]/g, '')
        .replace(/[^\w\s,.!?'-]/g, '')
        .trim();
  
      setPlainTextDescription(cleanedResponse);
  
      const formattedDescription = cleanedResponse.split('\n').map((line:any, index:any) => (
        <p key={index} className="text-lg text-gray-700 mb-2">{line}</p>
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
          content: plainTextDescription,
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
    textarea.value = plainTextDescription;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Text copied to clipboard!');
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">AI-Generated Content</h1>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <input
          type="text"
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-purple-500"
          placeholder="Enter title for generating blog"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="mt-4">
          {loading ? (
            <Spinner />
          ) : (
            description && (
              <div>
                <h3 className="text-xl font-bold mb-4">Generated Text:</h3>
                <div className="bg-gray-50 p-4 rounded-lg">{description}</div>
                <div className="flex flex-wrap mt-6 gap-2">
                  <Link to="/publish" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300">
                    ⬅ Back to Publish
                  </Link>
                  <button
                    onClick={handleCopyText}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    Copy
                  </button>
                  <button
                    onClick={publishPost}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                  >
                    Publish Blog
                  </button>
                </div>
              </div>
            )
          )}
        </div>
        <button
          onClick={blog}
          className="mt-6 px-6 py-2 bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-lg hover:from-purple-500 hover:to-pink-600 transition duration-300"
        >
          Generate
        </button>
      </div>
    </div>
  );
};

export default Ai;