<template>
  <div id="app">
    <PageIndicator />
    <HeaderTypeA></HeaderTypeA>
    <PageCover
      :srcMob="require('~/img/cover/mob.jpg')"
      :srcPad="require('~/img/cover/pad.jpg')"
      :srcPc="require('~/img/cover/pc.jpg')"
    ></PageCover>
    <ArticleContainer>
      <h1>群聚感染案例增<br>圖解台灣新冠肺炎個案關係</h1>
      <p>中國大陸武漢自2019年12月爆發新冠肺炎（COVID-19）疫情，迅速擴散中國各省及世界各國，台灣於今年1月21日出現首例女台商感染，之後有夫妻檔、家族親人相繼染病，群聚感染案例數增加。究竟群聚感染是如何發生的？</p>
      <p>《聯合報》整理台灣新冠肺炎確診案例資料，圖解感染者之間的背景關係。<br>最後更新時間：{{updatedDate}}</p>
      <CaseStory />
      <RelatedArticle />
    </ArticleContainer>

    <PageFooter>
      <FooterEditor>
        <div>
          <p>資料來源</p>
          <p><a href="https://www.cdc.gov.tw/" target="_blank" rel="noopener" aria-label="data source" title="data source">衛福部疾管署</a></p>
        </div>
        <div>
          <p>製作人</p>
          <p>蔡佩蓉</p>
        </div>
        <div>
          <p>視覺設計</p>
          <p>蘇士堯</p>
        </div>
        <div>
          <p>網頁製作</p>
          <p>楊若榆、胡凈悟、周融聖</p>
        </div>
        <div>
          <p>製作單位</p>
          <p>聯合報新媒體中心、<br>視覺設計中心</p>
        </div>
        <div>
          <p>監製</p>
          <p>聯合報新聞部</p>
        </div>
      </FooterEditor>
      <FooterShare />
      <FooterFbComment />
      <FooterLogo />
    </PageFooter>
    <PageBackTop />
  </div>
</template>

<script>

import CaseStory from '@/components/CaseStory.vue';

import HeaderTypeA from '@/components/header/HeaderTypeA.vue';
import ArticleContainer from '@/components/layout/ArticleContainer.vue';

import FooterEditor from '@/components/footer/FooterEditor.vue';
import FooterFbComment from '@/components/footer/FooterFbComment.vue';
import FooterLogo from '@/components/footer/FooterLogo.vue';
import FooterShare from '@/components/footer/FooterShare.vue';
import PageFooter from '@/components/footer/PageFooter.vue';

import PageBackTop from '@/components/layout/PageBackTop.vue';
import PageCover from '@/components/layout/PageCover.vue';
import PageIndicator from '@/components/layout/PageIndicator.vue';

import RelatedArticle from '@/components/RelatedArticle.vue';

export default {
  name: 'App',
  components: {
    CaseStory,
    HeaderTypeA,
    ArticleContainer,
    FooterEditor,
    FooterFbComment,
    FooterLogo,
    RelatedArticle,
    FooterShare,
    PageFooter,
    PageBackTop,
    PageCover,
    PageIndicator
  },
  computed: {
    updatedDate() {
      if (this.$store.state.caseData) return this.$store.state.caseData.date;
      return '';
    }
  },
  mounted() {
    this.$store.dispatch('getData');
  },
}
</script>

<style lang="scss">
body {
  background-color: #ffffff;
}
</style>
