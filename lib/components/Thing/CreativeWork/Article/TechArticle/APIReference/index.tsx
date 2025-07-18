import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type APIReferenceProps from "../../../../../../types/Thing/APIReference/index.ts"
import type TechArticleProps from "../../../../../../types/Thing/TechArticle/index.ts"

import TechArticle from "../index.tsx"

export type Props = BaseComponentProps<
	APIReferenceProps,
	"APIReference",
	ExtractLevelProps<APIReferenceProps, TechArticleProps>
>

export default function APIReference(
	{
		assembly,
		assemblyVersion,
		executableLibraryName,
		programmingModel,
		targetPlatform,
		schemaType = "APIReference",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
