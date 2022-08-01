const APIKEY = `ed5a8dcdb53ec10d28e134c47f32e0d2`

const UIcardMovie = (img, bg, title, genre, overview, release_date, vote_average, popularity, revenue, language) => {
    document.querySelector('.banner__movies').style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${bg})`
    document.querySelector('.profil').setAttribute('src', `https://image.tmdb.org/t/p/original/${img}`)
    document.querySelector('.title-movie').innerHTML = title
    document.querySelector('.categorie-film').innerHTML = ''
    genre.forEach(titleGenre => {
        document.querySelector('.categorie-film').innerHTML += `   <div class="catgorie">${titleGenre.name}
                    </div>`
    })
    document.querySelector('.overview').innerHTML = overview
    document.querySelector('.other-infos').innerHTM = ''
    document.querySelector('.release_date').innerHTML = release_date
    document.querySelector('.vote_average').innerHTML = vote_average
    document.querySelector('.popularity').innerHTML = popularity
    document.querySelector('.revenue').innerHTML = revenue + ' $'

    language.forEach(lang => {
        document.querySelector('.other-infos').innerHTML += `
<li><span class="title-infos">Langue :</span> <span class="value language">${lang.name}</span></li>`
    })

}


async function requestApi(urlRequest) {
    try {
        let res = await fetch(urlRequest);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}


async function getMovieSearch(keyApi, idMovie) {
    let url = `https://api.themoviedb.org/3/movie/${idMovie}?api_key=${keyApi}&language=fr`;
    let Movie = await requestApi(url);
    console.log(Movie)
    if ('success' in Movie) {
        console.log('no data')

    } else {
        if (typeof Movie.title != "undefined") {
            if (Movie.poster_path == null) {
                if (Movie.backdrop_path !== null) {
                    UIcardMovie(Movie.backdrop_path, Movie.backdrop_path, Movie.title, Movie.genres, Movie.overview, Movie.release_date, Movie.vote_average, Movie.popularity, Movie.revenue, Movie.spoken_languages)
                }
            } else {
                if (Movie.backdrop_path !== null) {
                    UIcardMovie(Movie.poster_path, Movie.backdrop_path, Movie.title, Movie.genres, Movie.overview, Movie.release_date, Movie.vote_average, Movie.popularity, Movie.revenue, Movie.spoken_languages)
                } else {
                    UIcardMovie(Movie.poster_path, Movie.poster_path, Movie.title, Movie.genres, Movie.overview, Movie.release_date, Movie.vote_average, Movie.popularity, Movie.revenue, Movie.spoken_languages)
                }
            }

        } else {
            UIcardMovie(Movie.poster_path, Movie.backdrop_path, Movie.original_name, Movie.genres, Movie.overview, Movie.release_date, Movie.vote_average, Movie.popularity, Movie.revenue, Movie.spoken_languages)
        }

    }

    //    console.log(Movie)
}
async function getsimilarMovie(keyApi, idMovie) {
    let url = `https://api.themoviedb.org/3/movie/${idMovie}/similar?api_key=${keyApi}&language=fr`;
    let MovieSimilar = await requestApi(url);
    console.log(MovieSimilar)
    if ('success' in MovieSimilar) {
        console.log('no data')
        document.querySelector('.logo').classList.add('logo-hide')
        document.querySelector('.no-data').classList.add('no-data-visible')

    } else {
        if (MovieSimilar.results.length > 1) {
            document.querySelector('#similaireMoviesContainer').innerHTML = ''
            MovieSimilar.results.forEach((movie, index) => {
                if (typeof movie.title != "undefined") {
                    if (movie.poster_path == null) {
                        if (movie.backdrop_path !== null) {
                            document.querySelector('#similaireMoviesContainer').innerHTML += CreatUiMovieCard(movie.id, movie.title, movie.release_date, movie.backdrop_path, movie.vote_average)
                        }
                    } else {
                        document.querySelector('#similaireMoviesContainer').innerHTML += CreatUiMovieCard(movie.id, movie.title, movie.release_date, movie.poster_path, movie.vote_average)
                    }

                } else {
                    document.querySelector('#similaireMoviesContainer').innerHTML += CreatUiMovieCard(movie.id, movie.original_name, movie.first_air_date, movie.poster_path, movie.vote_average)
                }
                if (index === MovieSimilar.results.length - 1) {
                    loadingData(true)
                }

            })
            if (MovieSimilar.total_pages > 1) {
                document.querySelector('.container__similaire__movies .title-section .btn-see-all').classList.remove('btn-see-hide')
            } else {
                document.querySelector('.container__similaire__movies .title-section .btn-see-all').classList.add('btn-see-hide')
            }

        } else {
            console.log('no movies')
        }
    }

}




window.addEventListener('load', (e) => {
    let ParamMovie = e.currentTarget.location.search
    getMovieSearch(APIKEY, ParamMovie.substr(1))
    getsimilarMovie(APIKEY, ParamMovie.substr(1))
})
