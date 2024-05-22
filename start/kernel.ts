/*
|--------------------------------------------------------------------------
| HTTP kernel file
|--------------------------------------------------------------------------
|
| The HTTP kernel file is used to register the middleware with the server
| or the router.
|
*/

import router from '@adonisjs/core/services/router'
import server from '@adonisjs/core/services/server'

import app from '@adonisjs/core/services/app'
import bull from '@acidiney/bull-queue/services/main'
import TestJob, { TestPayload } from '#app/jobs/test'

await app.booted(async () => {
  bull.dispatch(TestJob.name, { type: 'cron' } as TestPayload, {
    queueName: 'default',
    repeat: {
      pattern: '10 10 */12 * * *',
    },
  })

  bull.dispatch(TestJob.name, { type: 'onetime' } as TestPayload, {
    queueName: 'default',
  })
})

/**
 * The error handler is used to convert an exception
 * to a HTTP response.
 */
server.errorHandler(() => import('#exceptions/handler'))

/**
 * The server middleware stack runs middleware on all the HTTP
 * requests, even if there is no route registered for
 * the request URL.
 */
server.use([
  () => import('#middleware/container_bindings_middleware'),
  () => import('#middleware/force_json_response_middleware'),
  () => import('@adonisjs/cors/cors_middleware'),
])

/**
 * The router middleware stack runs middleware on all the HTTP
 * requests with a registered route.
 */
router.use([() => import('@adonisjs/core/bodyparser_middleware')])

/**
 * Named middleware collection must be explicitly assigned to
 * the routes or the routes group.
 */
export const middleware = router.named({})
