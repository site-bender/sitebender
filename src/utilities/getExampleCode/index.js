const convertKey = key => key.match(/index\.(css|html|js)/)[1]

const getExampleCode = async glob => {
	const entries = Object.entries(glob).reduce(
		(out, [key, value]) => ({
			...out,
			[convertKey(key)]: value,
		}),
		{},
	)

	const css = await entries.css?.()
	const html = await entries.html?.()
	const js = await entries.js?.()

	return { css, html, js }
}

export default getExampleCode
