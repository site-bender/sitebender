import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

export interface ZooProps {
	"@type"?: "Zoo"}

type Zoo = Thing & PlaceProps & CivicStructureProps & ZooProps

export default Zoo
