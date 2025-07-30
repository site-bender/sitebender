import type { Text } from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type { CreativeWorkProps } from "../../../index.ts"
import type { ArticleProps } from "../../index.ts"
import type { TechArticleProps } from "../index.ts"

export interface APIReferenceProps {
	"@type"?: "APIReference"
	assembly?: Text
	assemblyVersion?: Text
	executableLibraryName?: Text
	programmingModel?: Text
	targetPlatform?: Text
}

type APIReference =
	& Thing
	& CreativeWorkProps
	& ArticleProps
	& TechArticleProps
	& APIReferenceProps

export default APIReference
