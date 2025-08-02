import type BaseProps from "../../../../../types/index.ts"
import type ReadActionProps from "../../../../../types/Thing/Action/ConsumeAction/ReadAction/index.ts"

import ConsumeAction from "../index.tsx"

export type Props = ReadActionProps & BaseProps

export default function ReadAction({
	_type = "ReadAction",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<ConsumeAction
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</ConsumeAction>
	)
}
