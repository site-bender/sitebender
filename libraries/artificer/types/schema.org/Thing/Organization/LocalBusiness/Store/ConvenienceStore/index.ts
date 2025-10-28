import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { StoreProps } from "../index.ts"

export type ConvenienceStoreType = "ConvenienceStore"

export interface ConvenienceStoreProps {
	"@type"?: ConvenienceStoreType
}

type ConvenienceStore =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& StoreProps
	& OrganizationProps
	& ConvenienceStoreProps

export default ConvenienceStore
