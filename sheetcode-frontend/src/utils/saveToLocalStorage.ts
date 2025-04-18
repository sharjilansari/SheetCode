// import { UserHandler } from "../services/userHandler";

// const userHandler = new UserHandler(import.meta.env.VITE_BACKEND_URL);

class LocalStorage {
  saveToLocalStorage = async (localString: string, data: any) => {
    // const userData = await userHandler.getUserDetails(_id);
    // console.log(userData)
    localStorage.setItem(localString, JSON.stringify(data));
  };

  getFromLocalStorage = (localString: string) => {
    const data = localStorage.getItem(localString);
    
    return data ? JSON.parse(data) : null;
  };
}

export { LocalStorage };
