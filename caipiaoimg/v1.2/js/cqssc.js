var cy = 1000, rest = tm, inteval, boxes = {}, renderTime;

(function() {
	
	window.cx || (window.cx = {});
	
	cx.Lottery = (function(){
		
		var lid = cx.Lid.CQSSC, me = {};
		
		me.lid = lid;
		
		me.playTypes = {'1xzhi': '10', '2xzhi': ['20', '21'], '2xzu': ['23', '27'], '3xzhi': ['30', '31'], '3xzu3': ['33', '37'], '3xzu6': ['34', '38'], '5xzhi': ['40', '41'], '5xt':'43', 'dxds': '1'};
		
		me.getPlayTypeByMidCode = function(midCode) {
			var data = {'10':'1xzhi','20':'2xzhi','21':'2xzhi','23':'2xzu','27':'2xzu','30':'3xzhi','31':'3xzhi','33':'3xzu3','37':'3xzu3','34':'3xzu6','38':'3xzu6','40':'5xzhi','41':'5xzhi','43':'5xt','1':'dxds'}
			return (midCode in data) ? data[midCode] : '1xzhi';
	    }
		
		me.jiangjin = {'1xzhi':'10','2xzhi':'100','2xzu':'50','3xzhi':'1000','3xzu3':'320','3xzu6':'160','5xzhi':'100000','dxds':'4'};
		
		me.renderData = {
            tips: {
                '一星直选': '至少选1个号，与开奖号末位相同，奖金10元！',
                '二星直选': '每位至少选1个号，按位猜对开奖号后2位，奖金100元！',
                '二星组选': '至少选2个号，猜对开奖号后2位（顺序不限），奖金50元！',
                '三星直选': '每位至少选1个号，按位猜对开奖号后3位，奖金1000元！',
                '三星组三': '至少选2个号，猜对开奖号后3位（顺序不限），且开奖号后3位有任意两位相同奖金320元！',
                '三星组六': '至少选3个号，猜对开奖号后3位（顺序不限），奖金160元！',
                '五星直选': '每位至少选1个号，按位猜对全部开奖号，奖金10万元！',
                '五星通选': '每位至少选1个号，按位猜对开奖号中20440元；与前三位或后三位一致中220元；与前二位或后二位一致中20元！',
                '大小单双': '每位至少选1个号，按位猜对开奖号后2位属性，奖金4元！',
            },
            bubbleTip: {
                "一星直选": "选号：3；开奖：17993；中奖：10元",
                "二星直选": "选号：32；开奖：17932；中奖：100元",
                "二星组选": "选号：39（顺序不限）；开奖：17993；中奖：50元",
                "三星直选": "选号：320；开奖：33320；中奖：1000元",
                "三星组三": "选号：113（顺序不限）；开奖：17113；中奖：320元",
                "三星组六": "选号：239（顺序不限）；开奖：77239；中奖：160元",
                "五星直选": "选号：17993；开奖：17993；中奖：10万元",
                "五星通选": "选号：17993；开奖：17993；中奖：10万元|选号：<em style='color:#ff8e33'>179</em>00；开奖：17993；中奖：220元|选号：44<em style='color:#ff8e33'>993</em>；开奖：17993；中奖：220元|选号：<em style='color:#ff8e33'>17</em>008；开奖：17993；中奖：20元|选号：550<em style='color:#ff8e33'>93</em>；开奖：17993；中奖：20元|选号：<em style='color:#ff8e33'>17</em>0<em style='color:#ff8e33'>93</em>；开奖：17993；中奖：40元",
                "大小单双": "选号：大双/大小/单双/单小；开奖：17994；中奖：4元"
            }
        }
	    
	    me.map = {
            ws: ['个', '十', '百', '千', '万'],
            zy: {'1xzhi': '一星直选', '2xzhi': '二星直选', '2xzu': '二星组选', '3xzhi': '三星直选', '3xzu3': '三星组三', '3xzu6': '三星组六', '5xzhi': '五星直选', '5xt': '五星通选', 'dxds': '大小单双'},
            min: {'1xzhi': 1, '2xzhi': 1, '2xzu': 2, '3xzhi': 1, '3xzu3': 2, '3xzu6': 3, '5xzhi': 1, '5xt': 1, 'dxds': 1},
            dxds: ['大', '小', '单', '双'],
            dxdsNum: ['1', '2', '4', '5']
        }
		
		me.hsMap = {'组六': 'zl', '组三': 'zs', '豹子': 'bz'}
		
		me.dxdsMap = {'1':'大','2':'小','4':'单','5':'双'}
		
		me.getNumberSeparator = function(playType) {
			var data = {'default': ',', '1xzhi': '', '2xzhi': '', '3xzhi': '', '5xzhi': '', '5xt': ''};
			return (playType in data) ? data[playType] : data['default'];
		}
		
		me.getPlaceSeparator = function(playType) {
			var data = {'1xzhi': ',', '2xzhi': ',', '3xzhi': ',', '5xzhi': ',', '5xt': ',', 'dxds':','};
			return (playType in data) ? data[playType] : data['default'];
	    }
		
		me.hasPaddingZero = function(playType) {
	        return false;
	    }
		
		me.getCastPost = function( playType) {
	        return '1';
	    };
	    
	    me.getPlayTypeName = function(playType) {
	    	playCnNames = {1: '大小单双', 10: '一星直选', 20:'二星直选', 21:'二星直选', 23: '二星组选', 27: '二星组选', 30:'三星直选', 31:'三星直选', 33: '三星组三单', 34:'三星组六', 37: '三星组三复', 38: '三星组六', 40:'五星直选', 41:'五星直选', 43: '五星通选'};
	    	return playCnNames[playType] ? playCnNames[playType] : '普通';
	    };
	    
	    me.getMinLength = function(playType) {
	    	var data = {'1xzhi': [1], '2xzhi': [1, 1], '2xzu': [2], '3xzhi': [1, 1, 1], '3xzu3': [2], '3xzu6': [3], '5xzhi': [1, 1, 1, 1, 1], '5xt': [1, 1, 1, 1, 1], 'dxds' : [1, 1]};
	    	return (playType in data) ? data[playType] : data['default'];
	    }
	    
	    me.getAmount = function(playType) {
	    	var data = {'1xzhi': [9], '2xzhi': [9, 9], '2xzu': [9], '3xzhi': [9, 9, 9], '3xzu3': [9], '3xzu6': [9], '5xzhi': [9, 9, 9, 9, 9], '5xt': [9, 9, 9, 9, 9], 'dxds' : [9, 9]};
	    	return (playType in data) ? data[playType] : data['default'];
	    }
	    
	    me.getStartIndex = function(playType) {
	    	var data = {'1xzhi': [0], '2xzhi': [0, 0], '2xzu': [0], '3xzhi': [0, 0, 0], '3xzu3': [0], '3xzu6': [0], '5xzhi': [0, 0, 0, 0, 0], '5xt': [0, 0, 0, 0, 0], 'dxds' : [0, 0]};
	    	return (playType in data) ? data[playType] : data['default'];
	    }
	    
	    me.getRule = function(playType, state) {
	    	var result = {'status':true, 'content':'', 'size':'16'}, index = parseInt(playType.substring(0, 1), 10);
	        switch (playType) {
	        	case '1xzhi':
	            case '2xzu':
	            case '3xzu6':
	            	if (state[0] == '1') {
	            		result['status'] = false;
    					result['content'] = '<i class="icon-font">&#xe611;</i>请至少选择<span class="num-red">'+index+'</span>个号码';
	            	}
	            	break;
	            case '3xzu3':
	            	if (state[0] == '1') {
	            		result['status'] = false;
    					result['content'] = '<i class="icon-font">&#xe611;</i>请至少选择<span class="num-red">2</span>个号码';
	            	}
	                break;
	            case '2xzhi':
	            case '3xzhi':
	            case '5xzhi':
	            case '5xt':
	            case 'dxds':
	            	var flag = false;
	            	$.each(state, function(i, st){
	            		if (st.match('1')) flag = true;
	            	})
	            	if (flag) {
	            		result['status'] = false;
    					result['content'] = '<i class="icon-font">&#xe611;</i>每位至少选择<span class="num-red">1</span>个号码';
	            	}
	                break;
	            default:
	            	break;
	        }
		    return result;
	    }
	    
	    me.getPlayTypeByCode = function(code) {
        	code = parseInt(code, 10)
			var codeArr = {1:'dxds', 10:'1xzhi', 20:'2xzhi', 21:'2xzhi', 23:'2xzu', 27:'2xzu', 30:'3xzhi', 31:'3xzhi', 33:'3xzu3', 37:'3xzu3', 34:'3xzu6', 38:'3xzu6', 40:'5xzhi', 41:'5xzhi', 43:'5xt'};
			return codeArr[code];
        }
	    	    
	    return me;
		
	})();
	
})();

