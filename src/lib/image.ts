// import html2canvas from "html2canvas";

// export const image = (element: HTMLElement) =>
//   html2canvas(element, {
//     scale: 10,
//     logging: true,
//     backgroundColor: null,
//   });

export const svgDataUrl = async (element: SVGSVGElement, scale = 10) => {
  const width = element.clientWidth * scale;
  const height = element.clientHeight * scale;

  const svg = element.cloneNode(true) as SVGSVGElement;

  svg.setAttribute("width", `${width}`);
  svg.setAttribute("height", `${height}`);

  const xml = `<?xml version="1.0" standalone="no"?>\r\n${new XMLSerializer().serializeToString(svg)}`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(xml)}`;
};

export const svgToCanvas = async (element: SVGSVGElement, scale = 10.0) => {
  const width = element.clientWidth * scale;
  const height = element.clientHeight * scale;

  const data = await svgDataUrl(element, scale);

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const imgEl = document.createElement("img");
    imgEl.width = width;
    imgEl.height = height;
    imgEl.onload = () => resolve(imgEl);
    imgEl.onerror = reject;
    imgEl.src = data;
  });

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (!context) throw new Error("no canvas context");

  context.drawImage(img, 0, 0, width, height);
  img.remove();

  return canvas;
};

export const image = (element: HTMLElement) => {
  const svg = element.querySelector("svg");
  if (!svg) throw new Error("SVG not found");

  return svgToCanvas(svg, 10);
};

export const imageBlob = async (el: HTMLElement, ty: string, quality = 1) => {
  const ctx = await image(el);
  const blob = await new Promise<Blob>((res, rej) =>
    ctx.toBlob((b) => (b ? res(b) : rej()), ty, quality),
  );
  ctx.remove();
  return blob;
};

export const imageDataUrl = async (
  el: HTMLElement,
  ty: string,
  quality = 1,
) => {
  const ctx = await image(el);

  const data = ctx.toDataURL(ty, quality);
  ctx.remove();
  return data;
};

export const download = async (el: HTMLElement, filename: string) => {
  const a = document.createElement("a");
  a.href = await imageDataUrl(el, "image/png");
  a.target = "_blank";
  a.download = filename;
  a.click();
  a.remove();
};
