import createAssetElements from "~scripts/build/createAssetElements/index.tsx"

import createElement from "~utilities/createElement/index.ts"
import Fragment from "~utilities/Fragment/index.ts"

// Set up JSX runtime
Object.assign(globalThis, { createElement, Fragment })

export type Props = {
	Component: () => JSX.Element
	Head?: () => JSX.Element
	assets?: Array<string>
}

export default function App({ Component, Head, assets = [] }: Props) {
	const assetElements = createAssetElements(assets)

	return (
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />

				{/* Shared styles - used by both legacy and modern approaches */}
				<link rel="stylesheet" href="/styles/reset/index.css" />
				<link rel="stylesheet" href="/styles/fonts/index.css" />
				<link rel="stylesheet" href="/styles/root/colors/index.css" />
				<link rel="stylesheet" href="/styles/root/fonts/index.css" />
				<link rel="stylesheet" href="/styles/root/sizing/index.css" />
				<link rel="stylesheet" href="/styles/root/spacing/index.css" />
				<link rel="stylesheet" href="/styles/base/index.css" />
				{assetElements}
				{Head && <Head />}
				<link rel="stylesheet" href="/styles/utilities/index.css" />
			</head>
			<body>
				<Component />
			</body>
		</html>
	)
}
