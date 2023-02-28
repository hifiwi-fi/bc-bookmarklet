import { dirname } from 'desm'
import { join } from 'path'
import { writeFile } from 'fs/promises'
import { makeBookmarklet } from './make-bookmarklet.js'
import { makeVersionExport } from './export-version.js'

const __dirname = dirname(import.meta.url)

const inFile = join(__dirname, '../index.js')
const outFile = join(__dirname, '../dist/out.js')

const { dest } = await makeBookmarklet(inFile, outFile)

const versionExportFile = join(__dirname, './version.js')
const versionExportOutput = join(__dirname, '../dist/version.js')
await makeVersionExport(versionExportFile, versionExportOutput)

const created = await import(dest)

const bookmarkletFn = created.default({ TRANSPORT: 'https', HOST: 'breadcrum.net', WINDOW_TITLE: 'breadcrum' })

await writeFile(join(__dirname, '../test-out.js'), bookmarkletFn)

console.log('done')
