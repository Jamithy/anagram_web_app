import { Anagram } from "./models/Anagram";
import { IAnagram } from "./models/IAnagram";

export class Factory {
  public static createAnagram(w1: string, w2: string): IAnagram {
    return new Anagram(w1, w2);
  }
}