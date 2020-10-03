export interface IAnagram {
  word1: string;
  word2: string;

  isAnagram(): boolean;
  getStatusMsg(): string;
}