$(function(){
	inteval = setInterval("countdown()", cy);
    
    var boxes = {};
    
    cx.BoxCollection.prototype.init = function() {
		var self = this;
		this.$el.find('.add-basket').click(function() {
			if (self.calcMoney() > 20000) {
        		cx.Alert({content: "<i class='icon-font'>&#xe611;</i>单笔订单金额最高<span class='num-red'>２万</span>元"});
        		return;
        	}
    		var rule = cx.Lottery.getRule(self.getType(), self.isValid());
    		if (rule['status'] !== true) {
    			cx.Alert({content: rule['content'], size: rule['size']});
    		}else {
    			var balls = self.getAllBalls();
    			if (self.getType() == '3xzu3') {
        			balls = self.z3ballsplit(balls);
        			self.basket.addAll(balls);
        		}else if(self.edit === 0) {
            		self.basket.add(balls);
            	}else {
            		self.basket.edit(balls, self.edit);
            	}
            	self.removeAll();
            	$('html, body').animate({scrollTop: $('.cast-basket .btn-main').offset().top + $('.cast-basket .btn-main')[0].scrollHeight - $(window).height()});
    		}
        });
	}
    
    cx.BoxCollection.prototype.renderBet = function() {
		this.$el.find('.num-red:eq(0)').html(this.getNum(0)[0]);
		this.$el.find('.num-multiple').html(this.calcBetNum());
        this.$el.find('.num-money').html(this.calcMoney());
    	this.$el.find(".sub-txt1").hide();
    	var rule = cx.Lottery.getRule(this.getType(), this.isValid());
        if (rule['status'] === true) {
    		var playType = this.getType();
    		this.$el.find(".sub-txt").show();
    		this.caculateBonus(this.$el, this.getType(), this.calcMoney(), this.boxes);
            this.$el.find('.add-basket').removeClass('btn-disabled');
        } else {
        	this.$el.find(".sub-txt").hide();
        	this.$el.find('.add-basket').addClass('btn-disabled');
        }
    }
    
    cx.BoxCollection.prototype.rand1 = function(playType) {
    	var randStrs = {
            balls: [],
            betNum: 0,
            betMoney: 0
        }, startindex = cx.Lottery.getStartIndex(playType), arr = cx.Lottery.getMinLength(playType), amount = cx.Lottery.getAmount(playType);
    	randStrs.betNum = 1;
    	randStrs.betMoney = this.betMoney;
    	for (i in arr) {
    		randStrs.balls[i] = {};
    		randStrs.balls[i]['tuo'] = [];
    		while (randStrs.balls[i]['tuo'].length < arr[i]) {
        		j = Math.floor(Math.random() * (amount[i] - startindex[i] + 1) + startindex[i]);
        		if (playType == 'dxds' && $.inArray(j, [1, 2, 4, 5]) === -1) continue;
        		if ($.inArray(j, randStrs.balls[i]['tuo']) === -1) randStrs.balls[i]['tuo'].push(j);
        	}
    	}
    	if (playType == '3xzu3') randStrs.balls[0]['tuo'].push(randStrs.balls[0]['tuo'][0]);
        randStrs.playType = playType;
        return randStrs;
    }
    
    cx.BoxCollection.prototype.z3ballsplit = function(aball){
    	var ball = aball.balls[0]['tuo'], balls = {}, k = 0;
    	$.each(ball, function(i, a){
    		$.each(ball, function(j, b){
    			if (i != j) {
    				balls[k] = {
        				balls:[{'tuo' : [a, a, b]}],
        				betNum: 1,
        				betMoney: 2,
        				playType: "3xzu3"
        			};
    				k++;
    			}
    		})
    	})
    	return balls;
    };
    
    cx.BoxCollection.prototype.caculateBonus = function($el, playType, betMoney, balls) {
    	var index = parseInt(playType.replace(/(\D+)/ig, ''), 10);
    	switch (playType) {
    		case '1xzhi':
    		case '2xzhi':
    		case '2xzu':
    		case '3xzhi':
    		case '3xzu3':
    		case '3xzu6':
    		case '5xzhi':
    		case 'dxds':
    			var bigjj = smalljj = cx.Lottery.jiangjin[playType], smallyl = smalljj-betMoney, bigyl = bigjj-betMoney;
    			break;
    		case '5xt':
    			var n0 = balls[0].balls.length, n1 = balls[1].balls.length, n2 = balls[2].balls.length, n3 = balls[3].balls.length, n4 = balls[4].balls.length,
    			bigjj = 20440 + (n0 * n1 - 1) * 220 + (n3 * n4 - 1) * 220+(n0 * n1 * n2 - n0 * n1) * 20+(n2 * n3 * n4 - n3 * n4) * 20;
    			if (n0 == 10 && n1 == 10 && n2 == 10 && n3 == 10 && n4 == 10) {
    				smalljj = bigjj;
    			}else if (n2 == 10) {
    				smalljj = (220 + 9 * 20) * Math.min(n0 * n1, n3 * n4);
    			}else {
    				smalljj = n2 * 20 * Math.min(n0 * n1, n3 * n4);
    			}
    			smallyl = smalljj - betMoney, bigyl = bigjj - betMoney;
    			break;
    	}
    	str = '（如中奖，奖金 <span class="main-color-s">'
    	if (smalljj == bigjj) {
    		str += smalljj;
    	} else {
    		str += smalljj+'</span>~<span class="main-color-s">'+bigjj;
    	}
    	str += '</span> 元，';
    	if (smallyl == bigyl) {
    		if (smallyl >= 0) {
    			str += '盈利 <span class="main-color-s">'+smallyl;
    		} else {
    			str += '盈利 <span class="green-color">'+smallyl;
    		}
    	} else {
    		if (smallyl >= 0) {
    			str += '盈利 <span class="main-color-s">'+smallyl;
    		} else {
    			str += '盈利 <span class="green-color">'+smallyl;
    		}
    		if (bigyl >= 0) {
    			str += '</span>~<span class="main-color-s">'+bigyl;
    		} else {
    			str += '</span>~<span class="green-color">'+bigyl;
    		}
    	}
    	str += '</span> 元）';
    	$el.find(".sub-txt1").html(str).show();
    }
    
    cx.BallBox.prototype.init = function() {
		var self = this;
    	this.$balls = self.$el.find('.pick-area-ball '+self.smallel);
    	this.$balls.click(function() {
        	var $this = $(this);
        	self.BallTriger($this);
        });
        this.$el.find('.clear-balls').click(function() {
            self.removeBalls();
        });
        this.$el.find('.filter-bigs').click(function() {
            self.removeBalls();
            var ball, amount = cx.Lottery.getAmount(self.playType)[self.index], minBall = cx.Lottery.getStartIndex(self.playType)[self.index];
            for (var i = Math.ceil(amount / 2); i <= amount; ++i) {
                self.BallTriger(self.$balls.eq(i - minBall));
            }
        });
        this.$el.find('.filter-smalls').click(function() {
            self.removeBalls();
            var ball, amount = cx.Lottery.getAmount(self.playType)[self.index], minBall = cx.Lottery.getStartIndex(self.playType)[self.index];
            for (var i = minBall; i < Math.ceil(amount / 2); ++i) {
            	self.BallTriger(self.$balls.eq(i - minBall));
            }
        });
        this.$el.find('.filter-odds').click(function() {
            self.removeBalls();
            var ball, minBall = cx.Lottery.getStartIndex(self.playType)[self.index];
            for (var i = minBall; i <= cx.Lottery.getAmount(self.playType)[self.index]; ++i) {
            	if (i % 2) self.BallTriger(self.$balls.eq(i - minBall));
            }
        });
        this.$el.find('.filter-evens').click(function() {
            self.removeBalls();
            var ball, minBall = cx.Lottery.getStartIndex(self.playType)[self.index];
            for (var i = minBall; i <= cx.Lottery.getAmount(self.playType)[self.index]; ++i) {
            	if (i % 2 == 0) self.BallTriger(self.$balls.eq(i - minBall));
            }
        });
        this.$el.find('.filter-all').click(function() {
            self.removeBalls();
            var ball, minBall = cx.Lottery.getStartIndex(self.playType)[self.index];
            for (var i = minBall; i <= cx.Lottery.getAmount(self.playType)[self.index]; ++i) {
            	self.BallTriger(self.$balls.eq(i - minBall));
            }
        });
	}
    
    cx.BallBox.prototype.BallTriger = function($el, type) {
    	if (this.playType == 'dxds') {
    		var ball = $el.data('num');
    	}else {
    		var ball = $el.html();
    	}
        if ($el.hasClass('selected')) {
        	$el.removeClass('selected');
        	this.removeBall(ball, type);
        } else if (!this.ballValid(type)) {
        	cx.Alert({content: cx.Lottery.getRule(this.playType, [pad(this.collection.boxes.length, 5, this.index)])['content']});
        } else {
        	if (this.playType == 'dxds') this.removeAll();
        	$el.addClass('selected');
        	this.addBall(ball, type);
        }
        this.collection.renderBet();
    }
    
    cx.BallBox.prototype.removeBalls = function() {
    	var self = this;
        this.balls = [];
        this.$balls.removeClass('selected');
        this.collection.renderBet();
    }
    
    cx.BallBox.prototype.removeAll = function() {
        this.balls = [];
    	this.$balls.removeClass('selected');
        this.collection.renderBet();
    }
    
    cx.BallBox.prototype.calcComb = function() {
        var combCount = cx.Math.combine(this.balls.length, cx.Lottery.getMinLength(this.playType)[this.index]-this.dans.length);
    	if (this.playType == '3xzu3') combCount *= 2;
        return combCount;
    }
    
    cx.CastBasket.prototype.init = function() {
        var self = this;
        
        $.each(this.boxes, function(i, boxes){
        	boxes.setBasket(self);
        })
        
        this.multiModifier.setCb(function() {
        	self.multi = parseInt(this.getValue(), 10);
        	$('.Multi').html(self.multi);
            self.renderBetMoney();
            self.hemai.renderHeMai();
            self.chase.setChaseMulti(self.multi);
        });
        this.$el.find('.rand-cast').click(function() {
            var $this = $(this);
            var amount = parseInt($this.data('amount'), 10);
            self.randSelect(amount);
        });
        this.$el.on('click', '.remove-str', function() {
            var $li = $(this).closest('li');
            var index = $li.attr('data-index');
            for (i in self.boxes) {
            	if(index == self.boxes[i].edit) self.boxes[i].clearButton(i);
            }
            $li.remove();
            self.remove($li.data('index'));
        });
        this.$el.on('click', '.modify-str', function() {
        	var startindex, string = {};
        	self.$castList.find('li').removeClass('hover');
        	string = self.strings[$(this).parent('li').data('index')];
        	self.boxes[string.playType].edit = $(this).parent('li').addClass('hover').data('index');
        	if(string.playType !== self.playType) $("."+self.tab).filter("[data-type^="+string.playType+"]").trigger('click');
        	startindex = cx.Lottery.getStartIndex(self.playType)
        	self.boxes[self.playType].removeAll();
        	$.each(string.balls, function(n, balls){
        		$.each(balls['tuo'], function(i, ball){
        			if (self.playType === 'dxds') {
        				console.log(3);
        				if(!isNaN(ball)) self.boxes[self.playType].boxes[n].$balls.filter('[data-num='+ball+']').trigger('click');
        			} else {
        				if(!isNaN(ball)) self.boxes[self.playType].boxes[n].$balls.eq(ball - parseInt(startindex[n])).trigger('click');
        			}
        		})
        	})
            self.boxes[self.playType].renderBet();
            self.boxes[self.playType].$el.find('.add-basket').html('确认修改<i class="icon-font">&#xe614;</i>');
        });
        this.$el.find('.clear-list').click(function() {
            self.removeAll();
            for (i in self.boxes) {
            	self.boxes[i].clearButton(i);
            }
        });
        this.$el.on('click', '.submit', function(e) {
            var $this = $(this);
            self.submit($this, self);
        });
        this.$el.on('click', '.buy-type-hd li', function() {
        	switch($(this).index()) {
        		case 1:
        			cx._basket_.orderType = 1;
                    $(this).find('.ptips-bd').hide();
                    var str = '连续多期购买同一个（组）号码<span class="mod-tips"><i class="icon-font bubble-tip" tiptext="<em>追号：</em>选好投注号码后，对期数、期<br>号、倍数进行设置后，系统按照设置<br>进行购买。">&#xe613;</i>';
                    $(".chase-number-notes").html(str);
        			break;
        		case 0:
        			cx._basket_.orderType = 0;
                    $('#ordertype1').parents("span").find('.ptips-bd').show();
                    var str = '由购买人自行全额购买彩票，独享奖金<span class="mod-tips"><i class="icon-font bubble-tip" tiptext="<em>自购：</em>选好投注号码后，由自己全额<br>支付购彩款。中奖后，自己独享全部<br>税后奖金。">&#xe613;</i>';
                    $(".chase-number-notes").html(str);
        			break;
        	}
      	  	chgbtn();
        })
    }
        
    cx.CastBasket.prototype.renderString = function(allBalls, index, hover) {
    	var tpl = '<li ';
    	if(hover) tpl += ' class="hover"'
    	tpl += ' data-index="'+index+'"><span class="bet-type">';
        var playTypes = cx.Lottery.playTypes[allBalls.playType];
        if (typeof playTypes === 'object') {
        	tpl += cx.Lottery.getPlayTypeName(allBalls.betNum > 1 ? playTypes[1] : playTypes[0])
        }else {
        	tpl += cx.Lottery.getPlayTypeName(playTypes)
        }
        var ballTpl = [];
        $.each(allBalls.balls, function(pi, balls){
            var tmpTpl = '<span class="num-red">';
            $.each(balls['tuo'].sort(sort), function(ti, ball){
            	if (allBalls.playType === 'dxds') {
            		tmpTpl += cx.Lottery.dxdsMap[ball] + ' ';
        		}else {
        			tmpTpl += ball + ' ';
        		}
            })
            tmpTpl += '</span>';
            ballTpl.push(tmpTpl);
        })
        ballTpl = ballTpl.join('<em>|</em>');
    	tpl += '</span><div class="num-group">'+ballTpl+'</div><a href="javascript:;" class="remove-str">删除</a>'
    	if (allBalls.playType !== '3xzu3') tpl += '<a href="javascript:;" class="modify-str">修改</a>';
    	tpl += '<span class="bet-money">'+ allBalls.betMoney +'元</span></li>';
        return tpl;
    }
    
    cx.CastBasket.prototype.setType = function(type) {
    	this.playType = type;
    	$(".php-"+this.playType+" .pick-area-time").html("<em><b>"+ISSUE.substring(2, 9)+"</b></em>期剩余<span>"+maketstr(tm)+"</span><i class='arrow'></i>");
	    var tpl = '', ballStr = '', bubbleTipTpl = ''; index = $(this).index(), yl = '<div class="mod-tips">遗漏<div class="ptips-bd-t">指该号码自上次开出后没有出现的次数<b></b><s></s></div></div>', missData = miss[type];
	    if (!$('.bet-type-link-item.php-'+this.playType).find('.bet-pick-area').length) {
	        var num = parseInt(this.playType, 10), self = this;
	        if (isNaN(num)) {
	            var i = num = 2;
	        } else {
	            // 组选
	            if (this.playType.indexOf('zu') > 0) num = 1;
	            var i = num;
	        }
	        
	        $.each(missData, function(key, mdata){
	        	if (self.playType == 'dxds' && key < 3) return true
            	ballStr = '';
            	mdata = mdata.split(',');
            	maxMdata = mdata.concat().sort(function (a, b) {return b - a})[0]
            	for(var k = 0; k < mdata.length; k++) {
            		if (self.playType == 'dxds') {
            			// 最大遗漏标红
    	                if (mdata[k] == maxMdata) {
    	                    ballStr += '<li><a data-num='+ cx.Lottery.map.dxdsNum[k] +' href="javascript:;">' + cx.Lottery.map.dxds[k] + '</a><i class="num-red">'+ Math.max(mdata[k], 0) +'</i></li>'
    	                } else {
    	                    ballStr += '<li><a data-num='+ cx.Lottery.map.dxdsNum[k] +' href="javascript:;">' + cx.Lottery.map.dxds[k] + '</a><i>'+ Math.max(mdata[k], 0) +'</i></li>'
    	                }
            		}else {
            			// 最大遗漏标红
    	                if (mdata[k] == maxMdata) {
    	                    ballStr += '<li><a href="javascript:;">' + k + '</a><i class="num-red">'+ Math.max(mdata[k], 0) +'</i></li>'
    	                } else {
    	                    ballStr += '<li><a href="javascript:;">' + k + '</a><i>'+ Math.max(mdata[k], 0) +'</i></li>'
    	                }
            		}
	            }
            	
            	if (self.playType != 'dxds') {
            		ballStr = '<ol class="pick-area-ball balls">' + ballStr + '</ol><div class="pick-area-select"><a href="javascript:;" class="filter-all">全</a><a href="javascript:;" class="filter-bigs">大</a><a href="javascript:;" class="filter-smalls">小</a><a href="javascript:;" class="filter-odds">奇</a>\
            		<a href="javascript:;" class="filter-evens">偶</a><a href="javascript:;" class="clear-balls">清空</a></div>'
            	}else {
            		ballStr = '<ol class="pick-area-ball balls">' + ballStr + '</ol>'
            	}
            	if (missData.length === 1) {
	                tpl += '<div class="pick-area-red pre-box"><div class="pick-area-tips"><span class="choose-tip">选号<i class="arrow"></i></span>' + yl + '</div>' + ballStr + '</div>'
	            } else {
                    tpl += '<div class="pick-area-red pre-box '+(self.playType == 'dxds' ? 'dxds' : '')+'"><div class="pick-area-tips"><span class="choose-tip">' + cx.Lottery.map.ws[missData.length-key-1] + '位<i class="arrow"></i></span>' + yl + '</div>' + ballStr + '</div>'
                    i--
	            }
            })
            
            var bbtArr = cx.Lottery.renderData.bubbleTip[cx.Lottery.map.zy[this.playType]].split('|');
            for(var j = 0, bbtArrL = bbtArr.length; j < bbtArrL; j++) {
                bubbleTipTpl += '<ul>'
                var bbtArrChild = bbtArr[j].split('；');
                for(var d = 0, bbtArrChildL = bbtArrChild.length; d < bbtArrChildL; d++) {
                    bubbleTipTpl += '<li>' + bbtArrChild[d] + '</li>'
                }
                bubbleTipTpl += '</ul>'
            } 
	
	        tpl = '<div class="bet-pick-area"><div class="pick-area-box">\
	                    <p class="pick-area-explain"><i class="icon-font"></i>玩法说明：' + cx.Lottery.renderData.tips[cx.Lottery.map.zy[this.playType]] + '<span class="mod-tips"><i class="icon-font bubble-tip" tiptext="' + bubbleTipTpl + '"></i></span></p>\
	                    <div class="pick-area"><div class="pick-area-time"><em></em>剩余<span></span><i class="arrow"></i></div>' + tpl + '</div>\
	                </div><div class="bet-solutions box-collection">\
	                    <p><span>您已选中了 <strong class="num-multiple">0</strong> 注，共 <strong class="num-money">0</strong> 元</span><span class="sub-txt1">（如中奖，奖金 <span class="main-color-s">0</span> 元，盈利 <span class="main-color-s">0</span> 元）</span></p>\
	                    <div class="btn-pools"><a class="btn btn-specail add-basket btn-disabled btn-add2bet">添加到投注区<i class="icon-font"></i></a></div>\
	                </div>\
	            </div>'
	        $('.bet-type-link-item.php-'+this.playType).append(tpl)
	        this.boxes[this.playType] = new cx.BoxCollection(".php-"+this.playType+" .box-collection");
	        for (i = 0; i < num; i++) {
	        	this.boxes[this.playType].add(new cx.BallBox(".php-"+this.playType+" .pick-area-red :eq("+i+")", {playType: this.playType}));
	        }
	        this.boxes[this.playType].setBasket(basket);
	    }
	    $('.bet-type-link-item.php-'+this.playType).show().siblings().hide();
	    rfshhisty(this.playType);
        this.boxes[this.playType].renderBet();
        if(this.boxes[this.playType].edit > 0) this.$castList.find('li').removeClass('hover').filter('[data-index="'+this.boxes[this.playType].edit+'"]').addClass('hover');
	}
    
    $.extend(cx.castData, {'toCastString':function(subStrings){
    	var betStr = [], ballStr = [], preStr = [];
    	$.each(subStrings, function(k, subString){
    		var playType = subString.playType || 'default', postStr = ':' +cx.Lottery.getCastPost(playType);
        	if (typeof cx.Lottery.playTypes[playType] === 'object') {
        		var midStr = ':' + ((subStrings[k].betNum > 1) ? cx.Lottery.playTypes[playType][1] : cx.Lottery.playTypes[playType][0]);
        	}else {
        		var midStr = ':' + cx.Lottery.playTypes[playType];
        	}
            preStr = [];
            $.each(subString.balls, function(j, ball){
            	ballStr = [];
            	$.each(ball['tuo'].sort(sort), function(i, tuo){
            		ballStr.push(tuo);
            	})
                preStr.push(ballStr.join(cx.Lottery.getNumberSeparator(playType)));
            })
            preStr = preStr.join(cx.Lottery.getPlaceSeparator(playType));
            betStr.push(preStr + midStr + postStr);
    	})
        return betStr.join(';');
	}})
    
    var multiModifier = new cx.AdderSubtractor('.multi-modifier'), 
    basket = new cx.CastBasket('.cast-basket', {boxes: boxes, multi: MULTI, chases: chase, chaseLength: chaselength, tab: 'bet-type-link li', tabClass: 'selected', multiModifier: multiModifier, playType: type});
    cx._basket_ = basket;    
    
    $('.past-award').click(function(){
    	if (!$('.bet-drop-ft .view-kj').hasClass('active')) $('.bet-drop-ft .view-kj').trigger('click');
    	var calcHeight = $('.bet-drop-ft').offset().top;
        $('body, html').animate({scrollTop: calcHeight}, 400); 
    })

    $('.bet-drop-ft').on('click', 'dt', function() {
        $(this).toggleClass('active').closest('dl').find('dd').slideToggle();
    }).on('click', '.view-kj', function () {            
        var $parent = $(this).closest('dl');
        var tpl = '';
        if (!$parent.find('dd').find('table').length) {
            $.ajax({
                type: "get",
                url: "/ajax/getKj/cqssc",
                dataType: "json",
                beforeSend: function () {
                     $parent.find('dd').append('<div style="padding: 10px 0 ;text-align:center; color: #333;">加载中。。。</div>')
                },
                success: function (res) {
                    var renderData = res;
                    tpl = '<div class="k3-table-kj cqssc-table-kj">';
                    for(var i = 0; i < 4; i++) {
                        tpl += '<table><thead><tr><th width="15%">期次</th><th width="31%">开奖号码</th><th width="18%">十位</th><th width="18%">个位</th><th width="18%">后三</th></tr></thead><tbody>';
                            for(var j = i * 30; j < (i + 1) * 30; j++) {
                            	if (j+1 < 10) {
                            		key = '00' + (j+1)
                            	}else if (j+1 < 100) {
                            		key = '0' + (j+1)
                            	}else {
                            		key = j+1;
                            	}
                                if (renderData[key] === undefined) {
                                    tpl += '<tr><th>' + key+ '</th><td></td><td></td><td></td><td></td></tr>'
                                } else {
                                    var codes = renderData[key].award.split(',');
                                    tpl += '<tr><th>' + key + '</th><td>';
                                    for(var k = 0, codesL = codes.length; k < codesL; k++){
                                        tpl += '<span class="ball ball-red">' + codes[k] + '</span>'
                                    }
                                    tpl += '</td><td>' + renderData[key].sw + '</td><td>' + renderData[key].gw + '</td><td><span class="'+ cx.Lottery.hsMap[renderData[key].xt] +'">' + renderData[key].xt + '</span></td></tr>'
                                }
                            }
                        tpl += '</tbody></table>'        
                    }
                    tpl += '</div>'
                    $parent.find('dd').html(tpl)
                }
            })
        }
    })

     // 中奖规则
    !function () {
        var hoverTimer = null;
        $('.lotteryTit').on('mouseover', '.rule', function () {
            var $parent = $(this).closest('.lotteryTit'), $target = $parent.find('.det_pop');
            hoverTimer = setTimeout(function () {
                if (!$target.length) {
                    $parent.append(
                        '<div class="det_pop">\
                            <div class="arr"></div>\
                            <table width="695">\
                                <colgroup><col width="62"><col width="80"><col width="133"><col width="338"><col width="82"></colgroup><thead><tr><th>玩法</th><th>开奖号码示例</th><th>投注号码示例</th><th>中奖规则</th><th>单注奖金</th></tr></thead>\
                                <tbody>\
                                    <tr><td>一星直选</td><td rowspan="10">1 2 3 4 5</td><td class="tal">5</td><td class="tal">选1个号码，猜中开奖号码最后一位</td><td class="tar"><em>10</em>元</td></tr>\
                                    <tr><td>二星直选</td><td class="tal">4 5</td><td class="tal">选2个号码，按位猜中开奖号码最后二位</td><td class="tar"><em>100</em>元</td></tr>\
                                    <tr><td>二星组选</td><td class="tal">4 5</td><td class="tal">选2个号码，猜中开奖号码最后二位(顺序不限)</td><td class="tar"><em>50</em>元</td></tr>\
                                    <tr><td>三星直选</td><td class="tal">3 4 5</td><td class="tal">选3个号码，按位猜中开奖号码最后三位</td><td class="tar"><em>1000</em>元</td></tr>\
                                    <tr><td>三星组六</td><td class="tal">3 4 5</td><td class="tal">选3个号码，猜中开奖号码最后三位且为组六形态(顺序不限)</td><td class="tar"><em>160</em>元</td></tr>\
                                    <tr><td>五星直选</td><td class="tal">1 2 3 4 5</td><td class="tal">选5个号码，按位猜中全部开奖号码</td><td class="tar"><em>10万</em>元</td></tr>\
                                    <tr><td rowspan="3">五星通选</td><td class="tal">1 2 3 4 5</td><td class="tal">选5个号码，按位猜中全部开奖号码</td><td class="tar"><em>20440</em>元</td></tr>\
                                    <tr><td class="tal">1 2 3 * * 或 * * 3 4 5</td><td class="tal">选5个号码，按位猜中开奖号码前三位或后三位</td><td class="tar"><em>220</em>元</td></tr>\
                                    <tr><td class="tal">1 2 * * * 或 * * * 4 5</td><td class="tal">选5个号码，按位猜中开奖号码前二位或后二位</td><td class="tar"><em>20</em>元</td></tr>\
                                    <tr><td>大小单双</td><td class="tal">双单/双大/小单/小大</td><td class="tal">按位猜中开奖号码后二位数字属性</td><td class="tar"><em>4</em>元</td></tr>\
                                    <tr><td>三星组三</td><td>1 2 3 6 6</td><td class="tal">3 6 6</td><td class="tal">选2个号码，猜中开奖号码最后三位且为组三形态(顺序不限)</td><td class="tar"><em>320</em>元</td></tr>\
                                </tbody>\
                            </table>\
                        </div>'
                    )
                }
                $('.lotteryTit .det_pop').show()
            }, 500)
        }).on('mouseout', function () {
            clearTimeout(hoverTimer)
            $('.lotteryTit .det_pop').hide()
        })
    }()

    $('.my-order-hd').on('click', function(){
    	$this = $(this);
    	var myOrder = $this.closest('.my-order');
    	if (!$('.my-order').hasClass('my-order-open')) {
    		if (!$.cookie('name_ie')) {
            	cx.PopAjax.login();
                return ;
            }
        	$.ajax({
    			url: "/ajax/getOrders/cqssc",
    			dataType: 'json',
    			success: function(renderData) {
    		        var myOrderBd = myOrder.find('.my-order-bd'), tpl = '', renderDataLength = renderData.length;
    		        if (renderDataLength) {
    		            for(var i = 0; i < renderDataLength; i++) {
    		            	var codesArr = renderData[i].codes.split(';'), codesTpl = '', showTpl = '';
    		            	$.each(codesArr, function(k, codes){
    		            		var codeArr = codes.split(':'), playTypeName = cx.Lottery.getPlayTypeName(parseInt(codeArr[1], 10));
    		            		if (codeArr[1] === '1') {
    		            			var code0Arr = codeArr[0].split(',');
    		            			$.each(code0Arr, function(ck, code){
    		            				code0Arr[ck] = cx.Lottery.dxdsMap[code];
    		            			})
    		            			codeStr = code0Arr.join('|');
    		            		}else if (playTypeName.indexOf('组') === -1) {
    		            			var codeStr = codeArr[0].replace(/,/g, ' | ').replace(/(\d)(\d)/g, '$1 $2').replace(/(\d)(\d)/g, '$1 $2');
    		            		}else {
    		            			var codeStr = codeArr[0].replace(/,/g, ' ');
    		            		}
    		            		codesTpl += playTypeName+': '+codeStr+' ; ';
    		            		if (showTpl === '') {
    		            			showTpl = playTypeName+': <span class="specil-color">'+codeStr+'</span>';
    		            		}else if (k == 1) {
    		            			showTpl += '...';
    		            		}
    		            	})
    		                tpl += '<tr><td>' + renderData[i].created + '</td><td>' + renderData[i].issue + '</td><td class="tal" title="'+codesTpl+'"><div class="text-overflow">' + showTpl +'</div></td><td><span class="fcs">' + renderData[i].money/100 + '.00</span></td><td><span class="fcs">'+ cx.Order.getStatus(renderData[i].status, renderData[i].my_status) + '</span></td>';
    		            	if (renderData[i].margin > 0) {
    		            		tpl += '<td><img src="/caipiaoimg/v1.1/img/gold.png" alt="">&nbsp;<strong class="spec arial">'+fmoney(renderData[i].margin / 100, 3)+'.00</strong></td>';
    						}else if($.inArray(renderData[i].status, ['1000', '2000']) === -1) {
    							tpl += '<td>--</td>'
    						}else {
    							tpl += '<td>'+fmoney(renderData[i].margin / 100, 3)+'.00</td>';
    						}
    		            	tpl += '<td><a target="_blank" href="/orders/detail/'+renderData[i].orderId+'">查看详情</a>';
    		            	if (renderData[i].ljzf == 1) {
    		            		tpl += '<a href="javascript:cx.castCb({orderId:\''+renderData[i].orderId+'\'}, {ctype:\'paysearch\', orderType:0});"><span class="num-red">立即支付</span></a>';
    						}else {
    							tpl += '<a target="_blank" href="/cqssc?orderId='+renderData[i].orderId+'">继续预约</a></td><td></td></tr>';
    						}
    		            }
    		        } else {
    		            tpl += '<tr><td colspan="8" style="height: 100px;">亲，您三个月内还没有订单哦！</td></tr>'
    		        }
		            tpl = '<table><thead><tr><th width="160">时间</th><th width="92">期次</th><th width="276">方案内容</th><th width="80">订单金额</th><th width="82">订单状态</th><th width="116">我的奖金</th><th width="162">操作</th><th width="30"><a href="/mylottery/betlog" target="_blank">更多</a></th></tr></thead><tbody>' + tpl + '</tbody></table>';
    		        myOrderBd.html(tpl);
    			}
        	})
    	}    	
    	myOrder.toggleClass('my-order-open');
    	myOrder.find('.my-order-bd').slideToggle();
    })
    $('.ykj-info').find('tr:last-child').show();
    
    $('#chart').on('click', '.bet-tab-hd li', function () {
        var $parent = $(this).closest('#chart');
        var index = $(this).index();
        $(this).addClass('current').siblings().removeClass('current');
        $parent.find('.table-chart-item').eq(index).show().siblings().hide()
        if ($.inArray(cx._basket_.playType, ['1xzhi', '2xzhi', '3xzhi', '5xzhi', '5xt']) > -1) canvas()
    })
    
    kjNumAimation(vJson)
    setTimeout(function(){
        kjNumAimation(vJson)
    }, 2000)
        
    // 滚动接近tab模块时，吸顶
    var ceilingBox = $('.bet-syxw .cp-box-bd'), ceilingBoxTop, thisWindow = $(window), beforeScrollTop = thisWindow.scrollTop();
    thisWindow.on('scroll', function(){
        afterScrollTop = thisWindow.scrollTop();
        ceilingBoxTop = ceilingBox.offset().top;
        // 向下滚动
        if(afterScrollTop > beforeScrollTop && afterScrollTop >= ceilingBoxTop - 120 && afterScrollTop < ceilingBoxTop) $('html, body').scrollTop(ceilingBoxTop)
        beforeScrollTop = afterScrollTop;
    })
    $('.ykj-info-action').on('click', function(){
        var ykjInfo = $(this).closest('.ykj-info');
        // 控制是否展开
        ykjInfo.toggleClass('ykj-info-open').find('tr').toggle();
        $('.ykj-info').find('tbody tr:last-child').show();
        // 显示隐藏canvas
        $('.canvas-mask').toggle();
        if($('.ykj-info').hasClass('ykj-info-open') && $.inArray(cx._basket_.playType, ['1xzhi', '2xzhi', '3xzhi', '5xzhi', '5xt']) > -1) canvas()
    })
    
    $('.bet-type-link-item').on('mouseenter', '.bubble-tip', function(){
        $.bubble({
            target:this,
            position: 'b',
            align: 'l',
            content: $(this).attr('tiptext'),
            width:'100px',
            autoClose: false
        })
    }).on('mouseleave', '.bubble-tip', function(){
        $('.bubble').hide();
    });
})
    
