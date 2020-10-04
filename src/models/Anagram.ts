import { IAnagram } from "./IAnagram";
import * as SpellChecker from "simple-spellchecker";

/**
 * Class to verify whether a pair of single words are anagrams of one another
 */
export class Anagram implements IAnagram {
  public constructor(word1, word2) {
    this.word1 = word1;
    this.word2 = word2;
  }
  
  word1: string;
  word2: string;
  /** String used to explain why a canagram candidate pair was, or was not, an anagram */
  private statusMsg: string = "";

  /**
   * Checks whether a anagram candidate word is a valid dictionary word
   * Must be type string (check for null too)
   * Must be a single word
   * Must have min length of 1
   * Must have max length of 50 (longest word is ~46)
   * Must be a dictionary word (english)
   * Must NOT have number or symbols
   * @param word string of an anagram candidate to be evaluated
   */
  private isValidWord(word: string): boolean {
    if (typeof(word) != "string") {
      this.statusMsg = `'${word}' must only contian letters.`;
      return false;
    }

    if (word.length > 50) {
      this.statusMsg = `'${word}' can only be a maximum of 50 characters long`;
      return false;
    }

    if (word.length < 1) {
      this.statusMsg = `Your entry has to be at least one character long`;
      return false;
    }

    
    if (word.length != word.trim().length) {
      this.statusMsg = `'${word}' has whitespace that you might want to delete.`
    }

    if (word.includes(" ")) {
      this.statusMsg = `'${word}' can only be one word long.`;
      return false;
    }

    if (!/^[a-zA-Z]+$/.test(word)) {
      this.statusMsg = `'${word}' must only contian letters (no numbers or symbols).`;
      return false;
    }

    let dictionary = SpellChecker.getDictionarySync("en-US");
    if (!dictionary.spellCheck(word)) {
      this.statusMsg = `'${word}' is not an english dictionary word.`;
      return false;
    }
    
    return true;
  }
  
  public isAnagram(): boolean {
    // Two of the same word are also not anagrams
    // Should be case insensitive
    
    if (!this.isValidWord(this.word1)) {
      return false;
    }
    if (!this.isValidWord(this.word2)) {
      return false;
    }
    if (this.word1 === this.word2) {
      this.statusMsg = `Please use words that are not identical to eachother.`;
      return false;
    }

    let anagram1 = this.alphabetize(this.word1.toLowerCase());
    let anagram2 = this.alphabetize(this.word2.toLowerCase());

    if (anagram1 === anagram2) {
      this.statusMsg = `These two words are valid anagrams.`;
      return true;
    } else {
      this.statusMsg = `These two words are not valid anagrams.`;
      return false;
    }
  }

  /**
   * Mutate string so each letter is in alphabetical order
   * e.g. "vehicle" returns "ceehilv"
   * Since .sort only works on arrays, first split string into array, 
   * then sort and rejoin to a string.
   * @param string 
   */
  private alphabetize(string) {
      return string.split('').sort().join('');
  }

  public getStatusMsg(): string {
    if (this.statusMsg === "") throw Error("Could not get status message.");
    return this.statusMsg;
  }
}