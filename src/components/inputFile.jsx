import '../styles/inputFile.css'
import React from "react";
export function InputFile() {


    return (
        <div className='ff'>
            <input type="file" name="file" id="file" class="inputfile" />
            <label for="file">Choose a file</label>
        </div>
    )
}