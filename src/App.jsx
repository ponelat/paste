import {useState} from 'react'
import './App.css'

function App() {
    const [clipboardData, setClipboardData] = useState([]);

    const handlePaste = (event) => {
      const items = event.clipboardData.items;
      const data = [];

      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        const totalItems = items.length
        const {kind, type} = items[i]

	if (kind === 'string') {
	  item.getAsString((str) => {
	    data.push({ type, content: str });
	    if (i === totalItems - 1) {
	      setClipboardData((prevData) => [...prevData, ...data]);
	    }
	  });
	} else if (kind === 'file') {
	  data.push({ type, content: item.getAsFile() });
	  if (i === totalItems - 1) {
	    setClipboardData((prevData) => [...prevData, ...data]);
	  }
	}
      }
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
	<div className="text-center mb-8">
	  <h1 className="text-3xl font-bold text-gray-800">
	    Paste into the text box to show clipboard info
	  </h1>
	</div>
	<div className="mb-8 w-full max-w-md">
	  <textarea
	    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
	    rows="5"
	    onPaste={handlePaste}
	  ></textarea>
	</div>
	<div className="w-full max-w-2xl">
	  <table className="w-full table-auto bg-white text-gray-800 border border-gray-200 rounded-lg shadow-sm">
	    <thead>
	      <tr>
		<th className="px-4 py-2 border-b border-gray-200">Type</th>
		<th className="px-4 py-2 border-b border-gray-200">Content</th>
	      </tr>
	    </thead>
	    <tbody>
	      {clipboardData.map((item, index) => (
		<tr key={index}>
		  <td className="px-4 py-2 border-b border-gray-200 align-text-top">{item.type}</td>
		  <td className="px-4 py-2 border-b border-gray-200 max-h-[400px] overflow-y-auto">
		    {item.type.startsWith('image/') ? (
		      <img
			src={URL.createObjectURL(item.content)}
			alt="Clipboard content"
			className="max-w-full h-auto"
		      />
		    ) : (item.type === 'text/html') ? (
		      <div dangerouslySetInnerHTML={{__html: item.content}} />
		    ) : (
                      item.content
                    )}
		  </td>
		</tr>
	      ))}
	    </tbody>
	  </table>
	</div>
      </div>
    )
  }

export default App