var rfshhisty = function(type) {
	var tpl = '', tplHd = '', tplBd = '';
	switch (type) {
		case '1xzhi':
            tplHd += '<colgroup><col width="160"><col width="506"><col width="152"><col width="45"><col width="45"><col width="45"><col width="45"></colgroup><thead><tr><th>期次</th><th class="column-num"><div class="ball-group-s">' + ballTpl() + '</div></th><th>开奖号码</th><th>大</th><th>小</th><th>单</th><th>双</th></tr>';
			$.each(hsty, function(i, ht){
		        tplBd += '<tr' +((i == hsty.length-1) ? ' style="display: table-row;"' : '')+ '><td>' + ht.issue + '</td>';
		        if (ht.awardNum && ht.issue in mall) {
		            var awards = awardsTpl(ht.awardNum.split(','), ['个']), awardNum = ht.awardNum.split(',')[4], dxdsmisscurrent = mall[ht.issue][6].split('|')[4].split(',');
		            tplBd += '<td class="column-num"><div class="ball-group-s column-1">' + ballTpl(mall[ht.issue][5].split(','), [awardNum]) + '</div></td><td><div class="num-group">' + awards.tpl + '</div></td>';
		            if (awardNum > 4) {
		                tplBd += '<td><em class="color-box coffee">大</em></td><td><span class="omit">'+dxdsmisscurrent[1]+'</span></td>'
		            } else {
		                tplBd += '<td><span class="omit">'+dxdsmisscurrent[0]+'</span></td><td><em class="color-box coffee">小</em></td>'
		            }
		            if (awardNum % 2) {
		                tplBd += '<td><em class="color-box blue">单</em></td><td><em><span class="omit">'+dxdsmisscurrent[3]+'</span></em></td>'
		            } else {
		                tplBd += '<td><span class="omit">'+dxdsmisscurrent[2]+'</span></td><td><em class="color-box blue">双</em></td>'
		            }
		        } else if (atm > 0 && !ht.award_time) {
		        	tplBd += '<td class="column-num"><em class="main-color-s atime">'+maketstr(atm)+'</em>后开奖...</td><td></td><td></td><td></td><td></td><td></td>'
		        } else if (!ht.award_time) {
		            tplBd += '<td class="column-num">正在开奖中...</td><td></td><td></td><td></td><td></td><td></td>'
		        } else {
		        	tplBd += '<td colspan="6"></td>'
		        }
		        tplBd += '</tr>'
			})
		    tpl += '<table class="cqssc-table-kj">' + tplHd + '</thead><tbody>' + tplBd + '</tbody></table>'
			break;
		case '2xzu':
			tplHd += '<colgroup><col width="160"><col width="506"><col width="152"><col width="45"><col width="45"><col width="45"><col width="45"></colgroup><thead><tr><th>期次</th><th class="column-num"><div class="ball-group-s">' + ballTpl() + '</div></th><th>开奖号码</th><th>大</th><th>小</th><th>单</th><th>双</th></tr>';
			$.each(hsty, function(i, ht){
				tplBd += '<tr' +((i == hsty.length-1) ? ' style="display: table-row;"' : '')+ '><td>' + ht.issue + '</td>';
		        if (ht.awardNum && ht.issue in mall) {
		            var awards = awardsTpl(ht.awardNum.split(','), ['十', '个']);
		            tplBd += '<td class="column-num"><div class="ball-group-s column-1">' + ballTpl(mall[ht.issue][4].split(','), [ht.awardNum.split(',')[3], ht.awardNum.split(',')[4]]) + '</div></td><td><div class="num-group">' + awards.tpl + '</div></td>';
		        
		            var listNum = cate(ht.awardNum.split(',')[3], ht.awardNum.split(',')[4])
		            for(var k in listNum){
		                tplBd += '<td>' + listNum[k] + '</td>';
		            }
		        } else if (atm > 0 && !ht.award_time) {
		        	tplBd += '<td class="column-num"><em class="main-color-s atime">'+maketstr(atm)+'</em>后开奖...</td><td></td><td></td><td></td><td></td><td></td>'
		        } else if (!ht.award_time) {
		            tplBd += '<td class="column-num">正在开奖中...</td><td></td><td></td><td></td><td></td><td></td>'
		        } else {
		        	tplBd += '<td colspan="6"></td>'
		        }
		        tplBd += '</tr>'
			})
		    tpl += '<table>' + tplHd + '</thead><tbody>' + tplBd + '</tbody></table>'
			break;
		case '3xzu3':
		case '3xzu6':
			tplHd += '<colgroup><col width="160"><col width="506"><col width="152"><col width="60"><col width="60"><col width="60"><col width="45"></colgroup><thead><tr><th>期次</th><th class="column-num"><div class="ball-group-s">' + ballTpl() + '</div></th><th>开奖号码</th><th>组三</th><th>组六</th><th>豹子</th></tr>';
			$.each(hsty, function(i, ht){
				tplBd += '<tr' +((i == hsty.length-1) ? ' style="display: table-row;"' : '')+ '><td>' + ht.issue + '</td>';
		        if (ht.awardNum && ht.issue in mall) {
		            var awards = awardsTpl(ht.awardNum.split(','), ['百', '十', '个']);
		            tplBd += '<td class="column-num"><div class="ball-group-s column-1">' + ballTpl(mall[ht.issue][2].split(','), [ht.awardNum.split(',')[2], ht.awardNum.split(',')[3], ht.awardNum.split(',')[4]]) + '</div></td><td><div class="num-group">' + awards.tpl + '</div></td>';
		        
		            var listNum = cate(ht.awardNum.split(',')[2], ht.awardNum.split(',')[3], ht.awardNum.split(',')[4]);
		            if (listNum === '豹子') {
		                tplBd += '<td><span class="omit">'+mall[ht.issue][7].split(',')[0]+'</span></td><td><span class="omit">'+mall[ht.issue][7].split(',')[1]+'</span></td><td><em class="bz">豹子</em></td>';
		            } else if (listNum === '组三') {
		                tplBd += '<td><em class="zs">组三</em></td><td><span class="omit">'+mall[ht.issue][7].split(',')[1]+'</span></td><td><span class="omit">'+mall[ht.issue][7].split(',')[2]+'</span></td>';
		            } else {
		                tplBd += '<td><span class="omit">'+mall[ht.issue][7].split(',')[0]+'</span></td><td><em class="zl">组六</em></td><td><span class="omit">'+mall[ht.issue][7].split(',')[2]+'</span></td>';
		            }
		        } else if (atm > 0 && !ht.award_time) {
		        	tplBd += '<td class="column-num"><em class="main-color-s atime">'+maketstr(atm)+'</em>后开奖...</td><td></td><td></td><td></td><td></td><td></td>'
		        } else if (!ht.award_time) {
		            tplBd += '<td class="column-num">正在开奖中...</td><td></td><td></td><td></td><td></td><td></td>'
		        } else {
		        	tplBd += '<td colspan="6"></td>'
		        }
		        tplBd += '</tr>'
			})
		    tpl += '<table class="cqssc-table-kj">' + tplHd + '</thead><tbody>' + tplBd + '</tbody></table>'
			break;
		case '2xzhi':
			tplHd += '<colgroup><col width="160"><col width="293"><col width="293"><col width="152"><col width="50"><col width="50"></colgroup><thead><tr><th>期次</th><th class="column-num"><div class="ball-group-s">' + ballTpl() + '</div></th><th class="column-num"><div class="ball-group-s">' + ballTpl() + '</div></th><th>开奖号码</th><th>十位</th><th>个位</th></tr>';
			$.each(hsty, function(i, ht){
				tplBd += '<tr' +((i == hsty.length-1) ? ' style="display: table-row;"' : '')+ '><td>' + ht.issue + '</td>';
		        if (hsty[i].awardNum && ht.issue in mall) {
		            var awards = awardsTpl(ht.awardNum.split(','), ['个', '十']), shiaward = ht.awardNum.split(',')[3], geaward = ht.awardNum.split(',')[4];
		            tplBd += '<td class="column-num"><div class="ball-group-s column-1">' + ballTpl(mall[ht.issue][3].split('|')[0].split(','), [shiaward]) + '</div></td><td class="column-num"><div class="ball-group-s column-2">' + ballTpl(mall[ht.issue][3].split('|')[1].split(','), [geaward]) + '</div></td><td><div class="num-group">' + awards.tpl + '</div></td>'
		            tplBd += '<td>' + dx(shiaward) + ds(shiaward) + '</td><td>' + dx(geaward) + ds(geaward) + '</td>'
		        } else if (atm > 0 && !ht.award_time) {
		        	tplBd += '<td class="column-num" colspan="2"><em class="main-color-s atime">'+maketstr(atm)+'</em>后开奖...</td><td></td><td></td><td></td>'
		        } else if (!ht.award_time) {
		            tplBd += '<td class="column-num" colspan="2">正在开奖中...</td><td></td><td></td><td></td>'
		        } else {
		        	tplBd += '<td colspan="4"></td>'
		        }
		        tplBd += '</tr>'
			})
		    tpl += '<table class="mutilColumn">' + tplHd + '</thead><tbody>' + tplBd + '</tbody></table>'
			break;
		case '3xzhi':
			var numTpl = ballTpl();
		    tplHd += '<colgroup><col width="128"><col width="290"><col width="290"><col width="290"></colgroup><thead><tr><th>期次</th><th class="column-num"><div class="ball-group-s">' + numTpl + '</div></th><th class="column-num"><div class="ball-group-s">' + numTpl + '</div></th><th class="column-num"><div class="ball-group-s">' + numTpl + '</div></th></tr>';
		    $.each(hsty, function(i, ht){
		    	tplBd += '<tr' +((i == hsty.length-1) ? ' style="display: table-row;"' : '')+ '><td>' + ht.issue + '</td>';
		        if (hsty[i].awardNum && ht.issue in mall) {
		            var awards = awardsTpl(ht.awardNum.split(','), ['百', '十', '个']);
		            tplBd += '<td class="column-num"><div class="ball-group-s column-1">' + ballTpl(mall[ht.issue][1].split('|')[0].split(','), [ht.awardNum.split(',')[2]]) + '</div></td><td class="column-num"><div class="ball-group-s column-2">' + ballTpl(mall[ht.issue][1].split('|')[1].split(','), [ht.awardNum.split(',')[3]]) + '</div></td><td class="column-num"><div class="ball-group-s column-3">' + ballTpl(mall[ht.issue][1].split('|')[2].split(','), [ht.awardNum.split(',')[4]]) + '</div></td>';
		        } else if (atm > 0 && !ht.award_time) {
		        	tplBd += '<td class="column-num" colspan="3"><em class="main-color-s atime">'+maketstr(atm)+'</em>后开奖...</td>'
		        } else if (!ht.award_time) {
		            tplBd += '<td class="column-num" colspan="3">正在开奖中...</td>'
		        } else {
		        	tplBd += '<td colspan="3"></td>'
		        }
		        tplBd += '</tr>'
		    })
		    tpl += '<table class="mutilColumn">' + tplHd + '</thead><tbody>' + tplBd + '</tbody></table>'
			break;
		case '5xzhi':
		case '5xt':
			var ws = ['万', '千', '百', '十', '个'];
			if ($("#chart").find('.bet-tab-hd').length > 0) var index = $("#chart").find('.bet-tab-hd ul li[class=current]').index();
		    tpl += '<div class="bet-tab-hd"><ul><li class="current"><a href="javascript:;">万位</a></li><li><a href="javascript:;">千位</a></li><li><a href="javascript:;">百位</a></li><li><a href="javascript:;">十位</a></li><li><a href="javascript:;">个位</a></li></ul></div><div class="bet-tab-bd">'
		    for(var k = 0, wsL = ws.length; k < wsL; k++) {
		        tpl += '<div class="table-chart-item"><table class="cqssc-table-kj"><colgroup><col width="160"><col width="506"><col width="152"><col width="45"><col width="45"><col width="45"><col width="45"></colgroup><thead><tr><th>期次</th><th class="column-num"><div class="ball-group-s">' + ballTpl() + '</div></th><th>开奖号码</th><th>大</th><th>小</th><th>单</th><th>双</th></tr></thead><tbody>';
		        $.each(hsty, function(i, ht){
		        	tpl += '<tr' +((i == hsty.length-1) ? ' style="display: table-row;"' : '')+ '><td>' + ht.issue + '</td>';
		            if (hsty[i].awardNum && ht.issue in mall) {
		                var awards = awardsTpl(ht.awardNum.split(','), ws[k]), awardNum = ht.awardNum.split(',')[k];
		                tpl += '<td class="column-num"><div class="ball-group-s column-1">' + ballTpl(mall[ht.issue][0].split('|')[k].split(','), [awardNum]) + '</div></td><td><div class="num-group">' + awards.tpl + '</div></td>';
		                if (awardNum > 4) {
		                	tpl += '<td><em class="color-box coffee">大</em></td><td><span class="omit">'+ mall[ht.issue][6].split('|')[k].split(',')[1] +'</span></td>'
		                } else {
		                	tpl += '<td><span class="omit">'+ mall[ht.issue][6].split('|')[k].split(',')[0] +'</span></td><td><em class="color-box coffee">小</em></td>'
		                }
		                if (awardNum % 2) {
		                	tpl += '<td><em class="color-box blue">单</em></td><td><em><span class="omit">'+ mall[ht.issue][6].split('|')[k].split(',')[3] +'</span></em></td>'
		                } else {
		                	tpl += '<td><span class="omit">'+ mall[ht.issue][6].split('|')[k].split(',')[2] +'</span></td><td><em class="color-box blue">双</em></td>'
		                }
		            } else if (atm > 0 && !ht.award_time) {
		            	tpl += '<td class="column-num"><em class="main-color-s atime">'+maketstr(atm)+'</em>后开奖...</td><td></td><td></td><td></td><td></td><td></td>'
		            } else if (!ht.award_time) {
		                tpl += '<td class="column-num">正在开奖中...</td><td></td><td></td><td></td><td></td><td></td>'
		            } else {
		            	tpl += '<td colspan="6"></td>'
		            }
		            tpl += '</tr>'
		        })
		        tpl += '</tbody></table></div>'
		    }
		    tpl += '</div>'
			break;
		default:
            tplHd += '<colgroup><col width="100"><col width="64"><col width="45"><col width="45"><col width="45"><col width="45"><col width="60"><col width="45"><col width="45"><col width="45"><col width="45"><col width="415"></colgroup><thead><tr><th></th><th></th><th colspan="4">十位属性</th><th></th><th colspan="4">个位属性</th><th></th></tr><tr><th>期次</th><th>开奖号码</th><th>大</th><th>小</th><th>单</th><th>双</th><th></th><th>大</th><th>小</th><th>单</th><th>双</th><th></th></tr>';
			var ws = ['十', '个'];
			$.each(hsty, function(i, ht){
				tplBd += '<tr' +((i == hsty.length-1) ? ' style="display: table-row;"' : '')+ '><td>' + ht.issue + '</td>';
	            if (ht.awardNum && ht.issue in mall) {
	                var awards = awardsTpl(ht.awardNum.split(','), ws);
	                tplBd += '<td><div class="num-group">' + awards.tpl + '</div></td>';
	                for(var k = 0, wsL = ws.length; k < wsL; k++) {
	                    if (ht.awardNum.split(',')[k+3] > 4) {
	                        tplBd += '<td><em class="color-box coffee">大</em></td><td><span class="omit">'+ mall[ht.issue][6].split('|')[k+3].split(',')[1] +'</span></td>'
	                    } else {
	                        tplBd += '<td><span class="omit">'+ mall[ht.issue][6].split('|')[k+3].split(',')[0] +'</span></td><td><em class="color-box coffee">小</em></td>'
	                    }
	                    if (ht.awardNum.split(',')[k+3] % 2) {
	                        tplBd += '<td><em class="color-box blue">单</em></td><td><em><span class="omit">'+ mall[ht.issue][6].split('|')[k+3].split(',')[3] +'</span></em></td>'
	                    } else {
	                        tplBd += '<td><span class="omit">'+ mall[ht.issue][6].split('|')[k+3].split(',')[2] +'</span></td><td><em class="color-box blue">双</em></td>'
	                    }
	                    tplBd += '<td></td>'
	                }
	            } else if (atm > 0 && !ht.award_time) {
		        	tplBd += '<td class="column-num" colspan="11"><em class="main-color-s atime">'+maketstr(atm)+'</em>后开奖...</td>'
	            } else if (!ht.award_time) {
	                tplBd += '<td class="column-num" colspan="11">正在开奖中...</td>'
	            } else {
	            	tplBd += '<td colspan="11"></td>'
	            }
	            tplBd += '</tr>'
			})
	        tpl += '<table class="cqssc-table-kj">' + tplHd + '</thead><tbody>' + tplBd + '</tbody></table>'
	    break;
	}
	
	$('#chart').html(tpl)
	if (index !== undefined) $("#chart").find('.bet-tab-hd ul li:eq('+index+')').trigger('click');
    $('.canvas-mask').html('');
    var $ykjInfo = $('.ykj-info');
    if ($ykjInfo.hasClass('ykj-info-open')) {
        $('.ykj-info').find('tr').show()
        if ($.inArray(type, ['1xzhi', '2xzhi', '3xzhi', '5xzhi', '5xt']) > -1) canvas()
    } else {
        $('.ykj-info').find('tbody tr:last-child').show();
    }
}

