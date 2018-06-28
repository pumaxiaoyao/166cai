<?php

/**
 * Copyright (c) 2017,上海快猫文化传媒有限公司.
 * 摘    要: 吉林快三遗漏数据统计
 * 作    者: 李康建
 * 修改日期: 2017/11/10
 * 修改时间: 10:46
 */

class Jxks
{
	private $CI;
	private $issue;
	private $lotteryId = '57';
	private $flag = 'jxks';
	private $maxIssue = 84;//一天期次数
	//三同号值范围
	private $valueRange1 = array('111', '222', '333', '444', '555', '666');
	//三不同值范围
	private $valueRange2 = array('123', '124', '125', '126', '134', '135', '136', '145', '146', '156', '234', '235', '236', '245', '246', '256', '345', '346', '356', '456');
	//三连号值范围
	private $valueRange3 = array('123', '234', '345', '456');
	//二同号复选值范围
	private $valueRange4 = array('11', '22', '33', '44', '55', '66');
	//二同号单选值范围
	private $valueRange5 = array('112', '113', '114', '115', '116', '122', '223', '224', '225', '226', '133', '233', '334', '335', '336', '144', '244', '344', '445', '446', '155', '255', '355', '455', '556', '166', '266', '366', '466', '566');
	//二不同值范围
	private $valueRange6 = array('12', '13', '14', '15', '16', '23', '24', '25', '26', '34', '35', '36', '45', '46', '56');
	public function __construct()
	{
		$this->CI = &get_instance();
		$this->CI->load->model('missed_model');
		$this->CI->load->driver('cache', array('adapter' => 'redis'));
	}
	//执行方法
	public function exec()
	{
		$issue = $this->CI->missed_model->fetchLastIssue($this->lotteryId);
		if($issue)
		{
			//执行遗漏计算
			$detail = $this->CI->missed_model->fetchDetail($this->lotteryId, $issue);
			$initMissed = $detail['detail'];
			$awards = $this->CI->missed_model->fetchIssueRecords($this->flag, $issue);
		}
		else
		{
			//初始化遗漏数据
			$initMissed = '0,0,0,0,0,0|0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|0|0,0,0,0,0,0|0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|0|0,0,0,0,0,0|0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|0,0,0,0|0,0,0,0,0,0|0,0,0,0,0,0';
			$awards = $this->CI->missed_model->fetchIssueRecords($this->flag);
		}
		
		foreach ($awards as $key => $award)
		{
			$this->issue = $award['issue'];
			$preData = $this->missedCal($award['awardNum'], $initMissed);
			$initMissed = $preData['detail'];
			$this->hotCal(); //冷热值统计
		}
		
		$this->CI->missed_model->writeRedis($this->flag, $this->lotteryId, 20); //遗漏入缓存
		$this->CI->missed_model->writeRedisMore($this->flag, $this->lotteryId, 200); //遗漏入缓存
	}
	
	/**
	 * [missedCal 执行遗漏统计]
	 * @author LiKangJian 2017-11-10
	 * @param  [type] $award     [description]
	 * @param  [type] $preMissed [上一期遗漏数据]
	 * @return [type]            [description]
	 */
	private function missedCal($award, $preMissed)
	{
		if(empty($award) || empty($preMissed))
		{
			return ;
		}
		$awards = explode(',', $award);
		$preMissed = explode('|', $preMissed);
		$data = array(
			'lid' => $this->lotteryId,
			'issue' => $this->issue,
			'play_type' => 0
		);
		$detail = array();
		for($i = 0; $i < 12; $i++)
		{
			$method = "mType{$i}";
			$detail[] = $this->$method($awards, $preMissed[$i]);
		}
		$data['detail'] = implode('|', $detail);
		$this->CI->missed_model->insertMissed($data);
		return $data;
	}
	
	/**
	 * [mType0 类型0  号码1-6值遗漏]
	 * @author LiKangJian 2017-11-10
	 * @param  array  $award     [开奖号码]
	 * @param  [type] $preMissed [上一期的遗漏值]
	 * @return [type]            [description]
	 */
	private function mType0($award = array(), $preMissed)
	{
		$data = array();
		$preMissed = explode(',', $preMissed);
		foreach ($preMissed as $key => $val)
		{
			$miss = in_array(($key + 1), $award) ? 0 : 1;
			$data[$key] = $miss == 0 ? 0 : ($val + $miss);
		}
		
		return implode(',', $data);
	}
	
