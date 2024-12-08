'use client'

import React, { useState } from 'react'

import { XymyxBoardState } from '@/app/types/xymyx.type'
import { BoardUpdater } from '@/app/components/board-updater'
import Image from 'next/image'

const INITIAL_BOARD: XymyxBoardState = {
  pieces: [],
}

export function XymyxBoard() {
  const [board, setBoard] = useState<XymyxBoardState>(INITIAL_BOARD)

  const updateBoard = (newState: XymyxBoardState) => {
    setBoard(newState)
  }

  const renderSquare = (row: number, col: number) => {
    // const isBlack = (row + col) % 2 === 1
    const piece = board.pieces.find(
      (p) => p.position.row === row && p.position.col === col,
    )

    return (
      <div
        key={`${row}-${col}`}
        className={`w-16 h-16 flex items-center justify-center`}
      >
        {piece && (
          <Image
            src={getPieceImage(piece.type, piece.color)}
            alt={`${piece.color} ${piece.type}`}
            className="w-12 h-12"
            width={48}
            height={48}
            unoptimized
          />
        )}
      </div>
    )
  }

  const getPieceImage = (type: string, color: 'white' | 'black'): string => {
    const imagePaths: { [key: string]: { white: string; black: string } } = {
      king: {
        white: '/images/kw.png',
        black: '/images/kb.png',
      },
      queen: {
        white: '/images/qw.png',
        black: '/images/qb.png',
      },
      rook: {
        white: '/images/rw.png',
        black: '/images/rb.png',
      },
      bishop: {
        white: '/images/bw.png',
        black: '/images/bb.png',
      },
      knight: {
        white: '/images/nw.png',
        black: '/images/nb.png',
      },
      pawn: {
        white: '/images/pw.png',
        black: '/images/pb.png',
      },
    }
    return imagePaths[type][color]
  }

  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Xymyx Viewer</h1>
      <div
        className="grid grid-cols-8 gap-0"
        style={{
          backgroundImage: "url('/images/xymyxboard.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {Array.from({ length: 8 }, (_, row) => (
          <React.Fragment key={row}>
            {Array.from({ length: 8 }, (_, col) => renderSquare(row, col))}
          </React.Fragment>
        ))}
      </div>
      <BoardUpdater updateBoard={updateBoard} />
    </div>
  )
}
