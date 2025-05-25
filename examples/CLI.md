```bash
touch COVER_FRONT.md
touch COVER_BACK.md
npm link
docly -m COVER_FRONT.md -p 0.0_Cover_Front_Base.pdf
docly -e 0.0_Cover_Front_Base.pdf -r "1" -p 0.0_Cover_Front.pdf
docly -m COVER_FRONT.md -p 0.0_Cover_Back_Base.pdf
docly -m COVER_BACK.md -p 0.0_Cover_Back_Base.pdf
docly -e 0.0_Cover_Back_Base.pdf -r "1" -p 0.0_Cover_Back.pdf
rm -rf 0.0_Cover_Front_Base.pdf
rm -rf 0.0_Cover_Back_Base.pdf
mv 0.0_Cover_Back.pdf Z.Z_Cover_Back.pdf
docly -m README.md -p README.pdf
docly -g ./ -p "Docly README MD v0.5.0.pdf"
```