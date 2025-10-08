declare module "*.module.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
declare module "*.scss"; // optional: allows importing non-module scss (globals)
