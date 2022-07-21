import { ApiSync, Attributes, Eventing, Model } from '@varuntiwari/tomperjs';

export interface YeyeBibiProps {
  id?: number;
  input?: string;
  output?: string;
}

export class YeyeBibi extends Model<YeyeBibiProps> {
  static buildYeyeBibi(attrs: YeyeBibiProps): YeyeBibi {
    return new YeyeBibi(
      new Attributes<YeyeBibiProps>(attrs),
      new Eventing(),
      new ApiSync<YeyeBibiProps>('')
    );
  }
}
