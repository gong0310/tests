(function(window, document) {
    'use strict';
    var hotcss = {};
    (function() {
        var viewportEl = document.querySelector('meta[name="viewport"]'),
        hotcssEl = document.querySelector('meta[name="hotcss"]'),
        dpr = window.devicePixelRatio || 1,
        maxWidth = 750,
        designWidth = 0;
        dpr = dpr >= 3 ? 3 : dpr >= 2 ? 2 : 1;
        //允许通过自定义name为hotcss的meta头，通过initial-dpr来强制定义页面缩放
        if (hotcssEl) {
            var hotcssCon = hotcssEl.getAttribute('content');
            if (hotcssCon) {
                var initialDprMatch = hotcssCon.match(/initial\-dpr=([\d\.]+)/);
                if (initialDprMatch) {
                    dpr = parseFloat(initialDprMatch[1]);
                }
                var maxWidthMatch = hotcssCon.match(/max\-width=([\d\.]+)/);
                if (maxWidthMatch) {
                    maxWidth = parseFloat(maxWidthMatch[1]);
                }
                var designWidthMatch = hotcssCon.match(/design\-width=([\d\.]+)/);
                if (designWidthMatch) {
                    designWidth = parseFloat(designWidthMatch[1]);
                }
            }
        }
        document.documentElement.setAttribute('data-dpr', dpr);
        hotcss.dpr = dpr;
        document.documentElement.setAttribute('max-width', maxWidth);
        hotcss.maxWidth = maxWidth;
        if (designWidth) {
            document.documentElement.setAttribute('design-width', designWidth);
            hotcss.designWidth = designWidth;
        }
        var scale = 1 / dpr,
        content = 'width=device-width, initial-scale=' + scale + ', minimum-scale=' + scale + ', maximum-scale=' + scale + ', user-scalable=no';
        if (viewportEl) {
            viewportEl.setAttribute('content', content);
        } else {
            viewportEl = document.createElement('meta');
            viewportEl.setAttribute('name', 'viewport');
            viewportEl.setAttribute('content', content);
            document.head.appendChild(viewportEl);
        }
    })();

    hotcss.px2rem = function(px, designWidth) {
        if (!designWidth) {
            designWidth = parseInt(hotcss.designWidth, 10);
        }
        return (parseInt(px, 10) * 750) / designWidth / 100;
    };
    hotcss.rem2px = function(rem, designWidth) {
        if (!designWidth) {
            designWidth = parseInt(hotcss.designWidth, 10);
        }
        return (rem * 100 * designWidth) / 750;
    };
    hotcss.mresize = function() {
        //给HTML设置font-size。
        var innerWidth = document.documentElement.getBoundingClientRect().width || window.innerWidth;

        if (hotcss.maxWidth && innerWidth / hotcss.dpr > hotcss.maxWidth) {
            innerWidth = hotcss.maxWidth * hotcss.dpr;
        }
        if (!innerWidth) {
            return false;
        }

        document.documentElement.style.fontSize = (innerWidth * 100) / 750 + 'px'; //设计尺寸750 根元素为100px  便于计算
        hotcss.callback && hotcss.callback();
    };
    hotcss.mresize();
    //直接调用一次
    window.addEventListener(
        'resize',
        function() {
            clearTimeout(hotcss.tid);
            hotcss.tid = setTimeout(hotcss.mresize, 33);
        },
        false
    );
    window.addEventListener('load', hotcss.mresize, false);
    setTimeout(function() {
        hotcss.mresize();
    }, 333);
    window.hotcss = hotcss;
})(window, document);

//重写alert
var alert = function(msg,Func){
    if(typeof(Func)!="undefined"){
        $(document.body).append('<div class="weui_dialog_alert"><div class="weui_mask"></div><div class="weui_dialog"><div class="weui_dialog_hd"><strong class="weui_dialog_title">提示</strong></div><div class="weui_dialog_bd">'+msg+'</div><div class="weui_dialog_ft"><a href="javascript:$(\'.weui_dialog_alert\').remove();" class="weui_btn_dialog primary">确定</a></div></div></div>');
        $('.weui_btn_dialog').click(function() {
            Func()
        });
    }else{
        $(document.body).append('<div class="weui_dialog_alert"><div class="weui_mask"></div><div class="weui_dialog"><div class="weui_dialog_hd"><strong class="weui_dialog_title">提示</strong></div><div class="weui_dialog_bd">'+msg+'</div><div class="weui_dialog_ft"><a href="javascript:$(\'.weui_dialog_alert\').remove();" class="weui_btn_dialog primary">确定</a></div></div></div>');
    }
}
//loadding
function loadding(msg){
    if(msg == false){
        $('.loading-data').remove();
    }else{
        $(document.body).append('<div class="loading-data"><div class="loading-main"><div class="weui_loading"><div class="weui_loading_leaf weui_loading_leaf_0"></div><div class="weui_loading_leaf weui_loading_leaf_1"></div><div class="weui_loading_leaf weui_loading_leaf_2"></div><div class="weui_loading_leaf weui_loading_leaf_3"></div><div class="weui_loading_leaf weui_loading_leaf_4"></div><div class="weui_loading_leaf weui_loading_leaf_5"></div><div class="weui_loading_leaf weui_loading_leaf_6"></div><div class="weui_loading_leaf weui_loading_leaf_7"></div><div class="weui_loading_leaf weui_loading_leaf_8"></div><div class="weui_loading_leaf weui_loading_leaf_9"></div><div class="weui_loading_leaf weui_loading_leaf_10"></div><div class="weui_loading_leaf weui_loading_leaf_11"></div></div><div class="loading-text">'+msg+'</div></div></div>');
    }
}
function setCookie(c_name,value,expiredays){
    expiredays = expiredays?expiredays:86400;
    var exdate=new Date()
    exdate.setDate(exdate.getDate()+expiredays)
    document.cookie=c_name+ "=" +escape(value)+
    ((expiredays==null) ? "" : ";expires="+exdate.toGMTString()+";path=/")
}

