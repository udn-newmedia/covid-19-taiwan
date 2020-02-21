<template>
  <div class="page-cover"
    :style="{
      backgroundImage: 'url(' + selectSrc_3(srcMob, srcPad, srcPc) + ')'
    }"
  >
    <div class="page-cover__cases-table">
      <div class="page-cover__cases-table__section">
        <div class="page-cover__cases-table__number page-cover__cases-table__number--case">{{$store.state.caseDataLength}}</div>
        <div class="page-cover__cases-table__title">台灣確診數</div>
      </div>
      <div class="page-cover__cases-table__section">
        <div class="page-cover__cases-table__number page-cover__cases-table__number--death">1</div>
        <div class="page-cover__cases-table__title">死亡數</div>
      </div>
    </div>
    <div class="page-cover__enter-anchor" id="enter-anchor" />
  </div>
</template>

<script>
import { autoResize_3, selectSrcMethod_3, sendGaMethods } from '@/mixins/masterBuilder.js';

export default {
  name: 'PageCover',
  mixins: [autoResize_3, selectSrcMethod_3, sendGaMethods],
  props: {
    srcMob: {
      type: String,
    },
    srcPad: {
      type: String
    },
    srcPc: {
      type: String
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/style/_mixins.scss';
.page-cover {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 85vh;
  background-size: cover;
  background-position: center;
  margin-bottom: 48px;
  @include pad {
    margin-bottom: 0;
  }
  @include pc {
    margin-bottom: 0;
  }
  .page-cover__cases-table {
    position: absolute;
    bottom: 0;
    left: 50%;
    display: flex;
    margin: 0 auto;
    padding-bottom: 50px;
    transform: translateX(-50%);
    @include pc {
      padding-bottom: 70px;
    }
    .page-cover__cases-table__section {
      padding: 0 36px;
      &:first-child {
        border-right: solid 1px #787878;
      }
    }
    .page-cover__cases-table__number {
      font-size: 80px;
      line-height: 0.8;
      margin-bottom: 30px;

      &.page-cover__cases-table__number--case {
        color: #4eadca;
      }
      &.page-cover__cases-table__number--death {
        color: #0c2b57;
      }
    }
    .page-cover__cases-table__title {
      font-size: 18px;
      color: #6b6b6b;
    }
  }
}
</style>