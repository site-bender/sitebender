import type BaseProps from "../../../../../types/index.ts"
import type { DownloadAction as DownloadActionProps } from "../../../../../types/index.ts"

import TransferAction from "../index.tsx"

export type Props = DownloadActionProps & BaseProps

export default function DownloadAction({
	_type = "DownloadAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
