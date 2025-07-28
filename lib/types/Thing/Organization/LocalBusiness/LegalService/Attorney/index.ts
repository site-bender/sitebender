import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { LegalServiceProps } from "../index.ts"
import type { OrganizationProps } from "../../../index.ts"

import AttorneyComponent from "../../../../../../../components/Thing/Organization/LocalBusiness/LegalService/Attorney/index.tsx"

export interface AttorneyProps {
}

type Attorney =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& LegalServiceProps
	& OrganizationProps
	& AttorneyProps

export default Attorney
