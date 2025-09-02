/// <reference lib="deno.ns" />
import { assertEquals, assertStringIncludes } from 'https://deno.land/std@0.224.0/assert/mod.ts';

import { compileJSX, formatAST } from '../src/compiler.ts';

Deno.test('inspector: compileJSX returns success and a non-null AST for simple JSX', () => {
	const src = `
    const element = <div id="x">Hello</div>;
  `;
	const res = compileJSX(src);
	assertEquals(res.success, true);
	if (!res.ast) throw new Error('AST was null');
	const formatted = formatAST(res.ast);
	assertStringIncludes(formatted, '"tag": "div"');
});
