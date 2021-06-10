export interface IheaderCells {
  id: string;
  label: string;
}

export const usersHeaderCells: IheaderCells[] = [
  { id: "firstName", label: "First Name" },
  { id: "lastName", label: "Last Name" },
  { id: "DOB", label: "Date of Birth" },
  { id: "companyName", label: "Company Name" },
  { id: "position", label: "Position" },
  { id: "actions", label: "Action" },
];

export const companiesHeaderCells: IheaderCells[] = [
  { id: "Name", label: "Name" },
  { id: "City", label: "City" },
  { id: "Country", label: "Country" },
  { id: "usersNumber", label: "No. of Users" },
  { id: "actions", label: "Action" },
];
