import Position from "./Position";

export interface User {
  ID: string | null;
  firstName: string;
  lastName: string;
  companyID: string;
  companyName: string;
  DOB: Date | string;
  Position: Position | string;
  phoneNumber: string;
}

export interface Company {
  ID: string;
  name: string;
  // users: User[];
  city: string;
  country: string;
}

export const getPositions = () => [
  {
    id: "1",
    position: "Manager",
  },
  {
    id: "2",
    position: "Software Developer",
  },
  {
    id: "3",
    position: "QA engineer",
  },
  {
    id: "4",
    position: "Staff",
  },
];

const keys = {
  users: "users",
  userID: "userID",
};

const keysCompany = {
  companies: "companies",
  companyID: "companyID",
};
export function getAllCompanies(): Company[] {
  if (localStorage.getItem(keysCompany.companies) === null) {
    localStorage.setItem(keysCompany.companies, JSON.stringify([]));
  }
  let companies: Company[] = JSON.parse(
    localStorage.getItem(keysCompany.companies) as string
  );
  return companies;
}
export const conditionalLength = (text: string, maxLength: number): string => {
  return text.length > maxLength
    ? text.substring(0, maxLength).concat("...")
    : text;
};
//load state from local storage Dan Abramov loadState u videu na 1:10
export function loadCompanyState(): any {
  try {
    const serializedState = localStorage.getItem(keysCompany.companies);
    if (serializedState === null) {
      return [] as Company[];
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
}
export function loadUserState(): any {
  try {
    const serializedState = localStorage.getItem(keys.users);
    if (serializedState === null) {
      return [] as User[];
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
}

export const saveState = (key: string, data: User[] | Company[]) => {
  try {
    const serializedState = JSON.stringify(data);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    //ignore write irrors
  }
};

export function getCompNameByCompID(companyID: string) {
  let companies = getAllCompanies();
  let companyName = "";
  let company = companies.find((element) => element.ID === companyID);
  if (company !== undefined) {
    companyName = company.name;
  }
  return companyName;
}

export function insertUser(data: User) {
  let users = getUsers();
  data.companyName = getCompNameByCompID(data.companyID);
  data.ID = uuidv4();

  users.push(data);
  localStorage.setItem(keys.users, JSON.stringify(users));
  let companies = getAllCompanies();
  localStorage.setItem(keysCompany.companies, JSON.stringify(companies));
  // addUserToCompany(data);
}
export function getUsersByCompanyID(companyID: string) {
  let allUsers = getUsers();
  let companyUsers: User[] = [];
  // With forEach:

  // allUsers.forEach((element) => {
  //   if (element.companyID === companyID) {
  //     companyUsers.push(element);
  //   }});
  //
  //With filter and map
  // allUsers
  //   .filter((users) => users.companyID === companyID)
  //   .map((user) => companyUsers.push(user));
  //CAN I JUST DO LIKE THIS:
  companyUsers = allUsers.filter((users) => users.companyID === companyID);
  return companyUsers;
}
export function insertCompany(data: Company) {
  let companies = getAllCompanies();
  // let companies = getCompaniesWithUsers();
  data.ID = uuidv4();
  // data.users = getUsersByCompanyID(data.ID);
  companies.push(data);
  localStorage.setItem(keysCompany.companies, JSON.stringify(companies));
}

function getCompByCompID(companyID: string) {
  let companies = getAllCompanies();
  let company = companies.find((element) => element.ID === companyID);
  return company !== undefined ? company : null;
}

export function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getUsers(): User[] {
  if (localStorage.getItem(keys.users) === null)
    localStorage.setItem(keys.users, JSON.stringify([]));

  return JSON.parse(localStorage.getItem(keys.users) as string);
}

export function updateUser(data: User) {
  let company = getCompByCompID(data.companyID);
  let localCompanyName = company!.name;
  let userList: User[] = getUsers();
  // let recordIndex = userList.findIndex((x) => x.ID === data.ID);
  // userList[recordIndex] = { ...data, companyName: localCompanyName };
  let userForUpdate = userList.find((x) => x.ID === data.ID);
  userList[userList.indexOf(userForUpdate!)] = {
    ...data,
    companyName: localCompanyName,
  };
  localStorage.setItem(keys.users, JSON.stringify(userList));
}

export function updateCompany(data: Company) {
  let companyList: Company[] = getAllCompanies();
  let companyForUpdate = companyList.find((x) => x.ID === data.ID);
  companyList[companyList.indexOf(companyForUpdate!)] = { ...data };
  localStorage.setItem(keysCompany.companies, JSON.stringify(companyList));

  //updates new values (e.g. updated company name) to users from that company
  getUsers().map((user) => {
    if (user.companyID === data.ID) {
      updateUser(user);
    }
  });
}

export function deleteUser(id: string) {
  let userList: User[] = getUsers();
  userList = userList.filter((x) => x.ID !== id);
  localStorage.setItem(keys.users, JSON.stringify(userList));
}

export function deleteCompany(id: string) {
  let companyList: Company[] = getAllCompanies();
  companyList = companyList.filter((x) => x.ID !== id);
  localStorage.setItem(keysCompany.companies, JSON.stringify(companyList));
}
