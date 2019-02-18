<template>
  <div class='container'>
    <audio controls autoplay loop v-show='0'>
      <source src="../../static/music.mp3" type="audio/mpeg">
    </audio>
<canvas id="canvasOne" width="600" height="600" ></canvas>
<canvas id="space"></canvas>
   <div class="left" :class="{'target':isShowLeft}">
   <div class="board">
     <div class="logo" >
         <img src='../../static/logo2.png' >
       </div>
       <div class="title">奖项
            <span class="tips">(点击抽取当前奖项)</span>
       </div>
       <ul>
       <li v-for="(item,index) in jiangs" class="jiang" :class="{'select':thisClick==item.name}" @click='clickJiang(item,index)'>
            <div class="option" >{{item.name}}<span class="option-number">({{item.people.length}}/{{item.number==100?'任意':item.number}})</span>
                <i class="iconfont " style="float:right;margin-right:10px;":class="thisClick==item.name?'icon-xiajiantou':'icon-youjiantou'"></i>
            </div>
            <div class="list " :class="{'clickList':thisClick==item.name&&item.show}">
             <div v-if="item.people.length==0" class="nojiang">暂未抽奖</div>
             <div v-if="item.people.length>0" v-for="itemm in item.people">
                <img :src="itemm.img" class="imgg"/>
                <span class="namee">{{itemm.username}}</span>
             </div>
            </div>
       </li>
       </ul>
   </div>
     <div class="trigger">
         <i class="iconfont icon-more1 more" @click="showLeft"></i>
          <i class="iconfont icon-baocun baocun1" @click="baocun"></i>
     </div>
   </div>

       <div class="img" :class="{'bigImg':isSelect}" v-show="0">
      <div class="img-container"  >
          <img :src="src.img"/>
      </div>
      </div>
          <p class="name" v-show="0">{{src.username}}</p>
      <div class="nowChow">
        <div class="now-img" v-for="(item,index) in peoplebar" :class="{'turnleft':item.select,'chushi':!item.fan,'fan':item.fan}" >

           <div class="now-img-container" >
             <img src="../../static/images/timg.jpg" @click="fan(item,index)"/>

           </div>
           <div class="back">
           <img class="" :src="item.img" >

           </div>
             <p class="username" :class="{'showname':item.fan}">{{item.username}}</p>
         </div>
      </div>
  </div>
</template>

