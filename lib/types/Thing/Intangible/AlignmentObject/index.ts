import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"

import AlignmentObjectComponent from "../../../../../components/Thing/Intangible/AlignmentObject/index.tsx"

export interface AlignmentObjectProps {
	alignmentType?: Text
	educationalFramework?: Text
	targetDescription?: Text
	targetName?: Text
	targetUrl?: URL
}

type AlignmentObject =
	& Thing
	& IntangibleProps
	& AlignmentObjectProps

export default AlignmentObject
