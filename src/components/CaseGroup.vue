<template>
  <div class="cases-group-container">
    <div
      v-for="(item, index) in groupList"
      :key="index"
      class="cases-group"
      :id="'cases-group-' + item.group"
    >
      <p>{{item.group}}</p>
      <div class="case-progress">
        <div
          v-for="(item_c, index_c) in calcCaseList(item.case)" :key="index_c"
          :class="{
            'case-progress__item': true,
            'case-progress__item--local': $store.state.caseData.cases[item_c].from === '本土案例',
            'case-progress__item--overseas': $store.state.caseData.cases[item_c].from === '境外移入',
            'case-progress__item--unknown': $store.state.caseData.cases[item_c].unknow === 'y',
          }"
        >
          <div class="case-progress__item__date">{{calcCaseDate(item_c)}}</div>
          <div class="case-progress__item__number">{{calcCaseIndex(item_c)}}</div>
        </div>
      </div>
      <div class="case-slide-card case-slide-card--group">
        <div class="case-progress__split-line" />
        <div
          :class="{
              'case-slide-card__content': true,
              'case-slide-card__content--group': true,
              'case-slide-card__content--type-local': calcEventType_1(item) === 'local',
              'case-slide-card__content--type-overseas': calcEventType_1(item) === 'overseas',
            }"
          >
          <p>{{handleEvent(item.evnet_1)}}</p>
        </div>
        <div
          v-if="calcEventType_2(item)"
          :class="{
              'case-slide-card__content': true,
              'case-slide-card__content--group': true,
              'case-slide-card__content--type-local': calcEventType_2(item) === 'local',
              'case-slide-card__content--type-overseas': calcEventType_2(item) === 'overseas',
            }"
          >
          <p>{{handleEvent(item.evnet_2)}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CaseGroup',
  props: {
    groupList: {
      type: Array,
      default: null
    }
  },
  methods: {
    calcCaseList(group) {
      const list = group.split(',')
      return list;
    },
    calcCaseDate(index) {
      return this.$store.state.caseData.cases[index].date;
    },
    calcCaseIndex(index) {
      return this.$store.state.caseData.cases[index].index;
    },
    handleEvent(value) {
      if (value === '-') return null;
      return value;
    },
    calcEventType_1(item) {
      if (item.index === 1) return false;

      const _case = item.case.split(',');
      if (_case[0]) {
        if (this.$store.state.caseData.cases[_case[0]].from === '境外移入') return 'overseas';
        if (this.$store.state.caseData.cases[_case[0]].from === '本土案例') return 'local';
      }
      return false;
    },
    calcEventType_2(item) {
      if (item.index === 1) return false;

      if (item.evnet_2 === '-') {
        return false;
      } else { 
        if (this.calcEventType_1(item) === 'overseas') return 'local';
        if (this.calcEventType_1(item) === 'local') return 'overseas';
        return false;
      } 
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/style/_mixins.scss';
.cases-group {
  width: 100%;
  padding-top: 24px;
  p {
    margin-bottom: 8px;
    @include pc {
      margin-bottom: 16px;
    }
  }
}
.case-progress__split-line {
  width: 100%;
  height: 1px;
  margin-bottom: 16px;
  background: #a0a0a0;
}
.case-slide-card--group {
  height: auto !important;
  padding: 8px 0 5vh 0 !important;
  @include pc {
    padding: 16px 0 5vh 0 !important;
  }
}
.case-slide-card__content--group {
  width: 100% !important;
}

.case-progress__item {
  cursor: context-menu !important;
  @include pc {
    margin: 0 8px 24px 0 !important;
  }
}
</style>