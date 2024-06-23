"use client"
import {startTransition, useState, useTransition} from "react";

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {LoginSchema} from "@/schemas";

import {Form, FormControl, FormLabel, FormItem, FormMessage, FormField} from "@/components/ui/form";
import {FormError} from "@/components/auth/form-error";
import {FormSuccess} from "@/components/auth/form-success";
import CardWrapper from "@/components/auth/card-wrapper";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {login} from "@/actions/login";

const LoginForm = () => {
    const [success, setSuccess] = useState<string | undefined>("")
    const [error, setError] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });


    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setSuccess("");
        setError("");
        startTransition(() => {
            login(values).then(
                (data) => {
                    setSuccess(data.success)
                    setError(data.error)
                }
            )
        });
    }


    return (
        <CardWrapper
            headerTitle="Sign in to your account"
            headerDescription="Login to your account for a faster checkout."
            backButtonHref="/auth/register"
            showSocial
            backButtonLabel="Don’t you have an account? Sign up now."

        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            label="Email"
                            render={({field}) => (

                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="jn.doe@exx.com"
                                            type="email"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            label="Password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="********"
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button
                        disabled={isPending}
                        type="submit" className="w-full" size="lg" fullWidth>
                        Sign in
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};

export default LoginForm;