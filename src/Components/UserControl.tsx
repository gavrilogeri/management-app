import Position from "./Position";

export interface User {
  ID: string | null;
  firstName: string;
  lastName: string;
  companyID: string;
  companyName: string;
  DOB: Date;
  Position: Position | string; //Postition tip je nekad stajalo
  phoneNumber: string;
}

export interface Company {
  ID: string;
  name: string;
  users: User[];
  city: string;
  country: string;
}

// interface keyValuePositions {
//     id: string
//     position: Position
// }
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

type keys = {
  users: string | null;
  userID: string;
};

const keys = {
  users: "users",
  userID: "userID",
};
type keysCompany = {
  companies: string | null;
  companyID: string;
};

const keysCompany = {
  companies: "companies",
  companyID: "companyID",
};

// export function getCompanyByUser(userId: string) {
//     if (localStorage.getItem(keysCompany.companies) == null) {
//         localStorage.setItem(keysCompany.companies, JSON.stringify([]))
//     }
//     let companies: Companies[] = JSON.parse(localStorage.getItem(keysCompany.companies) as any);
//     //TODO
// }
export function getAllCompanies(): Company[] {
  if (localStorage.getItem(keysCompany.companies) == null) {
    localStorage.setItem(keysCompany.companies, JSON.stringify([]));
  }
  let companies: Company[] = JSON.parse(
    localStorage.getItem(keysCompany.companies) as string
  );
  // let userArray = getUsers();
  //niz kompanija ubacen u companies
  // return companies.map((x: Companies) => ({
  //     ...x,
  // //     users: companies[]
  // // }))
  // let companiesUpdated: Companies[] = companies.map((x: Companies) => ({
  //     ...x,
  //     users: userArray
  // }))

  return companies;
}

function getCompNameByCompID(companyID: string) {
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
  addUserToCompany(data);
}
function getUsersByCompanyID(companyID: string) {
  let allUsers = getUsers();
  let companyUsers: User[] = [];
  // With forEach:

  // allUsers.forEach((element) => {
  //   if (element.companyID === companyID) {
  //     companyUsers.push(element);
  //   }});
  allUsers
    .filter((users) => users.companyID === companyID)
    .map((user) => companyUsers.push(user));
  //CAN I JUST DO LIKE THIS:
  // companyUsers = allUsers.filter((users) => users.companyID === companyID);
  return companyUsers;
}
export function insertCompany(data: Company) {
  let companies = getAllCompanies();
  // let companies = getCompaniesWithUsers();
  data.ID = uuidv4();
  data.users = getUsersByCompanyID(data.ID);
  companies.push(data);
  localStorage.setItem(keysCompany.companies, JSON.stringify(companies));
}

function addUserToCompany(user: User) {
  let company = getCompByCompID(user.companyID);
  company.users.push(user);
  updateCompany(company);
}
function updateUserinCompany(user: User) {
  let company = getCompByCompID(user.companyID);
  company.users.push(user);

  removeOldUserFromCompany(user);
  updateCompany(company);
}
function removeOldUserFromCompany(user: User) {
  let companies = getAllCompanies();

  companies.forEach((company) => {
    let i = 0;
    company.users.forEach((element) => {
      if (element.ID === user.ID) {
        if (
          element.DOB !== user.DOB ||
          element.Position !== user.Position ||
          element.companyID !== user.companyID ||
          element.firstName !== user.firstName ||
          element.lastName !== user.lastName ||
          element.phoneNumber !== user.phoneNumber
        ) {
          company.users.splice(i, 1);
          updateCompany(company);
        }
      }
      i++;
    });
  });
}
function getCompByCompID(companyID: string) {
  let companies = getAllCompanies();
  let defaultCompany = {
    ID: "",
    name: "",
    users: [],
    city: "",
    country: "",
  };

  let company = companies.find((element) => element.ID === companyID);
  return company !== undefined ? company : defaultCompany;
}

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getUsers(): User[] {
  if (localStorage.getItem(keys.users) == null)
    localStorage.setItem(keys.users, JSON.stringify([]));

  return JSON.parse(localStorage.getItem(keys.users) as string);
}

export function updateUser(data: User) {
  let company = getCompByCompID(data.companyID);
  let localCompanyName = company.name;
  let userList: User[] = getUsers();

  // let userForUpdate = userList.find((x) => x.ID === data.ID);
  // userList[userList.findIndex(userForUpdate)] = { ...data, companyName: localCompanyName };

  let recordIndex = userList.findIndex((x) => x.ID === data.ID);
  //za update usera u company
  userList[recordIndex] = { ...data, companyName: localCompanyName };
  localStorage.setItem(keys.users, JSON.stringify(userList));
  updateUserinCompany(data);
}
export function updateCompany(data: Company) {
  let companyList: Company[] = getAllCompanies();
  let recordIndex = companyList.findIndex((x) => x.ID === data.ID);
  companyList[recordIndex] = { ...data, users: getUsersByCompanyID(data.ID) };
  localStorage.setItem(keysCompany.companies, JSON.stringify(companyList));
}

export function deleteUser(id: string) {
  let userList: User[] = getUsers();
  userList = userList.filter((x) => x.ID != id);
  localStorage.setItem(keys.users, JSON.stringify(userList));
}

export function deleteCompany(id: string) {
  let companyList: Company[] = getAllCompanies();
  companyList = companyList.filter((x) => x.ID != id);
  localStorage.setItem(keysCompany.companies, JSON.stringify(companyList));
}
