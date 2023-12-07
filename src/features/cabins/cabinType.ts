export interface CabinType {
  _id: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
  description: string;
  createdAt: Date;
}
