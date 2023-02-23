import tap from 'tap'
import { hello } from './index.js'

tap.test('index export', async (t) => {
  t.equal(hello(), 'world')
})
