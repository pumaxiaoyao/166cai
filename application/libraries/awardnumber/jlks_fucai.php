<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
class Jlks_Fucai extends Base
{
	public function __construct()
	{
	}
	
	public function capture($lid)
	{
	    $stopFlag = true;
		if($issues)
		{
			$url = 'http://www.jlfc.com.cn/View/PCLottery.aspx?PlayTypeID=4';
			$content = $this->get_content($url);
 			$preg = '.*?<table.*?id="KSReport">.*?<tbody>(.*?)<tr id="tr_jrwin1">.*?<\/tbody>.*';
            preg_match("/$preg/is", $content, $match);
            preg_match_all("/(?:<tr>.*?(\d{9}).*?(\d+)&nbsp;.*?(\d+)&nbsp;.*?(\d+)&nbsp;[^<]*?<\/div>[^<]*?<\/td>[^<]*?<\/tr>[^<]*?)+/is", $match[1], $res);
            if(empty($res[1]))
			$awardArr = array();
			foreach ($res[1] as $key => $issue)
			{
				$issue = '20'.$issue;
				//获取下一个期次
				if(in_array($issue, $issues))
				{
					$awardNumArr = array($res[2][$key],$res[3][$key],$res[4][$key]);
					sort($awardNumArr);
					$awardArr[$issue] = explode(',', $awardNumArr);
				}
			}
			//抓取期次和查询期次数量不相等说明有期次未抓取到
		}
	}
}