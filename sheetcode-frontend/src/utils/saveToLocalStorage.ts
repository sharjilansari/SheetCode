import { UserHandler } from "../services/userHandler";

const userHandler = new UserHandler(import.meta.env.VITE_BACKEND_URL);

class LocalStorage {
  saveToLocalStorage = async (_id: string) => {
    const userData = await userHandler.getUserDetails(_id);
    console.log(userData);
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  getFromLocalStorage = () => {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  };
}

export { LocalStorage };
