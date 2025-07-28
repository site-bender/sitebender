import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { SizeSystemEnumerationProps } from "../index.ts"

export interface WearableSizeSystemEnumerationProps {}

type WearableSizeSystemEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& SizeSystemEnumerationProps
	& WearableSizeSystemEnumerationProps

export default WearableSizeSystemEnumeration
