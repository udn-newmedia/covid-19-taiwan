<template>
  <div v-if="$store.state.caseDataOrder" class="case-slide-card" :id="'case-slide-' + data.index">
    <div
      v-show="data"
      :id="'case-slide-card-' + data.index"
      :class="{
        'case-slide-card__content': true,
        'case-slide-card__content--type-local': eventType_1 === 'local',
        'case-slide-card__content--type-overseas': eventType_1 === 'overseas',
        'case-slide-card__content--type-dunmu': eventType_1 === 'dunmu',
      }"
    >
      <p>{{handleEvent(data.evnet_1)}}</p>
    </div>
    <div
      v-show="data && eventType_2"
      :class="{
        'case-slide-card__content': true,
        'case-slide-card__content--type-local': eventType_2 === 'local',
        'case-slide-card__content--type-overseas': eventType_2 === 'overseas',
        'case-slide-card__content--type-dunmu': eventType_2 === 'dunmu',
      }"
    >
      <p>{{handleEvent(data.evnet_2)}}</p>
    </div>
  </div>
  <div v-else class="case-slide-card" :id="'case-slide-' + data.index">
    <div
      v-show="data && eventType_2"
      :class="{
        'case-slide-card__content': true,
        'case-slide-card__content--type-local': eventType_2 === 'local',
        'case-slide-card__content--type-overseas': eventType_2 === 'overseas',
        'case-slide-card__content--type-dunmu': eventType_2 === 'dunmu',
      }"
    >
      <p>{{handleEvent(data.evnet_2)}}</p>
    </div>
    <div
      v-show="data"
      :id="'case-slide-card-' + data.index"
      :class="{
        'case-slide-card__content': true,
        'case-slide-card__content--type-local': eventType_1 === 'local',
        'case-slide-card__content--type-overseas': eventType_1 === 'overseas',
        'case-slide-card__content--type-dunmu': eventType_1 === 'dunmu',
      }"
    >
      <p>{{handleEvent(data.evnet_1)}}</p>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';
import { autoResize_3 } from '@/mixins/masterBuilder.js';

