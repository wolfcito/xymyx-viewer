import { XymyxBoardState } from '@/app/types/xymyx.type'
import React, { useState } from 'react'

interface BoardUpdaterProps {
  readonly updateBoard: (newState: XymyxBoardState) => void
}

export function BoardUpdater({ updateBoard }: BoardUpdaterProps) {
  const [jsonInput, setJsonInput] = useState('')

  const handleUpdate = () => {
    try {
      const newState = JSON.parse(jsonInput) as XymyxBoardState
      updateBoard(newState)
    } catch (error) {
      alert('Invalid JSON input')
      console.error(error)
    }
  }

  return (
    <div className="mt-4 w-full max-w-md">
      <textarea
        className="w-full p-2 border border-gray-300 rounded font-mono"
        rows={5}
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Enter JSON here..."
      />
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleUpdate}
      >
        Update Board
      </button>
    </div>
  )
}
