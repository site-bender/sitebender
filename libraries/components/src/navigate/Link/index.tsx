import buildRelAttribute from "./buildRelAttribute/index.ts"
import isUrlExternal from "./isUrlExternal/index.ts"
import openAsToTarget from "./openAsToTarget/index.ts"
import processHref from "./processHref/index.ts"

export type Props = {
	/** The destination URL or special @-prefixed shortcut */
	to: string
	children?: string | JSX.Element | (string | JSX.Element)[]

	// Semantic relationship props
	toHelp?: boolean
	toGlossary?: boolean
	toNextPage?: boolean
	toPreviousPage?: boolean
	asDownload?: string | boolean

	// Security override props
	allowTabJacking?: boolean // opt-out of noopener (not recommended)
	allowSearchEngineIndexing?: boolean // opt-out of nofollow (not recommended)
	hideReferringPage?: boolean // noreferrer (still opt-in)

	// Navigation target props
	openAs?: "newTab" | "parentTab" | "originalTab"

	// Other standard anchor attributes
	class?: string
	id?: string
	title?: string
	target?: string
	rel?: string
}

export default function Link(props: Props): JSX.Element {
	const href = processHref(props.to)
	const isExternal = isUrlExternal(href)

	// Build the rel attribute with secure defaults for external links
	const rel = buildRelAttribute(props, isExternal)

	// Determine target from openAs
	const target = props.openAs ? openAsToTarget(props.openAs) : props.target

	// Spread remaining props
	const {
		to: _to,
		toHelp: _toHelp,
		toGlossary: _toGlossary,
		toNextPage: _toNextPage,
		toPreviousPage: _toPreviousPage,
		asDownload,
		allowTabJacking: _allowTabJacking,
		allowSearchEngineIndexing: _allowSearchEngineIndexing,
		hideReferringPage: _hideReferringPage,
		openAs: _openAs,
		...anchorProps
	} = props

	return (
		<a
			href={href}
			rel={rel}
			target={target}
			download={asDownload}
			{...anchorProps}
		>
			{props.children}
		</a>
	)
}
