<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
*{
	margin: 0;
	padding: 0;
	
}
a{
	text-decoration: none
}
li {
    display: list-item;
    text-align: -webkit-match-parent;
}
.el-breadcrumb {
    margin-left: 24%
}
</style>
