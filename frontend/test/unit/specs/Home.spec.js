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
      resolve({'data': {'code': 0, 'content': [{'vuln_id': 'a', 'summary': 'b',
                'cvss_severity': 'c', 'product_name': 'd', 'vendor_name': 'e'}]}})
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
  it('error msg correctly rendered', () => {
    const wrapper = mount(Home, {
      localVue,
      mocks: {
        $http: mockHttp2
      }
    })
    expect(wrapper.find('.alert').exists()).to.equal(false)
    wrapper.setData({error: true})
    expect(wrapper.find('.alert').exists()).to.equal(true)
  })

  it('when data is not available', async () => {
    const wrapper = mount(Home, {
      localVue,
      mocks: {
        $http: mockHttp2
      }
    })
    var value = {
      my_col: [],
      no_data_text: 'no data msg'
    }
    wrapper.setData(value)
    await flushPromises()
    expect(wrapper.find('.table').text()).to.equal(value.no_data_text)
    console.log(wrapper.find('.table').text())
  })

  it('when data is available', async () => {
    const wrapper = mount(Home, {
      localVue,
      mocks: {
        $http: mockHttp1
      }
    })
    var value = {
      my_col: [],
      no_data_text: 'no data msg'
    }
    wrapper.setData(value)
    console.log(wrapper.find('.table').html())
    await flushPromises()
    console.log(wrapper.find('.table').html())
    expect(wrapper.find('.table').text()).to.not.equal(value.no_data_text)
  })
})
