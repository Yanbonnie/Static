/*
 * 定义符合requirejs规范的模块
 * 引入模块的回调函数中得到什么，就return什么
 */
    var Com = {
        /**
         * @desc 生成带图标的弹框
         * @function $toast
         * @param option
         * 1.text[String]
         * 2.type[String]
         *    -success|loading|fail
         * 3.duration[Number]
         * 4.callBack[Function]   
         */
        $toast: function (option) {
            var defaults = {
                text: '',
                type: 'success',
                duration: 1500,
                callBack: function () {
                    console.log('toast CB')
                }
            }
            var params = $.extend(defaults, option)
            var Timer = null;
            /**
             * @desc toast初始化
             * @function initToast
             */
            function initToast() {
                var toast = $('.toast');
                if (toast.length == 0) {  //页面不存在结构
                    var toast_html = '<div class="toast">'+
                        '<div class="toast-wrap">'+
                            '<div class="toast-content icon-'+params.type+'"></div>'+
                            '<div class="toast-text">'+params.text+'</div>'+
                        '</div>'+
                    '</div>';
                    $('body').append(toast_html);
                } else {
                    toast.find('.toast-content').removeClass().addClass('toast-content toast-' + params.type)
                    toast.find('.toast-text').text(params.text)
                    toast.show();
                }

                if (params.type != 'loading' || option.duration) {   //不是loading或者传入了duration都有关闭
                    Timer = setTimeout(function () {
                        $('.toast').hide()
                        if (params.callBack) {
                            params.callBack()
                        }
                    }, params.duration)
                }
            }
            initToast()
        },
        /**
         * @desc 生成不带icon的提示框，可以自定义y轴的位置
         * @function $easyToast
         * @param option
         * 1.position[Object|string]
         *      String(center)
         *      Object({y:2}) 
         * 2.text[String]
         * 3.duration[Number]
         */
        $easyToast:function(option){
            var defaults = {
                position: 'center',
                text: 'easyToast',
                duration: 1500
            }
            // 扩展默认参数
            var params = $.extend({},defaults,option);
            var position = params.position;
            var duration = params.duration;
            var x , y;
            function initEasyToast(){                
                var easyToast_html = '<div class="easy-toast">'+params.text+'</div>';
                $('body').append(easyToast_html);
                $('.easy-toast').fadeIn()
                var ele = $('.easy-toast');
                var windowW = $(window).width();
                var windowH = $(window).height();
                var eleW = $('.easy-toast')[0].offsetWidth;
                var eleH =$('.easy-toast')[0].offsetHeight;

                if(position === 'center'){                    
                    y = (window.innerHeight - eleH)/2;
                }else if(typeof position === 'object'){
                    y = Number(position.y)
                }
                x = (window.innerWidth - eleW)/2;
                ele.css({
                    left:x+'px',
                })
                if (y<0) {
                    ele.css({
                        bottom:(-y) + (position == 'center'? 'px' : 'rem')
                    })
                } else {
                    ele.css({
                        top:y + (position == 'center'? 'px' : 'rem')
                    })
                }
                setTimeout(function(){
                    ele.remove(); 
                },params.duration)
            }
            initEasyToast();
        },
        /**
         * @desc 生成模态对话框
         * @function $msgBox
         * @param option
         * 1.text[String]
         * 2.cancelText[String]
         * 3.confirmText[String]  
         * 4.btnNum[Number] 
         * 5.callBack[Function]
         */
        $dialog: function (option) {
            var defaults = {
                text: '',
                cancelText: '取消',  // 否定文本
                sureText: '确定', // 肯定文本
                btnNum: 2,
                column:false,        //按钮是否是垂直排列  true-是  false-否
                callBack: function () {
                    console.log('确定')
                }
            }
            var params = $.extend(defaults, option)
            /**
             * @desc messageBox初始化
             * @function initMsgBox
             */
            function initMsgBox() {
                    var btn_html = params.btnNum == 1 ? '<a href="javascript:;" class="cancelBtn">'+params.sureText+'</a>' : '<a href="javascript:;" class="sureBtn">'+params.sureText+'</a><a href="javascript:;" class="cancelBtn">'+params.cancelText+'</a>'
                    var msgBox_html = '<div class="dialogBox">'+
                    '<div class="dialogContent">'+
                        '<div class="title">'+
                            '<p>'+params.text+'</p>'+
                        '</div>'+
                        '<div>'+
                            btn_html
                        '</div>'+
                    '</div>'+
                '</div>';
                $('body').append(msgBox_html);
            }
            /**
             * @desc messageBox初始化事件侦听函数
             * @function initMsgEvent
             */
            function initMsgEvent(){
                $('.dialogBox .cancelBtn').click(function () {
                    $('.dialogBox').remove()
                })
                $('.dialogBox .sureBtn').click(function () {
                    params.callBack()
                    $('.dialogBox').remove()
                })
            }
            initMsgBox();
            initMsgEvent();
        }        
    }