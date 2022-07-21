import { YeyeBibi } from './models/YeyeBibi';
import { YeyeBibiView } from './views/YeyeBibiView';

const root = document.getElementById('app');

if (root) {
  const yeyeBibi = YeyeBibi.buildYeyeBibi({});
  const yeyeBibiView = new YeyeBibiView(root, yeyeBibi);
  yeyeBibiView.render();
}
