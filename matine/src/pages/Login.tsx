import { Container, Text, TextInput, Button, Group, PasswordInput } from '@mantine/core'
import { useForm } from '@mantine/form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/action/auth_api';

function Login() {
    const form = useForm({
        initialValues: {
            email: '',
            password: "",
        }
    });
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const handleSubmit = async (values: any) => {
        console.log(values)
        await login(dispatch, { email: values.email, password: values.password });
        navigate("/", { replace: true });
    }

    return (
        <Container
            size="xs"
            sx={{
                marginBottom: 30,
                marginTop: 30,
                backgroundColor: "white",
                padding: 20,
            }}
        >
            <Text weight={600} size="xl" sx={{ lineHeight: 1, marginBottom: 20 }}>
                Login
            </Text>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    withAsterisk
                    label="Email"
                    placeholder="Enter Your Email"
                    {...form.getInputProps('email')}
                />
                <PasswordInput
                    placeholder="Enter Your Password"
                    label="Password"
                    withAsterisk
                    {...form.getInputProps('password')}
                />
                <Group position="right" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </Container>
    )
}

export default Login