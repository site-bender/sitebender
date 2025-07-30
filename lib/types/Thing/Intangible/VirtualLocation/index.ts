import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"

export interface VirtualLocationProps {
	"@type"?: "VirtualLocation"}

type VirtualLocation = Thing & IntangibleProps & VirtualLocationProps

export default VirtualLocation
