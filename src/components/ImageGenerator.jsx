import React, { useRef, useState } from 'react'
import default_img from "./Assets/bg (2).jpg"
import "./ImageGenerator.css"

const ImageGenerator = () => {

  const [image_url, setImage_url] = useState('/')
  const inputRef = useRef(null)

  //NEED TO FIND A FREE AI GENERATOR API // PAUSING PROJECT

  const GenerateImage = async () => {
    if(inputRef.current.value === "") {
      return  0
    }
    const response = await fetch(
      "https://api.deepai.org/api/text2img",{
        text: `${inputRef.current.value}`,
        method: "POST",
        headers: {
          "Api-key" : "8328e84f-d506-4a9b-8feb-d36f7474b267"
        },
      },
    )
    const data = await response.json()
    console.log(data)
  }
  
  return (
    <div className="container">
      <div className="Gen-text">Ai Image <span>Generator</span></div>
      <div className="Gen-image">
        <img src={image_url === "/" ? default_img : image_url } alt="default_img" />
      </div>

      <div className="search-box">
        <input className="search-input" ref={inputRef} placeholder="What's on your Mind ?" ></input>
        <div className="generate-img" onClick={() => {GenerateImage()}}>Generate</div>
      </div>
    </div>
  );
}

export default ImageGenerator