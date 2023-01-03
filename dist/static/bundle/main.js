(()=>{"use strict";var t={913:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.gameConfig=void 0;const s=i(322),n=i(762),o=innerWidth,r=innerHeight,a=new n.StateStack,h=new s.Frame(o,r);h.setRenderingContext("2d");const c=h.getRenderingContext;e.gameConfig={stateStack:a,frame:h,ctx:c,width:o,height:r,id:0,entities:[]}},950:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Asteroid=void 0;const s=i(599),n=i(913),o=i(262);e.Asteroid=class{constructor(){this.id="ASTEROID";const{width:t,height:e}=n.gameConfig;this.x=(0,s.rand)(0,t),this.y=(0,s.rand)(0,e),this.w=(0,s.randEven)(16,64),this.h=this.w,this.speed=3e3/this.w,this.angle=(0,s.degreeToRadian)((0,s.rand)(0,360)),this.active=!0}resetLocation(){this.angle=(0,s.degreeToRadian)((0,s.rand)(0,360))}move(){const{width:t,height:e}=n.gameConfig;this.x<0?(this.x=t-this.w,this.resetLocation()):this.x>t&&(this.x=0,this.resetLocation()),this.y<0?(this.y=e-this.w,this.resetLocation()):this.y>e&&(this.y=0,this.resetLocation()),this.x+=this.speed*Math.cos(this.angle)*o.delta,this.y+=this.speed*Math.sin(this.angle)*o.delta}update(){this.move()}render(){const t=n.gameConfig.ctx;t.save(),t.translate(this.x+this.w/2,this.y+this.h/2),t.rotate(this.angle),t.strokeStyle="#ffffff";let e=-this.w/2,i=-this.h/2;t.beginPath(),t.moveTo(e,i),t.lineTo(e+this.w/2,i),t.lineTo(e+this.w/1.2,i+this.h/4),t.lineTo(e+this.w,i),t.lineTo(e+this.w,i+this.h/1.2),t.lineTo(e+this.w/1.2,i+this.h),t.lineTo(e+this.w/5,i+this.h),t.lineTo(e,i+this.h/2),t.lineTo(e,i),t.lineTo(e,i),t.stroke(),t.restore()}}},226:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Bullet=void 0;const s=i(913),n=i(262);e.Bullet=class{constructor(t,e,i,s){this.owner="PLAYER",this.x=0,this.y=0,this.w=4,this.h=4,this.id="BULLET",this.speed=500,this.angle=0,this.active=!0,this.owner=t,this.x=e,this.y=i,this.angle=s}killAfterSecond(){setTimeout((()=>{this.active=!1}),1e3)}handleScreenBorders(){const{width:t,height:e}=s.gameConfig;this.x<0?(this.x=t,this.killAfterSecond()):this.x>t&&(this.x=0,this.killAfterSecond()),this.y<0?(this.y=e,this.killAfterSecond()):this.y>e&&(this.y=0,this.killAfterSecond())}update(){this.handleScreenBorders(),this.x+=this.speed*Math.cos(this.angle)*n.delta,this.y+=this.speed*Math.sin(this.angle)*n.delta}render(){const t=s.gameConfig.ctx;t.save(),t.translate(this.x+this.w/2,this.y+this.h/2),t.rotate(this.angle),t.fillStyle="#ffffff",t.fillRect(-this.w/2,-this.h/2,this.w,this.h),t.restore()}}},730:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Particle=void 0;const s=i(913),n=i(599),o=i(262);e.Particle=class{constructor(t,e){this.id="PARTICLE";const{width:i,height:o}=s.gameConfig;this.x=t,this.y=e,this.w=3,this.h=this.w,this.speed=50,this.angle=(0,n.degreeToRadian)((0,n.rand)(0,360)),this.active=!0,setTimeout((()=>{this.active=!1}),5e3)}render(){const t=s.gameConfig.ctx;t.save(),t.translate(this.x+this.w/2,this.y+this.h/2),t.rotate(this.angle),t.fillStyle="#ffffff",t.fillRect(-this.w/2,-this.h/2,this.w,this.h),t.restore()}update(){this.x+=this.speed*Math.cos(this.angle)*o.delta,this.y+=this.speed*Math.sin(this.angle)*o.delta}}},661:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.hero=void 0;const s=i(29),n=i(262),o=i(913),r=i(226),a=i(599);e.hero=new class{constructor(){this.x=0,this.y=0,this.w=32,this.h=32,this.speed=350,this.angle=0,this.active=!0,this.lastHit=Date.now(),this.id="PLAYER",this.lives=3,this.score=0,this.friction=.98,this.velocity=new a.Vec2(0,0),this.acceleration=new a.Vec2(0,0),this.weaponCooldown=0,this.weaponCooldownDecrement=3}saveToLocalStorage(){const t="asteroids/player";if(!localStorage.getItem(t)){const e={highScore:this.score};localStorage.setItem(t,JSON.stringify(e))}const e=JSON.parse(localStorage.getItem(t));e.highScore=this.score>e.highScore?this.score:e.highScore,localStorage.setItem(t,JSON.stringify(e))}loadFromLocalStorage(){}shoot(){if(this.weaponCooldown<=0){let t=this.x+this.w/2,e=this.y+this.h/2;o.gameConfig.entities.push(new r.Bullet("PLAYER",t,e,this.angle)),this.weaponCooldown=100}}handleScreenBorders(){const{width:t,height:e}=o.gameConfig;this.x<0?this.x=t-this.w:this.x>t&&(this.x=0),this.y<0?this.y=e-this.w:this.y>e&&(this.y=0)}keyHandler(){(0,s.isDown)("A")?this.angle-=2*n.delta:(0,s.isDown)("D")&&(this.angle+=2*n.delta),(0,s.isDown)("W")?(this.acceleration.x=this.speed*Math.cos(this.angle)*n.delta,this.acceleration.y=this.speed*Math.sin(this.angle)*n.delta):this.acceleration.x=this.acceleration.y=0,(0,s.isDown)("SPACE")&&this.shoot()}updatePosition(){this.velocity.x+=this.acceleration.x,this.velocity.y+=this.acceleration.y,this.velocity.x*=this.friction,this.velocity.y*=this.friction,this.x+=this.velocity.x*n.delta,this.y+=this.velocity.y*n.delta}hit(){Date.now()>this.lastHit+5e3&&(this.lives>1?this.lives-=1:this.saveToLocalStorage())}update(){this.keyHandler(),this.updatePosition(),this.handleScreenBorders(),this.weaponCooldown>0&&(this.weaponCooldown-=this.weaponCooldownDecrement)}renderUi(){const t=o.gameConfig.ctx;t.font="20px monospace",t.fillStyle="#fff",t.fillText(`score: ${this.score}`,30,30),t.fillText(`lives: ${this.lives}`,30,60)}renderHitbox(){const t=o.gameConfig.ctx;t.save(),t.translate(this.x+this.w/2,this.y+this.h/2),t.rotate(this.angle),t.strokeStyle="white";let e=-this.w/2,i=-this.h/2;t.strokeRect(e,i,this.w,this.h),t.restore()}renderPlayer(){const t=o.gameConfig.ctx;t.save(),t.translate(this.x+this.w/2,this.y+this.h/2),t.rotate(this.angle),t.strokeStyle="white";let e=-this.w/2,i=-this.h/2;t.beginPath(),t.moveTo(e,i),t.lineTo(e+this.w,i+this.h/2),t.lineTo(e,i+this.h),t.moveTo(e+this.w/2,i+this.h/2),t.lineTo(e,i),t.moveTo(e+this.w/2,i+this.h/2),t.lineTo(e,i+this.h),t.stroke(),t.restore()}render(){this.renderUi(),this.renderPlayer()}}},769:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.asteroids=void 0;const s=i(913),n=i(262);e.asteroids=new class{constructor(){this.loop=this.loop.bind(this)}render(){var t;null===(t=s.gameConfig.stateStack.peek())||void 0===t||t.render()}update(){var t;null===(t=s.gameConfig.stateStack.peek())||void 0===t||t.update()}loop(){n.Perf.beforeCycle(),this.update(),this.render(),s.gameConfig.id=window.requestAnimationFrame(this.loop),n.Perf.afterCycle()}onStart(){s.gameConfig.frame.create(document.body),this.loop()}init(t){if(t&&s.gameConfig.stateStack.push(t),0===s.gameConfig.stateStack.size())throw new Error("Cannot initialize game without any state");this.onStart()}}},988:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.dev=void 0;const s=i(950),n=i(913),o=i(661),r=i(29),a=i(429),h=i(730);e.dev=new class{onEnter(){(0,r.initInput)();const{entities:t}=n.gameConfig;for(let e=0;e<10;e++)t.push(new s.Asteroid);t.push(o.hero)}onExit(){}onPause(){}onResume(){}handleCollision(){const{entities:t}=n.gameConfig,e=t.filter((t=>"BULLET"===t.id));t.filter((t=>"ASTEROID"===t.id)).forEach((i=>{e.forEach((e=>{(0,a.rects)(i,e)&&(e.active=!1,i.active=!1,t.push(new h.Particle(i.x,i.y),new h.Particle(i.x,i.y),new h.Particle(i.x,i.y)))}))}))}render(){let{width:t,height:e,entities:i}=n.gameConfig;n.gameConfig.ctx.clearRect(0,0,t,e),i&&0!==i.length&&(n.gameConfig.entities=i.filter((t=>!0===t.active)),i.forEach((t=>t.render())))}update(){const{entities:t}=n.gameConfig;t&&0!==t.length&&(t.forEach((t=>t.update())),this.handleCollision())}}},429:function(t,e,i){var s=this&&this.__createBinding||(Object.create?function(t,e,i,s){void 0===s&&(s=i);var n=Object.getOwnPropertyDescriptor(e,i);n&&!("get"in n?!e.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return e[i]}}),Object.defineProperty(t,s,n)}:function(t,e,i,s){void 0===s&&(s=i),t[s]=e[i]}),n=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),o=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i in t)"default"!==i&&Object.prototype.hasOwnProperty.call(t,i)&&s(e,t,i);return n(e,t),e};Object.defineProperty(e,"__esModule",{value:!0}),e.Collision=e.vectors=e.points=e.rects=e.circles=void 0;const r=i(599);e.circles=function(t,e){const i=t.radius+e.radius,s=r.Maths.substrVectors(t.position,e.position);return r.Maths.getVectorLength(s)<=i},e.rects=function(t,e){return t.x<e.x+e.w&&t.x+t.w>e.x&&t.y<e.y+e.h&&t.y+t.h>e.y},e.points=function(t,e){return r.Maths.deepFloatCmp(t.x,e.x)&&r.Maths.deepFloatCmp(t.y,e.y)},e.vectors=function(t,e){const i=t.x===e.x,s=t.y===e.y;return i&&s},e.Collision=o(i(429))},322:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Frame=void 0;class i{constructor(t,e,i){this.width=null!=t?t:innerWidth,this.height=null!=e?e:innerHeight,this.backgroundColor=null!=i?i:"#000000",this.id=Date.now(),this.canvas=document.createElement("canvas"),this.destination=document.body,this.context=null,this.canvas.id=String(this.id),this.canvas.width=this.width,this.canvas.height=this.height,this.canvas.style.backgroundColor=this.backgroundColor,this.canvas.innerHTML='\n            <h2>Unsuported browser</h2>\n            <p>\n                Sorry, but your current browser won\'t do anymore. \n                Either you upgrade your browser or just leave.\n            </p>\n            <a href="https://www.mozilla.org/en-US/firefox/new/">Browser upgrade</a>\n        '}create(t){t?(this.destination=t,this.destination.appendChild(this.canvas)):this.destination.appendChild(this.canvas)}remove(){this.destination.removeChild(this.canvas)}resize(t,e){this.width=t,this.height=e,this.canvas.width=t,this.canvas.height=e}static createInstance(t){let e=new i(t.width,t.height,t.style.backgroundColor);return e.setDestination=t.parentElement,e}get getWidth(){return this.width}get getHeight(){return this.height}get getBackgroundColor(){return this.backgroundColor}get getId(){return this.id}get getCanvas(){return this.canvas}get getDestination(){return this.destination}get getRenderingContext(){return this.context}set setWidth(t){this.width=t,this.canvas.width=t}set setHeight(t){this.height=t,this.canvas.height=t}set setBackgroundColor(t){this.backgroundColor=t,this.canvas.style.backgroundColor=t}set setId(t){this.id=t,this.canvas.id=String(t)}set setCanvas(t){this.canvas=t}set setDestination(t){this.destination=t}setRenderingContext(t,e){this.context=this.canvas.getContext(t,e)}}e.Frame=i},29:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.initInput=e.isDown=void 0;const i={};function s(t,e){const s=t.keyCode;let n;switch(s){case 27:n="ESC";break;case 32:n="SPACE";break;case 13:n="ENTER";break;default:n=String.fromCharCode(s)}i[n]=e}e.isDown=function(t){return i[t]},e.initInput=function(){window.addEventListener("keydown",(t=>s(t,!0))),window.addEventListener("keyup",(t=>s(t,!1)))}},599:function(t,e,i){var s=this&&this.__createBinding||(Object.create?function(t,e,i,s){void 0===s&&(s=i);var n=Object.getOwnPropertyDescriptor(e,i);n&&!("get"in n?!e.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return e[i]}}),Object.defineProperty(t,s,n)}:function(t,e,i,s){void 0===s&&(s=i),t[s]=e[i]}),n=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),o=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i in t)"default"!==i&&Object.prototype.hasOwnProperty.call(t,i)&&s(e,t,i);return n(e,t),e};Object.defineProperty(e,"__esModule",{value:!0}),e.Maths=e.getUnitVector=e.deepFloatCmp=e.getVectorLength=e.getDividedVector=e.getScaledVector=e.getNegateVector=e.substrVectorArray=e.substrVectors=e.sumVectorArray=e.sumVectors=e.limitValue=e.degreeToRadian=e.isNumberBetween=e.randBool=e.randElement=e.randInt=e.randEven=e.rand=e.Circle=e.LineSegment=e.Line=e.OrientedRect=e.Rect=e.Vec2=void 0;class r{constructor(t,e){this.x=null!=t?t:0,this.y=null!=e?e:0}}e.Vec2=r;class a{constructor(t,e,i,s){this.x=null!=t?t:0,this.y=null!=e?e:0,this.w=null!=i?i:10,this.h=null!=s?s:10}}function h(t,e){return t+Math.random()*(e-t)}function c(t,e){return Math.floor(h(t,e))}function l(t){return t[c(0,t.length)]}function d(t,e){return new r(t.x/e,t.y/e)}function u(t){return Math.sqrt(t.x*t.x+t.y*t.y)}e.Rect=a,e.OrientedRect=class extends a{constructor(t=0,e=0,i=4,s=4,n=0){super(t,e,i,s),this.angle=n}},e.Line=class{constructor(t,e){this.base=null!=t?t:new r,this.direction=null!=e?e:new r}},e.LineSegment=class{constructor(t,e){this.a=null!=t?t:new r,this.b=null!=e?e:new r}},e.Circle=class{constructor(t,e){this.position=null!=t?t:new r,this.radius=null!=e?e:0}},e.rand=h,e.randEven=function(t,e){let i=[];for(let s=t;s<e;s++)s%2==0&&i.push(s);return l(i)},e.randInt=c,e.randElement=l,e.randBool=function(){return l([!0,!1])},e.isNumberBetween=function(t,e,i){return t>=e&&t<=i},e.degreeToRadian=function(t){return t*Math.PI/180},e.limitValue=function(t,e,i){return Math.max(e,Math.min(i,t))},e.sumVectors=function(t,e){return new r(t.x+e.x,t.y+e.y)},e.sumVectorArray=function(t){const e=t.length-1,i=new r;for(let s=0;s<e;s++)i.x+=t[s].x,i.y+=t[s].y;return i},e.substrVectors=function(t,e){return new r(t.x-e.x,t.y-e.y)},e.substrVectorArray=function(t){const e=t.length-1,i=new r;for(let s=0;s<e;s++)i.x-=t[s].x,i.y-=t[s].y;return i},e.getNegateVector=function(t){return new r(-Math.abs(t.x),-Math.abs(t.y))},e.getScaledVector=function(t,e){return new r(t.x*e,t.y*e)},e.getDividedVector=d,e.getVectorLength=u,e.deepFloatCmp=function(t,e){return Math.abs(t-e)<1/8192},e.getUnitVector=function(t){const e=u(t);return 0<e?d(t,e):t};const f=new r(0,0);Object.freeze(f),e.Maths=o(i(599))},262:function(t,e,i){var s=this&&this.__createBinding||(Object.create?function(t,e,i,s){void 0===s&&(s=i);var n=Object.getOwnPropertyDescriptor(e,i);n&&!("get"in n?!e.__esModule:n.writable||n.configurable)||(n={enumerable:!0,get:function(){return e[i]}}),Object.defineProperty(t,s,n)}:function(t,e,i,s){void 0===s&&(s=i),t[s]=e[i]}),n=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),o=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i in t)"default"!==i&&Object.prototype.hasOwnProperty.call(t,i)&&s(e,t,i);return n(e,t),e};function r(){return window.performance&&window.performance.now?window.performance.now():(new Date).getTime()}Object.defineProperty(e,"__esModule",{value:!0}),e.Perf=e.afterCycle=e.beforeCycle=e.delta=e.fps=void 0;let a=0,h=r();e.fps=0,e.delta=0,e.beforeCycle=function(){a=r(),e.delta=Math.min(1,(a-h)/1e3),e.fps=1/e.delta},e.afterCycle=function(){h=a},e.Perf=o(i(262))},762:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.StateStack=void 0,e.StateStack=class{constructor(t=1/0){this.capacity=t,this.storage=[]}push(t){if(this.size()===this.capacity)throw new Error("Stack reached maximum capacity");t.onEnter(),this.storage.push(t)}pop(){let t=this.storage.pop();return null==t||t.onExit(),t}peek(){return this.storage[this.size()-1]}size(){return this.storage.length}}}},e={};function i(s){var n=e[s];if(void 0!==n)return n.exports;var o=e[s]={exports:{}};return t[s].call(o.exports,o,o.exports,i),o.exports}(()=>{const t=i(769),e=i(988);window.addEventListener("load",(function(){try{t.asteroids.init(e.dev)}catch(t){console.error(t),alert(t)}}))})()})();