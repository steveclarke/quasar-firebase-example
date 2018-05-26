import Firebase from 'firebase'
import Firestore from 'firebase/firestore' // eslint-disable-line
import firebaseConfig from '../../firebase.conf'

export default ({ Vue }) => {
  // Initialize Firebase from settings
  Firebase.initializeApp(firebaseConfig)

  // Configure Firestore
  Firebase.firestore().settings({ timestampsInSnapshots: true })

  Vue.prototype.$firebase = Firebase
}
