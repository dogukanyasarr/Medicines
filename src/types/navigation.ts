import { Drug } from "./drugs";


export type RootStackParamList = {
  'İlaçlar': undefined;
  'İlaç Detayı': { drug: Drug };
  'Favoriler': undefined;
};
