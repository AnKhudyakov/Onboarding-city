import { BuildingId } from './buildings'

export type NpcId = 'guide' | 'clerk' | 'archivist'

export type Npc = {
  id: NpcId
  sprite: string
}

export const NPCS: Record<NpcId, Npc> = {
  guide: { id: 'guide', sprite: 'npc/guide.png' },
  clerk: { id: 'clerk', sprite: 'npc/clerk.png' },
  archivist: { id: 'archivist', sprite: 'npc/archivist.png' },
}

export const npcNameKey = (id: NpcId) => `npc.${id}`

export type Dialogue = {
  npc: NpcId
  lines: string[]
}

export const DIALOGUES: Record<BuildingId, Dialogue> = {
  townHall: { npc: 'guide', lines: ['townHall.1', 'townHall.2', 'townHall.3'] },
  museum: { npc: 'archivist', lines: ['museum.1', 'museum.2', 'museum.3'] },
  library: { npc: 'clerk', lines: ['library.1', 'library.2', 'library.3'] },
  market: { npc: 'guide', lines: ['market.1', 'market.2', 'market.3'] },
}

export const dialogueLineKey = (line: string) => `dialogue.${line}`
