<template>
  <div class="phone">
    <div class="notch"></div>
    <div class="left-glare"></div>
    <div class="right-glare"></div>
    <el-main>
				<el-row type="flex" justify="center">
					<el-col span="4" style="background-color: orange;">
						Hello
					</el-col>
				</el-row>
			</el-main>
  </div>
</template>

<script>
export default {
  name: "phone",
  components: {},
  computed: {
    isHome() {
      return this.$route.path === "/";
    },
  },
};
</script>

<style lang="scss">

</style>