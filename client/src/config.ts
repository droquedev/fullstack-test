declare global {
  interface ImportMetaEnv {
    VITE_BE_BASE_URL: string;
  }
}

export const config = {
  BE_BASE_URL: import.meta.env.VITE_BE_BASE_URL,
};
