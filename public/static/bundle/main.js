(()=>{"use strict";var e={964:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0});const n=i(803);t.default=function(e){const{score:t,highScore:i,playAgain:o}=e;return n.html`
		<section class="game-over">
			<article class="game-over__container">
				<h1>Signal lost</h1>
				<p>Your score was ${t}</p>
				<p>highest achieved score was ${i}</p>
				<button @click="${o}">play again</button>
			</article>
		</section>
	`}},175:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0});const n=i(803);t.default=function(e){const{onPlay:t,onHighScore:i}=e;return n.html`
		<section class="main-menu">
			<article class="main-menu__container">
				<h1>Asteroids</h1>
				<ul>
					<li>
						<button @click="${t}">Play</button>
					</li>

					<li>
						<button @click="${i}">High scores</button>
					</li>
				</ul>
			</article>
		</section>
	`}},913:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.gameConfig=void 0;const n=i(689),o=i(322),r=i(762),s=innerWidth,a=innerHeight,c=new r.StateStack,h=new o.Frame(s,a);h.setRenderingContext("2d");const l=h.getRenderingContext,d=(0,n.createAudio)("./assets/sfx/explosion.wav",{});t.gameConfig={stateStack:c,frame:h,ctx:l,width:s,height:a,id:0,entities:[],explosion:d}},950:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Asteroid=void 0;const n=i(599),o=i(913),r=i(262);t.Asteroid=class{constructor(e=(0,n.rand)(0,o.gameConfig.width),t=(0,n.rand)(0,o.gameConfig.height),i=128,r=80){this.id="ASTEROID",this.x=e,this.y=t,this.w=i,this.h=i,this.speed=r,this.angle=(0,n.degreeToRadian)((0,n.rand)(0,360)),this.active=!0}resetLocation(){this.angle=(0,n.degreeToRadian)((0,n.rand)(0,360))}move(){const{width:e,height:t}=o.gameConfig;this.x<0?(this.x=e-this.w,this.resetLocation()):this.x>e&&(this.x=0,this.resetLocation()),this.y<0?(this.y=t-this.w,this.resetLocation()):this.y>t&&(this.y=0,this.resetLocation()),this.x+=this.speed*Math.cos(this.angle)*r.delta,this.y+=this.speed*Math.sin(this.angle)*r.delta}update(){this.move()}render(){const e=o.gameConfig.ctx;e.save(),e.translate(this.x+this.w/2,this.y+this.h/2),e.rotate(this.angle),e.strokeStyle="#ffffff",e.fillStyle="#000000";let t=-this.w/2,i=-this.h/2;e.beginPath(),e.moveTo(t,i),e.lineTo(t+this.w/2,i),e.lineTo(t+this.w/1.2,i+this.h/4),e.lineTo(t+this.w,i),e.lineTo(t+this.w,i+this.h/1.2),e.lineTo(t+this.w/1.2,i+this.h),e.lineTo(t+this.w/5,i+this.h),e.lineTo(t,i+this.h/2),e.lineTo(t,i),e.lineTo(t,i),e.fill(),e.stroke(),e.restore()}}},226:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Bullet=void 0;const n=i(913),o=i(262);t.Bullet=class{constructor(e,t,i,n){this.owner="PLAYER",this.x=0,this.y=0,this.w=8,this.h=4,this.id="BULLET",this.speed=500,this.angle=0,this.active=!0,this.owner=e,this.x=t,this.y=i,this.angle=n}killAfterSecond(){setTimeout((()=>{this.active=!1}),1e3)}handleScreenBorders(){const{width:e,height:t}=n.gameConfig;this.x<0?(this.x=e,this.killAfterSecond()):this.x>e&&(this.x=0,this.killAfterSecond()),this.y<0?(this.y=t,this.killAfterSecond()):this.y>t&&(this.y=0,this.killAfterSecond())}update(){this.handleScreenBorders(),this.x+=this.speed*Math.cos(this.angle)*o.delta,this.y+=this.speed*Math.sin(this.angle)*o.delta}render(){const e=n.gameConfig.ctx;e.save(),e.translate(this.x+this.w/2,this.y+this.h/2),e.rotate(this.angle),e.fillStyle="#ffffff",e.fillRect(-this.w/2,-this.h/2,this.w,this.h),e.restore()}}},730:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Particle=void 0;const n=i(913),o=i(599),r=i(262);t.Particle=class{constructor(e){this.id="PARTICLE";const{width:t,height:i}=n.gameConfig,{angle:r,x:s,y:a,speed:c}=e;this.x=s,this.y=a,this.w=3,this.h=this.w,this.speed=null!=c?c:50,this.angle=null!=r?r:(0,o.degreeToRadian)((0,o.rand)(0,360)),this.active=!0,setTimeout((()=>{this.active=!1}),2e3)}render(){const e=n.gameConfig.ctx;e.save(),e.translate(this.x+this.w/2,this.y+this.h/2),e.rotate(this.angle),e.fillStyle="#ffffff",e.fillRect(-this.w/2,-this.h/2,this.w,this.h),e.restore()}update(){this.x+=this.speed*Math.cos(this.angle)*r.delta,this.y+=this.speed*Math.sin(this.angle)*r.delta}}},661:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.hero=void 0;const n=i(913),o=i(689),r=i(29),s=i(599),a=i(262),c=i(226);t.hero=new class{constructor(){this.x=0,this.y=0,this.w=32,this.h=32,this.speed=400,this.angle=0,this.active=!0,this.id="PLAYER",this.velocity=new s.Vec2(0,0),this.acceleration=new s.Vec2(0,0),this.friction=.99,this.score=0,this.highScore=0,this.lives=3,this.cooldown=0,this.cooldownDecrement=3,this.hitPrepared=!0,this.shootSound=(0,o.createAudio)("./assets/sfx/laserShoot.wav",{})}renderUi(){const e=n.gameConfig.ctx;e.font="20px monospace",e.fillStyle="#fff",e.fillText(`score: ${this.score}`,30,30),e.fillText(`lives: ${this.lives}`,30,60)}renderPlayer(){const e=n.gameConfig.ctx;e.save(),e.translate(this.x+this.w/2,this.y+this.h/2),e.rotate(this.angle);let t=-this.w/2,i=-this.h/2;e.strokeStyle="white",e.fillStyle="black",e.beginPath(),e.moveTo(t,i),e.lineTo(t+this.w,i+this.h/2),e.lineTo(t,i+this.h),e.moveTo(t+this.w/2,i+this.h/2),e.lineTo(t,i),e.moveTo(t+this.w/2,i+this.h/2),e.lineTo(t,i+this.h),e.fill(),e.stroke(),e.restore()}shoot(){if(this.cooldown<=0){let e=this.x+this.w/2,t=this.y+this.h/2;n.gameConfig.entities.push(new c.Bullet("PLAYER",e,t,this.angle)),this.shootSound.play(),this.cooldown=100}}handleMovement(){this.velocity.x+=this.acceleration.x,this.velocity.y+=this.acceleration.y,this.velocity.x*=this.friction,this.velocity.y*=this.friction,this.x+=this.velocity.x*a.delta,this.y+=this.velocity.y*a.delta}handleInput(){(0,r.isDown)("W")?(this.acceleration.x=this.speed*Math.cos(this.angle)*a.delta,this.acceleration.y=this.speed*Math.sin(this.angle)*a.delta):this.acceleration.x=this.acceleration.y=0,(0,r.isDown)("A")?this.angle-=3*a.delta:(0,r.isDown)("D")&&(this.angle+=3*a.delta),(0,r.isDown)("SPACE")&&this.shoot()}handleScreenBorders(){const{width:e,height:t}=n.gameConfig;switch(!0){case this.x<0:this.x=e-this.w;break;case this.x>e:this.x=0;break;case this.y<0:this.y=t-this.h;break;case this.y+this.h>t:this.y=this.h}}handleCooldown(){this.cooldown>0&&(this.cooldown-=this.cooldownDecrement)}handleSave(){const e="asteroids/player";if(!localStorage.getItem(e)){const t={highScore:this.score};localStorage.setItem(e,JSON.stringify(t))}const t=JSON.parse(localStorage.getItem(e));t.highScore=this.score>t.highScore?this.score:t.highScore,localStorage.setItem(e,JSON.stringify(t))}handleLoad(){if(!localStorage.getItem("asteroids/player"))return void console.warn("No user save");const e=JSON.parse(localStorage.getItem("asteroids/player"));this.highScore=e.highScore}update(){this.handleScreenBorders(),this.handleInput(),this.handleMovement(),this.handleCooldown()}render(){this.renderPlayer(),this.renderUi()}hit(){this.hitPrepared&&(this.lives<=1&&(this.handleSave(),this.active=!1),this.lives-=1,this.hitPrepared=!1),setTimeout((()=>this.hitPrepared=!0),2e3)}isAlive(){return this.active}addScore(){this.score+=10}get getScore(){return this.score}get getHighScore(){return this.highScore}reset(){this.handleLoad(),this.x=0,this.y=0,this.angle=0,this.active=!0,this.lives=3,this.velocity=new s.Vec2(0,0),this.acceleration=new s.Vec2(0,0),this.cooldown=0,this.cooldownDecrement=2.5,this.hitPrepared=!0}}},769:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.asteroids=void 0;const n=i(913),o=i(262);t.asteroids=new class{constructor(){this.loop=this.loop.bind(this)}render(){var e;null===(e=n.gameConfig.stateStack.peek())||void 0===e||e.render()}update(){var e;null===(e=n.gameConfig.stateStack.peek())||void 0===e||e.update()}loop(){o.Perf.beforeCycle(),this.update(),this.render(),n.gameConfig.id=window.requestAnimationFrame(this.loop),o.Perf.afterCycle()}onStart(){n.gameConfig.frame.create(document.body),this.loop()}init(e){if(e&&n.gameConfig.stateStack.push(e),0===n.gameConfig.stateStack.size())throw new Error("Cannot initialize game without any state");this.onStart()}}},778:function(e,t,i){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.end=void 0;const o=n(i(964)),r=i(913),s=i(599),a=i(661),c=i(848);t.end=new class{onEnter(){this.renderHtml()}onExit(){}render(){const{width:e,height:t}=r.gameConfig,i=r.gameConfig.ctx;i.clearRect(0,0,e,t),i.fillStyle="white",i.fillRect(0,(0,s.rand)(0,t),e,10)}handleNewGame(){var e;null===(e=document.querySelector(".game-over"))||void 0===e||e.remove(),r.gameConfig.stateStack.pop(),r.gameConfig.stateStack.push(c.play),a.hero.reset()}renderHtml(){(0,o.default)({score:a.hero.getScore,highScore:a.hero.getHighScore,playAgain:this.handleNewGame})(document.body)}update(){}}},305:function(e,t,i){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.menu=void 0;const o=i(913),r=i(730),s=i(599),a=n(i(175)),c=i(848);t.menu=new class{onEnter(){const{entities:e,width:t,height:i}=o.gameConfig;for(let n=0;n<75;n++)e.push(new r.Particle({x:(0,s.rand)(0,t),y:(0,s.rand)(0,i)}));this.renderHtml()}render(){const{entities:e}=o.gameConfig;e.forEach((e=>{e.render()}))}handlePlay(){o.gameConfig.stateStack.pop(),o.gameConfig.stateStack.push(c.play)}handleHighScore(){}renderHtml(){(0,a.default)({onPlay:this.handlePlay,onHighScore:this.handleHighScore})(document.body)}update(){}onExit(){var e;o.gameConfig.entities.length=0,null===(e=document.querySelector(".main-menu"))||void 0===e||e.remove()}}},848:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.play=void 0;const n=i(913),o=i(661),r=i(29),s=i(778),a=i(490);t.play=new class{onEnter(){(0,r.initInput)(),a.playManager.init()}onExit(){n.gameConfig.entities.length=0}render(){const{entities:e,width:t,height:i}=n.gameConfig;n.gameConfig.ctx.clearRect(0,0,t,i),e.forEach((e=>e.render()))}update(){a.playManager.update(),o.hero.isAlive()||(n.gameConfig.stateStack.pop(),n.gameConfig.stateStack.push(s.end))}}},490:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.playManager=void 0;const n=i(913),o=i(950),r=i(730),s=i(661),a=i(429);t.playManager=new class{splitAsteroid(e){const{entities:t}=n.gameConfig;128===e.w?t.push(new o.Asteroid(e.x,e.y,64,100),new o.Asteroid(e.x,e.y,64,100),new o.Asteroid(e.x,e.y,64,100),new o.Asteroid(e.x,e.y,64,100)):64===e.w&&t.push(new o.Asteroid(e.x,e.y,32,150),new o.Asteroid(e.x,e.y,32,150)),t.push(new r.Particle({x:e.x,y:e.y}),new r.Particle({x:e.x,y:e.y}),new r.Particle({x:e.x,y:e.y}))}collision(){const{entities:e,explosion:t}=n.gameConfig,i=e.filter((e=>"ASTEROID"===e.id)),o=e.filter((e=>"BULLET"===e.id)),r=e.filter((e=>"ALIEN"===e.id));i.forEach((e=>{(0,a.rects)(s.hero,e)&&(s.hero.hit(),s.hero.addScore(),e.active=!1,this.splitAsteroid(e),t.play()),o.forEach((i=>{let n=i;(0,a.rects)(e,i)&&"PLAYER"===n.owner&&(i.active=!1,e.active=!1,s.hero.addScore(),this.splitAsteroid(e),t.play()),r.forEach((e=>{let n=i;(0,a.rects)(e,i)&&"PLAYER"===n.owner?(e.active=!1,i.active=!1,s.hero.addScore(),t.play()):(0,a.rects)(s.hero,i)&&"ALIEN"===n.owner&&(s.hero.hit(),i.active=!1,t.play())}))}))}))}update(){if(n.gameConfig.entities=n.gameConfig.entities.filter((e=>!0===e.active)),this.collision(),0===n.gameConfig.entities.filter((e=>"ASTEROID"===e.id)).length&&s.hero.isAlive())for(let e=0;e<4;e++)n.gameConfig.entities.push(new o.Asteroid);n.gameConfig.entities.length>0&&n.gameConfig.entities.forEach((e=>e.update()))}init(){for(let e=0;e<4;e++)n.gameConfig.entities.push(new o.Asteroid);n.gameConfig.entities.push(s.hero)}}},429:function(e,t,i){var n=this&&this.__createBinding||(Object.create?function(e,t,i,n){void 0===n&&(n=i);var o=Object.getOwnPropertyDescriptor(t,i);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[i]}}),Object.defineProperty(e,n,o)}:function(e,t,i,n){void 0===n&&(n=i),e[n]=t[i]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&n(t,e,i);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.Collision=t.vectors=t.points=t.rects=t.circles=void 0;const s=i(599);t.circles=function(e,t){const i=e.radius+t.radius,n=s.Maths.substrVectors(e.position,t.position);return s.Maths.getVectorLength(n)<=i},t.rects=function(e,t){return e.x<t.x+t.w&&e.x+e.w>t.x&&e.y<t.y+t.h&&e.y+e.h>t.y},t.points=function(e,t){return s.Maths.deepFloatCmp(e.x,t.x)&&s.Maths.deepFloatCmp(e.y,t.y)},t.vectors=function(e,t){const i=e.x===t.x,n=e.y===t.y;return i&&n},t.Collision=r(i(429))},322:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Frame=void 0;class i{constructor(e,t,i){this.width=null!=e?e:innerWidth,this.height=null!=t?t:innerHeight,this.backgroundColor=null!=i?i:"#000000",this.id=Date.now(),this.canvas=document.createElement("canvas"),this.destination=document.body,this.context=null,this.canvas.id=String(this.id),this.canvas.width=this.width,this.canvas.height=this.height,this.canvas.style.backgroundColor=this.backgroundColor,this.canvas.innerHTML='\n            <h2>Unsuported browser</h2>\n            <p>\n                Sorry, but your current browser won\'t do anymore. \n                Either you upgrade your browser or just leave.\n            </p>\n            <a href="https://www.mozilla.org/en-US/firefox/new/">Browser upgrade</a>\n        '}create(e){e?(this.destination=e,this.destination.appendChild(this.canvas)):this.destination.appendChild(this.canvas)}remove(){this.destination.removeChild(this.canvas)}resize(e,t){this.width=e,this.height=t,this.canvas.width=e,this.canvas.height=t}static createInstance(e){let t=new i(e.width,e.height,e.style.backgroundColor);return t.setDestination=e.parentElement,t}get getWidth(){return this.width}get getHeight(){return this.height}get getBackgroundColor(){return this.backgroundColor}get getId(){return this.id}get getCanvas(){return this.canvas}get getDestination(){return this.destination}get getRenderingContext(){return this.context}set setWidth(e){this.width=e,this.canvas.width=e}set setHeight(e){this.height=e,this.canvas.height=e}set setBackgroundColor(e){this.backgroundColor=e,this.canvas.style.backgroundColor=e}set setId(e){this.id=e,this.canvas.id=String(e)}set setCanvas(e){this.canvas=e}set setDestination(e){this.destination=e}setRenderingContext(e,t){this.context=this.canvas.getContext(e,t)}}t.Frame=i},29:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.initInput=t.isDown=void 0;const i={};function n(e,t){const n=e.keyCode;let o;switch(n){case 27:o="ESC";break;case 32:o="SPACE";break;case 13:o="ENTER";break;default:o=String.fromCharCode(n)}i[o]=t}t.isDown=function(e){return i[e]},t.initInput=function(){window.addEventListener("keydown",(e=>n(e,!0))),window.addEventListener("keyup",(e=>n(e,!1)))}},599:function(e,t,i){var n=this&&this.__createBinding||(Object.create?function(e,t,i,n){void 0===n&&(n=i);var o=Object.getOwnPropertyDescriptor(t,i);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[i]}}),Object.defineProperty(e,n,o)}:function(e,t,i,n){void 0===n&&(n=i),e[n]=t[i]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&n(t,e,i);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.Maths=t.getUnitVector=t.deepFloatCmp=t.getVectorLength=t.getDividedVector=t.getScaledVector=t.getNegateVector=t.substrVectorArray=t.substrVectors=t.sumVectorArray=t.sumVectors=t.limitValue=t.degreeToRadian=t.isNumberBetween=t.randBool=t.randElement=t.randInt=t.randEven=t.rand=t.Circle=t.LineSegment=t.Line=t.OrientedRect=t.Rect=t.Vec2=void 0;class s{constructor(e,t){this.x=null!=e?e:0,this.y=null!=t?t:0}}t.Vec2=s;class a{constructor(e,t,i,n){this.x=null!=e?e:0,this.y=null!=t?t:0,this.w=null!=i?i:10,this.h=null!=n?n:10}}function c(e,t){return e+Math.random()*(t-e)}function h(e,t){return Math.floor(c(e,t))}function l(e){return e[h(0,e.length)]}function d(e,t){return new s(e.x/t,e.y/t)}function u(e){return Math.sqrt(e.x*e.x+e.y*e.y)}t.Rect=a,t.OrientedRect=class extends a{constructor(e=0,t=0,i=4,n=4,o=0){super(e,t,i,n),this.angle=o}},t.Line=class{constructor(e,t){this.base=null!=e?e:new s,this.direction=null!=t?t:new s}},t.LineSegment=class{constructor(e,t){this.a=null!=e?e:new s,this.b=null!=t?t:new s}},t.Circle=class{constructor(e,t){this.position=null!=e?e:new s,this.radius=null!=t?t:0}},t.rand=c,t.randEven=function(e,t){let i=[];for(let n=e;n<t;n++)n%2==0&&i.push(n);return l(i)},t.randInt=h,t.randElement=l,t.randBool=function(){return l([!0,!1])},t.isNumberBetween=function(e,t,i){return e>=t&&e<=i},t.degreeToRadian=function(e){return e*Math.PI/180},t.limitValue=function(e,t,i){return Math.max(t,Math.min(i,e))},t.sumVectors=function(e,t){return new s(e.x+t.x,e.y+t.y)},t.sumVectorArray=function(e){const t=e.length-1,i=new s;for(let n=0;n<t;n++)i.x+=e[n].x,i.y+=e[n].y;return i},t.substrVectors=function(e,t){return new s(e.x-t.x,e.y-t.y)},t.substrVectorArray=function(e){const t=e.length-1,i=new s;for(let n=0;n<t;n++)i.x-=e[n].x,i.y-=e[n].y;return i},t.getNegateVector=function(e){return new s(-Math.abs(e.x),-Math.abs(e.y))},t.getScaledVector=function(e,t){return new s(e.x*t,e.y*t)},t.getDividedVector=d,t.getVectorLength=u,t.deepFloatCmp=function(e,t){return Math.abs(e-t)<1/8192},t.getUnitVector=function(e){const t=u(e);return 0<t?d(e,t):e};const f=new s(0,0);Object.freeze(f),t.Maths=r(i(599))},262:function(e,t,i){var n=this&&this.__createBinding||(Object.create?function(e,t,i,n){void 0===n&&(n=i);var o=Object.getOwnPropertyDescriptor(t,i);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[i]}}),Object.defineProperty(e,n,o)}:function(e,t,i,n){void 0===n&&(n=i),e[n]=t[i]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var i in e)"default"!==i&&Object.prototype.hasOwnProperty.call(e,i)&&n(t,e,i);return o(t,e),t};function s(){return window.performance&&window.performance.now?window.performance.now():(new Date).getTime()}Object.defineProperty(t,"__esModule",{value:!0}),t.Perf=t.afterCycle=t.beforeCycle=t.delta=t.fps=void 0;let a=0,c=s();t.fps=0,t.delta=0,t.beforeCycle=function(){a=s(),t.delta=Math.min(1,(a-c)/1e3),t.fps=1/t.delta},t.afterCycle=function(){c=a},t.Perf=r(i(262))},762:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.StateStack=void 0,t.StateStack=class{constructor(e=1/0){this.capacity=e,this.storage=[]}push(e){if(this.size()===this.capacity)throw new Error("Stack reached maximum capacity");e.onEnter(),this.storage.push(e)}pop(){let e=this.storage.pop();return null==e||e.onExit(),e}peek(){return this.storage[this.size()-1]}size(){return this.storage.length}}},689:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.createAudio=t.isAudioSupported=void 0,t.isAudioSupported=function(){let e=document.createElement("audio");if(e&&e.canPlayType){let t=e.canPlayType('audio/ogg; codecs="vorbis"'),i=e.canPlayType("audio/mpeg;"),n=e.canPlayType('audio/wav; codecs="1"');return{ogg:"probably"===t||"maybe"===t,mp3:"probably"===i||"maybe"===i,wav:"probably"===n||"maybe"===n}}return!1},t.createAudio=function(e,t,i){var n;const o=document.createElement("audio"),{volume:r,loop:s}=t;return o.addEventListener("canplay",i,!1),o.volume=null!==(n=t.volume)&&void 0!==n?n:.5,o.loop=null!=s&&s,o.src=e,o}},803:(e,t,i)=>{i.r(t),i.d(t,{html:()=>C,nextTick:()=>h,r:()=>_,reactive:()=>E,t:()=>y,w:()=>S,watch:()=>P});const n=new Map,o=new Set,r=new Set;let s=!1;const a=new WeakMap;function c(e){return(t,i)=>{o.size||setTimeout((()=>{s=!0,o.forEach((e=>e(t,i))),o.clear(),s=!1,r.forEach((e=>e())),r.clear()})),!s&&o.add(e)}}function h(e){if(!o.size)return e&&e(),Promise.resolve();let t;const i=new Promise((e=>{t=e}));return r.add((()=>{e&&e(),t()})),i}function l(e,t){n.forEach((i=>{let n=i.get(e);n||(n=new Set,i.set(e,n)),n.add(t)}))}function d(e){return"function"==typeof e&&!!e.isT}function u(e){return"object"==typeof e&&null!==e&&"function"==typeof e.$on}function f(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function g(e){const t=document.createElement("template");t.innerHTML=e;const i=t.content.cloneNode(!0);return i.normalize(),i.childNodes}function p(e=Symbol()){let t="",i=[],n=[],o=[];const r=new Map,s=()=>{n.length||c();const e=h(m(g(t),i)());return a(),e};s.ch=()=>o,s.l=0,s.add=e=>{if(!e&&0!==e)return;let o,a=e,c=[];var h;d(e)?[a,c,o]=e._h():a="\x3c!----\x3e"===(h=String(e))?h:h.replace(/[<>]/g,(e=>">"===e?"&gt;":"&lt;")),t+=a,t+="\x3c!--❍⇚--\x3e";const l=o&&r.get(o),u=l||{html:a,exp:c,dom:[],tpl:e,key:o};n.push(u),o&&(l?l.exp.forEach(((e,t)=>e._up(c[t].e))):r.set(o,u)),c.forEach((e=>i.push(e))),s.l++},s._up=()=>{const t=p(e);let i=0,r=o[0].dom[0];n.length||c(document.createComment(""));const s=()=>{if(!t.l)return;const e=t(),o=e.lastChild;r[i?"after":"before"](e),l(t,n,i),r=o};n.forEach(((e,n)=>{const a=o[n];e.key&&e.dom.length?(s(),a&&a.dom===e.dom||r[n?"after":"before"](...e.dom),r=e.dom[e.dom.length-1]):a&&e.html===a.html&&!a.key?(s(),a.exp.forEach(((t,i)=>t._up(e.exp[i].e))),e.exp=a.exp,e.dom=a.dom,r=e.dom[e.dom.length-1]):(t.l||(i=n),t.add(e.tpl))})),s();let h=r.nextSibling;for(;h&&f(h,e);){const e=h.nextSibling;w(h),h=e}a()};const a=()=>{t="",s.l=0,i=[],o=[...n],n=[]},c=e=>{t="\x3c!----\x3e",n.push({html:t,exp:[],dom:e?[e]:[],tpl:t,key:0})},h=t=>{let i=0;const o=[];return t.childNodes.forEach((t=>{if(8===t.nodeType&&"❍⇚"===t.data)return i++,void o.push(t);Object.defineProperty(t,e,{value:e}),n[i].dom.push(t)})),o.forEach((e=>e.remove())),t},l=(e,t,i)=>{e.ch().forEach(((e,n)=>{t[i+n].dom=e.dom}))};return s}function y(e,...t){const i=[];let n="";const o=(e,t)=>{if("function"==typeof e){let n=()=>{};return i.push(Object.assign(((...t)=>e(...t)),{e,$on:e=>{n=e},_up:t=>{e=t,n()}})),t+"\x3c!--➳❍--\x3e"}return Array.isArray(e)?e.reduce(((e,t)=>o(t,e)),t):t+e},r=()=>(n||(n=e.reduce((function(e,i,n){return e+=i,void 0!==t[n]?o(t[n],e):e}),"")),n),s=e=>{const t=m(g(r()),i);return e?t(e):t()};return s.isT=!0,s._k=0,s._h=()=>[r(),i,s._k],s.key=e=>(s._k=e,s),s}function m(e,t){const i=document.createDocumentFragment();let n;for(;n=e.item(0);)8!==n.nodeType||"➳❍"!==n.nodeValue?(n instanceof Element&&v(n,t),n.hasChildNodes()&&m(n.childNodes,t)(n),i.append(n),n instanceof HTMLOptionElement&&(n.selected=n.defaultSelected)):i.append(b(n,t));return e=>e?(e.appendChild(i),e):i}function v(e,t){if(!e.hasAttributes())return;const i=e instanceof HTMLInputElement||e instanceof HTMLSelectElement||e instanceof HTMLTextAreaElement,n=e.attributes.length,o=[],r=[];for(let t=0;t<n;t++)r.push(e.attributes[t]);r.forEach((n=>{var r;const s=n.name;if(-1!==n.value.indexOf("\x3c!--➳❍--\x3e")){const n=t.shift();if("@"===s.charAt(0)){const t=s.substring(1);e.addEventListener(t,n),a.has(e)||a.set(e,new Map),null===(r=a.get(e))||void 0===r||r.set(t,n),o.push(s)}else S(n,(t=>{i&&"value"===s?e.value=t:!1!==t?e.setAttribute(s,t):e.removeAttribute(s)}))}})),o.forEach((t=>e.removeAttribute(t)))}function w(e){var t;e.remove(),null===(t=a.get(e))||void 0===t||t.forEach(((t,i)=>e.removeEventListener(i,t)))}function b(e,t){const i=document.createDocumentFragment();e.remove();const n=p(),o=t.shift();if(o&&d(o.e))n.add(o.e);else{n.l&&i.appendChild(n());let e=document.createTextNode("");e=S(o,(t=>x(e,t))),i.appendChild(e instanceof Node?e:e())}return n.l&&i.appendChild(n()),i}function x(e,t){if(!Array.isArray(t))return x(e,[t]);const i="function"==typeof e,n=i?e:p();return t.forEach((e=>n.add(e))),i&&n._up(),n}function S(e,t){const i=Symbol();n.has(i)||n.set(i,new Map);let o=new Map;const r=c(s);function s(){n.set(i,new Map);const s=e(),a=n.get(i);return n.delete(i),o.forEach(((e,t)=>{const i=a.get(t);i&&i.forEach((t=>e.delete(t))),e.forEach((e=>t.$off(e,r)))})),a.forEach(((e,t)=>{e.forEach((e=>t.$on(e,r)))})),o=a,t?t(s):s}return function(e){return f(e,"$on")}(e)&&e.$on(s),s()}function _(e,t={}){if(u(e)||"object"!=typeof e)return e;const i=t.o||new Map,n=t.op||new Map,o=Array.isArray(e),r=[],s=o?[]:Object.create(e,{});for(const t in e){const i=e[t];"object"==typeof i&&null!==i?(s[t]=u(i)?i:_(i),r.push(t)):s[t]=i}const a=e=>(t,o)=>{let r=i.get(t),s=n.get(o);r||(r=new Set,i.set(t,r)),s||(s=new Set,n.set(o,s)),r[e](o),s[e](t)},c=a("add"),h=a("delete"),d=(e,t,n)=>{i.has(e)&&i.get(e).forEach((e=>e(t,n)))},g={$on:c,$off:h,_em:d,_st:()=>({o:i,op:n,r:s,p:p._p}),_p:void 0},p=new Proxy(s,{get(...e){const[,t]=e;if(Reflect.has(g,t))return Reflect.get(g,t);const i=Reflect.get(...e);return l(p,t),o&&f(Array.prototype,t)?function(e,t,i,n){const o=(...n)=>{const o=Array.prototype[e].call(t,...n);if(t.forEach(((e,t)=>i._em(String(t),e))),i._p){const[e,t]=i._p;t._em(e,i)}return o};switch(e){case"shift":case"pop":case"sort":case"reverse":case"copyWithin":return o;case"unshift":case"push":case"fill":return(...e)=>o(...e.map((e=>_(e))));case"splice":return(e,t,...i)=>o(e,t,...i.map((e=>_(e))));default:return n}}(t,s,p,i):i},set(...e){const[t,i,n]=e,o=Reflect.get(t,i);if(Reflect.has(g,i))return Reflect.set(g,i,n);if(n&&u(o)){const e=o,r=e._st(),s=u(n)?function(e,t){const i=t._st();return i.o&&i.o.forEach(((t,i)=>{t.forEach((t=>{e.$on(i,t)}))})),i.p&&(e._p=i.p),e}(n,e):_(n,r);return Reflect.set(t,i,s),d(i,s),r.o.forEach(((t,i)=>{const n=Reflect.get(o,i),r=Reflect.get(s,i);n!==r&&e._em(i,r,n)})),!0}const r=Reflect.set(...e);return r&&(o!==n&&d(i,n,o),p._p&&p._p[1]._em(...p._p)),r}});return r.map((e=>{p[e]._p=[e,p]})),p}const C=y,E=_,P=S}},t={};function i(n){var o=t[n];if(void 0!==o)return o.exports;var r=t[n]={exports:{}};return e[n].call(r.exports,r,r.exports,i),r.exports}i.d=(e,t)=>{for(var n in t)i.o(t,n)&&!i.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;i.g.importScripts&&(e=i.g.location+"");var t=i.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var n=t.getElementsByTagName("script");n.length&&(e=n[n.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),i.p=e})(),(()=>{const e=i(769),t=i(305);window.addEventListener("load",(function(){try{e.asteroids.init(t.menu)}catch(e){const t=e;console.error(t),alert(t.message)}}))})(),i.p})();