import { getEndPoint, getSearchSuffix, getGenreIdSuffix } from '../apiUtils.js';

describe('test endpoint setup', () => {
    it.each`
        message                         | category    | page         | extras                | expected
        ${'Full url'}                   | ${'/movie'} | ${3}         | ${'&query=car'}       | ${'https://api.themoviedb.org/3/movie?api_key=cf9e0df007ff568c06e0d861b874fa2c&page=3&query=car'}
        ${'Emty page and extras'}       | ${'/movie'} | ${undefined} | ${undefined}          | ${'https://api.themoviedb.org/3/movie?api_key=cf9e0df007ff568c06e0d861b874fa2c&page=1'}
        ${'Empty page extras diferent'} | ${'/movie'} | ${undefined} | ${'&with_genres=333'} | ${'https://api.themoviedb.org/3/movie?api_key=cf9e0df007ff568c06e0d861b874fa2c&page=1&with_genres=333'}
    `('$message', ({ category, page, extras, expected }) => {
        const result = getEndPoint(category, page, extras, expected);
        expect(result).toEqual(expected);
    });
});

describe('test genre suffix', () => {
    it.each`
        message      | id           | expected
        ${'Id ok'}   | ${99}        | ${'&with_genres=99'}
        ${'Emty id'} | ${undefined} | ${'&with_genres='}
    `('$message', ({ id, expected }) => {
        const result = getGenreIdSuffix(id);
        expect(result).toEqual(expected);
    });
});

describe('test search suffix', () => {
    it.each`
        message        | id           | expected
        ${'Term ok'}   | ${99}        | ${'&query=99'}
        ${'Emty term'} | ${undefined} | ${'&query='}
    `('$message', ({ id, expected }) => {
        const result = getSearchSuffix(id);
        expect(result).toEqual(expected);
    });
});
