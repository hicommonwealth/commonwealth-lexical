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
  BOLD_ITALIC_STAR,
  BOLD_ITALIC_UNDERSCORE,
  BOLD_STAR,
  BOLD_UNDERSCORE,
  CODE, HEADING,
  HIGHLIGHT,
  INLINE_CODE, ITALIC_STAR, ITALIC_UNDERSCORE, LINK, ORDERED_LIST, QUOTE,
  STRIKETHROUGH, UNORDERED_LIST,
} from "@lexical/markdown";
import {AutoLinkNode, LinkNode} from "@lexical/link";
import {ListItemNode, ListNode} from "@lexical/list";
import {HeadingNode, QuoteNode} from "@lexical/rich-text";
import {HorizontalRuleNode} from "@lexical/react/LexicalHorizontalRuleNode";
import {CodeNode} from "@lexical/code";
import {AutoLinkPlugin} from "@lexical/react/LexicalAutoLinkPlugin";
import {MATCHERS} from "./matchers";

const TRANSFORMERS = [
  // element
  HEADING,
  QUOTE,
  CODE,
  UNORDERED_LIST,
  ORDERED_LIST,
  // text
  INLINE_CODE,
  BOLD_ITALIC_STAR,
  BOLD_ITALIC_UNDERSCORE,
  BOLD_STAR,
  BOLD_UNDERSCORE,
  HIGHLIGHT,
  ITALIC_STAR,
  ITALIC_UNDERSCORE,
  STRIKETHROUGH,
  // // text match
  LINK
]

const initialConfig = {
  namespace: 'MyEditor',
  theme: {

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
    heading: {
      h1: 'mb-5 text-5xl font-extrabold',
      h2: 'mb-4 text-4xl font-bold',
      h3: 'mb-3 text-3xl font-bold',
      h4: 'mb-2 text-2xl font-bold',
      h5: 'mb-1 text-xl font-bold',
    },
    code: 'markdown-code',

  },
  nodes: [
    CodeNode,
    HorizontalRuleNode,
    HeadingNode,
    QuoteNode,
    ListNode,
    ListItemNode,
    LinkNode,
    AutoLinkNode,
  ],
  onError: () => console.error("Some error or something!"),
};

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
        <MarkdownShortcutPlugin transformers={TRANSFORMERS}/>
        <AutoFocusPlugin />
        <EditorRefPlugin editorRef={editorRef} />
        <AutoLinkPlugin matchers={MATCHERS}/>
        <OnChangePlugin onChange={editorState => {

          editorState.read(() => {
            const markdown = $convertToMarkdownString(TRANSFORMERS);
            console.log(markdown);
          });
        }} />

      </LexicalComposer>
    </div>
  );
}

export default App;
