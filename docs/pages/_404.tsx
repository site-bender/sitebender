import Head from "~components/page/Head/index.tsx"

import createElement from "~utilities/createElement/index.ts"
import Fragment from "~utilities/Fragment/index.ts"

// Ensure JSX factory symbols are in scope for TS
void createElement
void Fragment

export default function NotFound() {
	return (
		<>
			<Head title="404 - Page Not Found" />
			<main class="error-page">
				<h1>404 - Page Not Found</h1>
				<p>The page you're looking for doesn't exist.</p>
				<a href="/">Return to Home</a>
			</main>
		</>
	)
}
