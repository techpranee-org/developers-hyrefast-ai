#!/usr/bin/env node
/**
 * Patch Nextra 4.6.1 Zod bug: LayoutPropsSchema has `children: reactNode` (required)
 * but the Layout component destructures `children` out before calling safeParse,
 * causing "expected nonoptional, received undefined → at children" on every page.
 *
 * This script makes `children` optional in the schema after npm install.
 */
const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '..', 'node_modules', 'nextra-theme-docs', 'dist', 'schemas.js')

if (!fs.existsSync(filePath)) {
  console.log('[patch-nextra] schemas.js not found, skipping')
  process.exit(0)
}

const content = fs.readFileSync(filePath, 'utf8')

if (content.includes('children: reactNode.optional()')) {
  console.log('[patch-nextra] already patched, skipping')
  process.exit(0)
}

const patched = content.replace(
  'children: reactNode,\n  copyPageButton:',
  'children: reactNode.optional(),\n  copyPageButton:'
)

if (patched === content) {
  console.log('[patch-nextra] pattern not found, skipping')
  process.exit(0)
}

fs.writeFileSync(filePath, patched)
console.log('[patch-nextra] patched children: reactNode → reactNode.optional()')