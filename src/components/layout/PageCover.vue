<template>
  <div class="page-cover"
    :style="{
      backgroundImage: 'url(' + selectSrc_3(srcMob, srcPad, srcPc) + ')'
    }"
  >
    <div v-if="!$store.state.caseData" class="page-cover__cases-table page-cover__cases-table--loading">
      <div class="page-cover__loading" />
    </div>
    <div v-else class="page-cover__cases-table">
      <div class="page-cover__cases-table__section">
        <div class="page-cover__cases-table__number page-cover__cases-table__number--case">{{$store.state.caseDataLength || 'loading'}}</div>
        <div class="page-cover__cases-table__title">台灣確診數</div>
      </div>
      <div class="page-cover__cases-table__section">
        <div class="page-cover__cases-table__number page-cover__cases-table__number--recover">{{$store.state.caseData.release || 'loading'}}</div>
        <div class="page-cover__cases-table__title">解除隔離</div>
      </div>
      <div class="page-cover__cases-table__section">
        <div class="page-cover__cases-table__number page-cover__cases-table__number--death">{{$store.state.caseData.dead || 'loading'}}</div>
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
  // @include pad {
  //   margin-bottom: 0;
  // }
  // @include pc {
  //   margin-bottom: 0;
  // }
  .page-cover__loading {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #4eadca;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    padding: 0;
    animation: spin 1s linear infinite;
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  }
  .page-cover__cases-table {
    position: absolute;
    bottom: 0;
    left: 50%;
    display: flex;
    margin: 0 auto;
    padding-bottom: 36px;
    transform: translateX(-50%);
    @include pc {
      padding-bottom: 16px;
    }

    &.page-cover__cases-table--loading {
      bottom: 10%;
    }
    .page-cover__cases-table__section {
      min-width: 120px;
      padding: 0 12px;
      @include pc {
        padding: 0 36px;
        min-width: 180px;
      }
      &:first-child {
        border-right: solid 0.5px #787878;
      }
      &:last-child {
        border-left: solid 0.5px #787878;
      }
    }
    .page-cover__cases-table__number {
      font-size: 60px;
      line-height: 0.8;
      margin-bottom: 30px;
      text-align: center;
      @include pc {
        font-size: 80px;
      }
      &.page-cover__cases-table__number--case {
        color: #4eadca;
      }
      &.page-cover__cases-table__number--recover {
        color: #bbbbbb;
      }
      &.page-cover__cases-table__number--death {
        color: #0c2b57;
      }
    }
    .page-cover__cases-table__title {
      font-size: 15px;
      color: #6b6b6b;
      text-align: center;
      @include pc {
        font-size: 18px;
      }
    }
  }
}
</style>