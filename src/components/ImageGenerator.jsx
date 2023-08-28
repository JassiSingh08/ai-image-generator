import React, { useRef, useState } from 'react'
import default_img from "./Assets/bg (2).jpg"
import "./ImageGenerator.css"

const ImageGenerator = () => {

  const [image_url, setImage_url] = useState('/')
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null)

  //NEED TO FIND A FREE AI GENERATOR API // PAUSING PROJECT

  const GenerateImage = async () => {
    if (inputRef.current.value === "") {
      return;
    }
    setLoading(true)
    const data = inputRef.current.value;
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/prompthero/openjourney",
        {
          headers: { Authorization: `Bearer //HUGGING FACE API KEY//` },
          method: "POST",
          body: JSON.stringify( data ), // Assuming the API expects the data in a specific format
        }
      );
      if (!response.ok) {
        throw new Error("Request failed with status: " + response.status);
      }
      const blob = await response.blob(); // Convert the response to a binary blob
      const imageUrl = URL.createObjectURL(blob); // Create a URL from the blob
      setImage_url(imageUrl); // Update the state with the image URL
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  
  
  return (
    <div className="container">
      <div className="Gen-text">Ai Image <span>Generator</span></div>
      <div className="Gen-image">
        <img src={image_url === "/" ? default_img : image_url } alt="default_img" />
      </div>

      <div className="loading">
        <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
        <div className={loading ? "loading-text" : "display-none"}>Loading...</div>
      </div>

      <div className="search-box">
        <input className="search-input" ref={inputRef} placeholder="What's on your Mind ?" ></input>
        <div className="generate-img" onClick={() => {GenerateImage()}}>Generate</div>
      </div>
    </div>
  );
}

export default ImageGenerator
