import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type BioChemEntity from "../../BioChemEntity/index.ts"
import type CreativeWork from "../../CreativeWork/index.ts"
import type Event from "../../Event/index.ts"
import type MedicalEntity from "../../MedicalEntity/index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type Product from "../../Product/index.ts"

import GrantComponent from "../../../../../components/Thing/Intangible/Grant/index.tsx"

export interface GrantProps {
	fundedItem?:
		| BioChemEntity
		| CreativeWork
		| Event
		| MedicalEntity
		| Organization
		| Person
		| Product
	funder?: Organization | Person
	sponsor?: Organization | Person
}

type Grant =
	& Thing
	& IntangibleProps
	& GrantProps

export default Grant