renderTime = function() {
	if (atm > 0 && atm < 100000) {
		$('.kj-num-item:first li:first').html(padd(Math.floor(atm/60)));
		$('.kj-num-item:eq(1) li:first').html(padd(atm%60));
		$('.kj-num-item:eq(2) li:first').html('后');
		$('.kj-num-item:eq(3) li:first').html('开');
		$('.kj-num-item:eq(4) li:first').html('奖');
		$("body").find(".atime").html(maketstr(atm));
	}else if (isNaN(vJson[0])) {
		$('.kj-num-item:first li:first').html('正');
		$('.kj-num-item:eq(1) li:first').html('在');
		$('.kj-num-item:eq(2) li:first').html('开');
		$('.kj-num-item:eq(3) li:first').html('奖');
		$('.kj-num-item:eq(4) li:first').html('中');
	}
    $(".php-"+cx._basket_.playType+" .pick-area-time").html("<em><b>"+ISSUE.substring(2, 9)+"</b></em>期剩余<span>"+maketstr(tm)+"</span><i class='arrow'></i>");
}

//换期渲染
function render(data){
	$(".lottery-info-time b").html(data.issue);//渲染页面中当前期
    $(".kj-periods b").html(data.prev);//渲染页面上一期

    $("."+cx._basket_.playType+" .pick-area-time").html("<em><b>"+data.issue.substring(2, 9)+"</b></em>期剩余<span>"+maketstr(tm)+"</span><i class='arrow'></i>");
    $(".periods-num").html("每日120期，已售"+data.count+"期，还剩<b class='specil-color'>"+data.rest+"</b>期");//渲染页面已售、剩余
    rfshhisty(cx._basket_.playType);//刷新遗漏数据、最近时期开奖走势列表
    
    //渲染页面开奖号码
    kjNumAimation(vJson);
    if (atm > 0 && atm < 100000) {
    	$('.kj-num-item:first li:first').html(padd(Math.floor(atm/60)));
		$('.kj-num-item:eq(1) li:first').html(padd(atm%60));
		$('.kj-num-item:eq(2) li:first').html('后');
		$('.kj-num-item:eq(3) li:first').html('开');
		$('.kj-num-item:eq(4) li:first').html('奖');
	}
    
    setTimeout(function(){
        kjNumAimation(vJson)
    }, 2000);
}

