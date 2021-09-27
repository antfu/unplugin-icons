import { promises as fs } from 'fs'
import { IconifyJSON } from '@iconify/types'
import { iconToSVG } from '@iconify/utils/lib/svg/build'
import { defaults as DefaultIconCustomizations } from '@iconify/utils/lib/customisations'
import { getIconData } from '@iconify/utils/lib/icon-set/get-icon'
import createDebugger from 'debug'
import { FullIconifyIcon } from '@iconify/utils/lib/icon'
import { resolve } from 'local-pkg'
import { ResolvedOptions } from '../types'

const debug = createDebugger('unplugin-icons:modern')
const debugCollection = createDebugger('unplugin-icons:modern:collection')

export interface ResolvedIconPath {
  collection: string
  icon: string
  query: Record<string, string | undefined>
}

const _collections: Record<string, IconifyJSON | false> = {}

export async function loadCollection(name: string): Promise<IconifyJSON | undefined> {
  if (_collections[name] === false)
    return undefined

  if (_collections[name])
    return _collections[name] as IconifyJSON

  debugCollection(name)
  const jsonPath = resolve(`@iconify-json/${name}/icons.json`)
  if (jsonPath) {
    const icons = JSON.parse(await fs.readFile(jsonPath, 'utf8'))
    _collections[name] = icons
    return icons
  }
  else {
    debugCollection(`failed to load ${name}`)
    _collections[name] = false
    return undefined
  }
}

export function searchForIcon(iconSet: IconifyJSON, collection: string, ids: string[], options?: ResolvedOptions) {
  let iconData: FullIconifyIcon | null
  for (const id of ids) {
    iconData = getIconData(iconSet, id, true)
    if (iconData) {
      debug(`${collection}:${id}`)
      const scale = options?.scale ?? 1
      const { attributes, body } = iconToSVG(iconData, {
        ...DefaultIconCustomizations,
        height: `${scale}em`,
        width: `${scale}em`,
      })
      return `<svg ${Object.entries(attributes).map(i => `${i[0]}="${i[1]}"`).join(' ')}>${body}</svg>`
    }
  }
  return null
}
