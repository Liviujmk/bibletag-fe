// import { BIBLE_API_SOURCE, ACTIVE_BIBLE_VERSION, BIBLE_VERSIONS_LABELS } from "../constants/bible.const";
// import axios from 'axios';

// export const BIBLE_API = axios.create({
//     baseURL: `${BIBLE_API_SOURCE}/${ACTIVE_BIBLE_VERSION}}`
// });

// export const BIBLE_TAGGER = {
//     getBook: async (book: number) => {
//         const response = await BIBLE_API.get(book.toString());
//         return response.data;
//     },
//     getVerse: async (book: number, chapter: number, verse: number) => {
//         const response = await BIBLE_API.get(`${book}/${chapter}`);
//         return response.data.verses.find((v: any) => v.verse === verse);
//     }
// }

