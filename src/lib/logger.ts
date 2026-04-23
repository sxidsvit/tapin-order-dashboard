/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// A02 Remediation: Production-grade logger that prevents sensitive data leaks
export const logger = {
  info: (message: string, ...args: any[]) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[INFO] ${message}`, ...args);
    }
  },
  
  warn: (message: string, ...args: any[]) => {
    console.warn(`[WARN] ${message}`, ...args);
  },

  error: (message: string, error?: any) => {
    // In production, we strip deep metadata from error objects before logging
    const safeError = error instanceof Error ? { message: error.message } : 'An unknown error occurred';
    console.error(`[ERROR] ${message}`, safeError);
    
    // In a real app, this is where Sentry.captureException(error) would go
  }
};
