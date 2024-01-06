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
  FormDescription,
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
import DateOfBirthPicker from "../ui/date-picker/date-picker";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

const AddMemberCard = ({ famId, FMType }: AddMemberCardPropsType) => {
  const [isAddFammemberDialogOpen, setIsAddFamMemberDialogOpen] =
    useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [base64Data, setBase64Data] = useState("");

  const ctx = api.useContext();

  const { mutate: addFamMember, isLoading: isAddFamMemberLoading } =
    api.famMember.addFamMember.useMutation({
      onSuccess: async () => {
        await ctx.famMember.getFamById.invalidate();

        toast.success("Added a Fam Member 🎊", { duration: 2000 });
        setIsAddFamMemberDialogOpen(false);
      },
      onError: () => {
        toast.error("Something went Worng");
      },
    });

  const { mutate: uploadDpImage } = api.media.uploadMedia.useMutation({
    onSuccess: () => {
      toast.success("Sucessfully uploaded Display picture");
    },
    onError: () => {
      toast.error("Something went Worng");
    },
  });

  const { mutate: getSignedURL } = api.media.createSignedURL.useMutation()

  // 1. Define your form.
  const form = useForm<z.infer<typeof AddFamMemberformSchema>>({
    resolver: zodResolver(AddFamMemberformSchema),
    defaultValues: {
      fullName: "",
      isAlive: "D",
      dob: undefined,
      petname: "",
      location: "",
      profession: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof AddFamMemberformSchema>) {
    console.log(values, "************");

    addFamMember({
      FMname: values.fullName,
      FMType: FMType,
      famId: famId,
      famDob: values.dob?.toString().substring(0, 15),
      famPetname: values.petname,
      famLoc: values.location,
      famPro: values.profession,
    });
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const selectedFile: File = event.target.files?.[0];

      setFile(selectedFile);

      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);

        const result = reader.result;
        if (typeof result === "string") {
          // setBase64Data(result.toString().split(",")[1]); // Extract base64 data from the result
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleImageUpload = () => {
    if (file) {
      console.log(file.type);
      const data = getSignedURL('')
      console.log({ data})
      // uploadDpImage({ file: file });

      
    } else {
      alert("file not avaialbe");
    }
  };

  const renderNameField = () => (
    <FormField
      control={form.control}
      name="fullName"
      disabled={isAddFamMemberLoading}
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
  );

  const renderIsAliveField = () => (
    <FormField
      control={form.control}
      name="isAlive"
      disabled={isAddFamMemberLoading}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Is Alive ?</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex"
            >
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="A" id="alive" />
                </FormControl>

                <FormLabel className="font-normal">Alive</FormLabel>
              </FormItem>

              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="D" id="deceased" />
                </FormControl>

                <FormLabel className="font-normal">Deceased</FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );

  const renderDOBField = () => (
    <FormField
      control={form.control}
      name="dob"
      disabled={isAddFamMemberLoading}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          {/* <FormItem className="flex items-center space-x-3 space-y-0"> */}

          <FormLabel>Date of birth</FormLabel>
          <DateOfBirthPicker getDateCallback={field.onChange} />
          {/* </FormItem> */}

          <FormDescription>
            Your date of birth is used to calculate your age.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const renderPetnameField = () => (
    <FormField
      control={form.control}
      name="petname"
      disabled={isAddFamMemberLoading}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Petname / Nickname</FormLabel>
          <FormControl>
            <Input placeholder="Name" {...field} />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );

  const renderProfessionField = () => (
    <FormField
      control={form.control}
      name="profession"
      disabled={isAddFamMemberLoading}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Profession</FormLabel>
          <FormControl>
            <Input placeholder="..." {...field} />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
  const renderLocationField = () => (
    <FormField
      control={form.control}
      name="location"
      disabled={isAddFamMemberLoading}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Know to live in</FormLabel>
          <FormControl>
            <Input placeholder="..." {...field} />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );

  const renderForm = () => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="w-full">
            <Input type="file" onChange={handleFileChange} />
            {previewUrl && (
              <div>
                <h2>Image Preview</h2>
                <Image
                  src={previewUrl}
                  alt="Image Preview"
                  width={200}
                  height={200}
                />
              </div>
            )}
            <Button onClick={() => handleImageUpload()}>Upload</Button>
          </div>
          <div className="w-full">
            <div className="flex gap-4">
              {renderNameField()}
              {renderPetnameField()}
            </div>
            <div className="flex gap-4">
              {renderProfessionField()}
              {renderLocationField()}
            </div>

            {renderDOBField()}
            {renderIsAliveField()}
          </div>
        </div>

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
      <Toaster />
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
