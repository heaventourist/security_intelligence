<template>
  <div class="home">
    <Row type="flex" justify="end">
      <Col span="3">
        <Select v-model="search_type" placeholder="Select Search Type">
          <Option v-for="item in searchTypeList" :value="item.value" :key="item.value"></Option>
        </Select>
      </Col>
      <Col span="4">
        <Input search @on-search="search_submit" v-model="query" placeholder="Enter your query..." />
      </Col>
    </Row>
    <Row>
      <Alert banner closable type="warning" v-if="error" class='alert'>{{errorMsg}}</Alert>
    </Row>
    <Row>
      <Table stripe :loading="loading" :columns="my_col" :data="my_data" :no-data-text="no_data_text" class='table'></Table>
    </Row>
    <Row type="flex" justify="center">
      <Page :current="page_num" :total="page_total" :page-size="page_size" show-total show-sizer @on-change="handle_page" @on-page-size-change="handle_page_size"/>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      my_col: [
        {
          title: 'Vulnerability ID',
          key: 'vuln_id',
          width: 200,
          align: 'center'
        },
        {
          title: 'Summary',
          key: 'summary',
          align: 'center'
        },
        {
          title: 'CVSS Severity',
          key: 'cvss_severity',
          width: 200,
          align: 'center'
        },
        {
          title: 'Product Name',
          key: 'product_name',
          width: 200,
          align: 'center'
        },
        {
          title: 'Vendor Name',
          key: 'vendor_name',
          width: 200,
          align: 'center'
        }],
      searchTypeList: [
        {
          value: 'vuln_id',
          label: 'vuln_id'
        },
        {
          value: 'product_name',
          label: 'product_name'
        },
        {
          value: 'vendor_name',
          label: 'vendor_name'
        }
      ],
      data_in_total: [],
      error: false,
      loading: false,
      search_type: '',
      query: '',
      page_num: 1,
      page_size: 10,
      errorMsg: 'Notice: Content Acquisition Failed...',
      no_data_text: 'No Data Available'
    }
  },

  computed: {
    my_data: function () {
      var dataSize = this.data_in_total.length
      var start = (this.page_num - 1) * this.page_size
      var end = this.page_num * this.page_size
      if (end > dataSize) {
        return this.data_in_total.slice(start)
      } else {
        return this.data_in_total.slice(start, end)
      }
    },

    page_total: function () {
      var dataSize = this.data_in_total.length
      return Math.ceil(dataSize / this.page_size)
    }
  },

  methods: {
    async search_submit () {
      console.log('clicked')
      var url = ''
      var params = {}
      this.loading = true
      if (this.search_type === 'vuln_id') {
        url = '/search_by_vuln_id'
        params['vuln_id'] = this.query.trim()
      } else if (this.search_type === 'product_name') {
        url = '/search_by_product_name'
        params['product_name'] = this.query.trim()
      } else if (this.search_type === 'vendor_name') {
        url = '/search_by_vendor_name'
        params['vendor_name'] = this.query.trim()
      }
      console.log(params)
      if (url !== '') {
        await this.$http({method: 'get',
          url: url,
          params: params
        }).then((response) => {
          console.log(response)
          var data = response['data']
          if (data['code'] === 0) {
            this.data_in_total = data['content']
            console.log('success')
          } else {
            this.error = true
            console.log('fail')
          }
          this.loading = false
        }).catch(function (error) {
          console.log(error)
          this.loading = false
        })
      } else {
        this.loading = false
      }
    },

    handle_page: function (value) {
      this.page_num = value
    },

    handle_page_size: function (value) {
      this.page_size = value
    }
  },
  created () {
    this.$http.get('/fetch_all').then((response) => {
      var tmpData = response['data']
      if (tmpData['code'] === 0) {
        this.data_in_total = tmpData['content']
        console.log('success')
      } else {
        this.error = true
        console.log('fail')
      }
    }).catch(function (error) {
      console.log(error)
    })
    this.loading = false
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
