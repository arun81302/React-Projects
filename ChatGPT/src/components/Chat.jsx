import { useEffect, useRef, useState } from 'react'
import { FiSend, FiMenu, FiPlus, FiCpu } from './Icons'
import { useChat } from '../context/chatContext'
import Message from './Message'
import Loading from './Loading'

const SUGGESTIONS = [
  'Explain React hooks simply',
  'Give me a DSA study plan',
  'Write a REST API in Express',
  'Mock interview: Amazon SDE',
]

const Chat = () => {
  const { messages, loading, send, newChat, setSidebarOpen } = useChat()
  const [input, setInput] = useState('')
  const endRef = useRef(null)
  const taRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, loading])

  // auto-grow textarea
  useEffect(() => {
    const el = taRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 140) + 'px'
  }, [input])

  const submit = (text) => {
    const q = (text ?? input).trim()
    if (!q || loading) return
    setInput('')
    send(q)
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  const empty = messages.length === 0

  return (
    <section className="flex h-full min-w-0 flex-1 flex-col px-3 sm:px-6">
      {/* Header (mobile menu) */}
      <header className="safe-top flex items-center justify-between py-3 md:hidden">
        <button
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
          className="glass grid h-10 w-10 place-items-center rounded-xl text-gray-200"
        >
          <FiMenu size={18} />
        </button>
        <h1 className="gradient-text text-lg font-bold tracking-tight">NeoChat AI</h1>
        <button
          onClick={newChat}
          disabled={loading}
          aria-label="New chat"
          className="glass grid h-10 w-10 place-items-center rounded-xl text-gray-200 disabled:opacity-40"
        >
          <FiPlus size={18} />
        </button>
      </header>

      <div className="mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col md:pt-4">
        {/* Messages */}
        <main className="scroll-area flex-1 overflow-y-auto py-4">
          {empty ? (
            <div className="flex h-full flex-col items-center justify-center px-2 text-center">
              <div className="btn-gradient mb-5 grid h-16 w-16 place-items-center rounded-2xl text-3xl text-white">
                <FiCpu />
              </div>
              <h2 className="gradient-text text-2xl font-extrabold sm:text-4xl">How can I help you today?</h2>
              <p className="mt-2 max-w-md text-sm text-gray-400 sm:text-base">
                Ask anything. Powered by Gemini, built for the future.
              </p>
              <div className="mt-7 grid w-full max-w-xl grid-cols-1 gap-2.5 sm:grid-cols-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => submit(s)}
                    className="glass rounded-xl px-4 py-3 text-left text-sm text-gray-200 transition hover:-translate-y-0.5 hover:border-violet-400/60 hover:shadow-[0_0_24px_rgba(139,92,246,.35)]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {messages.map((m, i) => (
                <Message key={i} m={m} />
              ))}
              {loading && <Loading />}
              <div ref={endRef} />
            </div>
          )}
        </main>

        {/* Input */}
        <footer className="safe-bottom pt-2">
          <div className="input-wrap glass flex items-end gap-2 rounded-2xl p-2">
            <textarea
              ref={taRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Message NeoChat…"
              className="max-h-36 min-h-[40px] flex-1 resize-none bg-transparent px-2 py-2 text-[16px] text-gray-100 placeholder-gray-500 outline-none"
            />
            <button
              onClick={() => submit()}
              disabled={!input.trim() || loading}
              aria-label="Send message"
              className="btn-gradient grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white"
            >
              <FiSend />
            </button>
          </div>
          <p className="mt-2 text-center text-[11px] text-gray-500">
            AI can make mistakes. Check important info.
          </p>
        </footer>
      </div>
    </section>
  )
}

export default Chat
