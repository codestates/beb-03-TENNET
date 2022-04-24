export function LogIt(originMsg) {
  return function (_target, _key, desc) {
    const origin = desc.value;

    desc.value = function (...args) {
      console.log(`[LogIt] :: ${this.constructor.name} :: ${originMsg}`);
      return origin.apply(this, args);
    };
  };
}

export function AsyncLogIt(originMsg) {
  return function (target, _key, desc) {
    const origin = desc.value;

    desc.value = async function (...args) {
      console.log(`[LogIt] :: ${this.constructor.name} :: ${originMsg}`);
      return await origin.apply(this, args);
    };
  };
}
