export interface XymyxPiece {
  type: 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn'
  color: 'white' | 'black'
  position: {
    row: number
    col: number
  }
}

export interface XymyxBoardState {
  pieces: XymyxPiece[]
  totalMillisP1?: number
  totalMillisP2?: number
}
