const initialState = {
  auth: {},
  codePreviews: [],
  forms: {
    codeUpload: {
      loading: false,
      errors: {},
      formData: {}
    },
    login: {
      loading: false,
      errors: {},
      formData: {}
    },
    register: {
      loading: false,
      errors: {},
      formData: {}
    },
    logout: {
      loading: false,
    }
  }
}

export default function codeScannerApp (state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        forms: {
          ...state.forms,
          login: {
            loading: true,
            errors: {},
            formData: action.payload
          }
        }
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        forms: {
          ...state.forms,
          login: {
            loading: false,
            errors: {},
            formData: action.payload
          }
        }
      }
    default:
      return state
  }
}
