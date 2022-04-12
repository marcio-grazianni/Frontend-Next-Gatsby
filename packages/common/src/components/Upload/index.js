import React from 'react';
import ImageUploader from 'react-images-upload';

class UploadImage extends React.Component {
  //    constructor(props) {
  //        super(props);
  //         this.state = { pictures: [] };
  //    }

  //    onDrop = (picture) => {
  //        this.setState({
  //            pictures: this.state.pictures.concat(picture),

  //        });
  //        console.log("picture", picture);
  //        console.log("this.state Upload", this.state)
  //    }

  render() {
    return (
      <ImageUploader
        withIcon={true}
        withPreview={true}
        //buttonText='Choose images'
        onChange={this.props.onDrop}
        withLabel={true}
        singleImage={true}
        name={true}
        //label={"thank you"}
        imgExtension={['.jpg', '.jpeg', '.png', '.pdf']}
        maxFileSize={5242880}
      />
    );
  }
}

export default UploadImage;
