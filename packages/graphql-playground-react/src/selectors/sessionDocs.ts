import { defaultSessionState } from '../reducers/docs'

export const getSessionDocs = ({ docs }, { sessionId }) => {
  return docs.get(sessionId) || defaultSessionState
  // return
  // if (sessionDocs) {
  //   return {
  //     navStack: sessionDocs.navStack,
  //     docsOpen: sessionDocs.docsOpen,
  //     docsWidth: sessionDocs.docsWidth,
  //     keyMove: sessionDocs.keyMove,
  //   }
  // } else {
  //   return defaultSessionState
  // }
}
