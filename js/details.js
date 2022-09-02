const APIKEY = `ed5a8dcdb53ec10d28e134c47f32e0d2`
let pageTotal = 0;
let currentPage = 0;
let loadDetail;
let genreMovie = {
    id: 0,
    name: ''
}
async function requestApi(urlRequest) {
    try {
        let res = await fetch(urlRequest);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

const titlePage = (title, details) => {
    document.querySelector('.banner__content h2').innerHTML = title
    document.querySelector('.banner__content p').innerHTML = details
}
async function getpopularMovie(keyApi, page) {
    let url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${keyApi}&language=fr&page=${page}`;
    console.log('la page num' + page)
    let MoviePopular = await requestApi(url);
    if ('success' in MoviePopular) {
        console.log('no data')
        document.querySelector('.logo').classList.add('logo-hide')
        document.querySelector('.no-data').classList.add('no-data-visible')

    } else {
        if (MoviePopular.results.length > 1) {
            if (pageTotal === 0) {
                pageTotal = MoviePopular.total_pages
            }
            if (currentPage === 1) {
                titlePage('Films populaire', `Découvrez la liste complète de nos films  populaire`)
            }
            document.querySelector('.loader-data-scrolling').classList.replace('loader-data-scrolling-visible', 'loader-data-scrolling-hide')
            MoviePopular.results.forEach((movie, index) => {
                if (typeof movie.title != "undefined") {
                    if (movie.poster_path == null) {
                        if (movie.backdrop_path !== null) {
                            document.querySelector('.movies--containers').innerHTML += CreatUiMovieCard(movie.id, movie.title, movie.release_date, movie.backdrop_path, movie.vote_average)
                        }
                    } else {
                        document.querySelector('.movies--containers').innerHTML += CreatUiMovieCard(movie.id, movie.title, movie.release_date, movie.poster_path, movie.vote_average)
                    }

                } else {
                    document.querySelector('.movies--containers').innerHTML += CreatUiMovieCard(movie.id, movie.original_name, movie.first_air_date, movie.poster_path, movie.vote_average)
                }
                if (index === MoviePopular.results.length - 1) {

                    loadingData(true)
                }

            })


        } else {
            console.log('no movies')
        }
    }

}

async function getRecentMovies(keyApi, page) {
    const date = new Date();
    let year = date.getFullYear();
    let url = `https://api.themoviedb.org/3/discover/movie?primary_release_year=${year}&sort_by=vote_average.desc&api_key=${keyApi}&language=fr&page=${page}`;
    let MoviesRecents = await requestApi(url);
    if ('success' in MoviesRecents) {
        console.log('no data')
        document.querySelector('.logo').classList.add('logo-hide')
        document.querySelector('.no-data').classList.add('no-data-visible')

    } else {

        if (MoviesRecents.results.length > 1) {
            if (pageTotal === 0) {
                pageTotal = MoviesRecents.total_pages
            }
            if (currentPage === 1) {
                titlePage('Films recents', `Découvrez la liste complète de nos  films  recents`)
            }
            document.querySelector('.movies--containers').innerHTML = ''
            MoviesRecents.results.forEach((movie, index) => {
                if (typeof movie.title != "undefined") {
                    if (movie.poster_path == null) {
                        if (movie.backdrop_path !== null) {
                            document.querySelector('.movies--containers').innerHTML += CreatUiMovieCard(movie.id, movie.title, movie.release_date, movie.backdrop_path, movie.vote_average)
                        }

                    } else {
                        document.querySelector('.movies--containers').innerHTML += CreatUiMovieCard(movie.id, movie.title, movie.release_date, movie.poster_path, movie.vote_average)
                    }

                } else {
                    document.querySelector('.movies--containers').innerHTML += CreatUiMovieCard(movie.id, movie.original_name, movie.first_air_date, movie.poster_path, movie.vote_average)
                }
                if (index === MoviesRecents.results.length - 1) {

                    loadingData(true)
                }


            })

        } else {
            console.log('no movies')
        }
    }


}

async function getDrameMovies(keyApi, page) {
    let url = `https://api.themoviedb.org/3/discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10&api_key=${keyApi}&language=fr&page=${page}`;
    let MoviesDrame = await requestApi(url);
    if ('success' in MoviesDrame) {
        console.log('no data')
        document.querySelector('.logo').classList.add('logo-hide')
        document.querySelector('.no-data').classList.add('no-data-visible')

    } else {

        if (MoviesDrame.results.length > 1) {
            if (pageTotal === 0) {
                pageTotal = MoviesDrame.total_pages
            }
            if (currentPage === 1) {
                titlePage('Films drame', `Découvrez nos films  de la catégorie drame`)
            }
            document.querySelector('.movies--containers').innerHTML = ''
            MoviesDrame.results.forEach((movie, index) => {
                if (typeof movie.title != "undefined") {
                    if (movie.poster_path == null) {
                        if (movie.backdrop_path !== null) {
                            document.querySelector('.movies--containers').innerHTML += CreatUiMovieCard(movie.id, movie.title, movie.release_date, movie.backdrop_path, movie.vote_average)
                        }
                    } else {
                        document.querySelector('.movies--containers').innerHTML += CreatUiMovieCard(movie.id, movie.title, movie.release_date, movie.poster_path, movie.vote_average)
                    }

                } else {
                    document.querySelector('.movies--containers').innerHTML += CreatUiMovieCard(movie.id, movie.original_name, movie.first_air_date, movie.poster_path, movie.vote_average)
                }
                if (index === MoviesDrame.results.length - 1) {

                    loadingData(true)
                }

            })
        } else {
            console.log('no movies')
        }

    }

}

async function getComingMovies(keyApi, page) {
    let url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${keyApi}&language=fr&page=${page}`;
    let MoviesComing = await requestApi(url);
    if ('success' in MoviesComing) {
        console.log('no data')
        document.querySelector('.logo').classList.add('logo-hide')
        document.querySelector('.no-data').classList.add('no-data-visible')

    } else {
        if (MoviesComing.results.length > 1) {
            if (pageTotal === 0) {
                pageTotal = MoviesComing.total_pages
            }
            if (currentPage === 1) {
                titlePage('Films en vedette', `Découvrez la liste complète de nos films  en vedette`)
            }
            document.querySelector('.movies--containers').innerHTML = ''
            MoviesComing.results.forEach((movie, index) => {
                if (typeof movie.title != "undefined") {
                    if (movie.poster_path == null) {
                        if (movie.backdrop_path !== null) {
                            document.querySelector('.movies--containers').innerHTML += CreatUiMovieCard(movie.id, movie.title, movie.release_date, movie.backdrop_path, movie.vote_average)
                        }
                    } else {
                        document.querySelector('.movies--containers').innerHTML += CreatUiMovieCard(movie.id, movie.title, movie.release_date, movie.poster_path, movie.vote_average)
                    }

                } else {
                    document.querySelector('.movies--containers').innerHTML += CreatUiMovieCard(movie.id, movie.original_name, movie.first_air_date, movie.poster_path, movie.vote_average)
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

async function getGenreMovies(keyApi, page) {
    let url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreMovie.id}&sort_by=vote_average.desc&vote_count.gte=10&api_key=${keyApi}&language=fr&page=${page}`;
    let MoviesGenre = await requestApi(url);
    if ('success' in MoviesGenre) {
        console.log('no data')
        document.querySelector('.logo').classList.add('logo-hide')
        document.querySelector('.no-data').classList.add('no-data-visible')

    } else {

        if (MoviesGenre.results.length > 1) {
            if (pageTotal === 0) {
                pageTotal = MoviesGenre.total_pages
            }

            document.querySelector('.movies--containers').innerHTML = ''
            MoviesGenre.results.forEach((movie, index) => {
                if (typeof movie.title != "undefined") {
                    if (movie.poster_path == null) {
                        if (movie.backdrop_path !== null) {
                            document.querySelector('.movies--containers').innerHTML += CreatUiMovieCard(movie.id, movie.title, movie.release_date, movie.backdrop_path, movie.vote_average)
                        }
                    } else {
                        document.querySelector('.movies--containers').innerHTML += CreatUiMovieCard(movie.id, movie.title, movie.release_date, movie.poster_path, movie.vote_average)
                    }

                } else {
                    document.querySelector('.movies--containers').innerHTML += CreatUiMovieCard(movie.id, movie.original_name, movie.first_air_date, movie.poster_path, movie.vote_average)
                }
                if (index === MoviesGenre.results.length - 1) {

                    loadingData(true)
                }

            })
        } else {
            console.log('no movies')
        }

    }

}

const detailsPage = (urlSearch) => {
    if (urlSearch === 'popularMovie') {
        getpopularMovie(APIKEY, currentPage);

    } else if (urlSearch === 'recentMovie') {
        getRecentMovies(APIKEY, currentPage);

    } else if (urlSearch === 'drameMovie') {
        getDrameMovies(APIKEY, currentPage);

    } else if (urlSearch === 'comingMovie') {
        getComingMovies(APIKEY, currentPage);

    } else if (urlSearch === 'genreMovie') {
        getGenreMovies(APIKEY, currentPage);

    }
}

const loadMoreData = () => {
    document.querySelector('.btn-load-data').addEventListener('click', () => {
        if (currentPage < pageTotal) {
            currentPage = currentPage + 1
            console.log('hh' + currentPage)
            detailsPage(loadDetail)

        }
    })
}
window.addEventListener('scroll', (e) => {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        if (currentPage < pageTotal) {
            document.querySelector('.loader-data-scrolling').classList.replace('loader-data-scrolling-hide', 'loader-data-scrolling-visible')

        }

    }
})


window.addEventListener('load', (e) => {
    let queryString = e.currentTarget.location.search
    console.log(queryString)
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has('genre')) {
        genreMovie.id = parseInt(urlParams.get('id'))
        genreMovie.name = urlParams.get('genre')
        titlePage(`Films ${genreMovie.name}`, `Découvrez la liste complète de nos  films  ${genreMovie.name}`)
        currentPage = 1
        loadDetail = 'genreMovie'
        detailsPage(loadDetail)
        loadMoreData(loadDetail)
    } else {
        let ParamMovie = e.currentTarget.location.search
        document.querySelector('.movies--containers').innerHTML = ''
        currentPage = 1
        loadDetail = ParamMovie.substr(1)
        detailsPage(loadDetail)
        loadMoreData(loadDetail)
    }

})
