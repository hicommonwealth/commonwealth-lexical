import React, {useRef} from 'react';
import './App.css';

import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import {OnChangePlugin} from "@lexical/react/LexicalOnChangePlugin";

import {
  MarkdownShortcutPlugin
} from "@lexical/react/LexicalMarkdownShortcutPlugin";
import {EditorRefPlugin} from "@lexical/react/LexicalEditorRefPlugin";
import {LexicalEditor} from "lexical";
import {
  $convertToMarkdownString,
  BOLD_STAR,
} from "@lexical/markdown";

const theme = {

  text: {
    bold: 'lexical-text-bold',
    italic: 'lexical-text-italic',
    underline: 'lexical-text-underline',
    code: 'lexical-text-code',
    highlight: 'lexical-text-highlight',
    strikethrough: 'lexical-text-strikethrough',
    subscript: 'lexical-text-subscript',
    superscript: 'lexical-text-superscript',
  },


}

const initialConfig = {
  namespace: 'MyEditor',
  theme,
  onError: () => console.error("Some error or something!"),
};

const myTransformers = [BOLD_STAR]
function App() {

  const editorRef = useRef<LexicalEditor>(null);

  return (
    <div className="App">
      <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin
          contentEditable={<ContentEditable />}
          placeholder={<div>Enter some text...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <MarkdownShortcutPlugin transformers={myTransformers}/>
        <AutoFocusPlugin />
        <EditorRefPlugin editorRef={editorRef} />
        <OnChangePlugin onChange={editorState => {

          editorState.read(() => {
            const markdown = $convertToMarkdownString(myTransformers);
            console.log(markdown);
          });
        }} />

      </LexicalComposer>
    </div>
  );
}

export default App;
