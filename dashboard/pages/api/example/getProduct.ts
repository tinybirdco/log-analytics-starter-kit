import { NextRequest } from 'next/server'
import { logger } from '../../../lib/logger'

/**
 * @swagger
 * /api/example/getProduct:
 *   get:
 *     description: Returns product
 *     parameters:
 *      - name: product_id
 *        in: query
 *        description: Product's id
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Tracks product and returns success message
 *       400:
 *         description: Tracks error and returns error message
 */
const getProduct = (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const product_id = searchParams.get('product_id')

  if (!product_id || product_id === null) {
    logger.error("No product_id param provided", req)

    return new Response(
      JSON.stringify({
        error: "You didn't provide a product_id!",
      }),
      {
        status: 400,
        headers: {
          'content-type': 'application/json',
        },
      }
    )
  } else {
    logger.info(`getProduct:${product_id}`, req)

    return new Response(
      JSON.stringify({
        success: `API call for getProduct:${product_id} was tracked.`,
      }),
      {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      }
    )
  }
}

export default getProduct

export const config = {
  runtime: 'experimental-edge',
}
