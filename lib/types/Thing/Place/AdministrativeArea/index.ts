import type Thing from "../../index.ts"
import type { PlaceProps } from "../index.ts"

import AdministrativeAreaComponent from "../../../../../components/Thing/Place/AdministrativeArea/index.tsx"

export interface AdministrativeAreaProps {
}

type AdministrativeArea =
	& Thing
	& PlaceProps
	& AdministrativeAreaProps

export default AdministrativeArea
