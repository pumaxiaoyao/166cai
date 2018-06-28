<?php
if(!defined('BASEPATH'))
{
    exit('No direct script access allowed');
}

// 接口地址
$config['apiUrl'] = 'http://m.api.iuliao.com/';

// 缓存类型
$config['redisList'] = array(
	'LEAGUE_SEASON' => '_league_season:',
	'LEAGUE_SCHEDULE' => '_league_schedule:',
	'LEAGUE_SCORERANK' => '_league_scorerank:',
	'LEAGUE_SHOTRANK' => '_league_shotrank:',
	'JC_MATCHHISTORY' => 'jc_matchhistory:',
	'JC_MATCHDETAIL' => 'jc_matchdetail:',
	'JC_MATCHPLAYER' => 'jc_matchplayer:',
	'JC_MATCHSCORE' => 'jc_matchscore:',
	'JC_MATCHMSGID' => 'jc_matchmsgid:',
	'JC_LIVENEW' => 'jc_livenew:',
	'JC_LIVEDETAIL' => 'jc_livedetail:',
	'ODD_LIST' => 'odd_list:',
	'ODD_DETAIL' => 'odd_detail:',
	'JCLQ_MESSGEID' => 'jclq_messageid:',
	'LEAGUES' => 'league:',
	'JCLQ_ONAMES' => 'jclq_onames:',
	'JCLQ_MATCHONAME' => 'jclq_matchoname:',
	'JCLQ_LEAGUE_SCHEDULE' => 'jclq_league_schedule:',
	'JCLQ_SCORERANK' => 'jclq_scorerank:',
	'JCLQ_MATCHDETAIL' => 'jclq_matchdetail:',
	'JCLQ_MATCHSTATISTICS' => 'jclq_matchstatistics:',
	'JCLQ_MATCHPLAYER' => 'jclq_matchplayer:',
	'JCLQ_MATCHHISTORY' => 'jclq_matchhistory:',
	'JCLQ_LASTMATCH' => 'jclq_lastmatch:',
	'JCLQ_FUTUREMATCH' => 'jclq_futurematch:',
	'JC_ARTERY_COMPANIES' => 'jc_artery_companies:',
	'JCLQ_LIVELIST' => 'jclq_liveList:',
	'JCLQ_ENDLIST' => 'jclq_endlist:',
	'JCLQ_FOLLOW' => 'jclq_follow:',
	'JCZQ_MESSGEID' => 'jczq_messageid:',
	'JCZQ_ONAMES' => 'jczq_onames:',
	'JCZQ_MATCHONAME' => 'jczq_matchoname:',
	'JCZQ_LEAGUE_SCHEDULE' => 'jczq_league_schedule:',
	'JCZQ_SCORERANK' => 'jczq_scorerank:',
	'JCZQ_SHOTRANK' => 'jczq_shotrank:',
	'JCZQ_MATCHDETAIL' => 'jczq_matchdetail:',
	'JCZQ_MATCHSTATISTICS' => 'jczq_matchstatistics:',
	'JCZQ_MATCHPLAYER' => 'jczq_matchplayer:',
	'JCZQ_MATCHHISTORY' => 'jczq_matchhistory:',
	'JCZQ_LASTMATCH' => 'jczq_lastmatch:',
	'JCZQ_FUTUREMATCH' => 'jczq_futurematch:',
	'JCZQ_LIVELIST' => 'jczq_liveList:',
	'JCZQ_ENDLIST' => 'jczq_endlist:',
	'JCZQ_FOLLOW' => 'jczq_follow:',
    'JCZQ_PREDICTION' => 'jczq_prediction:',
);

