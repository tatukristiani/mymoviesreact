
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
    updateUser: `/users`
}

export default requests;