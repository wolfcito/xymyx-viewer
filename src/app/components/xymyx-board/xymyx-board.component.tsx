'use client'

import React, { useState } from 'react'

import { XymyxBoardState } from '@/app/types'
import { BoardUpdater } from '@/app/components/board-updater'
import Image from 'next/image'

const INITIAL_BOARD: XymyxBoardState = {
  pieces: [],
  totalMillisP1: 0,
  totalMillisP2: 0,
}

export function XymyxBoard() {
  const [board, setBoard] = useState<XymyxBoardState>(INITIAL_BOARD)
  const [moveInput, setMoveInput] = useState<string>('')

  const updateBoard = (newState: XymyxBoardState) => {
    setBoard(newState)
  }

  const handleMove = (moveData: {
    opCode: number
    origenFila: number
    origenColumna: number
    destinoFila: number
    destinoColumna: number
    totalMillisP1?: number
    totalMillisP2?: number
    player: 1 | 2
  }) => {
    // Validar que exista una pieza en la posición origen
    const pieceIndex = board.pieces.findIndex(
      (p) =>
        p.position.row === moveData.origenFila &&
        p.position.col === moveData.origenColumna,
    )

    if (pieceIndex === -1) {
      alert('No piece found at the origin position')
      return
    }

    // Crear una copia del tablero
    const updatedPieces = [...board.pieces]

    // Mover la pieza a la nueva posición
    updatedPieces[pieceIndex] = {
      ...updatedPieces[pieceIndex],
      position: {
        row: moveData.destinoFila,
        col: moveData.destinoColumna,
      },
    }

    // Actualizar el tiempo total del jugador
    const updatedBoard = {
      ...board,
      pieces: updatedPieces,
      totalMillisP1:
        moveData.player === 1
          ? (board.totalMillisP1 || 0) + (moveData.totalMillisP1 || 0)
          : board.totalMillisP1,
      totalMillisP2:
        moveData.player === 2
          ? (board.totalMillisP2 || 0) + (moveData.totalMillisP2 || 0)
          : board.totalMillisP2,
    }

    setBoard(updatedBoard)
  }

  const renderSquare = (row: number, col: number) => {
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

  const handleExecuteMove = () => {
    try {
      const parsedMove = JSON.parse(moveInput) // Convertir JSON a objeto
      handleMove(parsedMove) // Llamar a la función para mover la pieza
    } catch (error) {
      alert('Invalid JSON input') // Manejar errores en el JSON
      console.error(error)
    }
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
      <div className="mt-4 flex gap-2">
        <BoardUpdater updateBoard={updateBoard} />
        <div className="flex flex-col">
          <textarea
            className="w-full p-2 border border-gray-300 rounded font-mono"
            rows={5}
            placeholder="Enter move JSON"
            value={moveInput}
            onChange={(e) => setMoveInput(e.target.value)}
          />
          <button
            onClick={handleExecuteMove}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Execute Move
          </button>
        </div>
      </div>
    </div>
  )
}
