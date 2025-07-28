import type { Integer, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

import ChapterComponent from "../../../../../components/Thing/CreativeWork/Chapter/index.tsx"

export interface ChapterProps {
	pageEnd?: Integer | Text
	pageStart?: Integer | Text
	pagination?: Text
}

type Chapter =
	& Thing
	& CreativeWorkProps
	& ChapterProps

export default Chapter
