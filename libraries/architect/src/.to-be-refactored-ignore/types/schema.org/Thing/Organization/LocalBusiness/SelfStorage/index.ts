import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { LocalBusinessProps } from "../index.ts"

export type SelfStorageType = "SelfStorage"

export interface SelfStorageProps {
	"@type"?: SelfStorageType
}

type SelfStorage =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& SelfStorageProps

export default SelfStorage
