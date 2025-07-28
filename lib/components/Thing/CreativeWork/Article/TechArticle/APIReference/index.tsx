import type { BaseComponentProps, ExtractLevelProps } from "../../../../../../types/index.ts"
import type ThingProps from "../../../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../../../types/Thing/CreativeWork/index.ts"
import type { ArticleProps } from "../../../../../../types/Thing/CreativeWork/Article/index.ts"
import type { TechArticleProps } from "../../../../../../types/Thing/CreativeWork/Article/TechArticle/index.ts"
import type { APIReferenceProps } from "../../../../../../types/Thing/CreativeWork/Article/TechArticle/APIReference/index.ts"

import TechArticle from "../index.tsx"

export type Props = BaseComponentProps<
	APIReferenceProps,
	"APIReference",
	ExtractLevelProps<ThingProps, CreativeWorkProps, ArticleProps, TechArticleProps>
>

export default function APIReference({
	assembly,
	assemblyVersion,
	executableLibraryName,
	programmingModel,
	targetPlatform,
	schemaType = "APIReference",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<TechArticle
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				assembly,
				assemblyVersion,
				executableLibraryName,
				programmingModel,
				targetPlatform,
				...subtypeProperties,
			}}
		/>
	)
}
