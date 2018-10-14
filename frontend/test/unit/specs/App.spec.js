import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import axios from 'axios'
import App from '@/App.vue'
import About from '@/components/About'
import Home from '@/components/Home'
import he from 'he'
import flushPromises from "flush-promises"

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.prototype.$http = axios

let m_url = ''
let m_data = ''

const mockHttp = {
  get: (_url, _data) => {
    return new Promise((resolve, reject) => {
      m_url = _url
      m_data = _data
      resolve({'data': {'code': 1}})
    })
  }
}

const routes = [
  {path: '/', component: Home},
  {path: '/about', component: About}
]

describe('App.vue', () => {
  it('data correctly rendered', () => {
    const wrapper = shallowMount(App, {
      localVue,
      data () {
        return {
          menuLabel1: 'test-label-1',
          menuLabel2: 'test-label-2',
          startYear: 'test-start-year',
          endYear: 'test-end-year',
          author: 'test-author'
        }
      }
    })
    expect(wrapper.find('#menu-1').text()).to.equal('test-label-1')
    expect(wrapper.find('#menu-2').text()).to.equal('test-label-2')
    expect(wrapper.find('.layout-footer-center').text()).to.equal(he.decode('test-start-year-test-end-year &copy test-author'))
  })

  it('router-link is working', function() {
    this.timeout(10000)
    const router = new VueRouter({routes})
    const wrapper = mount(App, {
      localVue,
      router,
      stubs: ['MenuItem'], // MenuItem caused stack-overflow for some uncertain reason, stub out
      mocks: {
        $http: mockHttp
      }
    })
    router.push('/')
    expect(wrapper.find({name: 'Home'}).exists()).to.equal(true)
    expect(wrapper.find({name: 'About'}).exists()).to.equal(false)
    router.push('/about')
    expect(wrapper.find({name: 'Home'}).exists()).to.equal(false)
    expect(wrapper.find({name: 'About'}).exists()).to.equal(true)
  })
})
