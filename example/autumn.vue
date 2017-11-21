<template>
    <div class="content">
        <div class="test-box1"><span>111</span></div>
        <div class="test-box2">
            <section class="flex-box1"></section>
            <section class="flex-box2"></section>
            <section class="flex-box3"></section>
        </div>
        <img src="http://h0.hucdn.com/open/201744/1d1476d1e7c66ee1_536x547.png" alt="" class="test-img"> 
        <div class="pos-box"></div>
    </div>
</template>

<style>
.content {
    -autumn-width: 100vw;
    -autumn-height: 200vw;
    background: #FFF000 url(http://h0.hucdn.com/open/201744/1d1476d1e7c66ee1_536x547.png);
    flex-direction: column;
}
.test-box1 {
    width: 100px;
    height: 200px;
    background: rgba(244, 12, 20, .01);
    padding: 20px 30px 30px;
    font-size: 20px;
}
.test-box2 {
    width: 750px;
    height: 300px;
    flex-direction: row;
    color: rgb(255, 255, 0);
}
.flex-box1 {
    background: #0ff000;
    flex:1;
}
.flex-box2 {
    background: #0f0f0f;
    flex:2;
}
.flex-box3 {
    background: #f00000;
    flex:3;
}

.test-img {
    width: 100px;
    height: 100px;
    overflow: hidden;
    border-radius: 50px;
}
.pos-box {
    position: absolute;
    left: 40px;
    top: 40px;
    width: 400px;
    height: 100px;
    background: #0000ff;
}
</style>

<script></script>
