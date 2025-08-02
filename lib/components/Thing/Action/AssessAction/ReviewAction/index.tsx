import type BaseProps from "../../../../../types/index.ts"
import type ReviewActionProps from "../../../../../types/Thing/Action/AssessAction/ReviewAction/index.ts"

import AssessAction from "../index.tsx"

export type Props = ReviewActionProps & BaseProps

export default function ReviewAction({
	resultReview,
	_type = "ReviewAction",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<AssessAction
			{...props}
			_type={_type}
			subtypeProperties={{
				resultReview,
				...subtypeProperties,
			}}
		>
			{children}
		</AssessAction>
	)
}
