import type { Text } from "../../../../../DataType/index.ts"
import type TechArticle from "../index.ts"

export default interface APIReference extends TechArticle {
	/** Library file name, e.g., mscorlib.dll, system.web.dll. */
	assembly?: Text
	/** Associated product/technology version. E.g., .NET Framework 4.5. */
	assemblyVersion?: Text
	/** Library file name, e.g., mscorlib.dll, system.web.dll. */
	executableLibraryName?: Text
	/** Indicates whether API is managed or unmanaged. */
	programmingModel?: Text
	/** Type of app development: phone, Metro style, desktop, XBox, etc. */
	targetPlatform?: Text
}
