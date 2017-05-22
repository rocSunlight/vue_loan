<template>
    <jroll-infinite class="jp-control">
        <ul class="mui-table-view show">
          <li class="mui-table-view-cell" v-for="item in info">
            <div class="title">
              <div class="titles">
                <img width="40" height="40" :src="'http://'+$store.state.urlIp+'/'+item.c_img" :alt="type[item.c_id].name">
                <span class="name" v-text="type[item.c_id].name"></span>
                <span class="mui-badge " v-text="status[item.status]" :class="{red:item.status==2 || item.status==1, green : item.status==3, yellow : item.status==0}"></span>
              </div>
            </div>
            <ul class="list-data">
              <li>
                <span class="data-title">任务返利</span>
                <span class="datas"><span class="red">{{item.money}}</span>元</span>
              </li>
              <li class="icon-list">
                <span class="data-title">报单人</span>
                <span class="datas">{{item.name}} {{item.phone}}</span>
                <router-link :to="{ name: 'Dotask2', params: { userId: item.id }}" >查看</router-link>
              </li>
              <li>
                <span class="data-title">报单时间</span>
                <span class="datas" >{{item.add_time | formatDate}}</span>
              </li>
            </ul>
          </li>

        </ul>
    </jroll-infinite>

</template>

<script type="text/ecmascript-6">
  //formatDate时间戳转换
  import {formatDate} from '../../style/js/time'

  var _this = {} //用于储存vue数据的this
  var _page = 2
  export default {
    name : 'taskall',
    data(){
      return {
        token1:this.$store.state.user.token,
        info: [],
        type: [],
        status:[],
        total_page : '',
        operation: ''
      }
    },
    created(){
      _this = this
      this.$http.get('http://'+this.$store.state.urlIp+'/api/user/task', {params: {token: this.token1}}).then(response => {

        this.info = response.body.list
        this.type = response.body.c_name
        this.total_page = response.body.t_page
        this.status = response.body.status_arr
      })
    },
    filters: {
      formatDate(time) {
        let date = new Date(parseInt(time)*1000);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
      }
    },
    components: {
      'jroll-infinite': JRoll.VueInfinite({
        tip: '<div class="loadhide"><img src="./static/image/006.gif">正在加载...</img></div> ',
        bottomed: function () {
          var me = this
          var page = _this.total_page  //获取后台传来的数据页数
          var token = _this.token1
          if (_page < page) {
            _this.$http.get('http://'+this.$store.state.urlIp+'/api/user/task', {params: {token: _this.token1,p:_page}}).then(response => {
              $('.loadhide').addClass('loadshow') //显示加载
              setTimeout(function () {
                _page++ // 请求成功将page加1，失败则不要改变page
                var jons = response.body.list
                _this.info = _this.info.concat(jons)
                if (_page === page) {
                  me.tip = '已全部加载完成'
                }
              })
            })
          }

        }
      }, {
        scrollBarY: true,
        bounce :false,
        scrollBarFade:true
      })
    }
  }


</script>

