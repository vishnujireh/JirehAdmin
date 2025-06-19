import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const HtmlEditor = () => {
  const [editorContent, setEditorContent] = useState<string>('');

  const handleEditorChange = (content: string) => {
    setEditorContent(content); // You can save or process content here
  };

  return (
    <div>
      
      <Editor
        apiKey="kn8xrfe2efkl89ucuweiu0f113rvvxfiss626qhf2itbmv9m" // Optional, only needed for TinyMCE cloud usage
        value={editorContent}
        init={{
          height: 300,
       
          menubar: true,
          plugins: ['advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'print', 'preview', 'searchreplace', 'wordcount'],
          toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link image',
        }}
        onEditorChange={handleEditorChange}
      />
    </div>
  );
};

export default HtmlEditor;
