import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/storage";
interface IFirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

interface IApi extends firebase.app.App {
  setCallStatus: (status: string) => void;
  getEconomistData: () => Promise<
    false | firebase.firestore.DocumentData | undefined
  >;
  acceptCallRequest: (channel_name: string) => void;
  resetChannelNameAndCallStatus: () => void;
  readonly economistId?: string | undefined;
  getEconomistId: () => string | undefined;
  getUserNameByUid: (uid: string) => Promise<any>;
}

export const config = {
  apiKey: "AIzaSyAYP7Xkm9NF-Q8YxMuUwigWfiEZW4GoJ3w",
  authDomain: "ekonome-app.firebaseapp.com",
  databaseURL: "https://ekonome-app.firebaseio.com",
  projectId: "ekonome-app",
  storageBucket: "ekonome-app.appspot.com",
  messagingSenderId: "497077480109",
  appId: "1:497077480109:web:b11e78da87be0224d17424",
  measurementId: "G-RFVWR7Y67L",
};

const createApi = (config: IFirebaseConfig) => {
  const app = firebase.initializeApp(config);
  console.log("app inicializado: ", app);

  const setCallStatus = (status: string) => {
    const economistIdOnDatabase: string = app.auth()?.currentUser?.uid || "";

    app
      .database()
      .ref(`/economists/${economistIdOnDatabase}/call_status`)
      .set(status);
  };

  const resetChannelNameAndCallStatus = () => {
    const economistIdOnDatabase: string = app.auth()?.currentUser?.uid || "";

    app
      .database()
      .ref(`/economists/${economistIdOnDatabase}/channel_name`)
      .set(null);
    app
      .database()
      .ref(`/economists/${economistIdOnDatabase}/call_status`)
      .set("available");
  };

  const acceptCallRequest = (channel_name: string) => {
    const economistIdOnDatabase: string = app.auth()?.currentUser?.uid || "";
    app
      .database()
      .ref(`/economists/${economistIdOnDatabase}/call_status`)
      .set("accepted");
    app
      .database()
      .ref(`/economists/${economistIdOnDatabase}/channel_name`)
      .set(channel_name);
  };

  const getEconomistData = async () => {
    const economistIdOnDatabase: string = app.auth()?.currentUser?.uid || "";
    const economistCollectionRef = app
      .firestore()
      .collection(`/economists/`)
      .doc(economistIdOnDatabase);
    const economistDoc = await economistCollectionRef.get();
    const economistData = economistDoc.data();
    const economistExistance = economistDoc.exists;

    if (economistExistance) {
      return economistData;
    } else {
      return false;
    }
  };

  const getUserNameByUid = async (uid: string) => {
    const user = await app.firestore().collection("users").doc(uid).get();
    const userData = user.data();
    return userData?.name;
  };

  const aditionalMethods = {
    setCallStatus,
    getEconomistData,
    acceptCallRequest,
    resetChannelNameAndCallStatus,
    getEconomistId: () => {
      return app.auth().currentUser?.uid;
    },
    getUserNameByUid,
  };
  // @ts-ignore
  const api: IApi = Object.assign({}, app.firebase_, aditionalMethods);

  return api;
};
const api = createApi(config);
export default api;
