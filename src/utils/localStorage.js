import React from "react";
export const ifAuthenticated = () => {
  return localStorage.getItem("auth");
};

export const setAuth = () => {
  localStorage.setItem("auth", true);
};

export const removeAuth = () => {
  localStorage.removeItem("auth");
};
