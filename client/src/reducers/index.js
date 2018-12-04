const initialState = {
  auth: {},
  codePreviews: []
}

export default function codeScannerApp (state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }
  return state
}
