export class StarTrackerState {
  static default = 0;
  static startSelect = 1;
}

export const starTrackerInit = () => {
  window.starTrackerState = StarTrackerState.default;
}
