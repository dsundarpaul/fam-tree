"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import * as z from "zod";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import AddMemberButton from "../AddMemberButton/AddMemberButton";
import { api } from "~/utils/api";
import { type FMTypeKeys } from "~/constants/consts";
import { ReloadIcon } from "@radix-ui/react-icons";

const formSchema = z.object({
  fullName: z.string().min(2).max(50),
  gender: z.optional(z.enum(["M", "F"])),
  dob: z.optional(z.string()),
});

interface AddMemberCardPropsType {
  famId: string;
  parentId: string;
  FMType: FMTypeKeys;
}

const AddMemberCard = ({ famId, parentId, FMType }: AddMemberCardPropsType) => {
  const {
    mutate: addFamMember,
    isLoading: isAddFamMemberLoading,
    isSuccess,
  } = api.famMember.addFamMember.useMutation();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      gender: "M",
      dob: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    addFamMember({
      FMname: values.fullName,
      FMType: FMType,
      famId: famId,
    });
    console.log(values);
  }

  const renderForm = () => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="M" id="male" />
                    </FormControl>

                    <FormLabel className="font-normal">Male</FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="F" id="female" />
                    </FormControl>

                    <FormLabel className="font-normal">Female</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button type="submit" disabled={isAddFamMemberLoading}>
            {isAddFamMemberLoading && (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save
          </Button>
        </AlertDialogFooter>
      </form>
    </Form>
  );

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <AddMemberButton callback={() => null} />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add Family Member</AlertDialogTitle>
          </AlertDialogHeader>
          {renderForm()}
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AddMemberCard;
