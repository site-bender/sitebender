import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"
import type LearningResourceProps from "../../../../types/Thing/LearningResource/index.ts"

import CreativeWork from "./index.tsx"

export type Props = BaseComponentProps<
	LearningResourceProps,
	"LearningResource",
	ExtractLevelProps<LearningResourceProps, CreativeWorkProps>
>

export default function LearningResource(
	{
		assesses,
		competencyRequired,
		educationalAlignment,
		educationalLevel,
		educationalUse,
		learningResourceType,
		teaches,
		schemaType = "LearningResource",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				assesses,
				competencyRequired,
				educationalAlignment,
				educationalLevel,
				educationalUse,
				learningResourceType,
				teaches,
				...subtypeProperties,
			}}
		/>
	)
}
