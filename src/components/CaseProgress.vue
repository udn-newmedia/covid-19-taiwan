<template>
  <div :class="{
      'case-progress': true,
      'case-progress--group-type': $store.state.viewGroup,
    }"
  >
    <div class="case-progress__table">
      <div class="case-progress__table__header">
        <div v-if="!$store.state.viewGroup" class="case-progress__table__header__meta">
          <h3>境內確診<span class="case-progress__table__digit">{{$store.state.caseData.confirmed}}</span>例<span class="case-progress__table__header__meta__description">(<img :src="require('~/img/hand.svg')" alt="hand"> 點選案例看說明 )</span></h3>
          <div class="table-legend-container">
            <div class="table-legend">
              <div class="table-legend__color table-legend__color--overseas"></div>
              <div class="table-legend__text">境外移入{{overseasCasesAmount}}例</div>
            </div>
            <div class="table-legend">
              <div class="table-legend__color table-legend__color--local"></div>
              <div class="table-legend__text">本土案例{{localCasesAmount}}例</div>
            </div>
            <div class="table-legend">
              <div class="table-legend__color table-legend__color--dunmu"></div>
              <div class="table-legend__text">敦睦艦隊{{dunmuCasesAmount}}例</div>
            </div>
            <div class="table-legend">
              <div class="table-legend__color table-legend__color--unknown"></div>
              <div class="table-legend__text">感染源不明{{$store.state.caseData.unknow}}例</div>
            </div>
          </div>
        </div>
        <div v-else class="case-progress__table__header__meta">
          <div class="table-legend-container table-legend-container--group-type">
            <div class="table-legend">
              <div class="table-legend__color table-legend__color--overseas"></div>
              <div class="table-legend__text">境外移入</div>
            </div>
            <div class="table-legend">
              <div class="table-legend__color table-legend__color--local"></div>
              <div class="table-legend__text">本土案例</div>
            </div>
            <div class="table-legend">
              <div class="table-legend__color table-legend__color--dunmu"></div>
              <div class="table-legend__text">敦睦艦隊</div>
            </div>
            <div class="table-legend">
              <div class="table-legend__color table-legend__color--unknown"></div>
              <div class="table-legend__text">感染源不明</div>
            </div>
          </div>
          <div class="group-list">
            <div class="group-list__toggle" @click="handleGroupToggleClick()">
              <div>{{selectedGroup || '群聚案例'}}</div>
              <div class="group-list__toggle__plus">+</div>
            </div>
            <div :class="{
                'group-list__menu': true,
                'group-list__menu--active': groupToggle
              }"
            >
              <div
                v-for="(item, index) in groupList"
                :key="index"
                class="group-list__menu__select"
                @click="handleGroupSelectClick(item.group)"
              >
                {{item.group}}
              </div>
            </div>
          </div>
        </div>
        <div class="case-progress__table__header__toggle-container">
          <div v-if="!$store.state.viewGroup" class="case-progress__table__header__toggle">
            <div class="case-progress__table__header__toggle__name">由新到舊</div>
            <div class="case-progress__table__header__toggle__button" @click="handleReverseData()">
              <div
                :class="{
                  'case-progress__table__header__toggle__button__body': true,
                  'case-progress__table__header__toggle__button__body--active': !$store.state.caseDataOrder,
                }"
              />
              <div :class="{
                  'case-progress__table__header__toggle__button__circle': true,
                  'case-progress__table__header__toggle__button__circle--active': !$store.state.caseDataOrder,
                }"
              />
            </div>
          </div>
          <div class="case-progress__table__header__toggle">
            <div class="case-progress__table__header__toggle__name">{{$store.state.viewGroup ? '返回全部案例' : '僅顯示群聚案例'}}</div>
            <div class="case-progress__table__header__toggle__button" @click="handleChangeViewClick()">
              <div
                :class="{
                  'case-progress__table__header__toggle__button__body': true,
                  'case-progress__table__header__toggle__button__body--active': $store.state.viewGroup,
                }"
              />
              <div :class="{
                  'case-progress__table__header__toggle__button__circle': true,
                  'case-progress__table__header__toggle__button__circle--active': $store.state.viewGroup,
                }"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="!$store.state.viewGroup"
        class="case-progress__table__body"
      >
        <div
          class="case-progress"
          :style="{ transform: caseDiagramTranslate }"
        >
          <div
            v-for="item in dataInner" :key="item.index"
            :class="{
              'case-progress__item': true,
              'case-progress__item--disabled': item.active === false,
              'case-progress__item--local': item.from === '本土案例',
              'case-progress__item--overseas': item.from === '境外移入',
              'case-progress__item--dunmu': item.from === '敦睦艦隊',
              'case-progress__item--unknown': item.unknow === 'y',
            }"
            :id="'case-progress__item-' + item.index"
            @click="handleCircleClick(item.index)"
          >
            <div class="case-progress__item__date">{{item.date}}</div>
            <div class="case-progress__item__number">{{item.index}}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!$store.state.viewGroup" class="case-progress__svg-container">
      <svg id="case-progress-svg" width="100%" height="100%"
        xmlns="http://www.w3.org/2000/svg" 
        version="1.1"  
      >
        <g id="line-group"></g>
      </svg>
    </div>
    <!-- <div 
      v-if="!$store.state.viewGroup"
      class="case-progress__table"
    >
      <div class="case-progress__table__header">
        <div class="case-progress__table__header__meta">
          <h3>鑽石公主號<span class="case-progress__table__digit">{{$store.state.diamondDataLength}}</span>例</h3>
          <p style="font-size: 18px; font-weight: normal"> (原5例境外感染，其中1例返台確診納入第40例)</p>
        </div>
      </div>
      <div class="case-progress__table__body">
        <div class="case-progress">
          <div
            v-for="(item, index) in dataDiamond" :key="index"
            :class="{
              'case-progress__item': true,
              'case-progress__item--diamond': true,
            }"
            :id="'case-progress__item' + (index + 1)"
          >
            <div class="case-progress__item__number">{{item.index}}</div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import vueScrollTo from 'vue-scrollto';
