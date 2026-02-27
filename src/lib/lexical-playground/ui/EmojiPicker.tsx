import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect, useRef, useState } from 'react';
import { $createTextNode, $getSelection } from 'lexical';

export default function EmojiPicker() {
    const [editor] = useLexicalComposerContext();
    const [show, setShow] = useState(false);
    const pickerRef = useRef<HTMLDivElement | null>(null);
  
    useEffect(() => {
        // Logic to detect clicks outside
        const handleClickOutside = (event: MouseEvent) => {
          if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
            setShow(false);
          }
        };

        if (show) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [show]);

    const onSelectEmoji = (emojiData: { native: string }) => {
      editor.update(() => {
        const selection = $getSelection();
        // emojiData.native is the actual emoji character (e.g., "🚀")
        const emojiNode = $createTextNode(emojiData.native);
        if (selection) {
          selection.insertNodes([emojiNode]);
        }
      });
      setShow(false);
    };
  
    return (
      <div className="relative" ref={pickerRef}>
        <button type="button" onClick={() => setShow(!show)} style={{ cursor: 'pointer' }}>😀</button>
        {show && (
          <div className="absolute z-10">
            <Picker data={data} 
                    onEmojiSelect={(emoji: { native: string }) => {
                        onSelectEmoji(emoji);
                        setShow(false);
                    }} />
          </div>
        )}
      </div>
    );
  }