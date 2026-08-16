import { BuildingId } from './buildings'

export type NpcId = 'guide' | 'archivist' | 'seller'

export type Npc = {
  id: NpcId
  sprite: string
}

export const NPCS: Record<NpcId, Npc> = {
  guide: { id: 'guide', sprite: 'npc/guide.png' },
  archivist: { id: 'archivist', sprite: 'npc/archivist.png' },
  seller: { id: 'seller', sprite: 'npc/seller.png' },
}

export const npcNameKey = (id: NpcId) => `npc.${id}`

export type Dialogue = {
  npc: NpcId
  lines: string[]
}

export const DIALOGUES: Record<BuildingId, Dialogue> = {
  townHall: { npc: 'guide', lines: ['townHall.1', 'townHall.2', 'townHall.3'] },
  archive: { npc: 'archivist', lines: ['archive.1', 'archive.2', 'archive.3'] },
  library: { npc: 'archivist', lines: ['library.1', 'library.2', 'library.3'] },
  market: { npc: 'seller', lines: ['market.1', 'market.2', 'market.3'] },
}

export const dialogueLineKey = (line: string) => `dialogue.${line}`
