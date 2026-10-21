import { FiPlus, FiMessageSquare, FiTrash2, FiX, FiZap } from './Icons'
import { useChat } from '../context/chatContext'

const Sidebar = () => {
  const { chats, activeId, sidebarOpen, setSidebarOpen, newChat, selectChat, deleteChat } = useChat()

  return (
    <>
      {/* Mobile backdrop */}
      <div
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 z-30 bg-black/60 backdrop-blur-sm transition-opacity md:hidden ${
          sidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        className={`glass safe-top safe-bottom fixed inset-y-0 left-0 z-40 flex w-72 max-w-[82vw] flex-col px-3 pt-3 transition-transform duration-300 md:static md:max-w-none md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-1 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-xl btn-gradient text-white">
              <FiZap />
            </div>
            <h1 className="text-lg font-bold tracking-tight gradient-text">NeoChat AI</h1>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
            className="grid h-9 w-9 place-items-center rounded-lg text-gray-400 hover:bg-white/10 hover:text-white md:hidden"
          >
            <FiX size={18} />
          </button>
        </div>

        <button
          onClick={newChat}
          className="btn-gradient mb-3 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white"
        >
          <FiPlus /> New chat
        </button>

        <p className="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-widest text-gray-500">
          History
        </p>

        <nav className="scroll-area -mx-1 flex-1 space-y-1 overflow-y-auto px-1 pb-2">
          {chats.length === 0 && (
            <p className="px-2 py-3 text-sm text-gray-500">No chats yet. Start a conversation!</p>
          )}
          {chats.map((c) => (
            <div
              key={c.id}
              className={`group flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition ${
                c.id === activeId
                  ? 'border-violet-400/50 bg-violet-500/15 text-white shadow-[0_0_18px_rgba(139,92,246,.25)]'
                  : 'border-transparent text-gray-300 hover:bg-white/5'
              }`}
            >
              <button
                onClick={() => selectChat(c.id)}
                className="flex min-w-0 flex-1 items-center gap-2 text-left"
              >
                <FiMessageSquare className="shrink-0 text-cyan-300" size={15} />
                <span className="truncate">{c.title}</span>
              </button>
              <button
                onClick={() => deleteChat(c.id)}
                aria-label={`Delete chat ${c.title}`}
                className="shrink-0 rounded-md p-1.5 text-gray-500 transition hover:bg-pink-500/15 hover:text-pink-400 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100"
              >
                <FiTrash2 size={14} />
              </button>
            </div>
          ))}
        </nav>

        <p className="px-2 py-2 text-center text-[11px] text-gray-600">Powered by Gemini</p>
      </aside>
    </>
  )
}

export default Sidebar
