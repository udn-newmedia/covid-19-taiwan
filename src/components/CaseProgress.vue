<template>
  <div class="case-progress">
    <div class="case-progress__table">
      <div class="case-progress__table__header">
        <h3>台灣境內確診<span class="case-progress__table__digit">{{$store.state.caseDataLength}}</span>例</h3>
        <p style="font-size: 18px; font-weight: normal"> (*點按病例看說明)</p>
        <div class="table-lagend-container">
          <div class="table-lagend">
            <div class="table-lagend__color table-lagend__color--overseas" />
            <div class="table-lagend__text">境外移入</div>
          </div>
          <div class="table-lagend">
            <div class="table-lagend__color table-lagend__color--local" />
            <div class="table-lagend__text">本土案例</div>
          </div>
        </div>
      </div>
      <div class="case-progress__table__body">
        <div class="schechule-diagram"
          :style="{
            transform: caseDiagramTranslate,
          }"
        >
          <div
            v-for="(item, index) in dataInner" :key="index"
            :class="{
              'schechule-diagram__item': true,
              'schechule-diagram__item--disabled': item.active === false,
              'schechule-diagram__item--local': item.active && item.from === '本土案例',
              'schechule-diagram__item--overseas': item.active && item.from === '境外移入',
            }"
            :id="'schechule-diagram__item-' + (index + 1)"
            @click="handleCircleClick(index + 1)"
          >
            <div class="schechule-diagram__item__date">{{item.date}}</div>
            <div class="schechule-diagram__item__number">{{item.index}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="case-progress__table">
      <div class="case-progress__table__header">
        <h3>鑽石公主號<span class="case-progress__table__digit">{{$store.state.diamondDataLength}}</span>例</h3>
        <p style="font-size: 18px; font-weight: normal"> (原5例境外感染，其中1例返台確診納入第40例)</p>
      </div>
      <div class="case-progress__table__body">
        <div class="schechule-diagram">
          <div
            v-for="(item, index) in dataDiamond" :key="index"
            :class="{
              'schechule-diagram__item': true,
              'schechule-diagram__item--diamond': true,
            }"
            :id="'schechule-diagram__item' + (index + 1)"
          >
            <!-- <div class="schechule-diagram__item__date">{{item.date}}</div> -->
            <div class="schechule-diagram__item__number">{{item.index}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="case-progress__svg-container">
      <svg id="case-progress-svg" width="100%" height="100%"
        xmlns="http://www.w3.org/2000/svg" 
        version="1.1"  
      >
        <g id="line-group"></g>
      </svg>
    </div>
  </div>
</template>

<script>
import vueScrollTo from 'vue-scrollto';
import { autoResize_3 } from '@/mixins/masterBuilder.js';

const firstWuhan = [2, 3, 4, 6, 7, 11, 12, 13];

export default {
  name: 'CaseProgress',
  mixins: [autoResize_3],
  props: {
    data: {
      type: Object,
      required: true,
    },
    // diamondTopFlag: {
    //   type: Boolean,
    //   default: false,
    // }
  },
  computed: {
    dataInner() {
      return Object.values(this.data.cases);
    },
    dataDiamond() {
      return Object.values(this.data.diamond);
    },
    caseDiagramTranslate() {
      let translateDistance = (window.innerWidth - 32) * 0.1 + 16;
      if (this.deviceType === 'pad') translateDistance = 49.59 + 24;
      if (this.deviceType === 'pc')  translateDistance = 40 + 24;
      // if (this.diamondTopFlag) return 'translateY(0px)';
      return 'translateY(-' +  (Math.max(0, this.$store.getters.fiftyCount * 5)) * translateDistance + 'px)';
    }
  },
  methods: {
    handleCircleClick(index) {
      const occurance = Object.values({...this.data.occurance});
        
      if (firstWuhan.includes(index)) {
        vueScrollTo.scrollTo('#case-slide-card-' + 2);
      }  

      occurance.forEach((e, j) => {
        if (j > 1) {
          if (e.case.split(',').includes(index.toString())) {
            vueScrollTo.scrollTo('#case-slide-card-' + (j + 1));
          }
        }
      })
    }
  },
}
</script>

<style lang="scss">
@import '~/style/_mixins.scss';
.case-progress {
  position: relative;
  width: 100%;
  min-height: 100vh;
}
.case-progress__table {
  width: 100%;
  min-height: 30vh;
  .case-progress__table__header {
    background-color: #ffffff;
    h3, p {
      margin-bottom: 0 !important;
      line-height: 1.3;
    }
    p {
      font-size: 15px !important;
      @include smob {
        font-size: 12px !important;
      }
    }
    .case-progress__table__digit {
      font-size: 40px;
      margin: 0 4px;
    }
  }
  .case-progress__table__body {
    overflow: hidden;
  }
}
.table-lagend-container {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 20px 0;
  .table-lagend {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    .table-lagend__color {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      margin-right: 5px;
      &.table-lagend__color--overseas {
        background-color: #4eadca;
      }
      &.table-lagend__color--local {
        background-color: #e8ef23;
      }
    }
    .table-lagend__text {
      font-size: 18px;
      line-height: 1;
    }
  }
}
.schechule-diagram {
  position: relative;
  width: 100%;
  padding: 24px 0;
  transition: .333s ease-in-out;
  .schechule-diagram__item {
    position: relative;
    float: left;
    width: calc(10% - 8px);
    height: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: calc(5% - 4px) 0;
    margin-right: 8px;
    margin-bottom: 24px;
    border-radius: 50%;
    font-size: 12px;
    transition: .333s ease-in-out;
    cursor: pointer;
    @include clean-tap;
    @include pc {
      width: calc(10% - 32px);
      padding: calc(5% - 16px) 0;
      margin: 0 35px 24px 0;
      font-size: 14px;
    }
    &:nth-child(10n) {
      margin: 0 0 24px 0;
    }

    &.schechule-diagram__item--local {
      background-color: #e8ef23;
    }
    &.schechule-diagram__item--overseas {
      background-color: #4eadca;
    }
    &.schechule-diagram__item--dead {
      background-color: #455a78;
    }
    &.schechule-diagram__item--disabled {
      background-color: #efefef;
    }
    &.schechule-diagram__item--diamond {
      background-color: #e8decf;
      cursor: initial;
    }

    .schechule-diagram__item__date {
      position: absolute;
      top: -20px;
      left: 50%;
      transform: translateX(-50%);
      color: #a0a0a0;
    }
    .schechule-diagram__item__number {
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
  }
}
</style>