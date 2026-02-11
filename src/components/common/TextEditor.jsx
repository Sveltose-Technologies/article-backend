import React from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const TextEditor = ({ value, onChange }) => {
  return (
    <div className="bg-white border rounded">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        style={{ height: "300px", marginBottom: "50px" }}
        placeholder="Write your article content here..."
      />
    </div>
  );
};
export default TextEditor;