import { autoResize_3 } from '@/mixins/masterBuilder.js';

export default {
  name: 'CaseProgress',
  mixins: [autoResize_3],
  props: {
    groupList: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      selectedGroup: null,
      groupToggle: false
    }
  },
  computed: {
    dataInner() {
      if (!this.$store.state.caseDataOrder) return Object.values(this.$store.state.caseData.cases).reverse();
      return Object.values(this.$store.state.caseData.cases);
    },
    dataDiamond() {
      return Object.values(this.$store.state.caseData.diamond);
    },
    caseDiagramTranslate() {
      let translateDistance = (window.innerWidth - 32) * 0.1 + 16;
      if (this.deviceType === 'pad') translateDistance = 49.59 + 24;
      if (this.deviceType === 'pc')  translateDistance = 40 + 24;
      return 'translateY(-' +  (Math.max(0, this.$store.getters.fourtyCount * 4)) * translateDistance + 'px)';
    },
    localCasesAmount() {
      return Object.values(this.$store.state.caseData.cases).filter(e => {
        return e.from === '本土案例'
      }).length;
    },
    overseasCasesAmount() {
      return Object.values(this.$store.state.caseData.cases).filter(e => {
        return e.from === '境外移入'
      }).length;
    },
    dunmuCasesAmount() {
      return Object.values(this.$store.state.caseData.cases).filter(e => {
        return e.from === '敦睦艦隊'
      }).length;
    },
  },
  methods: {
    handleCircleClick(index) {
      const occurance = Object.values({...this.$store.state.caseData.occurance});
      occurance.forEach((e, j) => {
        if (e.case.split(',').includes(index.toString())) {
          vueScrollTo.scrollTo('#case-slide-' + (j + 1));
        }
      });
    },
    handleReverseData() {
      this.$store.dispatch('reverseData');
      vueScrollTo.scrollTo('#case-slide-card-' + 1);
    },
    handleChangeViewClick() {
      this.$store.dispatch('changeViewType');
      vueScrollTo.scrollTo('#case-story');
    },
    handleGroupToggleClick() {
      this.groupToggle = !this.groupToggle;
    },
    handleGroupSelectClick(name) {
      vueScrollTo.scrollTo('#cases-group-' + name);
      this.groupToggle = false;
      this.selectedGroup = name;
    },
  },
}
</script>

