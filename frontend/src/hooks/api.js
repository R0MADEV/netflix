import axios from '@/lib/axios'

export const Api = () => {
  //PROVIDER OPTIONS//
  //get Films
  const apiGetFilms = async () => {
    const data = await axios.get('/api/films')
    return data
  }
  //get film id
  const apiGetFilmId = async id => {
    const data = await axios.get(`/api/film/${id}`)
    return data
  }
  //get genres
  const apiGetGenres = async () => {
    const data = await axios.get('/api/genres')
    return data
  }
  //post create Film
  const apiPostFilm = async formData => {
    const data = await axios.post(`/api/film`, formData)
    return data
  }
  //post edit Film
  const apiEditFilm = async (id, formData) => {
    const data = await axios.post(`/api/film/${id}/edit`, formData)
    return data
  }
  //post delete Film
  const apiDeleteFilm = async id => {
    const data = await axios.post(`/api/film/${id}/delete`)
    return data
  }
  //post delete all Films
  const apiDeleteFilmsAll = async ids => {
    const data = await axios.post(`/api/film/${ids}/deleteall`)
    return data
  }
  //Get countrie movies
  const apiGetCountrieMovie = async country => {
    const data = await axios.get(`/country/${country}`)
    return data
  }
  //Get countrie movies
  const apiGetMovieProvider = async provider_id => {
    const data = await axios.get(`/api/filmsprovider/${provider_id}`)
    return data
  }

  //CATEGORIES
  //get categories
  const apiGetCategories = async () => {
    const data = await axios.get('/api/categories')
    return data
  }
  //get categorie id
  const apiGetCategorieId = async id => {
    const data = await axios.get(`/api/categorie/${id}`)
    return data
  }
  //post create catetgorie
  const apiPostCategorie = async formData => {
    const data = await axios.post(`/api/categorie`, formData)
    return data
  }
  //post edit categorie
  const apiEditCategorie = async (id, formData) => {
    const data = await axios.post(`/api/categorie/${id}/edit`, formData)
    return data
  }
  //post delete Categorie
  const apiDeleteCategorie = async id => {
    const data = await axios.post(`/api/categories/${id}/delete`)
    return data
  }

  //FILMS BY CATEGORY AND GENRE FOR ACCOUNTS
  //get Films by category and genre
  const apiGetFilmsByCategorieAndGenre = async (categorie_id, genre_id) => {
    const data = await axios.get(`/api/filmscategory/${categorie_id}/filmsgenre/${genre_id}`)
    return data
  }
  //Films whit genre id
  const apiGetFilmsByGenre = async genre_id => {
    const data = await axios.get(`/api/filmsgenre/${genre_id}`)
    return data
  }

  //ACCOUNTS BY USERS
  //get All accounts
  const apiGetAccounts = async () => {
    const data = await axios.get(`/api/accounts`)
    return data
  }
  //post Create account by user
  const apiPostCreateAccount = async (formData) => {
    const data = await axios.post(`/api/account`, formData)
    return data
  }
  //get Accounts by user
  const apiGetAccountsByUser = async (user_id) => {
    const data = await axios.get(`/api/accounts/user/${user_id}`)
    return data
  }
  //get Account id
  const apiGetAccountId = async (id) =>{
     const data = await axios.get(`/api/account/${id}`)
    return data
  }
  //get show random Film
  const apiGetShowRandomFilm = async () =>{
    const data = await axios.get(`/api/movieramdon`)
    return data
  }

  //FILMS LIST ACCOUNT
  //get explore list
  const apiGetListExplore = async () => {
    const data = await axios.get(`/api/lists/explore`)
    return data
  }
  //get list
  const apiGetList = async () => {
    const data = await axios.get(`/api/list`)
    return data
  }
  //get list account
  const apiGetListAccount = async (id) => {
    const data = await axios.get(`/api/account/${id}/list`)
    return data
  }
  //post add movie to my list
  const apiPostAddFilmList = async (formData) => {
    const data = await axios.post(`/api/list`, formData)
    return data
  }
  //get search movies by country
  const apiGetSearchFilmCountry = async (country) => {
    const data = await axios.get(`/api/lists/explore/country/${country}`)
    return data
  }
  //get search movies by account id
  const apiGetSearchFilmsByAccount = async (film_id, account_id) =>{
    const data = await axios.get(`/api/filmId/${film_id}/accountId/${account_id}`)
    return data
  }
  //post remove movie from my list
  const apiPostDeleteFilmList = async (film_id, account_id) => {
    const data = await axios.post(`/api/filmId/${film_id}/accountId/${account_id}/delete`)
    return data
  }

  const apiGetImage = (img) => {
    if (!img) return ''
    if (img.startsWith('http')) return img
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${img}`
  }

  const apiGetImageProfile = (img) => {
    if (!img) return ''
    if (img.startsWith('http')) return img
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}/profiles/${img}`
  }


  return {
    //options provider
    apiGetFilms,
    apiGetGenres,
    apiGetFilmId,
    apiPostFilm,
    apiEditFilm,
    apiDeleteFilm,
    apiDeleteFilmsAll,
    apiGetCountrieMovie,
    apiGetMovieProvider,
    //categories
    apiGetCategories,
    apiGetCategorieId,
    apiPostCategorie,
    apiEditCategorie,
    apiDeleteCategorie,
    //films by category and genre for accounts
    apiGetFilmsByCategorieAndGenre,
    apiGetFilmsByGenre,
    //accounts
    apiGetAccounts,
    apiPostCreateAccount,
    apiGetAccountsByUser,
    apiGetAccountId,
    apiGetShowRandomFilm,
    //Films list account
    apiGetListExplore,
    apiGetList,
    apiGetListAccount,
    apiPostAddFilmList,
    apiGetSearchFilmCountry,
    apiGetSearchFilmsByAccount,
    apiPostDeleteFilmList,

    //Api image
    apiGetImage,
    apiGetImageProfile,
  }
}
