import { BuildingId } from './buildings'

export type StageId = 'arrival' | 'records' | 'community'

export type ScenarioStep = {
  id: string
  stage: StageId
  building: BuildingId
}

export const STAGES: StageId[] = ['arrival', 'records', 'community']

export const STEPS: ScenarioStep[] = [
  { id: 'welcome', stage: 'arrival', building: 'townHall' },
  { id: 'archive', stage: 'records', building: 'museum' },
  { id: 'study', stage: 'records', building: 'library' },
  { id: 'market', stage: 'community', building: 'market' },
]

export const stepTitleKey = (id: string) => `scenario.steps.${id}.title`
export const stepDescriptionKey = (id: string) => `scenario.steps.${id}.description`
export const stageTitleKey = (id: StageId) => `scenario.stages.${id}`

export const currentStep = (completed: string[]) => STEPS.find((step) => !completed.includes(step.id)) ?? null

export const currentStage = (completed: string[]) => currentStep(completed)?.stage ?? STAGES[STAGES.length - 1]

export const stageSteps = (stage: StageId) => STEPS.filter((step) => step.stage === stage)

export const unlockedBuildings = (completed: string[]): BuildingId[] => {
  const done = STEPS.filter((step) => completed.includes(step.id)).map((step) => step.building)
  const next = currentStep(completed)?.building

  return next ? [...done, next] : done
}
