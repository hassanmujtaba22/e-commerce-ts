import { Container, Text, TextInput, Button, Group, PasswordInput, Select } from '@mantine/core'
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { register } from '../redux/action/auth_api';
import { get_packages } from '../redux/action/packages';

function Register() {
    let { type } = useParams();
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { packages } = useSelector((state: any) => state.package);
    const [_packages, set_packages] = useState([])
    useEffect(() => {
        switch (type) {
            case "Customer":
                break;
            case "Referrer":
                break;
            case "Vendor":
                break;
            default:
                navigate("/", { replace: true });
        }
    }, []);
    useEffect(() => {
        get_packages(dispatch);
        let pac = packages.map((p: any) => ({
            label: p.title,
            value: p._id,
        }))
        set_packages(pac)
    }, []);
    const form = useForm({
        initialValues: {
            email: "",
            password: "",
            cpassword: "",
            firstname: "",
            lastname: "",
            role: type,
            referred_by: "",
            referral_package: ""
        },
        validate: {
            cpassword: (value, values) =>
                value !== values.password ? 'Passwords did not match' : null,
        },
    });

    const handleSubmit = async (values: any) => {
        await register(dispatch, values);
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
                Signup as a {type}
            </Text>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    withAsterisk
                    label="First Name"
                    placeholder="Enter Your First Name"
                    {...form.getInputProps('firstname')}
                />
                <TextInput
                    withAsterisk
                    label="Last Name"
                    placeholder="Enter Your Last Name"
                    {...form.getInputProps('lastname')}
                />
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
                <PasswordInput
                    placeholder="Enter Your Confirm Password"
                    label="Confirm Password"
                    withAsterisk
                    {...form.getInputProps('cpassword')}
                />
                {
                    type === "Referrer" && (
                        <>
                            <Select
                                label="Select Your Package"
                                placeholder="Pick one"
                                data={_packages}
                                {...form.getInputProps('referral_package')}
                            />
                            <TextInput
                                withAsterisk
                                label="Referred by"
                                placeholder="Enter Your Referred by"
                                {...form.getInputProps('referred_by')}
                            />
                        </>
                    )
                }
                <Group position="right" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </Container>
    )
}

export default Register