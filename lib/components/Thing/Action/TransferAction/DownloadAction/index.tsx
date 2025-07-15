import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type DownloadActionProps from "../../../../../types/Thing/DownloadAction/index.ts"
import type TransferActionProps from "../../../../../types/Thing/TransferAction/index.ts"

import TransferAction from "./index.tsx"

// DownloadAction adds no properties to the TransferAction schema type
export type Props = BaseComponentProps<
	DownloadActionProps,
	"DownloadAction",
	ExtractLevelProps<DownloadActionProps, TransferActionProps>
>

export default function DownloadAction({
	schemaType = "DownloadAction",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<TransferAction
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
