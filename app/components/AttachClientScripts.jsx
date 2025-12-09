"use client";
import { useEffect } from "react";

export default function AttachClientScripts(){
  useEffect(() => {
    // Favoritos
    const cards = document.querySelectorAll(".card-restaurante, .card-bares, .card-hotel, .card-pontos-turistico");

    cards.forEach(card => {
      if (card.querySelector('.btn-favoritar')) return; // already attached

      const tituloEl = card.querySelector("h3") || card.querySelector('h2');
      const titulo = tituloEl ? tituloEl.textContent.trim() : 'item';

      const btnFav = document.createElement("button");
      btnFav.className = "btn-favoritar";
      btnFav.textContent = JSON.parse(localStorage.getItem('favoritos')||'[]').includes(titulo) ? '❤️' : '🤍';
      btnFav.style.cssText = 'position:absolute;top:10px;right:10px;width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,0.9);border:none;cursor:pointer;z-index:10';

      btnFav.addEventListener('click', (e) => {
        e.stopPropagation();
        const chave = 'favoritos';
        let favs = JSON.parse(localStorage.getItem(chave)||'[]');
        if (favs.includes(titulo)) {
          favs = favs.filter(f=>f!==titulo);
          btnFav.textContent = '🤍';
        } else {
          favs.push(titulo);
          btnFav.textContent = '❤️';
        }
        localStorage.setItem(chave, JSON.stringify(favs));
      });

      card.style.position = 'relative';
      card.appendChild(btnFav);
    });

    // Compartilhar
    cards.forEach(card => {
      if (card.querySelector('.btn-compartilhar')) return;
      const tituloEl = card.querySelector("h3") || card.querySelector('h2');
      const titulo = tituloEl ? tituloEl.textContent.trim() : 'item';
      const btnShare = document.createElement('button');
      btnShare.className = 'btn-compartilhar';
      btnShare.textContent = '📤';
      btnShare.style.cssText = 'position:absolute;top:10px;left:10px;width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,0.9);border:none;cursor:pointer;z-index:10';
      btnShare.addEventListener('click', (e)=>{
        e.stopPropagation();
        if (navigator.share) {
          navigator.share({ title: titulo, text: titulo, url: window.location.href }).catch(()=>{});
        } else {
          alert(`Compartilhe: ${titulo}\n${window.location.href}`);
        }
      });
      card.style.position = 'relative';
      card.appendChild(btnShare);
    });

    // Navegação por cards (se não houver script já)
    const navMapRest = {
      "Tio Armenio": "tio armenio",
      "Bentu's Restaurante": "bentu's",
      "Diamante da serra": "diamante da serra",
      "Restaurante Da Mae Beata": "restaurante mae beata",
      "Ferreiro Rooftop": "ferreiro rooftop"
    };

    const navMapPontos = {
      'São joão de Caruaru': 'sao joao',
      'Serra dos Cavalos': 'serra dos cavalos',
      'Morro Bom Jesus': 'morro bom jesus',
      'Alto do Moura': 'alto do moura',
      'Feira de Caruaru': 'feira de caruaru'
    };

    document.querySelectorAll('.card-restaurante, .card-bares, .card-hotel, .card-pontos-turistico').forEach(card => {
      const titleEl = card.querySelector('h3') || card.querySelector('h2');
      const title = titleEl ? titleEl.textContent.trim() : null;
      const btn = card.querySelector('.botao_oferta');
      const handler = () => {
        if (!title) return;
        let page = navMapRest[title] || navMapPontos[title];
        if (page) window.location.href = '/html/' + encodeURIComponent(page) + '.index.html';
      };
      if (btn) btn.addEventListener('click', (e)=>{ e.stopPropagation(); handler(); });
      card.addEventListener('click', handler);
    });

    // Carrossel simples para galerias
    function initCarousels(){
      const galerias = document.querySelectorAll('.restaurantes-imagens, .hoteis-imagens, .bares-imagens');
      galerias.forEach(container => {
        if (container.dataset.carousel) return;
        const imgs = Array.from(container.querySelectorAll('img'));
        if (imgs.length <= 1) return;
        container.dataset.carousel = '1';
        let idx = 0;
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        wrapper.style.overflow = 'hidden';
        wrapper.style.width = '100%';
        const track = document.createElement('div');
        track.style.display = 'flex';
        track.style.transition = 'transform 0.3s ease';
        imgs.forEach(img => { img.style.minWidth = '100%'; img.style.objectFit='cover'; track.appendChild(img); });
        wrapper.appendChild(track);
        const prev = document.createElement('button'); prev.textContent='❮'; prev.style.cssText='position:absolute;left:8px;top:50%;transform:translateY(-50%);z-index:3';
        const next = document.createElement('button'); next.textContent='❯'; next.style.cssText='position:absolute;right:8px;top:50%;transform:translateY(-50%);z-index:3';
        prev.addEventListener('click', ()=>{ idx = (idx-1+imgs.length)%imgs.length; track.style.transform = `translateX(-${idx*100}%)`; });
        next.addEventListener('click', ()=>{ idx = (idx+1)%imgs.length; track.style.transform = `translateX(-${idx*100}%)`; });
        container.innerHTML = ''; container.appendChild(wrapper); container.appendChild(prev); container.appendChild(next);
      });
    }

    initCarousels();

  }, []);

  return null;
}
