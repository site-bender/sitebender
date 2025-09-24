import generateBase58Uuid from "./generateBase58Uuid/index.ts"

//++ Generates a valid HTML ID attribute with a unique identifier
export default function generateShortId(): string {
	return `_${generateBase58Uuid()}`
}

//?? [EXAMPLE] generateShortId() // "_4Kh8gTjX9pQ2mN7yR3Wz"
//?? [EXAMPLE] generateShortId() // "_7Bx3mPq5vN2jK8Ht6Yz" (different each time)
/*??
 | [EXAMPLE]
 | const checkboxId = generateShortId()
 | // Use with <input id={checkboxId}> and <label htmlFor={checkboxId}>
 |
 | const element = document.createElement('div')
 | element.id = generateShortId()
 |
 | const ids = Array.from({ length: 3 }, generateShortId)
 | // ["_9Ht6Yz3mPq5vN2j", "_2Kx8mTp4Qn7yR3", "_5Wz7Bx3mPq"]
 |
 | [GOTCHA] Always starts with underscore to ensure valid HTML ID
 */
