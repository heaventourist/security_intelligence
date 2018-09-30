<template>
  <div class="About">
    <h1> About The Webpage </h1>
    <p> This webpage is built to help visualize a security intelligence data feed from <a href="https://nvd.nist.gov/vuln/data-feeds" target="_blank">National Vulnerability Database</a>. The front-end is written in <a href="https://vuejs.org/v2/guide/index.html" target="_blank">Vue</a>, with UI components patched in from <a href="https://www.iviewui.com/" target="_blank">iView</a>. The backend is written in Python, using <a href="http://flask.pocoo.org/" target="_blank">Flask</a> as framework. The back-end data in store in <a href="https://docs.python.org/2/library/sqlite3.html" target="_blank">sqlite3</a>, a builtin module in Python.</p>
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
