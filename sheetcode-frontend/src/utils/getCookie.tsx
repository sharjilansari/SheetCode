import Cookies from "js-cookie";

const getCookie = (name: string): string | null => {
  const value = Cookies.get(name);
//   console.log(value);
  return value ?? null;
};

export default getCookie;
