<template>
  <div v-if="$store.state.caseData !== null" class="related-article">
    <h3>相關報導</h3>
    <a
      v-for="(item, index) in $store.state.caseData.report" :key="index"
      :href="item.link"
      target="_blank"
      rel="noopener"
      :ariaLabel="item.title"
      :name="item.title"
      @click="handleGA(item.title)"
    >
      <button
        class="related-article__button"
        aria-label="share"
        name="share-twitter"
      >
        <p
          v-for="(t, i) in handleTitle(item.title)"
          :key="i"
          class="small"
        >
          {{t}}
        </p>
        <i class="arrow right"></i>
      </button>
    </a>
  </div>
  <div v-else class="related-article-loading" />
</template>

<script>
import { sendGaMethods } from '@/mixins/masterBuilder.js';

export default {
  name: 'RelatedArticle',
  mixins: [sendGaMethods],
  methods: {
    handleGA(title) {
      this.sendGA({
        category: 'related',
        action: 'click',
        label: title
      });
    },
    handleTitle(title) {
      return title.split(' ');
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~/style/_mixins.scss';
.related-article {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 144px;
  h3 {
    @include pad {
      text-align: center;
    }
    @include pc {
      text-align: center;
    }
  }
  a {
    display: block;
    width: 100%;
    max-width: 450px;
    text-align: center;
  }
}
.related-article__button {
  @include clean-btn;
  position: relative;
  width: 100%;
  height: 100px;
  font-size: 18px;
  text-align: left;
  font-weight: bold;
  border: solid 1px #707070;
  border-radius: 8px;
  padding: 12px 24px;
  margin: 5px 0;
  transition: .333s ease-in-out;
  @include pad {
    width: 450px;
  }
  @include pc {
    width: 450px;
  }

  &:hover {
    background-color: #efefef;
  }

  p {
    margin: 0;
  }
  i {
    position: absolute;
    top: 50%;
    right: 20px;
    border: solid #6b6b6b;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    transform: translateY(-50%);
  }
  .right {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }
}
.related-article-loading {
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
</style>