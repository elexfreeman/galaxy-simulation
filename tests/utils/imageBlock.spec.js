import { patternFull, patternImgOnly, patternImgDescr, patternImgTitle } from '@/utils/imageBlock';

/* eslint-disable i18n/no-russian-character */

describe('Image block regex pattern', () => {
  it('Check pattern full', () => {
    const src = `![картинка center](https://www.letu.ru/common/img/banners/gomobile_apr22_3320.jpg)
###### title *1*
description 2`;
    const match = patternFull.exec(src);
    expect(Boolean(match));
  });

  it('Check pattern img only', () => {
    const src = `![картинка center](https://www.letu.ru/common/img/banners/gomobile_apr22_3320.jpg)`;
    const match = patternImgOnly.exec(src);
    expect(Boolean(match));
  });

  it('Check pattern img description', () => {
    const src = `![картинка center](https://www.letu.ru/common/img/banners/gomobile_apr22_3320.jpg)
description 2`;
    const match = patternImgDescr.exec(src);
    expect(Boolean(match));
  });

  it('Check pattern img title', () => {
    const src = `![картинка center](https://www.letu.ru/common/img/banners/gomobile_apr22_3320.jpg)
###### title *1*`;
    const match = patternImgTitle.exec(src);
    expect(Boolean(match));
  });
});
/* eslint-enable i18n/no-russian-character */
