/**
 * Rich text editor for Contact form using Playground theme and ToolbarPlugin.
 */
import type { JSX } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ClickableLinkPlugin } from '@lexical/react/LexicalClickableLinkPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $generateHtmlFromNodes } from '@lexical/html';
import { $getRoot, $getSelection, $isRangeSelection } from 'lexical';
import { useCallback, useEffect, useState } from 'react';

import { SettingsContext } from './context/SettingsContext';
import { ToolbarContext } from './context/ToolbarContext';
import { validateUrl } from './utils/url';
import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme';
import { ContactEditorNodes } from './nodes/ContactEditorNodes';
import IndentOutdentPlugin from './plugins/IndentOutdentPlugin';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import ContentEditableUI from './ui/ContentEditable';

import './themes/PlaygroundEditorTheme.css';
import './styles/toolbar.css';
import SpeechToTextPlugin from './plugins/SpeechToTextPlugin';
import EmojisPlugin from './plugins/EmojisPlugin';
import { EmojiNode } from './nodes/EmojiNode';
import EmojiPickerPlugin from './plugins/EmojiPickerPlugin';

function OnChangePlainText({ onPlainTextChange }: { onPlainTextChange: (text: string) => void }) {
  const [editor] = useLexicalComposerContext();
  const onChange = useCallback(() => {
    editor.getEditorState().read(() => {
      const root = $getRoot();
      onPlainTextChange(root.getTextContent());
    });
  }, [editor, onPlainTextChange]);

  useEffect(() => {
    return editor.registerUpdateListener(() => onChange());
  }, [editor, onChange]);
  useEffect(() => onChange(), [onChange]);
  return null;
}

function OnChangeHtml({ onHtmlChange }: { onHtmlChange: (html: string) => void }) {
  const [editor] = useLexicalComposerContext();
  const onChange = useCallback(() => {
    editor.getEditorState().read(() => {
      const html = $generateHtmlFromNodes(editor, null);
      onHtmlChange(html);
    });
  }, [editor, onHtmlChange]);

  useEffect(() => {
    return editor.registerUpdateListener(() => onChange());
  }, [editor, onChange]);
  useEffect(() => onChange(), [onChange]);
  return null;
}

function ToolbarWithEditor({
  onPlainTextChange,
  onHtmlChange,
  placeholder,
}: {
  onPlainTextChange: (text: string) => void;
  onHtmlChange?: (html: string) => void;
  placeholder: string;
}): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const [isLinkEditMode, setIsLinkEditMode] = useState(false);

  return (
    <>
      <ToolbarPlugin
        editor={editor}
        activeEditor={activeEditor}
        setActiveEditor={setActiveEditor}
        setIsLinkEditMode={setIsLinkEditMode}
      />
      <OnChangePlainText onPlainTextChange={onPlainTextChange} />
      {onHtmlChange && <OnChangeHtml onHtmlChange={onHtmlChange} />}
      <RichTextPlugin
        contentEditable={
          <div className="min-h-[156px] rounded-md border border-gray-300 bg-white text-black overflow-auto [color-scheme:light]">
            <div className="relative">
              <ContentEditableUI placeholder={placeholder} placeholderClassName="ContentEditable__placeholder ContentEditable__placeholder--contact" />
            </div>
          </div>
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <IndentOutdentPlugin />
      <ListPlugin />
      <CheckListPlugin />
      <LinkPlugin validateUrl={validateUrl} />
      <ClickableLinkPlugin newTab />
    </>
  );
}

export interface ContactEditorProps {
  placeholder?: string;
  onPlainTextChange: (text: string) => void;
  onHtmlChange?: (html: string) => void;
  className?: string;
}

export function ContactEditor({
  placeholder = 'Your message',
  onPlainTextChange,
  onHtmlChange,
  className,
}: ContactEditorProps): JSX.Element {
  const initialConfig = {
    nodes: [EmojiNode, ...ContactEditorNodes],
    namespace: 'ContactEditor',
    theme: PlaygroundEditorTheme,
    onError: (err: Error) => console.error('Lexical ContactEditor:', err),
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <SettingsContext>
        <ToolbarContext>
          <div className={className}>
            <ToolbarWithEditor onPlainTextChange={onPlainTextChange} onHtmlChange={onHtmlChange} placeholder={placeholder} />
          </div>
        </ToolbarContext>
      </SettingsContext>
      <SpeechToTextPlugin />      
      <EmojisPlugin />
    </LexicalComposer>
  );
}
