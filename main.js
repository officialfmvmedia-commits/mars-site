(()=>{const D=window.__D={boost:0,streak:0,burst:null};const RM=/[?&]rm=1/.test(location.search);
// hash typing
const H='436965b5e00b41f89fde63437d6bb13a1a983f23c76ab21da8f7a3a6bf0d69b3',he=document.getElementById('hash');
let hashed=false;function typeHash(){if(hashed)return;hashed=true;if(RM){he.textContent=H;return}let i=0;const hx='0123456789abcdef';const t=setInterval(()=>{i++;he.textContent=H.slice(0,i)+Array.from({length:Math.min(8,64-i)},()=>hx[Math.random()*16|0]).join('');if(i>=64){clearInterval(t);he.textContent=H}},28)}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');if(e.target.querySelector('#hash'))typeHash()}}),{threshold:.2});
document.querySelectorAll('.steps li').forEach(l=>io.observe(l));
// parallax + flyover
const layers=[...document.querySelectorAll('[data-speed]')],fly=document.getElementById('flyover'),track=document.querySelector('.track'),pct=document.getElementById('pct');
function onScroll(){const y=scrollY;if(!RM)layers.forEach(l=>l.style.transform=`translate3d(0,${y*l.dataset.speed*(1+D.boost*(1.6-l.dataset.speed))}px,0) scaleY(${1+D.boost*.04})`);
const r=fly.getBoundingClientRect(),p=Math.min(1,Math.max(0,-r.top/(r.height-innerHeight)));const max=track.scrollWidth-innerWidth;track.style.transform=`translate3d(${-p*max}px,-50%,0)`;pct.textContent=(p*100|0)}
addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);document.getElementById('strip').addEventListener('load',onScroll);onScroll();
// dust
const c=document.getElementById('dust'),x=c.getContext('2d');let W,Hh,P=[];function rs(){W=c.width=innerWidth;Hh=c.height=innerHeight;P=Array.from({length:Math.min(160,W/8|0)},()=>({x:Math.random()*W,y:Math.random()*Hh,r:Math.random()*1.8+.3,v:Math.random()*.6+.15,a:Math.random()*.5+.1,w:Math.random()*6}))}rs();addEventListener('resize',rs);
function draw(t){x.clearRect(0,0,W,Hh);if(D.burst){D.burst(x,W,Hh)}for(const p of P){if(!RM){p.x+=p.v;p.y+=Math.sin(t/1800+p.w)*.25;if(p.x>W+5){p.x=-5;p.y=Math.random()*Hh}}x.fillStyle=`rgba(235,190,150,${p.a})`;x.beginPath();x.arc(p.x,p.y,p.r,0,7);x.fill()}if(!RM)requestAnimationFrame(draw)}D.draw=draw;requestAnimationFrame(draw);
// ---- atmospheric descent ----
const cta=document.querySelector('.cta'),hero=document.querySelector('.hero'),story=document.getElementById('story'),flare=document.querySelector('.flare'),puff=document.querySelector('.puff'),phs=[...document.querySelectorAll('.hero .ph')];
let run=null;
function ease(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2} // slow start, fast middle, soft land
function whoosh(){if(!/[?&]sound=1/.test(location.search)&&localStorage.getItem('marsSound')!=='1')return;try{const A=new (window.AudioContext||window.webkitAudioContext)(),n=A.sampleRate*2,b=A.createBuffer(1,n,A.sampleRate),d=b.getChannelData(0);for(let i=0;i<n;i++)d[i]=Math.random()*2-1;const s=A.createBufferSource();s.buffer=b;const f=A.createBiquadFilter();f.type='bandpass';f.Q.value=.8;f.frequency.setValueAtTime(200,A.currentTime);f.frequency.exponentialRampToValueAtTime(1800,A.currentTime+.9);f.frequency.exponentialRampToValueAtTime(150,A.currentTime+1.9);const g=A.createGain();g.gain.setValueAtTime(0,A.currentTime);g.gain.linearRampToValueAtTime(.25,A.currentTime+.8);g.gain.linearRampToValueAtTime(0,A.currentTime+1.9);s.connect(f).connect(g).connect(A.destination);s.start();s.stop(A.currentTime+2)}catch(e){}}
let S=[];function spawn(n,W,H){const dn=D.dir<0;for(let i=0;i<n;i++)S.push({x:Math.random()*W,y:dn?-Math.random()*H*.6-150:H+Math.random()*H*.6,v:12+Math.random()*28,l:30+Math.random()*120,w:.6+Math.random()*1.8,a:.25+Math.random()*.5})}
D.dir=1;D.burst=(x,W,H)=>{if(!S.length&&!run)return;if(run&&D.boost>.2&&S.length<260)spawn(8*D.boost|0,W,H);x.lineCap='round';for(let i=S.length-1;i>=0;i--){const p=S[i];p.y-=p.v*(.4+D.boost)*(D.dir||1);p.a*=.985;const L=p.l*(.3+D.boost*1.4);const sg=(D.dir||1),Y2=p.y+L*sg;const g=x.createLinearGradient(p.x,p.y,p.x,Y2);g.addColorStop(0,`rgba(255,214,160,${p.a})`);g.addColorStop(1,'rgba(200,110,50,0)');x.strokeStyle=g;x.lineWidth=p.w;x.beginPath();x.moveTo(p.x,p.y);x.lineTo(p.x,Y2);x.stroke();if(p.y+L<-200||p.y>H+400||p.a<.02)S.splice(i,1)}};
function reset(){D.boost=0;hero.style.transform=story.style.transform='';phs.forEach(p=>p.style.filter='');flare.style.opacity=0;cta.classList.remove('go');onScroll()}
function stop(){if(!run)return;cancelAnimationFrame(run.raf);run=null;reset()}
function landPuff(){puff.classList.remove('on');void puff.offsetWidth;puff.classList.add('on')}
const SL=+(new URLSearchParams(location.search).get('slow')||1);let lockUntil=0,lockCap=0,lastDir=0;window.__descents=0;
function glide(dir,src){if(run)return;const y1=dir>0?story.getBoundingClientRect().top+scrollY:0;
 if(RM){scrollTo({top:y1,behavior:'instant'});lockUntil=performance.now()+500;return}
 D.dir=dir;if(dir>0)cta.classList.add('go');whoosh();const y0=scrollY,T=(dir>0?1900:1300)*SL,delay=(dir>0?260:0)*SL;let t0=null;
 run={raf:0,dir,src};const step=ts=>{if(!run)return;if(t0===null)t0=ts;const el=ts-t0-delay;
  if(el<0){run.raf=requestAnimationFrame(step);return}
  const t=Math.min(1,el/T),k=ease(t);scrollTo({top:y0+(y1-y0)*k,behavior:'instant'});
  const v=Math.sin(Math.PI*t);D.boost=v;
  phs.forEach(p=>p.style.filter=`blur(${(v*3).toFixed(2)}px)`);
  flare.style.opacity=(Math.max(0,Math.sin(Math.PI*Math.min(1,t/.55)))*(dir>0?.95:.5)).toFixed(3);
  const sh=v*v*6*(1-t),sx=(Math.random()-.5)*sh,sy=(Math.random()-.5)*sh;hero.style.transform=story.style.transform=`translate3d(${sx}px,${sy}px,0)`;
  onScroll();
  if(t>=.86&&!run.p){run.p=1;landPuff();puff.style.animationDuration=(1.3*SL)+'s'}
  if(t<1)run.raf=requestAnimationFrame(step);else{run=null;reset();scrollTo({top:y1,behavior:'instant'});lockUntil=performance.now()+500;lockCap=performance.now()+2500;lastDir=dir;window.__descents+=dir>0?1:0;window.__lastLand=y1}};
 run.raf=requestAnimationFrame(step)}
cta.addEventListener('click',e=>{e.preventDefault();glide(1,'click')});
// unified input: dir +1 down / -1 up
function input(e,dy){const now=performance.now();
 if(run){const opposes=Math.sign(dy)===-run.dir;if(run.src==='click'||opposes){if(Math.abs(dy)>=4&&(run.src==='click'||opposes)){stop();lockUntil=0;return}}e.preventDefault();return}
 if(now<lockUntil){e.preventDefault();if(Math.sign(dy)===lastDir)lockUntil=Math.min(lockCap,Math.max(lockUntil,now+180));return}
 if(Math.abs(dy)<4)return;
 const heroH=hero.offsetHeight,sTop=story.getBoundingClientRect().top+scrollY;
 if(dy>0&&scrollY<heroH*.4){e.preventDefault();glide(1,'scroll')}
 else if(dy<0&&scrollY>=sTop-8&&scrollY<=sTop+80){e.preventDefault();glide(-1,'scroll')}}
addEventListener('wheel',e=>input(e,e.deltaMode?e.deltaY*16:e.deltaY),{passive:false});
let ty=null;addEventListener('touchstart',e=>{ty=e.touches[0].clientY},{passive:true});
addEventListener('touchmove',e=>{if(ty==null)return;const dy=ty-e.touches[0].clientY;if(run||performance.now()<lockUntil){input(e,dy);return}if(Math.abs(dy)>=10){input(e,dy);ty=null}},{passive:false});
addEventListener('touchend',()=>{ty=null},{passive:true});
addEventListener('keydown',e=>{if(/input|textarea|select/i.test(e.target.tagName))return;const k=e.key;let dy=0;
 if(k==='PageDown'||k==='ArrowDown'||(k===' '&&!e.shiftKey))dy=100;else if(k==='PageUp'||k==='ArrowUp'||(k===' '&&e.shiftKey))dy=-100;if(dy)input(e,dy)});
})();
