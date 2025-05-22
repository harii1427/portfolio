// src/utils/pageSequence.ts
export const pageSequence: string[] = [
  '/',
  '/about',
  '/projects',
  '/certifications',
  '/contact',
];

export const getNextPage = (currentPath: string): string | null => {
  const normalizedPath = currentPath.endsWith('/') && currentPath.length > 1 
    ? currentPath.slice(0, -1) 
    : currentPath;
  const currentIndex = pageSequence.indexOf(normalizedPath);
  if (currentIndex !== -1 && currentIndex < pageSequence.length - 1) {
    return pageSequence[currentIndex + 1];
  }
  return null;
};

export const getPreviousPage = (currentPath: string): string | null => {
  const normalizedPath = currentPath.endsWith('/') && currentPath.length > 1 
    ? currentPath.slice(0, -1) 
    : currentPath;
  const currentIndex = pageSequence.indexOf(normalizedPath);
  if (currentIndex !== -1 && currentIndex > 0) {
    return pageSequence[currentIndex - 1];
  }
  return null;
};