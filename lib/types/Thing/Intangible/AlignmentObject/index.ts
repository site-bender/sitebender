import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"

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
