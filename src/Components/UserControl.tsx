import Position from "./Position";

export interface Users {
  ID: string;
  firstName: string;
  lastName: string;
  companyID: string;
  companyName: string;
  DOB: Date;
  Position: Position | string; //Postition tip je nekad stajalo
  phoneNumber: string;
}

export interface Companies {
  ID: string;
  name: string;
  users: Users[];
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
export function getAllCompanies(): Companies[] {
  if (localStorage.getItem(keysCompany.companies) == null) {
    localStorage.setItem(keysCompany.companies, JSON.stringify([]));
  }
  let companies: Companies[] = JSON.parse(
    localStorage.getItem(keysCompany.companies) as any
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

export function insertUser(data: Users) {
  let users = getUsers();
  data["companyName"] = getCompNameByCompID(data["companyID"]);
  data["ID"] = uuidv4();

  users.push(data);
  localStorage.setItem(keys.users, JSON.stringify(users));
  let companies = getAllCompanies();
  localStorage.setItem(keysCompany.companies, JSON.stringify(companies));
  addUserToCompany(data);
}
function getUsersByCompanyID(companyID: string) {
  let allUsers = getUsers();
  let companyUsers: Users[] = [];
  allUsers.forEach((element) => {
    if (element.companyID === companyID) {
      companyUsers.push(element);
    }
  });

  return companyUsers;
}
export function insertCompany(data: Companies) {
  let companies = getAllCompanies();
  // let companies = getCompaniesWithUsers();
  data["ID"] = uuidv4();
  data["users"] = getUsersByCompanyID(data["ID"]); //treba mi getUsers koji imaju COMPANY ID == DATA ID
  companies.push(data);
  localStorage.setItem(keysCompany.companies, JSON.stringify(companies));
}

function addUserToCompany(user: Users) {
  let company = getCompByCompID(user.companyID);
  company.users.push(user);
  updateCompany(company);
}
function updateUserinCompany(user: Users) {
  let company = getCompByCompID(user.companyID);
  company.users.push(user);

  removeOldUserFromCompany(user);
  updateCompany(company);
}
function removeOldUserFromCompany(user: Users) {
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

export function getUsers(): Users[] {
  if (localStorage.getItem(keys.users) == null)
    localStorage.setItem(keys.users, JSON.stringify([]));

  return JSON.parse(localStorage.getItem(keys.users) as string);
}

export function updateUser(data: Users) {
  let company = getCompByCompID(data["companyID"]);
  let localCompanyName = company.name;
  let userList: Users[] = getUsers();

  let recordIndex = userList.findIndex((x) => x.ID == data.ID);
  //za update usera u company
  userList[recordIndex] = { ...data, companyName: localCompanyName };
  localStorage.setItem(keys.users, JSON.stringify(userList));
  updateUserinCompany(data);
}
export function updateCompany(data: Companies) {
  let companyList: Companies[] = getAllCompanies();
  let recordIndex = companyList.findIndex((x) => x.ID == data.ID);
  companyList[recordIndex] = { ...data };
  localStorage.setItem(keysCompany.companies, JSON.stringify(companyList));
}

export function deleteUser(id: string) {
  let userList: Users[] = getUsers();
  userList = userList.filter((x) => x.ID != id); //vracanje svih usera osim onog sa datim id (njega zelimo da izbacimo)
  localStorage.setItem(keys.users, JSON.stringify(userList));
}

export function deleteCompany(id: string) {
  let companyList: Companies[] = getAllCompanies();
  companyList = companyList.filter((x) => x.ID != id);
  localStorage.setItem(keysCompany.companies, JSON.stringify(companyList));
}
