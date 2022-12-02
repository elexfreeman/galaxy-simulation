(function(){"use strict";class e{constructor(t,s){this.x=t,this.y=s}static add(t,s){return new e(t.x+s.x,t.y+s.y)}static minus(t,s){return new e(t.x-s.x,t.y-s.y)}static addScalar(t){return new e(this.x+t,this.y+t)}static mult(t,s){return new e(t.x*s.x,t.y*s.y)}static length(t){return Math.sqrt(t.x*t.x+t.y*t.y)}}class d{constructor(t,s,o="#000000"){this.coord=t,this.massa=s,this.velocity=new e(0,0),this.color=o,this.family=0}setCoord2(t){t.x>1e3?this.velocity.x=-this.velocity.x*.9:t.x<0&&(this.velocity.x=-this.velocity.x*.9),this.coord.x=t.x,t.y>1e3?this.velocity.y=-this.velocity.y*.9:t.y<0&&(this.velocity.y=-this.velocity.y*.9),this.coord.y=t.y}setCoord(t){t.x>MAX_DOT_X?this.coord.x=t.x-MAX_DOT_X:t.x<0?this.coord.x=MAX_DOT_X-t.x:this.coord.x=t.x,t.y>MAX_DOT_Y?this.coord.y=t.y-MAX_DOT_Y:t.y<0?this.coord.y=MAX_DOT_Y-t.y:this.coord.y=t.y}setCoord3(t){this.coord.x=t.x,this.coord.y=t.y}static draw(t,s,o){t.beginPath(),t.strokeStyle=s.color,t.moveTo(s.coord.x,this.y),t.arc(s.coord.x-o.x,s.coord.y-o.y,3,0,Math.PI*2,!1),t.closePath(),t.stroke()}}const l=(n,t)=>Math.random()*(t-n)+n;class g{generate(){const t=[];for(let s=0;s<2e3;s++)t.push(new d(new e(l(300,600),l(300,600)),5));for(let s=0;s<2e3;s++)t.push(new d(new e(l(400,800),l(400,800)),5));return t}}class T extends g{generate(){const t=[];let s=0;const o=(a,r)=>a*Math.sin(r),i=(a,r)=>a*Math.cos(r),c=(a,r,h,O="#ffffff")=>{for(let x=0;x<a;x++){const f=l(0,360)*3.14/180,M=l(1,h);x%2&&s++;const _=new d(new e(o(M,f)+r.x,i(M,f)+r.y),5,O);_.family=s,t.push(_)}};return c(Math.ceil(2e3/3),new e(600,400),200,"#f8a5a5"),c(Math.ceil(2e3/3),new e(900,400),200,"#faeb9e"),c(Math.ceil(2e3/3),new e(800,900),200,"#d0ecc2"),t}}const A=(n,t)=>{const s=new e(0,0),o=()=>(n.family==t.family,1),i=e.minus(t.coord,n.coord),c=e.length(i);return s.x=.01*o()*i.x/(c*c),s.y=.01*o()*i.y/(c*c),s};class X{constructor(t,s,o){this.bodyList=t,this.startIdx=s,this.count=o}getCenterMassVector(){const t=new e(0,0);for(let s=0;s<this.bodyList.length;s++)t.x+=this.bodyList[s].coord.x,t.y+=this.bodyList[s].coord.y;return t.x=t.x/this.bodyList.length-1e3/2,t.y=t.y/this.bodyList.length-1e3/2,t}calc(){const t=[];for(let s=this.startIdx;s<this.startIdx+this.count&&!(s>=this.bodyList.length);s++)this.calcBody(this.bodyList[s],s),t.push(this.bodyList[s]);return t}calcBody(t,s){for(let i=0;i<this.bodyList.length;i++)if(i!=s){const c=this.bodyList[i],a=A(t,c);t.velocity=e.add(t.velocity,a)}const o=e.add(t.velocity,t.coord);t.coord.x=o.x,t.coord.y=o.y}}const u=[];let y=new T().generate();console.log("len",y.length);const w=(n,t,s,o)=>new Promise(i=>{u[n].postMessage({bodyList:t,startIdx:s,count:o,workerIdx:n});const c=a=>{i(a.data)};u[n].onmessage=c});for(let n=0;n<16;n++)u.push(new Worker("./workerCalc.8b8253c0.js",{type:"module"}));onmessage=async function(n){const t=Math.ceil(y.length/16);for(let i=0;i<1;i++){const c=[];for(let r=0;r<16;r++){const h=r*t;c.push(w(r,y,h,t))}y=(await Promise.all(c)).reduce((r,h)=>[...r,...h],[])}const o=new X(y,0,1).getCenterMassVector();postMessage({data:y,centerMassVector:o})}})();
