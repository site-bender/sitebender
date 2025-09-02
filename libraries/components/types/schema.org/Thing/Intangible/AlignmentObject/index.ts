import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"

export type AlignmentObjectType = "AlignmentObject"

export interface AlignmentObjectProps {
	"@type"?: AlignmentObjectType
	alignmentType?: Text
	educationalFramework?: Text
	targetDescription?: Text
	targetName?: Text
	targetUrl?: URL
}

type AlignmentObject = Thing & IntangibleProps & AlignmentObjectProps

export default AlignmentObject
