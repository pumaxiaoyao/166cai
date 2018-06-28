<!DOCTYPE HTML>
<html>
    <head>
    	<meta charset="utf-8">
        <?php
        /* --- seo优化 --- @Author liusijia --- start --- */
        $this->config->load('seo');
        $seo = $this->config->item('seo');
        $set_data = $seo[$this->con][$this->act];
        $title = str_replace(array('#cnName#', '*date*', '#pageNumber#'), array($cnName, (!empty($date) ? date('Y-m-d', $date) : ''), (($pageNumber > 1) ? '-第' . $pageNumber . '页' : '')), $set_data['title']);
        $keywords = str_replace(array('#cnName#', '*date*'), array($cnName, (!empty($date) ? date('Y-m-d', $date) : '')), $set_data['keywords']);
        $description = str_replace(array('#cnName#', '*date*'), array($cnName, (!empty($date) ? date('Y-m-d', $date) : '')), $set_data['description']);
        /* --- seo优化 --- @Author liusijia --- end --- */
        ?>
        <title><?php echo $title; ?></title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta content="<?php echo $description; //@Author liusijia    ?>" name="Description" />
        <meta content="<?php echo $keywords; //@Author liusijia   ?>" name="Keywords" />
        <meta name="baidu-site-verification" content="lQnvYyQA6s" />
        <link rel="stylesheet" href="<?php echo getStaticFile('/caipiaoimg/v1.1/styles/global.min.css');?>"/>
        <script src="<?php echo getStaticFile('/caipiaoimg/v1.1/js/jquery-1.8.3.min.js');?>" type="text/javascript"></script>
        <script src="<?php echo getStaticFile('/caipiaoimg/v1.1/js/base.min.js'); ?>" type="text/javascript" ></script>
    </head>
    <body>
        <script type="text/javascript">
        	var version = 'v1.1';
        	var visitor = {userNickname:'<?php echo empty($this->uid) ? '未登录用户' : $this->uinfo['uname']?>'};
			window.easemobim = window.easemobim || {};
			easemobim.config = {visitor: visitor};
        </script>
        <script src='//kefu.easemob.com/webim/easemob.js'></script>
        <div class="fix-foot-wrap">
<!--header begin-->
<div class="header header-short">
  <div class="wrap header-inner">
    <div class="logo">
    	<div class="logo-txt"><span class="logo-txt-name">166彩票</span></div>
    	<a href="/" class="logo-img"><img src="<?php echo getStaticFile('/caipiaoimg/v1.1/images/logo/logo-166.png');?>" srcset="<?php echo getStaticFile('/caipiaoimg/v1.1/images/logo/logo-166@2x.svg');?> 2x" width="280" height="70" alt="166彩票网"></a>
    	<h1 class="header-title"><?php echo $headTitle;?></h1>
    </div>
    <div class="aside">
    	<a href="javascript:;" onclick="easemobim.bind({tenantId: '38338'})" class="btn online-service" target="_self"><i class="icon-font">&#xe634;</i>在线客服</a>
    	<p class="telphone"><i class="icon-font">&#xe633;</i>400-690-6760</p>
    </div>
  </div>
</div>

<!--header end-->
