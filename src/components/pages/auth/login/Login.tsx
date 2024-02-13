import { cn } from '@/lib/utils';

import { buttonVariants } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { BiMovie } from 'react-icons/bi';
import LoginForm from './LoginForm';
import { SparklesCore } from '@/components/ui/sparkles';
import SideBackgroundImage from '@/assets/tickets.jpg';

const Login = () => {
    return (
        <section>
            <div className="container relative h-screen items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <div className="absolute right-4 top-4 md:right-8 md:top-8 flex gap-2 justify-center">
                    <ModeToggle />
                    <a
                        href="/examples/authentication"
                        className={cn(buttonVariants({ variant: 'ghost' }), '')}
                    >
                        Create Account
                    </a>
                </div>

                <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                    <div
                        className="absolute inset-0 bg-zinc-900 full-background-image"
                        style={{
                            backgroundImage: `url(${SideBackgroundImage})`,
                            backgroundSize: 'cover',
                        }}
                    >
                        <SparklesCore
                            id="tsparticlesfullpage"
                            background="transparent"
                            minSize={0.5}
                            maxSize={1}
                            particleDensity={50}
                            className="w-full h-full"
                            particleColor="#888888"
                        />
                    </div>
                    <div className="relative z-20 flex items-center text-lg font-medium">
                        <BiMovie className="mr-2 h-6 w-6" />
                        Watchlist
                    </div>
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                &ldquo;Curating a list of movies and shows is
                                like assembling a library of untold tales and
                                unexplored worlds, ready to be savored whenever
                                the moment calls for cinematic escapades.&rdquo;
                            </p>
                            <footer className="text-sm">
                                Somebody, probably
                            </footer>
                        </blockquote>
                    </div>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Sign In
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your email and password below to sign into
                                your account.
                            </p>
                        </div>
                        <LoginForm></LoginForm>
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            By clicking "Sign in", you agree to our{' '}
                            <a
                                href="/terms"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Terms of Service
                            </a>{' '}
                            and{' '}
                            <a
                                href="/privacy"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Privacy Policy
                            </a>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
