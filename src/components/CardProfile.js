import React, { useState } from 'react';
import ReactDOM from 'react-dom';

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

// Our app
const CardProfile=()=> {
    const [files, setFiles] = useState([]);


    



    return (
        <div className="App">
            <input type="file" 
    class="filepond"
    name="filepond"
    accept="image/png, image/jpeg, image/gif"/>
        </div>
    );
}

// Attach App to DOM
export default CardProfile