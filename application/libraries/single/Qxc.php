<?php
/**
 * Copyright (c) 2017,上海快猫文化传媒有限公司.
 * 摘    要: 七星彩 单式上传
 * 作    者: 李康建
 * 修改日期: 2017/07/27
 * 修改时间: 09:35
 */

class Qxc
{
  	private $lotteryId = '23528';
  	private $flag = 'qxc';
    private $playType = array('1'=>'1:1');
  	public function __construct()
  	{
  		$this->CI = &get_instance();
  		$this->CI->load->model('tmp_code_model');
  	}
  	/**
  	 * [check 校验]
  	 * @author LiKangJian 2017-07-27
  	 * @param  [type] $content [description]
  	 * @return [type]          [description]
  	 */
  	public function check($content,$playType)
  	{
        $data = array();
        $ball = $this->createBall(9,false);
        $res = array('code'=>0,'msg'=>'error','data'=>array());
        foreach ($content as $k => $v) 
        {
            $v = trim($v);
            $regex = "/[\s\.]/";
            $arr = explode(',', preg_replace($regex,',',$v)) ;
            foreach ($arr as  $v) 
            {
                if(!in_array($v, $ball) || strlen($v)!=1)
                {
                    $res['msg'] = '文件格式有误，请修改后重新上传';
                    return $res;
                }

            }
            //验证球是否在其中
            array_push($data, implode(',', $arr).':'.$this->playType[$playType]);
        }
        $res['code'] = 1;
        $betTnum = count($data);
        $res['data'] = array('betTnum'=>$betTnum,'money'=>$betTnum*2,'codes'=>implode(';', $data));
        $res['msg'] = 'success';
        return $res;
  	}
    /**
     * [createBall 生成球]
     * @author LiKangJian 2017-07-26
     * @param  [type] $max [description]
     * @return [type]      [description]
     */
    private function createBall($max,$tag = true)
    {
        $return = array();
        $i = $tag ? 1 : 0;
        do {
           $str = (string) $i; 
           if($i<10&&$tag)
           {
            $str = (string) '0'.$i;
           }
           array_push($return, $str);
           $i++;
        } while ($i <= $max);
        return $return;
    }
}