<template>
  <div class="About">
    <Card dis-hover>
        <p slot="title"><Icon type="md-podium"></Icon> About The Webpage</p>
        <p> This webpage is built to help visualize a security intelligence data feed from <a href="https://nvd.nist.gov/vuln/data-feeds" target="_blank">National Vulnerability Database</a>. The front-end of this webpage is written in <a href="https://vuejs.org/v2/guide/index.html" target="_blank">Vue.js</a>, with UI components patched in from <a href="https://www.iviewui.com/" target="_blank">iView</a>. The backend is written in Python, using <a href="http://flask.pocoo.org/" target="_blank">Flask</a> as framework. The back-end data is stored in <a href="https://docs.python.org/2/library/sqlite3.html" target="_blank">sqlite3</a>, a builtin module available in Python.</p>
        <p>To get the complete source code, please visit <a href="https://github.com/heaventourist/security_intelligence" target="_blank">my github</a>.</p>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'About',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
