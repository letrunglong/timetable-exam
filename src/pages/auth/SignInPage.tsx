import { ErrorMessage } from "@hookform/error-message";
import { Alert, Button, Grid, TextField } from "@mui/material";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUser } from "~/hooks";

const LoginPage = () => {
  const { onLogin, isLoading } = useUser();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormSignIn>();

  const handleSubmitForm = () => {
    handleSubmit((payload) => {
      onLogin(payload).then(() => {
        navigate("/main");
      });
    })();
  };
  return (
    <Grid
      container
      alignItems={"center"}
      justifyContent={"center"}
      height={1}
      sx={{ backgroundColor: "#c6c9d1" }}
    >
      <Grid
        component="form"
        width={400}
        sx={{
          border: "1px solid grey",
          p: 2,
          borderRadius: 1,
          backgroundColor: "white",
        }}
      >
        <Grid width={1}>
          <TextField
            variant="standard"
            fullWidth
            label="Email"
            {...register("email", {
              required: "This field required",
            })}
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => <Alert severity="error">{message}</Alert>}
          />
        </Grid>
        <Grid width={1} sx={{ my: 4 }}>
          <TextField
            variant="standard"
            fullWidth
            label="Password"
            type="password"
            {...register("password", {
              required: "This field required",
              minLength: 6,
            })}
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => (
              <Alert severity="error">
                {errors?.password?.type === "minLength"
                  ? "Min 6 character"
                  : message}
              </Alert>
            )}
          />
        </Grid>
        <Grid width={1}>
          <Button
            fullWidth
            onClick={handleSubmitForm}
            color="primary"
            variant="contained"
            disabled={isLoading}
          >
            Log in
          </Button>
        </Grid>
        <Grid width={1} sx={{ mt: 1 }}>
          <Button
            fullWidth
            onClick={() => {
              navigate("/public/signup", {
                replace: true,
                relative: "path",
              });
            }}
            color="primary"
            variant="text"
          >
            Sign Up
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default memo(LoginPage);

type IFormSignIn = Record<"email" | "password", string>;
