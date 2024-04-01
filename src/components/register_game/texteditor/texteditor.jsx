import { useState, useRef } from "react";
import JoditEditor from "jodit-react";
/**/ import HTMLReactParser from "html-react-parser";

function App() {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  console.log(content);

  return (
    <div>
      <div>Details</div>

      <JoditEditor
        ref={editor}
        value={content}
        onChange={(newContent) => setContent(newContent)}
      />

      {/*<div>{HTMLReactParser(content)}</div>*/}
    </div>
  );
}

export default App;
