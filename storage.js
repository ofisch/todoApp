"use strict";

export const data = {
  set: function (key, value) {
    if (!key || !value) {
      return;
    }

    if (value == null) {
      return false;
    }

    if (typeof value === "object") {
      value = JSON.stringify(value);
    }
    //localStorage.setItem(key, value);
    console.log(`key: ${key}, value: ${value}`);
  },
  get: function (key) {
    const value = localStorage.getItem(key);

    if (!value) {
      return;
    }

    if (value[0] === "{") {
      value = JSON.parse(value);
    }
    return value;
  },
};
