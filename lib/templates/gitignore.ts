export function generateGitignore(): string {
  return `node_modules/
dist/
out/
.env
.env.local
*.log
.DS_Store
Thumbs.db
`;
}
