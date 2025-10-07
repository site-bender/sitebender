import type { InjectorExecutor } from "../../../types/operations/registries/injectors/index.ts"

const injectors = new Map<string, InjectorExecutor>()

function register(tag: string, exec: InjectorExecutor) {
	injectors.set(tag, exec)
}

function get(tag: string): InjectorExecutor | undefined {
	return injectors.get(tag)
}

function list(): string[] {
	return Array.from(injectors.keys())
}

const registry = { register, get, list } as const
export default registry
