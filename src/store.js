import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

// const url = './data/Covid19Data_static.json';
const url = './data/Covid19Data_static_new.json';
const slideGap = 40;

export default new Vuex.Store({
  state: {
    caseDataLength: 0,
    diamondDataLength: 0,
    originData: null,
    caseData: null,
    caseDataOrder: false,
    occuranceLength: 0,
    currentSlideIndex: 0,
    viewGroup: false
  },
  getters: {
    fourtyCount(state) {
      if (!state.caseData || state.currentSlideIndex === 0 || state.currentSlideIndex === 1) return 0;
      if (state.caseData.occurance[state.currentSlideIndex].case === '-') return 0;
      /* handle increasing order */
      if (state.caseDataOrder) {
        const firstCase = +state.caseData.occurance[state.currentSlideIndex].case.split(',')[0];
        if (firstCase < slideGap * 2) return 0;
        return (firstCase - firstCase % slideGap) / slideGap - 1;
      }
      /* handle decreasing order */
      else {
        const lastCaseList = state.caseData.occurance[state.currentSlideIndex].case.split(',');
        const lastCase = state.caseDataLength - +lastCaseList[lastCaseList.length - 1];

        if (lastCase < slideGap * 2) return 0;
        return (lastCase - lastCase % slideGap) / slideGap - 1;
      }
    },
  },
  mutations: {
    getData(state) {
      axios.get(url)
      .then(res => {
        state.originData = { ...res.data };
        state.caseData = { ...res.data };

        /* cases */
        const casesDataArray = Object.values(state.caseData.cases);
        state.caseDataLength = casesDataArray.length;
        state.occuranceLength = Object.keys(state.caseData.occurance).length;
        
        for (let i = 0; i < state.caseDataLength; i++) {
          state.caseData.cases[i + 1].active = true;
        }

        /* diamond */
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
        if (!state.caseData.cases[e].active) {
          state.caseData.cases[e].active = true;
        }
      });
    },
    updateCaseDisable (state, payload) {
      if (state.caseData.cases[payload].active) state.caseData.cases[payload].active = false;
    },
    updateSlideIndex (state, payload) {
      state.currentSlideIndex = payload;
    },
    reverseData(state) {
      state.caseDataOrder = !state.caseDataOrder;
    },
    changeViewType(state) {
      state.viewGroup = !state.viewGroup;
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
    changeViewType(context) {
      context.commit('changeViewType');
    },
  }
})