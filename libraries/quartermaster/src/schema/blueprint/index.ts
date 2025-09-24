//++ Blueprint schema type aliases for Quartermaster (no interfaces/classes)
export type FileMode = "copy" | "template"

export type FileSpec = {
	targetPath: string
	mode: FileMode
	sourcePath?: string
	substitutions?: Record<string, string | number | boolean>
	executable?: boolean
}

export type ImportMapSpec = {
	imports: Record<string, string>
}

export type ImportMaps = {
	dev: ImportMapSpec
	prod: ImportMapSpec
}

export type DenoTasksSpec = Record<string, string>

export type SeedSpec = {
	wardenContract?: string
	axeAllowlistSeed?: string
}

export type VariantToggles = {
	architect?: boolean
	envoy?: boolean
}

export type OutputsSpec = {
	appPath: string
}

export type Blueprint = {
	id: string
	name: string
	description: string
	outputs: OutputsSpec
	files?: FileSpec[]
	importMap?: {
		dev?: ImportMapSpec
		prod?: ImportMapSpec
	}
	denoTasks?: DenoTasksSpec
	postScaffoldMessages?: string[]
	seed?: SeedSpec
	variants?: VariantToggles
}