function getCookie(c_name){
    if (document.cookie.length>0)
      {
      c_start=document.cookie.indexOf(c_name + "=")
      if (c_start!=-1)
        { 
        c_start=c_start + c_name.length+1 
        c_end=document.cookie.indexOf(";",c_start)
        if (c_end==-1) c_end=document.cookie.length
        return unescape(document.cookie.substring(c_start,c_end))
        } 
      }
    return ""
}
//验证手机
function isPoneAvailable(str) {
    var myreg=/^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (!myreg.test(str)) {
        return false;
    } else {
        return true;
    }
}
// 跨域下载图片
var downLoadImg = function (url,func) {
    var httpRequest = null;
    if (window.XMLHttpRequest){ // 除了IE外的其它浏览器
        httpRequest = new XMLHttpRequest();
    }else{
        httpRequest = new ActiveXObject("MsXml2.XmlHttp");
    }
    httpRequest.responseType = "blob";
    httpRequest.onreadystatechange = function(){
        if ( httpRequest.readyState == 4 ){
            if ( httpRequest.status == 200){
                var value = this.response;
                // var blob = window.URL.createObjectURL(value);
                var reader = new window.FileReader();
                reader.readAsDataURL(value);
                reader.onloadend = function() {
                    var base64data = reader.result;
                    if (func){
                        func(base64data);
                    }
                };
            }
        }
    };
    httpRequest.open('GET', url, true); 
    httpRequest.send(null);
};

Vue.component('pubPop', {
    name: 'pubPop',
    props: {
        showPop: {
            default : false
        },
        showClose: {
            default : true
        },
        showOverlay: {
            default : false
        }
    },
    data: function () {
        return {
            isShow: false
        }
    },
    template: `
        <transition
            name="pop"
            @after-enter="afterEnter"
            @after-leave="afterLeave"
            @before-leave="beforeLeave"
        >
            <div class="pop" @click="popHandel" v-if="showPop" :class="{'show' : isShow}">
                <div class="pop-content">
                    <div class="pop-close" @click="popClose" v-if="showClose"></div>
                    <slot></slot>
                </div>
                <div class="pop-overlay" v-if="showOverlay" @click="popClose"></div>
            </div>
        </transition>
    `,
    methods: {
		popHandel:function(){
			this.$emit('pop-handel');
		},
        popClose: function(){
            this.isShow = false;
            this.$emit('pop-close');
        },
        afterEnter: function(){
            this.isShow = true;
            this.$emit('afterenter');
        },
        afterLeave: function(){
            this.$emit('afterleave');
        },
        beforeLeave: function(){}
    },
    mounted(){
        
    }
});
Vue.component('pubBtn', {
    name: 'pubBtn',
    props: {
        imgSrc: '',
        label: {
            default: ''
        },
        height: '',
        width: '',
        isDisable: {
            default: false
        },
    },
    data: function(){
        return {
            isTap: false
        }
    },
    template: `
        <div class="btn" :class="[label !== '' ? 'txt-btn' : 'img-btn', {'press' : isTap, 'disabled' : isDisable}]" :style="{'minWidth' : width}" @touchstart="btnTouchstart" @touchend="btnTouchend" @click="btnClick">
            <span v-if="label === ''"><img :src="imgSrc" alt="" :style="{'height' : height}" /></span>
            <span v-else v-html="label"></span>
        </div>
    `,
    methods: {
        btnClick: function() {
            this.$emit('btn-click');
        },
        btnTouchstart: function(){
            if(!this.isDisable)
                this.isTap = true
        },
        btnTouchend: function(){
            this.isTap = false
        },
    }
});

Vue.component('scroll', {
    name: 'scroll',
    props: {
        selfName: {
            default: ''
        },
        full: {
            default: false
        },
        barhide: {
            default: false
        }
    },
    data: function(){
        return {
            swiperObg: null,
        }
    },
    template: `
        <div class="swiper-container swiper-scroll" :class="['swiper-scroll-' + selfName, {'full' : full}]">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <slot></slot>
                </div>
            </div>
            <div class="swiper-scrollbar"></div>
        </div>
    `,
    methods: {
        
    },
    mounted(){
        var that = this;
        setTimeout(function(){
            if(that.swiperObg === null){
                that.swiperObg = new Swiper('.swiper-scroll-' + that.selfName, {
                    scrollbar: '.swiper-scroll-'+ that.selfName +' .swiper-scrollbar',
                    direction: 'vertical',
                    slidesPerView: 'auto',
                    freeMode: true,
                    observer: true,
                    nested: true,
                    scrollbarHide: that.barhide,
                    onTransitionEnd: function(swiper){
                        if(swiper.isEnd){
                            that.$emit('swiper-update',swiper);
                        }
                    }
                });
                //alert('')
            }
        },100);
    }
});