<style lang="scss">
@import '~/style/_mixins.scss';
.case-progress__table {
  width: 100%;
  .case-progress__table__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 16px;
    min-height: 6rem;
    @include smob {
      margin-top: 0;
    }
    .case-progress__table__header__meta {
      width: 50%;
      h3, p {
        margin-bottom: 0 !important;
        line-height: 1.3;
        white-space: nowrap;
      }
      p {
        font-size: 15px !important;
        @include smob {
          font-size: 12px !important;
        }
      }
      .case-progress__table__digit {
        // font-size: 32px;
        margin: 0 4px;
      }
      .case-progress__table__header__meta__description {
        margin-left: 8px;
        font-size: 0.8rem;
        font-weight: normal;
        img {
          width: 20px;
          transform: translateY(15%);
        }
      }
      .group-list {
        width: 165px;
        height: 35px;
        position: relative;
        margin-bottom: 8px;
        .group-list__toggle {
          width: 100%;
          height: 35px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px;
          background-color: #efefef;
          cursor: pointer;
          @include clean-tap;
          .group-list__toggle__plus {
            position: relative;
            display: block;
            font-size: 1.3rem;
            font-weight: bold;
            margin-right: 5px;
            color: #707070;
          }
        }
        .group-list__menu {
          pointer-events: none;
          overflow: hidden;
          position: absolute;
          top: 0;
          left: 0;
          height: 0;
          opacity: 0;
          background-color: #efefef;
          transition: .111s;
          &.group-list__menu--active {
            pointer-events: auto;
            height: 350px;
            transform: translateY(35px);
            opacity: 1;
            overflow-y: scroll;
          }
          .group-list__menu__select {
            position: relative;
            width: 165px;
            padding: 8px;
            color: #6b6b6b;
            border: solid 1px transparent;
            cursor: pointer;
            @include clean-tap;
            &:hover {
              color: #000000;
              border: solid 1px #000000;
            }
          }
        }
      }
    }
    .case-progress__table__header__toggle-container {
      width: 150px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-end;
      margin-bottom: 8px;
      @include smob {
        margin-bottom: 5px;
      }
      .case-progress__table__header__toggle {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-bottom: 5px;
        .case-progress__table__header__toggle__name {
          font-size: 15px;
          line-height: 0;
          white-space: nowrap;
          margin-right: 5px;
          @include smob {
            font-size: 12px;
          }
          @include pc {
            font-size: 18px;
          }
        }
        .case-progress__table__header__toggle__button {
          position: relative;
          width: 50px;
          height: 20px;
          border-radius: 10px;
          overflow: hidden;
          cursor: pointer;
          .case-progress__table__header__toggle__button__body {
            width: 100%;
            height: 100%;
            background-color: #cfcfcf;
            &.case-progress__table__header__toggle__button__body--active {
              background-color: #6b6b6b;
            }
          }
          .case-progress__table__header__toggle__button__circle {
            position: absolute;
            top: 0;
            left: 0;
            width: 20px;
            height: 20px;
            border: 1px solid #cfcfcf;
            border-radius: 50%;
            background-color: #ffffff;
            transition: .333s;
            &.case-progress__table__header__toggle__button__circle--active {
              transform: translateX(30px);
            }
          }
        }
      }
    }
  }
  .case-progress__table__body {
    overflow: hidden;
  }
}

.table-legend-container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 8px 0 8px 0;
  @include smob {
    margin: 0;
  }
  &.table-legend-container--group-type {
    flex-direction: row;
  }
  p {
    white-space: nowrap;
  }
  .table-legend {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px 5px 0;
    .table-legend__color {
      display: flex;
      justify-content: center;
      align-items: center;
      // width: 24px;
      // height: 24px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      margin-right: 5px;
      border: solid 1px transparent;
      font-size: 0.8rem;
      &.table-legend__color--overseas {
        background-color: #4eadca;
      }
      &.table-legend__color--local {
        background-color: #e8ef23;
      }
      &.table-legend__color--dunmu {
        background-color: #e8decf;
      }
      &.table-legend__color--unknown {
        border: solid 1px #000000;
      }
    }
    .table-legend__text {
      font-size: 15px;
      line-height: 0;
      white-space: nowrap;
      @include smob {
        font-size: 12px;
      }
      @include pc {
        font-size: 18px;
      }
    }

  }
}

.case-progress {
  position: relative;
  width: 100%;
  padding: 24px 0;
  background-color: #ffffff;
  transition: .333s ease-in-out;
  &.case-progress--group-type {
    padding: 28px 0 0 0;
  }
  .case-progress__item {
    position: relative;
    float: left;
    width: calc(10% - 8px);
    height: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: calc(5% - 5px) 0;
    margin-right: 8px;
    margin-bottom: 24px;
    border-radius: 50%;
    border: solid 1px transparent;
    font-size: 12px;
    transition: .333s ease-in-out;
    cursor: pointer;
    @include clean-tap;
    @include pc {
      width: calc(10% - 32px);
      padding: calc(5% - 17px) 0;
      margin: 0 35px 24px 0;
      font-size: 14px;
    }
    &:nth-child(10n) {
      margin: 0 0 24px 0;
    }

    &.case-progress__item--local {
      background-color: #e8ef23;
    }
    &.case-progress__item--overseas {
      background-color: #4eadca;
    }
    &.case-progress__item--dead {
      background-color: #455a78;
    }
    &.case-progress__item--dunmu {
      background-color: #e8decf;
    }
    &.case-progress__item--disabled {
      background-color: #efefef;
    }
    // &.case-progress__item--diamond {
    //   background-color: #e8decf;
    //   cursor: initial;
    // }
    &.case-progress__item--unknown {
      border: solid 1px #000000;
    }

    .case-progress__item__date {
      position: absolute;
      top: -20px;
      left: 50%;
      transform: translateX(-50%);
      color: #a0a0a0;
      @include pc {
        top: -22px;
      }
    }
    .case-progress__item__number {
      position: relative;
    }
  }
}

.case-progress__svg-container {
  position: absolute;
  pointer-events: none;
  z-index: 99999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;

  svg {
    .case-line {
      stroke-width: 1px;
    }
    .case-line--overseas {
      stroke: #4eadca;
    }
    .case-line--local {
      stroke: #e8ef23;
    }
    .case-line--dunmu {
      stroke: #e8decf;
    }
  }
}
</style>