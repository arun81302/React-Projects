import ReactMarkdown from "react-markdown"

export default function Recipe({ data }) {
    return (
        <section className="max-w-190 mx-auto mt-6 p-6 rounded-lg bg-gray-50">
            <ReactMarkdown
                components={{
                    h1: ({ children }) => (
                        <h1 className="text-4xl font-bold mb-4">
                            {children}
                        </h1>
                    ),

                    h2: ({ children }) => (
                        <h2 className="text-2xl font-bold mt-6 mb-3">
                            {children}
                        </h2>
                    ),

                    p: ({ children }) => (
                        <p className="text-lg text-gray-700 mb-4">
                            {children}
                        </p>
                    ),

                    ul: ({ children }) => (
                        <ul className="list-disc ml-6 mb-4 space-y-2">
                            {children}
                        </ul>
                    ),

                    ol: ({ children }) => (
                        <ol className="list-decimal ml-6 mb-4 space-y-2">
                            {children}
                        </ol>
                    ),

                    li: ({ children }) => (
                        <li className="text-gray-700">
                            {children}
                        </li>
                    )
                }}
            >
                {data}
            </ReactMarkdown>
        </section>
    )
}