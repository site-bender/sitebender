import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

export type ZooType = "Zoo"

export interface ZooProps {
	"@type"?: ZooType
}

type Zoo = Thing & PlaceProps & CivicStructureProps & ZooProps

export default Zoo
