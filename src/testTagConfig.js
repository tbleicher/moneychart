/* eslint no-unused-vars: 0 */

import shortid from "shortid";

// d3 colors (category20c):
const BLUE1 = "#3182bd";
const BLUE2 = "#6baed6";
const BLUE3 = "#9ecae1";
const BLUE4 = "#c6dbef";
const ORANGE1 = "#e6550d";
const ORANGE2 = "#fd8d3c";
const ORANGE3 = "#fdae6b";
const ORANGE4 = "#fdd0a2";
const GREEN1 = "#31a354";
const GREEN2 = "#74c476";
const GREEN3 = "#a1d99b";
const GREEN4 = "#c7e9c0";
const VIOLET1 = "#756bb1";
const VIOLET2 = "#9e9ac8";
const VIOLET3 = "#bcbddc";
const VIOLET4 = "#dadaeb";
const GREY1 = "#636363";
const GREY2 = "#969696";
const GREY3 = "#bdbdbd";
const GREY4 = "#d9d9d9";
const RED = "#ff0000";

const TagPatternsArray = [
  ["Income", []],
  ["Income::Salary", ["Marley"]],

  ["Shopping", ["AMAZON"]],
  ["Shopping::Amazon", ["AMAZON"]],
  ["Shopping::Books", ["SERVICES-KINDLE"]],

  ["Groceries", []],
  ["Groceries::Green", ["Green Grocer Super Markets"]],
  ["Groceries::Sainsburys", ["SAINSBURYS"]],
  ["Groceries::Tesco", ["TESCO"]],

  ["Rent", ["Dunmanifestin"]],

  ["Bills", []],
  ["Bills::Power", ["SunPower "]],
  ["Bills::Internet", ["Interwebs LLC"]],
  ["Bills::Water", ["Water Works!"]],

  ["Transfer", ["400118 91681826"]]
];
TagPatternsArray.sort();
export const TagPatterns = new Map(TagPatternsArray);

const TagColorsArray = [
  ["Income", BLUE1],
  ["Income::Salary", RED],

  ["Shopping", ORANGE3],
  ["Shopping::Amazon", ORANGE3],
  ["Shopping::Books", ORANGE3],

  ["Groceries", GREEN1],
  ["Groceries::Green", GREEN2],
  ["Groceries::Sainsburys", GREEN3],
  ["Groceries::Tesco", GREEN4],

  ["Rent", VIOLET1],

  ["Bills", VIOLET3],
  ["Bills::Power", VIOLET3],
  ["Bills::Water", VIOLET3],
  ["Bills::Internet", VIOLET3],

  ["Transfer", VIOLET4]
];
TagColorsArray.sort();
export const TagColors = new Map(TagColorsArray);

const TagConfig = new Map();
TagPatterns.forEach((value, key, map) => {
  TagConfig.set(key, {
    id: shortid.generate(),
    label: key,
    color: TagColors.get(key),
    patterns: value
  });
});

export default TagConfig;
