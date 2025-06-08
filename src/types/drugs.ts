export interface Drug {
  id: number;
  barcode: string;
  productName: string;
  activeIngredient: string;
  atcCode: string;
  company: string;
  licenseDate: string;
  licenseNumber: string;
  suspended: boolean;
  changeDate: string;
}
