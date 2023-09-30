/* eslint-env browser */
/* eslint-disable camelcase */
import { extractMeta } from '@breadcrum/extract-meta'
const { ver } = PKG // eslint-disable-line no-undef

const height = 800
const width = 710

const url = location.href
const { title, summary, tags } = extractMeta(document)

const params = new URLSearchParams({ url, title, summary, ver, jump: 'close' })

for (const tag of tags) {
  params.append('tags', tag)
}

window.open(`TRANSPORT://HOST/bookmarks/add?${params.toString()}`, 'WINDOW_TITLE', `toolbar=no,width=${width},height=${height}`)
