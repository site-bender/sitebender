import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { LodgingBusinessProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import HostelComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/LodgingBusiness/Hostel/index.tsx"

export interface HostelProps {
}

type Hostel =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& LodgingBusinessProps
	& OrganizationProps
	& HostelProps

export default Hostel
