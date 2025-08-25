import type { ActionExecutor } from "../../../types/operations/registries/actions/index.ts"

const actions = new Map<string, ActionExecutor>()

export function registerAction(tag: string, exec: ActionExecutor) {
  actions.set(tag, exec)
}

export function getAction(tag: string): ActionExecutor | undefined {
  return actions.get(tag)
}

export function listActions(): string[] { return Array.from(actions.keys()) }
