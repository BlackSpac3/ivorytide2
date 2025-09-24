"use client";
import { cn } from "@/lib/utils";
import {
  PaymentFormDefault,
  PaymentFormSchema,
  PaymentFormType,
} from "@/schemas/payment.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard, Loader2, Lock } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormField from "./form/formfields";
import { getPaystackPublicKey } from "@/app/actions";

type Reference = {
  id: string;
  reference: string;
  message: string;
  redirecturl: string;
  status: "success";
  trans: string;
  transaction: string;
  trxref: string;
};

const BankPaymentForm = () => {
  const presetAmounts = [25000, 50000, 100000, 150000, 250000, 500000];

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<PaymentFormType>({
    resolver: zodResolver(PaymentFormSchema),
    defaultValues: PaymentFormDefault,
  });

  const {
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = form;

  const selectedAmount = watch("amount");

  const donate = async (data: PaymentFormType) => {
    setIsLoading(true);
    const { email, amount } = data;

    const { default: Paystack } = await import("@paystack/inline-js");

    const popup = new Paystack();
    const key = await getPaystackPublicKey();

    console.log("key: ", key);

    popup.checkout({
      reference: new Date().getTime().toString(),
      key,
      email: email,
      amount: amount * 100,
      onSuccess: (reference) => onSuccess(reference),
      onCancel: () => onClose(),
      onError: (reference) => {
        console.log(reference);
        onClose();
      },
    });
  };

  const onSuccess = (reference: Reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
    setIsLoading(false);
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
    setIsLoading(false);
  };

  return (
    <div className="space-y-4">
      <form
        onSubmit={handleSubmit((data) => donate(data))}
        className="space-y-6">
        {/* Preset Amounts */}
        <div>
          <label className="block font-body font-medium text-foreground mb-3">
            Select an amount:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {presetAmounts.map((amount) => (
              <button
                type="button"
                key={amount}
                onClick={() => {
                  setValue("amount", amount);
                }}
                className={cn(
                  "p-3 rounded-lg border-2  border-primary/20 text-foreground hover:border-primary/50 font-body font-medium transition-all duration-200",
                  selectedAmount === amount &&
                    "border-primary bg-primary text-background"
                )}>
                ₦{amount.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        <FormField
          label="Or enter custom amount"
          fieldName="amount"
          control={control}
          errors={errors}
          type="input"
          inputType="number"
          placeholder="Enter amount"
          className="pl-9"
          icon={
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
              ₦
            </span>
          }
          max={5000000}
        />

        {/* Full Name */}
        <FormField
          label="Full Name"
          fieldName="full_name"
          control={control}
          errors={errors}
          type="input"
          inputType="text"
          placeholder="John Doe"
        />

        {/* Email */}
        <FormField
          label="Email"
          fieldName="email"
          control={control}
          errors={errors}
          type="input"
          inputType="email"
          placeholder="you@example.com"
        />

        {/* Donate Button */}
        <button
          disabled={!selectedAmount || isLoading}
          type="submit"
          className="w-full border border-text-muted/50 disabled:active:scale-100  hover:border-primary/5 hover:text-primary flex items-center gap-2 justify-center text-foreground py-4 rounded-lg font-medium text-lg hover:bg-primary/5 cursor-pointer active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
          {isLoading ? (
            <Loader2 className="w-5" />
          ) : (
            <CreditCard className="w-5" />
          )}
          Make Payment
        </button>
      </form>

      <div className=" text-center flex items-center justify-center">
        <div className="text-text-muted flex items-center gap-2 font-body text-sm">
          <span>
            <Lock className="w-3" />
          </span>
          <span>Secure payment processing</span>
        </div>
      </div>
    </div>
  );
};

export default BankPaymentForm;
