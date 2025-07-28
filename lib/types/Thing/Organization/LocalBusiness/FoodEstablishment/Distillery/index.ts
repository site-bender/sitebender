import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { FoodEstablishmentProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import DistilleryComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/FoodEstablishment/Distillery/index.tsx"

export interface DistilleryProps {
}

type Distillery =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& FoodEstablishmentProps
	& OrganizationProps
	& DistilleryProps

export default Distillery
