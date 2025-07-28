import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { TransferActionProps } from "../index.ts"

import DownloadActionComponent from "../../../../../../components/Thing/Action/TransferAction/DownloadAction/index.tsx"

export interface DownloadActionProps {
}

type DownloadAction =
	& Thing
	& ActionProps
	& TransferActionProps
	& DownloadActionProps

export default DownloadAction
