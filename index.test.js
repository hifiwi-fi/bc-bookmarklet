import tap from 'tap'
import getBookmarklet from './dist/out.js'

tap.test('index export', async (t) => {
  const bookmarkletText = getBookmarklet({
    TARGET_URL: 'breadcrum.net',
    WINDOW_TITLE: 'Breadcrum'
  })

  t.ok(bookmarkletText, 'Got the bookmarklet text')
})
