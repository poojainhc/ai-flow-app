import React, { useState } from "react";
import ReactFlow from "reactflow";
import "reactflow/dist/style.css";
import axios from "axios";
import './index.css';

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  
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
    const res = await axios.post("https://ai-flow-app-jg0n.onrender/api/ask-ai", {
      prompt: input
    });

    setOutput(res.data.result);
     setLoading(false);
  };
  const saveData = async () => {
  await axios.post("https://ai-flow-app-jg0n.onrender/api/save", {
    prompt: input,
    response: output
  });

  alert("Saved!");
};

  return (
     <div className="h-screen bg-gray-50 p-5">
      <h1 className="text-2xl font-bold mb-4 text-center">
        AI Flow Builder
      </h1>

      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={runFlow}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Run Flow
        </button>

        <button
          onClick={saveData}
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Save
        </button>
      </div>

      <div className="h-500 w-full flex justify-center  bg-white rounded-xl shadow ">
        <ReactFlow nodes={nodes} edges={edges} />
      </div>
    </div>
  );
}

export default App;