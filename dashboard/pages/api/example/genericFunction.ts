import { NextRequest } from 'next/server'
import { logger } from '../../../lib/logger'

/**
 * @swagger
 * /api/example/genericFunction:
 *   get:
 *     description: Tracks genericFunction
 *     responses:
 *       200:
 *         description: Returns success message
 */
export default function genericFunction(req: NextRequest) {
  logger.info('genericFunction', req)

  return new Response(
    JSON.stringify({
      success: 'genericFunction is being tracked! Spooky.',
    }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    }
  )
}

export const config = {
  runtime: 'experimental-edge',
}
