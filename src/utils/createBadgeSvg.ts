const domparser = new DOMParser();

const createBadgeSvg = ({ texts, html }: { texts: SvgType[]; html: string }) => {
  const svgDOM = domparser.parseFromString(html, 'image/svg+xml').querySelector('svg') as SVGSVGElement;
  svgDOM.removeAttribute('width');
  svgDOM.removeAttribute('height');
  const serializer = new XMLSerializer();
  const tspans = Array.from(svgDOM.querySelectorAll(`tspan`));
  texts.forEach((text, index) => {
    const tspan = tspans[index];
    tspan.textContent = text.content;
    tspan.style.fill = text.color;
  });
  const svgString = serializer.serializeToString(svgDOM);
  return svgString;
};

export { createBadgeSvg };
