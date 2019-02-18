<template>
<div class="container">
<canvas id="myCanvas" width="600" height="400" style="background:#000">浏览器不支持canvas</canvas>
</div>
</template>
<script>
export default{
  data(){
   return{
  pixels:[],
  imageData:[],
   }
  },
  created(){
  //  onsole.log('11')
  },
  mounted(){

    var canvas=document.getElementById("myCanvas");
   this.ctx=canvas.getContext("2d");

   var image = new Image();
   image.src='../static/bing.png';

  // var pixels=[];  //存储像素数据
   //var imageData;
   var that=this
   image.onload=function(){
       that.ctx.drawImage(image,200,100,200,200);
       that.imageData=that.ctx.getImageData(200,100,200,200);    //获取图表像素信息
       that.getPixels();    //获取所有像素
       that.drawPic();  //绘制图像

   }
  },
  methods:{
  getPixels(){
       var pos=0;
       var data=this.imageData.data;    //RGBA的一维数组数据
       //源图像的高度和宽度为200px
       for(var i=1;i<=200;i++){
           for(var j=1;j<=200;j++){
               pos=[(i-1)*200+(j-1)]*4; //取得像素位置
               if(data[pos]>=0){
                   var pixel={
                       x:200+j+Math.random()*20, //重新设置每个像素的位置信息
                       y:100+i+Math.random()*20, //重新设置每个像素的位置信息
                       fillStyle:'rgba('+data[pos]+','+(data[pos+1])+','+(data[pos+2])+','+(data[pos+3])+')'
                   }
                   this.pixels.push(pixel);
               }

           }
       }
   },
   drawPic(){
        //var canvas=document.getElementById("myCanvas");
        //var ctx=canvas.getContext("2d");
        this.ctx.clearRect(0,0,600,400);
        var len=this.pixels.length,curr_pixel=null;
        for(var i=0;i<len;i++){
            curr_pixel=this.pixels[i];
            this.ctx.fillStyle=curr_pixel.fillStyle;
            this.ctx.fillRect(curr_pixel.x,curr_pixel.y,1,1);
        }
    }
  }
}
</script>
