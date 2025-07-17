import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type BookProps from "../../../../types/Thing/Book/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	BookProps,
	"Book",
	ExtractLevelProps<BookProps, CreativeWorkProps>
>

export default function Book(
	{
		abridged,
		bookEdition,
		bookFormat,
		illustrator,
		isbn,
		numberOfPages,
		schemaType = "Book",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				abridged,
				bookEdition,
				bookFormat,
				illustrator,
				isbn,
				numberOfPages,
				...subtypeProperties,
			}}
		/>
	)
}
