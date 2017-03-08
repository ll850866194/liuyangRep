angular.module('myApp',['ngRoute'])
.controller('myCtrl',['$scope',function($scope){

	$scope.addProduct2Cart = function(product){

		if(localStorage[product.chName]){
            var data = JSON.parse(localStorage[product.chName]);
            ++data.num;
            localStorage[product.chName] = JSON.stringify(data);
            
        }else{
            var obj = {
                name:product.chName,
                price:product.sellingPrice,
                picUrl:product.mainPicture1609,
                num:1
            }
            localStorage[product.chName] = JSON.stringify(obj);
        }
	}

	var color1 = ["images/1.png","images/2.png","images/3.png","images/4.png","images/5.png"];
	var color2 = ["images/11.png","images/21.png","images/31.png","images/41.png","images/41.png"];
	$scope.num=0;
	location.hash="#/";
	$scope.fs =function(index){
		$scope.num = index;
	}
	$scope.imgsrc =function(index){
		if($scope.num==index){
			return	color2[index]
		}else{
			return	color1[index]
		}
	};	
}])

.controller('homeCtrl',['$scope','$http',function($scope,$http){
	$http.get('data/data.json').then(function(data){

		$scope.data0 = data.data.info.result[0].linkUrl;
		
		$scope.data1 = data.data.info.result[1].bannerList;

		$scope.data2 = data.data.info.result[2].channelList;
	
		$scope.data3 = data.data.info.result[3].goodsList;

		$scope.data4 = data.data.info.result[4];

		$scope.data6 = data.data.info.result[6];

		$scope.data8 = data.data.info.result[8].brandList;

		$scope.data9 = data.data.info.result[9];

		$scope.data10 = data.data.info.result[10].goodsList;

		$scope.data11 = data.data.info.result[11];

		$scope.data13 = data.data.info.result[13].goodsList;

		$scope.data14 = data.data.info.result[14];

		$scope.data16 = data.data.info.result[16].goodsList;

		$scope.data17 = data.data.info.result[17];

		$scope.data19 = data.data.info.result[19].goodsList;

		$scope.data20 = data.data.info.result[20];	

		$scope.data22 = data.data.info.result[22].goodsList;

		$scope.data23 = data.data.info.result[23];

		$scope.data25 = data.data.info.result[25].goodsList;

		$scope.data26 = data.data.info.result[26];

		$scope.data28 = data.data.info.result[28].goodsList;

		$scope.data29 = data.data.info.result[29];

		$scope.data31 = data.data.info.result[31].goodsList;

		$scope.data32 = data.data.info.result[32];

		$scope.data34 = data.data.info.result[34].goodsList;

		$scope.swiper = new Swiper('.swiper-container', {
		    pagination: '.swiper-pagination',//小圆点
		    paginationClickable: true,//实现控制点击小点控制图片切换
		    autoplay : 1000,//可选选项  自动轮播auto 
		    speed:500,//平滑速度
		    autoplayDisableOnInteraction: false,//实现点击切换后还会自动轮播(重启autoplay属性)
		    loop:true //循环
		});


		
	});
		var top = document.querySelector('#to_top');
		
		$scope.top = function(){
			document.documentElement.scrollTop = document.body.scrollTop =0;
		}

		window.onscroll = function () { 
			var t = document.documentElement.scrollTop || document.body.scrollTop;
			if (t > 200) { 
				top.style.display = "block"; 
			} else { 
			 	top.style.display = "none"; 
			} 
		}	
}])

