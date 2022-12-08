import { NextRequest } from 'next/server'

import { track } from '../../../lib/tracker'

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
  track(req, 'genericFunction', { some_custom_data: 1 })

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
