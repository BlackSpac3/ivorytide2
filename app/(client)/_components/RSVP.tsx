"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { Loader2, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  RsvpFormDefault,
  RsvpFormSchema,
  RsvpFormType,
} from "@/schemas/rsvp.schema";
import { zodResolver } from "@hookform/resolvers/zod";

import { titleOptions } from "@/lib/data";
import FormField from "@/app/(client)/_components/form/formfields";
import { useRsvpMutation } from "@/lib/hooks/rsvp.query";

const triggerDownload = async (url: string, filename?: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const blobUrl = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = filename || "invitation";
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(blobUrl);
};

export default function RSVP() {
  const form = useForm<RsvpFormType>({
    resolver: zodResolver(RsvpFormSchema),
    defaultValues: RsvpFormDefault,
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    setValue,
    watch,
  } = form;

  const { mutate, isPending } = useRsvpMutation({
    onSave: (url, filename) => {
      reset();
      if (url) {
        triggerDownload(url, filename);
      }
    },
  });

  const isAttending = watch("is_attending");

  useEffect(() => {
    if (isAttending === "yes") {
      setValue("reason", "");
    }
  }, [isAttending, setValue]);
  return (
    <section id="rsvp" className="py-20 bg-accent scroll-mt-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <h2 className="font-serif text-5xl md:text-6xl text-primary mb-6">
            RSVP
          </h2>
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
              <Mail className="w-6 h-6 text-primary fill-current" />
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            </div>
          </div>
          <p className="text-text-muted font-body text-lg max-w-3xl mx-auto">
            Your presence means the world to us. Please RSVP by October 22nd
            2025, so we can celebrate together! Complete the form with your name
            to download your access card and invitation. This will be required
            at the venue for hassle-free entry
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit((data) => mutate(data))}
          className="max-w-lg mx-auto bg-background p-8 rounded-2xl shadow-lg border border-primary/10 space-y-6">
          <div className="space-y-4">
            <FormField
              fieldName="title"
              type="select"
              control={control}
              label="Title"
              placeholder="Select your title"
              errors={errors}
              options={titleOptions}
            />

            <FormField
              type="input"
              control={control}
              fieldName="first_name"
              label="First Name"
              placeholder="John"
              errors={errors}
            />

            <FormField
              type="input"
              control={control}
              fieldName="last_name"
              label="Last Name"
              placeholder="Doe"
              errors={errors}
            />

            <FormField
              type="select"
              control={control}
              fieldName="is_attending"
              label="Would you be able to make it?"
              errors={errors}
              placeholder="Select an option"
              options={["yes", "no"]}
            />

            {isAttending === "no" && (
              <FormField
                type="textarea"
                control={control}
                fieldName="reason"
                label="Reason (optional)"
                placeholder="Let us know why you can't make it"
                errors={errors}
              />
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isPending}
            className="w-full flex gap-2 disabled:active:scale-100 items-center justify-center bg-primary text-white dark:text-background py-4  rounded-lg font-medium text-lg hover:opacity-90 cursor-pointer active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
            {isSubmitting ||
              (isPending && <Loader2 className="animate-spin w-5" />)}
            {isSubmitting || isPending ? "Sending..." : "Send RSVP"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
