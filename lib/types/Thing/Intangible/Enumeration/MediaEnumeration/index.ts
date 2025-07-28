import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

import MediaEnumerationComponent from "../../../../../../components/Thing/Intangible/Enumeration/MediaEnumeration/index.tsx"

export interface MediaEnumerationProps {
}

type MediaEnumeration =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MediaEnumerationProps

export default MediaEnumeration
