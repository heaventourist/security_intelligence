<template>
  <div id="app" class="layout">
    <Layout>
      <Header :style="{position: 'fixed', width: '100%'}">
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-nav">
            <MenuItem name="1">
              <router-link to="/" exact tag='li'>
                <Icon type="ios-stats" />
                    Home
              </router-link>
            </MenuItem>
            <MenuItem name="2">
                <router-link to="/about" exact tag='li'>
                    <Icon type="ios-paper" />
                    About
                </router-link>
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Content :style="{margin: '88px 20px 0', background: '#fff', minHeight: '500px'}">
        <router-view></router-view>
      </Content>
      <Footer class="layout-footer-center">2018-2020 &copy; Wei Huo</Footer>
    </Layout>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
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
</style>
