import { firebaseDb } from '../../firebase'
import { short_description } from '../utilities/html'

export const GetArticlesAction = dispatch => {
  firebaseDb.ref('articles').once('value')
    .then(snapshot => {
      let map_articles = [];
      const a = snapshot.val();

      if (a) {
        for (let key in a) {
          let article = a[key];
          article.id = key;
          // Remove html tags to display short content as description
          article.description = short_description(article.content);

          map_articles.push(article);
        }
        // Sorting articles by createdAt descending
        map_articles.sort((a1, a2) => {
          return new Date(a2.createdAt) - new Date(a1.createdAt);
        });
      }

      // Send data to reducer's dispatch
      dispatch({
        type: 'GET_ARTICLES',
        payload: map_articles,
        error: null
      });
    })
    .catch(error => {
      // Send error to reducer's dispatch
      dispatch({
        error: error
      });
    })
}

export const CreateArticle = (dispatch, data) => {
  // update tags and set createdAt
  data['tags'] = data.tags.split(', ');
  data['createdAt'] = (new Date()).toString();
  firebaseDb.ref('articles').push(data)
    .then(snap => {
      data['id'] = snap.key;
      data['description'] = short_description(data['content']);
      dispatch({
        type: 'CREATE_ARTICLE',
        payload: data,
        error: null
      })
    })
    .catch(error => {
      dispatch({
        error: error
      })
    })
}

export const UpdateArticle = (dispatch, data) => {
  // update tags
  data['tags'] = data.tags.split(', ');
  firebaseDb.ref(`articles/${data.id}`).set(data, error => {
    if (error) {
      dispatch({
        error: error
      })
    } else {
      dispatch({
        type: 'UPDATE_ARTICLE',
        payload: {
          ...data,
          description: short_description(data.content)
        },
        error: null
      })
    }
  });
}

export const DeleteArticle = (dispatch, data) => {
  firebaseDb.ref(`articles/${data.id}`).remove()
    .then(() => {
      dispatch({
        type: 'DELETE_ARTICLE',
        payload: data,
        error: null
      })
    })
    .catch(error => {
      dispatch({
        error: error
      })
    })
}
