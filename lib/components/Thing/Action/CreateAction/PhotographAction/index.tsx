import type BaseProps from "../../../../../types/index.ts"
import type { PhotographActionProps } from "../../../../../types/Thing/Action/CreateAction/PhotographAction/index.ts"

import CreateAction from "../index.tsx"

export type Props = PhotographActionProps & BaseProps

export default function PhotographAction({
	_type = "PhotographAction",
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
		/>
	)
}