function ballTpl (miss, award) {
    var tpl = '', arr = [];
    for(var i = 0; i < 10; i++) {
        if (miss === undefined) {
        	tpl += '<span>' + i + '</span>'
        }else if (miss[i] <= 0) {
        	$.each(award, function(k, aw){
        		if (aw == i) {
        			tpl += '<span class="selected selected' + Math.abs(miss[i]) + '">' + aw + '</span>';
        			return false;
        		}
        	})
        } else if (miss) {
            tpl += '<span>' + miss[i] + '</span>'
        }
    }
    return tpl;
}

function awardsTpl (awards, arr) {
    var tpl = '', ws = ['万', '千', '百', '十', '个'] ,single = {}
    for(var i = 0, awardsL = awards.length; i < awardsL; i++) {
        if (arr.indexOf(ws[i]) < 0) {
            tpl += '<span>' + awards[i] + '</span>'
        } else {
            tpl += '<span><em>' + awards[i] + '</em></span>'
        }
        single[ws[i]] = awards[i];
    }
    return {tpl: tpl, single: single};
}

function dx (num) {
    if (parseInt(num, 10) <= 4) return '小'
    return '大';
}
function ds (num) {
    if (parseInt(num, 10) % 2) return '单'
    return '双';
}

function cate () {
    if (arguments.length === 3) {
        if (arguments[0] === arguments[1] && arguments[0] === arguments[2]) {
            return '豹子'
        } else if (arguments[1] === arguments[2] || arguments[0] === arguments[1] || arguments[0] === arguments[2]) {
            return '组三'
        } else {
            return '组六'
        }
    } else {
        var numList = {'大': 0, '小': 0, '单': 0, '双': 0}
        for(var k = 0, arrL = arguments.length; k < arrL; k++) {
            var dxNum = dx(arguments[k]), dsNum = ds(arguments[k])
            numList[dxNum]++
            numList[dsNum]++
        }
        return numList;
    } 
}

