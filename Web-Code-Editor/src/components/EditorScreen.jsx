import React, { useState, useEffect, useRef } from 'react'

import { useCompileCodeMutation } from '../api/compilerApi';

import Editor from "react-simple-code-editor";
import { highlight, languages} from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-python";
import "prismjs/components/prism-c"
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-csharp"
import "prismjs/components/prism-java"
import "prismjs/themes/prism-tomorrow.css";

import {FaPlay,FaSave} from 'react-icons/fa'


import { Languages as Lang } from '../config/Languages';
const EditorScreen = () => {
  let regexp = /android|iphone|kindle|ipad/i;
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => regexp.test(navigator.userAgent))
  const [height,setHeight]=useState(window.innerHeight)
  
  const [code, setCode] = useState("");
  const [grammer,setGrammer]=useState(languages.c);
  const [langSelect,setLangSelect]=useState(0)
  const [isinput,setIsInput]=useState(false)
  const [inputText,setInputText]=useState('')
  const [lineNumbers, setLineNumbers] = useState();
  
  const [compileCode,{data,error,isError}]=useCompileCodeMutation()
  const isCode= code !== ""

  
  useEffect(()=>{
    
    if(Lang[langSelect].prismname==="cpp"){setGrammer(languages.cpp)}
    else if(Lang[langSelect].prismname==="c"){setGrammer(languages.cpp)}
    else if(Lang[langSelect].prismname==="python"){setGrammer(languages.py)}
    else if(Lang[langSelect].prismname==="java"){setGrammer(languages.java)}
    else if(Lang[langSelect].prismname==="csharp"){setGrammer(languages.csharp)}
  },[langSelect])
  const handleOnRun=()=>{
    const compilerObject={
      "language":`${Lang[langSelect].apiName}`,
      "version":"latest",
      "code": `${code}`,
      "input":isinput ?inputText:null,
    }
    if(isCode){compileCode(compilerObject);}
    else{alert("No Code to RUN")}
  }
  
  if (isError){console.log(error);console.log(error?.data?.output)}
  const onhandleSelect=(e)=>{
    setLangSelect(e.target.value)
    //setLangGrammer(e.target.value)
  }

  const handleChange = (event) => {
    setCode(event.target.value);
    event.target.value
      .split("\n")
      .map((line, index) => setLineNumbers(index + 1));
  };
  let EditorDesignDesktop = (
    <div className='grid grid-cols-2'>
      <div className="Editor" style={{'height':`${height-73}px`}}>
        <div className="lineNumber editorFont">
          {Array.from(Array(lineNumbers), (e, i) => {
            return (
              <div className="Numbers" key={i}>
                {i + 1}
              </div>
            );
          })}
        </div>
        <Editor
          className="writingSpace editorFont"
          value={code}
          onChange={handleChange}
          onValueChange={(code) => setCode(code)}
          highlight={(code) => highlight(code,grammer, `${Lang[langSelect].prismname}`)}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 16
          }}
          tabSize={4}
        />
      </div>
      <div className='grid grid-cols-1'>
        <div className='Editor-Console ' style={{'height':`${(height-76)/2}px`}} >
          <p className='bg-slate-800 text-white pl-2'>Console</p>
          <div className='console editorFont' style={{'height':`${(height-76)/2}px`}}>{data?.output || error?.data?.output}
          {
            data!=undefined ?<p className='text-green-400'>{`Compiled in : ${data?.cpuTime}s ,Memory : ${data?.memory},`}</p>:null
          }</div>
          {/* <textarea className='writingSpace-Console editorFont'  value={consoleOutput}/> */}
        </div>
        <div className='bg-black ' style={{'height':`${(height-76)/2}px`}}>
          <p className='bg-slate-800 text-white pl-2'>Input&nbsp;<input type="checkbox" onChange={()=>setIsInput(!isinput)} checked={isinput} className='m-2 h-4 w-4 focus:accent-blue-500'/></p>
          <textarea className='writingSpace-Console' onChange={(e)=>setInputText(e.target.value)}/>
        </div>
      </div>
    </div>
  )

  let NavBar = (
    <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-slate-800">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <a
            className="text-xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
            href="#pablo"
          >
            WCE
          </a>
          <button
            className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <i className="">{navbarOpen ? 'X' : '⚙'}</i>
          </button>
        </div>
        <div
          className={
            "lg:flex flex-grow items-center" +
            (navbarOpen ? " flex" : " hidden")
          }
          id="example-navbar-danger"
        >
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            <li className="nav-item">
             <div className="relative w-full lg:max-w-sm">
              <select className="w-full p-2 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600" onChange={onhandleSelect}>
                {
                  Lang.map((Lang,index)=>
                    <option key={index} value={index}>{Lang.displayname}</option>
                  )
                }
              </select>
            </div>
            </li>
            <li className="nav-item">
              <button className='ml-4 p-2.5 bg-green-500 rounded-md hover:bg-green-800' onClick={handleOnRun}><FaPlay className="text-white text-xl" /></button>
            </li>
            <li className="nav-item">
              <button className='ml-4 p-2.5 bg-yellow-300 rounded-md hover:bg-yellow-500' onClick={null}><FaSave className="text-black text-xl" /></button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )

  return (
    <>
      {
        isMobile ? 
        <p className=' w-full p-5 h-screen pt-56 bg-black text-center text-white text-xl'>
        <p><b>Mobile View will be Available Soon</b></p>
        </p> :
        <>
        {NavBar}
        {EditorDesignDesktop}
        </> 
      }
    </>
  )
}

export default EditorScreen