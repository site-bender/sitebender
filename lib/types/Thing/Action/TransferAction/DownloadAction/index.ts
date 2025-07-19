// DownloadAction extends TransferAction but adds no additional properties
import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { TransferActionProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface DownloadActionProps {}

type DownloadAction =
	& Thing
	& ActionProps
	& TransferActionProps
	& DownloadActionProps

export default DownloadAction
