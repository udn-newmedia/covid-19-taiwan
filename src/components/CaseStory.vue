<template>
  <div v-if="$store.state.caseData !== null" class="case-story">
    <div ref="caseStoryRef" :class="{
        'case-story__chart': true,
        'case-story__chart--bottom': bottomFlag,
        'case-story__chart--fixed': fixedFlag,
      }"
    >
      <CaseProgress :data="$store.state.caseData" />
    </div>
    <CaseSlideCard
      v-for="(item, index) in storyOccurence"
      :key="index"
      :data="item"
    />
    <CaseSlideCard />
  </div>
  <div v-else class="case-story-loading" />
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
    };
  },
  computed: {
    storyOccurence() {
      return Object.values(this.$store.state.caseData.occurance);
    }
  },
  methods: {
    resetChart() {
      let cases = [];
      for (let i = 0; i < this.$store.state.caseDataLength; i++) {
        cases.push(i + 1);
      }
      this.$store.dispatch('updateCaseActive', cases);
    },
    handleScroll() {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          const pos =  this.$el.getBoundingClientRect();
          const top = pos.top;
          const caseStoryHeight = this.$refs.caseStoryRef.clientHeight ? this.$refs.caseStoryRef.clientHeight : 0;
          const bottom = pos.bottom - caseStoryHeight;

          /* under chart or not */
          if (top <= 0 && bottom < 0) {
            this.bottomFlag = true;
          } else {
            this.bottomFlag = false;

            /* abobe chart, return the first card and reset chart*/
            if (top > 0) {
              this.resetChart();
              if (this.$store.state.currentSlideIndex !== 1) {
                this.$store.dispatch('updateSlideIndex', 1);
              }
            }
          }

          /* under chart or not */
          if (top <= 0 && bottom > 0) {
            if (!this.fixedFlag) this.fixedFlag = true;
          } else {
            if (this.fixedFlag) this.fixedFlag = false;
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
  margin-top: 64px;
}
.case-story-loading {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #4eadca;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  padding: 0;
  animation: spin 1s linear infinite;
  margin: 30vh auto;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
}
.case-story__chart {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  // height: 100vh;
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