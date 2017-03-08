数据 循环嵌套  理清思路

数组 套 数组

 <dl ng-repeat="i in data">
	<dt>{{i.className}}</dt>
	<dd ng-repeat="j in i.classTwo">{{j.className}}</dd>
</dl>