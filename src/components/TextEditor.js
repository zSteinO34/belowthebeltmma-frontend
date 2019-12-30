import React from "react";
import Trix from "trix";

class TextEditor extends React.Component {
    render() {
        return (
            <div>
                <input
                    type="hidden"
                    id="trix"
                />
                <trix-editor input="trix" />
            </div>
        );
    }
}

export default TextEditor;