.controller('fenleiCtrl',['$scope','$http',function($scope,$http){

	$http.get('data/data2.json').then(function(data){
			$scope.data = data.data.list_goodsClass;//第一个data是形参		
		});
	
	$scope.borderclick = function(index){
		$scope.num = index;
		$http.get('data/data'+(index+2)+'.json').then(function(data){
			
			$scope.data = data.data.list_goodsClass;//第一个data是形参		
		});
		var li = document.querySelectorAll('.fenleiul li');
		for(var i = 0; i < li.length; i++){
			li[i].style.background = "white";
			li[i].style.color = "black";
		}
		li[index].style.background = "#f1f1f1";
		li[index].style.color = "red";
	}

	$scope.lis = ["食品酒水生鲜","美容护肤彩妆","服饰鞋帽配饰","箱包钟表珠宝","营养保健护理","3G手机数码","生活家居日化","母婴玩具乐器","电脑办公耗材","家用电器","汽车用品","运动户外健身","家居家装建材"];
}])

.controller('cartController',["$scope",function($scope){
	$scope.cartData = [];
    for(var item in localStorage){
        $scope.cartData.push(JSON.parse(localStorage[item]));
    };


	$scope.total = function(){
		var sum = 0;
		for(var i = 0;i<$scope.cartData.length;i++){
			sum+=($scope.cartData[i]['price']) * ($scope.cartData[i]['num'])
		}
		sum=parseInt(sum*10)/10
		return sum;
	};
	$scope.fnjia = function(jia){
		for(var i = 0;i<$scope.cartData.length;i++){
			if($scope.cartData[i]['name']==jia['name']){
				$scope.cartData[i]['num']+=1;	
				
			}
			var obj1 = {
                name:jia.name,
                price:jia.price,
                picUrl:jia.picUrl,
                num:jia.num
            }
            localStorage[jia.name] = JSON.stringify(obj1);
			
		}
	};
	$scope.fnjian = function(jian){
		for(var j = 0;j<$scope.cartData.length;j++){
			if($scope.cartData[j]['num']==0){
				
			}else{
				if($scope.cartData[j]['name']==jian['name']){
					$scope.cartData[j]['num']-=1;
				}
				var obj2 = {
	                name:jian.name,
	                price:jian.price,
	                picUrl:jian.picUrl,
	                num:jian.num
	            }
	            localStorage[jian.name] = JSON.stringify(obj2);
				
			}
		}
	};
}])

.controller('gerenCtrl',["$scope",function($scope){
	var dl = document.querySelector('.dl');
	var zc = document.querySelector('.zc');
	var dl1 = document.querySelector('.gerendenglu');
	var zc1 = document.querySelector('.gerenzhuce');

	dl.style.display = "block";
	zc.style.display = "none";
	dl1.style.color = "#ff4444";
	zc1.style.color = "black";

	$scope.dl = function(){
		dl.style.display = "block";
		zc.style.display = "none";
		dl1.style.color = "#ff4444";
		zc1.style.color = "black";
	};
	$scope.zc = function(){
		dl.style.display = "none";
		zc.style.display = "block";
		zc1.style.color = "#ff4444";
		dl1.style.color = "black";
	};
}])

.config(["$routeProvider","$locationProvider",function($routeProvider,$locationProvider){
	$locationProvider.html5Mode(false).hashPrefix('');	//解决1.6的路由地址冲突
	//在此进行路由
	$routeProvider
	.when("/",{
		templateUrl:"home.html",
		controller:"homeCtrl"
	})
	.when("/fenlei",{
		templateUrl:"fenlei.html",
		controller:"fenleiCtrl"
	})
	.when("/cart",{
		templateUrl:"cart.html",
		controller:"cartController"
	})
	.when("/geren",{
		templateUrl:"geren.html",
		controller:"gerenCtrl"
	})
	.when("/maijia",{
		templateUrl:"maijia.html"
	})
}]);


var code;
function createCode () {
    code = "";
    var codeLength = 4; //验证码的长度
    var checkCode = document.getElementById("checkCode");
    var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9); //所有候选组成验证码的字符，当然也可以用中文的
    for (var i = 0; i < codeLength; i++) 
    {
        var charNum = Math.floor(Math.random()*10);
        code += codeChars[charNum];
    }
    if (checkCode) 
    {
        checkCode.className = "code";
        checkCode.innerHTML = code;
    }
};