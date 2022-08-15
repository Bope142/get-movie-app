const APIKEY = `ed5a8dcdb53ec10d28e134c47f32e0d2`
let pageTotal = 0;
let currentPage = 0;
async function requestApi(urlRequest) {
    try {
        let res = await fetch(urlRequest);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function getpopularMovie(keyApi, page) {
    let url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${keyApi}&language=fr&page=${page}`;
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
            currentPage = page

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
const detailsPage = (urlSearch) => {
    if (urlSearch === 'popularMovie') {
        getpopularMovie(APIKEY, currentPage);

    }
}


window.addEventListener('scroll', (e) => {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        document.querySelector('.loader-data-scrolling').classList.replace('loader-data-scrolling-hide', 'loader-data-scrolling-visible')
        if (currentPage < pageTotal) {
            currentPage++
            detailsPage('popularMovie')

        }
    }
})


window.addEventListener('load', (e) => {
    let ParamMovie = e.currentTarget.location.search
    console.log(ParamMovie.substr(1))
    document.querySelector('.movies--containers').innerHTML = ''
    currentPage = 1

    detailsPage(ParamMovie.substr(1))
})
