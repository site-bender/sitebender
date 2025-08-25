import type { EventBinder } from "../../../types/operations/registries/events/index.ts"

const events = new Map<string, EventBinder>()

export function registerEvent(tag: string, binder: EventBinder) {
  events.set(tag, binder)
}

export function getEvent(tag: string): EventBinder | undefined {
  return events.get(tag)
}

export function listEvents(): string[] { return Array.from(events.keys()) }
