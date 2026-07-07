import { useCallback, useState ,useEffect,useRef} from 'react'

import './App.css'

function App() {
  const[length,setLength]=useState(8);
  const[number,setNumber]=useState(false);
  const[char, setChar]=useState(false);
  const[password,setPassword]=useState("");

  const passwordGenerator=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(number){
      str+="123456789";
    }
    if(char){
      str+="!@#$%^&*()_+-={}[]|"
    }
    for(let i=1;i<=length;i++){
      let ch=Math.floor(Math.random()*str.length+1);
      pass+=str.charAt(ch);
    }
    setPassword(pass)
  },
  [length,number,char,setPassword])

  useEffect(()=>{passwordGenerator()},[length,number,char,passwordGenerator])

  const passwordRef=useRef(null);

  const clipBoard=useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password])

  return (
    <>
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
  <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">

    {/* Heading */}
    <h1 className="text-3xl font-bold text-center mb-6">
      Password Generator
    </h1>

    {/* Input + Copy Button */}
    <div className="flex gap-2 mb-6">
      <input
        type="text"
        placeholder="Generated Password"
        value={password}
        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        readOnly
        ref={passwordRef}
      />

      <button className="bg-blue-500 hoverbg-blue-500 hover:bg-blue-600 active:bg-blue-700 active:scale-95  py-2  transition-all duration-150:bg-blue-600 text-white px-4 rounded-lg"
              onClick={clipBoard}
              >
        Copy
      </button>
    </div>

    {/* Range */}
    <div className="mb-5">
      <div className="flex justify-between mb-2">
        <span className="font-medium">Length</span>
        <span>{length}</span>
      </div>

      <input
        type="range"
        min="6"
        max="100"
        value={length}
        className="w-full"
        onChange={(e)=>{setLength(e.target.value)}}
        
      />
    </div>

    {/* Checkboxes */}
    <div className="flex gap-6">

      <label className="flex items-center gap-2 cursor-pointer">
        <input 
        type="checkbox"
        defaultChecked={number}
        onChange={()=>{setNumber((prev=>!prev))}}
        />
        <span>Numbers</span>
      </label>

      <label className="flex items-center gap-2 cursor-pointer">
        <input 
        type="checkbox" 
        defaultChecked={char}
        onChange={()=>{setChar((prev=>!prev))}}
        />
        <span>Characters</span>
      </label>

    </div>

  </div>
</div>
    </>
  )
}

export default App
