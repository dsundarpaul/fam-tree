"use client";

import React, { useState } from "react";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { api } from "~/utils/api";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";

import AddMemberButton from "../AddMemberButton/AddMemberButton";

import { useForm } from "react-hook-form";

import { AddFamMemberformSchema } from "./formSchema";
import { type AddMemberCardPropsType } from "./types";

const AddMemberCard = ({ famId, FMType }: AddMemberCardPropsType) => {
  const [isAddFammemberDialogOpen, setIsAddFamMemberDialogOpen] =
    useState(false);

  const ctx = api.useContext();

  const { mutate: addFamMember, isLoading: isAddFamMemberLoading } =
    api.famMember.addFamMember.useMutation({
      onSuccess: () => {
        setIsAddFamMemberDialogOpen(false);
        void ctx.famMember.getFamById.invalidate();
      },
    });

  // 1. Define your form.
  const form = useForm<z.infer<typeof AddFamMemberformSchema>>({
    resolver: zodResolver(AddFamMemberformSchema),
    defaultValues: {
      fullName: "",
      gender: "M",
      dob: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof AddFamMemberformSchema>) {
    addFamMember({
      FMname: values.fullName,
      FMType: FMType,
      famId: famId,
    });

    setIsAddFamMemberDialogOpen(false);
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

        <DialogFooter>
          {/* <DialogCancel>Cancel</DialogCancel> */}
          <Button type="submit" disabled={isAddFamMemberLoading}>
            {isAddFamMemberLoading && (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );

  return (
    <>
      <Dialog
        open={isAddFammemberDialogOpen}
        onOpenChange={(open) => setIsAddFamMemberDialogOpen(open)}
      >
        <DialogTrigger>
          <AddMemberButton callback={() => null} />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Family Member</DialogTitle>
          </DialogHeader>
          {renderForm()}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddMemberCard;
