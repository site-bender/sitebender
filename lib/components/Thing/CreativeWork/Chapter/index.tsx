import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type ChapterProps from "../../../../types/Thing/Chapter/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"

import CreativeWork from "./index.tsx"

export type Props = BaseComponentProps<
	ChapterProps,
	"Chapter",
	ExtractLevelProps<ChapterProps, CreativeWorkProps>
>

export default function Chapter(
	{
		pageEnd,
		pageStart,
		pagination,
		schemaType = "Chapter",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				pageEnd,
				pageStart,
				pagination,
				...subtypeProperties,
			}}
		/>
	)
}