	/**
	 * [mType1 类型1 和值3-18值遗漏]
	 * @author LiKangJian 2017-11-10
	 * @param  array  $award     [开奖号码]
	 * @param  [type] $preMissed [上一期的遗漏值]
	 * @return [type]            [description]
	 */
	private function mType1($award = array(), $preMissed)
	{
		$data = array();
		$awardSum = array_sum($award);
		$preMissed = explode(',', $preMissed);
		foreach ($preMissed as $key => $val)
		{
			$miss = ($awardSum == ($key + 3)) ? 0 : 1;
			$data[$key] = $miss == 0 ? 0 : ($val + $miss);
		}
		
		return implode(',', $data);
	}
	
	/**
	 * [mType2 类型2 三同号通选遗漏]
	 * @author LiKangJian 2017-11-10
	 * @param  array  $award     [开奖号码]
	 * @param  [type] $preMissed [上期遗漏数据]
	 * @return [type]            [description]
	 */
	private function mType2($award = array(), $preMissed)
	{
		$missed = '';
		$award = implode('', $award);
		$miss = in_array($award, $this->valueRange1) ? 0 : 1;
		$missed = $miss == 0 ? 0 : ($miss + $preMissed);
		return $missed;
	}
	
	/**
	 * [mType3 类型3 三同号单选遗漏]
	 * @author LiKangJian 2017-11-10
	 * @param  array  $award     [开奖号码]
	 * @param  [type] $preMissed [上期遗漏数据]
	 * @return [type]            [description]
	 */
	private function mType3($award = array(), $preMissed)
	{
		$data = array();
		$preMissed = explode(',', $preMissed);
		$award = implode('', $award);
		foreach ($this->valueRange1 as $key => $val)
		{
			$miss = $award == $val ? 0 : 1;
			$data[$key] = $miss == 0 ? 0 : ($miss + $preMissed[$key]);
		}
		
		return implode(',', $data);
	}
	
	/**
	 * [mType4 类型4 三不同号遗漏]
	 * @author LiKangJian 2017-11-10
	 * @param  array  $award     [开奖号码]
	 * @param  [type] $preMissed [上期遗漏数据]
	 * @return [type]            [description]
	 */
	private function mType4($award = array(), $preMissed)
	{
		$data = array();
		$preMissed = explode(',', $preMissed);
		sort($award); //对数组进行排序
		$award = implode('', $award);
		foreach ($this->valueRange2 as $key => $val)
		{
			$miss = $award == $val ? 0 : 1;
			$data[$key] = $miss == 0 ? 0 : ($miss + $preMissed[$key]);
		}
		
		return implode(',', $data);
	}
	
	/**
	 * [mType5 类型5 三连号遗漏]
	 * @author LiKangJian 2017-11-10
	 * @param  array  $award     [开奖号码]
	 * @param  [type] $preMissed [上期遗漏数据]
	 * @return [type]            [description]
	 */
	private function mType5($award = array(), $preMissed)
	{
		$missed = '';
		sort($award); //对数组进行排序
		$award = implode('', $award);
		$miss = in_array($award, $this->valueRange3) ? 0 : 1;
		$missed = $miss == 0 ? 0 : ($miss + $preMissed);
		return $missed;
	}
	
	/**
	 * [mType6 类型6 二同号复选遗漏]
	 * @author LiKangJian 2017-11-10
	 * @param  array  $award     [开奖号码]
	 * @param  [type] $preMissed [上期遗漏数据]
	 * @return [type]            [description]
	 */
	private function mType6($award = array(), $preMissed)
	{
		$data = array();
		$preMissed = explode(',', $preMissed);
		$acount = array_count_values($award);
		$max = max($acount);
		$awardStr = '';
		if($max > 1)
		{
			$number = array_search($max, $acount);
			$awardStr = $number . $number;
		}
		foreach ($this->valueRange4 as $key => $val)
		{
			$miss = $awardStr == $val ? 0 : 1;
			$data[$key] = $miss == 0 ? 0 : ($miss + $preMissed[$key]);
		}
		
		return implode(',', $data);
	}

	/**
	 * [mType7 类型7 二同号单选遗漏]
	 * @author LiKangJian 2017-11-10
	 * @param  array  $award     [开奖号码]
	 * @param  [type] $preMissed [上期遗漏数据]
	 * @return [type]            [description]
	 */
	private function mType7($award = array(), $preMissed)
	{
		$data = array();
		$preMissed = explode(',', $preMissed);
		sort($award); //对数组进行排序
		$award = implode('', $award);
		foreach ($this->valueRange5 as $key => $val)
		{
			$miss = $award == $val ? 0 : 1;
			$data[$key] = $miss == 0 ? 0 : ($miss + $preMissed[$key]);
		}
		
		return implode(',', $data);
	}
	
