/* 澄鏡 CHÉNG JÌNG — interactions */
(function(){
  "use strict";
  document.addEventListener('DOMContentLoaded',function(){

    /* mobile nav */
    var burger=document.querySelector('.burger');
    var mnav=document.getElementById('mnav');
    if(burger&&mnav){
      burger.addEventListener('click',function(){
        var open=mnav.classList.toggle('open');
        burger.setAttribute('aria-expanded',open?'true':'false');
        document.body.style.overflow=open?'hidden':'';
      });
      mnav.querySelectorAll('a').forEach(function(a){
        a.addEventListener('click',function(){
          mnav.classList.remove('open');
          burger.setAttribute('aria-expanded','false');
          document.body.style.overflow='';
        });
      });
    }

    /* back to top */
    var top=document.getElementById('toTop');
    if(top){
      var onScroll=function(){
        if(window.scrollY>window.innerHeight*0.9)top.classList.add('show');
        else top.classList.remove('show');
      };
      window.addEventListener('scroll',onScroll,{passive:true});onScroll();
      top.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});
    }

    /* reveal on scroll */
    var revs=document.querySelectorAll('.rev');
    if('IntersectionObserver' in window && revs.length){
      var io=new IntersectionObserver(function(es){
        es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
      },{threshold:.12,rootMargin:'0px 0px -8% 0px'});
      revs.forEach(function(el){io.observe(el);});
    }else{revs.forEach(function(el){el.classList.add('in');});}

    /* collection filter */
    var chips=document.querySelectorAll('[data-filter]');
    var items=document.querySelectorAll('[data-cat]');
    if(chips.length){
      chips.forEach(function(c){
        c.addEventListener('click',function(){
          chips.forEach(function(x){x.setAttribute('aria-pressed','false');});
          c.setAttribute('aria-pressed','true');
          var f=c.getAttribute('data-filter');
          items.forEach(function(it){
            var show=(f==='all'||it.getAttribute('data-cat')===f);
            it.style.display=show?'':'none';
          });
        });
      });
    }

    /* product gallery thumbs */
    var mainImg=document.getElementById('pdpMain');
    var thumbs=document.querySelectorAll('.thumbs button');
    if(mainImg&&thumbs.length){
      thumbs.forEach(function(b){
        b.addEventListener('click',function(){
          thumbs.forEach(function(x){x.setAttribute('aria-current','false');});
          b.setAttribute('aria-current','true');
          var src=b.getAttribute('data-src');
          mainImg.src=src;
          mainImg.alt=b.querySelector('img').alt;
        });
      });
    }

    /* swatch option groups */
    document.querySelectorAll('[data-swatch-group]').forEach(function(g){
      var btns=g.querySelectorAll('.swatch');
      btns.forEach(function(b){
        b.addEventListener('click',function(){
          btns.forEach(function(x){x.setAttribute('aria-pressed','false');});
          b.setAttribute('aria-pressed','true');
        });
      });
    });

    /* accordion */
    document.querySelectorAll('.acc button.a-h').forEach(function(h){
      h.addEventListener('click',function(){
        var body=h.nextElementSibling;
        var open=h.getAttribute('aria-expanded')==='true';
        h.setAttribute('aria-expanded',open?'false':'true');
        body.style.maxHeight=open?'0':body.scrollHeight+'px';
      });
    });

    /* forms -> toast */
    var toast=document.getElementById('toast');
    function showToast(msg){
      if(!toast)return;
      toast.textContent=msg;toast.classList.add('show');
      clearTimeout(toast._t);toast._t=setTimeout(function(){toast.classList.remove('show');},3600);
    }
    document.querySelectorAll('form[data-toast]').forEach(function(f){
      f.addEventListener('submit',function(e){
        e.preventDefault();
        showToast(f.getAttribute('data-toast')||'已送出,我們會盡快與您聯繫。');
        f.reset();
      });
    });

    /* cart drawer */
    var cartToggle=document.querySelector('.cart-toggle');
    var drawer=document.getElementById('cartDrawer');
    var overlay=document.getElementById('cartOverlay');
    var cartClose=document.getElementById('cartClose');
    function openCart(){
      if(!drawer)return;
      drawer.classList.add('open');drawer.setAttribute('aria-hidden','false');
      if(overlay)overlay.classList.add('show');
      document.body.style.overflow='hidden';
      if(cartClose)cartClose.focus();
    }
    function closeCart(){
      if(!drawer)return;
      drawer.classList.remove('open');drawer.setAttribute('aria-hidden','true');
      if(overlay)overlay.classList.remove('show');
      document.body.style.overflow='';
      if(cartToggle)cartToggle.focus();
    }
    if(cartToggle&&drawer){
      cartToggle.addEventListener('click',openCart);
      if(cartClose)cartClose.addEventListener('click',closeCart);
      if(overlay)overlay.addEventListener('click',closeCart);
      document.addEventListener('keydown',function(e){if(e.key==='Escape'&&drawer.classList.contains('open'))closeCart();});
    }

    /* year */
    var y=document.getElementById('yr');if(y)y.textContent=new Date().getFullYear();
  });
})();
