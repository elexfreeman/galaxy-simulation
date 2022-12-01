import { baseComponentRule } from '@/components/baseComponent';

/* eslint-disable i18n/no-russian-character */

describe('Base component', () => {
  it('Check base component regex rule', () => {
    const src = `<!-- component:imagesBlock
  smRow: 3
  mdRow: 3
  lgRow: 3
  data
-->
![картинка center](https://www.letu.ru/common/img/banners/gomobile_apr22_3320.jpg)
###### title *1*
description 2
![картинка center](https://www.letu.ru/common/img/banners/gomobile_apr22_3320.jpg)
description 3
![картинка center](https://www.letu.ru/common/img/banners/gomobile_apr22_3320.jpg)
![картинка center](https://www.letu.ru/common/img/banners/gomobile_apr22_3320.jpg)
#### title *4*
description 4
<!-- /component -->`;

    const match = baseComponentRule.exec(src);
    expect(Boolean(match)).toBe(true);
  });
});
/* eslint-enable i18n/no-russian-character */
