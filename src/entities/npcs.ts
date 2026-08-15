import { BuildingId } from './buildings'

export type NpcId = 'guide'

export type Npc = {
  id: NpcId
  sprite: string
}

export const NPCS: Record<NpcId, Npc> = {
  guide: { id: 'guide', sprite: 'npc/guide.png' },
}

export const npcNameKey = (id: NpcId) => `npc.${id}`

export type Dialogue = {
  npc: NpcId
  lines: string[]
}

export const DIALOGUES: Partial<Record<BuildingId, Dialogue>> = {
  townHall: { npc: 'guide', lines: ['townHall.1', 'townHall.2', 'townHall.3'] },
}

export const dialogueLineKey = (line: string) => `dialogue.${line}`
