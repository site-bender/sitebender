import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

import PublicToiletComponent from "../../../../../../components/Thing/Place/CivicStructure/PublicToilet/index.tsx"

export interface PublicToiletProps {
}

type PublicToilet =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& PublicToiletProps

export default PublicToilet
