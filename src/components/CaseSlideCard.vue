<template>
  <div class="case-slide-card">
    <div
      v-if="data"
      :class="{
          'case-slide-card__content': true,
          'case-slide-card__content--type-local': eventType_1 === 'local',
          'case-slide-card__content--type-overseas': eventType_1 === 'overseas',
        }"
      >
      <p>{{handleEvent(data.evnet_1)}}</p>
    </div>
    <div
      v-if="data && eventType_2"
      :class="{
          'case-slide-card__content': true,
          'case-slide-card__content--type-local': eventType_2 === 'local',
          'case-slide-card__content--type-overseas': eventType_2 === 'overseas',
        }"
      >
      <p>{{handleEvent(data.evnet_2)}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CaseSlideCard',
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
      const _case = this.data.case.split(',');
      if (_case[0]) {
        if (this.$store.state.caseData.cases[_case[0]].from === '境外移入') return 'overseas';
        if (this.$store.state.caseData.cases[_case[0]].from === '本土案例') return 'local';
      }
      return false;
    },
    eventType_2() {
      if (this.data.evnet_2 === '-') {
        return false;
      } else { 
        const cases = Object.values(this.$store.state.caseData.cases);        
        cases.forEach(e => {
          if (e.from === '本土案例') {
            return 'local';
          }
        });
        return 'overseas';
      } 
    },
  },
  methods: {
    handleEvent(value) {
      if (value === '-') return null;
      return value;
    },
    handleScroll() {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          if (this.data.index !== 0) {
            const pos = this.$el.getBoundingClientRect();
            const top = pos.top;
            const bottom = pos.bottom
            
            if (top <= 0 && bottom > 0) {
              this.$store.dispatch('updateSlideIndex', this.data.index)
  
              for (let i = 0; i < this.$store.state.caseDataLength; i++) {
                this.$store.dispatch('updateCaseDisable', i + 1);
                this.$store.dispatch('updateCaseDeadDisable', i + 1);
              }
  
              const eventCases = this.$store.state.caseData.occurance[this.$store.state.currentSlideIndex].case.split(',');
              this.$store.dispatch('updateCaseActive', eventCases);
            }
          }

          this.ticking = false;
        });
      }
      this.ticking = true;
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

<style lang="scss" scoped>
@import '~/style/_mixins.scss';
.case-slide-card {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-content: center;
  // border: solid red 1px;

  .case-slide-card__content {
    position: relative;
    width: 90%;
    padding: 18px 15px;
    margin: 0 auto;
    background-color: #efefef;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
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

    p {
      padding: 0;
      margin: 0;
    }
  }
}
</style>