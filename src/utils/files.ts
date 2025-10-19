import { existsSync } from 'fs';
import { join } from 'path';

export function checkProjectExists(projectName: string): boolean {
  const projectPath = join(process.cwd(), projectName);
  return existsSync(projectPath);
}

export function getProjectPath(projectName: string): string {
  return join(process.cwd(), projectName);
}
