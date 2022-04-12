import React from "react";
import Webcam from "react-webcam";
//const FileType = require('file-type');
//import fs from "fs"
//import FileType from "file-type"
 
class WebcamCapture extends React.Component {
    setRef = webcam => {
      this.webcam = webcam;
    };
    /*state = {
      imageData: null
    }*/
  
    capture = () => {
      const imageSrc = this.webcam.getScreenshot();
      //console.log("filetype for webcam", FileType.fromFile(imageSrc));
      console.log("webcam capture image", imageSrc);
      this.props.onCapture(imageSrc);

      //console.log("onCaptureProp", this.props.onCapture)
      /*this.setState({
        imageData: imageSrc
      })*/
      
    };
  
    render() {
      const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
      };
  
      return (
        <div>
          <Webcam
            audio={false}
            height={350}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={350}
            videoConstraints={videoConstraints}
          />
          <button onClick={this.capture}>Capture photo</button>
        </div>
      );
    }
  }

  export default WebcamCapture;
  