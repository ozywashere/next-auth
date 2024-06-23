"use client"
import {startTransition, useState, useTransition} from "react";

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {RegisterSchema} from "@/schemas";

import {Form, FormControl, FormLabel, FormItem, FormMessage, FormField} from "@/components/ui/form";
import {FormError} from "@/components/auth/form-error";
import {FormSuccess} from "@/components/auth/form-success";
import CardWrapper from "@/components/auth/card-wrapper";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {register} from "@/actions/register";

const RegisterForm = () => {
    const [success, setSuccess] = useState<string | undefined>("")
    const [error, setError] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });


    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            register(values)
                .then(
                    (data) => {
                        setError(data.error)
                        setSuccess(data.success)
                    }
                )
        });

    }


    return (
        <CardWrapper
            headerTitle="Create your account"
            headerDescription="It’s totally free and super easy to create an account."
            backButtonHref="/auth/login"
            showSocial
            backButtonLabel="Already have an account? Sign in? "

        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            label="Name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="John Doe"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

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
                        Sign up
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};

export default RegisterForm;