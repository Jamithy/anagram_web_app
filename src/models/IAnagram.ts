export interface IAnagram {
  word1: string;
  word2: string;

  isValidWord(word: string): boolean;
  isAnagram(): boolean;
  getStatusMsg(): string;
}