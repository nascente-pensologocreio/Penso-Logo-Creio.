// src/hooks/useScrollAnimation.js

import { useEffect, useRef, useState } from 'react';

const useScrollAnimation = (rootMargin = '0px', delay = 0) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef(null);
  const hasBeenVisible = useRef(false);

  useEffect(() => {
    if (hasBeenVisible.current) return;

    // --- Lógica Principal: Intersection Observer ---
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsIntersecting(true);
              hasBeenVisible.current = true;
            }, delay * 1000);
            
            observerInstance.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin,
        threshold: 0.1,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    
    // --- Rede de Segurança (Safety Net) para Componentes no Topo ---
    // Verifica se o elemento já está na tela logo após a montagem.
    const safetyTimeout = setTimeout(() => {
      if (elementRef.current && !hasBeenVisible.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Se o elemento estiver visível no topo da tela, aciona a animação.
        if (rect.top < viewportHeight) {
             setTimeout(() => {
                setIsIntersecting(true);
                hasBeenVisible.current = true;
             }, delay * 1000); 
             
             if (elementRef.current) observer.unobserve(elementRef.current);
        }
      }
    }, 100); 

    // Limpeza
    return () => {
      clearTimeout(safetyTimeout);
      if (elementRef.current) observer.unobserve(elementRef.current);
    };
  }, [rootMargin, delay]);

  return [elementRef, isIntersecting];
};

export default useScrollAnimation;