"use client";

import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface SacredImageProps extends ImageProps {
  wrapperClassName?: string;
  graded?: boolean;
}

export function SacredImage({
  wrapperClassName,
  className,
  graded = true,
  alt,
  fill,
  ...props
}: SacredImageProps) {
  return (
    <div
      className={cn(
        "sacred-image-wrap overflow-hidden",
        fill ? "absolute inset-0 size-full" : "relative w-full bg-charcoal/5",
        wrapperClassName
      )}
    >
      {props.src ? (
        <Image
          alt={alt ?? ""}
          fill={fill}
          className={cn("sacred-image", className)}
          {...props}
        />
      ) : null}
      {graded && (
        <>
          <div className="sacred-image-grade" aria-hidden />
          <div className="sacred-image-haze" aria-hidden />
        </>
      )}
    </div>
  );
}
