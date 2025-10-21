import { assertEquals } from "jsr:@std/assert"
import UserCard from "./index.tsx"

Deno.test("UserCard renders user information", function () {
	const props = {
		name: "Alice",
		age: 30,
	}

	const component = UserCard(props)

	assertEquals(component.props.children[0].props.children, "Alice")
})
