import type { Integer, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

export type ChapterType = "Chapter"

export interface ChapterProps {
	"@type"?: ChapterType
	pageEnd?: Integer | Text
	pageStart?: Integer | Text
	pagination?: Text
}

type Chapter = Thing & CreativeWorkProps & ChapterProps

export default Chapter
