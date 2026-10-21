import { useState } from 'react'
import { FiCpu, FiUser, FiCopy, FiCheck } from './Icons'


function RichText({ text }) {
  const parts = text.split(/```(\w*)\n?([\s\S]*?)```/g)
  const out = []
  for (let i = 0; i < parts.length; i += 3) {
    out.push(
      <span key={`t${i}`} className="whitespace-pre-wrap break-words">
        {parts[i].split(/\*\*(.+?)\*\*/g).map((seg, j) =>
          j % 2 ? <strong key={j} className="text-cyan-300">{seg}</strong> : seg,
        )}
      </span>,
    )
    if (parts[i + 2] !== undefined) {
      out.push(
        <pre
          key={`c${i}`}
          className="my-2 overflow-x-auto rounded-xl border border-white/10 bg-black/50 p-3 text-[13px] leading-relaxed text-cyan-100"
        >
          <code>{parts[i + 2]}</code>
        </pre>,
      )
    }
  }
  return <>{out}</>
}

export function Avatar({ ai, loading }) {
  return (
    <div className="relative h-8 w-8 shrink-0 sm:h-9 sm:w-9">
      {loading && <span className="ring" />}
      <div
        className={`grid h-full w-full place-items-center rounded-full text-white ${
          ai ? 'bg-gradient-to-br from-violet-600 to-cyan-500 shadow-[0_0_16px_rgba(34,211,238,.5)]' : 'bg-white/10'
        }`}
      >
        {ai ? <FiCpu size={16} /> : <FiUser size={16} />}
      </div>
    </div>
  )
}

const Message = ({ m }) => {
  const [copied, setCopied] = useState(false)
  const isUser = m.role === 'user'

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(m.text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch { /* clipboard unavailable */ }
  }

  return (
    <div className={`msg-in flex gap-2.5 sm:gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <Avatar ai={!isUser} />
      <div className="relative min-w-0 max-w-[85%] sm:max-w-[75%]">
        <div
          className={`rounded-2xl px-3.5 py-2.5 text-[14.5px] leading-relaxed sm:text-[15px] ${
            isUser
              ? 'user-bubble rounded-tr-sm text-white'
              : m.error
                ? 'ai-bubble rounded-tl-sm text-pink-300'
                : 'ai-bubble rounded-tl-sm'
          }`}
        >
          <RichText text={m.text} />
        </div>
        {!isUser && !m.error && (
          <button
            onClick={copy}
            className="ml-1 mt-1 flex items-center gap-1 text-xs text-gray-500 transition hover:text-cyan-300"
            aria-label="Copy response"
          >
            {copied ? <FiCheck size={12} /> : <FiCopy size={12} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        )}
      </div>
    </div>
  )
}

export default Message
