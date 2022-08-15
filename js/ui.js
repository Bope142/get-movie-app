const scrollContainer = () => {
    document.querySelectorAll('.scrollContent').
    forEach(container => {
        container.addEventListener('scroll', (e) => {
            console.log(e)
        })
    })

}

const loadingData = (isLoad) => {
    if (isLoad) {
        document.querySelector('.container-loader-data').classList.remove('loader-hide')
    }
    document.querySelector('.container-loader-data').classList.add('loader-hide')
}
const scrollEventContainerMovies = () => {
    let btnScrollLeft = document.querySelectorAll('.left-scroll')
    let btnScrollRight = document.querySelectorAll('.right-scroll')
    btnScrollLeft.forEach(btn => {
        btn.addEventListener('click', (e) => {
            for (var i = 0; i < e.path.length; i++) {
                let lastPosScroll = -100
                if (e.path[i].classList.contains('subContainer')) {

                    if (lastPosScroll !== e.path[i].children[1].scrollLeft) {
                        e.path[i].children[1].scrollLeft -= 100
                        lastPosScroll = e.path[i].children[1].scrollLeft
                        //console.log(e.path[i].children[1].scrollLeft)
                    }
                    break
                }
            }
        })
    })
    btnScrollRight.forEach(btn => {
        btn.addEventListener('click', (e) => {

            for (var i = 0; i < e.path.length; i++) {
                let lastPosScroll = -100
                if (e.path[i].classList.contains('subContainer')) {

                    if (lastPosScroll !== e.path[i].children[1].scrollLeft) {
                        e.path[i].children[1].scrollLeft += 100
                        lastPosScroll = e.path[i].children[1].scrollLeft
                        //console.log(e.path[i].children[1].scrollLeft)
                    }
                    break
                }
            }

        })
    })
}
const CreatUiMovieCard = (idMovies, titleMovie, dateRelease, posterPic, Rating) => {
    if (Rating === 'none') {
        return `<div class="movie-view person-movie" id-movie=${idMovies} title-movie=${titleMovie} date-movie=${dateRelease} pic-movie=${posterPic}>
                        <div class="poster-pics">
                            <div class="control-view">
                                <a href="/movie.html?${idMovies}" class="btn more-detail-movie">
                                    Voir
                                </a>
                            </div>
                            <img src="https://image.tmdb.org/t/p/original/${posterPic}" alt="">
                        </div>
                        <div class="details-movie">
                            <span class="title">${titleMovie}</span>
                            <span class="other-infos">${dateRelease}</span>
                        </div>
                    </div>`
    } else {
        return `<div class="movie-view" id-movie=${idMovies} title-movie=${titleMovie} date-movie=${dateRelease} pic-movie=${posterPic} rate-movie=${Rating}>
                        <div class="poster-pics">
                            <div class="control-view">
                                <a href="/movie.html?${idMovies}" class="btn more-detail-movie">
                                    Voir
                                </a>
                            </div>
                            <span class="rating">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                    <path d="M8 1L5.972656 5.804688L1 6.347656L4.71875 9.859375L3.671875 15L8 12.363281L12.328125 15L11.28125 9.859375L15 6.347656L10.027344 5.804688Z" fill="#FFFFFF" />
                                </svg>
                                <p class="value-rating">${Rating}</p>
                            </span>
                            <img src="https://image.tmdb.org/t/p/original/${posterPic}" alt="">
                        </div>
                        <div class="details-movie">
                            <span class="title">${titleMovie}</span>
                            <span class="other-infos">${dateRelease}</span>
                        </div>
                    </div>`
    }

}

const removeSelect = () => {
    document.querySelectorAll('.tendencie-type').forEach(menu => menu.classList.remove('type-data-select'))
}
const TrendingMoviesControl = () => {
    document.querySelectorAll('.tendencie-type').forEach((menu, index) => {
        menu.addEventListener('click', () => {
            removeSelect()
            menu.classList.add('type-data-select')
            if (index === 0) {
                getTrendingMovies(APIKEY, 'all')
            } else if (index === 1) {
                getTrendingMovies(APIKEY, 'movie')
            } else if (index === 2) {
                getTrendingMovies(APIKEY, 'tv')
            } else {
                getTrendingMovies(APIKEY, 'person')
            }
        })
    })


}
const mobileMenu = () => {
    document.querySelector('.menu-mobile').addEventListener('click', () => {
        document.querySelector('.menu-mobile').classList.toggle('menu-mobile-active')
        document.querySelector('.mobile__menu').classList.toggle('mobile__menu-active')
    })
}
window.addEventListener('load', () => {
    scrollEventContainerMovies()
    TrendingMoviesControl()
    mobileMenu()
    const scroll = document.querySelector('#scroll-top');
    window.addEventListener('scroll', (e) => {
        if (this.scrollY > 800) {
            scroll.style.visibility = 'visible';
        } else {
            scroll.style.visibility = 'hidden';
        }
    });
})
