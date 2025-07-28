import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../../Place/index.ts"
import type { LocalBusinessProps } from "../index.ts"
import type { OrganizationProps } from "../../index.ts"

import DryCleaningOrLaundryComponent from "../../../../../../components/Thing/Organization/LocalBusiness/DryCleaningOrLaundry/index.tsx"

export interface DryCleaningOrLaundryProps {
}

type DryCleaningOrLaundry =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& OrganizationProps
	& DryCleaningOrLaundryProps

export default DryCleaningOrLaundry
