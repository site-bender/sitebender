import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type AssessActionProps from "../../../../../types/Thing/AssessAction/index.ts"
import type ReviewActionProps from "../../../../../types/Thing/ReviewAction/index.ts"

import AssessAction from "../index.tsx"

export type Props = BaseComponentProps<
	ReviewActionProps,
	"ReviewAction",
	ExtractLevelProps<ReviewActionProps, AssessActionProps>
>

export default function ReviewAction(
	{
		resultReview,
		schemaType = "ReviewAction",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<AssessAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				resultReview,
				...subtypeProperties,
			}}
		/>
	)
}
