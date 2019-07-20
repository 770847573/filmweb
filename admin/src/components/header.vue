<template>
	<header>
		<div class="header-inner">
			<a href="/" class="logo" data-act="icon-click"></a>
			<div class="nav">
				<ul class="navbar">
					<li><a href="/" data-act="home-click">首页</a></li>
					<li><a href="/films" data-act="movies-click">电影</a></li>
					<li><a href="/cinemas" data-act="cinemas-click">影院</a></li>
					<li><a href="http://www.gewara.com">演出</a></li>

					<li><a href="/board" data-act="board-click">榜单</a></li>
					<li><a href="/news" data-act="hotNews-click">热点</a></li>
					<li><a href="/edimall">商城</a></li>
				</ul>
				

				
			</div>
		</div>
	</header>
</template>

<script>
	export default {
  data() {
    return {
      input: '',
      select: ''
    }
  }
}

</script>

<style scoped="scoped">
header {
	position: fixed;
	top: 0;
	z-index: 999;
	width: 100%;
	min-width: 1200px;
	background-color: #fff;
	border-bottom: 1px solid #d8d8d8;
}
header .header-inner {
	width: 1200px;
	margin: 0 auto;
	height: 80px;
}
header .logo {
	float: left;
	width: 133px;
	height: 80px;
	background: url('../../img/icon.png') no-repeat 0;
	background-size: contain;
}
header .nav {
	display: inline-block;
	background-color: #fff;
	overflow: hidden;
	float: left;
}
header ul {
	padding: 0;
	margin: 0;
	list-style: none;
	border: none;
}
header .nav .navbar li {
	float: left;
}
header .nav .navbar li a {
	text-align: center;
	display: inline-block;
	height: 80px;
	line-height: 80px;
	width: 70px;
	font-size: 18px;
	color: #333;
}



</style>