	/**
	 * [mType8 类型8 二不同号遗漏]
	 * @author LiKangJian 2017-11-10
	 * @param  array  $award     [开奖号码]
	 * @param  [type] $preMissed [上期遗漏数据]
	 * @return [type]            [description]
	 */
	private function mType8($award = array(), $preMissed)
	{
		$data = array();
		$preMissed = explode(',', $preMissed);
		foreach ($this->valueRange6 as $key => $val)
		{
			$number = str_split($val);
			$intersect = array_intersect($number, $award);
			$miss = (count($intersect) == 2) ? 0 : 1;
			$data[$key] = $miss == 0 ? 0 : ($miss + $preMissed[$key]);
		}
		
		return implode(',', $data);
	}
	/**
	 * [mType9 类型9 和值形态遗漏 大小奇偶]
	 * @author LiKangJian 2017-11-10
	 * @param  array  $award     [开奖号码]
	 * @param  [type] $preMissed [上期遗漏数据]
	 * @return [type]            [description]
	 */
	private function mType9($award = array(), $preMissed)
	{
		$awardSum = array_sum($award);
		$data[0] = ($awardSum > 10 && $awardSum <= 18) ? 0 : 1;
		$data[1] = ($awardSum >= 3 && $awardSum <= 10) ? 0 : 1;
		$data[2] = ($awardSum % 2 != 0) ? 0 : 1;
		$data[3] = ($awardSum % 2 == 0) ? 0 : 1;
		$preMissed = explode(',', $preMissed);
		foreach ($preMissed as $key => $val)
		{
			$data[$key] = ($data[$key] == 0) ? 0 : ($val + $data[$key]);
		}
	
		return implode(',', $data);
	}
	
	/**
	 * [mType10 类型10 开奖号码形态遗漏   三同号|三不同|三连号|二同复|二同单|二不同]
	 * @author LiKangJian 2017-11-10
	 * @param  array  $award     [开奖号码]
	 * @param  [type] $preMissed [上期遗漏数据]
	 * @return [type]            [description]
	 */
	private function mType10($award = array(), $preMissed)
	{
		sort($award); //对数组进行排序
		$awardStr = implode('', $award);
		//三同号
		$data[0] = (in_array($awardStr, $this->valueRange1)) ? 0 : 1;
		//三不同
		$data[1] = (in_array($awardStr, $this->valueRange2)) ? 0 : 1;
		//三连号
		$data[2] = (in_array($awardStr, $this->valueRange3)) ? 0 : 1;
		//二同复
		$acount = array_count_values($award);
		$max = max($acount);
		$award3 = '';
		if($max > 1)
		{
			$number = array_search($max, $acount);
			$award3 = $number . $number;
		}
		$data[3] = (in_array($award3, $this->valueRange4)) ? 0 : 1;
		//二同单
		$data[4] = (in_array($awardStr, $this->valueRange5)) ? 0 : 1;
		//二不同
		$data[5] = (!in_array($awardStr, $this->valueRange1)) ? 0 : 1;
		$preMissed = explode(',', $preMissed);
		foreach ($preMissed as $key => $val)
		{
			$data[$key] = ($data[$key] == 0) ? 0 : ($val + $data[$key]);
		}
	
		return implode(',', $data);
	}
	
	/**
	 * [mType11 类型11 跨度遗漏  跨度范围0-5]
	 * @author LiKangJian 2017-11-10
	 * @param  array  $award     [开奖号码]
	 * @param  [type] $preMissed [上期遗漏数据]
	 * @return [type]            [description]
	 */
	private function mType11($award = array(), $preMissed)
	{
		$data = array();
		$span = max($award) - min($award);
		$preMissed = explode(',', $preMissed);
		for ($i = 0; $i < 6; $i++)
		{
			$miss = ($i == $span) ? 0 : 1;
			$data[$i] = $miss == 0 ? 0 : ($miss + $preMissed[$i]);
		}
		
		return implode(',', $data);
	}
	
	/**
	 * [hotCal 冷热数据统计]
	 * @author LiKangJian 2017-11-10
	 * @return [type] [description]
	 */
	private function hotCal()
	{
		$misseds = $this->CI->missed_model->fetchMisseds($this->lotteryId, $this->maxIssue);
		if($misseds)
		{
			$data = array();
			foreach ($misseds as $miss)
			{
				$missArr = explode('|', $miss['detail']);
				foreach ($missArr as $key => $val)
				{
					$mType = explode(',', $val);
					foreach ($mType as $k => $v)
					{
						$data[$key][$k] = !isset($data[$key][$k]) ? 0 : $data[$key][$k];
						$hot = ($v == 0) ? 1 : 0;
						$data[$key][$k] += $hot;
					}
				}
			}
			
			$hotData = array();
			foreach ($data as $value)
			{
				$hotData[] = implode(',', $value);
			}
			$data = array(
				'lid' => $this->lotteryId,
				'issue' => $this->issue,
				'play_type' => 1,
				'detail' => implode('|', $hotData)
			);
			$this->CI->missed_model->insertMissed($data);
		}
	}
}
