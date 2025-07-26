import type Thing from "../../index.ts"
import type { ActionProps } from "../index.ts"
import type Place from "../../Place/index.ts"

export interface TransferActionProps {
	fromLocation?: Place
	toLocation?: Place
}

type TransferAction =
	& Thing
	& ActionProps
	& TransferActionProps

export default TransferAction
