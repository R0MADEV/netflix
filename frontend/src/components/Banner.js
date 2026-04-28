import axios from 'axios'
import styles from '../../styles/banner.module.css'
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/auth'
import { FaPlay, FaInfoCircle } from 'react-icons/fa'
import ModalDetails from '@/components/ModalDetails'
import { useRouter } from 'next/router'
import { Api } from '@/hooks/api'

const Banner = () => {
  const router = useRouter()
  const { getCookie } = useAuth()
  const { apiGetShowRandomFilm, apiGetGenres, apiGetImage, apiPostAddFilmList } = Api()

  if (typeof window !== 'undefined') {
    var accountId = getCookie('accountId')
    var token = getCookie('token')
  }
  const [movieramdon, setMovieRamdon] = useState()
  const [genres, setGenres] = useState()
  //content data movie
  const [dataStatus, setDataStatus] = useState(false)
  const [movieOptions, setMovieOptions] = useState()
  const [movieOptionsStatus, setMovieOptionsStatus] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const deleteListMovieId = async () => {
    const account_id = accountId
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/filmId/${movieramdon.id}/accountId/${account_id}/delete`,
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then(function (response) {
        console.log(response.data.message)
        setMovieOptionsStatus(!false)
        router.reload()
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const addListMovie = () => {
    let formData = new FormData()
    formData.append('film_id', movieramdon.id)
    formData.append('account_id', accountId)

    //get API
    apiPostAddFilmList(formData)
      .then(function (response) {
        setMovieOptionsStatus(!true)
        //update checked movie my list
        checkAddedMovie(film_id)
        // router.push("/")
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const onMouseEnter = () => setShowModal(true)
  const onMouseLeave = () => {
    setTimeout(function () {
      setShowModal(false)
    }, 400)
  }

  useEffect(() => {
    getMovie()
    getGenres()
  }, [])

  async function getMovie () {
    apiGetShowRandomFilm()
      .then(res => {
        const data = res.data
        setMovieRamdon(data)
      })
      .catch(error => {
        console.log(error, 'entro') // "oh, no!"
      })
  }

  async function getGenres () {
    apiGetGenres()
      .then(res => {
        const data = res.data.data
        setGenres(data)
      })
      .catch(error => {
        console.log(error, 'entro') // "oh, no!"
      })
  }

  const handleModal = movieId => {
    setTimeout(function () {
      setShowModal(!false)
    }, 400)
  }

  function truncate (string, n) {
    return string?.length > n ? string.substr(0, n - 1) + '...' : string
  }

  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        {movieramdon !== undefined && (
          <img
            className={styles.banner_image}
            // src={'http://localhost:8000/images/' + movieramdon.backdrop_path}
            src={apiGetImage(movieramdon.backdrop_path)}
            alt={movieramdon.title}
          />
        )}
        <div className={styles.pqdka}></div>
      </div>
      {movieramdon !== undefined && (
        <div className={styles.content_baner} key={movieramdon.id}>
          <h3 className={styles.banner_h3}>{movieramdon.title}</h3>
          <p className={styles.banner_p}>
            {truncate(movieramdon.description, 150)}
          </p>
          <div className={styles.contentButtons}>
            <button className={styles.bannerButtonPlay}>
              <FaPlay className={styles.buttonPlay} /> Play
            </button>
            <button
              type='button'
              data-modal-toggle='defaultModal'
              onMouseEnter={() => {
                onMouseEnter
                handleModal(movieramdon.id)
              }}
              className={`${styles.bannerButtonInfo}`}>
              <FaInfoCircle className={styles.buttonPlay} />
              Más información
            </button>
          </div>
        </div>
      )}
      {showModal !== false && (
        <ModalDetails
          movie={movieramdon}
          setShowModal={setShowModal}
          //fucntion click add and delete movie
          addListMovie={addListMovie}
          deleteListMovieId={deleteListMovieId}
          //status icons add and remove movie
          movieOptionsStatus={movieOptionsStatus}
          //capture message getCheckadd movie status
          movieOptions={movieOptions}
          onMouse={onMouseLeave}
        />
      )}
    </div>
  )
}

export default Banner
