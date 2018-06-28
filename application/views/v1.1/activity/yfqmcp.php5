<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,minimal-ui"/>
<meta>
<title>一分钱买彩票，注册即送166元红包-166彩票官网</title>
<link rel="stylesheet" href="<?php echo getStaticFile('/caipiaoimg/v1.1/styles/global.min.css');?>">
<link rel="stylesheet" href="<?php echo getStaticFile('/caipiaoimg/v1.1/styles/active/one.min.css');?>">
<script src="<?php echo getStaticFile('/caipiaoimg/v1.1/js/jquery-1.8.3.min.js');?>" type="text/javascript"></script>
</head>
<body>
<!--top begin-->
<?php if (empty($this->uid)): ?>
    <div class="top_bar">
    	<?php $this->load->view('v1.1/elements/common/header_topbar_notlogin'); ?>
    </div>
<?php else: ?>
    <div class="top_bar">
        <?php $this->load->view('v1.1/elements/common/header_topbar'); ?>
    </div>
<?php endif; ?>
</div>
	<div class="oneUser">
		<div class="wrap">
			<div class="oneUser-hd">
				<h1>1分钱买彩票-新用户专享</h1>
				<p>注册即送166元红包</p>
				<div class="oneUser-form">
					<form class="nform form-register">
						<h2 class="nform-title"></h2>
						<fieldset>
							<legend>我要一分钱买彩票</legend>
						
							<div class="nform-item">
								<div class="nform-item-con">
									<input class="nform-item-ipt vcontent" type="text" data-rule="phonenum" placeholder="请输入本人手机号码" c-placeholder="请输入本人手机号码" autocomplete="off" name="phone" data-ajaxcheck='1' value="" />
									<div class="nform-tip hide">
										<i class="icon-tip"></i>
										<span class="nform-tip-con tip phone"></span>
										<s></s>
									</div>
								</div>
							</div>
							<div class="nform-item">
							     <div class="nform-item-con">
							         <div class="captcha_div"></div>
							         <div class="nform-tip hide">
										<i class="icon-tip"></i>
										<span class="nform-tip-con tip captcha"></span>
										<s></s>
									</div>
							     </div>
							</div>
							<div class="nform-item nform-vcode">
								<div class="nform-item-con">
									<input type="text" name="phoneCaptcha" data-rule="checkcode" placeholder="请输入验证码  " c-placeholder="请输入验证码" autocomplete="off" value="" class="nform-item-ipt vyzm vcontent">
									<a href="javascript:;" id="btn-getYzm" data-freeze="phone" class="lnk-getvcode _timer btn-disabled" target="_self">获取验证码</a>
									<span class="lnk-getvcode-disabled hide">重新发送(<em id='_timer'>60</em>秒)</span>
									<div class="nform-tip hide">
										<i class="icon-tip"></i>
										<span class="nform-tip-con tip phoneCaptcha"></span>
										<s></s>
									</div>
								</div>
							</div>
							<div class="nform-item">
								<div class="nform-item-con">
									<input class="nform-item-ipt pswcheck vcontent" type="password" name="pword" data-rule="password" placeholder="请输入密码，6-16个字符" autocomplete="off" data-encrypt="1" value="" />
									<div class="nform-tip hide">
										<i class="icon-tip"></i>
										<div class="nform-tip-con tip pword" style="width: auto"></div>
										<s></s>
									</div>
								</div>
							</div>
							<div class="nform-item">
								<div class="nform-item-con">
									<input class="nform-item-ipt vcontent" type="password" name="con_pword" placeholder="请再次输入密码 " autocomplete="off" data-rule="same" data-encrypt="1" data-with="pword" value="" />
									<div class="nform-tip hide">
										<i class="icon-tip"></i>
										<span class="nform-tip-con tip con_pword"></span>
										<s></s>
									</div>
								</div>
							</div>
							<div class="form-item">
								<div class="form-item-con">
									<div class="form-tip hide">
										<div class="form-tip-con commErr">注册失败</div>
									</div>
								</div>
							</div>
							<div class="nform-item btn-group">
								<div class="nform-item-con">
									<a class="btn btn-main submit" href="javascript:;">立即注册</a>
								</div>
							</div>
							<div class="nform-item nform-agree">
								<div class="nform-item-con">
									<input class="form-item-checkbox vcontent" type="checkbox" name="agreement" value="1" checked id="agree" /> <label for="agree">我同意</label><a href="/main/serviceAgreement" target="_blank">《166彩票网服务协议》</a>
								</div>
							</div>
						</fieldset>
					</form>
				</div>
			</div>
			<div class="rule">
				<h2>活动规则</h2>
				<ol>
					<li><span>1、</span>活动时间：<?php echo date('Y年m月d日', strtotime($startTime))?>~<?php echo date('Y年m月d日', strtotime($endTime))?>。</li>
					<li><span>2、</span>活动限新用户参加, 注册实名认证后系统自动派发红包，每位用户限领一次。</li>
					<li><span>3、</span>166元红包派发方案：<img src="<?php echo getStaticFile('/caipiaoimg/v1.1/images/active/one/rule-img.png');?>" width="968" height="408" alt="总计166元"></li>
					<li><span>4、</span>红包有效期为7天，逾期未使用的红包将被系统收回。</li>
					<li><span>5、</span>购彩或充值的时候可直接使用满足条件的红包。</li>
					<li><span>6、</span>活动过程中如用户通过不正当手段领取红包和彩金，166彩票网有权收回赠送、限制提现、冻结账户以及要求用户返还不正当得利。在法律允许范围内，166彩票网保留最终解释权。</li>
					<li><span>7、</span>关于活动的任何问题，请联系在线客服或拨打电话400-690-6760。</li>
				</ol>
			</div>
		</div>
	</div>
	<?php $this->load->view('v1.1/elements/common/footer_academy');?>
	<?php $this->load->view('v1.1/elements/netimer');?>
	<script type="text/javascript">
	var phone, validate, verify = function(err, ret){
		phone = $('.form-register [name="phone"]').val();
		if (!/^\d{11}$/.test(phone)) {
			$('.form-register [name="phone"]').trigger('blur');
			initNeFun();
	    	return;
		}
	    if(!err) {
	        validate = ret.validate;
	        $('#btn-getYzm').removeClass('btn-disabled');
	        $('.captcha').parent().removeClass('nform-tip-error').addClass('hide');
	    }
	}, initNeFun = function() {
		validate = '';
		initne({}, verify);
	};
	$(function(){
		initNeFun();
		$('.oneUser-hd').on('click', '#btn-getYzm', function(){
	    	var phoneErr = $('.phone').closest('.nform-tip').hasClass('nform-tip-error');
	    	if (!validate) {
		    	$('.captcha').show().html('请先滑动验证码完成校验').parent().addClass('nform-tip-error').removeClass('nform-tip-true hide');
		    	return false;
	    	}
			if (!phoneErr && phone) {
	  	    	$.ajax({
	  	            type: 'post',
	  	            url:  '/main/getPhcodeNE/registerCaptcha',
	  	            data: {'phone':phone, 'position':<?php echo $position['register_captche']?>, 'validate':validate},
	  	            dataType: 'json',
	  	            success: function(response) {
	  	                if(!response.status)
	  	                    $('.nform-vcode .nform-tip').addClass('nform-tip-error').removeClass('nform-tip-true hide').find('.nform-tip-con').show().html(response.msg);
	  	                else {
	  	                	netimer($("#btn-getYzm"));
	  	                }
	  	            }
	  	        });
	  	    }
	    })
		var formreg = new cx.vform('.form-register', {
			renderTip: 'renderTips',
			sValidate: 'submitValidate',
		    submit: function(data) {
		        if(data.agreement != '1'){
		            cx.Alert({content: '请同意服务协议'});
		            return false;
		        }
		        var self = this;
		        $.ajax({
		            type: 'post',
		            url:  '/mainajax/register',
		            data: data,
		            success: function(response) {
		            	if(response.code == '0'){
		                	//注册成功
				            location.href =  '/main/welcome';
		            	}else if (response.needfrsh == 1) {
		            		$('.phoneCaptcha').closest('.nform-tip').addClass('nform-tip-error').removeClass('hide');
		                	$('.phoneCaptcha').show().html('请重新获取验证码');
		                	//注册失败
		               	}else {
		               		$('.phoneCaptcha').closest('.nform-tip').removeClass('hide').addClass('nform-tip-error');
		                	$('.phoneCaptcha').show().html('请输入正确的手机验证码');
		               	}
		                $('input[name="phoneCaptcha"]').val('');
		            }
		        });
		        
		    }
		});
	})
	
	
	</script>
</body>
</html>
