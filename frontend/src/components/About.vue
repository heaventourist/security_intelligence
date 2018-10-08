<template>
  <div class="about">
    <Card dis-hover>
        <p slot="title"><Icon type="md-podium"></Icon> {{title}} </p>
        <p v-html="content"></p>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'About',
  data () {
    return {
      title: 'About The Webpage',
      content: `This webpage is built to help visualize a security intelligence data feed from <a href="https://nvd.nist.gov/vuln/data-feeds" target="_blank">National Vulnerability Database</a>. The front-end is written in <a href="https://vuejs.org/v2/guide/index.html" target="_blank">Vue.js</a>, a very good single page application (SPA) framework. During front-end development, I use WebPack with a lot of cool features provided. The UI components are taken from <a href="https://www.iviewui.com/" target="_blank">iView</a>. The backend is written in Python, using <a href="http://flask.pocoo.org/" target="_blank">Flask</a> as framework to serve index.html which contains my Vue.js app. Flask has API endpoints to help access from SPA. The back-end data is stored in <a href="https://docs.python.org/2/library/sqlite3.html" target="_blank">sqlite3</a>, a built-in module available in Python. <br> To get the complete source code and steps to set the environments and start the application, please visit <a href="https://github.com/heaventourist/security_intelligence" target="_blank">my github</a>.`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
