import type BaseProps from "../../../../../types/index.ts"
import type { ChooseActionProps } from "../../../../../types/Thing/Action/AssessAction/ChooseAction/index.ts"

import AssessAction from "../index.tsx"

export type Props = ChooseActionProps & BaseProps

export default function ChooseAction({
	actionOption,
	option,
	_type = "ChooseAction",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<AssessAction
			{...props}
			_type={_type}
			subtypeProperties={{
				actionOption,
				option,
				...subtypeProperties,
			}}
		/>
	)
}
