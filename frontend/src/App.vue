<template>
  <div class="layout">
    <Layout>
      <Header class="layout-header">
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-nav">
            <MenuItem name='1' to="/">
              <Icon type='md-home' v-html="menuLabel1" id="menu-1"/>
            </MenuItem>
            <MenuItem name='2' to="/about">
              <Icon type='ios-paper' v-html="menuLabel2" id="menu-2"/>
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Content class="layout-content">
        <router-view></router-view>
      </Content>
      <Footer class="layout-footer-center" v-html="footer"></Footer>
    </Layout>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      menuLabel1: '<span>Home</span>',
      menuLabel2: '<span>About</span>',
      startYear: '2018',
      endYear: '2020',
      author: 'Wei Huo'
    }
  },
  computed: {
    footer: function () {
      return this.startYear + '-' + this.endYear + ' &copy ' + this.author
    }
  }
}

</script>

<style scoped>
  .layout{
      border: 1px solid #d7dde4;
      background: #f5f7f9;
      position: relative;
      border-radius: 4px;
      overflow: hidden;
  }
  .layout-nav{
      width: 420px;
      margin: 0 auto;
  }
  .layout-footer-center{
      text-align: center;
  }
  .layout-content{
    margin-top: 88px;
    margin-down: 20px;
    margin-left: 20px;
    margin-right: 20px;
    background: #fff;
    min-height: 500px
  }
  .layout-header{
    position: fixed;
    width: 100%
  }
</style>
