const ACCOUNT_ID_1 = "FWKhjH1";
const ACCOUNT_ID_2 = "FWKhjH2";

export const tags = [];
export const transactions = [
  {
    id: "Ao-wOq5",
    accountId: ACCOUNT_ID_1,
    amount: 12.34,
    balance: 12.34,
    date: "2018-09-09T00:00:00.000Z",
    description: "",
    tags: ["red", "yellow"]
  },
  {
    amount: 41,
    accountId: ACCOUNT_ID_1,
    balance: 53.34,
    date: "2018-09-19T00:00:00.000Z",
    description: "",
    id: "Bo-wOq8",
    tags: ["green", "green::lime"]
  },
  {
    amount: -13.34,
    accountId: ACCOUNT_ID_1,
    balance: 40,
    date: "2018-09-21T00:00:00.000Z",
    description: "",
    id: "LZMSxN_"
  },
  {
    amount: -24,
    accountId: ACCOUNT_ID_1,
    balance: 17,
    date: "2018-09-16T00:00:00.000Z",
    description: "Wordbound Books",
    id: "by7kQD1"
  },
  {
    amount: -4.66,
    accountId: ACCOUNT_ID_1,
    balance: 12.34,
    date: "2018-09-18T00:00:00.000Z",
    description: "Ready-to-Eat London Brdg Rd )))",
    id: "by7kQDO"
  },
  {
    amount: -22,
    accountId: ACCOUNT_ID_1,
    balance: 41,
    date: "2018-09-15T00:00:00.000Z",
    description: "",
    id: "l-Bfp_D"
  },
  {
    amount: 7.66,
    balance: 20,
    date: "2018-09-10T00:00:00.000Z",
    description: "",
    accountId: ACCOUNT_ID_1,
    id: "NVuZf3J"
  },
  {
    amount: 17,
    balance: 37,
    date: "2018-09-11T00:00:00.000Z",
    description: "",
    accountId: ACCOUNT_ID_1,
    id: "M530ebR"
  },
  {
    amount: 26,
    balance: 63,
    date: "2018-09-13T00:00:00.000Z",
    description: "",
    accountId: ACCOUNT_ID_1,
    id: "fiv6DO3"
  }
];

export const transactions2 = [
  {
    amount: 5,
    balance: 25,
    date: "2018-09-10T00:00:00.000Z",
    description: "",
    accountId: ACCOUNT_ID_2,
    id: "NVuZf3J"
  },
  {
    amount: 15,
    balance: 40,
    date: "2018-09-11T00:00:00.000Z",
    description: "",
    accountId: ACCOUNT_ID_2,
    id: "M530ebR"
  },
  {
    amount: -15,
    balance: 25,
    date: "2018-09-13T00:00:00.000Z",
    description: "",
    accountId: ACCOUNT_ID_2,
    id: "fiv6DO3"
  },
  {
    amount: -20,
    accountId: ACCOUNT_ID_2,
    balance: 5,
    date: "2018-09-15T00:00:00.000Z",
    description: "",
    id: "l-Bfp_D"
  },
  {
    amount: 25,
    accountId: ACCOUNT_ID_2,
    balance: 30,
    date: "2018-09-18T00:00:00.000Z",
    description: "Ready-to-Eat London Brdg Rd )))",
    id: "by7kQDO"
  },
  {
    amount: -10,
    accountId: ACCOUNT_ID_2,
    balance: 20,
    date: "2018-09-19T00:00:00.000Z",
    description: "",
    id: "Bo-wOq8"
  },
  {
    amount: -10,
    accountId: ACCOUNT_ID_2,
    balance: 10,
    date: "2018-09-21T00:00:00.000Z",
    description: "",
    id: "LZMSxN_"
  }
];

export const TRANSACTIONS = transactions.map(t => ({
  ...t,
  date: new Date(t.date),
  tags: t.tags || []
}));
export const TRANSACTIONS2 = transactions2.map(t => ({
  ...t,
  date: new Date(t.date),
  tags: t.tags || []
}));

export const ACCOUNTS = [
  {
    name: "sample",
    id: ACCOUNT_ID_1,
    color: "#0a0",
    display: true,
    loaded: true,
    selected: true,
    tags: [
      { id: "red", label: "red", color: "#e74c3c" },
      { id: "yellow", label: "yellow", color: "#fef160" },
      { id: "green", label: "green", color: "#9acd32" },
      { id: "green::lime", label: "green::lime", color: "#98fb98" }
    ],
    transactions: TRANSACTIONS
  },
  {
    name: "other",
    id: ACCOUNT_ID_2,
    color: "#00a",
    display: true,
    loaded: true,
    selected: false,
    tags: [],
    transactions: TRANSACTIONS2
  }
];

export default ACCOUNTS;
