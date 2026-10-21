import { useEffect, useState } from 'react'
import main from '../gemini'
import { ChatContext } from './chatContext'

const STORAGE_KEY = 'neochat:chats'
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7)

const loadChats = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

const UserContext = ({ children }) => {
  const [chats, setChats] = useState(loadChats)
  const [activeId, setActiveId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(chats))
    } catch { /* storage unavailable */ }
  }, [chats])

  const activeChat = chats.find((c) => c.id === activeId) || null
  const messages = activeChat ? activeChat.messages : []

  const addMessage = (id, message) =>
    setChats((prev) =>
      prev.map((c) => (c.id === id ? { ...c, messages: [...c.messages, message] } : c))
    )

  const send = async (text) => {
    const q = text.trim()
    if (!q || loading) return

    let id = activeId
    let history = []

    if (id && activeChat) {
      history = activeChat.messages.filter((m) => !m.error)
      addMessage(id, { role: 'user', text: q })
    } else {
      id = uid()
      setChats((prev) => [
        { id, title: q.slice(0, 40), messages: [{ role: 'user', text: q }] },
        ...prev,
      ])
      setActiveId(id)
    }

    setLoading(true)
    try {
      const reply = await main(q, history)
      addMessage(id, { role: 'ai', text: reply })
    } catch (e) {
      addMessage(id, { role: 'ai', text: e.message, error: true })
    } finally {
      setLoading(false)
    }
  }

  const newChat = () => {
    if (loading) return
    setActiveId(null)
    setSidebarOpen(false)
  }

  const selectChat = (id) => {
    if (loading) return
    setActiveId(id)
    setSidebarOpen(false)
  }

  const deleteChat = (id) => {
    if (loading) return
    setChats((prev) => prev.filter((c) => c.id !== id))
    if (id === activeId) setActiveId(null)
  }

  const value = {
    chats,
    activeId,
    messages,
    loading,
    sidebarOpen,
    setSidebarOpen,
    send,
    newChat,
    selectChat,
    deleteChat,
  }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export default UserContext
