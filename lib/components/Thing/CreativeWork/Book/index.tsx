import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type { BookProps } from "../../../../types/Thing/CreativeWork/Book/index.ts"
import type { CreativeWorkProps } from "../../../../types/Thing/CreativeWork/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	BookProps,
	"Book",
	ExtractLevelProps<BookProps, CreativeWorkProps>
>

export default function Book({
	isbn,
	numberOfPages,
	bookEdition,
	bookFormat,
	illustrator,
	schemaType = "Book",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				isbn,
				numberOfPages,
				bookEdition,
				bookFormat,
				illustrator,
				...subtypeProperties,
			}}
		/>
	)
}
