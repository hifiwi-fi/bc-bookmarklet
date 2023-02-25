/* eslint-env browser */
/* eslint-disable camelcase */
/** ***************** begin configuration options ***************************/

// Change `read` to true to invoke the promptless, self-closing version of the
// bookmarklet.
const readlater = false
const appUrl = null

// When set to true, selected text is quoted using <blockquote>.
// Note that Markdown is not supported in link descriptions because of an XSS
// vulnerability: https://twitter.com/Pinboard/status/22436355472625664
const quoteSelection = false

// When this text appears in title or description, they are added as tags.
const tagKeywords = {
  javascript: 'javascript',
  js: 'javascript',
  clojure: 'clojure',
  clj: 'clojure',
  clojurescript: 'clojurescript',
  cljs: 'clojurescript',
  python: 'python',
  ios: 'ios',
  video: 'video',
  books: 'book',
  book: 'book'
}

const urlTags = {
  'gist.github.com/([^/]+)/([^/]+)': 'repo',
  'github.com\/([^\/]+)\/([^\/]+)': 'repo', // eslint-disable-line no-useless-escape
  'github.com/([^/]+)$': 'person',
  'twitter.com/([^/]+)/status/.*$': 'comment',
  'twitter.com/([^/]+)$': 'person',
  'medium.com/([^/]+)$': 'blog',
  'medium.com/([^/]+)/.*': 'blog-posting',
  'stackoverflow.com/questions/\\d+/[^/]+/\\d+': 'answer',
  'stackoverflow.com/questions/\\d+/[^/]+/?$': 'question',
  'nytimes.com': 'article',
  'washingtonpost.com': 'article',
  'youtube.com/watch': 'video',
  'vimeo.com/\\d+': 'video',
  'imdb.com/title': 'movie',
  'imdb.com/name': 'person',
  'news.ycombinator.com/item': 'comment',
  'reddit.com': 'comment',
  'blog\.': 'blog', // eslint-disable-line no-useless-escape
  'schema.org/\\S+': 'type',
  'goodreads.com/book/show/': 'book'
}

// this matches domain names to special selectors for the title
const titleTweaks = {
  'github.com': '.entry-title .js-current-repository'
}

// this matches domain names to special selectors for the title
const descriptionTweaks = {
  'www.kickstarter.com': '.short-blurb'
}

const height = 680
const width = 710

// limit long titles and descriptions, mostly to avoid 'HTTP/1.0 414 Request URI too long'
const textLengthLimit = 1000

/** ******************* begin code ********************************************/

// reduce a string to some canonical representation
// right now this just picks a case but could get really complicated if need be
// see: http://stackoverflow.com/questions/227950/programatic-accent-reduction-in-javascript-aka-text-normalization-or-unaccentin
// some people like stack overflow straighten their curly quotes
const normalize = function (string) {
  return string.toLowerCase()
}

const elementText = function (el) {
  return el ? el.textContent.trim().replace(/\s+/g, ' ') : null
}

const normalizedDocumentTitle = normalize(document.title)

// used as tes
const isSubtitle = function (string) {
  if (string) {
    return normalizedDocumentTitle.indexOf(normalize(string)) !== -1
  } else {
    return false
  }
}

// loops over a node list and applies a function
// returning the first value that is non-null
const selectFromNodeList = function (nodeList, func, thisObj) {
  thisObj = thisObj || window
  const l = nodeList.length
  let result
  for (let i = 0; i < l; ++i) {
    result = func.call(thisObj, nodeList[i])
    if (result !== null) {
      return result
    }
  }
  return null
}

const getTitle = function () {
  const url = location.href
  const host = location.hostname
  let e
  if (host in titleTweaks) {
    e = document.querySelector(titleTweaks[host])
    if (e) {
      return elementText(e)
    }
  }
  let documentTitle = document.title
  e = document.querySelector("meta[property='og:title']")
  if (e) {
    documentTitle = e.content.trim().replace(/\s+/g, ' ')
  }

  // hEntry microformat
  if (selectFromNodeList(document.getElementsByClassName('hentry'), function () { return true })) {
    const htitle = document.querySelector(
      '.hentry .entry-title'
    )
    if (htitle) {
      return elementText(htitle)
    }
  }

  // method 1 - look for link to self with text that is contained in title

  let a_text = selectFromNodeList(document.getElementsByTagName('A'), function (a) {
    if (a.href === url) {
      a_text = elementText(a)
      if (isSubtitle(a_text)) {
        return a_text
      }
    }
    return null
  })
  if (a_text) {
    return a_text
  }

  // method 2 - look at header tags and see if it matches part of title
  const headerTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
  let headerTitle
  for (let j = 0; j < headerTags.length; ++j) {
    selectFromNodeList(document.getElementsByTagName(headerTags[j]), function (h) {
      const h_text = elementText(h)
      if (isSubtitle(h_text) && (!headerTitle || h_text.length > headerTitle.length)) {
        headerTitle = h_text
      }
      return null
    })
  }
  if (headerTitle) {
    return headerTitle
  }

  // method 3 - just return the title
  return documentTitle
}

