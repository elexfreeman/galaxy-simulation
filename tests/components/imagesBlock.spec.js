/* eslint-disable i18n/no-russian-character, max-len */
import { parser } from '../../src/index';

describe('Images block ', () => {
  it('Check pattern full', () => {
    const src = `
<!-- component:imagesBlock
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
<!-- /component -->
`;

    expect(parser(src)).toMatchSnapshot();
  });

  it('Check pattern img only', () => {
    const src = `
<!-- component:imagesBlock
  smRow: 3
  mdRow: 3
  lgRow: 3
  data
-->
![картинка center](https://www.letu.ru/common/img/banners/gomobile_apr22_3320.jpg)
![картинка center](https://www.letu.ru/common/img/banners/gomobile_apr22_3320.jpg)
![картинка center](https://www.letu.ru/common/img/banners/gomobile_apr22_3320.jpg)
<!-- /component -->
`;

    expect(parser(src)).toMatchSnapshot();
  });

  it('Check pattern img title', () => {
    const src = `
<!-- component:imagesBlock
  smRow: 3
  mdRow: 3
  lgRow: 3
-->
![картинка center](https://www.letu.ru/common/img/banners/gomobile_apr22_3320.jpg)
### title 111

![картинка center](https://www.letu.ru/common/img/banners/gomobile_apr22_3320.jpg)
## title 222
<!-- /component -->
`;

    expect(parser(src)).toMatchSnapshot();
  });

  it('Check pattern img description', () => {
    const src = `
<!-- component:imagesBlock
  smRow: 3
  mdRow: 3
  lgRow: 3
-->
![картинка center](https://www.letu.ru/common/img/banners/gomobile_apr22_3320.jpg)
description 1

![картинка center](https://www.letu.ru/common/img/banners/gomobile_apr22_3320.jpg)
description 2
<!-- /component -->
`;

    expect(parser(src)).toMatchSnapshot();
  });

  it('Check mix', () => {
    const src = `
<!-- component:imagesBlock
  smRow: 3
  mdRow: 3
  lgRow: 3
-->
![картинка center](https://www.letu.ru/common/img/banners/gomobile_apr22_3320.jpg)
###### title *1*
description 2
![картинка center](https://www.letu.ru/common/img/banners/gomobile_apr22_3320.jpg)
description 3
![картинка center](https://www.letu.ru/common/img/banners/gomobile_apr22_3320.jpg)
![картинка center](https://www.letu.ru/common/img/banners/gomobile_apr22_3320.jpg)
<!-- /component -->
`;

    expect(parser(src)).toMatchSnapshot();
  });

  it('Check wrong component', () => {
    const src = `
<!-- component:imagesBlock
  smRow: 3
  mdRow: 3
  lgRow: 3
-->
![картинка center](https://www.letu.ru/common/img/banners/gomobile_apr22_3320.jpg)
# title *1*
description 2
description 2

![картинка center](https://www.letu.ru/common/img/banners/gomobile_apr22_3320.jpg)
description 3
![картинка center](https://www.letu.ru/common/img/banners/gomobile_apr22_3320.jpg)
![картинка center](https://www.letu.ru/common/img/banners/gomobile_apr22_3320.jpg)
<!-- /component -->
`;

    expect(parser(src)).toMatchSnapshot();
  });
});

/* eslint-enable i18n/no-russian-character, max-len */
