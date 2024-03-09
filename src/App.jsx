
import { useState , useCallback, useEffect, useRef} from 'react'

function App() {
  const[length, setLength] = useState(8);
  const[num, setNum] = useState(false);
  const[char, setChar] = useState(false);
  const[password, setPassword] = useState("");

  const passRef = useRef(null);
  
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";
    if (num) str += "0123456789";
    if (char) str += "~`!@#$%^&*()_-+=;:.>,</?|/*";
    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, num, char, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, num, char, passwordGenerator])
  
  function show_alert(){
    alert("Text Copied");
  }
  return (
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-black-500">
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input 
          type="text"
          value = {password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password" 
          readOnly
          ref = {passRef}
          />
          <button
          onClick={() => {
            copyPasswordToClipboard();
            show_alert();
            
            
          }}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          >Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className="flex items-center gap-x-1">
            <input 
            type="range"
            min={8}
            max={20}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label htmlFor="lengthInput">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox"
            defaultChecked={num}
            id='numberInput'
            onChange={() => {
              setNum((prev) => !prev);
            }}
            />
            <label htmlFor="numInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox"
            defaultChecked={char}
            id='charInput'
            onChange={() => {
              setChar((prev) => !prev);
            }}
            />
            <label htmlFor="charInput">Char</label>
          </div>
        </div>
      </div>
  )
}

export default App
