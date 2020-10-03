import { IAnagram } from "./IAnagram";

export class Anagram implements IAnagram {
  public constructor(word1, word2) {
    this.word1 = word1;
    this.word2 = word2;
  }
  
  word1: string;
  word2: string;
  private statusMsg: string = "";

  public isValidWord(word: string): boolean {
    // Must be a single word
    // Must have min length of 1
    // Must be a dictionary word (english)
    // Must be type string (check for null too)
    // Must NOT have number or symbols
    
    throw new Error("Method not implemented.");
  }
  
  public isAnagram(): boolean {
    // Two of the same word are also not anagrams
    // Should be case insensitive

    throw new Error("Method not implemented.");
  }

  public getStatusMsg(): string {
    throw new Error("Method not implemented.");
  }
}