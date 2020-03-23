import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

const url = './data/Covid19Data_static.json';

export default new Vuex.Store({
  state: {
    updateKey: 0,
    caseDataLength: 0,
    diamondDataLength: 0,
    originData: null,
    caseData: null,
    caseDataOrder: true,
    currentSlideIndex: 0,
  },
  getters: {
    fourtyCount(state) {
      if (!state.caseData || state.currentSlideIndex === 0) return 0;
      if (state.caseData.occurance[state.currentSlideIndex].case === '-') return 0;
      const firstCase = +state.caseData.occurance[state.currentSlideIndex].case.split(',')[0];
      if (firstCase < 80) return 0;
      return (firstCase - firstCase % 40) / 40 - 1;
    },
  },
  mutations: {
    getData(state) {
      axios.get(url)
      .then(res => {
        state.originData = { ...res.data };
        state.caseData = { ...res.data };

        // cases
        const casesDataArray = Object.values(state.caseData.cases);
        state.caseDataLength = casesDataArray.length;
        
        for (let i = 0; i < state.caseDataLength; i++) {
          state.caseData.cases[i + 1].active = true;
        }

        // diamond
        const diamondDataArray = Object.values(state.caseData.diamond);
        state.diamondDataLength = diamondDataArray.length;
        
        for (let i = 0; i < state.diamondDataLength; i++) {
          state.caseData.diamond[i + 1].active = false;
        }
      })
      .catch(error => {
        console.log(error);
      });     
    },
    updateCaseActive (state, payload) {
      payload.forEach(e => {
        if (!state.caseData.cases[e].active) state.caseData.cases[e].active = true;
      });
    },
    updateCaseDisable (state, payload) {
      if (state.caseData.cases[payload].active) state.caseData.cases[payload].active = false;
    },
    updateSlideIndex (state, payload) {
      state.currentSlideIndex = payload;
    },
    reverseData(state) {
      /**
       * handle reverse cases data order
       */
      const reverseArray = Object.values(state.caseData.cases).reverse();
      state.caseData.cases = {...reverseArray};
      state.caseDataOrder = !state.caseDataOrder;
    },
  },
  actions: {
    getData (context) {
      context.commit('getData');
    },
    updateCaseActive (context, payload) {
      context.commit('updateCaseActive', payload);
    },
    updateCaseDisable (context, payload) {
      context.commit('updateCaseDisable', payload);
    },
    updateSlideIndex (context, payload) {
      context.commit('updateSlideIndex', payload);
    },
    reverseData(context) {
      context.commit('reverseData');
    },
  }
})