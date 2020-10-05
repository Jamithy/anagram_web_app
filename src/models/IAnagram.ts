/**
 * Class to verify whether a pair of single words are anagrams of one another
 */
export interface IAnagram {
  words: IAnagramModel;

  /**
   * The algorithm to determine whether two class property strings are
   * anagrams of one another.
   */
  isAnagram(): boolean;

  /**
   * Returns the details of why a pair of words are (or are not) valid anagrams
   * of one another
   */
  getStatusMsg(): string;
}

/** Pair of potential anagram candidates */
export interface IAnagramModel {
  /** First potential anagram candidate */
  word1: string;
  /** Second potential anagram candidate */
  word2: string;
}