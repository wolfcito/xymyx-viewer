import { NextApiRequest, NextApiResponse } from 'next'

type MoveRequest = {
  opCode: number
  origenFila: number
  origenColumna: number
  destinoFila: number
  destinoColumna: number
  totalMillisP1: number
  player: 1 | 2
}

const getRandomInRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    const moveData: MoveRequest = req.body

    const isValidOpCode = [10, 20, 30].includes(moveData.opCode)
    const isValidRowCol = (n: number) => n >= 0 && n <= 7
    const isValidMillis =
      moveData.totalMillisP1 >= 0 && moveData.totalMillisP1 <= 3000
    const isValidPlayer = moveData.player === 1 || moveData.player === 2

    if (
      !isValidOpCode ||
      !isValidRowCol(moveData.origenFila) ||
      !isValidRowCol(moveData.origenColumna) ||
      !isValidRowCol(moveData.destinoFila) ||
      !isValidRowCol(moveData.destinoColumna) ||
      !isValidMillis ||
      !isValidPlayer
    ) {
      return res.status(400).json({ error: 'Invalid input structure' })
    }

    const randomResponse = {
      opCode: [10, 20, 30][getRandomInRange(0, 2)],
      origenFila: getRandomInRange(0, 7),
      origenColumna: getRandomInRange(0, 7),
      destinoFila: getRandomInRange(0, 7),
      destinoColumna: getRandomInRange(0, 7),
      totalMillisP1: getRandomInRange(0, 3000),
      player: moveData.player === 1 ? 2 : 1,
    }

    res.status(200).json(randomResponse)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
    console.info(error)
  }
}
