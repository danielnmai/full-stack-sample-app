import { Button, Group, Text } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "../app/store";
import { logoutUser } from "../reducers/authSlice";

const Header = () => {
  const { userEmail } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLoginOrLogout = () => {
    if (!userEmail) {
      navigate("/login");
      return;
    }

    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div>
      <Group justify="right" align="center" className="m-5">
        {userEmail && <Text>Logged in as {userEmail} </Text>}
        <Button variant="default" onClick={onLoginOrLogout}>
          Log {userEmail ? "out" : "in"}
        </Button>
      </Group>
    </div>
  );
};

export default Header;
