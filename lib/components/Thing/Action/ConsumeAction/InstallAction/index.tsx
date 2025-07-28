import type BaseProps from "../../../../../types/index.ts"
import type { InstallActionProps } from "../../../../../types/Thing/Action/ConsumeAction/InstallAction/index.ts"

import ConsumeAction from "../index.tsx"

export type Props = InstallActionProps & BaseProps

export default function InstallAction({
	_type = "InstallAction",
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
		/>
	)
}