export default {
  name: 'CaseSlideCard',
  mixins: [autoResize_3],
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      ticking: false,
    };
  },
  computed: {
    eventType_1() {
      if (this.data.index === 1) return false;

      const _case = this.data.case.split(',');
      if (_case[0]) {
        if (this.$store.state.caseData.cases[_case[0]].from === '境外移入') return 'overseas';
        if (this.$store.state.caseData.cases[_case[0]].from === '本土案例') return 'local';
        if (this.$store.state.caseData.cases[_case[0]].from === '敦睦艦隊') return 'dunmu';
      }
      return false;
    },
    eventType_2() {
      if (this.data.index === 1) return false;

      if (this.data.evnet_2 === '-') {
        return false;
      } else { 
        if (this.eventType_1 === 'overseas') return 'local';
        if (this.eventType_1 === 'dunmu') return 'local';
        if (this.eventType_1 === 'local') {
          const _case = this.data.case.split(',');
          const _caseFromOverseas = _case.filter((e, i) => {
            if (i > 0) return this.$store.state.caseData.cases[e].from === '境外移入';
          })
          const _caseFromDunmu = _case.filter((e, i) => {
            if (i > 0) return this.$store.state.caseData.cases[e].from === '敦睦艦隊';
          })
          console.log(_caseFromDunmu);

          if (_caseFromOverseas.length > 0) return 'overseas';
          if (_caseFromDunmu.length > 0) return 'dunmu';
          return false;
        }
        return false;
      } 
    },
    fourtyCount() {
      return this.$store.getters.fourtyCount;
    }
  },
  watch: {
    fourtyCount: {
      handler() {
        /**
         * handle dislocation after diagram tranlation
         */
        this.handleCleanLine();
        const intervel = setInterval(() => {
          this.handleCleanLine();
        }, 5);
        setTimeout(() => {
          clearInterval(intervel);
        }, 350);
      }
    }
  },
  methods: {
    handleEvent(value) {
      if (value === '-') return null;
      return value;
    },
    handleScroll() {
      if (this.$store.state.viewGroup) return;
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          if (this.data.index !== 1) {
            const pos = this.$el.getBoundingClientRect();
            const top = pos.top;
            const bottom = pos.bottom
            // if (top <= window.innerHeight * 0.25 && bottom > window.innerHeight * 0.25) {
            if (top <= window.innerHeight * 0.25 && bottom > window.innerHeight * 0.25) {
              this.handleDrawLine();
              this.handleUpdateLine();
              this.handleUpdateSlideIndex();
              this.handleUpdateCircle();
            }
          } else {
            this.handleCleanLine();
          }

          this.ticking = false;
        });
      }
      this.ticking = true;
    },
    handleDrawLine() {
      const g = d3.select('#case-progress-svg').select('#line-group');
      const itemList = this.data.case.split(',');
      itemList.forEach((e, i) => {
        g.append('line')
          .attr('id', 'case-line-' + i)
          .attr('class', 'case-line')
      });
    },
    handleCleanLine() {
      const g = d3.select('#case-progress-svg').select('#line-group');
      g.selectAll('.case-line').remove();
    },
    handleUpdateSlideIndex() {
      if (this.$store.state.currentSlideIndex !== this.data.index) {
        this.$store.dispatch('updateSlideIndex', this.data.index);
        this.handleCleanLine();
      }
    },
    handleUpdateCircle() {
      const eventCases = this.$store.state.caseData.occurance[this.$store.state.currentSlideIndex].case.split(',');
      
      for (let i = 0; i < this.$store.state.caseDataLength; i++) {
        if (!eventCases.includes((i + 1).toString())) {
          this.$store.dispatch('updateCaseDisable', i + 1);
        }
      }
      this.$store.dispatch('updateCaseActive', eventCases);
    },
    handleUpdateLine() {
      const card = document.getElementById('case-slide-card-' + this.data.index);
      const g = d3.select('#case-progress-svg').select('#line-group');
      if (card) {
        const cardPos = card.getBoundingClientRect();
        const itemList = this.data.case.split(',');

        itemList.forEach((e, i) => {
          const circlePos = document.getElementById('case-progress__item-' + e).getBoundingClientRect();
          let circlePosLeft = 0;
          let circlePosTop = 0;
          
          if (this.deviceType === 'mob') {
            circlePosLeft = circlePos.left - 2;
            circlePosTop = circlePos.top + 3;
          }
          if (this.deviceType === 'pad') {
            circlePosLeft = circlePos.left - ((window.innerWidth - 576) * 0.5) + 25;
            circlePosTop = circlePos.top + 25;
          }
          if (this.deviceType === 'pc') {
            circlePosLeft = circlePos.left - ((window.innerWidth - 720) * 0.5) + 30;
            circlePosTop = circlePos.top + 9;
          }

          if (this.$store.state.caseData.cases[e].from === '本土案例') {
            g.select('#case-line-' + i)
              .attr('class', 'case-line case-line--local')
              .attr('x1', circlePosLeft)
              .attr('y1', circlePosTop)
              .attr('x2', '50%')
              .attr('y2', cardPos.top + 8);
          }
          if (this.$store.state.caseData.cases[e].from === '境外移入') {
            g.select('#case-line-' + i)
              .attr('class', 'case-line case-line--overseas')
              .attr('x1', circlePosLeft)
              .attr('y1', circlePosTop)
              .attr('x2', '50%')
              .attr('y2', cardPos.top + 8);
          }
          if (this.$store.state.caseData.cases[e].from === '敦睦艦隊') {
            g.select('#case-line-' + i)
              .attr('class', 'case-line case-line--dunmu')
              .attr('x1', circlePosLeft)
              .attr('y1', circlePosTop)
              .attr('x2', '50%')
              .attr('y2', cardPos.top + 8);
          }
        });
      }
    },
  },
  mounted() {
    if (this.data) document.addEventListener('scroll', this.handleScroll, true);
  },
  destroyed() {
    if (this.data) document.removeEventListener('scroll', this.handleScroll, true);
  },
};
</script>

<style lang="scss">
@import '~/style/_mixins.scss';
.case-slide-card {
  pointer-events: none;
  position: relative;
  width: 100%;
  height: 135vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-content: center;
  padding-bottom: 25vh;
  .case-slide-card__content {
    pointer-events: auto;
    position: relative;
    width: 90%;
    padding: 18px 15px;
    margin: 0 auto;
    background-color: #efefef;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    white-space: pre-line;
    @include pc {
      width: 600px;
      padding: 20px 45px;
    }

    &.case-slide-card__content--type-local {
      background-color: #e8ef23;
    }
    &.case-slide-card__content--type-overseas {
      background-color: #4eadca;
    }
    &.case-slide-card__content--type-dunmu {
      background-color: #e8decf;
    }

    p {
      padding: 0;
      margin: 0;
    }
  }
}
</style>