import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

export interface PublicToiletProps {
	"@type"?: "PublicToilet"}

type PublicToilet = Thing & PlaceProps & CivicStructureProps & PublicToiletProps

export default PublicToilet
