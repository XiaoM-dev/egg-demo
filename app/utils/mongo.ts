import { Context } from "egg";

export const GetMongoData = async (filter: object, modelName: string, ctx: Context<any>) => {
  return await ctx.model[modelName].find(filter);
};
export const PostMongoData = async (data: object, modelName: string, ctx: Context<any>) => {
  return await ctx.model[modelName].create(data);
};
export const DeleteMongoData = async (data: object, modelName: string, ctx: Context<any>) => {
  return await ctx.model[modelName].remove(data);
};
export const PutMongoData = async (data: { name: string, password: string }, modelName: string, ctx: Context<any>) => {
  return await ctx.model[modelName].updateOne({ name: data.name }, data);
};