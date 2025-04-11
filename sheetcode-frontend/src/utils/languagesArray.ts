import { getAllLanguages } from "../services/languagesHandler";
import { Language } from "./types";

export const languages: Language[] = await getAllLanguages();

console.log(languages);