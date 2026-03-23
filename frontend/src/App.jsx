import React, { useState } from "react";
import ReactFlow from "reactflow";
import "reactflow/dist/style.css";
import axios from "axios";
import './index.css';

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  
  const API = "https://ai-flow-app-hvvz.onrender.com";
  
 const centerX = 400; // middle of container
 const centerY = 200;

const gap = 250; // distance between nodes

  const nodes = [
    {
      id: "1",
      position: { x: centerX - gap, y: centerY},
      data: {
        label: (
          <textarea
            className="w-60 h-32 p-2 text-base border rounded-lg  bg-gray-100"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter prompt"
          />
        )
      }
    },
    {
      id: "2",
      position: { x: centerX + gap, y: centerY },
      data: {
        label:<div className="w-60 p-2 text-base border rounded-lg bg-gray-100 t">
            {loading ? "Thinking..." : output || "Result here"}
          </div>
      }
    }
  ];

  
  const edges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
    style: { stroke: "#3b82f6" }
  }
];


  const runFlow = async () => {
   const res = await axios.post(`${API}/api/ask-ai`, {
  prompt: input
});

    setOutput(res.data.result);
     setLoading(false);
  };
  const saveData = async () => {
 await axios.post(`${API}/api/save`, {
  prompt: input,
  response: output
});

  alert("Saved!");
};

  return (
     <div className="min-h-screen bg-linear-to-br from-[#132246] to-[#020617] text-white">
     <div className="flex items-center justify-between px-10 py-4 border-b border-gray-800">
  <h1 className="text-3xl font-bold text-white!">
    AI Flow Builder
  </h1>
  <div className="flex gap-4">
    <button
      onClick={runFlow}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
    >
      Run Flow
    </button>

    <button
      onClick={saveData}
      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
    >
      Save
    </button>
  </div>

</div>

      <div className="px-10 py-6">
      <div className="h-125 w-full bg-[#040e3d] rounded-2xl border border-gray-800 shadow-2xl">
        <ReactFlow nodes={nodes} edges={edges} />
      </div>
    </div>
    </div>
  );
}

export default App;