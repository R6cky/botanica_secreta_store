// Insira o número da loja com DDI e DDD, somente dígitos. Exemplo: 5511999999999.
const WHATSAPP_NUMBER = '31988170153';
const PRODUCTS = [
  {name:'Flor do Campo',detail:'Flor branca em resina',image:'assets/hero-1.webp',alt:'Colar oval com flor branca em resina'},
  {name:'Folha Dourada',detail:'Folhagem em tons terrosos',image:'assets/hero-2.webp',alt:'Colar em gota com folhagem dourada em resina'},
  {name:'Flor de Outono',detail:'Flor roxa e folha verde',image:'assets/hero-3.webp',alt:'Colar redondo com flor roxa e folha verde em resina'}, 
   {name:'Flor do Campo',detail:'Flor branca em resina',image:'assets/hero-1.webp',alt:'Colar oval com flor branca em resina'},
  {name:'Folha Dourada',detail:'Folhagem em tons terrosos',image:'assets/hero-2.webp',alt:'Colar em gota com folhagem dourada em resina'},
  {name:'Flor de Outono',detail:'Flor roxa e folha verde',image:'assets/hero-3.webp',alt:'Colar redondo com flor roxa e folha verde em resina'}
];
const PAGE_SIZE = 6;
const whatsapp = message => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
document.querySelectorAll('.whatsapp').forEach(a => a.href = whatsapp('Olá! Gostaria de saber mais sobre os colares botânicos.'));
const grid = document.querySelector('#product-grid'), pagination = document.querySelector('#pagination');
function renderProducts(page) {
  const total = Math.max(1, Math.ceil(PRODUCTS.length / PAGE_SIZE));
  page = Math.max(1, Math.min(page, total));
  grid.replaceChildren();
  PRODUCTS.slice((page-1)*PAGE_SIZE,page*PAGE_SIZE).forEach(p => {
    const card=document.createElement('article'); card.className='product';
    const frame=document.createElement('div'); frame.className='product-image';
    const img=document.createElement('img'); img.src=p.image; img.alt=p.alt; img.loading='lazy'; frame.append(img);
    const info=document.createElement('div'); info.className='product-info';
    const words=document.createElement('div'), title=document.createElement('h3'), detail=document.createElement('p');
    title.textContent=p.name; detail.textContent=p.detail; words.append(title,detail);
    const link=document.createElement('a'); link.href=whatsapp(`Olá! Gostaria de saber mais sobre o colar ${p.name}.`); link.target='_blank'; link.rel='noopener noreferrer'; link.setAttribute('aria-label',`Perguntar sobre ${p.name} no WhatsApp`); link.textContent='↗';
    info.append(words,link); card.append(frame,info); grid.append(card);
  });
  pagination.replaceChildren();
  if(total<2)return;
  function button(label,target,disabled,current) {
    const b=document.createElement('button'); b.type='button'; b.textContent=label; b.disabled=disabled;
    b.setAttribute('aria-label', label==='←'?'Página anterior':label==='→'?'Próxima página':`Página ${label}`);
    if(current)b.setAttribute('aria-current','page');
    b.addEventListener('click',()=>{renderProducts(target);document.querySelector('#colecao').scrollIntoView({behavior:reduced.matches?'instant':'smooth'});});
    pagination.append(b);
  }
  button('←',page-1,page===1,false);
  for(let i=1;i<=total;i++)button(String(i),i,i===page,i===page);
  button('→',page+1,page===total,false);
}
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
renderProducts(1);
const slides=[...document.querySelectorAll('.slide')],dots=[...document.querySelectorAll('.dot')],hero=document.querySelector('.hero');
let index=0,timer;
function show(i){index=(i+slides.length)%slides.length;slides.forEach((s,n)=>{s.classList.toggle('active',n===index);s.setAttribute('aria-hidden',String(n!==index));});dots.forEach((d,n)=>{d.classList.toggle('active',n===index);if(n===index)d.setAttribute('aria-current','true');else d.removeAttribute('aria-current');});document.querySelector('#current-slide').textContent=String(index+1).padStart(2,'0');}
function stop(){clearInterval(timer)}function start(){stop();if(!reduced.matches)timer=setInterval(()=>{if(!document.hidden)show(index+1)},6500)}
document.querySelector('#prev').addEventListener('click',()=>{show(index-1);start()});document.querySelector('#next').addEventListener('click',()=>{show(index+1);start()});dots.forEach((d,n)=>d.addEventListener('click',()=>{show(n);start()}));
hero.addEventListener('mouseenter',stop);hero.addEventListener('mouseleave',start);hero.addEventListener('focusin',stop);hero.addEventListener('focusout',e=>{if(!hero.contains(e.relatedTarget))start()});reduced.addEventListener('change',start);start();
