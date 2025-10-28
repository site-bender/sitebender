import type Thing from "../../index.ts"
import type Place from "../../Place/index.ts"
import type { ActionProps } from "../index.ts"
import type { BorrowActionType } from "./BorrowAction/index.ts"
import type { DonateActionType } from "./DonateAction/index.ts"
import type { DownloadActionType } from "./DownloadAction/index.ts"
import type { GiveActionType } from "./GiveAction/index.ts"
import type { LendActionType } from "./LendAction/index.ts"
import type { MoneyTransferType } from "./MoneyTransfer/index.ts"
import type { ReceiveActionType } from "./ReceiveAction/index.ts"
import type { ReturnActionType } from "./ReturnAction/index.ts"
import type { SendActionType } from "./SendAction/index.ts"
import type { TakeActionType } from "./TakeAction/index.ts"

import PlaceComponent from "../../../../../../pagewright/src/define/Thing/Place/index.tsx"

export type TransferActionType =
	| "TransferAction"
	| ReceiveActionType
	| BorrowActionType
	| GiveActionType
	| DownloadActionType
	| MoneyTransferType
	| DonateActionType
	| ReturnActionType
	| TakeActionType
	| SendActionType
	| LendActionType

export interface TransferActionProps {
	"@type"?: TransferActionType
	fromLocation?: Place | ReturnType<typeof PlaceComponent>
	toLocation?: Place | ReturnType<typeof PlaceComponent>
}

type TransferAction = Thing & ActionProps & TransferActionProps

export default TransferAction
