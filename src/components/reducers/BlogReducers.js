export const BlogReducers = (state, action) => {
  console.log('BLOG REDUCER', action);
  if (action.error) {
    return {
      ...state,
      error: action.error,
      loading: false,
      submited: false,
      message: action.error.message
    }
  } else {
    switch (action.type) {
      case 'GET_ARTICLES':
        return {
          ...state,
          articles: action.payload,
          loading: false,
          submited: false,
          message: null
        }
      case 'CREATE_ARTICLE':
        return {
          ...state,
          loading: false,
          error: null,
          submited: true,
          message: 'Successfully created article.',
          articles: [action.payload, ...state.articles]
        }
      case 'UPDATE_ARTICLE':
        return {
          ...state,
          loading: false,
          error: null,
          submited: true,
          message: 'Successfully updated article.',
          articles: state.articles.map((article, idx) => {
            if (article.id === action.payload.id) {
              state.articles[idx] = action.payload;
            }
            return state.articles[idx];
          })
        }
      case 'DELETE_ARTICLE':
        return {
          ...state,
          loading: false,
          error: null,
          submited: true,
          message: 'Successfully deleted article.',
          articles: state.articles.filter(
            article => article.id !== action.payload.id
          )
        }
      default:
        return {
          ...state,
          articles: [],
          loading: false,
          submited: false,
          message: 'Unknown action.'
        }
    }
  }
}
