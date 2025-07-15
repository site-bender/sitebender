import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type AlignmentObjectProps from "../../../../types/Thing/AlignmentObject/index.ts"
import type IntangibleProps from "../../../../types/Thing/Intangible/index.ts"

import Intangible from "./index.tsx"

export type Props = BaseComponentProps<
	AlignmentObjectProps,
	"AlignmentObject",
	ExtractLevelProps<AlignmentObjectProps, IntangibleProps>
>

export default function AlignmentObject(
	{
		alignmentType,
		educationalFramework,
		targetDescription,
		targetName,
		targetUrl,
		schemaType = "AlignmentObject",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				alignmentType,
				educationalFramework,
				targetDescription,
				targetName,
				targetUrl,
				...subtypeProperties,
			}}
		/>
	)
}
