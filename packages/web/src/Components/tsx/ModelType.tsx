import React from "react";

export type menuFullType = {
  name: string;
  id: string;
  thumbnailImage?: string;
  fullPrice: number;
  discountedPercent: number;
  discountedTimePeriod?: {
    begin: string;
    end: string;
  };
  sold: number;
  totalInStock: number;
  largeImage?: string;
  options: {
    label: string;
    choices: {
      label: string;
    }[];
  }[];
};

export type RestaurantFullMenu = {
  name: string;
  id: number;
  coverImage: string;
  menus: menuFullType[];
  activeTimePeriod: {
    open: string;
    close: string;
  };
};
