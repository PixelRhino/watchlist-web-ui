import { useRef, useEffect, useState, SyntheticEvent, useContext } from 'react';
import AuthContext from '@/context/AuthProvider';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { LuInfo, LuLoader2, LuGithub } from 'react-icons/lu';
import { DiscordLogoIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import axios from '@/api/axios';
import { AxiosError } from 'axios';

const LOGIN_URL = '/api/auth/login';

const LoginForm = () => {
    const { setAuth } = useContext(AuthContext);

    const emailRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLDivElement>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [canSubmit, setCanSubmit] = useState<boolean>(false);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [errorMessage, setErrorMessage] = useState<string>('');
    // const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        const _email = emailRef.current;
        _email?.focus();
    }, []);

    useEffect(() => {
        setErrorMessage('');
    }, [email, password]);

    useEffect(() => {
        setCanSubmit(email !== '' && password !== '');

        setErrorMessage('');
    }, [email, password]);

    async function handleSubmit(event: SyntheticEvent) {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post(
                LOGIN_URL,
                {
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

            setEmail('');
            setPassword('');
        } catch (err: unknown) {
            if (!(err instanceof AxiosError)) {
                setErrorMessage('Internal Server Error.');
                return;
            }

            if (!err?.response) {
                setErrorMessage('No Server Response.');
                return;
            }

            if (err.response?.status === 401) {
                setErrorMessage('Invalid email and/or password.');
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
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            ref={emailRef}
                            type="email"
                            id="email"
                            placeholder="Your Email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            value={email}
                            disabled={isLoading}
                        />
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
                            value={password}
                            disabled={isLoading}
                        />
                    </div>

                    <Button disabled={isLoading || !canSubmit}>
                        {isLoading && (
                            <LuLoader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Sign in
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

export default LoginForm;
