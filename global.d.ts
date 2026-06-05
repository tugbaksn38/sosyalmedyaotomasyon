// global.d.ts veya css-modules.d.ts adında bir dosya oluşturup içine yazın:
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}