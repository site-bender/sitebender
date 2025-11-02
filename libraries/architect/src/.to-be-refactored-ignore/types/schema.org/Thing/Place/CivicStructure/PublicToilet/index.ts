import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { CivicStructureProps } from "../index.ts"

export type PublicToiletType = "PublicToilet"

export interface PublicToiletProps {
	"@type"?: PublicToiletType
}

type PublicToilet = Thing & PlaceProps & CivicStructureProps & PublicToiletProps

export default PublicToilet
