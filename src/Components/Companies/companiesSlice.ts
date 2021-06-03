import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Company, getAllCompanies, uuidv4 } from "../UserControl";
import { loadCompanyState, saveState } from "../UserControl";

//TODO make a slice for some company states

const initialStateCompanies: Company[] = loadCompanyState();

const companiesSlice = createSlice({
  name: "companies",
  initialState: initialStateCompanies,
  reducers: {
    addCompany: {
      reducer: (state, action: PayloadAction<Company>) => {
        // state.push(action.payload);
        return [...state, action.payload];
      },
      prepare: (company: Company) => ({
        payload: {
          ...company,
          ID: uuidv4(),
        },
      }),
    },
    editCompany: (state, action: PayloadAction<Company>) => {
      let companyForEdit = state.find(
        (company) => company.ID === action.payload.ID
      );

      if (companyForEdit) {
        state[state.indexOf(companyForEdit)] = action.payload;
      }
    },
    removeCompany: (state, action: PayloadAction<{ id: string }>) => {
      let companyForRemove = state.find(
        (company) => company.ID === action.payload.id
      );

      if (companyForRemove) {
        state.splice(state.indexOf(companyForRemove), 1);
      }
    },
  },
});

export const { addCompany, editCompany, removeCompany } =
  companiesSlice.actions;
// export const selectCompanyValue =( state:Company[]) => };
export default companiesSlice.reducer;
