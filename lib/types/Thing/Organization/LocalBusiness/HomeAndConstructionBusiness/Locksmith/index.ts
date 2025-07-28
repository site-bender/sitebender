import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { HomeAndConstructionBusinessProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import LocksmithComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/HomeAndConstructionBusiness/Locksmith/index.tsx"

export interface LocksmithProps {
}

type Locksmith =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& HomeAndConstructionBusinessProps
	& OrganizationProps
	& LocksmithProps

export default Locksmith
