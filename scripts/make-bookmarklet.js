import esbuild from 'esbuild'
import { dirname } from 'desm'
import { join } from 'path'

const __dirname = dirname(import.meta.url)
const wrapperPath = join(__dirname, 'wrapper.js')

export async function makeBookmarklet (src, dest) {
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
  console.dir({ result }, { colors: true, depth: 999 })
  const fileData = result.outputFiles[0]

  const innerText = fileData.text

  const bookmarklet = `javascript:(${innerText.trim().slice(0, -1)})`

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
  return {
    src,
    dest
  }
}
