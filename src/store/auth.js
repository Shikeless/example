import firebase from "firebase/app";

export default {
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      try {
        console.log(dispatch, commit);
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (error) {
        commit("setError", error);
        console.log(error);
        throw error;
      }
    },
    async register({ dispatch, commit }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = await dispatch("getUid");
        console.log(uid);
        await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .set({ bill: 10000, name: name });
      } catch (error) {
        commit("setError", error);
        console.log(error);
        throw error;
      }
    },
    getUid() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    },
    async logout({ commit }) {
      await firebase.auth().signOut();
      commit("clearInfo");
    },
  },
};
