import type BaseProps from "../../../../../types/index.ts"
import type PaintActionProps from "../../../../../types/Thing/Action/CreateAction/PaintAction/index.ts"

import CreateAction from "../index.tsx"

export type Props = PaintActionProps & BaseProps

export default function PaintAction({
	_type = "PaintAction",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreateAction
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</CreateAction>
	)
}
