<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

/*
 * 【半全场】赛果抓取 -- 来源：310win.com
 * @author:shigx
 * @date:2015-03-19
 */

class Bqc_caike
{

	private $CI;
	public function __construct()
	{
		$this->CI = &get_instance();
		$this->CI->load->library('tools');
		$this->CI->load->library('lib_comm');
		$this->CI->load->model('data_model');
	}
	//主函数
    public function capture($param, $data)
    {
        $num = $data['num'] ? $data['num'] : 1;
        unset($data['num']);
    	$issues_f = $data ? $data : array();
    	if(empty($issues_f))
    	{
    		return ;
    	}
    	
    	$url = 'http://www.310win.com/zucai/6changbanquanchang/kaijiang_zc_3.html';
    	$content = $this->CI->tools->get_content($url, __CLASS__);
    	$rule  = '<select\s+name=[\'"]dropIssueNum[\'"]\s+id=[\'"]dropIssueNum[\'"].*?>(.*?<option.*?selected=[\'"]selected[\'"].*?value=[\'"](.*?)[\'"].*?>.*?<\/option>.*?)<\/select>';
    	preg_match("/$rule/is", $content, $matches);
    	if(!isset($matches[1]) || empty($matches[1]))
    	{
    		return ;
    	}
    	preg_match_all('/<option.*?value=[\'"](\d+)[\'"]>(.*?)<\/option>/is', $matches[1], $issues);
    	if(!isset($issues[1]) || empty($issues[1]))
    	{
    		return ;
    	}
    	
    	$issue_arr = array();
    	foreach ($issues[2] as $key => $val)
    	{
    		$issue = $this->CI->lib_comm->format_issue($val, 2);
    		if(in_array($issue, array_keys($issues_f)))
    		{
    			$issue_arr[$issue] = $issues[1][$key];
    		}
    	}
    	$i = 1;
    	foreach ($issue_arr as $key => $issue)
    	{
    		if($i > $num)
    		{
    			break;
    		}
    		 
    		$this->get_datas($issue, $param, $data[$key]);
    		$i++;
    	}
    }
    
    private function get_datas($issue, $param, $mname)
    {
    	$url = "http://www.310win.com/Info/Result/Soccer.aspx?load=ajax&typeID=3&IssueID={$issue}&randomT-_-=" . time();
    	$respone = $this->CI->tools->get_content($url, __CLASS__);
        $respone = json_decode($respone, true);
        $this->updateBqcScore($respone, $param['source'], $mname);
    }
    
    /*
     * 【半全场】更新赛果
     * @author:shigx
     * @date:2015-03-19
     */
    private function updateBqcScore($datas, $source, $mname)
    {

    	if(!empty($datas['Table']))
    	{
    		$fields = array('mid', 'mname', 'league', 'home', 'away', 'half_score', 'full_score', 'status', 'half_result', 'full_result', 'source', 'created');
    		$bdata['s_data'] = array();
    		$bdata['d_data'] = array();
    		$count = 0;
    		foreach ($datas['Table'] as $val)
    		{
                if(!in_array($val['MatchID'], $mname))
                {
                    continue;
                }
    			array_push($bdata['s_data'], "(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, $source, now())");
    			array_push($bdata['d_data'], $this->CI->lib_comm->format_issue($datas['IssueNum'], 2));
    			array_push($bdata['d_data'], $val['MatchID']);
    			array_push($bdata['d_data'], $val['Sclass']);
    			array_push($bdata['d_data'], $val['HomeTeam']);
    			array_push($bdata['d_data'], $val['GuestTeam']);
    			$half = str_replace('-', '', $val['HalfScore']);
    			if(empty($half))
    			{
    				array_push($bdata['d_data'], '');
    			}
    			else
    			{
    				array_push($bdata['d_data'], $this->CI->lib_comm->score_filter(str_replace('-', ':', $val['HalfScore'])));
    			}
    			$full = str_replace('-', '', $val['Score']);
    			if(empty($full))
    			{
    				array_push($bdata['d_data'], '');
    				$status = 0;
    			}
    			else
    			{
    				$full_score = $this->CI->lib_comm->score_filter(str_replace('-', ':', $val['Score']));
    				array_push($bdata['d_data'], $full_score);
    				$status = 1;
    			}
    			array_push($bdata['d_data'], $this->CI->lib_comm->getStatus($full_score));
    			array_push($bdata['d_data'], $val['Result_1']);
    			array_push($bdata['d_data'], $val['Result_2']);
    			
    			if(++$count >= 500)
    			{
    				$this->CI->data_model->insertBqcScore($fields, $bdata);
    				$bdata['s_data'] = array();
    				$bdata['d_data'] = array();
    				$count = 0;
    			}
    		}
    		if(!empty($bdata['s_data']))
    		{
    			$this->CI->data_model->insertBqcScore($fields, $bdata);
    			$bdata['s_data'] = array();
    			$bdata['d_data'] = array();
    			$count = 0;
    		}
    	}
    }
}