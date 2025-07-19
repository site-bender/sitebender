import type { Text } from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type { CreativeWorkProps } from "../../../index.ts"
import type { ArticleProps } from "../../index.ts"
import type { TechArticleProps } from "../index.ts"

export interface APIReferenceProps {
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

type APIReference =
	& Thing
	& ArticleProps
	& CreativeWorkProps
	& TechArticleProps
	& APIReferenceProps

export default APIReference
