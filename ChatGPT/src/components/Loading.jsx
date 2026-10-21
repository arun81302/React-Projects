import { Avatar } from './Message'

const Loading = () => (
  <div className="msg-in flex gap-2.5 sm:gap-3" role="status" aria-live="polite">
    <Avatar ai loading />
    <div className="ai-bubble w-[70%] rounded-2xl rounded-tl-sm px-4 py-3 sm:w-72">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
        </div>
        <span className="gradient-text text-xs font-medium">Thinking…</span>
      </div>
      <div className="space-y-2">
        <div className="skeleton w-full" />
        <div className="skeleton w-5/6" />
        <div className="skeleton w-2/3" />
      </div>
    </div>
  </div>
)

export default Loading
