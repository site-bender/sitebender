#!/usr/bin/env -S deno run -A

export default async function setup(): Promise<void> {
	try {
		// Configure git to use our custom hooks directory
		const process = new Deno.Command('git', {
			args: ['config', 'core.hooksPath', '.githooks'],
			stdout: 'piped',
			stderr: 'piped',
		});

		const { code } = await process.output();

		if (code === 0) {
			console.log('✅ Git hooks configured successfully!');
			console.log('📁 Hooks directory: .githooks/');
			console.log(
				'🔄 Pre-commit hook will automatically sort imports and format code',
			);
		} else {
			console.error('❌ Failed to configure git hooks');
			Deno.exit(1);
		}
	} catch (error) {
		console.error('❌ Error setting up git hooks:', error);
		Deno.exit(1);
	}
}

if (import.meta.main) {
	await setup();
}
