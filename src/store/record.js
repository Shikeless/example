import firebase from "firebase/app";

export default {
  actions: {
    async createRecord({ dispatch, commit }, record) {
      try {
        console.log(record);
        const uid = await dispatch("getUid");
        return await firebase
          .database()
          .ref(`/users/${uid}/records`)
          .push(record);
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },
    async fetchRecords({ dispatch, commit }) {
      try {
        const uid = await dispatch("getUid");
        const records =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/records`)
              .once("value")
          ).val() || {};
        return Object.keys(records).map((key) => ({
          ...records[key],
          id: key,
        }));
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },
  },
};
