import type BaseProps from "../../../../types/index.ts"
import type ChapterProps from "../../../../types/Thing/CreativeWork/Chapter/index.ts"

import CreativeWork from "../index.tsx"

export type Props = ChapterProps & BaseProps

export default function Chapter({
	pageEnd,
	pageStart,
	pagination,
	_type = "Chapter",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				pageEnd,
				pageStart,
				pagination,
				...subtypeProperties,
			}}
		/>
	)
}
