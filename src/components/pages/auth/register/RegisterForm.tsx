import { useRef, useEffect, useState, SyntheticEvent } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { LuInfo, LuLoader2, LuGithub } from 'react-icons/lu';
import { DiscordLogoIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import axios from '@/api/axios';
import { AxiosError } from 'axios';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,32}$/;
const EMAIL_REGEX = /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,}$/;
const PWD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-_=+\\|[\]{};:'",.<>/?]).{8,192}$/;
const REGISTER_URL = '/api/auth/register';

const RegisterForm = () => {
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLDivElement>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [canSubmit, setCanSubmit] = useState<boolean>(false);

    const [user, setUser] = useState<string>('');
    const [validName, setValidName] = useState<boolean>(false);
    const [userFocus, setUserFocus] = useState<boolean>(false);

    const [email, setEmail] = useState<string>('');
    const [validEmail, setValidEmail] = useState<boolean>(false);
    const [emailFocus, setEmailFocus] = useState<boolean>(false);

    const [password, setPassword] = useState<string>('');
    const [validPassword, setValidPassword] = useState<boolean>(false);
    const [passwordFocus, setPasswordFocus] = useState<boolean>(false);

    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [validConfirmPassword, setValidConfirmPassword] =
        useState<boolean>(false);
    const [confirmPasswordFocus, setConfirmPasswordFocus] =
        useState<boolean>(false);

    const [errorMessage, setErrorMessage] = useState<string>('');
    // const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        const user = userRef.current;
        user?.focus();
    }, []);

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user]);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
        setValidConfirmPassword(password === confirmPassword);
    }, [password, confirmPassword]);

    useEffect(() => {
        setErrorMessage('');
    }, [user, email, password, confirmPassword]);

    useEffect(() => {
        setCanSubmit(
            validName && validEmail && validPassword && validConfirmPassword
        );

        setErrorMessage('');
    }, [validName, validEmail, validPassword, validConfirmPassword]);

    async function handleSubmit(event: SyntheticEvent) {
        event.preventDefault();
        setIsLoading(true);

        const v1 = USER_REGEX.test(user);
        const v2 = EMAIL_REGEX.test(email);
        const v3 = PWD_REGEX.test(password);

        if (!v1 || !v2 || !v3) {
            setErrorMessage('Invalid Entry');
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post(
                REGISTER_URL,
                {
                    name: user,
                    email: email,
                    password: password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                }
            );

            console.log(response.data);
            console.log(JSON.stringify(response));
        } catch (err: unknown) {
            if (!(err instanceof AxiosError)) {
                setErrorMessage('Internal Server Error.');
                return;
            }

            if (!err?.response) {
                setErrorMessage('No Server Response');
                return;
            }

            if (err.response?.status === 422) {
                console.log(err.response.data);
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-2">
                    <Alert
                        ref={errRef}
                        variant="destructive"
                        className={
                            errorMessage ? 'block' : 'absolute -left-[9999px]'
                        }
                    >
                        <LuInfo className="h-4 w-4" />
                        <AlertTitle>Heads up!</AlertTitle>
                        <AlertDescription>{errorMessage}</AlertDescription>
                    </Alert>

                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="username">
                            Username
                        </Label>
                        <Input
                            type="text"
                            id="username"
                            ref={userRef}
                            placeholder="Username"
                            onChange={(e) => setUser(e.target.value)}
                            required
                            aria-invalid={validName ? 'false' : 'true'}
                            aria-describedby="uidnote"
                            className={
                                !validName && !userFocus && user
                                    ? 'border-red-500'
                                    : ''
                            }
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                            disabled={isLoading}
                        />
                        <Alert
                            id="uidnote"
                            className={
                                userFocus && user && !validName
                                    ? 'block'
                                    : 'absolute -left-[9999px]'
                            }
                        >
                            <LuInfo className="h-4 w-4" />
                            <AlertDescription>
                                3 to 32 characters. <br />
                                Must begin with a letter. <br />
                                Letters, numbers, underscores and hyphens
                                allowed.
                            </AlertDescription>
                        </Alert>
                    </div>

                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            type="email"
                            id="email"
                            placeholder="Your Email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            aria-invalid={validEmail ? 'false' : 'true'}
                            aria-describedby="emailnote"
                            className={
                                !validEmail && !emailFocus && email
                                    ? 'border-red-500'
                                    : ''
                            }
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                            disabled={isLoading}
                        />
                        <Alert
                            id="emailnote"
                            className={
                                emailFocus && !validEmail
                                    ? 'block'
                                    : 'absolute -left-[9999px]'
                            }
                        >
                            <LuInfo className="h-4 w-4" />
                            <AlertDescription>
                                Must be a valid email address.
                            </AlertDescription>
                        </Alert>
                    </div>

                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="password">
                            Password
                        </Label>
                        <Input
                            type="password"
                            id="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            aria-invalid={validPassword ? 'false' : 'true'}
                            aria-describedby="passwordnote"
                            className={
                                !validPassword && !passwordFocus && password
                                    ? 'border-red-500'
                                    : ''
                            }
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                            disabled={isLoading}
                        />
                        <Alert
                            id="passwordnote"
                            className={
                                passwordFocus && !validPassword
                                    ? 'block'
                                    : 'absolute -left-[9999px]'
                            }
                        >
                            <LuInfo className="h-4 w-4" />
                            <AlertDescription>
                                8 to 192 characters. <br />
                                Must include uppercase and lowercase letters, at
                                least a number and special character.
                            </AlertDescription>
                        </Alert>
                    </div>

                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="confirmPassword">
                            Confirm Password
                        </Label>
                        <Input
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            aria-invalid={
                                validConfirmPassword ? 'false' : 'true'
                            }
                            aria-describedby="confirmpasswordnote"
                            className={
                                !validConfirmPassword &&
                                !confirmPasswordFocus &&
                                confirmPassword
                                    ? 'border-red-500'
                                    : ''
                            }
                            onFocus={() => setConfirmPasswordFocus(true)}
                            onBlur={() => setConfirmPasswordFocus(false)}
                            disabled={isLoading}
                        />
                        <Alert
                            id="confirmpasswordnote"
                            className={
                                confirmPasswordFocus && !validConfirmPassword
                                    ? 'block'
                                    : 'absolute -left-[9999px]'
                            }
                        >
                            <LuInfo className="h-4 w-4" />
                            <AlertDescription>
                                Must match the first password field.
                            </AlertDescription>
                        </Alert>
                    </div>

                    <Button disabled={isLoading || !canSubmit}>
                        {isLoading && (
                            <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Create Account
                    </Button>
                </div>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
            </div>
            <div className="grid gap-2">
                <Button variant="outline" type="button" disabled={isLoading}>
                    {isLoading ? (
                        <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <LuGithub className="mr-2 h-4 w-4" />
                    )}{' '}
                    GitHub
                </Button>

                <Button variant="outline" type="button" disabled={isLoading}>
                    {isLoading ? (
                        <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <DiscordLogoIcon className="mr-2 h-4 w-4" />
                    )}{' '}
                    Discord
                </Button>
            </div>
        </>
    );
};

export default RegisterForm;
