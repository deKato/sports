export const debounce = (fnc: any, delay: any) => {
  let time: any;

  return function toBeExecuted(...args: any) {
    const later = () => {
      clearTimeout(time);
      fnc(...args);
    };

    clearTimeout(time);
    time = setTimeout(later, delay);
  };
};