// 球队名映射
$config['shortName'] = array(
	// 篮球
	'多伦多猛龙'       =>  '猛龙',
    '波士顿凯尔特人'   =>  '凯尔特人',
    '华盛顿奇才'       =>  '奇才',
    '克里夫兰骑士'     =>  '骑士',
    '印第安纳步行者'   =>  '步行者',
    '密尔沃基雄鹿'     =>  '雄鹿',
    '费城76人'         =>  '76人',
    '迈阿密热火'       =>  '热火',
    '底特律活塞'       =>  '活塞',
    '夏洛特黄蜂'       =>  '黄蜂',
    '纽约尼克斯'       =>  '尼克斯',
    '芝加哥公牛'       =>  '公牛',
    '布鲁克林篮网'     =>  '篮网',
    '亚特兰大老鹰'     =>  '老鹰',
    '奥兰多魔术'       =>  '魔术',
    '金州勇士'         =>  '勇士',
    '休斯顿火箭'       =>  '火箭',
    '明尼苏达森林狼'   =>  '森林狼',
    '圣安东尼奥马刺'   =>  '马刺',
    '俄克拉荷马城雷霆' =>  '雷霆',
    '波特兰开拓者'     =>  '开拓者',
    '丹佛掘金'         =>  '掘金',
    '新奥尔良鹈鹕'     =>  '鹈鹕',
    '犹他爵士'         =>  '爵士',
    '洛杉矶快船'       =>  '快船',
    '洛杉矶湖人'       =>  '湖人',
    '达拉斯独行侠'     =>  '独行侠',
    '菲尼克斯太阳'     =>  '太阳',
    '孟菲斯灰熊'       =>  '灰熊',
    '萨克拉门托国王'   =>  '国王',
    // 足球
    '曼彻斯特城'	   =>  '曼城',
    '曼彻斯特联'       =>  '曼联',
    '托特纳姆热刺'     =>  '热刺',
    '莱切斯特城'       =>  '莱切斯特',
    '纽卡斯尔联'       =>  '纽卡斯尔',
    '哈德斯菲尔德'     =>  '哈德斯',
    '西布罗姆维奇'     =>  '西布朗',
    '巴塞罗那'         =>  '巴萨',
    '马德里竞技'       =>  '马竞',
    '皇家马德里'       =>  '皇马',
    '比利亚雷亚尔'     =>  '比利亚雷亚',
    '皇家贝蒂斯'       =>  '贝蒂斯',
    '毕尔巴鄂竞技'     =>  '毕巴',
    '拉科鲁尼亚'       =>  '拉科',
    '拉斯帕尔马斯'     =>  '拉斯帕斯',
    '拜仁慕尼黑'       =>  '拜仁',
    '莱比锡红牛'       =>  '莱比锡',
    '门兴格拉德巴赫'   =>  '门兴',
    '沃尔夫斯堡'       =>  '狼堡',
    '云达不莱梅'       =>  '不莱梅',
    '桑普多利亚'       =>  '桑普',
    '巴黎圣日耳曼'     =>  '巴黎',
    '斯特拉斯堡'       =>  '斯特拉斯',
    '阿斯顿维拉'       =>  '维拉',
    '布里斯托城'       =>  '布里斯托',
    '谢菲尔德联'       =>  '谢菲尔德',
    '米德尔斯堡'       =>  '米堡',
    '布伦特福德'       =>  '布伦特',
    '伊普斯维奇'       =>  '伊普斯',
    '女王公园巡游者'   =>  '女王公园',
    '谢菲尔德星期三'   =>  '谢周三',
    '诺丁汉森林'       =>  '诺丁汉',
    '保顿艾尔宾'       =>  '保顿',
    '因戈尔施塔特'     =>  '因戈施塔',
    '巴黎足球会'       =>  '巴黎FC',
    '纽卡斯尔喷气机'   =>  '纽喷气机',
    '阿德莱德联'       =>  '阿德莱德',
    '西悉尼流浪者'     =>  '西部悉尼',
    '布里斯班狮吼'     =>  '布狮吼',
    '中央海岸水手'     =>  '中央海岸',
    '莫斯科火车头'     =>  '莫斯科',
    '圣彼得堡泽尼特'   =>  '泽尼特',
    '莫斯科斯巴达克'   =>  '莫斯巴达',
    '克拉斯诺达尔'     =>  '克拉斯诺',
    '莫斯科中央陆军'   =>  '中央陆军',
    '格罗兹尼特里克'   =>  '格罗兹尼',
    '莫斯科迪纳摩'     =>  '莫迪纳摩',
    '安郅马哈奇卡拉'   =>  '安郅',
    'SKA哈巴罗夫斯克'  =>  '哈巴罗夫',
);