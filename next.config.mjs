import { fileURLToPath } from 'node:url';
import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();
const projectRoot = fileURLToPath(new URL('.', import.meta.url));

/** @type {import('next').NextConfig} */
const config = {
  allowedDevOrigins: ['127.0.0.1'],
  reactStrictMode: true,
  turbopack: {
    root: projectRoot,
  },
};

export default withMDX(config);