const getTags = function (text) {
  text = normalize(text)
  const tags = []
  let re
  for (const keyword in tagKeywords) {
    re = keyword instanceof RegExp ? keyword : new RegExp('\\b' + keyword + '\\b', 'i')
    if (re.test(text)) {
      tags.push(tagKeywords[keyword])
    }
  }
  return tags
}

const getUrlTags = function (text) {
  text = normalize(text)
  let re
  for (const url in urlTags) {
    re = url instanceof RegExp ? url : new RegExp('\\b' + url + '\\b', 'i')
    if (re.test(text)) {
      return [urlTags[url]]
    }
  }
  return []
}

const getMetaDescription = function () {
  let e
  e = document.querySelector("meta[name='description']")
  if (e) {
    return e.content.trim().replace(/\s+/g, ' ')
  }
  e = document.querySelector("meta[property='og:description']")
  if (e) {
    return e.content.trim().replace(/\s+/g, ' ')
  }
  return ''
}

const getDescription = function () {
  let text
  // Grab the text selection (if any) and quote it
  if ((text = String(document.getSelection())) !== '') {
    if (quoteSelection) {
      text = text.trim().split('\n').map(function (s) { return '<blockquote>' + s + '</blockquote>' }).join('\n')
    }
  }

  const host = location.hostname
  let e
  if (host in descriptionTweaks) {
    e = document.querySelector(descriptionTweaks[host])
    if (e) {
      return elementText(e)
    }
  }

  if (!text) {
    text = getMetaDescription()
  }
  return text
}

// Assembles default form pre-fill arguments.
const url = location.href
let title = getTitle()
let description = getDescription()
// remove if title is trailing or leading
const ix = description.indexOf(title)
if (ix === 0) {
  description = description.substring(title.length).trim()
} else if (ix === description.length - title.length) {
  description = description.substring(0, ix).trim()
}

const tags = getTags(document.title + ' ' + description + ' ' + getMetaDescription())
const moreTags = getUrlTags(location.href)
Array.prototype.push.apply(tags, moreTags)

if (textLengthLimit > 0) {
  title = title.substring(0, textLengthLimit)
  description = description.substring(0, textLengthLimit)
}

let args = [
  'url=', encodeURIComponent(url),
  '&title=', encodeURIComponent(title),
  '&description=', encodeURIComponent(description),
  '&tags=', encodeURIComponent(tags.join(' '))
]

// Process additional entities to create
//
const additionalEntities = {
  // works for gist.github.com urls too
  'github.com/([^/]+)/([^/]+)': function (matches) {
    return {
      url: 'https://github.com/' + matches[1],
      title: matches[1],
      tags: ['person']
    }
  },
  'medium.com/([^/]+)/.*': function (matches) {
    return {
      url: 'https://medium.com/' + matches[1],
      // strip '@'
      title: matches[1].slice(1) + ' blog',
      tags: ['blog']
    }
  },
  'twitter.com/([^/]+)/status/.*$': function (matches) {
    return {
      url: 'https://twitter.com/' + matches[1],
      title: matches[1],
      tags: ['person']
    }
  }
}

const processAdditionalArgs = function (text) {
  text = normalize(text)
  let re, matches
  for (const url in additionalEntities) {
    re = url instanceof RegExp ? url : new RegExp('\\b' + url + '\\b', 'i')
    if (text.match(re)) {
      matches = text.match(re)
      return additionalEntities[url](matches)
    }
  }
  return null
}

const additional = processAdditionalArgs(location.href)

// If readlater mode, add the auto-close parameter and read-later flag:
if (readlater) {
  args = args.concat([
    '&later=', 'yes',
    '&jump=', 'close'
  ])
}
if (appUrl) {
  args = args.concat([
    '&x-source=Safari',
    '&x-success=', encodeURIComponent(location.href),
    '&x-cancel=', encodeURIComponent(location.href)
  ])
  window.location = appUrl + args.join('')
} else {
  const pin = open('http://TARGET_URL/bookmarks/add?' + args.join(''), 'WINDOW_TITLE', `toolbar=no,width=${width},height=${height}`)

  // nice to have: load json file of recent type->names maps to avoid dupes
  if (additional) {
    const additionalArgs = [
      'url=', encodeURIComponent(additional.url),
      '&title=', encodeURIComponent(additional.title),
      '&description=', encodeURIComponent(additional.description || ''),
      '&tags=', encodeURIComponent(additional.tags.join(' '))
    ]

    open('http://TARGET_URL/bookmarks/add?' + additionalArgs.join(''), 'WINDOW_TITLE 2', `toolbar=no,width=${width},height=${height}`)
  }

  // Send the window to the background if readlater mode.
  if (readlater) {
    pin.blur()
  }
}
