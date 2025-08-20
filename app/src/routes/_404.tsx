import Head from "~components/page/Head/index.tsx"

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
