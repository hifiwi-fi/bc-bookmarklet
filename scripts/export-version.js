import esbuild from 'esbuild'
import { dirname } from 'desm'
import { join } from 'path'
import { readFile } from 'fs/promises'

const __dirname = dirname(import.meta.url)

const pkg = JSON.parse(await readFile(join(__dirname, '../package.json')))

export async function makeVersionExport (src, dest) {
  const buildOpts = {
    entryPoints: [src],
    bundle: true,
    format: 'esm',
    splitting: false,
    sourcemap: false,
    target: [
      'esnext'
    ],
    metafile: true,
    write: true,
    define: {
      PKG: JSON.stringify({ ver: pkg.version })
    },
    outfile: dest
  }

  const wrapperResult = await esbuild.build(buildOpts)
  console.dir({ wrapperResult }, { colors: true, depth: 999 })
  return {
    src,
    dest
  }
}
