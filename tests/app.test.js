let { app, getMovies, getMovieById, addMovie } = require("../index.js");
let http = require("http");

jest.mock("../index.js", () => {
  const actualModule = jest.requireActual("../index.js");
  return {
    ...actualModule,
    getMovies: jest.fn(),
    getMovieById: jest.fn(),
    addMovie: jest.fn(),
  };
});

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("Function tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getMovies should return all movies", () => {
    const mockMovies = [
      { id: 1, title: "The Shawshank Redemption", director: "Frank Darabont" },
      { id: 2, title: "The Godfather", director: "Francis Ford Coppola" },
      { id: 3, title: "The Dark Knight", director: "Christopher Nolan" },
    ];

    getMovies.mockReturnValue(mockMovies);

    let result = getMovies();
    expect(result).toEqual(mockMovies);
    expect(getMovies).toHaveBeenCalled();
  });

  test("getMovieById should return a movie by Id", () => {
    const mockMovie = {
      id: 1,
      title: "The Shawshank Redemption",
      director: "Frank Darabont",
    };

    getMovieById.mockReturnValue(mockMovie);

    let result = getMovieById(1);
    expect(result).toEqual(mockMovie);
    expect(getMovieById).toHaveBeenCalledWith(1);
  });

  test("getMovieById should return undefined if movie Id not found", () => {
    getMovieById.mockReturnValue(undefined);

    let result = getMovieById(999);
    expect(result).toEqual(undefined);
    expect(getMovieById).toHaveBeenCalledWith(999);
  });

  test("addMovie should add a new movie", () => {
    const newMovie = { id: 5, title: "New Movie", director: "New Director" };

    addMovie.mockReturnValue(newMovie);

    let result = addMovie(newMovie);
    expect(result).toEqual(newMovie);
    expect(addMovie).toHaveBeenCalledWith(newMovie);
  });
});
