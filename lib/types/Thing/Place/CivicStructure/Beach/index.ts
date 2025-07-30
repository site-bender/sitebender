import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

export interface BeachProps {
	"@type"?: "Beach"}

type Beach = Thing & PlaceProps & CivicStructureProps & BeachProps

export default Beach
