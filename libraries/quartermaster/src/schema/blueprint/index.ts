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
	artificer?: boolean
	envoy?: boolean
}

export type OutputsSpec = {
	appPath: string
}

export type DevServerMode = "docker" | "deno" | "both"

export type DevServerConfig = {
	enabled: boolean
	mode?: DevServerMode
	http3Port?: number
	http2Port?: number
	hotReload?: boolean
}

export type LibraryRequirement = "required" | "optional" | "excluded"

export type SitebenderLibraries = {
	architect?: LibraryRequirement
	toolsmith?: LibraryRequirement
	artificer?: LibraryRequirement
	formulator?: LibraryRequirement
	linguist?: LibraryRequirement
	exchequer?: LibraryRequirement
	agent?: LibraryRequirement
	operator?: LibraryRequirement
	custodian?: LibraryRequirement
	pathfinder?: LibraryRequirement
	envoy?: LibraryRequirement
	auditor?: LibraryRequirement
	arborist?: LibraryRequirement
	sentinel?: LibraryRequirement
	quarrier?: LibraryRequirement
	quartermaster?: LibraryRequirement
	steward?: LibraryRequirement
	warden?: LibraryRequirement
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
	devServer?: DevServerConfig
	libraries?: SitebenderLibraries
}
