import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"

export type VirtualLocationType = "VirtualLocation"

export interface VirtualLocationProps {
	"@type"?: VirtualLocationType
}

type VirtualLocation = Thing & IntangibleProps & VirtualLocationProps

export default VirtualLocation
