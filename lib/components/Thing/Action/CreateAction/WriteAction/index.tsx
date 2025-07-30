import type BaseProps from "../../../../../types/index.ts"
import type WriteActionProps from "../../../../../types/Thing/Action/CreateAction/WriteAction/index.ts"

import CreateAction from "../index.tsx"

export type Props = WriteActionProps & BaseProps

export default function WriteAction({
	inLanguage,
	language,
	_type = "WriteAction",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreateAction
			{...props}
			_type={_type}
			subtypeProperties={{
				inLanguage,
				language,
				...subtypeProperties,
			}}
		>{children}</CreateAction>
	)
}
