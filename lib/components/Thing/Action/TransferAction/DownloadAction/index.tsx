import type BaseProps from "../../../../../types/index.ts"
import type DownloadActionProps from "../../../../../types/Thing/Action/TransferAction/DownloadAction/index.ts"

import TransferAction from "../index.tsx"

export type Props = DownloadActionProps & BaseProps

export default function DownloadAction({
	_type = "DownloadAction",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<TransferAction
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</TransferAction>
	)
}
