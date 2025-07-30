import type BaseProps from "../../../../types/index.ts"
import type BookProps from "../../../../types/Thing/CreativeWork/Book/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BookProps & BaseProps

export default function Book({
	abridged,
	bookEdition,
	bookFormat,
	illustrator,
	isbn,
	numberOfPages,
	_type = "Book",
	subtypeProperties = {},
	...allProps
}: Props): JSX.Element {
	const { name, title } = allProps

	// If `title` is provided, use it; otherwise, fall back to `name`
	const props = {
		...allProps,
		name: name ?? title,
	}
	return (
		<CreativeWork
			{...props}
			_type={_type}
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
