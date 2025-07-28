import type BaseProps from "../../../../../types/index.ts"
import type { LendActionProps } from "../../../../../types/Thing/Action/TransferAction/LendAction/index.ts"

import TransferAction from "../index.tsx"

export type Props = LendActionProps & BaseProps

export default function LendAction({
	borrower,
	_type = "LendAction",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<TransferAction
			{...props}
			_type={_type}
			subtypeProperties={{
				borrower,
				...subtypeProperties,
			}}
		/>
	)
}
