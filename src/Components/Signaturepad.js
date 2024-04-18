import React, { useEffect, useRef, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas';
import fontOptions from "../Components/Fonts"
import "../../src/index.css"
const Signaturepad = () => {
   const signatureRef=useRef()
   const [pencolor,setpencolor]=useState('black')
   const [fontname,setFontname]=useState('Arial')
   const [typetext,settypetext]=useState("")
  
  function handleColor(evt){
    setpencolor(evt.target.value)
 }
  function hadledropdown(evt){
    setFontname(evt.target.value)
  }
function handletext(evt){
  settypetext(evt.target.value)
    
}
function handlereset(){
  signatureRef.current.clear()
   settypetext("")
}
function  handlesave(){
  const canvas = signatureRef.current.getCanvas();
  const signatureImage = canvas.toDataURL('image/png');
    // onSave(signatureImage);
    const downloadLink = document.createElement('a');
    downloadLink.href = signatureImage;
    downloadLink.download = 'canvas_image.png';
  // Programmatically click the anchor to trigger the download
    downloadLink.click();
  } 
useEffect(()=>{
   const canvas=signatureRef.current.getCanvas()
   const context= canvas.getContext("2d")
   context.font=`24px ${fontname}`
   context.clearRect(0, 0, canvas.width, canvas.height);
   context.fillText(typetext,10,30)
   context.fillStyle=pencolor
},[pencolor,fontname,typetext])
   return (
    <div className='meet'>
     <h1 className='text-3xl mb-3 font-bold flex flex-row justify-center'>React Signature Pad</h1>
     <div className='flex flex-col justify-center items-center gap-6'>
     <SignatureCanvas  
     ref={signatureRef}
     penColor={pencolor}
    canvasProps={{ height: 400,
     className: 'border border-gray-300 rounded-md mx-auto w-[300px] lg:w-[800px]  ',
      style:{color:pencolor}
    }
    }
    />
    <div className='flex flex-col justify-center gap-6  lg:flex-row items-center space-x-4 mt-4'>
    <input 
     type='color' 
     value={pencolor} 
     onChange={(e)=>{handleColor(e)}}/>
  <select value={fontname} onChange={(e)=>{hadledropdown(e)}}   className=' border border-white text-white p-1 rounded'>
    {
       fontOptions.map((item,index)=>{
         return    <option value={item} key={index}>{item}</option>
        })
    }
  </select>
  <input 
  type='text' 
  value={typetext} 
  placeholder='Type your Text '
  className="w-40  border border-gray-300  p-1 rounded" 
  onChange={(e)=>{handletext(e)}}/>
    </div>
    
  <div className='flex  gap-10'>
    <button  onClick={handlesave} className='border p-2 bg-[#408EC6] text-2xl rounded transition-colors duration-300 ease-in-out hover:bg-[#1E2761]'>Save Signature</button>
    <button onClick={handlereset} className='border p-2 bg-[#408EC6] text-2xl rounded transition-colors duration-300 ease-in-out hover:bg-[#1E2761]'>Reset</button>
  </div>
  </div>
  </div>
  )
}

export default Signaturepad
