import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { HomeAndConstructionBusinessProps } from "../index.ts"

export type LocksmithType = "Locksmith"

export interface LocksmithProps {
	"@type"?: LocksmithType
}

type Locksmith =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& HomeAndConstructionBusinessProps
	& OrganizationProps
	& LocksmithProps

export default Locksmith
