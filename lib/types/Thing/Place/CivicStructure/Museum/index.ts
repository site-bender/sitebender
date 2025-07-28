import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

import MuseumComponent from "../../../../../../components/Thing/Place/CivicStructure/Museum/index.tsx"

export interface MuseumProps {
}

type Museum =
	& Thing
	& PlaceProps
	& CivicStructureProps
	& MuseumProps

export default Museum
