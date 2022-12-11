const initialState = {
     loadings: {},
     errors: {}
}

export const LOADING = 'LOADING';
export const ERROR = 'ERROR';
export const STOP = 'STOP';

const globalReducer = (state = initialState, { type, payload }) => {
     switch (type) {

          case LOADING:
               return {
                    ...state,
                    loadings: payload,
                    errors: null
               }
          case ERROR:
               return {
                    ...state,
                    errors: payload,
                    loadings: null
               }
          case STOP:
               return {
                    ...state,
                    errors: null,
                    loadings: null
               }

          default:
               return state
     }
}

export { globalReducer };