<script>
   //import { Modernizr } from '../../static/js/modernizr.min.js'
   export default{
     data(){
        return{

          fans:[],
          src:{},
          index:0,
          jiangs:[
          {
            name:"三等奖",
            people:[],
            number:50,
            show:true
          },{
            name:'二等奖',
            people:[],
            number:10,
            show:false,
          },{
            name:'一等奖',
            people:[],
            number:3,
            show:false,
          },{
            name:'特等奖',
            people:[],
            number:1,
            show:false,
          },{
            name:"其他",
            people:[],
            number:100,
            show:false,
          }],
          ifEnter:false,
          thisClick:'三等奖',
          interval:'',
          isSelect:false,//是否抽取成功
          isShowLeft:1,
          imgArray:[],
          turnSpeed: 2*Math.PI/1200/2,
          peoplebar:[],
          /*
          unicodeFlakes : ['?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '我', '蒌', '火', '的', '山', '首', '页', '嫖', '是', '肺', '化', '?', '化', '?', '符', '?', '是', '原', '子', '序', '?', '是', '它', '是', '肺', '灰', '白', '色', '?', '金', '?', '有', '光', '?', '冱', '硬', '?', '於', '碳', '族', '化', '?', '性', '冱', '陪', '同', '族', '的', '遽', '陪', '矽', '相', '共', '有', '五', '肺', '同', '位', '素', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '才', '菜', '参', '餐', '层', '茶', '差', '长', '常', '场', '唱', '超', '车', '成', '城', '程', '吃', '店', '定', '订', '丢', '东', '冬', '懂', '动', '都', '读', '独', '度', '短', '对', '多', '饿', '儿', '而', '发', '法', '反', '饭', '方', '房', '放', '飞', '非', '费', '分', '份', '风', '封', '夫', '服', '附', '父', '复', '该', '改', '干', '感', '刚', '高', '告', '哥', '歌', '格', '个', '给', '号', '喝', '和', '河', '贺', '黑', '很', '红', '后', '候', '湖', '护', '花', '化', '画', '话', '坏', '欢', '还', '换', '黄', '回', '会', '婚', '活', '火', '或', '机', '鸡', '级', '极', '急', '际', '济', '继', '寄', '加', '家', '假', '价', '力', '历', '丽', '联', '凉', '两', '亮', '谅', '辆', '了', '林', '零', '六', '楼', '路', '录', '旅', '妈', '马', '码', '吗', '买', '卖', '满', '慢', '忙', '猫', '毛', '贸', '么', '没', '每', '美', '妹', '米', '面', '民', '明', '末', '母', '目', '拿', '哪', '那', '奶', '男', '南', '难', '脑', '呢', '能', '你', '年', '念', '鸟', '您', '牛', '农', '努', '女', '暖', '欧', '怕', '乓', '旁', '胖', '跑', '朋', '片', '漂', '票', '乒', '平', '期', '其', '奇', '骑', '起', '气', '汽', '千', '前', '签', '轻', '清', '情', '请', '秋', '球', '区', '取', '去', '趣', '全', '然', '让', '首', '售', '书', '术', '树', '双', '谁', '水', '睡', '说', '司', '思', '死', '四', '送', '诉', '算', '虽', '岁', '孙', '所', '他', '她', '它', '台', '太', '谈', '汤', '堂', '套', '特', '踢', '提', '题', '体', '天', '填', '条', '铁', '听', '厅', '庭', '通', '同', '头', '图', '外', '玩', '完', '晚', '万', '王', '网', '往', '忘', '望', '卫', '为', '位', '文', '我', '卧', '五', '午', '务', '物', '西', '吸', '希', '息', '习', '牙', '亚', '烟', '言', '羊', '阳', '样', '药', '要', '也', '业', '夜', '一', '衣', '医', '已', '以', '易', '意', '因', '音', '印', '银', '应', '英', '影', '硬', '用', '邮', '油', '游', '友', '有', '又', '右', '鱼', '愉', '雨', '语', '元', '员', '园', '原', '远', '院', '愿', '月', '在', '早', '怎', '张', '找', '照', '者', '这', '真', '正', '证', '知', '只', '之', '直', '止', '纸', '至', '治', '中', '钟', '种', '重', '周', '洲', '主', '住', '助', '祝', '注', '专', '准' ],
          */
         unicodeFlakes:['?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?', '?']
      }
     },
     mounted(){


       window.addEventListener("load", windowLoadHandler, false);
       var sphereRad = 500;
       var radius_sp=1;
       var opt_display_dots = false;


       //for debug messages
       var Debugger = function() { };
       Debugger.log = function(message) {
       	try {
       		console.log(message);
       	}
       	catch (exception) {
       		return;
       	}
       }
     function  windowLoadHandler(){
        canvasApp()
     }


       function canvasSupport() {
       	return Modernizr.canvas;
       }
     var that=this
       function canvasApp() {
       	if (!canvasSupport()) {
       		return;
       	}

       	var theCanvas = document.getElementById("canvasOne");
       	var context = theCanvas.getContext("2d");

       	var displayWidth;
       	var displayHeight;
       	var timer;
       	var wait;
       	var count;
       	var numToAddEachFrame;
       	var particleList;
       	var recycleBin;
       	var particleAlpha;
       	var r,g,b;
       	var fLen;
       	var m;
       	var projCenterX;
       	var projCenterY;
       	var zMax;
       	var turnAngle;
       	var turnSpeed;
       	var sphereCenterX, sphereCenterY, sphereCenterZ;
       	var particleRad;
       	var zeroAlphaDepth;
       	var randAccelX, randAccelY, randAccelZ;
       	var gravity;
       	var rgbString;
       	//we are defining a lot of variables used in the screen update functions globally so that they don't have to be redefined every frame.
       	var p;
       	var outsideTest;
       	var nextParticle;
       	var sinAngle;
       	var cosAngle;
       	var rotX, rotZ;
       	var depthAlphaFactor;
       	var i;
       	var theta, phi;
       	var x0, y0, z0;

       	init();

         // INITIALLI
       	function init() {
       		wait = 1;
       		count = wait - 1;
       		numToAddEachFrame = 4;

       		//particle color
       		r = 70;
       		g = 255;
       		b = 140;

       		rgbString = "rgba("+r+","+g+","+b+","; //partial string for color which will be completed by appending alpha value.
       		particleAlpha = 1; //maximum alpha

       		displayWidth = theCanvas.width;
       		displayHeight = theCanvas.height;

       		fLen = 320; //represents the distance from the viewer to z=0 depth.

       		//projection center coordinates sets location of origin
       		projCenterX = displayWidth/2;
       		projCenterY = displayHeight/2;

       		//we will not draw coordinates if they have too large of a z-coordinate (which means they are very close to the observer).
       		zMax = fLen-2;

       		particleList = {};
       		recycleBin = {};

       		//random acceleration factors - causes some random motion
       		randAccelX = 0.1;
       		randAccelY = 0.1;
       		randAccelZ = 0.1;

       		gravity = 0; //try changing to a positive number (not too large, for example 0.3), or negative for floating upwards.

       		particleRad = 2.5;

       		sphereCenterX = 0;
       		sphereCenterY = 0;
       		sphereCenterZ = -3 - sphereRad;

       		//alpha values will lessen as particles move further back, causing depth-based darkening:
       		zeroAlphaDepth = -750;
          //console.log(that)
       		turnSpeed = that.turnSpeed; //the sphere will rotate at this speed (one complete rotation every 1600 frames).
       		turnAngle = 0; //initial angle

       		timer = setInterval(onTimer, 10/24);
       	}

       	function onTimer() {
       		//if enough time has elapsed, we will add new particles.
       		count++;
       			if (count >= wait) {

       			count = 0;
       			for (i = 0; i < numToAddEachFrame; i++) {
       				theta = Math.random()*2*Math.PI;
       				phi = Math.acos(Math.random()*2-1);
       				x0 = sphereRad*Math.sin(phi)*Math.cos(theta);
       				y0 = sphereRad*Math.sin(phi)*Math.sin(theta);
       				z0 = sphereRad*Math.cos(phi);

       				//We use the addParticle function to add a new particle. The parameters set the position and velocity components.
       				//Note that the velocity parameters will cause the particle to initially fly outwards away from the sphere center (after
       				//it becomes unstuck).
       				var p = addParticle(x0, sphereCenterY + y0, sphereCenterZ + z0, 0.002*x0, 0.002*y0, 0.002*z0);

       				//we set some "envelope" parameters which will control the evolving alpha of the particles.
       				p.attack = 50;
       				p.hold = 50;
       				p.decay = 100;
       				p.initValue = 0;
       				p.holdValue = particleAlpha;
       				p.lastValue = 0;

       				//the particle will be stuck in one place until this time has elapsed:
       				p.stuckTime = 90 + Math.random()*20;

       				p.accelX = 0;
       				p.accelY = gravity;
       				p.accelZ = 0;
       			}
       		}

       		//update viewing angle
       		turnAngle = (turnAngle + that.turnSpeed) % (2*Math.PI);
       		sinAngle = Math.sin(turnAngle);
       		cosAngle = Math.cos(turnAngle);

       		//background fill
       		context.fillStyle = "rgba(0,10,20,1)";
        //	context.fillStyle = "#000";
       		context.fillRect(0,0,displayWidth,displayHeight);

       		//update and draw particles
       		p = particleList.first;
       		while (p != null) {
       			//before list is altered record next particle
       			nextParticle = p.next;

       			//update age
       			p.age++;

       			//if the particle is past its "stuck" time, it will begin to move.
       			if (p.age > p.stuckTime) {
       				p.velX += p.accelX + randAccelX*(Math.random()*2 - 1);
       				p.velY += p.accelY + randAccelY*(Math.random()*2 - 1);
       				p.velZ += p.accelZ + randAccelZ*(Math.random()*2 - 1);

       				p.x += p.velX;
       				p.y += p.velY;
       				p.z += p.velZ;
       			}

       			/*
       			We are doing two things here to calculate display coordinates.
       			The whole display is being rotated around a vertical axis, so we first calculate rotated coordinates for
       			x and z (but the y coordinate will not change).
       			Then, we take the new coordinates (rotX, y, rotZ), and project these onto the 2D view plane.
       			*/
       			rotX =  cosAngle*p.x + sinAngle*(p.z - sphereCenterZ);
       			rotZ =  -sinAngle*p.x + cosAngle*(p.z - sphereCenterZ) + sphereCenterZ;
       			m =radius_sp* fLen/(fLen - rotZ);
       			p.projX = rotX*m + projCenterX;
       			p.projY = p.y*m + projCenterY;

       			//update alpha according to envelope parameters.
       			if (p.age < p.attack+p.hold+p.decay) {
       				if (p.age < p.attack) {
       					p.alpha = (p.holdValue - p.initValue)/p.attack*p.age + p.initValue;
       				}
       				else if (p.age < p.attack+p.hold) {
       					p.alpha = p.holdValue;
       				}
       				else if (p.age < p.attack+p.hold+p.decay) {
       					p.alpha = (p.lastValue - p.holdValue)/p.decay*(p.age-p.attack-p.hold) + p.holdValue;
       				}
       			}
       			else {
       				p.dead = true;
       			}

       			//see if the particle is still within the viewable range.
       			if ((p.projX > displayWidth)||(p.projX<0)||(p.projY<0)||(p.projY>displayHeight)||(rotZ>zMax)) {
       				outsideTest = true;
       			}
       			else {
       				outsideTest = false;
       			}

       			if (outsideTest||p.dead) {
       				recycle(p);
       			}

       			else {
       				//depth-dependent darkening
       				depthAlphaFactor = (1-rotZ/zeroAlphaDepth);
       				depthAlphaFactor = (depthAlphaFactor > 1) ? 1 : ((depthAlphaFactor<0) ? 0 : depthAlphaFactor);
       				context.fillStyle = rgbString + depthAlphaFactor*p.alpha + ")";
               /*ADD TEXT function!*/
               /*ADD TEXT function!*/
               /*ADD TEXT function!*/
               /*ADD TEXT function!*/
       				context.fillText(p.flake,p.projX, p.projY);
               /*ADD TEXT function!*/
               /*ADD TEXT function!*/
               /*ADD TEXT function!*/
               /*ADD TEXT function!*/
       				//draw
       				context.beginPath();
               if(opt_display_dots)
                 {context.arc(p.projX, p.projY, m*particleRad, 0, 2*Math.PI, false);}
       				context.closePath();
       				context.fill();
       			}

       			p = nextParticle;
       		}
       	}

       	function addParticle(x0,y0,z0,vx0,vy0,vz0) {
       		var newParticle;
       		var color;


       		//check recycle bin for available drop:
       		if (recycleBin.first != null) {
       			newParticle = recycleBin.first;
       			//remove from bin
       			if (newParticle.next != null) {
       				recycleBin.first = newParticle.next;
       				newParticle.next.prev = null;
       			}
       			else {
       				recycleBin.first = null;
       			}
       		}
       		//if the recycle bin is empty, create a new particle (a new ampty object):
       		else {
       			newParticle = {};
       		}

       		//add to beginning of particle list
       		if (particleList.first == null) {
       			particleList.first = newParticle;
       			newParticle.prev = null;
       			newParticle.next = null;
       		}
       		else {
       			newParticle.next = particleList.first;
       			particleList.first.prev = newParticle;
       			particleList.first = newParticle;
       			newParticle.prev = null;
       		}

       		//initialize
       		newParticle.x = x0;
       		newParticle.y = y0;
       		newParticle.z = z0;
       		newParticle.velX = vx0;
       		newParticle.velY = vy0;
       		newParticle.velZ = vz0;
       		newParticle.age = 0;
       		newParticle.dead = false;

           newParticle.flake = that.unicodeFlakes[Math.floor(Math.random() * that.unicodeFlakes.length)];
       		if (Math.random() < 0.5) {
       			newParticle.right = true;
       		}
       		else {
       			newParticle.right = false;
       		}
       		return newParticle;
       	}

       	function recycle(p) {
       		//remove from particleList
       		if (particleList.first == p) {
       			if (p.next != null) {
       				p.next.prev = null;
       				particleList.first = p.next;
       			}
       			else {
       				particleList.first = null;
       			}
       		}
       		else {
       			if (p.next == null) {
       				p.prev.next = null;
       			}
       			else {
       				p.prev.next = p.next;
       				p.next.prev = p.prev;
       			}
       		}
       		//add to recycle bin
       		if (recycleBin.first == null) {
       			recycleBin.first = p;
       			p.prev = null;
       			p.next = null;
       		}
       		else {
       			p.next = recycleBin.first;
       			recycleBin.first.prev = p;
       			recycleBin.first = p;
       			p.prev = null;
       		}
       	}
       }




       //
       this.fetchData()
       var lett = this;
      document.onkeydown = function(e) {
      var key = window.event.keyCode;
      if (key == 13) {
      //lett.ifEnter=!lett.ifEnter;
      lett.choujiang()

    } else if(key == 68){
      lett.dizong()
    } else if(key==83){
      lett.song()
    } else if(key==76){
      lett.Li()
    }

     }

      // console.log(this.imgArray.length)
    //   this.imgInterval()
    ///


this.space()

this.message=this.$message({
         showClose: true,
         message: '按回车键开始筛选',
         duration:0
       });

     },
     computed:{

         start(){
           if(this.ifEnter){
                this.isSelect=false
             this.imgInterval()

           } else{
             this.clearInterval()

           }
           return this.ifEnter
         }
     },
     methods:{
       fan(item,index){
          //this.$forceUpdate();
          this.$message.close()
          console.log(this.$message)
           if(this.jiangs[this.index].people.length<this.jiangs[this.index].number){
          var obj=item
          obj.fan=true
          this.peoplebar.splice(index,1,item)
         //this.$set(this.peoplebar[index], 'fan', true)
         console.log(this.peoplebar)

         var index
         this.imgArray.forEach((itemm,indexx)=>{
             if(itemm.username==item.username){
                index=indexx
                return
             }
         })
         if (index > -1) {
          this.imgArray.splice(index, 1);
        }
        this.jiangs[this.index].people.unshift(item)
      }else{
      this.$message.error('当前奖项人数已满');
      }
        console.log(this.peoplebar)
         /*
         setTimeout(()=>{
           var obj=item
           obj.select=true
           this.peoplebar.splice(index,1,item)
         },3000)
         */
       },
       choujiang(){
         this.message.close()
         if(this.imgArray.length==0){
           this.$message.success('全部人都中奖了');
           this.peoplebar=[]
           return
         }
         if(this.ifEnter){
           return
         }

          this.turnSpeed=2*Math.PI/1200*5
          //if(this.index==3)
          this.peoplebar=[]
            this.ifEnter=true
          setTimeout(()=>{

          if(this.imgArray.length>5){
           this.cishu(5)
         } else{
         this.cishu(this.imgArray.length)
       }
  },1500)
           console.log(this.ifEnter)
       },
       cishu(renshu){



         var that=this
         var j=0
         var bar=that.imgArray.concat()
         this.interval=setInterval(function () {
          // for(var j=0;j<renshu;j++){
          if(j==renshu){
          that.message=  that.$message({
                     showClose: true,
                     message: '点击头像即为中奖',
                     duration:0
                   });
            clearInterval(that.interval)
              that.turnSpeed=2*Math.PI/1200/2
              that.ifEnter=false
  console.log(that.ifEnter)
            return
          }
           let i =bar.length
           if(i>0){
           let index=Math.floor(Math.random()*i)
           that.src=bar[index]

           bar.splice(index, 1);
          // console.log(bar)
          // console.log(that.imgArray)
           /*
           var index
           bar.forEach((itemm,indexx)=>{
               if(itemm.username==item.username){
                  index=indexx
                  return
               }
           })
           if (index > -1) {
            bar.splice(index, 1);
          }
          */
          that.fans.push(0)
           that.peoplebar.push(that.src)
           j++
         }
//}
}, 500);
console.log(that.peoplebar)

       },
      tableToExcel(){
     //要导出的json数据
     console.log(this.jiangs[0].people)
     var jsonData = []
  //   this.jiangs[0].people.forEach((item,index)=>{
  for(var index=0;index<102;index++){
       var obj={
         yi:this.jiangs[0].people[index]?this.jiangs[1].people[index].username:'',
         er: this.jiangs[1].people[index]?this.jiangs[1].people[index].username:'',
         san:this.jiangs[2].people[index]?this.jiangs[2].people[index].username:'',
         si:this.jiangs[3].people[index]?this.jiangs[3].people[index].username:'',
         wu:this.jiangs[4].people[index]?this.jiangs[4].people[index].username:'',
       }
       jsonData.push(obj)
     }
     //})
     //列标题，逗号隔开，每一个逗号就是隔开一个单元格
     let str = `三等奖,二等奖,一等奖,特等奖,其他\n`;
     //增加\t为了不让表格显示科学计数法或者其他格式
     for(let i = 0 ; i < jsonData.length ; i++ ){
       for(let item in jsonData[i]){
           str+=`${jsonData[i][item] + '\t'},`;
       }
       str+='\n';
     }
     //encodeURIComponent解决中文乱码
     let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
     //通过创建a标签实现
     var link = document.createElement("a");
     link.href = uri;
     //对下载的文件命名
     link.download =  "中奖名单.csv";
     document.body.appendChild(link);
     link.click();
     document.body.removeChild(link);
   },

       baocun(){
        // console.log('111')

          this.tableToExcel()
          return
         var arr=[]
         this.jiangs.forEach(item=>{
             item.people.forEach(itemm=>{
                 var obj={
                   'name':itemm.username,
                   'awards':item.name,
                   'imge':itemm.img
                 }
                 arr.push(obj)
                //  arr=arr.toString()
             })
         })
        // arr=JSON.stringify(arr)
         console.log(arr)
         this.axios.post('http://qyh.cloudvos.com:8096/ipms/CJSys',
           arr
         )
         .then(res=>{
           this.$message.success('已保存到服务器')
         })
       },
       fetchData(){
         this.axios.get('http://qyh.cloudvos.com:8096/ipms/CJSys')
         .then(res=>{
         console.log(res.data.data)
        //  res.data.data.forEach(item=>{
        //  console.log(item.username)
        //  })
          //return
           var str=''
           this.imgArray=res.data.data
           this.shuai('辛文')
           this.shuai('易快报实施')
           this.shuai('冉晓鹏')
           this.shuai('邸磊（备用）')


           //下面的不要动,没有获取接口就把下面的复制在外层
           for(var i=0;i<this.imgArray.length;i++){
           //this.imgArray.forEach((item,index)=>{
                //console.log(this.imgArray[i].username)
              //  return
            // if(item.username=="易快报实施"||item.username=="我测试"||item.username=="冉晓鹏"||item.username=="邸磊（备用）"){

             this.imgArray[i].fan=false
             this.unicodeFlakes.push(this.imgArray[i].username)
             if(!this.imgArray[i].img){
               str+=this.imgArray[i].username+','

           }
         }
           //})
           console.log(str)
            //  this.src=this.imgArray[0]
          //  console.log(this.imgArray)
         })

       },
       shuai(name){
          this.imgArray.forEach((item,index)=>{
            if(item.username==name){
              this.imgArray.splice(index,1)
            }
          })
       },

       showLeft(){
         this.isShowLeft=!this.isShowLeft
       },
       clickJiang(item,index){
        if(this.thisClick==item.name){
           var show=!item.show
         } else{
           var show=true
         }
           this.$set(this.jiangs[index], 'show', show)
      //   }
         this.thisClick=item.name
         this.index=index

       },
       imgInterval(){
         var that=this
         this.turnSpeed=2*Math.PI/1200*5
         this.interval=setInterval(function () {
           let i =that.imgArray.length
           if(i>0){
           let index=Math.floor(Math.random()*i)
           that.src=that.imgArray[index]
           //console.log(index)
}
         }, 50);

       },
       one(){
         let i =this.imgArray.length
         let index=Math.floor(Math.random()*i)
         this.src=this.imgArray[index]
       },
       clearInterval(){
         if(this.interval){
           this.turnSpeed=2*Math.PI/1200/2
           var that=this
          //  console.log("11")
            clearInterval(that.interval)

           setTimeout(function(){
if(that.imgArray.length==0) return

                that.isSelect=true
                //  if(that.jiangs.indexOf(that.src)==-1){
                that.jiangs[that.index].people.push(that.src)
                var index
                that.imgArray.forEach((item,indexx)=>{
                    if(item.username==that.src.username){
                       index=indexx
                       return
                    }
                })
              //  var index=that.imgArray.indexOf(that.src)
                if (index > -1) {
                 that.imgArray.splice(index, 1);
               }
         console.log(that.index)
         },200)
            //}
         }
       },
       space(){
         window.requestAnimFrame = (function(){   return  window.requestAnimationFrame})();
         var canvas = document.getElementById("space");
         var c = canvas.getContext("2d");

         var numStars = 1900;
         var radius = '0.'+Math.floor(Math.random() * 9) + 1  ;
         var focalLength = canvas.width *2;
         var warp = 0;
         var centerX, centerY;

         var stars = [], star;
         var i;

         var animate = true;

         initializeStars();

         function executeFrame(){

           if(animate)
             requestAnimFrame(executeFrame);
           moveStars();
           drawStars();
         }

         function initializeStars(){
           centerX = canvas.width / 2;
           centerY = canvas.height / 2;

           stars = [];
           for(i = 0; i < numStars; i++){
             star = {
               x: Math.random() * canvas.width,
               y: Math.random() * canvas.height,
               z: Math.random() * canvas.width,
               o: '0.'+Math.floor(Math.random() * 99) + 1
             };
             stars.push(star);
           }
         }

         function moveStars(){
           for(i = 0; i < numStars; i++){
             star = stars[i];
             star.z--;

             if(star.z <= 0){
               star.z = canvas.width;
             }
           }
         }

         function drawStars(){
           var pixelX, pixelY, pixelRadius;

           // Resize to the screen
           if(canvas.width != window.innerWidth || canvas.width != window.innerWidth){
             canvas.width = window.innerWidth;
             canvas.height = window.innerHeight;
             initializeStars();
           }
           if(warp==0)
           {c.fillStyle = "rgba(0,10,20,1)";
           c.fillRect(0,0, canvas.width, canvas.height);}
           c.fillStyle = "rgba(209, 255, 255, "+radius+")";
           for(i = 0; i < numStars; i++){
             star = stars[i];

             pixelX = (star.x - centerX) * (focalLength / star.z);
             pixelX += centerX;
             pixelY = (star.y - centerY) * (focalLength / star.z);
             pixelY += centerY;
             pixelRadius = 1 * (focalLength / star.z);

             c.fillRect(pixelX, pixelY, pixelRadius, pixelRadius);
             c.fillStyle = "rgba(209, 255, 255, "+star.o+")";
             //c.fill();
           }
         }



         executeFrame();

       }
     }
   }
</script>
<style lang="scss" scoped>
@import '../style/main';
</style>
