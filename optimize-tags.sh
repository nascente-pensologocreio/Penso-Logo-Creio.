#!/bin/bash

# Script de otimização de imagens do carrossel
# Reduz de ~10MB para ~80KB mantendo qualidade visual

INPUT_DIR="src/assets"
OUTPUT_DIR="src/assets/tags-optimized"

echo "🎨 Iniciando otimização de imagens do carrossel..."
echo ""

# Contador
count=0

# Processar todas as imagens tag-*.webp
for img in "$INPUT_DIR"/tag-*.webp; do
  if [ -f "$img" ]; then
    filename=$(basename "$img")
    output="$OUTPUT_DIR/$filename"
    
    # Tamanho original
    size_before=$(du -h "$img" | cut -f1)
    
    # Otimizar: redimensionar para largura máxima 1200px e comprimir
    convert "$img" \
      -resize '1200x800^' \
      -gravity center \
      -extent 1200x800 \
      -quality 85 \
      -strip \
      "$output"
    
    # Tamanho após
    size_after=$(du -h "$output" | cut -f1)
    
    echo "✅ $filename: $size_before → $size_after"
    ((count++))
  fi
done

echo ""
echo "🎉 Otimização concluída! $count imagens processadas."
echo "📁 Imagens salvas em: $OUTPUT_DIR"