//开奖动画
function kjNumAimation(json){
    setTimeout(function(){
        var kjNumUl = $('.kj-num-item').find('ul');
        var kjNumLiHeight = kjNumUl.find('li').height();
        $(json).each(function(index){
        	$(kjNumUl[index]).animate({top: -kjNumLiHeight * (isNaN(parseInt(json[index], 10)) ? 0 : parseInt(json[index], 10)+1)}, 800)
        })
    }, 0)
}

function canvas () {
    var i = 0, itemAarry = [] ,item = $('.ykj-info').find('.ball-group-s').find('span.selected'), columnNum = $('.ykj-info').find('tbody tr').eq(0).find('.ball-group-s').length,
    
    // 获取canvas父级的定位
    canvasMaskOffset = $('.canvas-mask').offset(), canvasMaskTop = canvasMaskOffset.top, canvasMaskLeft = canvasMaskOffset.left;
    $('.canvas-mask').html('').attr({'data-left': canvasMaskLeft, 'data-top': canvasMaskTop})
    // 给选中的球添加自身的定位参数
    for(var i = 0, itemLength = item.length; i < itemLength; i++){
        $(item[i]).attr({'data-top': Math.round($(item[i]).offset().top - canvasMaskTop) + 10, 'data-left': Math.round($(item[i]).offset().left - canvasMaskLeft) + 10})
    }

    // 中奖数字分组
    for(var i = 0; i < columnNum; i++){
        itemAarry.push($('.ykj-info').find('.column-' + (i + 1) + ':visible').find('span.selected'))
    }
    for(var k = 0, itemAarryLength = itemAarry.length; k < itemAarryLength; k++){
        for( var i = 0, itemAarryClength = itemAarry[k].length; i < itemAarryClength; i++){
                //控制创建canvas的个数
            if(i < (itemAarryClength - 1)){

                // 计算两个中奖球之间矩形的宽高
                var left1 = Math.round($(itemAarry[k][i]).attr('data-left')), top1 = Math.round($(itemAarry[k][i]).attr('data-top')), left2 = Math.round($(itemAarry[k][i+1]).attr('data-left')),
                top2 = Math.round($(itemAarry[k][i+1]).attr('data-top')), width = left2 - left1, height = top2 - top1, canvasTag = document.createElement('canvas');

                // 插入到html中
                $('.canvas-mask').append(canvasTag);
                if(!$.support.leadingWhitespace) var canvas = window.G_vmlCanvasManager.initElement($('.canvas-mask').find('canvas')[(itemAarryClength - 1) * k + i]);

                var canvas = $('.canvas-mask').find('canvas')[(itemAarryClength - 1) * k  + i].getContext('2d');
                if(width > 0){
                    // 当连接线是斜线时
                    // width = width - 20;
                    $($('.canvas-mask').find('canvas')[(itemAarryClength - 1) * k  + i]).css({'position': 'absolute', 'left': left1 + 'px', 'top': top1 + 'px'}).attr({'width': width, 'height': height})
                    canvas.beginPath();
                    canvas.moveTo(6,6*height/width);//第一个起点
                    canvas.lineTo(width-6,height-6*height/width);//第二个点
                }else if(width < 0){
                    // 当连接线是反向斜线时
                    width = -width
                    $($('.canvas-mask').find('canvas')[(itemAarryClength - 1) * k  + i]).css({'position': 'absolute', 'left': (left1 - width) + 'px', 'top': top1 + 'px'}).attr({'width': width, 'height': height})
                    canvas.beginPath();
                    canvas.moveTo(width - 6, 6*height/width);//第一个起点
                    canvas.lineTo(6,height-6*height/width);//第二个点
                }else {
                    // 当连接线是垂直线时
                    // height = height - 18;
                    $($('.canvas-mask').find('canvas')[(itemAarryClength - 1) * k  + i]).css({'position': 'absolute', 'left': left1 + 'px', 'top': top1 + 'px'}).attr({'width': width + 2, 'height': height})
                    canvas.beginPath();
                    canvas.moveTo(0,6);//第一个起点
                    canvas.lineTo(0,height-6);//第二个点
                }

                // 画线
                canvas.lineWidth = 1;
                canvas.strokeStyle = '#e82828';
                canvas.stroke();
            }
        }
    }
}

function fmoney(s) {   
	s = s.toString().split("").reverse().join("").substring(0, s.toString().length);
	return s.replace(/(\d{3})/g, '$1,').split("").reverse().join("").replace(',', '');
} 