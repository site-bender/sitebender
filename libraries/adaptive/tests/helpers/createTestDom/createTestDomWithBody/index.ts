import createTestDom from "../index.ts"

export default function createTestDomWithBody(bodyContent: string) {
	return createTestDom(
		`<!DOCTYPE html><html><head></head><body>${bodyContent}</body></html>`,
	)
}
