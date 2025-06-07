import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound404() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [lines, setLines] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [cursorBlink, setCursorBlink] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  // 光标闪烁
  useEffect(() => {
    const interval = setInterval(() => setCursorBlink(prev => !prev), 500);
    return () => clearInterval(interval);
  }, []);

  // 初始加载行
  useEffect(() => {
    const initialLines = t('notfound.lines', { returnObjects: true }) as string[];
    let i = 0;
    const interval = setInterval(() => {
      if (i < initialLines.length) {
        setLines(prev => [...prev, initialLines[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 400);
    return () => clearInterval(interval);
  }, [t]);

  // 命令处理器 (略，和你的一致)

  // 这里用你的原代码保持不变...

  const handleCommand = (command: string) => {
    const lower = command.toLowerCase();

    setLines(prev => [...prev, `$ ${command}`]);

    if (lower === 'cls') {
      setLines([]);
      return;
    }

    if (lower === 'help') {
      setLines(prev => [
        ...prev,
        'AVAILABLE COMMANDS:',
        '- GOTO /home',
        '- GOTO /about',
        '- GOTO /projects',
        '- GOTO /inspirations',
        '- GOTO https://example.com',
        '- GOTO /dream',
        '- GOTO /404',
        '- BEEP',
        '- DATE',
        '- TIME',
        '- CLS',
        '- DIR',
        '- ECHO [text]',
        '- HELP',
      ]);
      return;
    }

    if (lower === 'dir') {
      setLines(prev => [
        ...prev,
        ' Directory of C:\\nocig.navi\\',
        '',
        '<DIR>   /home',
        '<DIR>   /about',
        '<DIR>   /projects',
        '<DIR>   /inspirations',
        '<DIR>   /dream',
        '',
        '         0 files    5 folders',
      ]);
      return;
    }

    if (lower.startsWith('echo ')) {
      const echoText = command.slice(5);
      setLines(prev => [...prev, echoText]);
      return;
    }

    if (lower === 'goto /404') {
      setLines(prev => [...prev, 'SYNTAX ERROR - Cannot goto 404']);
      return;
    }

    if (lower === 'goto /dream') {
      const alt = Math.random() > 0.5 ? 'PORTAL OFFLINE' : 'DIMENSION LOCKED';
      setLines(prev => [...prev, alt]);
      return;
    }

    if (lower.startsWith('goto https://') || lower.startsWith('goto http://')) {
      const url = command.slice(5).trim();
      window.location.href = url;
      return;
    }

    const matched = lower.match(/^goto\s+\/(home|about|projects|inspirations)$/);
    if (matched) {
      navigate(matched[0].slice(5));
      return;
    }

    if (lower === 'beep') {
      const context = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = context.createOscillator();
      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(880, context.currentTime);
      oscillator.connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.1);
      setLines(prev => [...prev, '*beep*']);
      return;
    }

    if (lower === 'date') {
      const today = new Date().toISOString().split('T')[0];
      setLines(prev => [...prev, `Current date: ${today}`]);
      return;
    }

    if (lower === 'time') {
      const now = new Date().toLocaleTimeString();
      setLines(prev => [...prev, `Current time: ${now}`]);
      return;
    }

    setLines(prev => [...prev, 'SYNTAX ERROR - Unknown or invalid command']);
  };

  // 输入事件
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input.trim());
      setInput('');
    }
  };

  // 自动 focus
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div
      className="bg-black min-h-screen flex items-center justify-center p-8"
      onClick={() => inputRef.current?.focus()}
    >
      <div
        className="bg-[#001020] text-[#50fa7b] font-mono rounded-lg p-6"
        style={{
          width: '80vw',
          maxWidth: '640px',
          aspectRatio: '4 / 3',
          boxShadow: '0 0 40px #50fa7b, inset 0 0 20px #50fa7b',
          border: '3px solid #50fa7b',
          overflowY: 'auto',
          whiteSpace: 'pre-wrap',
          userSelect: 'none',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <div>
          <div className="mb-6 text-[#ff5555] text-sm select-text">
            [ ERROR CODE: 0x404_NOTFOUND ]
          </div>

          <div className="space-y-1 mb-4 max-h-[70vh] overflow-y-auto">
            {lines.map((line, idx) => (
              <div key={idx}>
                <span className="text-[#ff79c6] select-text">$</span>&nbsp;{line}
              </div>
            ))}
          </div>
        </div>

        {/* 输入区域 */}
        <div className="flex items-center">
        <span className="text-[#ff79c6] select-none">$</span>&nbsp;
        <span className="whitespace-pre-wrap inline-block">{input}</span>
        <span
          className={`ml-1 w-2 h-5 bg-[#50fa7b] ${
            cursorBlink ? 'opacity-100' : 'opacity-0'
          }`}
        ></span>
      </div>


        {/* 隐藏输入框接收键盘输入 */}
        <input
          ref={inputRef}
          value={input}
          onChange={onInputChange}
          onKeyDown={onInputKeyDown}
          autoFocus
          className="absolute opacity-0 pointer-events-none"
        />

        <div className="mt-4 text-xs text-[#6272a4] select-none">
          👉 Try: <code>GOTO /home</code>, <code>HELP</code>, <code>CLS</code>
        </div>
      </div>

      <div className="absolute bottom-4 text-[#6272a4] text-sm select-none">
        nocig.navi // 404
      </div>
    </div>
  );
}
