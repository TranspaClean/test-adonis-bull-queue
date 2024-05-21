import type { JobHandlerContract, Job } from '@acidiney/bull-queue/types'

export type TestPayload = {}

export default class TestJob implements JobHandlerContract<TestPayload> {
  /**
   * Base Entry point
   */
  async handle(job: Job<TestPayload>) {
    console.log('logging job')
  }

  /**
   * This is an optional method that gets called if it exists when the retries has exceeded and is marked failed.
   */
  async failed(job: Job<TestPayload>) {
    throw new Error('Need to be implemented!')
  }
}
