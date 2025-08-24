export type InjectorExecutor = (...args: unknown[]) => Promise<unknown> | unknown

const injectors = new Map<string, InjectorExecutor>()

export function registerInjector(tag: string, exec: InjectorExecutor) {
  injectors.set(tag, exec)
}

export function getInjector(tag: string): InjectorExecutor | undefined {
  return injectors.get(tag)
}

export function listInjectors(): string[] { return Array.from(injectors.keys()) }
