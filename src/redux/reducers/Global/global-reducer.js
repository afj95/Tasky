const initialState = {
     loadings: {},
     errors: {}
}

export const LOADING = 'LOADING';
export const ERROR = 'ERROR';
export const STOP = 'STOP';
export const CLEAR = 'CLEAR';

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
                    loadings: null,
                    errors: payload?.failed ? payload?.error : null
               }
          case CLEAR:
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