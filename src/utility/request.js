/**
 * Request tempaltes used with own axios requests.
 * @type {{fetchTrending: string, resetPassword: string, search: string, updatePassword: string, deleteMovie: string, updateUser: string, fetchUser: string, login: string, fetchGenre: string, fetchMyMovies: string, register: string}}
 */
const requests = {
    fetchTrending: `/movies/trending?page=`,
    fetchGenre: `/movies/genre?genre=`,
    fetchMyMovies: `/movies?user=`,
    search: `/movies/search?name=`,
    deleteMovie: `/movies`,
    resetPassword: `/reset-password`,
    updatePassword: `/update-password`,
    register: `/register`,
    fetchUser: `/users?username=`,
    updateUser: `/users`,
    login: `/login`
}

export default requests;