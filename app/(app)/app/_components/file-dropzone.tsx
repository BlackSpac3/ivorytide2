"use client";
import React, { useCallback } from "react";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";
const FIleDropZone = <T extends FieldValues>({
  form,
  fieldName,
}: {
  form: UseFormReturn<T>;
  fieldName: Path<T>;
}) => {
  const {
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = form;
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setValue(fieldName, acceptedFiles[0] as PathValue<T, keyof T & Path<T>>);
      // Trigger validation
      trigger(fieldName);
    },
    [fieldName, setValue, trigger]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    multiple: false,
    maxSize: 5 * 1024 * 1024,
    onDrop,
  });

  const field = watch(fieldName);

  return (
    <div>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed border-border bg-muted rounded-lg aspect-video w-full flex items-center justify-center transition-all hover:border-primary hover:bg-primary/10 cursor-pointer",
          isDragActive && "border-primary bg-primary/10",
          errors[fieldName] &&
            "border-red-500 dark:border-red-400 dark:bg-red-400/10 bg-red-500/10"
        )}>
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center justify-center aspect-square rounded-full bg-background p-3">
            <Upload />
          </div>
          <div className="text-center">
            <p>
              <span className="text-primary">Click to Upload</span> or drag and
              drop
            </p>
            <p className="text-sm text-muted-foreground">
              (Max. File Size: 5MB)
            </p>
          </div>

          {field && (
            <p className="max-w-[200px] truncate">
              Selected File: {field.name}
            </p>
          )}
          <Input {...getInputProps()} />
        </div>
      </div>
    </div>
  );
};

export default FIleDropZone;
