import createServer from './createServer/index.ts';
import getFreePort from './getFreePort/index.ts';
import watchForChanges from './watchForChanges/index.ts';

const logger: Logger = {
	log: console.log,
	info: console.info,
	warn: console.warn,
	error: console.error,
};

console.log('🏗️ Running initial build...');
try {
	const process = new Deno.Command('deno', {
		args: ['run', '-A', '--no-check', '.sitebender/scripts/build/index.ts'],
	});
	await process.output();
	console.log('✅ Initial build completed');
} catch (error) {
	console.error('❌ Initial build failed:', error);
}

const port = getFreePort(5555);
createServer(logger, { port });
console.log(`🚀 Dev server running at http://localhost:${port}`);
console.log('Press Ctrl+C to stop');

await watchForChanges('.sitebender/scripts/build/index.ts');
