import type { Integer, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

export interface ChapterProps {
	/** The page on which the work ends; for example "138" or "xvi". */
	pageEnd?: Text | Integer
	/** The page on which the work starts; for example "135" or "xiii". */
	pageStart?: Text | Integer
	/** Any description of pages that is not separated into pageStart and pageEnd; for example, "1-6, 9, 55" or "10-12, 46-49". */
	pagination?: Text
}

type Chapter =
	& Thing
	& CreativeWorkProps
	& ChapterProps

export default Chapter
