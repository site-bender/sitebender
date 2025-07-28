import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { LegalServiceProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import NotaryComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/LegalService/Notary/index.tsx"

export interface NotaryProps {
}

type Notary =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& LegalServiceProps
	& OrganizationProps
	& NotaryProps

export default Notary
