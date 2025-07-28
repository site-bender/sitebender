import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { ActionProps } from "../../../../../types/Thing/Action/index.ts"
import type { AssessActionProps } from "../../../../../types/Thing/Action/AssessAction/index.ts"
import type { ReviewActionProps } from "../../../../../types/Thing/Action/AssessAction/ReviewAction/index.ts"

import AssessAction from "../index.tsx"

export type Props = BaseComponentProps<
	ReviewActionProps,
	"ReviewAction",
	ExtractLevelProps<ThingProps, ActionProps, AssessActionProps>
>

export default function ReviewAction({
	resultReview,
	schemaType = "ReviewAction",
	subtypeProperties = {},
	...props
}): Props {
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
