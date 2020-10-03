import { IAnagram } from "./IAnagram";

export class Anagram implements IAnagram {
  word1: string;
  word2: string;

  public constructor(word1, word2) {
    this.word1 = word1;
    this.word2 = word2;
  }

  public isAnagram(): boolean {
    throw new Error("Method not implemented");
  }
}