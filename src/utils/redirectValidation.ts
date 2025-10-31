/**
 * Validates redirect URLs to prevent open redirect attacks
 * Only allows relative paths and same-origin URLs
 */
export const validateRedirectUrl = (redirectUrl: string | null, fallback: string = '/'): string => {
  if (!redirectUrl) {
    return fallback;
  }

  // Remove any leading/trailing whitespace
  const cleanUrl = redirectUrl.trim();

  // Allow relative paths that start with /
  if (cleanUrl.startsWith('/') && !cleanUrl.startsWith('//')) {
    // Ensure it doesn't contain dangerous characters
    if (!/[<>"'`]/.test(cleanUrl)) {
      return cleanUrl;
    }
  }

  // Check if it's a same-origin URL
  try {
    const url = new URL(cleanUrl, window.location.origin);
    if (url.origin === window.location.origin) {
      return url.pathname + url.search + url.hash;
    }
  } catch {
    // Invalid URL, fall through to default
  }

  // If validation fails, return the fallback
  return fallback;
};

/**
 * Whitelist of allowed redirect paths for additional security
 */
const ALLOWED_REDIRECT_PATHS = [
  '/',
  '/practice',
  '/resources', 
  '/planner',
  '/profile',
  '/pricing',
  '/syllabus'
];

/**
 * Validates redirect URL against a whitelist of allowed paths
 */
export const validateRedirectPath = (redirectUrl: string | null, fallback: string = '/practice'): string => {
  const validatedUrl = validateRedirectUrl(redirectUrl, fallback);
  
  // Extract just the pathname for whitelist check
  const pathname = validatedUrl.split('?')[0].split('#')[0];
  
  if (ALLOWED_REDIRECT_PATHS.includes(pathname)) {
    return validatedUrl;
  }
  
  return fallback;
};