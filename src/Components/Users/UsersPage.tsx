import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../store/store";
import UsersTable from "./UsersTable";
const mapStateToProps = (state: RootState) => {
  return {
    users: state.users,
  };
};

type Props = ReturnType<typeof mapStateToProps>;
export function UsersPage(props: Props) {
  return (
    <>
      <UsersTable users={props.users} />
    </>
  );
}
export default connect(mapStateToProps)(UsersPage);
