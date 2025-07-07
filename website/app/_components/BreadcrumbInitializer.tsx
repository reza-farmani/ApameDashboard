"use client";

import { useBreadcrumbSetter } from "../hooks/useBreadcrumbSetter";

export default function BreadcrumbInitializer() {
  useBreadcrumbSetter(); 
  return null;
}
