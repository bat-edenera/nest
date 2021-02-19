const fs = require("fs");
const path = require("path");
const pdfjsLib = require("pdfjs-dist/es5/build/pdf.js");
const Canvas = require("canvas");
var image = [];
const convert = async (pdfFileName) => {
  image = [];
  // Read the PDF file into a typed array so PDF.js can load it.
  const rawData = new Uint8Array(fs.readFileSync(pdfFileName));
  try {
    let pdfDocument = await pdfjsLib.getDocument(rawData).promise;
    await handlePdfPage(pdfDocument, 1);
  } catch (e) { return e }
  return image
};
function NodeCanvasFactory() { }
NodeCanvasFactory.prototype = {
  create: function NodeCanvasFactory_create(width, height) {
    var canvas = Canvas.createCanvas(width, height);
    var context = canvas.getContext("2d");
    return {
      canvas: canvas,
      context: context,
    };
  },
  reset: function NodeCanvasFactory_reset(canvasAndContext, width, height) {
    canvasAndContext.canvas.width = width;
    canvasAndContext.canvas.height = height;
  },
  destroy: function NodeCanvasFactory_destroy(canvasAndContext) {
    canvasAndContext.canvas.width = 0;
    canvasAndContext.canvas.height = 0;
    canvasAndContext.canvas = null;
    canvasAndContext.context = null;
  },
};
async function handlePdfPage(pdfDocument, index) {
  let page = await pdfDocument.getPage(index);
  const viewport = page.getViewport({ scale: 2 });
  const canvasFactory = new NodeCanvasFactory();
  const canvasAndContext = canvasFactory.create(
    viewport.width,
    viewport.height
  );
  const renderContext = {
    canvasContext: canvasAndContext.context,
    viewport: viewport,
    canvasFactory: canvasFactory,
  };
  await page.render(renderContext).promise;
  image.push(canvasAndContext.canvas.toDataURL().split(',')[1]);

  // const _image = canvasAndContext.canvas.toBuffer();
  // if (!fs.existsSync("./png-outputs")) {
  //   fs.mkdirSync("./png-outputs");
  // }
  // fs.writeFile(`./png-outputs/output_${index}.png`, _image, (error) => {
  //   if (error) {
  //     console.error("Error: " + error);
  //   } else {
  //     console.log(
  //       `Finished converting ${index} page of PDF file to a PNG image.`
  //     );
  //   }
  // });

  canvasFactory.destroy(canvasAndContext);
  // 递归异步遍历
  if (index < pdfDocument.numPages) {
    await handlePdfPage(pdfDocument, ++index)
  }
}


module.exports = convert;