export interface IRequest {
  headers: Record<string, string>;
  params: Record<string, string>;
  body: Record<string, any>;
  account?: {
    id: string;
    role: string;
  }
}
