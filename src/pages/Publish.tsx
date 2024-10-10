import axios from "axios";
import { BACKEND_URL } from "../constant";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Editor } from 'primereact/editor';

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Create a New Post</h1>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <input
          type="text"
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-purple-500"
          placeholder="Enter your title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="mt-4">
          <Editor
            value={description}
            onTextChange={(e) => setDescription(e.htmlValue || "")}
            style={{ height: '300px' }}
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
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
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
          >
            Publish post
          </button>
          <Link to='/ai'>
            <button className="px-6 py-2 bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-lg hover:from-purple-500 hover:to-pink-600 transition duration-300">
              Generate using AI
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};