export const decodeBase64 = (encoded: string): string => {
    try {
      return atob(encoded);
    } catch (e) {
      console.error("Invalid base64 string");
      return "";
    }
  };
  