import { Collection } from "../interfaces/collection.interface";

export const transformCollectionToSelectData = (collections : Collection[]) => {
  return collections
  .map((collection) => collection.title)
  .filter((title) => !!title);
}