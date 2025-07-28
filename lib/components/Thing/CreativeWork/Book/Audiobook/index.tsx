import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../../types/Thing/CreativeWork/index.ts"
import type { BookProps } from "../../../../../types/Thing/CreativeWork/Book/index.ts"
import type { AudiobookProps } from "../../../../../types/Thing/CreativeWork/Book/Audiobook/index.ts"

import Book from "../index.tsx"

export type Props = BaseComponentProps<
	AudiobookProps,
	"Audiobook",
	ExtractLevelProps<ThingProps, CreativeWorkProps, BookProps>
>

export default function Audiobook({
	duration,
	readBy,
	schemaType = "Audiobook",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Book
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				duration,
				readBy,
				...subtypeProperties,
			}}
		/>
	)
}
