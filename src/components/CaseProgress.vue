<template>
  <div class="case-progress">
    <div class="case-progress__table">
      <h3>台灣境內確診<span style="font-size: 40px">{{$store.state.caseDataLength}}</span>例</h3>
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
      <div class="schechule-diagram">
        <div
          v-for="(item, index) in dataInner" :key="index"
          :class="{
            'schechule-diagram__item': true,
            'schechule-diagram__item--disabled': item.active === false,
            'schechule-diagram__item--local': item.active && item.from === '本土案例',
            'schechule-diagram__item--overseas': item.active && item.from === '境外移入',
            'schechule-diagram__item--dead': item.dead,
          }"
          :id="'schechule-diagram__item-' + (index + 1)"
        >
          <div class="schechule-diagram__item__date">{{item.date}}</div>
          <div class="schechule-diagram__item__number">{{item.index}}</div>
        </div>
      </div>
    </div>
    <div class="case-progress__table">
      <h3>鑽石公主號<span style="font-size: 40px">{{$store.state.diamondDataLength}}</span>例<span style="font-size: 18px; font-weight: normal"> (境外感染)</span></h3>
      <div class="schechule-diagram">
        <div
          v-for="(item, index) in dataDiamond" :key="index"
          :class="{
            'schechule-diagram__item': true,
            'schechule-diagram__item--diamond': true,
          }"
          :id="'schechule-diagram__item' + (index + 1)"
        >
          <div class="schechule-diagram__item__date">{{item.date}}</div>
          <div class="schechule-diagram__item__number">{{item.index}}</div>
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
export default {
  name: 'CaseProgress',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    dataInner() {
      return Object.values(this.data.cases);
    },
    dataDiamond() {
      return Object.values(this.data.diamond);
    }
  },
}
</script>

<style lang="scss">
@import '~/style/_mixins.scss';
.case-progress {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 48px 0; 
}
.case-progress__table {
  overflow: hidden;
}
.table-lagend-container {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 36px;
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
    margin-bottom: 40px;
    border-radius: 50%;
    font-size: 12px;
    @include pc {
      width: calc(10% - 14px);
      padding: calc(5% - 7px) 0;
      margin-right: 14px;
      font-size: 14px;
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