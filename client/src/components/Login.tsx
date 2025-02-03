import {
  Button,
  Center,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { isEmail, useForm } from "@mantine/form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { AppDispatch, RootState } from "../app/store";
import { loginUser } from "../reducers/authSlice";
import { LoginRequest } from "../schemas/auth";

const Login = () => {
  const { loading, error, userEmail } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: isEmail("Email is required"),
      password: (val: string) =>
        val.length < 4 && "Password should include at least 4 characters",
    },
  });

  useEffect(() => {
    if (userEmail) {
      navigate("/invoices");
    }
  }, [navigate, userEmail]);

  const handleSubmit = (data: LoginRequest) => {
    dispatch(loginUser(data));
  };

  const renderError = () => {
    if (error) {
      return (
        <Text className="text-center" c="red" mt={10}>
          {error as string}
        </Text>
      );
    }
    return null;
  };

  return (
    <Center className="flex flex-col">
      <Title order={2}>Welcome back!</Title>
      <form aria-label="form" onSubmit={form.onSubmit(handleSubmit)}>
        <Paper
          withBorder
          shadow="md"
          p={30}
          mt={30}
          radius="md"
          w={420}
          h={300}
        >
          <TextInput
            label="Email"
            placeholder="you@email.com"
            required
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={form.errors.password}
            mt="md"
          />
          <Button fullWidth mt="xl" type="submit" loading={loading}>
            Sign in
          </Button>
          {renderError()}
        </Paper>
      </form>
    </Center>
  );
};

export default Login;
