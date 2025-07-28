import type Props from "../../../../types/Thing/CreativeWork/Book/index.ts"
import type BaseProps from "../../../../types/index.ts"

import CreativeWork from "../index.tsx"

export default function Book({
	abridged,
	bookEdition,
	bookFormat,
	illustrator,
	isbn,
	numberOfPages,
	schemaType = "Book",
	subtypeProperties = {},
	...props
}: Props & BaseProps): JSX.Element {
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
