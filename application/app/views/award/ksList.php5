<html>
    <head>
        <meta charset="utf-8">
        <meta name="author" content="weblol">
        <meta name="format-detection" content="telephone=no">
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,minimal-ui">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
        <meta name="apple-mobile-web-app-title" content="166彩票">
        <meta content="telephone=no" name="format-detection"> 
        <meta content="email=no" name="format-detection">
        <title>历史开奖</title>
        <link rel="stylesheet" href="<?php echo getStaticFile('/caipiaoimg/static/css/cpui.min.css');?>">
        <link rel="stylesheet" href="<?php echo getStaticFile('/caipiaoimg/static/css/layout/bet-history.min.css');?>">
        <script src="<?php echo getStaticFile('/caipiaoimg/static/js/lib/zepto.min.js');?>"></script>
    </head>
    <body>
        <div class="wrapper lottory-history">
            <div class="table-bet-wrap">
                <table class="table-bet table-bet-hd">
                    <colgroup>
                        <col width="12%">
                        <col width="42%">
                        <col width="20%">
                        <col width="26%">
                    </colgroup>
                    <thead>
                        <tr>
                            <th>期号</th>
                            <th>开奖号码</th>
                            <th>和值</th>
                            <th>形态</th>
                        </tr>
                    </thead>
                </table>
                <table class="table-bet" id="table-append">
                    <colgroup>
                        <col width="12%">
                        <col width="42%">
                        <col width="20%">
                        <col width="26%">
                    </colgroup>
                    <tbody>
                        <?php if($awards):?>
                        <?php foreach ($awards as $key => $items):?>
                        <tr>
                            <td><?php echo substr($items['seExpect'], 9, 2); ?>期</td>
                            <td>
                                <span class="dice">
                                    <?php $awardArry = explode(',', $items['awardNumber']); ?>
                                    <?php foreach ($awardArry as $k => $number):?>
                                    <i class="d<?php echo $number; ?>"></i>
                                    <?php endforeach;?>
                                </span><?php echo str_replace(',', '', $items['awardNumber']); ?></td>
                            <td><?php echo array_sum(explode(',', $items['awardNumber'])); ?></td>
                            <td><?php echo $items['mark']; ?></td>
                        </tr>
                        <?php endforeach;?>
                        <?php endif;?>                
                    </tbody>
                </table>
            </div>
        </div>
        <script src="<?php echo getStaticFile('/caipiaoimg/static/js/lib/require.js');?>" type="text/javascript"></script>
        <script>

            require.config({
                baseUrl: '//<?php echo DOMAIN;?>/caipiaoimg/static/js',
                paths: {
                    "zepto" : "//<?php echo DOMAIN;?>/caipiaoimg/static/js/lib/zepto.min",
                    "frozen": "//<?php echo DOMAIN;?>/caipiaoimg/static/js/lib/frozen.min",
                    'basic':'//<?php echo DOMAIN;?>/caipiaoimg/static/js/lib/basic'
                }
            })

            require(['lib/zepto.min', 'lib/basic', 'ui/loading/src/loading'], function($, basic, loading){
                // 判断是否是IOS
                if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                    document.querySelector('.wrapper').className += " ios";
                }

                //初始化分页
                var cpage = 1;
                var stop = true;
                var lotteryId = '<?php echo $lotteryId; ?>';
                $(window).scroll(function() {
                    if($(this).scrollTop() + $(window).height() + 10 >= $(document).height() && $(this).scrollTop() > 10) {
                        if(stop == true){
                            stop = false;  
                            cpage =cpage+1;//当前要加载的页码
                            var showLoading = $.loading(); 
                            $.ajax({
                                type: 'get',
                                url: '<?php echo $this->config->item('pages_url')?>app/awards/number/'+lotteryId+'/'+cpage+'/',
                                success: function (response) {
                                    showLoading.loading("hide");
                                    if(response){
                                        $('#table-append').append(response);
                                        stop =true;
                                    }    
                                },
                                error: function () {
                                    showLoading.loading("hide");
                                }
                            });
                        }
                    }
                });
            });
            
        </script>
    </body>
</html>