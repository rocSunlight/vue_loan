<template>
  <jroll-infinite class="jp-control">
    <ul class="mui-table-view show">
      <li class="mui-table-view-cell" v-for="item in info">
        <div class="title">
          <div class="titles">
            <img width="40" height="40" :src="type[item.c_id].img" :alt="type[item.c_id].name">
            <span class="name" v-text="type[item.c_id].name"></span>
            <span class="mui-badge red" v-text="status[item.status]" ></span>
          </div>
        </div>
        <ul class="list-data">
          <li>
            <span class="data-title">任务返利</span>
            <span class="datas"><span class="red">120.00</span>元</span>
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
  import {formatDate} from '../../../static/js/date'

  const _this = {} //用于储存vue数据的this
  const _page3 = 2
  export default {
    data(){
      return {
        token1: JSON.parse(localStorage.user),
        info: [],
        type: [],
        status:[],
        total_page : '',
        operation: ''
      }
    },
    created(){
      _this = this
      this.$http.get('api/user/task/status/1', {params: {token: this.token1.token}}).then(response => {
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
        tip: '<div class="loadhide"><img src="../../../static/image/006.gif">正在加载...</img></div> ',
        bottomed: function () {
          var me = this
          var page = _this.total_page  //获取后台传来的数据页数
          var token = _this.token1.token
          if (_page3 < page) {
            _this.$http.get('api/user/task/status/1', {params: {token: _this.token1.token,p:_page3}}).then(response => {
              $('.loadhide').addClass('loadshow') //显示加载
              setTimeout(function () {
                _page3++ // 请求成功将page加1，失败则不要改变page
                var jons = response.body.list
                _this.info = _this.info.concat(jons)
                if (_page3 === page) {
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

