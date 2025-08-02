import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { TransferActionProps } from "../index.ts"

export type DownloadActionType = "DownloadAction"

export interface DownloadActionProps {
	"@type"?: DownloadActionType
}

type DownloadAction =
	& Thing
	& ActionProps
	& TransferActionProps
	& DownloadActionProps

export default DownloadAction
