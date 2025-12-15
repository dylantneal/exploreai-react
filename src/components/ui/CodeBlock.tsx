import { Highlight, themes } from 'prism-react-renderer';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export default function CodeBlock({ 
  code, 
  language = 'python',
  title 
}: CodeBlockProps) {
  return (
    <div style={{ marginBottom: 'var(--spacing-lg)' }}>
      {title && (
        <div style={{
          background: 'var(--color-primary)',
          color: 'var(--color-text-light)',
          padding: 'var(--spacing-sm) var(--spacing-md)',
          borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
          fontFamily: 'var(--font-family-display)',
          fontSize: 'var(--font-size-sm)',
        }}>
          {title}
        </div>
      )}
      <Highlight
        theme={themes.nightOwl}
        code={code.trim()}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className}
            style={{
              ...style,
              padding: 'var(--spacing-md)',
              borderRadius: title ? '0 0 var(--radius-md) var(--radius-md)' : 'var(--radius-md)',
              overflow: 'auto',
              fontSize: '0.875rem',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span style={{ 
                  display: 'inline-block', 
                  width: '2em', 
                  userSelect: 'none', 
                  opacity: 0.5,
                  marginRight: '1em',
                }}>
                  {i + 1}
                </span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}

