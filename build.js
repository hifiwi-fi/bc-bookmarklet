import esbuild from 'esbuild'
import { dirname } from 'desm'
import { join } from 'path'
import { writeFile } from 'fs/promises'

const __dirname = dirname(import.meta.url)
const wrapperPath = join(__dirname, 'wrapper.js')

async function makeBookmarklet (src, dest) {
  const buildOpts = {
    entryPoints: [src],
    // logLevel: 'silent',
    bundle: true,
    format: 'iife',
    splitting: false,
    sourcemap: false,
    target: [
      'esnext'
    ],
    metafile: true,
    minify: true,
    write: false
  }

  const result = await esbuild.build(buildOpts)

  const fileData = result.outputFiles[0]

  const innerText = fileData.text

  const bookmarklet = `javascript:(${innerText.trim()})`

  const buildWrapperOpts = {
    entryPoints: [wrapperPath],
    bundle: true,
    format: 'esm',
    splitting: false,
    sourcemap: true,
    target: [
      'esnext'
    ],
    metafile: true,
    write: true,
    define: {
      DATA: JSON.stringify({ bookmarklet })
    },
    outfile: dest
  }

  const wrapperResult = await esbuild.build(buildWrapperOpts)
  console.dir({ wrapperResult }, { colors: true, depth: 999 })
}

const inFile = join(__dirname, 'index.js')
const outFile = join(__dirname, 'dist/out.js')

await makeBookmarklet(inFile, outFile)

const created = await import(outFile)

const bookmarkletFn = created.default({ TARGET_URL: 'breadcrum.net', WINDOW_TITLE: 'breadcrum' })

await writeFile('test-out.js', bookmarkletFn)
