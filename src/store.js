import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

// const url = './data/Covid19Data.json';
// const url = 'https://udn.com/newmedia/2020/covid-19-taiwan/data/Covid19Data_static.json';
const url = './data/Covid19Data_static.json';

export default new Vuex.Store({
  state: {
    updateKey: 0,
    caseDataLength: 0,
    diamondDataLength: 0,
    caseData: null,
    // caseData: {
    //   cases: {
    //     1: {
    //       index: 1,
    //       from: 'overseas',
    //       date: '1/21',
    //       dead: false,
    //       active: false,
    //     },
    //     2: {
    //       index: 2,
    //       from: 'overseas',
    //       date: '1/24',
    //       dead: false,
    //       active: false,
    //     },
    //     3: {
    //       index: 3,
    //       from: 'overseas',
    //       date: '1/24',
    //       dead: false,
    //       active: false,
    //     },
    //     4: {
    //       index: 4,
    //       from: 'overseas',
    //       date: '1/26',
    //       dead: false,
    //       active: false,
    //     },
    //     5: {
    //       index: 5,
    //       from: 'overseas',
    //       date: '1/27',
    //       dead: false,
    //       active: false,
    //     },
    //     6: {
    //       index: 6,
    //       from: 'overseas',
    //       date: '1/28',
    //       dead: false,
    //       active: false,
    //     },
    //     7: {
    //       index: 7,
    //       from: 'overseas',
    //       date: '1/28',
    //       dead: false,
    //       active: false,
    //     },
    //     8: {
    //       index: 8,
    //       from: 'local',
    //       date: '1/28',
    //       dead: false,
    //       active: false,
    //     },
    //     9: {
    //       index: 9,
    //       from: 'local',
    //       date: '1/30',
    //       dead: false,
    //       active: false,
    //     },
    //     10: {
    //       index: 10,
    //       from: 'overseas',
    //       date: '1/31',
    //       dead: false,
    //       active: false,
    //     },
    //     11: {
    //       index: 11,
    //       from: 'overseas',
    //       date: '2/4',
    //       dead: false,
    //       active: false,
    //     },
    //     12: {
    //       index: 12,
    //       from: 'overseas',
    //       date: '2/6',
    //       dead: false,
    //       active: false,
    //     },
    //     13: {
    //       index: 13,
    //       from: 'overseas',
    //       date: '2/6',
    //       dead: false,
    //       active: false,
    //     },
    //     14: {
    //       index: 14,
    //       from: 'overseas',
    //       date: '2/6',
    //       dead: false,
    //       active: false,
    //     },
    //     15: {
    //       index: 15,
    //       from: 'overseas',
    //       date: '2/6',
    //       dead: false,
    //       active: false,
    //     },
    //     16: {
    //       index: 16,
    //       from: 'overseas',
    //       date: '2/6',
    //       dead: false,
    //       active: false,
    //     },
    //     17: {
    //       index: 17,
    //       from: 'overseas',
    //       date: '2/8',
    //       dead: false,
    //       active: false,
    //     },
    //     18: {
    //       index: 18,
    //       from: 'overseas',
    //       date: '2/9',
    //       dead: false,
    //       active: false,
    //     },
    //     19: {
    //       index: 19,
    //       from: 'local',
    //       date: '2/16',
    //       dead: false,
    //       active: false,
    //     },
    //     20: {
    //       index: 20,
    //       from: 'local',
    //       date: '2/16',
    //       dead: false,
    //       active: false,
    //     },
    //     21: {
    //       index: 21,
    //       from: 'local',
    //       date: '2/17',
    //       dead: false,
    //       active: false,
    //     },
    //     22: {
    //       index: 22,
    //       from: 'local',
    //       date: '2/17',
    //       dead: false,
    //       active: false,
    //     },
    //     23: {
    //       index: 23,
    //       from: 'local',
    //       date: '2/19',
    //       dead: false,
    //       active: false,
    //     },
    //     24: {
    //       index: 24,
    //       from: 'local',
    //       date: '2/19',
    //       dead: false,
    //       active: false,
    //     },
    //   },
    //   diamond: {
    //     1: {
    //       index: 1,
    //       from: 'overseas',
    //       date: '2/6',
    //     },
    //     2: {
    //       index: 2,
    //       from: 'overseas',
    //       date: '2/14',
    //     },
    //     3: {
    //       index: 3,
    //       from: 'overseas',
    //       date: '2/16',
    //     },
    //     4: {
    //       index: 4,
    //       from: 'overseas',
    //       date: '2/18',
    //     },
    //     5: {
    //       index: 5,
    //       from: 'overseas',
    //       date: '2/19',
    //     },
    //   },
    //   occurence: {
    //     1: {
    //       index: 1,
    //       case: [1],
    //       event_1: '案例1為50多歲女台商，1月20日由武漢搭機返台，21日檢驗確診，為台灣首例境外移入確診病例。2月6日已康復出院。',
    //       event_2: '',
    //     },
    //     2: {
    //       index: 2,
    //       case: [5, 8],
    //       event_1: '案例5為中部50多歲女台商，1月20日從武漢搭機返台，25日出現發燒、肌肉痠痛症狀就醫，27日確診。',
    //       event_2: '案例8為案例5的丈夫，1月26日出現咳嗽症狀就醫，28日確診，是台灣首例本土傳染病例。',
    //     },
    //     3: {
    //       index: 3,
    //       case: [9, 10],
    //       event_1: '案例9為台灣第二起本土感染病例，中部40多歲婦人被在武漢工作的丈夫傳染，該台商回台時有咳嗽、流鼻水症狀，但因不符當時的通報條件而未進行檢驗，推測可能是漏網病例。',
    //       event_2: '案例9在1月27日出現咳嗽等症狀就醫，30日確診，研判是家庭群聚感染。丈夫在1月31日確診，為案例10。',
    //     },
    //     4: {
    //       index: 4,
    //       case: [14, 15, 17, 18],
    //       event_1: '案例14、15、17、18為北部一對50多歲夫婦和兩名20多歲兒子，一家四口1月22日自香港轉機至義大利旅遊，2月1日自香港轉機返台。夫婦與大兒子先後於1月26日至28日出現咳嗽症狀，分別於2月6日和8日確診。另一名兒子於2月9日確診，是台灣首例「無症狀高病毒」感染者。',
    //       event_2: '',
    //     },
    //     5: {
    //       index: 5,
    //       case: [16],
    //       event_1: '案例16為40多歲女性，1月21日至24日至澳門旅遊，2月1日出現發燒、寒顫、喉嚨痛、流鼻水、走路會喘等症狀，3日就醫因不符通報條件故返家，但症狀持續，5日再次就醫檢驗確診。',
    //       event_2: '',
    //     },
    //     6: {
    //       index: 6,
    //       case: [19,20,21,22,23],
    //       event_1: '案例19為中部60多歲男性白牌計程車司機，無出國旅遊史，1月27日出現咳嗽，2月3日因呼吸急促就醫，診斷為肺炎。當日收治於負壓加護病房治療，2月15日因肺炎合併敗血症死亡，為台灣首例死亡個案。案例20-23皆為案例19的親人，先後於2月16日、17日、19日確診。案例19-23屬於家族群聚感染，五人曾同桌聚餐。',
    //       event_2: '',
    //     },
    //     7: {
    //       index: 7,
    //       case: [24],
    //       event_1: '案例24為60多歲北部女性，近兩年無出國史，1月22日出現發燒、咳嗽等症狀，22日至29日四度至診所就醫，29日晚間診斷為肺炎，30日收治住院，2月10日轉入加護病房，17日檢驗結果為陰性轉收至負壓隔離病房，19日確診。',
    //       event_2: '',
    //     },
    //   },
    // },
    currentSlideIndex: 0,
  },
  getters: {
    fiftyCount(state) {
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
    // updateKey (state) {
    //   state.updateKey++;
    // },
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
  },
  actions: {
    getData (context) {
      context.commit('getData');
    },
    // updateKey (context) {
    //   context.commit('updateKey');
    // },
    updateCaseActive (context, payload) {
      context.commit('updateCaseActive', payload);
    },
    updateCaseDisable (context, payload) {
      context.commit('updateCaseDisable', payload);
    },
    updateSlideIndex (context, payload) {
      context.commit('updateSlideIndex', payload);
    },
  }
})