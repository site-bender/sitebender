import type Thing from "../../index.ts"
import type { PlaceProps } from "../index.ts"

export interface AdministrativeAreaProps {
	"@type"?: "AdministrativeArea"}

type AdministrativeArea = Thing & PlaceProps & AdministrativeAreaProps

export default AdministrativeArea
