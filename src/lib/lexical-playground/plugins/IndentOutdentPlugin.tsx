/**
 * Registers handlers for INDENT_CONTENT_COMMAND and OUTDENT_CONTENT_COMMAND
 * so that Indent/Outdent toolbar buttons and keyboard shortcuts work.
 */
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $handleIndentAndOutdent } from '@lexical/utils';
import {
  COMMAND_PRIORITY_EDITOR,
  INDENT_CONTENT_COMMAND,
  OUTDENT_CONTENT_COMMAND,
} from 'lexical';
import { useEffect } from 'react';

const MAX_INDENT = 7;

export default function IndentOutdentPlugin(): null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      INDENT_CONTENT_COMMAND,
      () => {
        return $handleIndentAndOutdent((block) => {
          const indent = block.getIndent();
          if (indent < MAX_INDENT) {
            block.setIndent(indent + 1);
          }
        });
      },
      COMMAND_PRIORITY_EDITOR,
    );
  }, [editor]);

  useEffect(() => {
    return editor.registerCommand(
      OUTDENT_CONTENT_COMMAND,
      () => {
        return $handleIndentAndOutdent((block) => {
          const indent = block.getIndent();
          if (indent > 0) {
            block.setIndent(indent - 1);
          }
        });
      },
      COMMAND_PRIORITY_EDITOR,
    );
  }, [editor]);

  return null;
}
