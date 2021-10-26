import { useEffect, useRef, useState } from 'react';

const domparser = new DOMParser();

const useTransformSvg = (svg: string) => {
  const docRef = useRef<Document | null>(null);
  const [svgState, setSvgState] = useState<SvgType[]>([]);

  useEffect(() => {
    if (!!docRef.current) {
      docRef.current.body.innerHTML = svg;
    } else {
      docRef.current = domparser.parseFromString(svg, 'text/html');
    }
    const textEls = Array.from(docRef.current.querySelectorAll('tspan'));

    const texts = textEls.map(textEl => ({
      id: textEl.id,
      content: textEl.innerHTML,
      color: (textEl.parentNode as HTMLElement).getAttribute('fill') as string,
    }));
    setSvgState(texts);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [svg]);

  return {
    svgContent: svgState,
  };
};

export { useTransformSvg };
