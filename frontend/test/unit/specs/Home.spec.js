import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import axios from 'axios'
import Home from '@/components/Home'
import flushPromises from "flush-promises"

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.prototype.$http = axios

let m_url = ''
let m_data = ''


const mockHttp1 = {
  get: (_url, _data) => {
    return new Promise((resolve, reject) => {
      m_url = _url
      m_data = _data
      resolve({'data': {'code': 0, 'content': [{'vuln_id': 'a1', 'summary': 'b1',
                'cvss_severity': 'c1', 'product_name': 'd1', 'vendor_name': 'e1'},
                {'vuln_id': 'a2', 'summary': 'b2',
                'cvss_severity': 'c2', 'product_name': 'd2', 'vendor_name': 'e2'},
                {'vuln_id': 'a3', 'summary': 'b3',
                'cvss_severity': 'c3', 'product_name': 'd3', 'vendor_name': 'e3'}]}})
    })
  },
  post: (_url, _data) => {
    return new Promise((resolve, reject) => {
      m_url = _url
      m_data = _data
      resolve({'data': {'code': 0, 'content': search(Object.keys(m_data)[0], Object.values(m_data)[0])}})
    })
  }
}

const mockHttp2 = {
  get: (_url, _data) => {
    return new Promise((resolve, reject) => {
      m_url = _url
      m_data = _data
      resolve({'data': {'code': 1, 'content': []}})
    })
  }
}

describe('Home.vue', () => {
  it('when data is not available', async function () {
    this.timeout(10000)
    const wrapper = mount(Home, {
      localVue,
      mocks: {
        $http: mockHttp2
      }
    })
    let value = {
      no_data_text: 'no data msg'
    }
    await flushPromises()
    wrapper.setData(value)
    expect(wrapper.find('td > span').isVisible()).to.equal(true)
    expect(wrapper.find('td > span').text()).to.equal(value.no_data_text)
    // console.log(wrapper.find('Table').text())
  })

  it('when data is available', async function () {
    this.timeout(10000)
    const wrapper = mount(Home, {
      localVue,
      mocks: {
        $http: mockHttp1
      }
    })
    let value = {
      no_data_text: 'no data msg'
    }
    wrapper.setData(value)
    await flushPromises()
    expect(wrapper.findAll('td > div > span').length).to.equal(15)
    expect(wrapper.find('td > span').isVisible()).to.equal(false)
  })

  it('select query is working', async function () {
    this.timeout(10000)
    const wrapper = mount(Home, {
      localVue,
      mocks: {
        $http: mockHttp1
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
            await this.$http.post(url, params
            ).then((response) => {
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
        }
      }
    })
    await flushPromises()
    wrapper.setData({search_type: 'vuln_id', query: 'a2'})
    wrapper.vm.search_submit()
    await flushPromises()
    expect(wrapper.findAll('td > div > span').length).to.equal(5)
    expect(wrapper.find('td > span').isVisible()).to.equal(false)
  })

  it('table content is correct', function () {
    this.timeout(10000)
    const wrapper = mount(Home, {
      localVue,
      mocks: {
        $http: mockHttp2
      }
    })
    expect(wrapper.find('td > span').isVisible()).to.equal(true)
    wrapper.setData({data_in_total: [{'vuln_id': 'a', 'summary': 'b',
      'cvss_severity': 'c', 'product_name': 'd', 'vendor_name': 'e'}]})
    // console.log(wrapper.findAll('td > span'))
    expect(wrapper.findAll('td > div > span').length).to.equal(5)
    expect(wrapper.find('td > span').isVisible()).to.equal(false)
  })

  it('input is working correctly', function () {
    this.timeout(10000)
    const wrapper = mount(Home, {
      localVue,
      mocks: {
        $http: mockHttp2
      }
    })
    const input = wrapper.find('.queryInput > input')
    input.element.value = '100'
    input.trigger('input')
    expect(wrapper.vm.query).to.equal('100')
  })

})

// simulate the database
function search (m_searchtype, m_query) {
  let tmp_data = [{'vuln_id': 'a1', 'summary': 'b1',
        'cvss_severity': 'c1', 'product_name': 'd1', 'vendor_name': 'e1'},
        {'vuln_id': 'a2', 'summary': 'b2',
        'cvss_severity': 'c2', 'product_name': 'd2', 'vendor_name': 'e2'},
        {'vuln_id': 'a3', 'summary': 'b3',
        'cvss_severity': 'c3', 'product_name': 'd3', 'vendor_name': 'e3'}]
  let res = tmp_data.reduce(function (x, y) {
    if (y[m_searchtype] == m_query) {
      return x.concat([y])
    } else {
      return x
    }
  }, [])
  return res
}
