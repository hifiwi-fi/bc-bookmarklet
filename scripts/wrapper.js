export default function getBookmarklet (vars = {}) {
  let { bookmarklet } = DATA // eslint-disable-line no-undef
  for (const [key, value] of Object.entries(vars)) {
    bookmarklet = bookmarklet.replaceAll(key, value)
  }

  return bookmarklet
}
