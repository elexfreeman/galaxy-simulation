class MenuStateClass {
  readonly navigation = 0;
  readonly addStar = 1;
  readonly saveFile = 2;
  readonly loadFile = 3;
  readonly starTracking = 4;
  readonly player = 5;
}

export const MenuStateConst = new MenuStateClass();

let menuState = {
  state: MenuStateConst.navigation,
};

export default menuState;
