const APIKEY = `ed5a8dcdb53ec10d28e134c47f32e0d2`


async function requestApi(urlRequest) {
    try {
        let res = await fetch(urlRequest);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function getTrendingMovies(keyApi) {
    let url = `https://api.themoviedb.org/3/trending/all/day?api_key=${keyApi}&language=fr`;
    let MoviesTrending = await requestApi(url);
    console.log(MoviesTrending.results.length)
    if (MoviesTrending.results.length > 1) {
        document.querySelector('.content-movie-trending').innerHTML = ''
        MoviesTrending.results.forEach(movie => {
            if (typeof movie.title != "undefined") {
                if (movie.poster_path == null) {
                    if (movie.backdrop_path !== null) {
                        document.querySelector('.content-movie-trending').innerHTML += CreatUiMovieCard(movie.id, movie.title, movie.release_date, movie.backdrop_path, movie.vote_average)
                    }
                } else {
                    document.querySelector('.content-movie-trending').innerHTML += CreatUiMovieCard(movie.id, movie.title, movie.release_date, movie.poster_path, movie.vote_average)
                }

            } else {
                document.querySelector('.content-movie-trending').innerHTML += CreatUiMovieCard(movie.id, movie.original_name, movie.first_air_date, movie.poster_path, movie.vote_average)
            }

        })
    } else {
        console.log('no movies')
    }
    //    console.log(MoviesTrending)

}

async function getPopularMovies(keyApi) {
    let url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${keyApi}&language=fr`;
    let MoviesPopular = await requestApi(url);
    if (MoviesPopular.results.length > 1) {
        document.querySelector('#contentPopularMovies').innerHTML = ''
        MoviesPopular.results.forEach(movie => {
            if (typeof movie.title != "undefined") {
                if (movie.poster_path == null) {
                    if (movie.backdrop_path !== null) {
                        document.querySelector('#contentPopularMovies').innerHTML += CreatUiMovieCard(movie.id, movie.title, movie.release_date, movie.backdrop_path, movie.vote_average)
                    }
                } else {
                    document.querySelector('#contentPopularMovies').innerHTML += CreatUiMovieCard(movie.id, movie.title, movie.release_date, movie.poster_path, movie.vote_average)
                }


            } else {
                document.querySelector('#contentPopularMovies').innerHTML += CreatUiMovieCard(movie.id, movie.original_name, movie.first_air_date, movie.poster_path, movie.vote_average)
            }

        })
    } else {
        console.log('no movies')
    }
    //    console.log(MoviesTrending)

}

async function getGenreMovies(keyApi) {
    let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${keyApi}&language=fr`;
    let MoviesGenre = await requestApi(url);
    console.log(MoviesGenre)
    if (MoviesGenre.genres.length > 1) {
        document.querySelector('.categorie-film').innerHTML = ''
        MoviesGenre.genres.forEach(genre => {
            document.querySelector('.categorie-film').innerHTML += `<div class="catgorie" id-genre=" ${genre.id} name-genre=" ${genre.name}">
                    ${genre.name}
                </div>`

        })
    } else {
        console.log('no genre')
    }


}

async function getRecentMovies(keyApi) {
    const date = new Date();
    let year = date.getFullYear();
    let url = `https://api.themoviedb.org/3/discover/movie?primary_release_year=${year}&sort_by=vote_average.desc&api_key=${keyApi}&language=fr`;
    let MoviesRecents = await requestApi(url);
    if (MoviesRecents.results.length > 1) {
        document.querySelector('#recentMoviesContainer').innerHTML = ''
        MoviesRecents.results.forEach(movie => {
            if (typeof movie.title != "undefined") {
                if (movie.poster_path == null) {
                    if (movie.backdrop_path !== null) {
                        document.querySelector('#recentMoviesContainer').innerHTML += CreatUiMovieCard(movie.id, movie.title, movie.release_date, movie.backdrop_path, movie.vote_average)
                    }

                } else {
                    document.querySelector('#recentMoviesContainer').innerHTML += CreatUiMovieCard(movie.id, movie.title, movie.release_date, movie.poster_path, movie.vote_average)
                }

            } else {
                document.querySelector('#recentMoviesContainer').innerHTML += CreatUiMovieCard(movie.id, movie.original_name, movie.first_air_date, movie.poster_path, movie.vote_average)
            }

        })
    } else {
        console.log('no movies')
    }

}

async function getDrameMovies(keyApi) {
    let url = `https://api.themoviedb.org/3/discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10&api_key=${keyApi}&language=fr`;
    let MoviesDrame = await requestApi(url);
    if (MoviesDrame.results.length > 1) {
        document.querySelector('#drameMoviesContainer').innerHTML = ''
        MoviesDrame.results.forEach(movie => {
            if (typeof movie.title != "undefined") {
                if (movie.poster_path == null) {
                    if (movie.backdrop_path !== null) {
                        document.querySelector('#drameMoviesContainer').innerHTML += CreatUiMovieCard(movie.id, movie.title, movie.release_date, movie.backdrop_path, movie.vote_average)
                    }
                } else {
                    document.querySelector('#drameMoviesContainer').innerHTML += CreatUiMovieCard(movie.id, movie.title, movie.release_date, movie.poster_path, movie.vote_average)
                }

            } else {
                document.querySelector('#drameMoviesContainer').innerHTML += CreatUiMovieCard(movie.id, movie.original_name, movie.first_air_date, movie.poster_path, movie.vote_average)
            }

        })
    } else {
        console.log('no movies')
    }

}

async function getComingMovies(keyApi) {
    let url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${keyApi}&language=fr&page=1`;
    let MoviesComing = await requestApi(url);
    if ('success' in MoviesComing) {
        console.log('no data')
        document.querySelector('.logo').classList.add('logo-hide')
        document.querySelector('.no-data').classList.add('no-data-visible')

    } else {
        if (MoviesComing.results.length > 1) {
            document.querySelector('#comingMoviesContainer').innerHTML = ''
            MoviesComing.results.forEach((movie, index, array) => {
                if (typeof movie.title != "undefined") {
                    if (movie.poster_path == null) {
                        if (movie.backdrop_path !== null) {

                            document.querySelector('#comingMoviesContainer').innerHTML += `<div class="movie-view large-card" id-movie=${movie.id} title-movie=${movie.title}>
                        <div class="poster-pics">
                            <div class="control-view">
                                <a href="/movie.html?${movie.id}" class="btn more-detail-movie">
                                    Voir
                                </a>
                        <span class="title">${movie.title}</span>
                            </div>
                            <img src="https://image.tmdb.org/t/p/original/${movie.backdrop_path}" alt="">
                        </div>
            
                    </div>`
                        }
                    } else {

                        document.querySelector('#comingMoviesContainer').innerHTML += `<div class="movie-view large-card" id-movie=${movie.id} title-movie=${movie.title}>
                        <div class="poster-pics">
                            <div class="control-view">
                                <a href="/movie.html?${movie.id}" class="btn more-detail-movie">
                                    Voir
                                </a>
                        <span class="title">${movie.title}</span>
                            </div>
                            <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}" alt="">
                        </div>
            
                    </div>`
                    }

                } else {
                    document.querySelector('#comingMoviesContainer').innerHTML += `<div class="movie-view large-card" id-movie=${movie.id} title-movie=${movie.original_name}>
                        <div class="poster-pics">
                            <div class="control-view">
                                <a href="/movie.html?${movie.id}" class="btn more-detail-movie">
                                    Voir
                                </a>
                        <span class="title">${movie.original_name}</span>
                            </div>
                            <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}" alt="">
                        </div>
            
                    </div>`
                }
                if (index === MoviesComing.results.length - 1) {

                    loadingData(true)
                }


            })

        } else {
            console.log('no movies')

        }
    }


}


window.addEventListener('load', () => {
    console.log('Hello!!!')
    getTrendingMovies(APIKEY)
    getPopularMovies(APIKEY)
    getGenreMovies(APIKEY)
    getRecentMovies(APIKEY)
    getDrameMovies(APIKEY)
    getComingMovies(APIKEY)

})
