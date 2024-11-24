import 'prismjs';
import 'prismjs/plugins/autoloader/prism-autoloader';
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/toolbar/prism-toolbar.min.css';
import 'prismjs/plugins/show-language/prism-show-language';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import Prism from 'prismjs';
import { getBlockTitle } from 'notion-utils';
import { useNotionContext, Text } from 'react-notion-x';
import { useEffect, useRef } from 'react';
import BLOG from 'blog.config';

import type { CodeBlock } from 'notion-types';

const CDN = BLOG.CDN;
Prism.plugins.autoloader.languages_path = `https://${CDN}/prism/1.29.0/components/`;

function Code({
  block,
  defaultLanguage = 'typescript',
  className = '',
}: {
  block: CodeBlock;
  defaultLanguage?: string;
  className?: string;
}) {
  const { recordMap } = useNotionContext();
  const content = getBlockTitle(block, recordMap);
  const language = (() => {
    const languageNotion = (
      block.properties?.language?.[0]?.[0] || defaultLanguage
    ).toLowerCase();

    switch (languageNotion) {
      case 'c++':
        return 'cpp';
      case 'f#':
        return 'fsharp';
      default:
        return languageNotion;
    }
  })();
  const caption = block.properties.caption;

  const codeRef = useRef();
  useEffect(() => {
    if (codeRef.current) {
      try {
        Prism.highlightElement(codeRef.current);
      } catch (err) {
        console.warn('prismjs highlight error', err);
      }
    }
  }, [codeRef]);

  return (
    <>
      <div className="w-full">
        <pre
          className={`notion-code line-numbers language-${language} ${className}`}
          style={{
            whiteSpace: 'pre-wrap',
          }}
        >
          <code ref={codeRef as any}>{content}</code>
        </pre>
      </div>

      {caption && (
        <figcaption className="notion-asset-caption">
          <Text value={caption} block={block} />
        </figcaption>
      )}
    </>
  );
}

export default Code;
