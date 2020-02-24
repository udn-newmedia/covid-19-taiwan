<template>
  <div class="case-story">
    <div :class="{
        'case-story__chart': true,
        'case-story__chart--bottom': bottomFlag,
        'case-story__chart--fixed': fixedFlag,
      }"
    >
      <CaseProgress :key="$store.state.updateKey" :data="$store.state.caseData" />
    </div>
    <CaseSlideCard :data="intro" />
    <CaseSlideCard
      v-for="(item, index) in storyOccurence"
      :key="index"
      :data="item"
    />
    <CaseSlideCard />
  </div>
</template>

<script>
import CaseProgress from '@/components/CaseProgress.vue';
import CaseSlideCard from '@/components/CaseSlideCard.vue';
export default {
  naem: 'CaseStory',
  components: {
    CaseProgress,
    CaseSlideCard,
  },
  data() {
    return {
      ticking: false,
      fixedFlag: false,
      topFlag: false,
      bottomFlag: false,
      intro: {
        index: 0,
        case: '',
        evnet_1: '截至2月19日，台灣境內新冠肺炎確診共24例，有16例為境外移入，8例為本土病例。另外，停靠日本橫濱的「鑽石公主號」上，有5名台灣乘客確診。',
        evnet_2: '-',
      },
    };
  },
  computed: {
    storyOccurence() {
      return Object.values(this.$store.state.caseData.occurance);
    },
  },
  methods: {
    resetChart() {
      let cases = [];
      for (let i = 0; i < this.$store.state.caseDataLength; i++) {
        cases.push(i+1)
      }
      this.$store.dispatch('updateCaseActive', cases);
    },
    handleScroll() {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          const pos =  this.$el.getBoundingClientRect();
          const top = pos.top;
          const bottom = pos.bottom -  window.innerHeight;
          if (top <= 0 && bottom < 0) {
            /* above map */
            this.bottomFlag = true;
            this.resetChart();
          } else {
            this.bottomFlag = false;
          }

          if (top <= 0 && bottom > 0) {
            this.fixedFlag = true;
          } else {
            this.fixedFlag = false;
          }
          this.ticking = false;
        });
      }
      this.ticking = true;
    },
  },
  mounted() {
    document.addEventListener('scroll', this.handleScroll, true);
  },
  destroyed() {
    document.removeEventListener('scroll', this.handleScroll, true);
  },
};
</script>

<style lang="scss" scoped>
@import '~/style/_mixins.scss';
.case-story {
  position: relative;
  width: 100%;
}

.case-story__chart {
  position: absolute;
  pointer-events: none;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  margin: auto;
  &.case-story__chart--bottom {
    top: auto;
    bottom: 0;
  }
  &.case-story__chart--fixed {
    position: fixed;
    top: 0;
    padding: 0 16px;
  @include pad {
    padding: 0 calc(50% - 288px);
  }
  @include pc {
    padding: 0 calc(50% - 360px);
  }
  }
}
</style>