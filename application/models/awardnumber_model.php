<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Awardnumber_Model extends MY_Model 
{

    public function __construct() 
    {
        parent::__construct();
    }

    /**
     * 获取今天已开奖期次信息
     * @param unknown_type $table
     */
    public function getLotteryIssues($table)
    {
    	$date = date("Y-m-d", strtotime("-1 day"));
    	$sql = "SELECT issue FROM {$table} where award_time >= ? and award_time <= now() and state = 0 
        and delect_flag=0";
        return $this->dc->query($sql, array($date))->getCol();
    }
    
    /**
     * 检查是否存在已过show_end_time 未过award_time 的期次
     * @param string $table 排期表名
     * @return unknown
     */
    public function getAwardIssue($table)
    {
        $now = date('Y-m-d H:i:s');
        $sql = "select issue from {$table} where show_end_time <= ? and award_time >= ? and status=0 and delect_flag=0 limit 1";
        return $this->cfgDB->query($sql, array($now, $now))->getOne();
    }
    
    //修改排期信息
    public function updateByIssue($table, $issue, $data)
    {
    	$this->dc->where('issue', $issue);
    	$this->dc->update($table, $data);
    	return $this->dc->affected_rows();
    }
    
    /**
     * 根据类型和彩种id更新任务状态
     * @param int $type
     * @param int $lid
     * @param int $stop
     */
    public function updateTicketStop($type, $lid, $stop)
    {
    	$this->cfgDB = $this->load->database('cfg', TRUE);
    	$this->cfgDB->query("update cp_task_manage set stop= ? where task_type= ? and lid= ?", array($stop, $type, $lid));
    	return $this->cfgDB->affected_rows();
    }
}
