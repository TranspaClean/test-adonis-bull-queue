import Test from '../app/jobs/test.ts'
const jobs: Record<string, Function> = {
  [Test.name]: () => import('../app/jobs/test.ts'),
}

export { jobs }
