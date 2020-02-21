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
      <h1>群聚感染難擋<br>圖解台灣新冠肺炎病例關係</h1>
      <p>中國大陸武漢自2019年12月爆發新冠肺炎（COVID-19）疫情，迅速擴散中國各省及世界各國，台灣於今年1月21日出現首例女台商感染，之後有夫妻檔、家族親人相繼染病，群聚感染案例數增加。究竟群聚感染是如何發生的？</p>

      <p>《聯合報》整理台灣新冠肺炎確診案例資料，圖解感染者之間的背景關係。<br>最後更新時間：2020.02.21</p>
      <CaseStory v-if="$store.state.caseData !== null" />
      <h1>死亡個案傳給家人<br>陳時中：零星社區感染</h1>
      <p>台灣出現首例無旅遊史、找不到確定病例接觸史的新冠肺炎重症死亡個案，中央流行疫情指揮中心清查該名個案之密切接觸者及家人，發現4名家人被傳染，但該死者之感染源尚待確認。指揮官陳時中表示，疑似台商有自主健康管理，定調零星社區內感染。</p>
      <p>專家諮詢小組召集人張上淳表示，醫學上根據感染的地點可分為有境外移入個案、本土個案，也可分為院內感染、院外感染，或是人口密集機構感染、家戶內的傳播，「社區感染」只是代表感染的地點，不代表社區中有大規模流行。即便社區有單一個案也不代表社區受到威脅，除非多個感染一個或多個社區發生，對於社區才有威脅，因此不應執著於是否為社區感染。</p>
      <p>感染症與疫苗研究所研究員周彥宏表示，「社區感染」係指出現傳染源不明的感染者，第19例感染源不明又傳染給第20例，就是社區感染。但「社區傳播」定義至少要符合下列三者之一，包括多處發生不明感染源的人傳人事件、本土案例數超過境外移入案例數、有3人以上的多處群聚感染。根據以上定義，台灣目前並未滿足社區傳播的條件，防疫網不算有破口。</p>
      <ArticleColumnOne
        :srcMob="require('@/assets/img/pic1/mob.jpg')"
        :srcPad="require('@/assets/img/pic1/mob.jpg')"
        :srcPc="require('@/assets/img/pic1/pc.jpg')"
        alt="台灣出現首例無旅遊史的新冠肺炎死亡個案，讓民眾對疫情更加擔憂，出門紛紛戴上口罩自保"
      >
        台灣出現首例無旅遊史的新冠肺炎死亡個案，讓民眾對疫情更加擔憂，出門紛紛戴上口罩自保。
      </ArticleColumnOne>
      <p>國家衛生研究院董事長、長庚大學醫院系小兒科教授林奏延表示，防疫的前端是防堵，目前台灣是做到百分百成功、世界數一數二，但防疫後端「減害」的部分必須要開始了。林奏延分析，台灣和目前有社區傳播的地區都還有往來，包括大陸五個直航點，日本、泰國曼谷和新加坡的人員往來都很多，台灣的「社區傳播」早晚都會發生。</p>
      <p>台灣感染症醫學會理事長黃立民表示，現在找不到傳染源，代表有未知的感染源在外面，有發展為社區傳播的隱憂，因此現擴大採檢是必要作為，才能及早偵測並控制社區傳播。</p>
    </ArticleContainer>
    <PageFooter>
      <FooterEditor>
        <div>
          <p>資料來源</p>
          <p><a href="https://www.cdc.gov.tw/" target="_blank" rel="noopener" aria-label="data source" title="data source">衛福部疾管署</a></p>
        </div>
        <div>
          <p>文字</p>
          <p>邱宜君、楊雅棠、<br>簡浩正、章凱閎</p>
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
          <p>楊若榆</p>
        </div>
        <div>
          <p>製作單位</p>
          <p>聯合報新媒體中心、<br>視覺設計中心</p>
        </div>
        <div>
          <p>監製</p>
          <p>聯合報新聞部</p>
        </div>
        <div>
          <p></p>
          <p>2020.02.21</p>
        </div>
      </FooterEditor>
      <FooterShare />
      <FooterRelatedArticle
        title="系列報導"

        :img1="require('@/assets/img/related/1.jpg')"
        title1="吃一頓飯案19全家五人確診 陳時中：別因此釀聚餐恐慌"
        href1="https://udn.com/news/story/120940/4355832"

        :img2="require('@/assets/img/related/2.jpg')"
        title2="新冠肺炎疫情影響 跟團旅遊退費原則一次看懂"
        href2="https://udn.com/news/story/7266/4353776"

        :img3="require('@/assets/img/related/3.jpg')"
        title3="20天的社區感染破口？南韓出現「防疫網之外」的疑似超級傳染者"
        href3="https://global.udn.com/global_vision/story/8662/4354784"

        :img4="require('@/assets/img/related/4.jpg')"
        title4="日本社區傳染拉警報？和歌山醫院「院內不明連續確診」的防疫謎團"
        href4="https://global.udn.com/global_vision/story/8662/4344189"
      />
      <FooterFbComment />
      <FooterLogo />
    </PageFooter>
    <PageBackTop />
  </div>
</template>

<script>

import CaseStory from '@/components/CaseStory.vue';

import HeaderTypeA from '@/components/header/HeaderTypeA.vue';
import ArticleColumnOne from '@/components/layout/ArticleColumnOne.vue';
import ArticleContainer from '@/components/layout/ArticleContainer.vue';

import FooterEditor from '@/components/footer/FooterEditor.vue';
import FooterFbComment from '@/components/footer/FooterFbComment.vue';
import FooterLogo from '@/components/footer/FooterLogo.vue';
import FooterRelatedArticle from '@/components/footer/FooterRelatedArticle.vue';
import FooterShare from '@/components/footer/FooterShare.vue';
import PageFooter from '@/components/footer/PageFooter.vue';

import PageBackTop from '@/components/layout/PageBackTop.vue';
import PageCover from '@/components/layout/PageCover.vue';
import PageIndicator from '@/components/layout/PageIndicator.vue';

export default {
  name: 'App',
  components: {
    CaseStory,
    HeaderTypeA,
    ArticleColumnOne,
    ArticleContainer,
    FooterEditor,
    FooterFbComment,
    FooterLogo,
    FooterRelatedArticle,
    FooterShare,
    PageFooter,
    PageBackTop,
    PageCover,
    PageIndicator
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
