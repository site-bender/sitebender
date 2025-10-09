//++ Test component for semantic parsing with functions and JSX
export default function semanticTest(name: string) {
	return function semanticTestWithName(): JSX.Element {
		function greetUser(userName: string) {
			return function greetUserWithMessage(message: string): string {
				return `${message}, ${userName}!`
			}
		}

		const greeting = greetUser(name)("Hello")

		return (
			<div>
				<h1>{greeting}</h1>
				<p>This is a test component for semantic parsing.</p>
			</div>
		)
	}
}
