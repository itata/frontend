<template>
    <div>
        <div v-if="appInited">
            <div class="wrapper" v-if="!useEmptyLayout">
                <HeaderMaster />
                <main :class="{'hasSidebar': !hideSidebar}" >
                    <Sidebar v-if="!hideSidebar"/>
                    <div id="mainContent">
                        <router-view></router-view>
                    </div>
                </main>
                <FooterMaster/>
            </div>
            <div v-else>
                <section class="eml-wrapper">
                    <router-view></router-view>
                </section>
            </div>
        </div>
        <div id="launching" v-else class="main-loading">
            <div v-loading="!appInited"></div>
        </div>
    </div>
</template>

 <!-- Vendor styles -->
 <style src="../../assets/vendor/fontawesome/css/all.min.css"></style>
 <style src="../../assets/vendor/bootstrap/dist/css/bootstrap.min.css"></style>
 <style src="../../assets/vendor/toastr/toastr.min.css"></style>

<!-- App styles -->
<style src="../../assets/styles/pe-icons/pe-icon-7-stroke.css"></style>
<style src="../../assets/styles/pe-icons/helper.css"></style>
<style src="../../assets/styles/stroke-icons/style.css"></style>
<style src="../../assets/styles/cryptocoins/cryptocoins.css"></style>
<style lang="scss" src="../../assets/styles/loaders.scss"></style>
<style lang="scss" src="../../assets/styles/style.scss"></style>
<style lang="scss" src="../../assets/styles/custom.scss"></style>
<style lang="scss" src="../../assets/vendor/swiperjs/css/swiper.min.css"></style>

<style lang="scss" scoped>
.main-loading {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
}
</style>


<script src = "./index.js">
</script>
