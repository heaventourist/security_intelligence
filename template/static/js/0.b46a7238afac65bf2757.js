webpackJsonp([0],{j8oL:function(e,t){},lO7g:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={name:"Home",data:function(){return{my_col:[{title:"Vulnerability ID",key:"vuln_id",width:200,align:"center"},{title:"Summary",key:"summary",align:"center"},{title:"CVSS Severity",key:"cvss_severity",width:200,align:"center"},{title:"Product Name",key:"product_name",width:200,align:"center"},{title:"Vendor Name",key:"vendor_name",width:200,align:"center"}],searchTypeList:[{value:"vuln_id",label:"vuln_id"},{value:"product_name",label:"product_name"},{value:"vendor_name",label:"vendor_name"}],data_in_total:[],error:!1,loading:!1,search_type:"",query:"",page_num:1,page_total:1,page_size:10}},computed:{my_data:function(){var e=this.data_in_total.length,t=(this.page_num-1)*this.page_size,a=this.page_num*this.page_size;return a>e?this.data_in_total.slice(t):this.data_in_total.slice(t,a)}},methods:{search_submit:function(e){var t=this;console.log("clicked");var a="",n={};this.loading=!0,"vuln_id"===this.search_type?(a="/search_by_vuln_id",n.vuln_id=this.query.trim()):"product_name"===this.search_type?(a="/search_by_product_name",n.product_name=this.query.trim()):"vendor_name"===this.search_type&&(a="/search_by_vendor_name",n.vendor_name=this.query.trim()),console.log(n),""!==a&&this.$http({method:"get",url:a,params:n}).then(function(e){console.log(e);var a=e.data;0===a.code?(t.data_in_total=a.content,t.page_total=a.content.length,console.log(t.page_total),console.log("success")):(t.error=!0,console.log("fail"))}).catch(function(e){console.log(e)}),this.loading=!1},handle_page:function(e){this.page_num=e},handle_page_size:function(e){this.page_size=e}},created:function(){var e=this;this.$http.get("/fetch_all").then(function(t){var a=t.data;0===a.code?(e.data_in_total=a.content,e.page_total=a.content.length,console.log(e.page_total),console.log("success")):(e.error=!0,console.log("fail"))}).catch(function(e){console.log(e)}),this.loading=!1}},o={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("Row",{attrs:{type:"flex",justify:"end"}},[a("Col",{attrs:{span:"3"}},[a("Select",{attrs:{placeholder:"Select Search Type"},model:{value:e.search_type,callback:function(t){e.search_type=t},expression:"search_type"}},e._l(e.searchTypeList,function(e){return a("Option",{key:e.value,attrs:{value:e.value}})}))],1),e._v(" "),a("Col",{attrs:{span:"4"}},[a("Input",{attrs:{search:"",placeholder:"Enter your query..."},on:{"on-search":e.search_submit},model:{value:e.query,callback:function(t){e.query=t},expression:"query"}})],1)],1),e._v(" "),a("Row",[e.error?a("Alert",{attrs:{banner:"",closable:"",type:"warning"}},[e._v("Notice: Content Acquisition Failed...")]):e._e()],1),e._v(" "),a("Row",[a("Table",{attrs:{stripe:"",loading:e.loading,columns:e.my_col,data:e.my_data,"no-data-text":"No Data Available"}})],1),e._v(" "),a("Row",{attrs:{type:"flex",justify:"center"}},[a("Page",{attrs:{current:e.page_num,total:e.page_total,"page-size":e.page_size,"show-total":"","show-sizer":""},on:{"on-change":e.handle_page,"on-page-size-change":e.handle_page_size}})],1)],1)},staticRenderFns:[]};var l=a("VU/8")(n,o,!1,function(e){a("j8oL")},"data-v-9ccfced2",null);t.default=l.exports}});
//# sourceMappingURL=0.b46a7238afac65bf2757.js.map