<link href="<?php echo getStaticFile('/caipiaoimg/v1.1/styles/help.min.css');?>" rel="stylesheet" type="text/css" />
<link href="<?php echo getStaticFile('/caipiaoimg/v1.1/styles/kaijiang.min.css');?>" rel="stylesheet" type="text/css" />
<div class="wrap lottery-detail">
    <div class="l-frame">
        <?php $this->load->view('v1.1/kaijiang/aside');?>
        <div class="l-frame-cnt">
            <div class="lottery-detail-main lottery-ks lottery-jlks">
                <div class="lottery-detail-img">
                    <div class="lottery-img">
	                    <img src="<?php echo getStaticFile('/caipiaoimg/v1.1/images/jlks.png'); ?>" srcset="<?php echo getStaticFile('/caipiaoimg/v1.1/images/jlks.svg'); ?> 2x" width="80" height="80" alt="" style="margin: 0;clip: auto">
	                </div>
                </div>
                <div class="lottery-detail-txt">
                    <div class="lottery-detail-title">
                        <h1 class="lottery-detail-name">易快3开奖结果</h1>
                        <a href="<?php echo $baseUrl?>jlks" target="_blank" class="btn-ss btn-ss-bet">立即预约</a>
                    </div>
					<dl class="lottery-detail-dl">
                        <dt>第<?php echo $info['cIssue']['seExpect']?>期开奖时间：</dt>
                        <dd><?php $arr=array("日","一","二","三","四","五","六"); echo date('Y年m月d日 H:i ', $info['cIssue']['awardTime']/1000)."周".$arr[date("w", $info['cIssue']['awardTime']/1000)]?></dd>
                        <dt>第<?php echo $info['lIssue']['seExpect']?>期开奖号码：</dt>
                        <dd><div class="ks-num"><?php foreach (explode(',', $info['lIssue']['awardNumber']) as $n){?><span class="ks-num-<?php echo $n?>"><?php echo $n?></span><?php }?></div></dd> 
                    </dl>
                    <p class="fast-lottery-title">第<b><?php echo $info['cIssue']['seExpect'];?></b>期正在销售&nbsp;&nbsp;&nbsp;&nbsp;距投注截止时间还有：<span id="time_rest"></span></p>
                    <div class="mod-box">
                        <div class="mod-box-hd">
                            <h2 class="mod-box-title">开奖详情</h2>
                            <div class="mod-box-subtxt">
                                <div class="date-select">
                                    <span>日期：</span>
                                    <dl class="simu-select">
                                        <dt><?php echo $date;?><i class="arrow"></i></dt>
                                        <dd class="select-opt">
                                            <div class="select-opt-in">
                                            <?php $date = strtotime('now');
                                            while ($date > strtotime('2017-11-21')) {?>
												<a href="<?php echo $baseUrl?>kaijiang/jlks/<?php echo date('Y-m-d', $date)?>"><?php echo date('Y-m-d', $date)?></a>
											<?php $date = $date - 86400;
											}?>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div class="mod-box-bd k3-table-kj">
                            <table>
                                <colgroup><col width="20%"><col width="30%"><col width="20%"><col width="30%"></colgroup>
                                <thead><tr><th>期次</th><th>号码</th><th>和值</th><th>形态</th></tr></thead>
                                <tbody>
                                <?php for ($issue = 1; $issue <= 22; $issue++) {
                                $iss = str_pad($issue, 2, "0", STR_PAD_LEFT)?>
                                	<tr>
                                        <th><?php echo $iss?></th>
                                        <td>
	                                        <?php if (!empty($data[$iss]['awardNum'])) {
	                                        	$awardArr = explode(',', $data[$iss]['awardNum']);
	                                        foreach ($awardArr as $val) {?>
		                                        <span class="ball ball-red"><?php echo $val?></span>
		                                	<?php }
		                                	}?>
	                                        </td>
	                                        <td><?php echo empty($awardArr) ? '' : array_sum($awardArr)?></td>
	                                        <td><?php if (!empty($awardArr)) {
                                        	if (count(array_unique(array_values($awardArr))) == 1) {
                                        		echo '<span class="sth">三同号</span>';
                                        	} elseif (count(array_unique(array_values($awardArr))) == 2) {
                                        		echo '<span class="eth">二同号</span>';
                                        	} elseif (in_array($data[$iss]['awardNum'], array('1,2,3', '2,3,4', '3,4,5', '4,5,6'))) {
                                        		echo '<span class="slh">三连号</span>';
                                        	}else {
                                        		echo '<span class="sbt">三不同</span>';
                                        	}
                                        }?></td>
                                    </tr>
                                <?php unset($awardArr);
                                }?>
                                </tbody>
                            </table>
                            <table>
                                <colgroup><col width="20%"><col width="30%"><col width="20%"><col width="30%"></colgroup>
                                <thead><tr><th>期次</th><th>号码</th><th>和值</th><th>形态</th></tr></thead>
                                <tbody>
                                <?php for ($issue = 23; $issue <= 44; $issue++) {?>
                                	<tr>
                                        <th><?php echo $issue?></th>
                                        <td>
	                                        <?php if (!empty($data[$issue]['awardNum'])) {
	                                        	$awardArr = explode(',', $data[$issue]['awardNum']);
	                                        foreach ($awardArr as $val) {?>
		                                        <span class="ball ball-red"><?php echo $val?></span>
		                                	<?php }
		                                	}?>
	                                        </td>
	                                        <td><?php echo empty($awardArr) ? '' : array_sum($awardArr)?></td>
	                                        <td><?php if (!empty($awardArr)) {
                                        	if (count(array_unique(array_values($awardArr))) == 1) {
                                        		echo '<span class="sth">三同号</span>';
                                        	} elseif (count(array_unique(array_values($awardArr))) == 2) {
                                        		echo '<span class="eth">二同号</span>';
                                        	} elseif (in_array($data[$issue]['awardNum'], array('1,2,3', '2,3,4', '3,4,5', '4,5,6'))) {
                                        		echo '<span class="slh">三连号</span>';
                                        	}else {
                                        		echo '<span class="sbt">三不同</span>';
                                        	}
                                        }?></td>
                                    </tr>
                                <?php unset($awardArr);
                                }?>
                                </tbody>
                            </table>
                            <table>
                                <colgroup><col width="20%"><col width="30%"><col width="20%"><col width="30%"></colgroup>
                                <thead><tr><th>期次</th><th>号码</th><th>和值</th><th>形态</th></tr></thead>
                                <tbody>
                                 <?php for ($issue = 45; $issue <= 66; $issue++) {?>
                                	<tr>
                                        <th><?php echo $issue?></th>
                                        <td>
	                                        <?php if (!empty($data[$issue]['awardNum'])) {
	                                        	$awardArr = explode(',', $data[$issue]['awardNum']);
	                                        foreach ($awardArr as $val) {?>
		                                        <span class="ball ball-red"><?php echo $val?></span>
		                                	<?php }
		                                	}?>
	                                        </td>
	                                        <td><?php echo empty($awardArr) ? '' : array_sum($awardArr)?></td>
	                                        <td><?php if (!empty($awardArr)) {
                                        	if (count(array_unique(array_values($awardArr))) == 1) {
                                        		echo '<span class="sth">三同号</span>';
                                        	} elseif (count(array_unique(array_values($awardArr))) == 2) {
                                        		echo '<span class="eth">二同号</span>';
                                        	} elseif (in_array($data[$issue]['awardNum'], array('1,2,3', '2,3,4', '3,4,5', '4,5,6'))) {
                                        		echo '<span class="slh">三连号</span>';
                                        	}else {
                                        		echo '<span class="sbt">三不同</span>';
                                        	}
                                        }?></td>
                                    </tr>
                                <?php unset($awardArr);
                                 }?>
                                </tbody>
                            </table>
                            <table>
                                <colgroup><col width="20%"><col width="30%"><col width="20%"><col width="30%"></colgroup>
                                <thead><tr><th>期次</th><th>号码</th><th>和值</th><th>形态</th></tr></thead>
                                <tbody>
                                     <?php for ($issue = 67; $issue <= 88; $issue++) {
                                     if ($issue <= 87) {?>
	                                	<tr>
	                                        <th><?php echo $issue?></th>
	                                        <td>
	                                        <?php if (!empty($data[$issue]['awardNum'])) {
	                                        	$awardArr = explode(',', $data[$issue]['awardNum']);
	                                        foreach ($awardArr as $val) {?>
		                                        <span class="ball ball-red"><?php echo $val?></span>
		                                	<?php }
		                                	}?>
	                                        </td>
	                                        <td><?php echo empty($awardArr) ? '' : array_sum($awardArr)?></td>
	                                        <td><?php if (!empty($awardArr)) {
                                        	if (count(array_unique(array_values($awardArr))) == 1) {
                                        		echo '<span class="sth">三同号</span>';
                                        	} elseif (count(array_unique(array_values($awardArr))) == 2) {
                                        		echo '<span class="eth">二同号</span>';
                                        	} elseif (in_array($data[$issue]['awardNum'], array('1,2,3', '2,3,4', '3,4,5', '4,5,6'))) {
                                        		echo '<span class="slh">三连号</span>';
                                        	}else {
                                        		echo '<span class="sbt">三不同</span>';
                                        	}
                                        }?></td>
	                                    </tr>
	                                <?php unset($awardArr);
		                                }else {?>
		                                <tr><th></th><td></td><td></td><td></td></tr>
		                            <?php }
                                     }?>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</div>
<script>
var intervalid, time = <?php echo $info['cIssue']['seFsendtime']/1000 - time()?>;
$(function(){
	fun();
	intervalid = setInterval("fun()", 1000);
})
function fun() { 
	time = parseInt(time, 10);
	if (time <= 0 || time%60 == 0) { 
	   location.reload()
	   clearInterval(intervalid); 
	} 
	time--;
	time = (time < 0) ? 0 : time;
	var h = Math.floor(time/3600), m = Math.floor((time - h * 3600)/60), s = time - h * 3600 - m * 60, str = '';
	if (h > 0) {
		str += "<b class='spec'>"+h+"</b>时";
	}
	str += "<b class='spec'>"+m+"</b>分<b class='spec'>"+s+"</b>秒</p>";
	$("#time_rest").html(str);
}
</script>